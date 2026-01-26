import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ServiceJob } from './service-job.entity';
import { PartsUsageType, PaymentMethod } from '../../common/constants';

@Entity('service_parts')
export class ServicePart extends BaseEntity {
  @Column({ name: 'service_job_id' })
  serviceJobId: string;

  @ManyToOne(() => ServiceJob, (job) => job.parts)
  @JoinColumn({ name: 'service_job_id' })
  serviceJob: ServiceJob;

  @Column({
    name: 'usage_type',
    type: 'enum',
    enum: PartsUsageType,
  })
  usageType: PartsUsageType;

  @Column({ name: 'part_name', length: 100 })
  partName: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({
    name: 'part_cost',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  partCost: number;

  @Column({ name: 'borrow_person_name', length: 100, nullable: true })
  borrowPersonName: string;

  @Column({ name: 'borrow_person_phone', length: 20, nullable: true })
  borrowPersonPhone: string;

  @Column({
    name: 'borrow_price_per_unit',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  borrowPricePerUnit: number;

  @Column({
    name: 'total_borrow_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  totalBorrowAmount: number;

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
}
