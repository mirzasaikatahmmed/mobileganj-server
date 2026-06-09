import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {
  Product,
  Brand,
  Supplier,
  LocalSeller,
  ProductDamage,
  ProductImage,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Brand,
      Supplier,
      LocalSeller,
      ProductDamage,
      ProductImage,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
