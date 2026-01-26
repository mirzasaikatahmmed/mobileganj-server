import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  ServiceJob,
  ServicePart,
  ServiceDueCollection,
  Customer,
} from '../../database/entities';
import {
  ServiceStatus,
  ServiceType,
  PartsUsageType,
  PaymentMethod,
} from '../../common/constants';
import { generateJobId } from '../../common/utils';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class ServicingService {
  constructor(
    @InjectRepository(ServiceJob)
    private jobRepository: Repository<ServiceJob>,
    @InjectRepository(ServicePart)
    private partRepository: Repository<ServicePart>,
    @InjectRepository(ServiceDueCollection)
    private dueCollectionRepository: Repository<ServiceDueCollection>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private dataSource: DataSource,
  ) {}

  async create(
    data: {
      customerPhone: string;
      customerName?: string;
      deviceModel: string;
      problemDescription: string;
      imei?: string;
      serviceType: ServiceType;
      technicianName?: string;
      estimatedDeliveryDate?: string;
      serviceCharge: number;
      partsCost?: number;
      paidAmount?: number;
      paymentMethod?: PaymentMethod;
      note?: string;
      parts?: Array<{
        usageType: PartsUsageType;
        partName: string;
        quantity: number;
        partCost?: number;
        borrowPersonName?: string;
        borrowPersonPhone?: string;
        borrowPricePerUnit?: number;
        paidAmount?: number;
        paymentMethod?: PaymentMethod;
      }>;
    },
    userId: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let customer = await this.customerRepository.findOne({
        where: { phone: data.customerPhone },
      });

      if (!customer) {
        if (!data.customerName) {
          throw new BadRequestException('Customer name is required');
        }
        customer = this.customerRepository.create({
          name: data.customerName,
          phone: data.customerPhone,
        });
        customer = await queryRunner.manager.save(customer);
      }

      const totalAmount = data.serviceCharge + (data.partsCost || 0);
      const paidAmount = data.paidAmount || 0;
      const dueAmount = totalAmount - paidAmount;

      const jobData: Partial<ServiceJob> = {
        jobId: generateJobId(),
        customerId: customer.id,
        deviceModel: data.deviceModel,
        problemDescription: data.problemDescription,
        imei: data.imei,
        serviceType: data.serviceType,
        technicianName: data.technicianName,
        serviceCharge: data.serviceCharge,
        partsCost: data.partsCost || 0,
        totalAmount,
        paidAmount,
        dueAmount,
        paymentMethod: data.paymentMethod,
        note: data.note,
        createdById: userId,
      };

      if (data.estimatedDeliveryDate) {
        jobData.estimatedDeliveryDate = new Date(data.estimatedDeliveryDate);
      }

      const job = this.jobRepository.create(jobData);
      const savedJob = await queryRunner.manager.save(ServiceJob, job);

      if (data.parts && data.parts.length > 0) {
        for (const part of data.parts) {
          const totalBorrowAmount =
            part.usageType === PartsUsageType.BORROWED
              ? (part.borrowPricePerUnit || 0) * part.quantity
              : 0;

          const partEntity = this.partRepository.create({
            serviceJobId: savedJob.id,
            usageType: part.usageType,
            partName: part.partName,
            quantity: part.quantity,
            partCost: part.partCost,
            borrowPersonName: part.borrowPersonName,
            borrowPersonPhone: part.borrowPersonPhone,
            borrowPricePerUnit: part.borrowPricePerUnit,
            totalBorrowAmount,
            paidAmount: part.paidAmount || 0,
            dueAmount: totalBorrowAmount - (part.paidAmount || 0),
            paymentMethod: part.paymentMethod,
          });

          await queryRunner.manager.save(partEntity);
        }
      }

      await queryRunner.commitTransaction();

      return this.findOne(savedJob.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    filterDto: PaginationDto & {
      status?: ServiceStatus;
      technicianName?: string;
      dueOnly?: boolean;
      startDate?: string;
      endDate?: string;
    },
  ) {
    const {
      page = 1,
      limit = 10,
      status,
      technicianName,
      dueOnly,
      startDate,
      endDate,
    } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.customer', 'customer')
      .leftJoinAndSelect('job.parts', 'parts');

    if (status) {
      queryBuilder.andWhere('job.status = :status', { status });
    }

    if (technicianName) {
      queryBuilder.andWhere('job.technicianName LIKE :technicianName', {
        technicianName: `%${technicianName}%`,
      });
    }

    if (dueOnly) {
      queryBuilder.andWhere('job.dueAmount > 0');
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('job.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const [jobs, total] = await queryBuilder
      .orderBy('job.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: jobs,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['customer', 'parts', 'dueCollections', 'createdBy'],
    });
    if (!job) throw new NotFoundException('Service job not found');
    return job;
  }

  async updateStatus(id: string, status: ServiceStatus) {
    const job = await this.findOne(id);
    job.status = status;
    return this.jobRepository.save(job);
  }

  async collectDue(
    jobId: string,
    data: {
      amount: number;
      paymentMethod: PaymentMethod;
      receiveDate?: string;
      note?: string;
    },
    userId: string,
  ) {
    const job = await this.findOne(jobId);

    if (data.amount > job.dueAmount) {
      throw new BadRequestException('Amount exceeds total due');
    }

    const collection = this.dueCollectionRepository.create({
      serviceJobId: jobId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      receiveDate: data.receiveDate ? new Date(data.receiveDate) : new Date(),
      note: data.note,
      receivedById: userId,
    });

    await this.dueCollectionRepository.save(collection);

    job.paidAmount += data.amount;
    job.dueAmount -= data.amount;
    await this.jobRepository.save(job);

    return collection;
  }

  async getSummary() {
    const totalIncome = (await this.jobRepository
      .createQueryBuilder('job')
      .select('SUM(job.paidAmount)', 'total')
      .getRawOne()) as {
      total?: string | null;
    } | null;

    const totalDue = (await this.jobRepository
      .createQueryBuilder('job')
      .select('SUM(job.dueAmount)', 'total')
      .getRawOne()) as {
      total?: string | null;
    } | null;

    const borrowedPartsDue = (await this.partRepository
      .createQueryBuilder('part')
      .select('SUM(part.dueAmount)', 'total')
      .where('part.usageType = :type', { type: PartsUsageType.BORROWED })
      .getRawOne()) as {
      total?: string | null;
    } | null;

    return {
      totalServiceIncome: parseFloat(String(totalIncome?.total || '0')),
      totalServiceDue: parseFloat(String(totalDue?.total || '0')),
      borrowedPartsDue: parseFloat(String(borrowedPartsDue?.total || '0')),
    };
  }
}
