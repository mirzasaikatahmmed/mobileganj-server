import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Sale } from './sale.entity';
import { Customer } from './customer.entity';
import { User } from './user.entity';
import { SaleReturnItem } from './sale-return-item.entity';

export enum ReturnStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
}

export enum RefundMethod {
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
  STORE_CREDIT = 'store_credit',
}

@Entity('sale_returns')
export class SaleReturn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  returnNumber: string;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'saleId' })
  sale: Sale;

  @Column()
  saleId: number;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ nullable: true })
  customerId: number;

  @OneToMany(() => SaleReturnItem, (item) => item.saleReturn, { cascade: true })
  items: SaleReturnItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  refundAmount: number;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'enum',
    enum: ReturnStatus,
    default: ReturnStatus.PENDING,
  })
  status: ReturnStatus;

  @Column({
    type: 'enum',
    enum: RefundMethod,
    nullable: true,
  })
  refundMethod: RefundMethod;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'processedBy' })
  processedByUser: User;

  @Column({ nullable: true })
  processedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
