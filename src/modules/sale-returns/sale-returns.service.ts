import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  SaleReturn,
  ReturnStatus,
} from '../../database/entities/sale-return.entity';
import { Sale } from '../../database/entities/sale.entity';
import { Product } from '../../database/entities/product.entity';
import {
  CreateSaleReturnDto,
  UpdateSaleReturnDto,
} from './dto/sale-return.dto';

interface FilterParams {
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class SaleReturnsService {
  constructor(
    @InjectRepository(SaleReturn)
    private saleReturnRepository: Repository<SaleReturn>,
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async findAll(filters?: FilterParams) {
    const query = this.saleReturnRepository
      .createQueryBuilder('saleReturn')
      .leftJoinAndSelect('saleReturn.sale', 'sale')
      .leftJoinAndSelect('saleReturn.customer', 'customer')
      .leftJoinAndSelect('saleReturn.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('saleReturn.processedByUser', 'user')
      .orderBy('saleReturn.createdAt', 'DESC');

    if (filters?.status) {
      query.andWhere('saleReturn.status = :status', { status: filters.status });
    }

    if (filters?.search) {
      query.andWhere(
        '(saleReturn.returnNumber LIKE :search OR sale.invoiceNumber LIKE :search)',
        {
          search: `%${filters.search}%`,
        },
      );
    }

    if (filters?.startDate) {
      query.andWhere('saleReturn.createdAt >= :startDate', {
        startDate: filters.startDate,
      });
    }

    if (filters?.endDate) {
      query.andWhere('saleReturn.createdAt <= :endDate', {
        endDate: filters.endDate,
      });
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const saleReturn = await this.saleReturnRepository.findOne({
      where: { id },
      relations: [
        'sale',
        'sale.items',
        'sale.items.product',
        'customer',
        'items',
        'items.product',
        'items.saleItem',
        'processedByUser',
      ],
    });

    if (!saleReturn) {
      throw new NotFoundException('Sale return not found');
    }

    return saleReturn;
  }

  async create(createDto: CreateSaleReturnDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sale = await queryRunner.manager.findOne(Sale, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        where: { id: createDto.saleId } as any,
        relations: ['items', 'customer'],
      });

      if (!sale) {
        throw new NotFoundException('Sale not found');
      }

      const returnNumber = await this.generateReturnNumber();

      let totalAmount = 0;
      const returnItems: Array<{
        saleItemId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        reason?: string;
      }> = [];

      for (const itemDto of createDto.items) {
        const saleItem = sale.items.find(
          (i) => i.id === String(itemDto.saleItemId),
        );
        if (!saleItem) {
          throw new BadRequestException(
            `Sale item ${itemDto.saleItemId} not found`,
          );
        }

        if (itemDto.quantity > saleItem.quantity) {
          throw new BadRequestException(
            `Return quantity exceeds sold quantity for item ${itemDto.saleItemId}`,
          );
        }

        const totalPrice = itemDto.quantity * itemDto.unitPrice;
        totalAmount += totalPrice;

        returnItems.push({
          saleItemId: itemDto.saleItemId,
          productId: itemDto.productId,
          quantity: itemDto.quantity,
          unitPrice: itemDto.unitPrice,
          totalPrice,
          reason: itemDto.reason,
        });

        const product = await queryRunner.manager.findOne(Product, {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          where: { id: itemDto.productId } as any,
        });
        if (product) {
          product.stockQty += itemDto.quantity;
          await queryRunner.manager.save(Product, product);
        }
      }

      const saleReturn = queryRunner.manager.create(SaleReturn, {
        returnNumber,
        saleId: createDto.saleId,
        customerId: sale.customerId ? Number(sale.customerId) : undefined,
        reason: createDto.reason,
        notes: createDto.notes,
        totalAmount,
        refundAmount: 0,
        status: ReturnStatus.PENDING,
        processedBy: userId,
        items: returnItems,
      } as any);

      const saved = await queryRunner.manager.save(SaleReturn, saleReturn);
      await queryRunner.commitTransaction();

      return this.findOne(saved.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, updateDto: UpdateSaleReturnDto) {
    const saleReturn = await this.findOne(id);

    if (updateDto.status) {
      saleReturn.status = updateDto.status as ReturnStatus;
    }

    if (updateDto.refundMethod) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      saleReturn.refundMethod = updateDto.refundMethod as any;
    }

    if (updateDto.refundAmount !== undefined) {
      saleReturn.refundAmount = updateDto.refundAmount;
    }

    if (updateDto.notes) {
      saleReturn.notes = updateDto.notes;
    }

    await this.saleReturnRepository.save(saleReturn);
    return this.findOne(id);
  }

  async delete(id: number) {
    const saleReturn = await this.findOne(id);

    if (saleReturn.status !== ReturnStatus.PENDING) {
      throw new BadRequestException('Only pending returns can be deleted');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const item of saleReturn.items) {
        const product = await queryRunner.manager.findOne(Product, {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          where: { id: item.productId } as any,
        });
        if (product) {
          product.stockQty -= item.quantity;
          await queryRunner.manager.save(Product, product);
        }
      }

      await queryRunner.manager.delete(SaleReturn, id);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getStats() {
    const total = await this.saleReturnRepository.count();
    const pending = await this.saleReturnRepository.count({
      where: { status: ReturnStatus.PENDING },
    });
    const approved = await this.saleReturnRepository.count({
      where: { status: ReturnStatus.APPROVED },
    });
    const completed = await this.saleReturnRepository.count({
      where: { status: ReturnStatus.COMPLETED },
    });

    const totalAmountResult = await this.saleReturnRepository
      .createQueryBuilder('saleReturn')
      .select('SUM(saleReturn.totalAmount)', 'total')
      .getRawOne<{ total: string | null }>();

    const refundedAmountResult = await this.saleReturnRepository
      .createQueryBuilder('saleReturn')
      .select('SUM(saleReturn.refundAmount)', 'total')
      .where('saleReturn.status = :status', { status: ReturnStatus.COMPLETED })
      .getRawOne<{ total: string | null }>();

    return {
      total,
      pending,
      approved,
      completed,
      totalAmount: parseFloat(totalAmountResult?.total ?? '0'),
      refundedAmount: parseFloat(refundedAmountResult?.total ?? '0'),
    };
  }

  private async generateReturnNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const lastReturn = await this.saleReturnRepository
      .createQueryBuilder('saleReturn')
      .where('saleReturn.returnNumber LIKE :prefix', {
        prefix: `RET-${year}${month}%`,
      })
      .orderBy('saleReturn.id', 'DESC')
      .getOne();

    let sequence = 1;
    if (lastReturn) {
      const lastSequence = parseInt(lastReturn.returnNumber.split('-')[2]);
      sequence = lastSequence + 1;
    }

    return `RET-${year}${month}-${String(sequence).padStart(4, '0')}`;
  }
}
