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

export class MakePaymentDto {
  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
