import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';

@Entity('customer_types')
export class CustomerType extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column({ length: 50, default: 'gray' })
  color: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Customer, (customer) => customer.customerType)
  customers: Customer[];
}
