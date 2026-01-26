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
  ProductCategory,
  PhoneType,
  AccessoryType,
  ProductStatus,
  ProductCondition,
  PhoneRegion,
} from '../../common/constants';
import { Brand } from './brand.entity';
import { Supplier } from './supplier.entity';
import { LocalSeller } from './local-seller.entity';
import { Branch } from './branch.entity';
import { SaleItem } from './sale-item.entity';
import { ProductDamage } from './product-damage.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('products')
@Index('IDX_product_imei1', ['imei1'])
@Index('IDX_product_imei2', ['imei2'])
export class Product extends BaseEntity {
  @Column({ length: 200 })
  title: string;

  @Column({
    type: 'enum',
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Column({
    name: 'phone_type',
    type: 'enum',
    enum: PhoneType,
    nullable: true,
  })
  phoneType: PhoneType;

  @Column({
    name: 'accessory_type',
    type: 'enum',
    enum: AccessoryType,
    nullable: true,
  })
  accessoryType: AccessoryType;

  @Column({ name: 'brand_id', nullable: true })
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @Column({ length: 50, nullable: true })
  imei1: string;

  @Column({ length: 50, nullable: true })
  imei2: string;

  @Column({ unique: true, length: 50 })
  barcode: string;

  @Column({
    name: 'purchase_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  purchasePrice: number;

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

  @Column({ name: 'stock_qty', default: 1 })
  stockQty: number;

  @Column({ name: 'low_stock_alert_qty', nullable: true })
  lowStockAlertQty: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.IN_STOCK,
  })
  status: ProductStatus;

  @Column({
    type: 'enum',
    enum: ProductCondition,
    default: ProductCondition.BRAND_NEW,
  })
  condition: ProductCondition;

  @Column({
    type: 'enum',
    enum: PhoneRegion,
    nullable: true,
  })
  region: PhoneRegion;

  @Column({ nullable: true })
  storage: string;

  @Column({ nullable: true })
  ram: string;

  @Column({ nullable: true })
  color: string;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'invoice_reference', length: 100, nullable: true })
  invoiceReference: string;

  @Column({ name: 'warranty_months', nullable: true })
  warrantyMonths: number;

  @Column({ name: 'custom_warranty_text', type: 'text', nullable: true })
  customWarrantyText: string;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ name: 'is_new_arrival', default: false })
  isNewArrival: boolean;

  @Column({ name: 'is_trending', default: false })
  isTrending: boolean;

  @Column({ name: 'is_pre_order', default: false })
  isPreOrder: boolean;

  @Column({ name: 'supplier_id', nullable: true })
  supplierId: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column({ name: 'local_seller_id', nullable: true })
  localSellerId: string;

  @ManyToOne(() => LocalSeller, (seller) => seller.products, { nullable: true })
  @JoinColumn({ name: 'local_seller_id' })
  localSeller: LocalSeller;

  @Column({ name: 'branch_id', nullable: true })
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.products, { nullable: true })
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @OneToMany(() => SaleItem, (item) => item.product)
  saleItems: SaleItem[];

  @OneToMany(() => ProductDamage, (damage) => damage.product)
  damages: ProductDamage[];

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];
}
