import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  SourceType,
  ContractType,
  PaymentMethod,
} from '../../../common/constants';

export class CreatePhoneTrackingDto {
  @ApiProperty({ example: 'iPhone 15 Pro Max' })
  @IsString()
  @IsNotEmpty()
  phoneModel: string;

  @ApiProperty({ example: 'Apple' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: '123456789012345' })
  @IsString()
  @IsNotEmpty()
  imei1: string;

  @ApiPropertyOptional({ example: '123456789012346' })
  @IsString()
  @IsOptional()
  imei2?: string;

  @ApiPropertyOptional({ example: '256GB' })
  @IsString()
  @IsOptional()
  storageVariant?: string;

  @ApiProperty({ enum: SourceType })
  @IsEnum(SourceType)
  @IsNotEmpty()
  sourceType: SourceType;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  sourcePersonName: string;

  @ApiPropertyOptional({ example: '01712345678' })
  @IsString()
  @IsOptional()
  sourcePhone?: string;

  @ApiPropertyOptional({ example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  carrierId?: string;

  @ApiPropertyOptional({ enum: ContractType })
  @IsEnum(ContractType)
  @IsOptional()
  contractType?: ContractType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contractDetails?: string;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsDateString()
  @IsOptional()
  contractStartDate?: string;

  @ApiPropertyOptional({ example: '2024-02-15' })
  @IsDateString()
  @IsOptional()
  expectedDeliveryDate?: string;

  @ApiPropertyOptional({ example: 150000 })
  @IsNumber()
  @IsOptional()
  amountGiven?: number;

  @ApiPropertyOptional({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsDateString()
  @IsOptional()
  paymentDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
