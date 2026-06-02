import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';

@Entity('customer_groups')
export class CustomerGroup extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, default: 'blue' })
  color: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToMany(() => Customer, (customer) => customer.groups)
  customers: Customer[];
}
