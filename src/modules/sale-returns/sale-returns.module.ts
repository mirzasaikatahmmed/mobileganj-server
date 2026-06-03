import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleReturnsController } from './sale-returns.controller';
import { SaleReturnsService } from './sale-returns.service';
import { SaleReturn } from '../../database/entities/sale-return.entity';
import { SaleReturnItem } from '../../database/entities/sale-return-item.entity';
import { Sale } from '../../database/entities/sale.entity';
import { Product } from '../../database/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleReturn, SaleReturnItem, Sale, Product]),
  ],
  controllers: [SaleReturnsController],
  providers: [SaleReturnsService],
  exports: [SaleReturnsService],
})
export class SaleReturnsModule {}
