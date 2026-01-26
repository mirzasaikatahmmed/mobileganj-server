import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InvestmentsService } from './investments.service';
import { PaginationDto } from '../../common/dto';
import { CurrentUser } from '../../common/decorators';
import {
  InvestmentType,
  PayoutMethod,
  InvestorStatus,
  PaymentMethod,
} from '../../common/constants';

@ApiTags('Investments')
@ApiBearerAuth()
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post('investors')
  @ApiOperation({ summary: 'Add new investor' })
  create(
    @Body() data: {
      name: string;
      phone: string;
      address?: string;
      investmentAmount: number;
      investmentDate: string;
      investmentType: InvestmentType;
      monthlyProfitAmount?: number;
      profitPercentage?: number;
      payoutDurationMonths?: number;
      payoutMethod: PayoutMethod;
      totalInstallmentCount: number;
      investorSignature?: string;
      ownerSignature?: string;
      nidPhoto?: string;
      agreementPhoto?: string;
      note?: string;
    },
  ) {
    return this.investmentsService.create(data);
  }

  @Get('investors')
  @ApiOperation({ summary: 'Get all investors' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
    @Query('status') status?: InvestorStatus,
  ) {
    return this.investmentsService.findAll({ ...paginationDto, search, status });
  }

  @Get('investors/:id')
  @ApiOperation({ summary: 'Get investor by ID' })
  findOne(@Param('id') id: string) {
    return this.investmentsService.findOne(id);
  }

  @Post('payouts')
  @ApiOperation({ summary: 'Make payout to investor' })
  makePayout(
    @Body() data: {
      investorId: string;
      amount: number;
      paymentMethod: PaymentMethod;
      paymentDate: string;
      note?: string;
    },
    @CurrentUser('id') userId: string,
  ) {
    return this.investmentsService.makePayout(data.investorId, data, userId);
  }

  @Get('payouts')
  @ApiOperation({ summary: 'Get payout history' })
  getPayoutHistory(@Query('investorId') investorId?: string) {
    return this.investmentsService.getPayoutHistory(investorId);
  }
}
