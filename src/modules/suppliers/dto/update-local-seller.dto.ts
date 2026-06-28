import { PartialType } from '@nestjs/swagger';
import { CreateLocalSellerDto } from './create-local-seller.dto';

export class UpdateLocalSellerDto extends PartialType(CreateLocalSellerDto) {}
