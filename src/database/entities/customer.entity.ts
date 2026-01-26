import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Sale } from './sale.entity';
import { DueCollection } from './due-collection.entity';
import { ServiceJob } from './service-job.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 20 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];

  @OneToMany(() => DueCollection, (collection) => collection.customer)
  dueCollections: DueCollection[];

  @OneToMany(() => ServiceJob, (job) => job.customer)
  serviceJobs: ServiceJob[];
}
