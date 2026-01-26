import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Sale } from './sale.entity';
import { Product } from './product.entity';

@Entity('branches')
export class Branch extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.branch)
  users: User[];

  @OneToMany(() => Sale, (sale) => sale.branch)
  sales: Sale[];

  @OneToMany(() => Product, (product) => product.branch)
  products: Product[];
}
