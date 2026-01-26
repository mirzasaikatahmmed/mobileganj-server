import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export enum DateFilterType {
  TODAY = 'today',
  LAST_7_DAYS = 'last_7_days',
  THIS_MONTH = 'this_month',
  CUSTOM = 'custom',
}

export class DateFilterDto {
  @ApiPropertyOptional({ enum: DateFilterType })
  @IsOptional()
  @IsEnum(DateFilterType)
  dateFilter?: DateFilterType;

  @ApiPropertyOptional({ description: 'Start date for custom range' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'End date for custom range' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
