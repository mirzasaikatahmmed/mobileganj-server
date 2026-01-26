import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';
import { PaymentMethod } from '../../common/constants';
import { User } from './user.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ name: 'sale_id' })
  saleId: string;

  @ManyToOne(() => Sale, (sale) => sale.payments)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_date', type: 'datetime' })
  paymentDate: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'received_by_id', nullable: true })
  receivedById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'received_by_id' })
  receivedBy: User;
}
