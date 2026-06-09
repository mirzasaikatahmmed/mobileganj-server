import {
  IsOptional,
  IsEnum,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { PaginationDto } from '../../../common/dto';
import { OverseasPhoneStatus, SourceType } from '../../../common/constants';

export class FilterOverseasTrackingDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OverseasPhoneStatus)
  status?: OverseasPhoneStatus;

  @IsOptional()
  @IsString()
  @IsUUID()
  carrierId?: string;

  @IsOptional()
  @IsEnum(SourceType)
  sourceType?: SourceType;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
