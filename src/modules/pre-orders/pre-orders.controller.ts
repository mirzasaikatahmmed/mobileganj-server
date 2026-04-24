import { Controller, Get, Patch, Param, Query, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PreOrdersService } from './pre-orders.service';
import { PaginationDto } from '../../common/dto';
import { OrderStatus } from '../../common/constants';
import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/constants';

@ApiTags('Pre-Orders (Admin)')
@ApiBearerAuth()
@Controller('pre-orders')
export class PreOrdersController {
  constructor(private readonly preOrdersService: PreOrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pre-orders (paginated with filters)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns paginated list of pre-orders' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: OrderStatus,
    @Query('search') search?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.preOrdersService.findAll({
      ...paginationDto,
      status,
      search,
      startDate,
      endDate,
    });
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get pre-orders summary' })
  @ApiResponse({ status: 200, description: 'Returns pre-orders summary' })
  getSummary() {
    return this.preOrdersService.getSummary();
  }

  @Get('order/:orderNo')
  @ApiOperation({ summary: 'Get pre-order by order number' })
  @ApiParam({ name: 'orderNo', description: 'Order number' })
  @ApiResponse({ status: 200, description: 'Returns pre-order details' })
  @ApiResponse({ status: 404, description: 'Pre-order not found' })
  findByOrderNo(@Param('orderNo') orderNo: string) {
    return this.preOrdersService.findByOrderNo(orderNo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pre-order by ID' })
  @ApiParam({ name: 'id', description: 'Pre-order ID' })
  @ApiResponse({ status: 200, description: 'Returns pre-order details' })
  @ApiResponse({ status: 404, description: 'Pre-order not found' })
  findOne(@Param('id') id: string) {
    return this.preOrdersService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update pre-order status (Admin only)' })
  @ApiParam({ name: 'id', description: 'Pre-order ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: Object.values(OrderStatus) },
        note: { type: 'string' },
      },
      required: ['status'],
    },
  })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: OrderStatus; note?: string },
  ) {
    return this.preOrdersService.updateStatus(id, body.status, body.note);
  }
}
