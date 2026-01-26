import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSaleDto, SaleFilterDto } from './dto';
import { CurrentUser } from '../../common/decorators';

@ApiTags('Sales')
@ApiBearerAuth()
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Create new sale (Invoice)' })
  @ApiBody({ type: CreateSaleDto })
  @ApiResponse({ status: 201, description: 'Sale created successfully' })
  create(
    @Body() createSaleDto: CreateSaleDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.salesService.create(createSaleDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales with filters' })
  @ApiResponse({ status: 200, description: 'Returns paginated list of sales' })
  findAll(@Query() filterDto: SaleFilterDto) {
    return this.salesService.findAll(filterDto);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent sales (last 10)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, default: 10 })
  @ApiResponse({ status: 200, description: 'Returns recent sales' })
  getRecentSales(@Query('limit') limit?: number) {
    return this.salesService.getRecentSales(limit);
  }

  @Get('due-list')
  @ApiOperation({ summary: 'Get due sales list (top 10)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, default: 10 })
  @ApiResponse({ status: 200, description: 'Returns due sales list' })
  getDueSales(@Query('limit') limit?: number) {
    return this.salesService.getDueSales(limit);
  }

  @Get('invoice/:invoiceNo')
  @ApiOperation({ summary: 'Get sale by invoice number' })
  @ApiParam({ name: 'invoiceNo', description: 'Invoice number' })
  @ApiResponse({ status: 200, description: 'Returns sale details' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  findByInvoice(@Param('invoiceNo') invoiceNo: string) {
    return this.salesService.findByInvoice(invoiceNo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by ID' })
  @ApiParam({ name: 'id', description: 'Sale ID' })
  @ApiResponse({ status: 200, description: 'Returns sale details' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}
