import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ServiceJob } from './service-job.entity';
import { PaymentMethod } from '../../common/constants';
import { User } from './user.entity';

@Entity('service_due_collections')
export class ServiceDueCollection extends BaseEntity {
  @Column({ name: 'service_job_id' })
  serviceJobId: string;

  @ManyToOne(() => ServiceJob, (job) => job.dueCollections)
  @JoinColumn({ name: 'service_job_id' })
  serviceJob: ServiceJob;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @Column({ name: 'receive_date', type: 'date' })
  receiveDate: Date;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'received_by_id' })
  receivedById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'received_by_id' })
  receivedBy: User;
}
