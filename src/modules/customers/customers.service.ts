import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  Customer,
  Sale,
  DueCollection,
  Payment,
} from '../../database/entities';
import {
  CreateCustomerDto,
  DueCollectionDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from './dto';
import { PaymentStatus } from '../../common/constants';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(DueCollection)
    private dueCollectionRepository: Repository<DueCollection>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private dataSource: DataSource,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const existing = await this.customerRepository.findOne({
      where: { phone: createCustomerDto.phone },
    });

    if (existing) {
      throw new ConflictException('Customer with this phone already exists');
    }

    const { nid, ...rest } = createCustomerDto;
    const customer = this.customerRepository.create({
      ...rest,
      nidNumber: nid,
    });
    return this.customerRepository.save(customer);
  }

  async findAll(filters: FilterCustomerDto) {
    const {
      page = 1,
      limit = 10,
      search,
      customerTypeId,
      groupId,
      status,
      dueOnly,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = filters;
    const skip = (page - 1) * limit;

    const queryBuilder = this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.customerType', 'customerType')
      .leftJoinAndSelect('customer.groups', 'groups');

    if (search) {
      queryBuilder.andWhere(
        '(customer.name LIKE :search OR customer.phone LIKE :search OR customer.email LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (customerTypeId) {
      queryBuilder.andWhere('customer.customerTypeId = :customerTypeId', {
        customerTypeId,
      });
    }

    if (groupId) {
      queryBuilder.andWhere('groups.id = :groupId', { groupId });
    }

    if (status === 'active') {
      queryBuilder.andWhere('customer.isActive = :isActive', {
        isActive: true,
      });
    } else if (status === 'inactive') {
      queryBuilder.andWhere('customer.isActive = :isActive', {
        isActive: false,
      });
    }

    const allowedSortFields = [
      'name',
      'phone',
      'email',
      'createdAt',
      'isActive',
    ];
    const orderField = allowedSortFields.includes(sortBy)
      ? `customer.${sortBy}`
      : 'customer.createdAt';
    const orderDirection = sortOrder === 'ASC' ? 'ASC' : 'DESC';

    const [customers, total] = await queryBuilder
      .orderBy(orderField, orderDirection)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const customersWithTotals = await Promise.all(
      customers.map(async (customer) => {
        const totals = await this.getCustomerTotals(customer.id);
        return {
          ...customer,
          ...totals,
        };
      }),
    );

    let filteredCustomers = customersWithTotals;
    if (dueOnly) {
      filteredCustomers = customersWithTotals.filter((c) => c.totalDue > 0);
    }

    return {
      data: filteredCustomers,
      meta: {
        total: dueOnly ? filteredCustomers.length : total,
        page,
        limit,
        totalPages: Math.ceil(
          (dueOnly ? filteredCustomers.length : total) / limit,
        ),
      },
    };
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['customerType', 'groups'],
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const totals = await this.getCustomerTotals(id);
    const sales = await this.saleRepository.find({
      where: { customerId: id },
      order: { createdAt: 'DESC' },
    });

    return {
      ...customer,
      ...totals,
      sales,
    };
  }

  async findByPhone(phone: string) {
    const customer = await this.customerRepository.findOne({
      where: { phone },
    });

    return customer;
  }

  async getCustomerTotals(customerId: string) {
    const result = (await this.saleRepository
      .createQueryBuilder('sale')
      .select('SUM(sale.grandTotal)', 'totalPurchase')
      .addSelect('SUM(sale.paidAmount)', 'totalPaid')
      .addSelect('SUM(sale.dueAmount)', 'totalDue')
      .addSelect('MAX(sale.saleDate)', 'lastPurchaseDate')
      .where('sale.customerId = :customerId', { customerId })
      .getRawOne()) as {
      totalPurchase?: string | null;
      totalPaid?: string | null;
      totalDue?: string | null;
      lastPurchaseDate?: Date | null;
    } | null;

    return {
      totalPurchase: parseFloat(String(result?.totalPurchase || '0')),
      totalPaid: parseFloat(String(result?.totalPaid || '0')),
      totalDue: parseFloat(String(result?.totalDue || '0')),
      lastPurchaseDate: result?.lastPurchaseDate || null,
    };
  }

  async getStats() {
    const total = await this.customerRepository.count();
    const active = await this.customerRepository.count({
      where: { isActive: true },
    });
    const inactive = total - active;

    const dueResult = (await this.saleRepository
      .createQueryBuilder('sale')
      .select('COUNT(DISTINCT sale.customerId)', 'count')
      .addSelect('SUM(sale.dueAmount)', 'total')
      .where('sale.dueAmount > 0')
      .getRawOne()) as { count?: string; total?: string } | null;

    return {
      total,
      active,
      inactive,
      withDue: parseInt(String(dueResult?.count || '0')),
      totalDueAmount: parseFloat(String(dueResult?.total || '0')),
    };
  }

  async getWithDue() {
    const customers = await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.customerType', 'customerType')
      .leftJoinAndSelect('customer.sales', 'sales')
      .where('sales.dueAmount > 0')
      .getMany();

    return Promise.all(
      customers.map(async (customer) => {
        const totals = await this.getCustomerTotals(customer.id);
        return {
          ...customer,
          ...totals,
        };
      }),
    );
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    if (updateCustomerDto.phone && updateCustomerDto.phone !== customer.phone) {
      const existing = await this.customerRepository.findOne({
        where: { phone: updateCustomerDto.phone },
      });
      if (existing) {
        throw new ConflictException('Customer with this phone already exists');
      }
    }

    const { nid, ...rest } = updateCustomerDto;
    Object.assign(customer, {
      ...rest,
      nidNumber: nid,
    });
    return this.customerRepository.save(customer);
  }

  async collectDue(dueCollectionDto: DueCollectionDto, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const totals = await this.getCustomerTotals(dueCollectionDto.customerId);

      if (dueCollectionDto.amount > totals.totalDue) {
        throw new BadRequestException(
          'Collection amount cannot exceed total due',
        );
      }

      const collection = this.dueCollectionRepository.create({
        customerId: dueCollectionDto.customerId,
        amount: dueCollectionDto.amount,
        paymentMethod: dueCollectionDto.paymentMethod,
        receiveDate: dueCollectionDto.receiveDate
          ? new Date(dueCollectionDto.receiveDate)
          : new Date(),
        note: dueCollectionDto.note,
        receivedById: userId,
      });

      await queryRunner.manager.save(collection);

      const dueSales = await this.saleRepository.find({
        where: [
          {
            customerId: dueCollectionDto.customerId,
            status: PaymentStatus.DUE,
          },
          {
            customerId: dueCollectionDto.customerId,
            status: PaymentStatus.PARTIAL_PAID,
          },
        ],
        order: { createdAt: 'ASC' },
      });

      let remainingAmount = dueCollectionDto.amount;

      for (const sale of dueSales) {
        if (remainingAmount <= 0) break;

        const paymentAmount = Math.min(remainingAmount, sale.dueAmount);
        sale.paidAmount += paymentAmount;
        sale.dueAmount -= paymentAmount;

        if (sale.dueAmount === 0) {
          sale.status = PaymentStatus.PAID;
        } else {
          sale.status = PaymentStatus.PARTIAL_PAID;
        }

        await queryRunner.manager.save(sale);

        const payment = this.paymentRepository.create({
          saleId: sale.id,
          amount: paymentAmount,
          paymentMethod: dueCollectionDto.paymentMethod,
          paymentDate: new Date(),
          note: `Due collection - ${dueCollectionDto.note || ''}`,
          receivedById: userId,
        });
        await queryRunner.manager.save(payment);

        remainingAmount -= paymentAmount;
      }

      await queryRunner.commitTransaction();

      return {
        message: 'Due collected successfully',
        collection,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getDueCollectionHistory(customerId?: string) {
    const where = customerId ? { customerId } : {};
    return this.dueCollectionRepository.find({
      where,
      relations: ['customer', 'receivedBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    await this.customerRepository.softDelete(id);
    return { message: 'Customer deleted successfully' };
  }
}
