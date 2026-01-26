import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { Roles } from '../../common/decorators';
import { RolesGuard } from '../../common/guards';
import { UserRole } from '../../common/constants';

@ApiTags('Branches')
@ApiBearerAuth()
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create new branch (Admin only)' })
  @ApiBody({ type: CreateBranchDto })
  @ApiResponse({ status: 201, description: 'Branch created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches' })
  @ApiResponse({ status: 200, description: 'Returns list of all branches' })
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get branch by ID' })
  @ApiParam({ name: 'id', description: 'Branch ID' })
  @ApiResponse({ status: 200, description: 'Returns branch details' })
  @ApiResponse({ status: 404, description: 'Branch not found' })
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Update branch (Admin only)' })
  @ApiParam({ name: 'id', description: 'Branch ID' })
  @ApiBody({ type: UpdateBranchDto })
  @ApiResponse({ status: 200, description: 'Branch updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(id, updateBranchDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete branch (Admin only)' })
  @ApiParam({ name: 'id', description: 'Branch ID' })
  @ApiResponse({ status: 200, description: 'Branch deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized - Admin only' })
  remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}
