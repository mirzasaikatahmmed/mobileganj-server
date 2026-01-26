import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Sale,
  Expense,
  Product,
  Customer,
  Supplier,
  ServiceJob,
} from '../../database/entities';

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

  async getDashboardStats(branchId?: string, startDate?: Date, endDate?: Date) {
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

    const salesStats = (await salesQuery.getRawOne()) as {
      totalSales?: string | null;
      instantPaid?: string | null;
      totalDueSale?: string | null;
    } | null;

    const duePaidQuery = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.payments', 'payment')
      .select('SUM(payment.amount)', 'duePaid');

    if (startDate && endDate) {
      duePaidQuery.where(
        'payment.paymentDate BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    const duePaidStats = (await duePaidQuery.getRawOne()) as {
      duePaid?: string | null;
    } | null;

    const expenseQuery = this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'totalExpense');

    if (startDate && endDate) {
      expenseQuery.where(
        'expense.expenseDate BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    const expenseStats = (await expenseQuery.getRawOne()) as {
      totalExpense?: string | null;
    } | null;

    const totalSales = parseFloat(String(salesStats?.totalSales || '0'));
    const totalExpense = parseFloat(String(expenseStats?.totalExpense || '0'));

    const purchaseCostQuery = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.items', 'item')
      .leftJoin('item.product', 'product')
      .select(
        'SUM(product.purchasePrice * item.quantity)',
        'totalPurchaseCost',
      );

    if (branchId) {
      purchaseCostQuery.where('sale.branchId = :branchId', { branchId });
    }

    if (startDate && endDate) {
      purchaseCostQuery.andWhere(
        'sale.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    const purchaseCostStats = (await purchaseCostQuery.getRawOne()) as {
      totalPurchaseCost?: string | null;
    } | null;
    const totalPurchaseCost = parseFloat(
      String(purchaseCostStats?.totalPurchaseCost || '0'),
    );

    const totalProfit = totalSales - totalPurchaseCost - totalExpense;

    const serviceQuery = this.serviceJobRepository
      .createQueryBuilder('job')
      .select('SUM(job.paidAmount)', 'serviceProfit');

    if (startDate && endDate) {
      serviceQuery.where('job.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const serviceStats = (await serviceQuery.getRawOne()) as {
      serviceProfit?: string | null;
    } | null;

    const totalReturn = 0;

    return {
      totalSales,
      instantPaid: parseFloat(String(salesStats?.instantPaid || '0')),
      totalDueSale: parseFloat(String(salesStats?.totalDueSale || '0')),
      duePaid: parseFloat(String(duePaidStats?.duePaid || '0')),
      totalReturn,
      totalExpense,
      totalProfit,
      supplierDue: 0,
      mobileServiceProfit: parseFloat(
        String(serviceStats?.serviceProfit || '0'),
      ),
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
