import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  Sale,
  SaleItem,
  Customer,
  Product,
  Payment,
} from '../../database/entities';
import { CreateSaleDto, SaleFilterDto } from './dto';
import {
  PaymentStatus,
  ProductCategory,
  ProductStatus,
} from '../../common/constants';
import { generateInvoiceNumber } from '../../common/utils';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private saleItemRepository: Repository<SaleItem>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private dataSource: DataSource,
  ) {}

  async create(createSaleDto: CreateSaleDto, userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find or create customer
      let customer = await this.customerRepository.findOne({
        where: { phone: createSaleDto.customerPhone },
      });

      if (!customer) {
        if (!createSaleDto.customerName) {
          throw new BadRequestException(
            'Customer name is required for new customers',
          );
        }
        customer = this.customerRepository.create({
          name: createSaleDto.customerName,
          phone: createSaleDto.customerPhone,
          address: createSaleDto.customerAddress,
        });
        customer = await queryRunner.manager.save(customer);
      }

      // Calculate totals and validate stock
      let subtotal = 0;
      const saleItems: Partial<SaleItem>[] = [];

      for (const item of createSaleDto.items) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }

        if (product.stockQty < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for ${product.title}`,
          );
        }

        // Phone quantity should always be 1
        if (
          product.category === ProductCategory.PHONE &&
          item.quantity !== 1
        ) {
          throw new BadRequestException('Phone quantity must be 1');
        }

        const totalPrice = item.unitPrice * item.quantity;
        subtotal += totalPrice;

        saleItems.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice,
          imei: item.imei || product.imei1,
          warrantyMonths: item.warrantyMonths || product.warrantyMonths,
          customWarrantyText:
            item.customWarrantyText || product.customWarrantyText,
        });

        // Update stock
        product.stockQty -= item.quantity;
        if (product.category === ProductCategory.PHONE) {
          product.status = ProductStatus.SOLD;
        } else if (product.stockQty === 0) {
          product.status = ProductStatus.OUT_OF_STOCK;
        }
        await queryRunner.manager.save(product);
      }

      // Calculate discount
      let discountAmount = 0;
      if (createSaleDto.discountType && createSaleDto.discountValue) {
        if (createSaleDto.discountType === 'fixed') {
          discountAmount = createSaleDto.discountValue;
        } else {
          discountAmount = (subtotal * createSaleDto.discountValue) / 100;
        }
      }

      const grandTotal = subtotal - discountAmount;
      const dueAmount = grandTotal - createSaleDto.paidAmount;

      if (createSaleDto.paidAmount > grandTotal) {
        throw new BadRequestException(
          'Paid amount cannot exceed grand total',
        );
      }

      // Determine payment status
      let status: PaymentStatus;
      if (dueAmount === 0) {
        status = PaymentStatus.PAID;
      } else if (createSaleDto.paidAmount > 0) {
        status = PaymentStatus.PARTIAL_PAID;
      } else {
        status = PaymentStatus.DUE;
      }

      // Create sale
      const invoiceNo = generateInvoiceNumber();
      const saleData: Partial<Sale> = {
        invoiceNo,
        saleDate: new Date(),
        customerId: customer.id,
        branchId: createSaleDto.branchId,
        subtotal,
        discountType: createSaleDto.discountType,
        discountValue: createSaleDto.discountValue || 0,
        discountAmount,
        grandTotal,
        paidAmount: createSaleDto.paidAmount,
        dueAmount,
        paymentMethod: createSaleDto.paymentMethod,
        status,
        note: createSaleDto.note,
        createdById: userId,
      };

      if (createSaleDto.dueDate) {
        saleData.dueDate = new Date(createSaleDto.dueDate);
      }

      const sale = this.saleRepository.create(saleData);
      const savedSale = await queryRunner.manager.save(Sale, sale);

      // Create sale items
      for (const item of saleItems) {
        const saleItem = this.saleItemRepository.create({
          ...item,
          saleId: savedSale.id,
        });
        await queryRunner.manager.save(SaleItem, saleItem);
      }

      // Create initial payment record if paid amount > 0
      if (createSaleDto.paidAmount > 0) {
        const payment = this.paymentRepository.create({
          saleId: savedSale.id,
          amount: createSaleDto.paidAmount,
          paymentMethod: createSaleDto.paymentMethod,
          paymentDate: new Date(),
          receivedById: userId,
        });
        await queryRunner.manager.save(Payment, payment);
      }

      await queryRunner.commitTransaction();

      return this.findOne(savedSale.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(filterDto: SaleFilterDto) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      customerId,
      branchId,
      startDate,
      endDate,
    } = filterDto;

    const skip = (page - 1) * limit;

    const queryBuilder = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.customer', 'customer')
      .leftJoinAndSelect('sale.branch', 'branch')
      .leftJoinAndSelect('sale.createdBy', 'createdBy')
      .leftJoinAndSelect('sale.items', 'items')
      .leftJoinAndSelect('items.product', 'product');

    if (search) {
      queryBuilder.andWhere(
        '(sale.invoiceNo LIKE :search OR customer.name LIKE :search OR customer.phone LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      queryBuilder.andWhere('sale.status = :status', { status });
    }

    if (customerId) {
      queryBuilder.andWhere('sale.customerId = :customerId', { customerId });
    }

    if (branchId) {
      queryBuilder.andWhere('sale.branchId = :branchId', { branchId });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('sale.saleDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    queryBuilder
      .orderBy('sale.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [sales, total] = await queryBuilder.getManyAndCount();

    return {
      data: sales,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: [
        'customer',
        'branch',
        'createdBy',
        'items',
        'items.product',
        'payments',
      ],
    });

    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    return sale;
  }

  async findByInvoice(invoiceNo: string) {
    const sale = await this.saleRepository.findOne({
      where: { invoiceNo },
      relations: [
        'customer',
        'branch',
        'createdBy',
        'items',
        'items.product',
        'payments',
      ],
    });

    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    return sale;
  }

  async getRecentSales(limit: number = 10) {
    return this.saleRepository.find({
      relations: ['customer'],
      order: { createdAt: 'DESC' },
      take: limit,
      select: {
        id: true,
        invoiceNo: true,
        grandTotal: true,
        paidAmount: true,
        dueAmount: true,
        status: true,
        createdAt: true,
        customer: {
          id: true,
          name: true,
        },
      },
    });
  }

  async getDueSales(limit: number = 10) {
    return this.saleRepository.find({
      where: [
        { status: PaymentStatus.DUE },
        { status: PaymentStatus.PARTIAL_PAID },
      ],
      relations: ['customer'],
      order: { dueAmount: 'DESC' },
      take: limit,
      select: {
        id: true,
        invoiceNo: true,
        dueAmount: true,
        dueDate: true,
        customer: {
          id: true,
          name: true,
        },
      },
    });
  }
}
