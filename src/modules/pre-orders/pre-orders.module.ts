import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreOrdersController } from './pre-orders.controller';
import { PreOrdersService } from './pre-orders.service';
import { PreOrder, Customer } from '../../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PreOrder, Customer])],
  controllers: [PreOrdersController],
  providers: [PreOrdersService],
})
export class PreOrdersModule {}
