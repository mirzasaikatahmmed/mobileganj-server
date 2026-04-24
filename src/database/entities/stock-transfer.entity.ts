import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Branch } from './branch.entity';
import { User } from './user.entity';
import { StockTransferItem } from './stock-transfer-item.entity';
import { StockTransferStatus } from '../../common/constants';

@Entity('stock_transfers')
export class StockTransfer extends BaseEntity {
  @Column({ name: 'transfer_no', unique: true, length: 50 })
  transferNo: string;

  @Column({ name: 'from_branch_id', nullable: true })
  fromBranchId: string;

  @ManyToOne(() => Branch, { nullable: true })
  @JoinColumn({ name: 'from_branch_id' })
  fromBranch: Branch;

  @Column({ name: 'to_branch_id', nullable: true })
  toBranchId: string;

  @ManyToOne(() => Branch, { nullable: true })
  @JoinColumn({ name: 'to_branch_id' })
  toBranch: Branch;

  @Column({
    type: 'enum',
    enum: StockTransferStatus,
    default: StockTransferStatus.PENDING,
  })
  status: StockTransferStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'created_by_id' })
  createdById: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @OneToMany(() => StockTransferItem, (item) => item.transfer, {
    cascade: true,
  })
  items: StockTransferItem[];
}
