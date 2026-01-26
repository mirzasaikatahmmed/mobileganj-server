import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import {
  Sale,
  Expense,
  Product,
  Customer,
  Supplier,
  ServiceJob,
} from '../../database/entities';
import { PaymentStatus } from '../../common/constants';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(ServiceJob)
    private serviceJobRepository: Repository<ServiceJob>,
  ) {}

  async getDashboardStats(
    branchId?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const dateFilter = startDate && endDate ? { createdAt: Between(startDate, endDate) } : {};
    const branchFilter = branchId ? { branchId } : {};

    // Sales Stats
    const salesQuery = this.saleRepository
      .createQueryBuilder('sale')
      .select('SUM(sale.grandTotal)', 'totalSales')
      .addSelect('SUM(sale.paidAmount)', 'instantPaid')
      .addSelect('SUM(sale.dueAmount)', 'totalDueSale');

    if (branchId) {
      salesQuery.where('sale.branchId = :branchId', { branchId });
    }

    if (startDate && endDate) {
      salesQuery.andWhere('sale.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const salesStats = await salesQuery.getRawOne();

    // Due Paid (from DueCollections during this period)
    const duePaidQuery = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.payments', 'payment')
      .select('SUM(payment.amount)', 'duePaid');

    if (startDate && endDate) {
      duePaidQuery.where('payment.paymentDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const duePaidStats = await duePaidQuery.getRawOne();

    // Expense Stats
    const expenseQuery = this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'totalExpense');

    if (startDate && endDate) {
      expenseQuery.where('expense.expenseDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const expenseStats = await expenseQuery.getRawOne();

    // Calculate profit
    const totalSales = parseFloat(salesStats?.totalSales || '0');
    const totalExpense = parseFloat(expenseStats?.totalExpense || '0');

    // Get purchase cost for sold items
    const purchaseCostQuery = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.items', 'item')
      .leftJoin('item.product', 'product')
      .select('SUM(product.purchasePrice * item.quantity)', 'totalPurchaseCost');

    if (branchId) {
      purchaseCostQuery.where('sale.branchId = :branchId', { branchId });
    }

    if (startDate && endDate) {
      purchaseCostQuery.andWhere('sale.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const purchaseCostStats = await purchaseCostQuery.getRawOne();
    const totalPurchaseCost = parseFloat(purchaseCostStats?.totalPurchaseCost || '0');

    const totalProfit = totalSales - totalPurchaseCost - totalExpense;

    // Supplier Due
    const supplierDueQuery = this.productRepository
      .createQueryBuilder('product')
      .select('SUM(product.purchasePrice)', 'totalPurchase')
      .where('product.supplierId IS NOT NULL');

    const supplierPurchase = await supplierDueQuery.getRawOne();

    // Service Profit
    const serviceQuery = this.serviceJobRepository
      .createQueryBuilder('job')
      .select('SUM(job.paidAmount)', 'serviceProfit');

    if (startDate && endDate) {
      serviceQuery.where('job.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const serviceStats = await serviceQuery.getRawOne();

    // Return Stats (simplified - could be enhanced)
    const totalReturn = 0; // Would need a returns table

    return {
      totalSales,
      instantPaid: parseFloat(salesStats?.instantPaid || '0'),
      totalDueSale: parseFloat(salesStats?.totalDueSale || '0'),
      duePaid: parseFloat(duePaidStats?.duePaid || '0'),
      totalReturn,
      totalExpense,
      totalProfit,
      supplierDue: 0, // Would need supplier payment tracking
      mobileServiceProfit: parseFloat(serviceStats?.serviceProfit || '0'),
    };
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
        customer: {
          id: true,
          name: true,
        },
      },
    });
  }

  async getDueList(limit: number = 10) {
    return this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.customer', 'customer')
      .where('sale.dueAmount > 0')
      .orderBy('sale.dueAmount', 'DESC')
      .take(limit)
      .getMany();
  }
}
