import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { SaleReturnsService } from './sale-returns.service';
import {
  CreateSaleReturnDto,
  UpdateSaleReturnDto,
} from './dto/sale-return.dto';

interface RequestWithUser {
  user?: { userId: number };
}

@Controller('sale-returns')
export class SaleReturnsController {
  constructor(private readonly saleReturnsService: SaleReturnsService) {}

  @Get()
  findAll(@Query() filters: Record<string, any>) {
    return this.saleReturnsService.findAll(filters);
  }

  @Get('stats')
  getStats() {
    return this.saleReturnsService.getStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleReturnsService.findOne(+id);
  }

  @Post()
  create(@Body() createDto: CreateSaleReturnDto, @Req() req: RequestWithUser) {
    return this.saleReturnsService.create(createDto, req.user?.userId ?? 1);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateSaleReturnDto) {
    return this.saleReturnsService.update(+id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.saleReturnsService.delete(+id);
  }
}
