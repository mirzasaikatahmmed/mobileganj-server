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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OverseasTrackingService } from './overseas-tracking.service';
import {
  CreateCarrierDto,
  CreatePhoneTrackingDto,
  UpdateStatusDto,
} from './dto';
import { PaginationDto } from '../../common/dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import {
  UserRole,
  OverseasPhoneStatus,
  SourceType,
} from '../../common/constants';

@ApiTags('Overseas Phone Tracking (Admin Only)')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('overseas-tracking')
export class OverseasTrackingController {
  constructor(private readonly trackingService: OverseasTrackingService) {}

  @Post('carriers')
  @ApiOperation({ summary: 'Create new carrier' })
  @ApiBody({ type: CreateCarrierDto })
  @ApiResponse({ status: 201, description: 'Carrier created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  createCarrier(@Body() data: CreateCarrierDto) {
    return this.trackingService.createCarrier(data);
  }

  @Get('carriers')
  @ApiOperation({ summary: 'Get all carriers' })
  @ApiResponse({ status: 200, description: 'Returns list of carriers' })
  findAllCarriers() {
    return this.trackingService.findAllCarriers();
  }

  @Post()
  @ApiOperation({ summary: 'Add new overseas phone entry' })
  @ApiBody({ type: CreatePhoneTrackingDto })
  @ApiResponse({
    status: 201,
    description: 'Phone tracking entry created successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  create(
    @Body() data: CreatePhoneTrackingDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.trackingService.create(data, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all overseas phone trackings' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: OverseasPhoneStatus })
  @ApiQuery({ name: 'carrierId', required: false, type: String })
  @ApiQuery({ name: 'sourceType', required: false, enum: SourceType })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of phone trackings',
  })
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
  @ApiResponse({ status: 200, description: 'Returns tracking summary' })
  getSummary() {
    return this.trackingService.getSummary();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tracking by ID' })
  @ApiParam({ name: 'id', description: 'Tracking ID' })
  @ApiResponse({ status: 200, description: 'Returns tracking details' })
  @ApiResponse({ status: 404, description: 'Tracking not found' })
  findOne(@Param('id') id: string) {
    return this.trackingService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update phone status' })
  @ApiParam({ name: 'id', description: 'Tracking ID' })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  updateStatus(
    @Param('id') id: string,
    @Body() data: UpdateStatusDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.trackingService.updateStatus(
      id,
      data.status,
      userId,
      data.note,
    );
  }

  @Post(':id/add-to-stock')
  @ApiOperation({ summary: 'Add delivered phone to stock' })
  @ApiParam({ name: 'id', description: 'Tracking ID' })
  @ApiResponse({
    status: 200,
    description: 'Phone added to stock successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  addToStock(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.trackingService.addToStock(id, userId);
  }
}
