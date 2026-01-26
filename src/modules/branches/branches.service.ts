import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '../../database/entities';
import { CreateBranchDto, UpdateBranchDto } from './dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const branch = this.branchRepository.create(createBranchDto);
    return this.branchRepository.save(branch);
  }

  async findAll() {
    return this.branchRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const branch = await this.branchRepository.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    const branch = await this.findOne(id);
    Object.assign(branch, updateBranchDto);
    return this.branchRepository.save(branch);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.branchRepository.softDelete(id);
    return { message: 'Branch deleted successfully' };
  }
}
