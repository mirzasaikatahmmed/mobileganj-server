import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OverseasTrackingService } from './overseas-tracking.service';
import { OverseasTrackingController } from './overseas-tracking.controller';
import {
  OverseasPhoneTracking,
  OverseasPhoneStatusHistory,
  Carrier,
  Product,
  Supplier,
} from '../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OverseasPhoneTracking,
      OverseasPhoneStatusHistory,
      Carrier,
      Product,
      Supplier,
    ]),
  ],
  controllers: [OverseasTrackingController],
  providers: [OverseasTrackingService],
  exports: [OverseasTrackingService],
})
export class OverseasTrackingModule {}
