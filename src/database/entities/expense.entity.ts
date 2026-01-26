import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ExpenseCategory } from './expense-category.entity';
import { PaymentMethod } from '../../common/constants';
import { User } from './user.entity';

@Entity('expenses')
export class Expense extends BaseEntity {
  @Column({ name: 'expense_date', type: 'date' })
  expenseDate: Date;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => ExpenseCategory, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: ExpenseCategory;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'receipt_photo', type: 'text', nullable: true })
  receiptPhoto: string;

  @Column({ name: 'added_by_id' })
  addedById: string;

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: 'added_by_id' })
  addedBy: User;
}
