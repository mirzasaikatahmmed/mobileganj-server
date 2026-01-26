import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductFilterDto,
  CreateBrandDto,
  CreateDamageDto,
} from './dto';
import { CurrentUser, Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/constants';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Brand endpoints
  @Post('brands')
  @ApiOperation({ summary: 'Create new brand' })
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.productsService.createBrand(createBrandDto);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get all brands' })
  findAllBrands() {
    return this.productsService.findAllBrands();
  }

  // Product endpoints
  @Post()
  @ApiOperation({ summary: 'Create new product (Stock In)' })
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with filters' })
  findAll(@Query() filterDto: ProductFilterDto) {
    return this.productsService.findAll(filterDto);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get products summary (total, low stock, etc.)' })
  getSummary() {
    return this.productsService.getSummary();
  }

  @Get('search/imei/:imei')
  @ApiOperation({ summary: 'Find product by IMEI' })
  findByImei(@Param('imei') imei: string) {
    return this.productsService.findByImei(imei);
  }

  @Get('search/barcode/:barcode')
  @ApiOperation({ summary: 'Find product by barcode' })
  findByBarcode(@Param('barcode') barcode: string) {
    return this.productsService.findByBarcode(barcode);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product (Admin only)' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  // Damage endpoints
  @Post('damages')
  @ApiOperation({ summary: 'Report product damage' })
  createDamage(
    @Body() createDamageDto: CreateDamageDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.productsService.createDamage(createDamageDto, userId);
  }

  @Get('damages/all')
  @ApiOperation({ summary: 'Get all damage reports' })
  findAllDamages(@Query('productId') productId?: string) {
    return this.productsService.findAllDamages(productId);
  }

  @Patch('damages/:id')
  @ApiOperation({ summary: 'Update damage report' })
  updateDamage(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateDamageDto>,
  ) {
    return this.productsService.updateDamage(id, updateData);
  }
}
