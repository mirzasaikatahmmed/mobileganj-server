import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { PublicService } from './public.service';
import { Public } from '../../common/decorators';
import { PaginationDto } from '../../common/dto';
import {
  ProductCategory,
  ProductCondition,
  EmiDuration,
  PaymentMethod,
} from '../../common/constants';

@ApiTags('Public API (Landing Page)')
@Public()
@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('brands')
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: 200, description: 'Returns list of brands' })
  getBrands() {
    return this.publicService.getBrands();
  }

  @Get('shop')
  @ApiOperation({ summary: 'Get all shop products with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, enum: ProductCategory })
  @ApiQuery({ name: 'brandId', required: false, type: String })
  @ApiQuery({ name: 'condition', required: false, enum: ProductCondition })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of shop products',
  })
  getShopProducts(
    @Query() paginationDto: PaginationDto,
    @Query('category') category?: ProductCategory,
    @Query('brandId') brandId?: string,
    @Query('condition') condition?: ProductCondition,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('search') search?: string,
  ) {
    return this.publicService.getShopProducts({
      ...paginationDto,
      category,
      brandId,
      condition,
      minPrice,
      maxPrice,
      search,
    });
  }

  @Get('phones')
  @ApiOperation({ summary: 'Get phones (Buy Phone page)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'brandId', required: false, type: String })
  @ApiQuery({ name: 'condition', required: false, enum: ProductCondition })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Returns paginated list of phones' })
  getPhones(
    @Query() paginationDto: PaginationDto,
    @Query('brandId') brandId?: string,
    @Query('condition') condition?: ProductCondition,
    @Query('sort') sort?: string,
  ) {
    return this.publicService.getPhones({
      ...paginationDto,
      brandId,
      condition,
      sort,
    });
  }

  @Get('accessories')
  @ApiOperation({ summary: 'Get accessories' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'accessoryType', required: false, type: String })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of accessories',
  })
  getAccessories(
    @Query() paginationDto: PaginationDto,
    @Query('accessoryType') accessoryType?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.publicService.getAccessories({
      ...paginationDto,
      accessoryType,
      minPrice,
      maxPrice,
    });
  }

  @Get('pre-order')
  @ApiOperation({ summary: 'Get pre-order products' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of pre-order products',
  })
  getPreOrderProducts() {
    return this.publicService.getPreOrderProducts();
  }

  @Get('offers')
  @ApiOperation({ summary: 'Get offer products' })
  @ApiResponse({ status: 200, description: 'Returns list of offer products' })
  getOfferProducts() {
    return this.publicService.getOfferProducts();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of featured products',
  })
  getFeaturedProducts() {
    return this.publicService.getFeaturedProducts();
  }

  @Get('new-arrivals')
  @ApiOperation({ summary: 'Get new arrivals' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of new arrival products',
  })
  getNewArrivals() {
    return this.publicService.getNewArrivals();
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending products' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of trending products',
  })
  getTrendingProducts() {
    return this.publicService.getTrendingProducts();
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product details' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Returns product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  getProductDetails(@Param('id') id: string) {
    return this.publicService.getProductDetails(id);
  }

  @Get('emi-calculator')
  @ApiOperation({ summary: 'Calculate EMI' })
  @ApiQuery({ name: 'totalPrice', required: true, type: Number })
  @ApiQuery({ name: 'downPayment', required: true, type: Number })
  @ApiQuery({ name: 'duration', required: true, enum: EmiDuration })
  @ApiQuery({ name: 'interestRate', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Returns EMI calculation' })
  calculateEmi(
    @Query('totalPrice') totalPrice: number,
    @Query('downPayment') downPayment: number,
    @Query('duration') duration: EmiDuration,
    @Query('interestRate') interestRate?: number,
  ) {
    return this.publicService.calculateEmi(
      totalPrice,
      downPayment,
      duration,
      interestRate,
    );
  }

  @Post('pre-order')
  @ApiOperation({ summary: 'Create pre-order' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        customerName: { type: 'string', example: 'John Doe' },
        customerPhone: { type: 'string', example: '01712345678' },
        customerAddress: { type: 'string', example: 'Dhaka, Bangladesh' },
        productId: { type: 'string' },
        variantId: { type: 'string' },
        productName: { type: 'string', example: 'iPhone 15 Pro Max' },
        variantDetails: { type: 'string', example: '256GB, Blue Titanium' },
        totalPrice: { type: 'number', example: 150000 },
        isEmi: { type: 'boolean', example: false },
        emiDuration: {
          type: 'number',
          enum: [3, 6, 9, 12],
          example: 6,
          description: 'EMI duration in months',
        },
        downPayment: { type: 'number', example: 50000 },
        emiInterestRate: { type: 'number', example: 2.5 },
        bookingAmount: { type: 'number', example: 10000 },
        paymentMethod: {
          type: 'string',
          enum: ['cash', 'bkash', 'nagad', 'bank'],
          example: 'cash',
        },
        note: { type: 'string' },
      },
      required: [
        'customerName',
        'customerPhone',
        'productName',
        'totalPrice',
        'bookingAmount',
      ],
    },
  })
  @ApiResponse({ status: 201, description: 'Pre-order created successfully' })
  createPreOrder(
    @Body()
    data: {
      customerName: string;
      customerPhone: string;
      customerAddress?: string;
      productId?: string;
      variantId?: string;
      productName: string;
      variantDetails?: string;
      totalPrice: number;
      isEmi?: boolean;
      emiDuration?: EmiDuration;
      downPayment?: number;
      emiInterestRate?: number;
      bookingAmount: number;
      paymentMethod?: PaymentMethod;
      note?: string;
    },
  ) {
    return this.publicService.createPreOrder(data);
  }
}
