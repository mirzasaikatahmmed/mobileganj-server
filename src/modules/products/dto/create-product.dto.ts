import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ProductCategory,
  PhoneType,
  AccessoryType,
  ProductCondition,
  PhoneRegion,
} from '../../../common/constants';

export class LocalSellerInfoDto {
  @ApiProperty({ example: 'Rahim Uddin' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({ example: 'Karim Uddin' })
  @IsString()
  @IsOptional()
  fatherName?: string;

  @ApiPropertyOptional({ example: 'Fatima Begum' })
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiProperty({ example: '01712345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '1234567890123' })
  @IsString()
  @IsNotEmpty()
  nidNumber: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nidFrontPhoto?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nidBackPhoto?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sellerPhoto?: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro Max' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: ProductCategory })
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

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

  @ApiProperty({ example: 150000 })
  @IsNumber()
  @IsNotEmpty()
  purchasePrice: number;

  @ApiProperty({ example: 175000 })
  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @ApiPropertyOptional({ example: 170000 })
  @IsNumber()
  @IsOptional()
  offerPrice?: number;

  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @IsOptional()
  stockQty?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  lowStockAlertQty?: number;

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

  @ApiPropertyOptional({ description: 'Supplier ID for overseas phones' })
  @IsUUID()
  @IsOptional()
  supplierId?: string;

  @ApiPropertyOptional({ description: 'Supplier name (creates new if not exists)' })
  @IsString()
  @IsOptional()
  supplierName?: string;

  @ApiPropertyOptional({ description: 'Supplier phone' })
  @IsString()
  @IsOptional()
  supplierPhone?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  branchId?: string;

  @ApiPropertyOptional({ description: 'Local seller info for local phones' })
  @ValidateNested()
  @Type(() => LocalSellerInfoDto)
  @IsOptional()
  localSellerInfo?: LocalSellerInfoDto;
}
