import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ExpenseType } from '../../../common/constants';

export class CreateExpenseCategoryDto {
  @ApiProperty({ example: 'Rent' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ExpenseType })
  @IsEnum(ExpenseType)
  @IsNotEmpty()
  type: ExpenseType;
}
