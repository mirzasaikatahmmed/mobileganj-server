import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDamageDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  damageDate: string;

  @ApiProperty({ example: 'Screen cracked during handling' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photos?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isReturned?: boolean;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @ApiPropertyOptional({ example: 5000 })
  @IsNumber()
  @IsOptional()
  returnAmount?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
