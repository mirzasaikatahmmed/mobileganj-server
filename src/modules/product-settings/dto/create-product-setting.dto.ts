import { IsNotEmpty, IsString, MaxLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const PRODUCT_SETTING_TYPES = [
  'phone_type',
  'accessory_type',
  'condition',
  'region',
  'unit',
] as const;

export type ProductSettingType = (typeof PRODUCT_SETTING_TYPES)[number];

export class CreateProductSettingDto {
  @ApiProperty({
    enum: PRODUCT_SETTING_TYPES,
    enumName: 'ProductSettingType',
    description: 'Type of product setting',
    example: 'phone_type',
  })
  @IsIn(PRODUCT_SETTING_TYPES)
  @IsNotEmpty()
  type: ProductSettingType;

  @ApiProperty({
    description: 'Display name',
    example: 'Overseas',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Unique value (slug)',
    example: 'overseas',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  value: string;
}
