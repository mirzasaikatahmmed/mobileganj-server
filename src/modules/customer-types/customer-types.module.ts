import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTypesController } from './customer-types.controller';
import { CustomerTypesService } from './customer-types.service';
import { CustomerType } from '../../database/entities/customer-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerType])],
  controllers: [CustomerTypesController],
  providers: [CustomerTypesService],
  exports: [CustomerTypesService],
})
export class CustomerTypesModule {}
