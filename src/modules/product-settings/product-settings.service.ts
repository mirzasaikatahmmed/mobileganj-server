import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ProductSetting,
  ProductSettingType,
} from '../../database/entities/product-setting.entity';
import { CreateProductSettingDto, UpdateProductSettingDto } from './dto';

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

    return {
      phoneTypes: settings.filter(
        (s) => s.type === ProductSettingType.PHONE_TYPE,
      ),
      accessoryTypes: settings.filter(
        (s) => s.type === ProductSettingType.ACCESSORY_TYPE,
      ),
      conditions: settings.filter(
        (s) => s.type === ProductSettingType.CONDITION,
      ),
      regions: settings.filter((s) => s.type === ProductSettingType.REGION),
      units: settings.filter((s) => s.type === ProductSettingType.UNIT),
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

    const setting = this.productSettingRepository.create(createDto);
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
