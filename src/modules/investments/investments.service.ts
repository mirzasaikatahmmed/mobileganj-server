import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investor, InvestmentPayout } from '../../database/entities';
import {
  InvestmentType,
  PayoutMethod,
  InvestorStatus,
  PaymentMethod,
} from '../../common/constants';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investor)
    private investorRepository: Repository<Investor>,
    @InjectRepository(InvestmentPayout)
    private payoutRepository: Repository<InvestmentPayout>,
  ) {}

  async create(data: {
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
  }) {
    const investor = this.investorRepository.create({
      ...data,
      investmentDate: new Date(data.investmentDate),
    });
    return this.investorRepository.save(investor);
  }

  async findAll(
    paginationDto: PaginationDto & { search?: string; status?: InvestorStatus },
  ) {
    const { page = 1, limit = 10, search, status } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.investorRepository.createQueryBuilder('investor');

    if (search) {
      queryBuilder.andWhere(
        '(investor.name LIKE :search OR investor.phone LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      queryBuilder.andWhere('investor.status = :status', { status });
    }

    const [investors, total] = await queryBuilder
      .orderBy('investor.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const investorsWithTotals = await Promise.all(
      investors.map(async (investor) => {
        const totals = await this.getInvestorTotals(investor.id);
        return { ...investor, ...totals };
      }),
    );

    return {
      data: investorsWithTotals,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const investor = await this.investorRepository.findOne({
      where: { id },
      relations: ['payouts'],
    });
    if (!investor) throw new NotFoundException('Investor not found');

    const totals = await this.getInvestorTotals(id);
    return { ...investor, ...totals };
  }

  async getInvestorTotals(investorId: string) {
    const investor = await this.investorRepository.findOne({
      where: { id: investorId },
    });

    const payoutResult = (await this.payoutRepository
      .createQueryBuilder('payout')
      .select('SUM(payout.amount)', 'totalPaid')
      .where('payout.investorId = :investorId', { investorId })
      .getRawOne()) as {
      totalPaid?: string | null;
    } | null;

    const totalPaid = parseFloat(String(payoutResult?.totalPaid || '0'));

    let totalPayable = 0;
    if (investor?.investmentType === InvestmentType.FIXED_PROFIT) {
      totalPayable =
        (investor.monthlyProfitAmount || 0) * investor.totalInstallmentCount;
    }

    return {
      totalProfitPaid: totalPaid,
      remainingPayable: Math.max(0, totalPayable - totalPaid),
    };
  }

  async makePayout(
    investorId: string,
    data: {
      amount: number;
      paymentMethod: PaymentMethod;
      paymentDate: string;
      note?: string;
    },
    userId: string,
  ) {
    const investor = await this.findOne(investorId);

    if (data.amount > investor.remainingPayable) {
      throw new BadRequestException('Payout amount exceeds remaining payable');
    }

    const payout = this.payoutRepository.create({
      investorId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      paymentDate: new Date(data.paymentDate),
      note: data.note,
      paidById: userId,
    });

    await this.payoutRepository.save(payout);

    const newTotals = await this.getInvestorTotals(investorId);
    if (newTotals.remainingPayable === 0) {
      investor.status = InvestorStatus.CLOSED;
      await this.investorRepository.save(investor);
    }

    return payout;
  }

  async getPayoutHistory(investorId?: string) {
    const where = investorId ? { investorId } : {};
    return this.payoutRepository.find({
      where,
      relations: ['investor', 'paidBy'],
      order: { createdAt: 'DESC' },
    });
  }
}
