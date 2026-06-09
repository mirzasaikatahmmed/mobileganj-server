import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SaleReturn } from './sale-return.entity';
import { Product } from './product.entity';
import { SaleItem } from './sale-item.entity';

@Entity('sale_return_items')
export class SaleReturnItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SaleReturn, (saleReturn) => saleReturn.items)
  @JoinColumn({ name: 'saleReturnId' })
  saleReturn: SaleReturn;

  @Column()
  saleReturnId: number;

  @ManyToOne(() => SaleItem)
  @JoinColumn({ name: 'saleItemId' })
  saleItem: SaleItem;

  @Column()
  saleItemId: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'text', nullable: true })
  reason: string;
}
