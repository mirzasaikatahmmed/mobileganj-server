import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PaymentMethod, PaymentStatus } from '../../common/constants';
import { Customer } from './customer.entity';
import { Branch } from './branch.entity';
import { User } from './user.entity';
import { SaleItem } from './sale-item.entity';
import { Payment } from './payment.entity';

@Entity('sales')
export class Sale extends BaseEntity {
  @Column({ name: 'invoice_no', unique: true, length: 50 })
  invoiceNo: string;

  @Column({ name: 'sale_date', type: 'datetime' })
  saleDate: Date;

  @Column({ name: 'customer_id' })
  customerId: string;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'branch_id', nullable: true })
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.sales, { nullable: true })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  subtotal: number;

  @Column({
    name: 'discount_type',
    type: 'enum',
    enum: ['fixed', 'percentage'],
    nullable: true,
  })
  discountType: 'fixed' | 'percentage';

  @Column({
    name: 'discount_value',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  discountValue: number;

  @Column({
    name: 'discount_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  discountAmount: number;

  @Column({
    name: 'grand_total',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  grandTotal: number;

  @Column({
    name: 'paid_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  paidAmount: number;

  @Column({
    name: 'due_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  dueAmount: number;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: Date;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.DUE,
  })
  status: PaymentStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'created_by_id' })
  createdById: string;

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
  items: SaleItem[];

  @OneToMany(() => Payment, (payment) => payment.sale)
  payments: Payment[];
}
