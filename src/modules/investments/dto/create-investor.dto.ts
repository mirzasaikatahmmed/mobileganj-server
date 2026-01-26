import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { InvestmentType, PayoutMethod } from '../../../common/constants';

export class CreateInvestorDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '01712345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 1000000 })
  @IsNumber()
  @IsNotEmpty()
  investmentAmount: number;

  @ApiProperty({ example: '2024-01-15' })
  @IsString()
  @IsNotEmpty()
  investmentDate: string;

  @ApiProperty({ enum: InvestmentType })
  @IsEnum(InvestmentType)
  @IsNotEmpty()
  investmentType: InvestmentType;

  @ApiPropertyOptional({ example: 50000 })
  @IsNumber()
  @IsOptional()
  monthlyProfitAmount?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsNumber()
  @IsOptional()
  profitPercentage?: number;

  @ApiPropertyOptional({ example: 12 })
  @IsNumber()
  @IsOptional()
  payoutDurationMonths?: number;

  @ApiProperty({ enum: PayoutMethod })
  @IsEnum(PayoutMethod)
  @IsNotEmpty()
  payoutMethod: PayoutMethod;

  @ApiProperty({ example: 12 })
  @IsNumber()
  @IsNotEmpty()
  totalInstallmentCount: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  investorSignature?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ownerSignature?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nidPhoto?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  agreementPhoto?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
