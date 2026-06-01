import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('warranty_templates')
export class WarrantyTemplate extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ name: 'duration_months' })
  durationMonths: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
