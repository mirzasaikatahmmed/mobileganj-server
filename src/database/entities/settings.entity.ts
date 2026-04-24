import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('settings')
export class Settings extends BaseEntity {
  @Column({ length: 50, unique: true })
  key: string;

  @Column({ type: 'json' })
  value: Record<string, unknown>;

  @Column({ type: 'text', nullable: true })
  description: string;
}
