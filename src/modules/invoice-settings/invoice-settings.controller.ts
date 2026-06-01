import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InvoiceSettingsService } from './invoice-settings.service';
import {
  CreateWarrantyTemplateDto,
  UpdateWarrantyTemplateDto,
  CreateTermsConditionDto,
  UpdateTermsConditionDto,
} from './dto';

@ApiTags('Invoice Settings')
@ApiBearerAuth()
@Controller('invoice-settings')
export class InvoiceSettingsController {
  constructor(
    private readonly invoiceSettingsService: InvoiceSettingsService,
  ) {}

  // Warranty Templates
  @Post('warranties')
  @ApiOperation({ summary: 'Create warranty template' })
  createWarranty(@Body() dto: CreateWarrantyTemplateDto) {
    return this.invoiceSettingsService.createWarranty(dto);
  }

  @Get('warranties')
  @ApiOperation({ summary: 'Get all warranty templates' })
  findAllWarranties() {
    return this.invoiceSettingsService.findAllWarranties();
  }

  @Get('warranties/:id')
  @ApiOperation({ summary: 'Get warranty template by ID' })
  findWarranty(@Param('id') id: string) {
    return this.invoiceSettingsService.findWarranty(id);
  }

  @Put('warranties/:id')
  @ApiOperation({ summary: 'Update warranty template' })
  updateWarranty(
    @Param('id') id: string,
    @Body() dto: UpdateWarrantyTemplateDto,
  ) {
    return this.invoiceSettingsService.updateWarranty(id, dto);
  }

  @Delete('warranties/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete warranty template' })
  deleteWarranty(@Param('id') id: string) {
    return this.invoiceSettingsService.deleteWarranty(id);
  }

  // Terms & Conditions
  @Post('terms')
  @ApiOperation({ summary: 'Create terms & conditions' })
  createTerms(@Body() dto: CreateTermsConditionDto) {
    return this.invoiceSettingsService.createTerms(dto);
  }

  @Get('terms')
  @ApiOperation({ summary: 'Get all terms & conditions' })
  findAllTerms() {
    return this.invoiceSettingsService.findAllTerms();
  }

  @Get('terms/:id')
  @ApiOperation({ summary: 'Get terms & conditions by ID' })
  findTerms(@Param('id') id: string) {
    return this.invoiceSettingsService.findTerms(id);
  }

  @Put('terms/:id')
  @ApiOperation({ summary: 'Update terms & conditions' })
  updateTerms(@Param('id') id: string, @Body() dto: UpdateTermsConditionDto) {
    return this.invoiceSettingsService.updateTerms(id, dto);
  }

  @Delete('terms/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete terms & conditions' })
  deleteTerms(@Param('id') id: string) {
    return this.invoiceSettingsService.deleteTerms(id);
  }
}
