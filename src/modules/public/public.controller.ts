import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
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
  getBrands() {
    return this.publicService.getBrands();
  }

  @Get('shop')
  @ApiOperation({ summary: 'Get all shop products with filters' })
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
  getPhones(
    @Query() paginationDto: PaginationDto,
    @Query('brandId') brandId?: string,
    @Query('condition') condition?: ProductCondition,
    @Query('sort') sort?: string,
  ) {
    return this.publicService.getPhones({ ...paginationDto, brandId, condition, sort });
  }

  @Get('accessories')
  @ApiOperation({ summary: 'Get accessories' })
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
  getPreOrderProducts() {
    return this.publicService.getPreOrderProducts();
  }

  @Get('offers')
  @ApiOperation({ summary: 'Get offer products' })
  getOfferProducts() {
    return this.publicService.getOfferProducts();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured products' })
  getFeaturedProducts() {
    return this.publicService.getFeaturedProducts();
  }

  @Get('new-arrivals')
  @ApiOperation({ summary: 'Get new arrivals' })
  getNewArrivals() {
    return this.publicService.getNewArrivals();
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending products' })
  getTrendingProducts() {
    return this.publicService.getTrendingProducts();
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product details' })
  getProductDetails(@Param('id') id: string) {
    return this.publicService.getProductDetails(id);
  }

  @Get('emi-calculator')
  @ApiOperation({ summary: 'Calculate EMI' })
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
  createPreOrder(
    @Body() data: {
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
