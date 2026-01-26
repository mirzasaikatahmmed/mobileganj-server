import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer, Sale, DueCollection, Payment } from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Sale, DueCollection, Payment]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
