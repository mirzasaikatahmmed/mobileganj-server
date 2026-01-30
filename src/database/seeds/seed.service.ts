import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import {
  User,
  Branch,
  Brand,
  Supplier,
  LocalSeller,
  Customer,
  ExpenseCategory,
  Carrier,
  Investor,
  Product,
  Sale,
  SaleItem,
  Expense,
  ServiceJob,
  ServicePart,
  OverseasPhoneTracking,
  OverseasPhoneStatusHistory,
  PreOrder,
  InvestmentPayout,
  SupplierPayment,
  DueCollection,
} from '../entities';

import {
  branchesData,
  usersData,
  brandsData,
  suppliersData,
  localSellersData,
  customersData,
  expenseCategoriesData,
  carriersData,
  investorsData,
  productsData,
  salesData,
  expensesData,
  serviceJobsData,
  overseasTrackingData,
  preOrdersData,
} from './seed.data';
import { OverseasPhoneStatus } from '../../common/constants';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Supplier) private supplierRepo: Repository<Supplier>,
    @InjectRepository(LocalSeller)
    private localSellerRepo: Repository<LocalSeller>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(ExpenseCategory)
    private expenseCategoryRepo: Repository<ExpenseCategory>,
    @InjectRepository(Carrier) private carrierRepo: Repository<Carrier>,
    @InjectRepository(Investor) private investorRepo: Repository<Investor>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Sale) private saleRepo: Repository<Sale>,
    @InjectRepository(SaleItem) private saleItemRepo: Repository<SaleItem>,
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    @InjectRepository(ServiceJob)
    private serviceJobRepo: Repository<ServiceJob>,
    @InjectRepository(ServicePart)
    private servicePartRepo: Repository<ServicePart>,
    @InjectRepository(OverseasPhoneTracking)
    private overseasTrackingRepo: Repository<OverseasPhoneTracking>,
    @InjectRepository(OverseasPhoneStatusHistory)
    private overseasStatusHistoryRepo: Repository<OverseasPhoneStatusHistory>,
    @InjectRepository(PreOrder) private preOrderRepo: Repository<PreOrder>,
    @InjectRepository(InvestmentPayout)
    private investmentPayoutRepo: Repository<InvestmentPayout>,
    @InjectRepository(SupplierPayment)
    private supplierPaymentRepo: Repository<SupplierPayment>,
    @InjectRepository(DueCollection)
    private dueCollectionRepo: Repository<DueCollection>,
  ) {}

  async onModuleInit() {
    const shouldSeed = this.configService.get<string>('AUTO_SEED') === 'true';
    if (shouldSeed) {
      await this.seed();
    }
  }

  async seed() {
    this.logger.log('🌱 Starting database seeding...');

    try {
      // Check if data already exists
      const existingBranches = await this.branchRepo.count();
      if (existingBranches > 0) {
        this.logger.log('⏭️  Database already seeded, skipping...');
        return;
      }

      // Seed in order of dependencies
      const branches = await this.seedBranches();
      const users = await this.seedUsers(branches);
      const brands = await this.seedBrands();
      const suppliers = await this.seedSuppliers();
      const localSellers = await this.seedLocalSellers();
      const customers = await this.seedCustomers();
      const expenseCategories = await this.seedExpenseCategories();
      const carriers = await this.seedCarriers();
      await this.seedInvestors();
      const products = await this.seedProducts(
        brands,
        suppliers,
        localSellers,
        branches,
      );
      await this.seedSales(customers, branches, users, products);
      await this.seedExpenses(expenseCategories, users);
      await this.seedServiceJobs(customers, users);
      await this.seedOverseasTracking(carriers, users);
      await this.seedPreOrders(customers, products);

      this.logger.log('✅ Database seeding completed successfully!');
    } catch (error) {
      this.logger.error('❌ Database seeding failed:', error);
      throw error;
    }
  }

  private async seedBranches(): Promise<Branch[]> {
    this.logger.log('  → Seeding branches...');
    const branches: Branch[] = [];
    for (const data of branchesData) {
      const branch = this.branchRepo.create(data);
      branches.push(await this.branchRepo.save(branch));
    }
    return branches;
  }

  private async seedUsers(branches: Branch[]): Promise<User[]> {
    this.logger.log('  → Seeding users...');
    const users: User[] = [];
    for (const data of usersData) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = this.userRepo.create({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role,
        isActive: data.isActive,
        branch: branches[data.branchIndex],
      });
      users.push(await this.userRepo.save(user));
    }
    return users;
  }

  private async seedBrands(): Promise<Brand[]> {
    this.logger.log('  → Seeding brands...');
    const brands: Brand[] = [];
    for (const data of brandsData) {
      const brand = this.brandRepo.create(data);
      brands.push(await this.brandRepo.save(brand));
    }
    return brands;
  }

  private async seedSuppliers(): Promise<Supplier[]> {
    this.logger.log('  → Seeding suppliers...');
    const suppliers: Supplier[] = [];
    for (const data of suppliersData) {
      const supplier = this.supplierRepo.create(data);
      suppliers.push(await this.supplierRepo.save(supplier));
    }
    return suppliers;
  }

  private async seedLocalSellers(): Promise<LocalSeller[]> {
    this.logger.log('  → Seeding local sellers...');
    const localSellers: LocalSeller[] = [];
    for (const data of localSellersData) {
      const localSeller = this.localSellerRepo.create(data);
      localSellers.push(await this.localSellerRepo.save(localSeller));
    }
    return localSellers;
  }

  private async seedCustomers(): Promise<Customer[]> {
    this.logger.log('  → Seeding customers...');
    const customers: Customer[] = [];
    for (const data of customersData) {
      const customer = this.customerRepo.create(data);
      customers.push(await this.customerRepo.save(customer));
    }
    return customers;
  }

  private async seedExpenseCategories(): Promise<ExpenseCategory[]> {
    this.logger.log('  → Seeding expense categories...');
    const categories: ExpenseCategory[] = [];
    for (const data of expenseCategoriesData) {
      const category = this.expenseCategoryRepo.create(data);
      categories.push(await this.expenseCategoryRepo.save(category));
    }
    return categories;
  }

  private async seedCarriers(): Promise<Carrier[]> {
    this.logger.log('  → Seeding carriers...');
    const carriers: Carrier[] = [];
    for (const data of carriersData) {
      const carrier = this.carrierRepo.create(data);
      carriers.push(await this.carrierRepo.save(carrier));
    }
    return carriers;
  }

  private async seedInvestors(): Promise<Investor[]> {
    this.logger.log('  → Seeding investors...');
    const investors: Investor[] = [];
    for (const data of investorsData) {
      const investor = this.investorRepo.create(data);
      investors.push(await this.investorRepo.save(investor));
    }
    return investors;
  }

  private async seedProducts(
    brands: Brand[],
    suppliers: Supplier[],
    localSellers: LocalSeller[],
    branches: Branch[],
  ): Promise<Product[]> {
    this.logger.log('  → Seeding products...');
    const products: Product[] = [];
    for (const data of productsData) {
      const product = this.productRepo.create({
        title: data.title,
        category: data.category,
        phoneType: data.phoneType,
        accessoryType: data.accessoryType,
        brand:
          data.brandIndex !== null && data.brandIndex !== undefined
            ? brands[data.brandIndex]
            : undefined,
        imei1: data.imei1,
        imei2: data.imei2,
        barcode: data.barcode,
        purchasePrice: data.purchasePrice,
        sellingPrice: data.sellingPrice,
        offerPrice: data.offerPrice,
        stockQty: data.stockQty,
        status: data.status,
        condition: data.condition,
        region: data.region,
        storage: data.storage,
        ram: data.ram,
        color: data.color,
        warrantyMonths: data.warrantyMonths,
        isFeatured: data.isFeatured || false,
        isNewArrival: data.isNewArrival || false,
        isTrending: data.isTrending || false,
        supplier:
          data.supplierIndex !== undefined
            ? suppliers[data.supplierIndex]
            : undefined,
        localSeller:
          data.localSellerIndex !== undefined
            ? localSellers[data.localSellerIndex]
            : undefined,
        branch:
          data.branchIndex !== undefined
            ? branches[data.branchIndex]
            : undefined,
      });
      products.push(await this.productRepo.save(product));
    }
    return products;
  }

  private async seedSales(
    customers: Customer[],
    branches: Branch[],
    users: User[],
    products: Product[],
  ): Promise<void> {
    this.logger.log('  → Seeding sales...');
    for (const data of salesData) {
      const sale = this.saleRepo.create({
        invoiceNo: data.invoiceNo,
        saleDate: data.saleDate,
        customer: customers[data.customerIndex],
        branch: branches[data.branchIndex],
        createdBy: users[data.userIndex],
        subtotal: data.subtotal,
        discountType: data.discountType,
        discountValue: data.discountValue,
        discountAmount: data.discountAmount,
        grandTotal: data.grandTotal,
        paidAmount: data.paidAmount,
        dueAmount: data.dueAmount,
        dueDate: data.dueDate,
        paymentMethod: data.paymentMethod,
        status: data.status,
      });
      const savedSale = await this.saleRepo.save(sale);

      // Create sale items
      for (const itemData of data.items) {
        const saleItem = this.saleItemRepo.create({
          sale: savedSale,
          product: products[itemData.productIndex],
          quantity: itemData.quantity,
          unitPrice: itemData.unitPrice,
          totalPrice: itemData.totalPrice,
          imei: products[itemData.productIndex].imei1,
          warrantyMonths: products[itemData.productIndex].warrantyMonths,
        });
        await this.saleItemRepo.save(saleItem);
      }
    }
  }

  private async seedExpenses(
    categories: ExpenseCategory[],
    users: User[],
  ): Promise<void> {
    this.logger.log('  → Seeding expenses...');
    for (const data of expensesData) {
      const expense = this.expenseRepo.create({
        expenseDate: data.expenseDate,
        category: categories[data.categoryIndex],
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        note: data.note,
        addedBy: users[data.userIndex],
      });
      await this.expenseRepo.save(expense);
    }
  }

  private async seedServiceJobs(
    customers: Customer[],
    users: User[],
  ): Promise<void> {
    this.logger.log('  → Seeding service jobs...');
    for (const data of serviceJobsData) {
      const serviceJob = this.serviceJobRepo.create({
        jobId: data.jobId,
        customer: customers[data.customerIndex],
        deviceModel: data.deviceModel,
        problemDescription: data.problemDescription,
        imei: data.imei,
        serviceType: data.serviceType,
        technicianName: data.technicianName,
        estimatedDeliveryDate: data.estimatedDeliveryDate,
        status: data.status,
        serviceCharge: data.serviceCharge,
        partsCost: data.partsCost,
        totalAmount: data.totalAmount,
        paidAmount: data.paidAmount,
        dueAmount: data.dueAmount,
        paymentMethod: data.paymentMethod,
        createdBy: users[data.userIndex],
      });
      const savedJob = await this.serviceJobRepo.save(serviceJob);

      // Create service parts
      for (const partData of data.parts) {
        const part = this.servicePartRepo.create({
          serviceJob: savedJob,
          usageType: partData.usageType,
          partName: partData.partName,
          quantity: partData.quantity,
          partCost: partData.partCost,
          borrowPersonName: partData.borrowPersonName,
          borrowPersonPhone: partData.borrowPersonPhone,
          borrowPricePerUnit: partData.borrowPricePerUnit,
          totalBorrowAmount: partData.totalBorrowAmount,
          paidAmount: partData.paidAmount || 0,
          dueAmount: partData.dueAmount || 0,
        });
        await this.servicePartRepo.save(part);
      }
    }
  }

  private async seedOverseasTracking(
    carriers: Carrier[],
    users: User[],
  ): Promise<void> {
    this.logger.log('  → Seeding overseas tracking...');
    for (const data of overseasTrackingData) {
      const tracking = this.overseasTrackingRepo.create({
        phoneModel: data.phoneModel,
        brand: data.brand,
        imei1: data.imei1,
        imei2: data.imei2,
        storageVariant: data.storageVariant,
        sourceType: data.sourceType,
        sourcePersonName: data.sourcePersonName,
        sourcePhone: data.sourcePhone,
        location: data.location,
        carrier: carriers[data.carrierIndex],
        contractType: data.contractType,
        contractDetails: data.contractDetails,
        contractStartDate: data.contractStartDate,
        expectedDeliveryDate: data.expectedDeliveryDate,
        amountGiven: data.amountGiven,
        paymentMethod: data.paymentMethod,
        paymentDate: data.paymentDate,
        status: data.status,
        note: data.note,
      });
      const savedTracking = await this.overseasTrackingRepo.save(tracking);

      // Create initial status history
      const statusHistory = this.overseasStatusHistoryRepo.create({
        tracking: savedTracking,
        previousStatus: undefined,
        newStatus: OverseasPhoneStatus.PURCHASED,
        note: 'Initial purchase',
        updatedBy: users[0],
      });
      await this.overseasStatusHistoryRepo.save(statusHistory);

      // Add current status history if different from purchased
      if (data.status !== OverseasPhoneStatus.PURCHASED) {
        const currentStatusHistory = this.overseasStatusHistoryRepo.create({
          tracking: savedTracking,
          previousStatus: OverseasPhoneStatus.PURCHASED,
          newStatus: data.status,
          note: 'Status updated',
          updatedBy: users[0],
        });
        await this.overseasStatusHistoryRepo.save(currentStatusHistory);
      }
    }
  }

  private async seedPreOrders(
    customers: Customer[],
    products: Product[],
  ): Promise<void> {
    this.logger.log('  → Seeding pre-orders...');
    for (const data of preOrdersData) {
      const preOrder = this.preOrderRepo.create({
        orderNo: data.orderNo,
        customer: customers[data.customerIndex],
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerAddress: data.customerAddress,
        product: products[data.productIndex],
        productName: data.productName,
        variantDetails: data.variantDetails,
        totalPrice: data.totalPrice,
        isEmi: data.isEmi,
        emiDuration: data.emiDuration,
        downPayment: data.downPayment,
        monthlyInstallment: data.monthlyInstallment,
        emiInterestRate: data.emiInterestRate,
        totalPayableWithEmi: data.totalPayableWithEmi,
        bookingAmount: data.bookingAmount,
        paidAmount: data.paidAmount,
        paymentMethod: data.paymentMethod,
        status: data.status,
        expectedDeliveryDays: data.expectedDeliveryDays,
        note: data.note,
      });
      await this.preOrderRepo.save(preOrder);
    }
  }
}
