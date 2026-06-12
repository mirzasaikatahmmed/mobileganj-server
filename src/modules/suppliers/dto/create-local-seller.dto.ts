import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocalSellerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '01712345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '1234567890123' })
  @IsString()
  @IsNotEmpty()
  nidNumber: string;

  @ApiPropertyOptional({ example: 'Father Name' })
  @IsString()
  @IsOptional()
  fatherName?: string;

  @ApiPropertyOptional({ example: 'Mother Name' })
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiPropertyOptional({ example: 'Reference person' })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nidFrontPhoto?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nidBackPhoto?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sellerPhoto?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/username' })
  @IsString()
  @IsOptional()
  socialMedia?: string;
}
