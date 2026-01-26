import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { PaginationDto } from '../../common/dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole, PaymentMethod, ExpenseType } from '../../common/constants';
import { User } from '../../database/entities';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  // Categories
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('categories')
  @ApiOperation({ summary: 'Create expense category (Admin only)' })
  createCategory(@Body() data: { name: string; type: ExpenseType }) {
    return this.expensesService.createCategory(data);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all expense categories' })
  findAllCategories() {
    return this.expensesService.findAllCategories();
  }

  @Post('categories/seed')
  @ApiOperation({ summary: 'Seed default expense categories' })
  seedCategories() {
    return this.expensesService.seedDefaultCategories();
  }

  // Expenses
  @Post()
  @ApiOperation({ summary: 'Add new expense' })
  create(
    @Body() data: {
      expenseDate: string;
      categoryId: string;
      amount: number;
      paymentMethod: PaymentMethod;
      note?: string;
      receiptPhoto?: string;
    },
    @CurrentUser('id') userId: string,
  ) {
    return this.expensesService.create(data, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses with filters' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('categoryId') categoryId?: string,
    @Query('paymentMethod') paymentMethod?: PaymentMethod,
  ) {
    return this.expensesService.findAll({
      ...paginationDto,
      startDate,
      endDate,
      categoryId,
      paymentMethod,
    });
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get expense summary' })
  getSummary(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.expensesService.getSummary(startDate, endDate);
  }

  @Get('unlogged-fixed')
  @ApiOperation({ summary: 'Get unlogged fixed expenses for this month' })
  getUnloggedFixedExpenses() {
    return this.expensesService.getUnloggedFixedExpenses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by ID' })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update expense' })
  update(
    @Param('id') id: string,
    @Body() data: Partial<any>,
    @CurrentUser() user: User,
  ) {
    return this.expensesService.update(
      id,
      data,
      user.id,
      user.role === UserRole.ADMIN,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete expense (Admin only)' })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
