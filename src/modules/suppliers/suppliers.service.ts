import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Supplier,
  SupplierPayment,
  Product,
  LocalSeller,
} from '../../database/entities';
import { PaymentMethod } from '../../common/constants';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(SupplierPayment)
    private paymentRepository: Repository<SupplierPayment>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(LocalSeller)
    private localSellerRepository: Repository<LocalSeller>,
  ) {}

  async create(data: {
    name: string;
    phone?: string;
    address?: string;
    shopName?: string;
    note?: string;
  }) {
    const supplier = this.supplierRepository.create(data);
    return this.supplierRepository.save(supplier);
  }

  async findAll(
    paginationDto: PaginationDto & { search?: string; dueOnly?: boolean },
  ) {
    const { page = 1, limit = 10, search, dueOnly } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.supplierRepository.createQueryBuilder('supplier');

    if (search) {
      queryBuilder.andWhere(
        '(supplier.name LIKE :search OR supplier.phone LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [suppliers, total] = await queryBuilder
      .orderBy('supplier.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const suppliersWithTotals = await Promise.all(
      suppliers.map(async (supplier) => {
        const totals = await this.getSupplierTotals(supplier.id);
        return { ...supplier, ...totals };
      }),
    );

    let filtered = suppliersWithTotals;
    if (dueOnly) {
      filtered = suppliersWithTotals.filter((s) => s.totalDue > 0);
    }

    return {
      data: filtered,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Supplier not found');

    const totals = await this.getSupplierTotals(id);
    const products = await this.productRepository.find({
      where: { supplierId: id },
      order: { createdAt: 'DESC' },
    });

    return { ...supplier, ...totals, products };
  }

  async getSupplierTotals(supplierId: string) {
    const purchaseResult = (await this.productRepository
      .createQueryBuilder('product')
      .select('COUNT(*)', 'totalPhones')
      .addSelect('SUM(product.purchasePrice)', 'totalPurchase')
      .where('product.supplierId = :supplierId', { supplierId })
      .getRawOne()) as {
      totalPhones?: string | null;
      totalPurchase?: string | null;
    } | null;

    const paymentResult = (await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'totalPaid')
      .where('payment.supplierId = :supplierId', { supplierId })
      .getRawOne()) as {
      totalPaid?: string | null;
    } | null;

    const totalPurchase = parseFloat(
      String(purchaseResult?.totalPurchase || '0'),
    );
    const totalPaid = parseFloat(String(paymentResult?.totalPaid || '0'));

    return {
      totalPhones: parseInt(String(purchaseResult?.totalPhones || '0')),
      totalPurchase,
      totalPaid,
      totalDue: totalPurchase - totalPaid,
    };
  }

  async makePayment(
    supplierId: string,
    data: {
      amount: number;
      paymentMethod: PaymentMethod;
      paymentDate: Date;
      note?: string;
    },
    userId: string,
  ) {
    await this.findOne(supplierId);

    const payment = this.paymentRepository.create({
      supplierId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      paymentDate: data.paymentDate,
      note: data.note,
      paidById: userId,
    });

    return this.paymentRepository.save(payment);
  }

  async findAllLocalSellers(
    paginationDto: PaginationDto & { search?: string },
  ) {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder =
      this.localSellerRepository.createQueryBuilder('seller');

    if (search) {
      queryBuilder.andWhere(
        '(seller.fullName LIKE :search OR seller.phone LIKE :search OR seller.nidNumber LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [sellers, total] = await queryBuilder
      .orderBy('seller.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const sellersWithCount = await Promise.all(
      sellers.map(async (seller) => {
        const count = await this.productRepository.count({
          where: { localSellerId: seller.id },
        });
        return { ...seller, totalPhonesBought: count };
      }),
    );

    return {
      data: sellersWithCount,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOneLocalSeller(id: string) {
    const seller = await this.localSellerRepository.findOne({ where: { id } });
    if (!seller) throw new NotFoundException('Local seller not found');

    const products = await this.productRepository.find({
      where: { localSellerId: id },
      order: { createdAt: 'DESC' },
    });

    return { ...seller, products };
  }
}
