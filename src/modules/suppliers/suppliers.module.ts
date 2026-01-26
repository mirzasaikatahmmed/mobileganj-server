import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import {
  Supplier,
  SupplierPayment,
  Product,
  LocalSeller,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier, SupplierPayment, Product, LocalSeller]),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
  exports: [SuppliersService],
})
export class SuppliersModule {}
