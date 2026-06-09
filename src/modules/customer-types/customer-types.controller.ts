import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CustomerTypesService } from './customer-types.service';
import {
  CreateCustomerTypeDto,
  UpdateCustomerTypeDto,
} from './dto/customer-type.dto';

@Controller('customer-types')
export class CustomerTypesController {
  constructor(private readonly customerTypesService: CustomerTypesService) {}

  @Get()
  findAll() {
    return this.customerTypesService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.customerTypesService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerTypesService.findOne(id);
  }

  @Post()
  create(@Body() createDto: CreateCustomerTypeDto) {
    return this.customerTypesService.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCustomerTypeDto) {
    return this.customerTypesService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerTypesService.delete(id);
  }
}
