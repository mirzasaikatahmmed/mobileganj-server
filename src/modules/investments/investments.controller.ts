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
import { InvestmentsService } from './investments.service';
import { CreateInvestorDto, CreatePayoutDto } from './dto';
import { PaginationDto } from '../../common/dto';
import { CurrentUser } from '../../common/decorators';
import { InvestorStatus } from '../../common/constants';

@ApiTags('Investments')
@ApiBearerAuth()
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post('investors')
  @ApiOperation({ summary: 'Add new investor' })
  @ApiBody({ type: CreateInvestorDto })
  @ApiResponse({ status: 201, description: 'Investor created successfully' })
  create(@Body() data: CreateInvestorDto) {
    return this.investmentsService.create(data);
  }

  @Get('investors')
  @ApiOperation({ summary: 'Get all investors' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: InvestorStatus })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of investors',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
    @Query('status') status?: InvestorStatus,
  ) {
    return this.investmentsService.findAll({
      ...paginationDto,
      search,
      status,
    });
  }

  @Get('investors/:id')
  @ApiOperation({ summary: 'Get investor by ID' })
  @ApiParam({ name: 'id', description: 'Investor ID' })
  @ApiResponse({ status: 200, description: 'Returns investor details' })
  @ApiResponse({ status: 404, description: 'Investor not found' })
  findOne(@Param('id') id: string) {
    return this.investmentsService.findOne(id);
  }

  @Post('payouts')
  @ApiOperation({ summary: 'Make payout to investor' })
  @ApiBody({ type: CreatePayoutDto })
  @ApiResponse({ status: 201, description: 'Payout created successfully' })
  makePayout(@Body() data: CreatePayoutDto, @CurrentUser('id') userId: string) {
    return this.investmentsService.makePayout(data.investorId, data, userId);
  }

  @Get('payouts')
  @ApiOperation({ summary: 'Get payout history' })
  @ApiQuery({ name: 'investorId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns payout history' })
  getPayoutHistory(@Query('investorId') investorId?: string) {
    return this.investmentsService.getPayoutHistory(investorId);
  }
}
