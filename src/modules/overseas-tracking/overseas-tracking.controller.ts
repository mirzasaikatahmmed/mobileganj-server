import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OverseasTrackingService } from './overseas-tracking.service';
import { PaginationDto } from '../../common/dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import {
  UserRole,
  OverseasPhoneStatus,
  SourceType,
  ContractType,
  PaymentMethod,
} from '../../common/constants';

@ApiTags('Overseas Phone Tracking (Admin Only)')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('overseas-tracking')
export class OverseasTrackingController {
  constructor(private readonly trackingService: OverseasTrackingService) {}

  // Carriers
  @Post('carriers')
  @ApiOperation({ summary: 'Create new carrier' })
  createCarrier(
    @Body() data: { name: string; phone?: string; location?: string; note?: string },
  ) {
    return this.trackingService.createCarrier(data);
  }

  @Get('carriers')
  @ApiOperation({ summary: 'Get all carriers' })
  findAllCarriers() {
    return this.trackingService.findAllCarriers();
  }

  // Phone Tracking
  @Post()
  @ApiOperation({ summary: 'Add new overseas phone entry' })
  create(
    @Body() data: {
      phoneModel: string;
      brand: string;
      imei1: string;
      imei2?: string;
      storageVariant?: string;
      sourceType: SourceType;
      sourcePersonName: string;
      sourcePhone?: string;
      location?: string;
      carrierId?: string;
      contractType?: ContractType;
      contractDetails?: string;
      contractStartDate?: string;
      expectedDeliveryDate?: string;
      amountGiven?: number;
      paymentMethod?: PaymentMethod;
      paymentDate?: string;
      note?: string;
    },
    @CurrentUser('id') userId: string,
  ) {
    return this.trackingService.create(data, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all overseas phone trackings' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('status') status?: OverseasPhoneStatus,
    @Query('carrierId') carrierId?: string,
    @Query('sourceType') sourceType?: SourceType,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.trackingService.findAll({
      ...paginationDto,
      status,
      carrierId,
      sourceType,
      startDate,
      endDate,
    });
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get tracking summary and carrier breakdown' })
  getSummary() {
    return this.trackingService.getSummary();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tracking by ID' })
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update phone status' })
  updateStatus(
    @Param('id') id: string,
    @Body() data: { status: OverseasPhoneStatus; note?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.trackingService.updateStatus(id, data.status, userId, data.note);
  }

  @Post(':id/add-to-stock')
  @ApiOperation({ summary: 'Add delivered phone to stock' })
  addToStock(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.trackingService.addToStock(id, userId);
  }
}
