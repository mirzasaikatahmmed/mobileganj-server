import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerType } from '../../database/entities/customer-type.entity';
import {
  CreateCustomerTypeDto,
  UpdateCustomerTypeDto,
} from './dto/customer-type.dto';

@Injectable()
export class CustomerTypesService {
  constructor(
    @InjectRepository(CustomerType)
    private customerTypeRepository: Repository<CustomerType>,
  ) {}

  async findAll() {
    return this.customerTypeRepository.find({
      relations: ['customers'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const type = await this.customerTypeRepository.findOne({
      where: { id },
      relations: ['customers'],
    });

    if (!type) {
      throw new NotFoundException('Customer type not found');
    }

    return type;
  }

  async create(createDto: CreateCustomerTypeDto) {
    const exists = await this.customerTypeRepository.findOne({
      where: { name: createDto.name },
    });

    if (exists) {
      throw new BadRequestException(
        'Customer type with this name already exists',
      );
    }

    const type = this.customerTypeRepository.create(createDto);
    return this.customerTypeRepository.save(type);
  }

  async update(id: string, updateDto: UpdateCustomerTypeDto) {
    const type = await this.findOne(id);

    if (updateDto.name && updateDto.name !== type.name) {
      const exists = await this.customerTypeRepository.findOne({
        where: { name: updateDto.name },
      });

      if (exists) {
        throw new BadRequestException(
          'Customer type with this name already exists',
        );
      }
    }

    Object.assign(type, updateDto);
    return this.customerTypeRepository.save(type);
  }

  async delete(id: string) {
    const type = await this.findOne(id);

    if (type.customers && type.customers.length > 0) {
      throw new BadRequestException(
        'Cannot delete customer type with associated customers',
      );
    }

    await this.customerTypeRepository.remove(type);
  }

  async getStats() {
    const types = await this.customerTypeRepository.find({
      relations: ['customers'],
    });

    return types.map((type) => ({
      id: type.id,
      name: type.name,
      discount: type.discount,
      color: type.color,
      customersCount: type.customers?.length || 0,
      isActive: type.isActive,
    }));
  }
}
