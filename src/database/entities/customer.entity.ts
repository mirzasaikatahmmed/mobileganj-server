import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';
import { DueCollection } from './due-collection.entity';
import { ServiceJob } from './service-job.entity';
import { CustomerType } from './customer-type.entity';
import { CustomerGroup } from './customer-group.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 20 })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ name: 'nid_number', length: 50, nullable: true })
  nidNumber: string;

  @Column({ name: 'customer_type_id', nullable: true })
  customerTypeId: string;

  @ManyToOne(() => CustomerType, (type) => type.customers, { nullable: true })
  @JoinColumn({ name: 'customer_type_id' })
  customerType: CustomerType;

  @ManyToMany(() => CustomerGroup, (group) => group.customers)
  @JoinTable({
    name: 'customer_customer_groups',
    joinColumn: { name: 'customer_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
  })
  groups: CustomerGroup[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];

  @OneToMany(() => DueCollection, (collection) => collection.customer)
  dueCollections: DueCollection[];

  @OneToMany(() => ServiceJob, (job) => job.customer)
  serviceJobs: ServiceJob[];
}
