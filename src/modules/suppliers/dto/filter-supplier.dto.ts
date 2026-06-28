import { PaginationDto } from '../../../common/dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterSupplierDto extends PaginationDto {
  @IsOptional()
  @IsBoolean()
  dueOnly?: boolean;
}
