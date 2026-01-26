import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import {
  Sale,
  SaleItem,
  Customer,
  Product,
  Payment,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem, Customer, Product, Payment]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
