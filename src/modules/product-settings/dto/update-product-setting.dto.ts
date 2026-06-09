import { PartialType } from '@nestjs/swagger';
import { CreateProductSettingDto } from './create-product-setting.dto';

export class UpdateProductSettingDto extends PartialType(
  CreateProductSettingDto,
) {}
