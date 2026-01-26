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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import {
  CreateExpenseCategoryDto,
  CreateExpenseDto,
  UpdateExpenseDto,
} from './dto';
import { PaginationDto } from '../../common/dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole, PaymentMethod } from '../../common/constants';
import { User } from '../../database/entities';

@ApiTags('Expenses')
@ApiBearerAuth()
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('categories')
  @ApiOperation({ summary: 'Create expense category (Admin only)' })
  @ApiBody({ type: CreateExpenseCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'Expense category created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  createCategory(@Body() data: CreateExpenseCategoryDto) {
    return this.expensesService.createCategory(data);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all expense categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of expense categories',
  })
  findAllCategories() {
    return this.expensesService.findAllCategories();
  }

  @Post('categories/seed')
  @ApiOperation({ summary: 'Seed default expense categories' })
  @ApiResponse({
    status: 200,
    description: 'Default categories seeded successfully',
  })
  seedCategories() {
    return this.expensesService.seedDefaultCategories();
  }

  @Post()
  @ApiOperation({ summary: 'Add new expense' })
  @ApiBody({ type: CreateExpenseDto })
  @ApiResponse({ status: 201, description: 'Expense created successfully' })
  create(@Body() data: CreateExpenseDto, @CurrentUser('id') userId: string) {
    return this.expensesService.create(data, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'paymentMethod', required: false, enum: PaymentMethod })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of expenses',
  })
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
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns expense summary' })
  getSummary(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.expensesService.getSummary(startDate, endDate);
  }

  @Get('unlogged-fixed')
  @ApiOperation({ summary: 'Get unlogged fixed expenses for this month' })
  @ApiResponse({ status: 200, description: 'Returns unlogged fixed expenses' })
  getUnloggedFixedExpenses() {
    return this.expensesService.getUnloggedFixedExpenses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiParam({ name: 'id', description: 'Expense ID' })
  @ApiResponse({ status: 200, description: 'Returns expense details' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update expense' })
  @ApiParam({ name: 'id', description: 'Expense ID' })
  @ApiBody({ type: UpdateExpenseDto })
  @ApiResponse({ status: 200, description: 'Expense updated successfully' })
  update(
    @Param('id') id: string,
    @Body() data: UpdateExpenseDto,
    @CurrentUser() user: User,
  ) {
    const { expenseDate, ...restData } = data;
    const updateData: Partial<Omit<UpdateExpenseDto, 'expenseDate'>> & {
      expenseDate?: Date;
    } = {
      ...restData,
    };
    if (expenseDate) {
      updateData.expenseDate = new Date(expenseDate);
    }
    return this.expensesService.update(
      id,
      updateData as Partial<UpdateExpenseDto & { expenseDate?: Date }>,
      user.id,
      user.role === UserRole.ADMIN,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete expense (Admin only)' })
  @ApiParam({ name: 'id', description: 'Expense ID' })
  @ApiResponse({ status: 200, description: 'Expense deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
