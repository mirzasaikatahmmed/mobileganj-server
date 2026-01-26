import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
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
  create(
    @Body() createSaleDto: CreateSaleDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.salesService.create(createSaleDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales with filters' })
  findAll(@Query() filterDto: SaleFilterDto) {
    return this.salesService.findAll(filterDto);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent sales (last 10)' })
  getRecentSales(@Query('limit') limit?: number) {
    return this.salesService.getRecentSales(limit);
  }

  @Get('due-list')
  @ApiOperation({ summary: 'Get due sales list (top 10)' })
  getDueSales(@Query('limit') limit?: number) {
    return this.salesService.getDueSales(limit);
  }

  @Get('invoice/:invoiceNo')
  @ApiOperation({ summary: 'Get sale by invoice number' })
  findByInvoice(@Param('invoiceNo') invoiceNo: string) {
    return this.salesService.findByInvoice(invoiceNo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sale by ID' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}
