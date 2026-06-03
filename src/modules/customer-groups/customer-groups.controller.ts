import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CustomerGroupsService } from './customer-groups.service';
import {
  CreateCustomerGroupDto,
  UpdateCustomerGroupDto,
  AddMembersDto,
} from './dto/customer-group.dto';

@Controller('customer-groups')
export class CustomerGroupsController {
  constructor(private readonly customerGroupsService: CustomerGroupsService) {}

  @Get()
  findAll() {
    return this.customerGroupsService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.customerGroupsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerGroupsService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateCustomerGroupDto) {
    return this.customerGroupsService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCustomerGroupDto) {
    return this.customerGroupsService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerGroupsService.delete(id);
  }

  @Post(':id/members')
  addMembers(@Param('id') id: string, @Body() addMembersDto: AddMembersDto) {
    return this.customerGroupsService.addMembers(id, addMembersDto);
  }

  @Delete(':id/members/:customerId')
  removeMember(
    @Param('id') id: string,
    @Param('customerId') customerId: string,
  ) {
    return this.customerGroupsService.removeMember(id, customerId);
  }
}
