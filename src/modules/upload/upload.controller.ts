import {
  Controller,
  Post,
  Delete,
  Param,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a single file to S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'S3 folder/prefix',
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    return this.uploadService.uploadFile(file, folder);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({ summary: 'Upload multiple files to S3 (max 10)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'S3 folder/prefix',
  })
  @ApiResponse({ status: 201, description: 'Files uploaded successfully' })
  uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ) {
    return this.uploadService.uploadFiles(files, folder);
  }

  @Delete(':key')
  @ApiOperation({ summary: 'Delete a file from S3 by key' })
  @ApiParam({ name: 'key', description: 'S3 object key (URL-encoded)' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  deleteFile(@Param('key') key: string) {
    return this.uploadService.deleteFile(decodeURIComponent(key));
  }
}
