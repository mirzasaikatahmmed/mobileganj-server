import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  OverseasPhoneTracking,
  OverseasPhoneStatusHistory,
  Carrier,
  Product,
  Supplier,
} from '../../database/entities';
import {
  OverseasPhoneStatus,
  SourceType,
  ContractType,
  PaymentMethod,
  ProductCategory,
  PhoneType,
  ProductStatus,
} from '../../common/constants';
import { generateBarcode } from '../../common/utils';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class OverseasTrackingService {
  constructor(
    @InjectRepository(OverseasPhoneTracking)
    private trackingRepository: Repository<OverseasPhoneTracking>,
    @InjectRepository(OverseasPhoneStatusHistory)
    private historyRepository: Repository<OverseasPhoneStatusHistory>,
    @InjectRepository(Carrier)
    private carrierRepository: Repository<Carrier>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private dataSource: DataSource,
  ) {}

  async createCarrier(data: {
    name: string;
    phone?: string;
    location?: string;
    note?: string;
  }) {
    const carrier = this.carrierRepository.create(data);
    return this.carrierRepository.save(carrier);
  }

  async findAllCarriers() {
    return this.carrierRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async create(
    data: {
      phoneModel: string;
      brand: string;
      imei1: string;
      imei2?: string;
      storageVariant?: string;
      sourceType: SourceType;
      sourcePersonName: string;
      sourcePhone?: string;
      location?: string;
      carrierId?: string;
      contractType?: ContractType;
      contractDetails?: string;
      contractStartDate?: string;
      expectedDeliveryDate?: string;
      amountGiven?: number;
      paymentMethod?: PaymentMethod;
      paymentDate?: string;
      note?: string;
    },
    userId: string,
  ) {
    const {
      contractStartDate,
      expectedDeliveryDate,
      paymentDate,
      ...restData
    } = data;

    const trackingData: Partial<OverseasPhoneTracking> = {
      ...restData,
      status: OverseasPhoneStatus.PURCHASED,
    };

    if (contractStartDate) {
      trackingData.contractStartDate = new Date(contractStartDate);
    }
    if (expectedDeliveryDate) {
      trackingData.expectedDeliveryDate = new Date(expectedDeliveryDate);
    }
    if (paymentDate) {
      trackingData.paymentDate = new Date(paymentDate);
    }

    const tracking = this.trackingRepository.create(trackingData);
    const savedTracking = await this.trackingRepository.save(tracking);

    await this.createStatusHistory(
      savedTracking.id,
      undefined,
      OverseasPhoneStatus.PURCHASED,
      userId,
      'Initial entry',
    );

    return savedTracking;
  }

  async findAll(
    filterDto: PaginationDto & {
      status?: OverseasPhoneStatus;
      carrierId?: string;
      sourceType?: SourceType;
      startDate?: string;
      endDate?: string;
    },
  ) {
    const {
      page = 1,
      limit = 10,
      status,
      carrierId,
      sourceType,
      startDate,
      endDate,
    } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.trackingRepository
      .createQueryBuilder('tracking')
      .leftJoinAndSelect('tracking.carrier', 'carrier');

    if (status) {
      queryBuilder.andWhere('tracking.status = :status', { status });
    }

    if (carrierId) {
      queryBuilder.andWhere('tracking.carrierId = :carrierId', { carrierId });
    }

    if (sourceType) {
      queryBuilder.andWhere('tracking.sourceType = :sourceType', {
        sourceType,
      });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'tracking.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    const [trackings, total] = await queryBuilder
      .orderBy('tracking.updatedAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: trackings,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const tracking = await this.trackingRepository.findOne({
      where: { id },
      relations: ['carrier', 'statusHistory', 'statusHistory.updatedBy'],
    });
    if (!tracking) throw new NotFoundException('Tracking not found');
    return tracking;
  }

  async updateStatus(
    id: string,
    newStatus: OverseasPhoneStatus,
    userId: string,
    note?: string,
  ) {
    const tracking = await this.findOne(id);
    const previousStatus = tracking.status;

    tracking.status = newStatus;
    await this.trackingRepository.save(tracking);

    await this.createStatusHistory(id, previousStatus, newStatus, userId, note);

    return this.findOne(id);
  }

  private async createStatusHistory(
    trackingId: string,
    previousStatus: OverseasPhoneStatus | undefined,
    newStatus: OverseasPhoneStatus,
    userId: string,
    note?: string,
  ) {
    const history = this.historyRepository.create({
      trackingId,
      previousStatus,
      newStatus,
      note,
      updatedById: userId,
    });
    return this.historyRepository.save(history);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addToStock(trackingId: string, _userId: string) {
    const tracking = await this.findOne(trackingId);

    if (tracking.isAddedToStock) {
      throw new Error('Already added to stock');
    }

    let supplier = await this.supplierRepository.findOne({
      where: { name: tracking.sourcePersonName },
    });

    if (!supplier) {
      supplier = this.supplierRepository.create({
        name: tracking.sourcePersonName,
        phone: tracking.sourcePhone,
      });
      supplier = await this.supplierRepository.save(supplier);
    }

    const product = this.productRepository.create({
      title: `${tracking.brand} ${tracking.phoneModel}`,
      category: ProductCategory.PHONE,
      phoneType: PhoneType.OVERSEAS,
      imei1: tracking.imei1,
      imei2: tracking.imei2,
      barcode: generateBarcode('PH'),
      purchasePrice: tracking.amountGiven || 0,
      sellingPrice: 0,
      stockQty: 1,
      status: ProductStatus.IN_STOCK,
      supplierId: supplier.id,
      storage: tracking.storageVariant,
    });

    const savedProduct = await this.productRepository.save(product);

    tracking.isAddedToStock = true;
    tracking.stockProductId = savedProduct.id;
    await this.trackingRepository.save(tracking);

    return savedProduct;
  }

  async getSummary() {
    const statusCounts = await this.trackingRepository
      .createQueryBuilder('tracking')
      .select('tracking.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('tracking.status')
      .getRawMany();

    const carrierBreakdown = await this.trackingRepository
      .createQueryBuilder('tracking')
      .leftJoin('tracking.carrier', 'carrier')
      .select('carrier.name', 'carrierName')
      .addSelect('COUNT(*)', 'totalAssigned')
      .addSelect(
        `SUM(CASE WHEN tracking.status = '${OverseasPhoneStatus.WITH_CARRIER}' THEN 1 ELSE 0 END)`,
        'currentlyWith',
      )
      .addSelect(
        `SUM(CASE WHEN tracking.status = '${OverseasPhoneStatus.RETURNED_FROM_CARRIER}' THEN 1 ELSE 0 END)`,
        'returned',
      )
      .addSelect(
        `SUM(CASE WHEN tracking.status = '${OverseasPhoneStatus.DELIVERED}' THEN 1 ELSE 0 END)`,
        'delivered',
      )
      .where('tracking.carrierId IS NOT NULL')
      .groupBy('carrier.id')
      .getRawMany();

    return {
      statusCounts,
      carrierBreakdown,
    };
  }
}
