import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import {
  Product,
  Brand,
  ProductVariant,
  PreOrder,
  Customer,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Brand, ProductVariant, PreOrder, Customer]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
  exports: [PublicService],
})
export class PublicModule {}
