import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ example: 'ABC Supplier' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '01712345678' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'ABC Mobile Shop' })
  @IsString()
  @IsOptional()
  shopName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
