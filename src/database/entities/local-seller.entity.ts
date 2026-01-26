import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity('local_sellers')
export class LocalSeller extends BaseEntity {
  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @Column({ name: 'father_name', length: 100, nullable: true })
  fatherName: string;

  @Column({ name: 'mother_name', length: 100, nullable: true })
  motherName: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ name: 'nid_number', length: 30 })
  nidNumber: string;

  @Column({ name: 'nid_front_photo', type: 'text', nullable: true })
  nidFrontPhoto: string;

  @Column({ name: 'nid_back_photo', type: 'text', nullable: true })
  nidBackPhoto: string;

  @Column({ name: 'seller_photo', type: 'text', nullable: true })
  sellerPhoto: string;

  @OneToMany(() => Product, (product) => product.localSeller)
  products: Product[];
}
