import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiQuery({
    name: 'branchId',
    required: false,
    type: String,
    description: 'Filter by branch ID',
  })
  @ApiQuery({
    name: 'dateFilter',
    required: false,
    enum: ['today', 'last_7_days', 'this_month', 'custom'],
    description: 'Date filter type',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Start date (for custom filter)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'End date (for custom filter)',
  })
  @ApiResponse({ status: 200, description: 'Returns dashboard statistics' })
  getStats(
    @Query('branchId') branchId?: string,
    @Query('dateFilter')
    dateFilter?: 'today' | 'last_7_days' | 'this_month' | 'custom',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    let start: Date | undefined;
    let end: Date | undefined;

    const now = new Date();

    switch (dateFilter) {
      case 'today':
        start = new Date(now.setHours(0, 0, 0, 0));
        end = new Date(now.setHours(23, 59, 59, 999));
        break;
      case 'last_7_days':
        end = new Date();
        start = new Date();
        start.setDate(start.getDate() - 7);
        break;
      case 'this_month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'custom':
        if (startDate && endDate) {
          start = new Date(startDate);
          end = new Date(endDate);
        }
        break;
    }

    return this.dashboardService.getDashboardStats(branchId, start, end);
  }

  @Get('recent-sales')
  @ApiOperation({ summary: 'Get recent sales (last 10)' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of recent sales to return',
    default: 10,
  })
  @ApiResponse({ status: 200, description: 'Returns recent sales' })
  getRecentSales(@Query('limit') limit?: number) {
    return this.dashboardService.getRecentSales(limit || 10);
  }

  @Get('due-list')
  @ApiOperation({ summary: 'Get due list (top 10)' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of due items to return',
    default: 10,
  })
  @ApiResponse({ status: 200, description: 'Returns due list' })
  getDueList(@Query('limit') limit?: number) {
    return this.dashboardService.getDueList(limit || 10);
  }
}
