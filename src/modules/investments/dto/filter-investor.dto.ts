import { IsOptional, IsEnum } from 'class-validator';
import { PaginationDto } from '../../../common/dto';
import { InvestorStatus } from '../../../common/constants';

export class FilterInvestorDto extends PaginationDto {
  @IsOptional()
  @IsEnum(InvestorStatus)
  status?: InvestorStatus;
}
