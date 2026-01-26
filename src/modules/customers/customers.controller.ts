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
import { CreateCustomerDto, DueCollectionDto } from './dto';
import { PaginationDto } from '../../common/dto';
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
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'dueOnly',
    required: false,
    type: Boolean,
    description: 'Filter customers with due only',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search by name or phone',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of customers',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('dueOnly') dueOnly?: boolean,
    @Query('search') search?: string,
  ) {
    return this.customersService.findAll({ ...paginationDto, dueOnly, search });
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
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({ status: 200, description: 'Customer updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: Partial<CreateCustomerDto>,
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
