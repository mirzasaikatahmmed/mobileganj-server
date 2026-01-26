import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { PaginationDto } from '../../common/dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole, PaymentMethod } from '../../common/constants';

@ApiTags('Suppliers')
@ApiBearerAuth()
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new supplier' })
  create(@Body() data: { name: string; phone?: string; address?: string; shopName?: string; note?: string }) {
    return this.suppliersService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
    @Query('dueOnly') dueOnly?: boolean,
  ) {
    return this.suppliersService.findAll({ ...paginationDto, search, dueOnly });
  }

  @Get('local-sellers')
  @ApiOperation({ summary: 'Get all local sellers (View Only)' })
  findAllLocalSellers(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
  ) {
    return this.suppliersService.findAllLocalSellers({ ...paginationDto, search });
  }

  @Get('local-sellers/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get local seller details (Admin only for NID info)' })
  findOneLocalSeller(@Param('id') id: string) {
    return this.suppliersService.findOneLocalSeller(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get supplier by ID' })
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Post(':id/payment')
  @ApiOperation({ summary: 'Make payment to supplier' })
  makePayment(
    @Param('id') id: string,
    @Body() data: { amount: number; paymentMethod: PaymentMethod; paymentDate: string; note?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.suppliersService.makePayment(
      id,
      { ...data, paymentDate: new Date(data.paymentDate) },
      userId,
    );
  }
}
