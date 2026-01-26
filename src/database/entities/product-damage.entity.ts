import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('product_damages')
export class ProductDamage extends BaseEntity {
  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.damages)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'damage_date', type: 'date' })
  damageDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  photos: string;

  @Column({ name: 'is_returned', default: false })
  isReturned: boolean;

  @Column({ name: 'return_date', type: 'date', nullable: true })
  returnDate: Date;

  @Column({
    name: 'return_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  returnAmount: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'reported_by_id', nullable: true })
  reportedById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'reported_by_id' })
  reportedBy: User;
}
