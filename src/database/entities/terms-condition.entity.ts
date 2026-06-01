import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('terms_conditions')
export class TermsCondition extends BaseEntity {
  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;
}
