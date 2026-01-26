import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import {
  Sale,
  Expense,
  Product,
  Customer,
  Supplier,
  ServiceJob,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      Expense,
      Product,
      Customer,
      Supplier,
      ServiceJob,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
