import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ServicingService } from './servicing.service';
import {
  CreateServiceJobDto,
  UpdateServiceStatusDto,
  CollectDueDto,
} from './dto';
import { PaginationDto } from '../../common/dto';
import { CurrentUser } from '../../common/decorators';
import { ServiceStatus } from '../../common/constants';

@ApiTags('Mobile Servicing')
@ApiBearerAuth()
@Controller('servicing')
export class ServicingController {
  constructor(private readonly servicingService: ServicingService) {}

  @Post('jobs')
  @ApiOperation({ summary: 'Create new service job' })
  @ApiBody({ type: CreateServiceJobDto })
  @ApiResponse({ status: 201, description: 'Service job created successfully' })
  create(@Body() data: CreateServiceJobDto, @CurrentUser('id') userId: string) {
    return this.servicingService.create(data, userId);
  }

  @Get('jobs')
  @ApiOperation({ summary: 'Get all service jobs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ServiceStatus })
  @ApiQuery({ name: 'technicianName', required: false, type: String })
  @ApiQuery({ name: 'dueOnly', required: false, type: Boolean })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of service jobs',
  })
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
  @ApiResponse({ status: 200, description: 'Returns service summary' })
  getSummary() {
    return this.servicingService.getSummary();
  }

  @Get('jobs/:id')
  @ApiOperation({ summary: 'Get service job by ID' })
  @ApiParam({ name: 'id', description: 'Service job ID' })
  @ApiResponse({ status: 200, description: 'Returns service job details' })
  @ApiResponse({ status: 404, description: 'Service job not found' })
  findOne(@Param('id') id: string) {
    return this.servicingService.findOne(id);
  }

  @Patch('jobs/:id/status')
  @ApiOperation({ summary: 'Update service job status' })
  @ApiParam({ name: 'id', description: 'Service job ID' })
  @ApiBody({ type: UpdateServiceStatusDto })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(@Param('id') id: string, @Body() data: UpdateServiceStatusDto) {
    return this.servicingService.updateStatus(id, data.status);
  }

  @Post('jobs/:id/due-collection')
  @ApiOperation({ summary: 'Collect due from service job' })
  @ApiParam({ name: 'id', description: 'Service job ID' })
  @ApiBody({ type: CollectDueDto })
  @ApiResponse({ status: 200, description: 'Due collected successfully' })
  collectDue(
    @Param('id') id: string,
    @Body() data: CollectDueDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.servicingService.collectDue(id, data, userId);
  }
}
