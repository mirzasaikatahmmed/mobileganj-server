import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceSettingsController } from './invoice-settings.controller';
import { InvoiceSettingsService } from './invoice-settings.service';
import { WarrantyTemplate, TermsCondition } from '../../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([WarrantyTemplate, TermsCondition])],
  controllers: [InvoiceSettingsController],
  providers: [InvoiceSettingsService],
  exports: [InvoiceSettingsService],
})
export class InvoiceSettingsModule {}
