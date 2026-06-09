import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/webp',
  'image/avif',
]);

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.get<string>('s3.endpoint');
    this.s3Client = new S3Client({
      region: this.configService.get<string>('s3.region') ?? 'us-east-1',
      credentials: {
        accessKeyId: this.configService.get<string>('s3.accessKeyId') ?? '',
        secretAccessKey:
          this.configService.get<string>('s3.secretAccessKey') ?? '',
      },
      ...(endpoint && { endpoint, forcePathStyle: true }),
    });
    this.bucket = this.configService.get<string>('s3.bucket') ?? '';
  }

  private async processBuffer(
    file: Express.Multer.File,
  ): Promise<{ buffer: Buffer; contentType: string; ext: string }> {
    if (IMAGE_MIME_TYPES.has(file.mimetype)) {
      const buffer = await sharp(file.buffer).webp({ quality: 60 }).toBuffer();
      return { buffer, contentType: 'image/webp', ext: '.webp' };
    }

    const ext = file.originalname.includes('.')
      ? `.${file.originalname.split('.').pop()}`
      : '';
    return { buffer: file.buffer, contentType: file.mimetype, ext };
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'uploads',
  ): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const { buffer, contentType, ext } = await this.processBuffer(file);
    const key = `${folder}/${uuidv4()}${ext}`;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      },
    });

    await upload.done();

    const endpoint = this.configService.get<string>('s3.endpoint');
    const region = this.configService.get<string>('s3.region') ?? 'us-east-1';
    const url = endpoint
      ? `${endpoint}/${this.bucket}/${key}`
      : `https://${this.bucket}.s3.${region}.amazonaws.com/${key}`;

    return { url, key };
  }

  async uploadFiles(
    files: Express.Multer.File[],
    folder = 'uploads',
  ): Promise<Array<{ url: string; key: string }>> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }
    return Promise.all(files.map((file) => this.uploadFile(file, folder)));
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }
}
