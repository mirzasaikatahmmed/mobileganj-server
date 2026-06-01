import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProductSettingsService } from './product-settings.service';
import {
  CreateProductSettingDto,
  UpdateProductSettingDto,
  ProductSettingType,
} from './dto';
import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/constants';

@ApiTags('Product Settings')
@ApiBearerAuth()
@Controller('product-settings')
export class ProductSettingsController {
  constructor(
    private readonly productSettingsService: ProductSettingsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all product settings grouped by type' })
  @ApiResponse({ status: 200, description: 'Returns all product settings' })
  findAll() {
    return this.productSettingsService.findAll();
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get product settings by type' })
  @ApiParam({
    name: 'type',
    enum: ['phone_type', 'accessory_type', 'condition', 'region', 'unit'],
    description: 'Product setting type',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns settings of specified type',
  })
  findByType(@Param('type') type: string) {
    return this.productSettingsService.findByType(type as ProductSettingType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product setting by ID' })
  @ApiResponse({ status: 200, description: 'Returns product setting' })
  @ApiResponse({ status: 404, description: 'Product setting not found' })
  findOne(@Param('id') id: string) {
    return this.productSettingsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create product setting (Admin only)' })
  @ApiResponse({ status: 201, description: 'Product setting created' })
  @ApiResponse({ status: 409, description: 'Value already exists' })
  create(@Body() createDto: CreateProductSettingDto) {
    return this.productSettingsService.create(createDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update product setting (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product setting updated' })
  @ApiResponse({ status: 404, description: 'Product setting not found' })
  update(@Param('id') id: string, @Body() updateDto: UpdateProductSettingDto) {
    return this.productSettingsService.update(id, updateDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product setting (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product setting deleted' })
  @ApiResponse({ status: 404, description: 'Product setting not found' })
  remove(@Param('id') id: string) {
    return this.productSettingsService.remove(id);
  }
}
