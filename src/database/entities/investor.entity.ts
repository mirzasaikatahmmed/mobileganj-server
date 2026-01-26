import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  InvestmentType,
  PayoutMethod,
  InvestorStatus,
} from '../../common/constants';
import { InvestmentPayout } from './investment-payout.entity';

@Entity('investors')
export class Investor extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({
    name: 'investment_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  investmentAmount: number;

  @Column({ name: 'investment_date', type: 'date' })
  investmentDate: Date;

  @Column({
    name: 'investment_type',
    type: 'enum',
    enum: InvestmentType,
  })
  investmentType: InvestmentType;

  @Column({
    name: 'monthly_profit_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  monthlyProfitAmount: number;

  @Column({
    name: 'profit_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  profitPercentage: number;

  @Column({ name: 'payout_duration_months', nullable: true })
  payoutDurationMonths: number;

  @Column({
    name: 'payout_method',
    type: 'enum',
    enum: PayoutMethod,
  })
  payoutMethod: PayoutMethod;

  @Column({ name: 'total_installment_count' })
  totalInstallmentCount: number;

  @Column({ name: 'investor_signature', type: 'text', nullable: true })
  investorSignature: string;

  @Column({ name: 'owner_signature', type: 'text', nullable: true })
  ownerSignature: string;

  @Column({ name: 'nid_photo', type: 'text', nullable: true })
  nidPhoto: string;

  @Column({ name: 'agreement_photo', type: 'text', nullable: true })
  agreementPhoto: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: InvestorStatus,
    default: InvestorStatus.ACTIVE,
  })
  status: InvestorStatus;

  @OneToMany(() => InvestmentPayout, (payout) => payout.investor)
  payouts: InvestmentPayout[];
}
