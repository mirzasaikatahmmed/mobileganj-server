import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @ApiOperation({ summary: 'Sales report with daily breakdown' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'branchId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns sales report data' })
  getSalesReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.reportsService.getSalesReport(startDate, endDate, branchId);
  }

  @Get('purchase')
  @ApiOperation({ summary: 'Purchase report (products stocked in)' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'supplierId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns purchase report data' })
  getPurchaseReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('supplierId') supplierId?: string,
  ) {
    return this.reportsService.getPurchaseReport(
      startDate,
      endDate,
      supplierId,
    );
  }

  @Get('expense')
  @ApiOperation({ summary: 'Expense report with category breakdown' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns expense report data' })
  getExpenseReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.reportsService.getExpenseReport(startDate, endDate, categoryId);
  }

  @Get('payment')
  @ApiOperation({
    summary: 'Payment collections report (sales + due collections)',
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns payment report data' })
  getPaymentReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.reportsService.getPaymentReport(startDate, endDate);
  }

  @Get('profit-loss')
  @ApiOperation({ summary: 'Profit and loss report' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'branchId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns profit/loss report data' })
  getProfitLossReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.reportsService.getProfitLossReport(
      startDate,
      endDate,
      branchId,
    );
  }

  @Get('customer-due')
  @ApiOperation({ summary: 'Customer due report' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns customer due report data' })
  getCustomerDueReport(@Query('search') search?: string) {
    return this.reportsService.getCustomerDueReport(search);
  }

  @Get('supplier-due')
  @ApiOperation({ summary: 'Supplier due report' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns supplier due report data' })
  getSupplierDueReport(@Query('search') search?: string) {
    return this.reportsService.getSupplierDueReport(search);
  }

  @Get('service')
  @ApiOperation({ summary: 'Service/repair report' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns service report data' })
  getServiceReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.reportsService.getServiceReport(startDate, endDate);
  }

  @Get('stock')
  @ApiOperation({ summary: 'Stock/inventory report' })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'Filter by product status',
  })
  @ApiResponse({ status: 200, description: 'Returns stock report data' })
  getStockReport(@Query('status') status?: string) {
    return this.reportsService.getStockReport(status);
  }

  @Get('day-book')
  @ApiOperation({ summary: 'Day book (daily transaction log)' })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    description: 'Date (YYYY-MM-DD), defaults to today',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns day book entries for the date',
  })
  getDayBook(@Query('date') date?: string) {
    return this.reportsService.getDayBook(date);
  }

  @Get('balance-sheet')
  @ApiOperation({ summary: 'Balance sheet (assets vs liabilities)' })
  @ApiResponse({ status: 200, description: 'Returns balance sheet data' })
  getBalanceSheet() {
    return this.reportsService.getBalanceSheet();
  }
}
