import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerGroupsController } from './customer-groups.controller';
import { CustomerGroupsService } from './customer-groups.service';
import { CustomerGroup } from '../../database/entities/customer-group.entity';
import { Customer } from '../../database/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerGroup, Customer])],
  controllers: [CustomerGroupsController],
  providers: [CustomerGroupsService],
  exports: [CustomerGroupsService],
})
export class CustomerGroupsModule {}
