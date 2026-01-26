import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Expense, ExpenseCategory } from '../../database/entities';
import { PaymentMethod, ExpenseType } from '../../common/constants';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(ExpenseCategory)
    private categoryRepository: Repository<ExpenseCategory>,
  ) {}

  // Categories
  async createCategory(data: { name: string; type: ExpenseType }) {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  async findAllCategories() {
    return this.categoryRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async seedDefaultCategories() {
    const defaultCategories = [
      { name: 'Shop Rent', type: ExpenseType.FIXED, isSystem: true },
      { name: 'Staff Salary', type: ExpenseType.FIXED, isSystem: true },
      { name: 'Electricity Bill', type: ExpenseType.FIXED, isSystem: true },
      { name: 'Internet / WiFi', type: ExpenseType.FIXED, isSystem: true },
      { name: 'Transport', type: ExpenseType.UNFIXED, isSystem: true },
      { name: 'Shop Maintenance', type: ExpenseType.UNFIXED, isSystem: true },
      { name: 'Marketing / Ads', type: ExpenseType.UNFIXED, isSystem: true },
      { name: 'Packaging', type: ExpenseType.UNFIXED, isSystem: true },
      { name: 'Miscellaneous', type: ExpenseType.UNFIXED, isSystem: true },
    ];

    for (const cat of defaultCategories) {
      const exists = await this.categoryRepository.findOne({
        where: { name: cat.name },
      });
      if (!exists) {
        await this.categoryRepository.save(this.categoryRepository.create(cat));
      }
    }
  }

  // Expenses
  async create(
    data: {
      expenseDate: string;
      categoryId: string;
      amount: number;
      paymentMethod: PaymentMethod;
      note?: string;
      receiptPhoto?: string;
    },
    userId: string,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { id: data.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const expense = this.expenseRepository.create({
      ...data,
      expenseDate: new Date(data.expenseDate),
      addedById: userId,
    });

    return this.expenseRepository.save(expense);
  }

  async findAll(
    filterDto: PaginationDto & {
      startDate?: string;
      endDate?: string;
      categoryId?: string;
      paymentMethod?: PaymentMethod;
    },
  ) {
    const { page = 1, limit = 10, startDate, endDate, categoryId, paymentMethod } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.category', 'category')
      .leftJoinAndSelect('expense.addedBy', 'addedBy');

    if (startDate && endDate) {
      queryBuilder.andWhere('expense.expenseDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    if (categoryId) {
      queryBuilder.andWhere('expense.categoryId = :categoryId', { categoryId });
    }

    if (paymentMethod) {
      queryBuilder.andWhere('expense.paymentMethod = :paymentMethod', { paymentMethod });
    }

    const [expenses, total] = await queryBuilder
      .orderBy('expense.expenseDate', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: expenses,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations: ['category', 'addedBy'],
    });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async update(id: string, data: Partial<Expense>, userId: string, isAdmin: boolean) {
    const expense = await this.findOne(id);

    if (!isAdmin && expense.addedById !== userId) {
      throw new NotFoundException('You can only edit your own expenses');
    }

    Object.assign(expense, data);
    return this.expenseRepository.save(expense);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.expenseRepository.softDelete(id);
    return { message: 'Expense deleted successfully' };
  }

  async getSummary(startDate?: string, endDate?: string) {
    const queryBuilder = this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total');

    if (startDate && endDate) {
      queryBuilder.where('expense.expenseDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const totalResult = await queryBuilder.getRawOne();

    // This month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const thisMonthResult = await this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.expenseDate BETWEEN :monthStart AND :monthEnd', {
        monthStart,
        monthEnd,
      })
      .getRawOne();

    // Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const todayResult = await this.expenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.expenseDate BETWEEN :today AND :todayEnd', {
        today,
        todayEnd,
      })
      .getRawOne();

    return {
      totalExpense: parseFloat(totalResult?.total || '0'),
      thisMonthExpense: parseFloat(thisMonthResult?.total || '0'),
      todayExpense: parseFloat(todayResult?.total || '0'),
    };
  }

  async getUnloggedFixedExpenses() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const fixedCategories = await this.categoryRepository.find({
      where: { type: ExpenseType.FIXED, isActive: true },
    });

    const unlogged: ExpenseCategory[] = [];

    for (const category of fixedCategories) {
      const expense = await this.expenseRepository.findOne({
        where: {
          categoryId: category.id,
          expenseDate: Between(monthStart, monthEnd),
        },
      });

      if (!expense) {
        unlogged.push(category);
      }
    }

    return unlogged;
  }
}
