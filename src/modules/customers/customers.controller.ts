import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
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
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('dueOnly') dueOnly?: boolean,
    @Query('search') search?: string,
  ) {
    return this.customersService.findAll({ ...paginationDto, dueOnly, search });
  }

  @Get('search/phone/:phone')
  @ApiOperation({ summary: 'Find customer by phone' })
  findByPhone(@Param('phone') phone: string) {
    return this.customersService.findByPhone(phone);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID with details' })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer' })
  update(@Param('id') id: string, @Body() updateCustomerDto: Partial<CreateCustomerDto>) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Post('due-collection')
  @ApiOperation({ summary: 'Collect due payment from customer' })
  collectDue(
    @Body() dueCollectionDto: DueCollectionDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.customersService.collectDue(dueCollectionDto, userId);
  }

  @Get('due-collection/history')
  @ApiOperation({ summary: 'Get due collection history' })
  getDueCollectionHistory(@Query('customerId') customerId?: string) {
    return this.customersService.getDueCollectionHistory(customerId);
  }
}
