import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { ProductVariant } from './product-variant.entity';
import { Customer } from './customer.entity';
import {
  OrderStatus,
  PaymentMethod,
  EmiDuration,
} from '../../common/constants';

@Entity('pre_orders')
export class PreOrder extends BaseEntity {
  @Column({ name: 'order_no', unique: true, length: 50 })
  orderNo: string;

  @Column({ name: 'customer_id', nullable: true })
  customerId: string;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'customer_name', length: 100 })
  customerName: string;

  @Column({ name: 'customer_phone', length: 20 })
  customerPhone: string;

  @Column({ name: 'customer_address', type: 'text', nullable: true })
  customerAddress: string;

  @Column({ name: 'product_id', nullable: true })
  productId: string;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'variant_id', nullable: true })
  variantId: string;

  @ManyToOne(() => ProductVariant, { nullable: true })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @Column({ name: 'product_name', length: 200 })
  productName: string;

  @Column({ name: 'variant_details', type: 'text', nullable: true })
  variantDetails: string;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  totalPrice: number;

  @Column({ name: 'is_emi', default: false })
  isEmi: boolean;

  @Column({
    name: 'emi_duration',
    type: 'enum',
    enum: EmiDuration,
    nullable: true,
  })
  emiDuration: EmiDuration;

  @Column({
    name: 'down_payment',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  downPayment: number;

  @Column({
    name: 'monthly_installment',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  monthlyInstallment: number;

  @Column({
    name: 'emi_interest_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  emiInterestRate: number;

  @Column({
    name: 'total_payable_with_emi',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  totalPayableWithEmi: number;

  @Column({
    name: 'booking_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  bookingAmount: number;

  @Column({
    name: 'paid_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  paidAmount: number;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ name: 'expected_delivery_days', nullable: true })
  expectedDeliveryDays: number;

  @Column({ type: 'text', nullable: true })
  note: string;
}
