import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ServiceStatus } from '../../../common/constants';

export class UpdateServiceStatusDto {
  @ApiProperty({ enum: ServiceStatus })
  @IsEnum(ServiceStatus)
  @IsNotEmpty()
  status: ServiceStatus;
}
