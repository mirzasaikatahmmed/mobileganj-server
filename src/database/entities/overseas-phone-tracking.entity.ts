import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import {
  OverseasPhoneStatus,
  SourceType,
  ContractType,
  PaymentMethod,
} from '../../common/constants';
import { Carrier } from './carrier.entity';
import { OverseasPhoneStatusHistory } from './overseas-phone-status-history.entity';

@Entity('overseas_phone_trackings')
@Index(['imei1'])
export class OverseasPhoneTracking extends BaseEntity {
  @Column({ name: 'phone_model', length: 100 })
  phoneModel: string;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 50 })
  imei1: string;

  @Column({ length: 50, nullable: true })
  imei2: string;

  @Column({ name: 'storage_variant', length: 50, nullable: true })
  storageVariant: string;

  @Column({
    name: 'source_type',
    type: 'enum',
    enum: SourceType,
  })
  sourceType: SourceType;

  @Column({ name: 'source_person_name', length: 100 })
  sourcePersonName: string;

  @Column({ name: 'source_phone', length: 50, nullable: true })
  sourcePhone: string;

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({ name: 'carrier_id', nullable: true })
  carrierId: string;

  @ManyToOne(() => Carrier, (carrier) => carrier.phoneTrackings, {
    nullable: true,
  })
  @JoinColumn({ name: 'carrier_id' })
  carrier: Carrier;

  @Column({
    name: 'contract_type',
    type: 'enum',
    enum: ContractType,
    nullable: true,
  })
  contractType: ContractType;

  @Column({ name: 'contract_details', type: 'text', nullable: true })
  contractDetails: string;

  @Column({ name: 'contract_start_date', type: 'date', nullable: true })
  contractStartDate: Date;

  @Column({ name: 'expected_delivery_date', type: 'date', nullable: true })
  expectedDeliveryDate: Date;

  @Column({
    name: 'amount_given',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  amountGiven: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: OverseasPhoneStatus,
    default: OverseasPhoneStatus.PURCHASED,
  })
  status: OverseasPhoneStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'is_added_to_stock', default: false })
  isAddedToStock: boolean;

  @Column({ name: 'stock_product_id', nullable: true })
  stockProductId: string;

  @OneToMany(() => OverseasPhoneStatusHistory, (history) => history.tracking, {
    cascade: true,
  })
  statusHistory: OverseasPhoneStatusHistory[];
}
