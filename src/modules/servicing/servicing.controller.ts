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
import { ServicingService } from './servicing.service';
import { PaginationDto } from '../../common/dto';
import { CurrentUser } from '../../common/decorators';
import {
  ServiceStatus,
  ServiceType,
  PartsUsageType,
  PaymentMethod,
} from '../../common/constants';

@ApiTags('Mobile Servicing')
@ApiBearerAuth()
@Controller('servicing')
export class ServicingController {
  constructor(private readonly servicingService: ServicingService) {}

  @Post('jobs')
  @ApiOperation({ summary: 'Create new service job' })
  create(
    @Body() data: {
      customerPhone: string;
      customerName?: string;
      deviceModel: string;
      problemDescription: string;
      imei?: string;
      serviceType: ServiceType;
      technicianName?: string;
      estimatedDeliveryDate?: string;
      serviceCharge: number;
      partsCost?: number;
      paidAmount?: number;
      paymentMethod?: PaymentMethod;
      note?: string;
      parts?: Array<{
        usageType: PartsUsageType;
        partName: string;
        quantity: number;
        partCost?: number;
        borrowPersonName?: string;
        borrowPersonPhone?: string;
        borrowPricePerUnit?: number;
        paidAmount?: number;
        paymentMethod?: PaymentMethod;
      }>;
    },
    @CurrentUser('id') userId: string,
  ) {
    return this.servicingService.create(data, userId);
  }

  @Get('jobs')
  @ApiOperation({ summary: 'Get all service jobs' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: ServiceStatus,
    @Query('technicianName') technicianName?: string,
    @Query('dueOnly') dueOnly?: boolean,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.servicingService.findAll({
      ...paginationDto,
      status,
      technicianName,
      dueOnly,
      startDate,
      endDate,
    });
  }

  @Get('jobs/summary')
  @ApiOperation({ summary: 'Get service summary' })
  getSummary() {
    return this.servicingService.getSummary();
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get service job by ID' })
  findOne(@Param('id') id: string) {
    return this.servicingService.findOne(id);
  }

  @Patch('jobs/:id/status')
  @ApiOperation({ summary: 'Update service job status' })
  updateStatus(
    @Param('id') id: string,
    @Body() data: { status: ServiceStatus },
  ) {
    return this.servicingService.updateStatus(id, data.status);
  }

  @Post('jobs/:id/due-collection')
  @ApiOperation({ summary: 'Collect due from service job' })
  collectDue(
    @Param('id') id: string,
    @Body() data: {
      amount: number;
      paymentMethod: PaymentMethod;
      receiveDate?: string;
      note?: string;
    },
    @CurrentUser('id') userId: string,
  ) {
    return this.servicingService.collectDue(id, data, userId);
  }
}
