import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto, MakePaymentDto } from './dto';
import { PaginationDto } from '../../common/dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/constants';

@ApiTags('Suppliers')
@ApiBearerAuth()
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new supplier' })
  @ApiBody({ type: CreateSupplierDto })
  @ApiResponse({ status: 201, description: 'Supplier created successfully' })
  create(@Body() data: CreateSupplierDto) {
    return this.suppliersService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all suppliers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'dueOnly', required: false, type: Boolean })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of suppliers',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
    @Query('dueOnly') dueOnly?: boolean,
  ) {
    return this.suppliersService.findAll({ ...paginationDto, search, dueOnly });
  }

  @Get('local-sellers')
  @ApiOperation({ summary: 'Get all local sellers (View Only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of local sellers',
  })
  findAllLocalSellers(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
  ) {
    return this.suppliersService.findAllLocalSellers({
      ...paginationDto,
      search,
    });
  }

  @Get('local-sellers/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Get local seller details (Admin only for NID info)',
  })
  @ApiParam({ name: 'id', description: 'Local seller ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns local seller details with NID info',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  findOneLocalSeller(@Param('id') id: string) {
    return this.suppliersService.findOneLocalSeller(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get supplier by ID' })
  @ApiParam({ name: 'id', description: 'Supplier ID' })
  @ApiResponse({ status: 200, description: 'Returns supplier details' })
  @ApiResponse({ status: 404, description: 'Supplier not found' })
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Post(':id/payment')
  @ApiOperation({ summary: 'Make payment to supplier' })
  @ApiParam({ name: 'id', description: 'Supplier ID' })
  @ApiBody({ type: MakePaymentDto })
  @ApiResponse({ status: 200, description: 'Payment made successfully' })
  makePayment(
    @Param('id') id: string,
    @Body() data: MakePaymentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.suppliersService.makePayment(
      id,
      { ...data, paymentDate: new Date(data.paymentDate) },
      userId,
    );
  }
}
