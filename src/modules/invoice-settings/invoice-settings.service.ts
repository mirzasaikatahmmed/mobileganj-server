import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarrantyTemplate, TermsCondition } from '../../database/entities';
import {
  CreateWarrantyTemplateDto,
  UpdateWarrantyTemplateDto,
  CreateTermsConditionDto,
  UpdateTermsConditionDto,
} from './dto';

@Injectable()
export class InvoiceSettingsService {
  constructor(
    @InjectRepository(WarrantyTemplate)
    private warrantyRepository: Repository<WarrantyTemplate>,
    @InjectRepository(TermsCondition)
    private termsRepository: Repository<TermsCondition>,
  ) {}

  // Warranty Templates
  async createWarranty(dto: CreateWarrantyTemplateDto) {
    const warranty = this.warrantyRepository.create(dto);
    return await this.warrantyRepository.save(warranty);
  }

  async findAllWarranties() {
    return await this.warrantyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findWarranty(id: string) {
    const warranty = await this.warrantyRepository.findOne({ where: { id } });
    if (!warranty) {
      throw new NotFoundException('Warranty template not found');
    }
    return warranty;
  }

  async updateWarranty(id: string, dto: UpdateWarrantyTemplateDto) {
    const warranty = await this.findWarranty(id);
    Object.assign(warranty, dto);
    return await this.warrantyRepository.save(warranty);
  }

  async deleteWarranty(id: string) {
    const warranty = await this.findWarranty(id);
    await this.warrantyRepository.remove(warranty);
  }

  // Terms & Conditions
  async createTerms(dto: CreateTermsConditionDto) {
    const terms = this.termsRepository.create(dto);
    return await this.termsRepository.save(terms);
  }

  async findAllTerms() {
    return await this.termsRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findTerms(id: string) {
    const terms = await this.termsRepository.findOne({ where: { id } });
    if (!terms) {
      throw new NotFoundException('Terms & Conditions not found');
    }
    return terms;
  }

  async updateTerms(id: string, dto: UpdateTermsConditionDto) {
    const terms = await this.findTerms(id);
    Object.assign(terms, dto);
    return await this.termsRepository.save(terms);
  }

  async deleteTerms(id: string) {
    const terms = await this.findTerms(id);
    await this.termsRepository.remove(terms);
  }
}
