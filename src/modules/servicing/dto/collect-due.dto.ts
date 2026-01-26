import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentMethod } from '../../../common/constants';

export class CollectDueDto {
  @ApiProperty({ example: 5000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsDateString()
  @IsOptional()
  receiveDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
