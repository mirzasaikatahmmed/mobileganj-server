import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import {
  CreateCustomerDto,
  DueCollectionDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from './dto';
import { CurrentUser } from '../../common/decorators';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new customer' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'customerTypeId', required: false, type: String })
  @ApiQuery({ name: 'groupId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'inactive'] })
  @ApiQuery({ name: 'dueOnly', required: false, type: Boolean })
  findAll(@Query() filters: FilterCustomerDto) {
    return this.customersService.findAll(filters);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get customer statistics' })
  getStats() {
    return this.customersService.getStats();
  }

  @Get('due')
  @ApiOperation({ summary: 'Get customers with due' })
  getWithDue() {
    return this.customersService.getWithDue();
  }

  @Get('search/phone/:phone')
  @ApiOperation({ summary: 'Find customer by phone' })
  @ApiParam({ name: 'phone', description: 'Customer phone number' })
  @ApiResponse({ status: 200, description: 'Returns customer if found' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  findByPhone(@Param('phone') phone: string) {
    return this.customersService.findByPhone(phone);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID with details' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns customer details with sales history',
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiBody({ type: UpdateCustomerDto })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Post('due-collection')
  @ApiOperation({ summary: 'Collect due payment from customer' })
  @ApiBody({ type: DueCollectionDto })
  @ApiResponse({
    status: 200,
    description: 'Due payment collected successfully',
  })
  collectDue(
    @Body() dueCollectionDto: DueCollectionDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.customersService.collectDue(dueCollectionDto, userId);
  }

  @Get('due-collection/history')
  @ApiOperation({ summary: 'Get due collection history' })
  @ApiQuery({
    name: 'customerId',
    required: false,
    type: String,
    description: 'Filter by customer ID',
  })
  @ApiResponse({ status: 200, description: 'Returns due collection history' })
  getDueCollectionHistory(@Query('customerId') customerId?: string) {
    return this.customersService.getDueCollectionHistory(customerId);
  }
}
