import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { ProductStatus, PhoneRegion } from '../../common/constants';

@Entity('product_variants')
export class ProductVariant extends BaseEntity {
  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ length: 50, nullable: true })
  color: string;

  @Column({ length: 50, nullable: true })
  storage: string;

  @Column({ length: 50, nullable: true })
  ram: string;

  @Column({
    type: 'enum',
    enum: PhoneRegion,
    nullable: true,
  })
  region: PhoneRegion;

  @Column({
    name: 'selling_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  sellingPrice: number;

  @Column({
    name: 'offer_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  offerPrice: number;

  @Column({ name: 'stock_qty', default: 0 })
  stockQty: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.IN_STOCK,
  })
  status: ProductStatus;

  @Column({ length: 50, nullable: true })
  sku: string;
}
