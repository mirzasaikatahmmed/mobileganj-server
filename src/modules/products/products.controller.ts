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
  Res,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
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

  @Post('brands')
  @ApiOperation({ summary: 'Create new brand' })
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({ status: 201, description: 'Brand created successfully' })
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.productsService.createBrand(createBrandDto);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, description: 'Returns list of brands' })
  findAllBrands() {
    return this.productsService.findAllBrands();
  }

  @Post()
  @ApiOperation({ summary: 'Create new product (Stock In)' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of products',
  })
  findAll(@Query() filterDto: ProductFilterDto) {
    return this.productsService.findAll(filterDto);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get products summary (total, low stock, etc.)' })
  @ApiResponse({ status: 200, description: 'Returns products summary' })
  getSummary() {
    return this.productsService.getSummary();
  }

  @Get('search/imei/:imei')
  @ApiOperation({ summary: 'Find product by IMEI' })
  @ApiParam({ name: 'imei', description: 'Product IMEI' })
  @ApiResponse({ status: 200, description: 'Returns product if found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findByImei(@Param('imei') imei: string) {
    return this.productsService.findByImei(imei);
  }

  @Get('search/barcode/:barcode')
  @ApiOperation({ summary: 'Find product by barcode' })
  @ApiParam({ name: 'barcode', description: 'Product barcode' })
  @ApiResponse({ status: 200, description: 'Returns product if found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findByBarcode(@Param('barcode') barcode: string) {
    return this.productsService.findByBarcode(barcode);
  }

  @Get('barcode/generate')
  @ApiOperation({ summary: 'Generate barcode image' })
  @ApiQuery({
    name: 'value',
    required: true,
    type: String,
    description: 'Barcode value to generate',
  })
  @ApiQuery({
    name: 'format',
    required: false,
    enum: ['png', 'svg'],
    description: 'Image format (png or svg)',
    default: 'png',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns barcode image',
    content: {
      'image/png': {
        schema: { type: 'string', format: 'binary' },
      },
      'image/svg+xml': {
        schema: { type: 'string' },
      },
    },
  })
  async generateBarcode(
    @Query('value') value: string,
    @Query('format') format: 'png' | 'svg' = 'png',
    @Res() res: Response,
  ) {
    if (!value) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Barcode value is required',
      });
    }

    const result = await this.productsService.generateBarcodeImage(
      value,
      format,
    );

    if (format === 'png') {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader(
        'Content-Disposition',
        `inline; filename="barcode-${value}.png"`,
      );
      return res.send(result as Buffer);
    } else {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader(
        'Content-Disposition',
        `inline; filename="barcode-${value}.svg"`,
      );
      return res.send(result as string);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Returns product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product (Admin only)' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('damages')
  @ApiOperation({ summary: 'Report product damage' })
  @ApiBody({ type: CreateDamageDto })
  @ApiResponse({
    status: 201,
    description: 'Damage report created successfully',
  })
  createDamage(
    @Body() createDamageDto: CreateDamageDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.productsService.createDamage(createDamageDto, userId);
  }

  @Get('damages/all')
  @ApiOperation({ summary: 'Get all damage reports' })
  @ApiQuery({ name: 'productId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns list of damage reports' })
  findAllDamages(@Query('productId') productId?: string) {
    return this.productsService.findAllDamages(productId);
  }

  @Patch('damages/:id')
  @ApiOperation({ summary: 'Update damage report' })
  @ApiParam({ name: 'id', description: 'Damage report ID' })
  @ApiBody({ type: CreateDamageDto })
  @ApiResponse({
    status: 200,
    description: 'Damage report updated successfully',
  })
  updateDamage(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateDamageDto>,
  ) {
    return this.productsService.updateDamage(id, updateData);
  }
}
