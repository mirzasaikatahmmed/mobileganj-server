import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import {
  Sale,
  SaleItem,
  Payment,
  Product,
  Expense,
  Customer,
  DueCollection,
  Supplier,
  SupplierPayment,
  ServiceJob,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      SaleItem,
      Payment,
      Product,
      Expense,
      Customer,
      DueCollection,
      Supplier,
      SupplierPayment,
      ServiceJob,
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
