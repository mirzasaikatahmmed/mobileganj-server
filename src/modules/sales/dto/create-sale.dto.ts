import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../../../common/constants';

export class SaleItemDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 175000 })
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @ApiPropertyOptional({ description: 'IMEI for phones' })
  @IsString()
  @IsOptional()
  imei?: string;

  @ApiPropertyOptional({ example: 12 })
  @IsNumber()
  @IsOptional()
  warrantyMonths?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  customWarrantyText?: string;
}

export class CreateSaleDto {
  @ApiProperty({ description: 'Customer phone number' })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiPropertyOptional({ description: 'Customer name (for new customers)' })
  @IsString()
  @IsOptional()
  customerName?: string;

  @ApiPropertyOptional({ description: 'Customer address' })
  @IsString()
  @IsOptional()
  customerAddress?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  branchId?: string;

  @ApiProperty({ type: [SaleItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  @IsNotEmpty()
  items: SaleItemDto[];

  @ApiPropertyOptional({ enum: ['fixed', 'percentage'] })
  @IsEnum(['fixed', 'percentage'])
  @IsOptional()
  discountType?: 'fixed' | 'percentage';

  @ApiPropertyOptional({ example: 1000 })
  @IsNumber()
  @IsOptional()
  discountValue?: number;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsNotEmpty()
  paidAmount: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
