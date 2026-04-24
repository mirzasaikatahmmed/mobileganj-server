import { Controller, Get, Put, Patch, Param, Body, Delete, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/constants';

@ApiTags('Settings')
@ApiBearerAuth()
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all settings' })
  @ApiResponse({ status: 200, description: 'Returns all settings sections' })
  getAll() {
    return this.settingsService.getAll();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get settings section by key' })
  @ApiParam({ name: 'key', description: 'Settings section key (e.g. store, invoice, emi)' })
  @ApiResponse({ status: 200, description: 'Returns settings section' })
  getSection(@Param('key') key: string) {
    return this.settingsService.getSection(key);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put()
  @ApiOperation({ summary: 'Update all settings (Admin only)' })
  @ApiBody({
    schema: {
      type: 'object',
      description: 'Settings object with section keys',
    },
  })
  @ApiResponse({ status: 200, description: 'Settings updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  updateAll(@Body() body: Record<string, Record<string, unknown>>) {
    return this.settingsService.updateAll(body);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':key')
  @ApiOperation({ summary: 'Update a settings section (Admin only)' })
  @ApiParam({ name: 'key', description: 'Settings section key' })
  @ApiBody({
    schema: {
      type: 'object',
      description: 'Settings values for the section',
    },
  })
  @ApiResponse({ status: 200, description: 'Settings section updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  updateSection(
    @Param('key') key: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.settingsService.updateSection(key, body);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('reset')
  @ApiOperation({ summary: 'Reset all settings to defaults (Admin only)' })
  @ApiResponse({ status: 200, description: 'Settings reset to defaults' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  reset() {
    return this.settingsService.reset();
  }
}
