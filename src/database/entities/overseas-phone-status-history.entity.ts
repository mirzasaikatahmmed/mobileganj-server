import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OverseasPhoneTracking } from './overseas-phone-tracking.entity';
import { OverseasPhoneStatus } from '../../common/constants';
import { User } from './user.entity';

@Entity('overseas_phone_status_histories')
export class OverseasPhoneStatusHistory extends BaseEntity {
  @Column({ name: 'tracking_id' })
  trackingId: string;

  @ManyToOne(() => OverseasPhoneTracking, (tracking) => tracking.statusHistory)
  @JoinColumn({ name: 'tracking_id' })
  tracking: OverseasPhoneTracking;

  @Column({
    name: 'previous_status',
    type: 'enum',
    enum: OverseasPhoneStatus,
    nullable: true,
  })
  previousStatus: OverseasPhoneStatus;

  @Column({
    name: 'new_status',
    type: 'enum',
    enum: OverseasPhoneStatus,
  })
  newStatus: OverseasPhoneStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'updated_by_id' })
  updatedById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy: User;
}
