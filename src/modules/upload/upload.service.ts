import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

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

  async uploadFile(
    file: Express.Multer.File,
    folder = 'uploads',
  ): Promise<{ url: string; key: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const ext = path.extname(file.originalname);
    const key = `${folder}/${uuidv4()}${ext}`;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
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
