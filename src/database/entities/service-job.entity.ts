import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  ServiceStatus,
  ServiceType,
  PaymentMethod,
} from '../../common/constants';
import { Customer } from './customer.entity';
import { User } from './user.entity';
import { ServicePart } from './service-part.entity';
import { ServiceDueCollection } from './service-due-collection.entity';

@Entity('service_jobs')
export class ServiceJob extends BaseEntity {
  @Column({ name: 'job_id', unique: true, length: 50 })
  jobId: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @ManyToOne(() => Customer, (customer) => customer.serviceJobs)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'device_model', length: 100 })
  deviceModel: string;

  @Column({ name: 'problem_description', type: 'text' })
  problemDescription: string;

  @Column({ length: 50, nullable: true })
  imei: string;

  @Column({
    name: 'service_type',
    type: 'enum',
    enum: ServiceType,
  })
  serviceType: ServiceType;

  @Column({ name: 'technician_name', length: 100, nullable: true })
  technicianName: string;

  @Column({ name: 'estimated_delivery_date', type: 'date', nullable: true })
  estimatedDeliveryDate: Date;

  @Column({
    type: 'enum',
    enum: ServiceStatus,
    default: ServiceStatus.PENDING,
  })
  status: ServiceStatus;

  @Column({
    name: 'service_charge',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  serviceCharge: number;

  @Column({
    name: 'parts_cost',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  partsCost: number;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  totalAmount: number;

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

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'created_by_id' })
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @OneToMany(() => ServicePart, (part) => part.serviceJob, { cascade: true })
  parts: ServicePart[];

  @OneToMany(() => ServiceDueCollection, (collection) => collection.serviceJob)
  dueCollections: ServiceDueCollection[];
}
