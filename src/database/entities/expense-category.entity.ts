import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Expense } from './expense.entity';
import { ExpenseType } from '../../common/constants';

@Entity('expense_categories')
export class ExpenseCategory extends BaseEntity {
  @Column({ unique: true, length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: ExpenseType,
    default: ExpenseType.UNFIXED,
  })
  type: ExpenseType;

  @Column({ name: 'is_system', default: false })
  isSystem: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
