import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OverseasPhoneStatus } from '../../../common/constants';

export class UpdateStatusDto {
  @ApiProperty({ enum: OverseasPhoneStatus })
  @IsEnum(OverseasPhoneStatus)
  @IsNotEmpty()
  status: OverseasPhoneStatus;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note?: string;
}
