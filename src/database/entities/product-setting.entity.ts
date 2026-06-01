import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('product_settings')
export class ProductSetting extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ['phone_type', 'accessory_type', 'condition', 'region', 'unit'],
  })
  type: 'phone_type' | 'accessory_type' | 'condition' | 'region' | 'unit';

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  value: string;

  @Column({ default: true })
  isActive: boolean;
}
