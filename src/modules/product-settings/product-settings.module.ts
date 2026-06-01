import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSetting } from '../../database/entities/product-setting.entity';
import { ProductSettingsController } from './product-settings.controller';
import { ProductSettingsService } from './product-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSetting])],
  controllers: [ProductSettingsController],
  providers: [ProductSettingsService],
  exports: [ProductSettingsService],
})
export class ProductSettingsModule {}
