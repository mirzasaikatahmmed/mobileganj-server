import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleReturnItemDto {
  @IsNumber()
  @IsNotEmpty()
  saleItemId: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class CreateSaleReturnDto {
  @IsNumber()
  @IsNotEmpty()
  saleId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleReturnItemDto)
  items: CreateSaleReturnItemDto[];

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateSaleReturnDto {
  @IsEnum(['pending', 'approved', 'rejected', 'completed'])
  @IsOptional()
  status?: string;

  @IsEnum(['cash', 'bank_transfer', 'store_credit'])
  @IsOptional()
  refundMethod?: string;

  @IsNumber()
  @IsOptional()
  refundAmount?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
