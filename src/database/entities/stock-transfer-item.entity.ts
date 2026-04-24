import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StockTransfer } from './stock-transfer.entity';
import { Product } from './product.entity';

@Entity('stock_transfer_items')
export class StockTransferItem extends BaseEntity {
  @Column({ name: 'transfer_id' })
  transferId: string;

  @ManyToOne(() => StockTransfer, (transfer) => transfer.items)
  @JoinColumn({ name: 'transfer_id' })
  transfer: StockTransfer;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;
}
