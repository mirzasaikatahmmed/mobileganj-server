import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  ProductCategory,
  PhoneType,
  AccessoryType,
  ProductStatus,
  ProductCondition,
  PhoneRegion,
} from '../../../common/constants';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'iPhone 15 Pro Max' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ enum: ProductCategory })
  @IsEnum(ProductCategory)
  @IsOptional()
  category?: ProductCategory;

  @ApiPropertyOptional({ enum: PhoneType })
  @IsEnum(PhoneType)
  @IsOptional()
  phoneType?: PhoneType;

  @ApiPropertyOptional({ enum: AccessoryType })
  @IsEnum(AccessoryType)
  @IsOptional()
  accessoryType?: AccessoryType;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional({ example: '123456789012345' })
  @IsString()
  @IsOptional()
  imei1?: string;

  @ApiPropertyOptional({ example: '123456789012346' })
  @IsString()
  @IsOptional()
  imei2?: string;

  @ApiPropertyOptional({ example: 150000 })
  @IsNumber()
  @IsOptional()
  purchasePrice?: number;

  @ApiPropertyOptional({ example: 175000 })
  @IsNumber()
  @IsOptional()
  sellingPrice?: number;

  @ApiPropertyOptional({ example: 170000 })
  @IsNumber()
  @IsOptional()
  offerPrice?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  stockQty?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  lowStockAlertQty?: number;

  @ApiPropertyOptional({ enum: ProductStatus })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiPropertyOptional({ enum: ProductCondition })
  @IsEnum(ProductCondition)
  @IsOptional()
  condition?: ProductCondition;

  @ApiPropertyOptional({ enum: PhoneRegion })
  @IsEnum(PhoneRegion)
  @IsOptional()
  region?: PhoneRegion;

  @ApiPropertyOptional({ example: '256GB' })
  @IsString()
  @IsOptional()
  storage?: string;

  @ApiPropertyOptional({ example: '8GB' })
  @IsString()
  @IsOptional()
  ram?: string;

  @ApiPropertyOptional({ example: 'Blue Titanium' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional({ example: 'INV-2024-001' })
  @IsString()
  @IsOptional()
  invoiceReference?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsNumber()
  @IsOptional()
  warrantyMonths?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  customWarrantyText?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isNewArrival?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isTrending?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isPreOrder?: boolean;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  branchId?: string;
}
