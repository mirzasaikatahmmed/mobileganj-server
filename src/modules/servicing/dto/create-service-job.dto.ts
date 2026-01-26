import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ServiceType,
  PartsUsageType,
  PaymentMethod,
} from '../../../common/constants';

export class ServicePartDto {
  @ApiProperty({ enum: PartsUsageType })
  @IsEnum(PartsUsageType)
  @IsNotEmpty()
  usageType: PartsUsageType;

  @ApiProperty({ example: 'Screen' })
  @IsString()
  @IsNotEmpty()
  partName: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiPropertyOptional({ example: 5000 })
  @IsNumber()
  @IsOptional()
  partCost?: number;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  borrowPersonName?: string;

  @ApiPropertyOptional({ example: '01712345678' })
  @IsString()
  @IsOptional()
  borrowPersonPhone?: string;

  @ApiPropertyOptional({ example: 2000 })
  @IsNumber()
  @IsOptional()
  borrowPricePerUnit?: number;

  @ApiPropertyOptional({ example: 2000 })
  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @ApiPropertyOptional({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;
}

export class CreateServiceJobDto {
  @ApiProperty({ example: '01712345678' })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  customerName?: string;

  @ApiProperty({ example: 'iPhone 12' })
  @IsString()
  @IsNotEmpty()
  deviceModel: string;

  @ApiProperty({ example: 'Screen broken, needs replacement' })
  @IsString()
  @IsNotEmpty()
  problemDescription: string;

  @ApiPropertyOptional({ example: '123456789012345' })
  @IsString()
  @IsOptional()
  imei?: string;

  @ApiProperty({ enum: ServiceType })
  @IsEnum(ServiceType)
  @IsNotEmpty()
  serviceType: ServiceType;

  @ApiPropertyOptional({ example: 'Tech Name' })
  @IsString()
  @IsOptional()
  technicianName?: string;

  @ApiPropertyOptional({ example: '2024-02-15' })
  @IsDateString()
  @IsOptional()
  estimatedDeliveryDate?: string;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @IsNotEmpty()
  serviceCharge: number;

  @ApiPropertyOptional({ example: 5000 })
  @IsNumber()
  @IsOptional()
  partsCost?: number;

  @ApiPropertyOptional({ example: 7000 })
  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @ApiPropertyOptional({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;

  @ApiPropertyOptional({ type: [ServicePartDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServicePartDto)
  @IsOptional()
  parts?: ServicePartDto[];
}
