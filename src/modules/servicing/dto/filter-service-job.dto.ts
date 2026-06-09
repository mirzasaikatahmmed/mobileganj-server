import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto';
import { ServiceStatus } from '../../../common/constants';

export class FilterServiceJobDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ServiceStatus)
  status?: ServiceStatus;

  @IsOptional()
  @IsString()
  technicianName?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  dueOnly?: boolean;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
