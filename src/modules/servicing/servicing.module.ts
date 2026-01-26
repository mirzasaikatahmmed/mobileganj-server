import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicingService } from './servicing.service';
import { ServicingController } from './servicing.controller';
import {
  ServiceJob,
  ServicePart,
  ServiceDueCollection,
  Customer,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceJob,
      ServicePart,
      ServiceDueCollection,
      Customer,
    ]),
  ],
  controllers: [ServicingController],
  providers: [ServicingService],
  exports: [ServicingService],
})
export class ServicingModule {}
