import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Supplier } from './supplier.entity';
import { PaymentMethod } from '../../common/constants';
import { User } from './user.entity';

@Entity('supplier_payments')
export class SupplierPayment extends BaseEntity {
  @Column({ name: 'supplier_id' })
  supplierId: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.payments)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    name: 'payment_method',
  })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_date', type: 'date' })
  paymentDate: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'paid_by_id', nullable: true })
  paidById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'paid_by_id' })
  paidBy: User;
}
