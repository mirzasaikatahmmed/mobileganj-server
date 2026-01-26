import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Investor } from './investor.entity';
import { PaymentMethod } from '../../common/constants';
import { User } from './user.entity';

@Entity('investment_payouts')
export class InvestmentPayout extends BaseEntity {
  @Column({ name: 'investor_id' })
  investorId: string;

  @ManyToOne(() => Investor, (investor) => investor.payouts)
  @JoinColumn({ name: 'investor_id' })
  investor: Investor;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_date', type: 'date' })
  paymentDate: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'paid_by_id' })
  paidById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'paid_by_id' })
  paidBy: User;
}
