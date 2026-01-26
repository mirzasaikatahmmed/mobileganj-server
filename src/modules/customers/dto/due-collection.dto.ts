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
import { PaymentMethod } from '../../../common/constants';

export class DueCollectionDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  receiveDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
