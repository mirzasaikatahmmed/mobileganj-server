import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerGroup } from '../../database/entities/customer-group.entity';
import { Customer } from '../../database/entities/customer.entity';
import {
  CreateCustomerGroupDto,
  UpdateCustomerGroupDto,
  AddMembersDto,
} from './dto/customer-group.dto';

@Injectable()
export class CustomerGroupsService {
  constructor(
    @InjectRepository(CustomerGroup)
    private customerGroupRepository: Repository<CustomerGroup>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll() {
    return this.customerGroupRepository.find({
      relations: ['customers'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const group = await this.customerGroupRepository.findOne({
      where: { id },
      relations: ['customers'],
    });

    if (!group) {
      throw new NotFoundException('Customer group not found');
    }

    return group;
  }

  async create(createDto: CreateCustomerGroupDto) {
    const exists = await this.customerGroupRepository.findOne({
      where: { name: createDto.name },
    });

    if (exists) {
      throw new BadRequestException(
        'Customer group with this name already exists',
      );
    }

    const group = this.customerGroupRepository.create(createDto);
    return this.customerGroupRepository.save(group);
  }

  async update(id: string, updateDto: UpdateCustomerGroupDto) {
    const group = await this.findOne(id);

    if (updateDto.name && updateDto.name !== group.name) {
      const exists = await this.customerGroupRepository.findOne({
        where: { name: updateDto.name },
      });

      if (exists) {
        throw new BadRequestException(
          'Customer group with this name already exists',
        );
      }
    }

    Object.assign(group, updateDto);
    return this.customerGroupRepository.save(group);
  }

  async delete(id: string) {
    const group = await this.findOne(id);
    await this.customerGroupRepository.remove(group);
  }

  async addMembers(id: string, addMembersDto: AddMembersDto) {
    const group = await this.findOne(id);

    const customers = await this.customerRepository.findByIds(
      addMembersDto.customerIds,
    );

    if (customers.length !== addMembersDto.customerIds.length) {
      throw new BadRequestException('Some customers not found');
    }

    if (!group.customers) {
      group.customers = [];
    }

    const existingIds = new Set(group.customers.map((c) => c.id));
    const newCustomers = customers.filter((c) => !existingIds.has(c.id));

    group.customers.push(...newCustomers);

    return this.customerGroupRepository.save(group);
  }

  async removeMember(id: string, customerId: string) {
    const group = await this.findOne(id);

    if (!group.customers) {
      throw new BadRequestException('Group has no members');
    }

    group.customers = group.customers.filter((c) => c.id !== customerId);

    return this.customerGroupRepository.save(group);
  }

  async getStats() {
    const groups = await this.customerGroupRepository.find({
      relations: ['customers'],
    });

    return groups.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      color: group.color,
      membersCount: group.customers?.length || 0,
      isActive: group.isActive,
    }));
  }
}
