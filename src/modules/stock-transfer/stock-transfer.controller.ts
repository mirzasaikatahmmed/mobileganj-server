import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
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
import { StockTransferService } from './stock-transfer.service';
import { PaginationDto } from '../../common/dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole, StockTransferStatus } from '../../common/constants';

@ApiTags('Stock Transfer')
@ApiBearerAuth()
@Controller('stock-transfers')
export class StockTransferController {
  constructor(private readonly stockTransferService: StockTransferService) {}

  @Post()
  @ApiOperation({ summary: 'Create stock transfer request' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fromBranchId: { type: 'string' },
        toBranchId: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              quantity: { type: 'number' },
            },
          },
        },
        note: { type: 'string' },
      },
      required: ['items'],
    },
  })
  @ApiResponse({ status: 201, description: 'Stock transfer created successfully' })
  create(
    @Body()
    body: {
      fromBranchId?: string;
      toBranchId?: string;
      items: Array<{ productId: string; quantity: number }>;
      note?: string;
    },
    @CurrentUser('id') userId: string,
  ) {
    return this.stockTransferService.create(body, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stock transfers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: StockTransferStatus })
  @ApiQuery({ name: 'fromBranchId', required: false, type: String })
  @ApiQuery({ name: 'toBranchId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns paginated list of stock transfers' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: StockTransferStatus,
    @Query('fromBranchId') fromBranchId?: string,
    @Query('toBranchId') toBranchId?: string,
  ) {
    return this.stockTransferService.findAll({
      ...paginationDto,
      status,
      fromBranchId,
      toBranchId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stock transfer by ID' })
  @ApiParam({ name: 'id', description: 'Transfer ID' })
  @ApiResponse({ status: 200, description: 'Returns stock transfer details' })
  @ApiResponse({ status: 404, description: 'Transfer not found' })
  findOne(@Param('id') id: string) {
    return this.stockTransferService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve stock transfer and move stock (Admin only)' })
  @ApiParam({ name: 'id', description: 'Transfer ID' })
  @ApiResponse({ status: 200, description: 'Transfer approved, stock moved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  approve(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.stockTransferService.approve(id, userId);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject stock transfer (Admin only)' })
  @ApiParam({ name: 'id', description: 'Transfer ID' })
  @ApiResponse({ status: 200, description: 'Transfer rejected' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  reject(@Param('id') id: string) {
    return this.stockTransferService.reject(id);
  }
}
