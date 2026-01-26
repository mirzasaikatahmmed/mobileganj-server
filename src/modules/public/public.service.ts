import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Product,
  Brand,
  ProductVariant,
  PreOrder,
  Customer,
} from '../../database/entities';
import {
  ProductCategory,
  ProductStatus,
  ProductCondition,
  OrderStatus,
  PaymentMethod,
  EmiDuration,
} from '../../common/constants';
import { generateInvoiceNumber } from '../../common/utils';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(ProductVariant)
    private variantRepository: Repository<ProductVariant>,
    @InjectRepository(PreOrder)
    private preOrderRepository: Repository<PreOrder>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async getBrands() {
    return this.brandRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async getShopProducts(
    filterDto: PaginationDto & {
      category?: ProductCategory;
      brandId?: string;
      condition?: ProductCondition;
      minPrice?: number;
      maxPrice?: number;
      search?: string;
    },
  ) {
    const { page = 1, limit = 12, category, brandId, condition, minPrice, maxPrice, search } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .where('product.status = :status', { status: ProductStatus.IN_STOCK });

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (brandId) {
      queryBuilder.andWhere('product.brandId = :brandId', { brandId });
    }

    if (condition) {
      queryBuilder.andWhere('product.condition = :condition', { condition });
    }

    if (minPrice) {
      queryBuilder.andWhere('product.sellingPrice >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('product.sellingPrice <= :maxPrice', { maxPrice });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.title LIKE :search OR product.storage LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [products, total] = await queryBuilder
      .orderBy('product.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getPhones(filterDto: PaginationDto & { brandId?: string; condition?: ProductCondition; sort?: string }) {
    const { page = 1, limit = 12, brandId, condition, sort } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .where('product.category = :category', { category: ProductCategory.PHONE })
      .andWhere('product.status = :status', { status: ProductStatus.IN_STOCK });

    if (brandId) {
      queryBuilder.andWhere('product.brandId = :brandId', { brandId });
    }

    if (condition) {
      queryBuilder.andWhere('product.condition = :condition', { condition });
    }

    switch (sort) {
      case 'price_low':
        queryBuilder.orderBy('product.sellingPrice', 'ASC');
        break;
      case 'price_high':
        queryBuilder.orderBy('product.sellingPrice', 'DESC');
        break;
      case 'popular':
        queryBuilder.orderBy('product.isTrending', 'DESC');
        break;
      default:
        queryBuilder.orderBy('product.createdAt', 'DESC');
    }

    const [products, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getAccessories(filterDto: PaginationDto & { accessoryType?: string; minPrice?: number; maxPrice?: number }) {
    const { page = 1, limit = 12, accessoryType, minPrice, maxPrice } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.category = :category', { category: ProductCategory.ACCESSORIES })
      .andWhere('product.status = :status', { status: ProductStatus.IN_STOCK });

    if (accessoryType) {
      queryBuilder.andWhere('product.accessoryType = :accessoryType', { accessoryType });
    }

    if (minPrice) {
      queryBuilder.andWhere('product.sellingPrice >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('product.sellingPrice <= :maxPrice', { maxPrice });
    }

    const [products, total] = await queryBuilder
      .orderBy('product.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getPreOrderProducts() {
    return this.productRepository.find({
      where: { isPreOrder: true, status: ProductStatus.IN_STOCK },
      relations: ['brand', 'variants'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOfferProducts() {
    return this.productRepository.find({
      where: { status: ProductStatus.IN_STOCK },
      relations: ['brand'],
      order: { createdAt: 'DESC' },
    });
  }

  async getFeaturedProducts() {
    return this.productRepository.find({
      where: { isFeatured: true, status: ProductStatus.IN_STOCK },
      relations: ['brand'],
      take: 8,
    });
  }

  async getNewArrivals() {
    return this.productRepository.find({
      where: { isNewArrival: true, status: ProductStatus.IN_STOCK },
      relations: ['brand'],
      take: 8,
    });
  }

  async getTrendingProducts() {
    return this.productRepository.find({
      where: { isTrending: true, status: ProductStatus.IN_STOCK },
      relations: ['brand'],
      take: 8,
    });
  }

  async getProductDetails(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'variants'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async calculateEmi(
    totalPrice: number,
    downPayment: number,
    duration: EmiDuration,
    interestRate: number = 0,
  ) {
    const remainingAmount = totalPrice - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    let monthlyInstallment: number;
    let totalPayable: number;

    if (interestRate === 0) {
      monthlyInstallment = remainingAmount / duration;
      totalPayable = totalPrice;
    } else {
      monthlyInstallment =
        (remainingAmount * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
        (Math.pow(1 + monthlyInterest, duration) - 1);
      totalPayable = downPayment + monthlyInstallment * duration;
    }

    return {
      totalPrice,
      downPayment,
      remainingAmount,
      duration,
      interestRate,
      monthlyInstallment: Math.ceil(monthlyInstallment),
      totalPayable: Math.ceil(totalPayable),
    };
  }

  async createPreOrder(data: {
    customerName: string;
    customerPhone: string;
    customerAddress?: string;
    productId?: string;
    variantId?: string;
    productName: string;
    variantDetails?: string;
    totalPrice: number;
    isEmi?: boolean;
    emiDuration?: EmiDuration;
    downPayment?: number;
    emiInterestRate?: number;
    bookingAmount: number;
    paymentMethod?: PaymentMethod;
    note?: string;
  }) {
    // Find or create customer
    let customer = await this.customerRepository.findOne({
      where: { phone: data.customerPhone },
    });

    if (!customer) {
      customer = this.customerRepository.create({
        name: data.customerName,
        phone: data.customerPhone,
        address: data.customerAddress,
      });
      customer = await this.customerRepository.save(customer);
    }

    let monthlyInstallment: number | undefined;
    let totalPayableWithEmi: number | undefined;

    if (data.isEmi && data.emiDuration && data.downPayment !== undefined) {
      const emiCalc = await this.calculateEmi(
        data.totalPrice,
        data.downPayment,
        data.emiDuration,
        data.emiInterestRate || 0,
      );
      monthlyInstallment = emiCalc.monthlyInstallment;
      totalPayableWithEmi = emiCalc.totalPayable;
    }

    const preOrder = this.preOrderRepository.create({
      orderNo: generateInvoiceNumber('PRE'),
      customerId: customer.id,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      productId: data.productId,
      variantId: data.variantId,
      productName: data.productName,
      variantDetails: data.variantDetails,
      totalPrice: data.totalPrice,
      isEmi: data.isEmi || false,
      emiDuration: data.emiDuration,
      downPayment: data.downPayment,
      monthlyInstallment,
      emiInterestRate: data.emiInterestRate,
      totalPayableWithEmi,
      bookingAmount: data.bookingAmount,
      paidAmount: data.bookingAmount,
      paymentMethod: data.paymentMethod,
      status: OrderStatus.PENDING,
      expectedDeliveryDays: 7,
      note: data.note,
    });

    return this.preOrderRepository.save(preOrder);
  }
}
