import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class FilterCustomerDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  customerTypeId?: string;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsBoolean()
  dueOnly?: boolean;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
