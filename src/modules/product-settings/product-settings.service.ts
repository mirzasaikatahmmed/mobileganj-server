import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSetting } from '../../database/entities/product-setting.entity';
import {
  CreateProductSettingDto,
  UpdateProductSettingDto,
  ProductSettingType,
} from './dto';

@Injectable()
export class ProductSettingsService {
  constructor(
    @InjectRepository(ProductSetting)
    private productSettingRepository: Repository<ProductSetting>,
  ) {}

  async findAll() {
    const settings = await this.productSettingRepository.find({
      where: { isActive: true },
      order: { createdAt: 'ASC' },
    });

    const phoneTypes: ProductSetting[] = [];
    const accessoryTypes: ProductSetting[] = [];
    const conditions: ProductSetting[] = [];
    const regions: ProductSetting[] = [];
    const units: ProductSetting[] = [];

    for (const s of settings) {
      if (s.type === 'phone_type') phoneTypes.push(s);
      else if (s.type === 'accessory_type') accessoryTypes.push(s);
      else if (s.type === 'condition') conditions.push(s);
      else if (s.type === 'region') regions.push(s);
      else if (s.type === 'unit') units.push(s);
    }

    return {
      phoneTypes,
      accessoryTypes,
      conditions,
      regions,
      units,
    };
  }

  async findByType(type: ProductSettingType) {
    return this.productSettingRepository.find({
      where: { type, isActive: true },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    const setting = await this.productSettingRepository.findOne({
      where: { id },
    });

    if (!setting) {
      throw new NotFoundException('Product setting not found');
    }

    return setting;
  }

  async create(createDto: CreateProductSettingDto) {
    const existing = await this.productSettingRepository.findOne({
      where: { value: createDto.value },
    });

    if (existing) {
      throw new ConflictException('Value already exists');
    }

    const setting = this.productSettingRepository.create({
      type: createDto.type,
      name: createDto.name,
      value: createDto.value,
    });
    return this.productSettingRepository.save(setting);
  }

  async update(id: string, updateDto: UpdateProductSettingDto) {
    const setting = await this.findOne(id);

    if (updateDto.value && updateDto.value !== setting.value) {
      const existing = await this.productSettingRepository.findOne({
        where: { value: updateDto.value },
      });

      if (existing) {
        throw new ConflictException('Value already exists');
      }
    }

    Object.assign(setting, updateDto);
    return this.productSettingRepository.save(setting);
  }

  async remove(id: string) {
    const setting = await this.findOne(id);
    setting.isActive = false;
    await this.productSettingRepository.save(setting);
    return { message: 'Product setting deleted successfully' };
  }
}
