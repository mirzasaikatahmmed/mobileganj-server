import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransferController } from './stock-transfer.controller';
import { StockTransferService } from './stock-transfer.service';
import { StockTransfer, StockTransferItem, Product } from '../../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StockTransfer, StockTransferItem, Product])],
  controllers: [StockTransferController],
  providers: [StockTransferService],
})
export class StockTransferModule {}
