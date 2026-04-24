import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Sale,
  Payment,
  Product,
  Expense,
  Customer,
  DueCollection,
  Supplier,
  SupplierPayment,
  ServiceJob,
} from '../../database/entities';

export interface PaymentRow {
  id: string;
  date: string;
  amount: string;
  paymentMethod: string;
  referenceNo: string;
  customerName: string;
  type: string;
}

export interface CustomerDueRow {
  id: string;
  name: string;
  phone: string;
  totalPurchase: string;
  totalPaid: string;
  totalDue: string;
  nextDueDate: string;
}

export interface DayBookRow {
  id: string;
  referenceNo: string;
  date: string;
  description: string;
  income: string;
  expense: string;
  type: string;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(DueCollection)
    private dueCollectionRepository: Repository<DueCollection>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(SupplierPayment)
    private supplierPaymentRepository: Repository<SupplierPayment>,
    @InjectRepository(ServiceJob)
    private serviceJobRepository: Repository<ServiceJob>,
  ) {}

  async getSalesReport(
    startDate?: string,
    endDate?: string,
    branchId?: string,
  ) {
    const qb = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.items', 'item')
      .leftJoin('item.product', 'product')
      .leftJoin('sale.customer', 'customer')
      .select('DATE(sale.saleDate)', 'date')
      .addSelect('COUNT(DISTINCT sale.id)', 'invoices')
      .addSelect('SUM(item.quantity)', 'quantity')
      .addSelect('SUM(sale.grandTotal)', 'revenue')
      .addSelect(
        'SUM(sale.grandTotal - product.purchasePrice * item.quantity)',
        'profit',
      )
      .addSelect('COUNT(DISTINCT sale.customerId)', 'customers')
      .groupBy('DATE(sale.saleDate)')
      .orderBy('DATE(sale.saleDate)', 'DESC');

    if (startDate && endDate) {
      qb.where('sale.saleDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }
    if (branchId) {
      qb.andWhere('sale.branchId = :branchId', { branchId });
    }

    const rows = await qb.getRawMany();

    const summary = (await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.items', 'item')
      .leftJoin('item.product', 'product')
      .select('SUM(sale.grandTotal)', 'totalRevenue')
      .addSelect(
        'SUM(sale.grandTotal - product.purchasePrice * item.quantity)',
        'totalProfit',
      )
      .addSelect('COUNT(DISTINCT sale.id)', 'totalInvoices')
      .addSelect('COUNT(DISTINCT sale.customerId)', 'totalCustomers')
      .where(
        startDate && endDate
          ? 'sale.saleDate BETWEEN :startDate AND :endDate'
          : '1=1',
        { startDate, endDate },
      )
      .getRawOne()) as Record<string, string | null> | null;

    return {
      data: rows,
      summary: {
        totalRevenue: parseFloat(String(summary?.totalRevenue || '0')),
        totalProfit: parseFloat(String(summary?.totalProfit || '0')),
        totalInvoices: parseInt(String(summary?.totalInvoices || '0')),
        totalCustomers: parseInt(String(summary?.totalCustomers || '0')),
      },
    };
  }

  async getPurchaseReport(
    startDate?: string,
    endDate?: string,
    supplierId?: string,
  ) {
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.supplier', 'supplier')
      .leftJoin('product.brand', 'brand')
      .select('product.id', 'id')
      .addSelect('product.title', 'title')
      .addSelect('brand.name', 'brand')
      .addSelect('product.purchasePrice', 'purchasePrice')
      .addSelect('product.stockQty', 'stockQty')
      .addSelect('product.status', 'status')
      .addSelect('supplier.name', 'supplierName')
      .addSelect('product.createdAt', 'date')
      .orderBy('product.createdAt', 'DESC');

    if (startDate && endDate) {
      qb.where('product.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }
    if (supplierId) {
      qb.andWhere('product.supplierId = :supplierId', { supplierId });
    }

    const rows = await qb.getRawMany();

    const summary = (await this.productRepository
      .createQueryBuilder('product')
      .select('COUNT(*)', 'totalProducts')
      .addSelect(
        'SUM(product.purchasePrice * product.stockQty)',
        'totalPurchaseValue',
      )
      .where(
        startDate && endDate
          ? 'product.createdAt BETWEEN :startDate AND :endDate'
          : '1=1',
        { startDate, endDate },
      )
      .getRawOne()) as Record<string, string | null> | null;

    return {
      data: rows,
      summary: {
        totalProducts: parseInt(String(summary?.totalProducts || '0')),
        totalPurchaseValue: parseFloat(
          String(summary?.totalPurchaseValue || '0'),
        ),
      },
    };
  }

  async getExpenseReport(
    startDate?: string,
    endDate?: string,
    categoryId?: string,
  ) {
    const qb = this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoin('expense.category', 'category')
      .select('expense.id', 'id')
      .addSelect('expense.expenseDate', 'date')
      .addSelect('category.name', 'category')
      .addSelect('category.type', 'type')
      .addSelect('expense.amount', 'amount')
      .addSelect('expense.paymentMethod', 'paymentMethod')
      .addSelect('expense.note', 'note')
      .orderBy('expense.expenseDate', 'DESC');

    if (startDate && endDate) {
      qb.where('expense.expenseDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }
    if (categoryId) {
      qb.andWhere('expense.categoryId = :categoryId', { categoryId });
    }

    const rows = await qb.getRawMany();

    const summary = (await this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'totalAmount')
      .addSelect('COUNT(*)', 'totalCount')
      .where(
        startDate && endDate
          ? 'expense.expenseDate BETWEEN :startDate AND :endDate'
          : '1=1',
        { startDate, endDate },
      )
      .getRawOne()) as Record<string, string | null> | null;

    const byCategory = await this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoin('expense.category', 'category')
      .select('category.name', 'category')
      .addSelect('SUM(expense.amount)', 'total')
      .addSelect('COUNT(*)', 'count')
      .where(
        startDate && endDate
          ? 'expense.expenseDate BETWEEN :startDate AND :endDate'
          : '1=1',
        { startDate, endDate },
      )
      .groupBy('category.id')
      .getRawMany();

    return {
      data: rows,
      byCategory,
      summary: {
        totalAmount: parseFloat(String(summary?.totalAmount || '0')),
        totalCount: parseInt(String(summary?.totalCount || '0')),
      },
    };
  }

  async getPaymentReport(startDate?: string, endDate?: string) {
    const salePayments: PaymentRow[] = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoin('payment.sale', 'sale')
      .leftJoin('sale.customer', 'customer')
      .select('payment.id', 'id')
      .addSelect('payment.paymentDate', 'date')
      .addSelect('payment.amount', 'amount')
      .addSelect('payment.paymentMethod', 'paymentMethod')
      .addSelect('sale.invoiceNo', 'referenceNo')
      .addSelect('customer.name', 'customerName')
      .addSelect("'sale'", 'type')
      .where(
        startDate && endDate
          ? 'payment.paymentDate BETWEEN :startDate AND :endDate'
          : '1=1',
        { startDate, endDate },
      )
      .getRawMany();

    const dueCollections: PaymentRow[] = await this.dueCollectionRepository
      .createQueryBuilder('dc')
      .leftJoin('dc.customer', 'customer')
      .select('dc.id', 'id')
      .addSelect('dc.receiveDate', 'date')
      .addSelect('dc.amount', 'amount')
      .addSelect('dc.paymentMethod', 'paymentMethod')
      .addSelect("'DUE-COLLECTION'", 'referenceNo')
      .addSelect('customer.name', 'customerName')
      .addSelect("'due_collection'", 'type')
      .where(
        startDate && endDate
          ? 'dc.receiveDate BETWEEN :startDate AND :endDate'
          : '1=1',
        { startDate, endDate },
      )
      .getRawMany();

    const allPayments = [...salePayments, ...dueCollections].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const totalAmount = allPayments.reduce(
      (sum, p) => sum + parseFloat(String(p.amount || '0')),
      0,
    );

    const byMethod = allPayments.reduce<Record<string, number>>((acc, p) => {
      const method = String(p.paymentMethod || 'unknown');
      acc[method] = (acc[method] || 0) + parseFloat(String(p.amount || '0'));
      return acc;
    }, {});

    return {
      data: allPayments,
      byMethod,
      summary: {
        totalAmount,
        totalCount: allPayments.length,
      },
    };
  }

  async getProfitLossReport(
    startDate?: string,
    endDate?: string,
    branchId?: string,
  ) {
    const salesQb = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.items', 'item')
      .leftJoin('item.product', 'product')
      .select('SUM(sale.grandTotal)', 'totalRevenue')
      .addSelect('SUM(sale.paidAmount)', 'totalCollected')
      .addSelect('SUM(sale.dueAmount)', 'totalDue')
      .addSelect('SUM(product.purchasePrice * item.quantity)', 'totalCOGS');

    if (startDate && endDate) {
      salesQb.where('sale.saleDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }
    if (branchId) {
      salesQb.andWhere('sale.branchId = :branchId', { branchId });
    }

    const salesData = (await salesQb.getRawOne()) as Record<
      string,
      string | null
    > | null;

    const expenseQb = this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'totalExpense');

    if (startDate && endDate) {
      expenseQb.where('expense.expenseDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const expenseData = (await expenseQb.getRawOne()) as Record<
      string,
      string | null
    > | null;

    const serviceQb = this.serviceJobRepository
      .createQueryBuilder('job')
      .select('SUM(job.paidAmount)', 'serviceIncome')
      .addSelect('SUM(job.dueAmount)', 'serviceDue');

    if (startDate && endDate) {
      serviceQb.where('job.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const serviceData = (await serviceQb.getRawOne()) as Record<
      string,
      string | null
    > | null;

    const totalRevenue = parseFloat(String(salesData?.totalRevenue || '0'));
    const totalCOGS = parseFloat(String(salesData?.totalCOGS || '0'));
    const totalExpense = parseFloat(String(expenseData?.totalExpense || '0'));
    const serviceIncome = parseFloat(String(serviceData?.serviceIncome || '0'));
    const grossProfit = totalRevenue - totalCOGS;
    const netProfit = grossProfit + serviceIncome - totalExpense;

    return {
      revenue: {
        salesRevenue: totalRevenue,
        serviceIncome,
        totalRevenue: totalRevenue + serviceIncome,
      },
      costs: {
        costOfGoodsSold: totalCOGS,
        totalExpense,
        totalCosts: totalCOGS + totalExpense,
      },
      profit: {
        grossProfit,
        netProfit,
      },
      collections: {
        collected: parseFloat(String(salesData?.totalCollected || '0')),
        due: parseFloat(String(salesData?.totalDue || '0')),
        serviceDue: parseFloat(String(serviceData?.serviceDue || '0')),
      },
    };
  }

  async getCustomerDueReport(search?: string) {
    const qb = this.customerRepository
      .createQueryBuilder('customer')
      .leftJoin('customer.sales', 'sale')
      .select('customer.id', 'id')
      .addSelect('customer.name', 'name')
      .addSelect('customer.phone', 'phone')
      .addSelect('SUM(sale.grandTotal)', 'totalPurchase')
      .addSelect('SUM(sale.paidAmount)', 'totalPaid')
      .addSelect('SUM(sale.dueAmount)', 'totalDue')
      .addSelect('MAX(sale.dueDate)', 'nextDueDate')
      .having('SUM(sale.dueAmount) > 0')
      .groupBy('customer.id')
      .orderBy('SUM(sale.dueAmount)', 'DESC');

    if (search) {
      qb.where('(customer.name LIKE :search OR customer.phone LIKE :search)', {
        search: `%${search}%`,
      });
    }

    const rows: CustomerDueRow[] = await qb.getRawMany();

    const totalDue = rows.reduce(
      (sum, r) => sum + parseFloat(String(r.totalDue || '0')),
      0,
    );

    return {
      data: rows,
      summary: {
        totalCustomers: rows.length,
        totalDue,
      },
    };
  }

  async getSupplierDueReport(search?: string) {
    const suppliers = await this.supplierRepository.find();

    const suppliersWithDue = await Promise.all(
      suppliers.map(async (supplier) => {
        const purchaseResult = (await this.productRepository
          .createQueryBuilder('product')
          .select('SUM(product.purchasePrice)', 'totalPurchase')
          .where('product.supplierId = :id', { id: supplier.id })
          .getRawOne()) as Record<string, string | null> | null;

        const paymentResult = (await this.supplierPaymentRepository
          .createQueryBuilder('payment')
          .select('SUM(payment.amount)', 'totalPaid')
          .where('payment.supplierId = :id', { id: supplier.id })
          .getRawOne()) as Record<string, string | null> | null;

        const totalPurchase = parseFloat(
          String(purchaseResult?.totalPurchase || '0'),
        );
        const totalPaid = parseFloat(String(paymentResult?.totalPaid || '0'));
        const totalDue = totalPurchase - totalPaid;

        return {
          id: supplier.id,
          name: supplier.name,
          phone: supplier.phone,
          shopName: supplier.shopName,
          totalPurchase,
          totalPaid,
          totalDue,
        };
      }),
    );

    let filtered = suppliersWithDue.filter((s) => s.totalDue > 0);

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          (s.name || '').toLowerCase().includes(q) ||
          (s.phone || '').toLowerCase().includes(q),
      );
    }

    const totalDue = filtered.reduce((sum, s) => sum + s.totalDue, 0);

    return {
      data: filtered,
      summary: {
        totalSuppliers: filtered.length,
        totalDue,
      },
    };
  }

  async getServiceReport(startDate?: string, endDate?: string) {
    const qb = this.serviceJobRepository
      .createQueryBuilder('job')
      .leftJoin('job.customer', 'customer')
      .select('job.id', 'id')
      .addSelect('job.jobId', 'jobId')
      .addSelect('job.createdAt', 'date')
      .addSelect('customer.name', 'customerName')
      .addSelect('customer.phone', 'customerPhone')
      .addSelect('job.deviceModel', 'deviceModel')
      .addSelect('job.serviceCharge', 'serviceCharge')
      .addSelect('job.partsCost', 'partsCost')
      .addSelect('job.totalAmount', 'totalAmount')
      .addSelect('job.paidAmount', 'paidAmount')
      .addSelect('job.dueAmount', 'dueAmount')
      .addSelect('job.status', 'status')
      .orderBy('job.createdAt', 'DESC');

    if (startDate && endDate) {
      qb.where('job.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const rows = await qb.getRawMany();

    const summary = (await this.serviceJobRepository
      .createQueryBuilder('job')
      .select('SUM(job.totalAmount)', 'totalAmount')
      .addSelect('SUM(job.paidAmount)', 'totalPaid')
      .addSelect('SUM(job.dueAmount)', 'totalDue')
      .addSelect('COUNT(*)', 'totalJobs')
      .where(
        startDate && endDate
          ? 'job.createdAt BETWEEN :startDate AND :endDate'
          : '1=1',
        { startDate, endDate },
      )
      .getRawOne()) as Record<string, string | null> | null;

    return {
      data: rows,
      summary: {
        totalAmount: parseFloat(String(summary?.totalAmount || '0')),
        totalPaid: parseFloat(String(summary?.totalPaid || '0')),
        totalDue: parseFloat(String(summary?.totalDue || '0')),
        totalJobs: parseInt(String(summary?.totalJobs || '0')),
      },
    };
  }

  async getStockReport(status?: string) {
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.brand', 'brand')
      .leftJoin('product.branch', 'branch')
      .select('product.id', 'id')
      .addSelect('product.title', 'title')
      .addSelect('product.barcode', 'barcode')
      .addSelect('brand.name', 'brand')
      .addSelect('product.category', 'category')
      .addSelect('product.stockQty', 'stockQty')
      .addSelect('product.lowStockAlertQty', 'lowStockAlertQty')
      .addSelect('product.purchasePrice', 'purchasePrice')
      .addSelect('product.sellingPrice', 'sellingPrice')
      .addSelect('product.status', 'status')
      .addSelect('branch.name', 'branch')
      .orderBy('product.stockQty', 'ASC');

    if (status) {
      qb.where('product.status = :status', { status });
    }

    const rows = await qb.getRawMany();

    const summary = (await this.productRepository
      .createQueryBuilder('product')
      .select('SUM(product.stockQty)', 'totalQty')
      .addSelect(
        'SUM(product.purchasePrice * product.stockQty)',
        'totalPurchaseValue',
      )
      .addSelect(
        'SUM(product.sellingPrice * product.stockQty)',
        'totalSellingValue',
      )
      .addSelect('COUNT(*)', 'totalProducts')
      .getRawOne()) as Record<string, string | null> | null;

    const lowStockCount = await this.productRepository
      .createQueryBuilder('product')
      .where('product.stockQty <= product.lowStockAlertQty')
      .andWhere('product.lowStockAlertQty IS NOT NULL')
      .getCount();

    return {
      data: rows,
      summary: {
        totalProducts: parseInt(String(summary?.totalProducts || '0')),
        totalQty: parseInt(String(summary?.totalQty || '0')),
        totalPurchaseValue: parseFloat(
          String(summary?.totalPurchaseValue || '0'),
        ),
        totalSellingValue: parseFloat(
          String(summary?.totalSellingValue || '0'),
        ),
        lowStockCount,
      },
    };
  }

  async getDayBook(date?: string) {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const startOfDay = `${targetDate} 00:00:00`;
    const endOfDay = `${targetDate} 23:59:59`;

    const sales: DayBookRow[] = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoin('sale.customer', 'customer')
      .select('sale.id', 'id')
      .addSelect('sale.invoiceNo', 'referenceNo')
      .addSelect('sale.saleDate', 'date')
      .addSelect('customer.name', 'description')
      .addSelect('sale.grandTotal', 'income')
      .addSelect("'0'", 'expense')
      .addSelect("'sale'", 'type')
      .where('sale.saleDate BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      })
      .getRawMany();

    const expenses: DayBookRow[] = await this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoin('expense.category', 'category')
      .select('expense.id', 'id')
      .addSelect("'EXP'", 'referenceNo')
      .addSelect('expense.expenseDate', 'date')
      .addSelect('category.name', 'description')
      .addSelect("'0'", 'income')
      .addSelect('expense.amount', 'expense')
      .addSelect("'expense'", 'type')
      .where('expense.expenseDate BETWEEN :start AND :end', {
        start: startOfDay,
        end: endOfDay,
      })
      .getRawMany();

    const allEntries = [...sales, ...expenses].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const totalIncome = sales.reduce(
      (sum, s) => sum + parseFloat(String(s.income || '0')),
      0,
    );
    const totalExpense = expenses.reduce(
      (sum, e) => sum + parseFloat(String(e.expense || '0')),
      0,
    );

    return {
      date: targetDate,
      data: allEntries,
      summary: {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
      },
    };
  }

  async getBalanceSheet() {
    const totalSalesRevenue = (await this.saleRepository
      .createQueryBuilder('sale')
      .select('SUM(sale.grandTotal)', 'total')
      .getRawOne()) as Record<string, string | null> | null;

    const totalSalesDue = (await this.saleRepository
      .createQueryBuilder('sale')
      .select('SUM(sale.dueAmount)', 'total')
      .getRawOne()) as Record<string, string | null> | null;

    const totalStockValue = (await this.productRepository
      .createQueryBuilder('product')
      .select('SUM(product.purchasePrice * product.stockQty)', 'total')
      .getRawOne()) as Record<string, string | null> | null;

    const totalExpenses = (await this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .getRawOne()) as Record<string, string | null> | null;

    const totalSupplierDue = (await this.supplierPaymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'paid')
      .getRawOne()) as Record<string, string | null> | null;

    const totalPurchased = (await this.productRepository
      .createQueryBuilder('product')
      .select('SUM(product.purchasePrice)', 'total')
      .getRawOne()) as Record<string, string | null> | null;

    const supplierDue =
      parseFloat(String(totalPurchased?.total || '0')) -
      parseFloat(String(totalSupplierDue?.paid || '0'));

    const assets = {
      cash:
        parseFloat(String(totalSalesRevenue?.total || '0')) -
        parseFloat(String(totalSalesDue?.total || '0')),
      customerDue: parseFloat(String(totalSalesDue?.total || '0')),
      stockValue: parseFloat(String(totalStockValue?.total || '0')),
    };

    const liabilities = {
      supplierDue: Math.max(0, supplierDue),
      expenses: parseFloat(String(totalExpenses?.total || '0')),
    };

    const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
    const totalLiabilities = Object.values(liabilities).reduce(
      (a, b) => a + b,
      0,
    );

    return {
      assets,
      liabilities,
      equity: {
        totalAssets,
        totalLiabilities,
        netEquity: totalAssets - totalLiabilities,
      },
    };
  }
}
