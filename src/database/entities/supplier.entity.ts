import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { SupplierPayment } from './supplier-payment.entity';

@Entity('suppliers')
export class Supplier extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'shop_name', length: 100, nullable: true })
  shopName: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToMany(() => SupplierPayment, (payment) => payment.supplier)
  payments: SupplierPayment[];
}
