import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ProductSettingType {
  PHONE_TYPE = 'phone_type',
  ACCESSORY_TYPE = 'accessory_type',
  CONDITION = 'condition',
  REGION = 'region',
  UNIT = 'unit',
}

@Entity('product_settings')
export class ProductSetting extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ProductSettingType,
  })
  type: ProductSettingType;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  value: string;

  @Column({ default: true })
  isActive: boolean;
}
