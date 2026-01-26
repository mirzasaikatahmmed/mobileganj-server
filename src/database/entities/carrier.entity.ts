import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OverseasPhoneTracking } from './overseas-phone-tracking.entity';

@Entity('carriers')
export class Carrier extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => OverseasPhoneTracking, (tracking) => tracking.carrier)
  phoneTrackings: OverseasPhoneTracking[];
}
