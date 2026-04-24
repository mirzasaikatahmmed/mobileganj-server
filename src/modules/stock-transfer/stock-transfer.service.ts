import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import {
  StockTransfer,
  StockTransferItem,
  Product,
} from '../../database/entities';
import { StockTransferStatus } from '../../common/constants';
import { PaginationDto } from '../../common/dto';
import { generateInvoiceNumber } from '../../common/utils';

@Injectable()
export class StockTransferService {
  constructor(
    @InjectRepository(StockTransfer)
    private transferRepository: Repository<StockTransfer>,
    @InjectRepository(StockTransferItem)
    private transferItemRepository: Repository<StockTransferItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async create(
    data: {
      fromBranchId?: string;
      toBranchId?: string;
      items: Array<{ productId: string; quantity: number }>;
      note?: string;
    },
    userId: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const item of data.items) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(`Product ${item.productId} not found`);
        }

        if (product.stockQty < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.title}`,
          );
        }
      }

      const transfer = this.transferRepository.create({
        transferNo: generateInvoiceNumber('TRF'),
        fromBranchId: data.fromBranchId,
        toBranchId: data.toBranchId,
        status: StockTransferStatus.PENDING,
        note: data.note,
        createdById: userId,
      });

      const savedTransfer = await queryRunner.manager.save(
        StockTransfer,
        transfer,
      );

      for (const item of data.items) {
        const transferItem = this.transferItemRepository.create({
          transferId: savedTransfer.id,
          productId: item.productId,
          quantity: item.quantity,
        });
        await queryRunner.manager.save(StockTransferItem, transferItem);
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedTransfer.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    paginationDto: PaginationDto & {
      status?: StockTransferStatus;
      fromBranchId?: string;
      toBranchId?: string;
    },
  ) {
    const {
      page = 1,
      limit = 10,
      status,
      fromBranchId,
      toBranchId,
    } = paginationDto;
    const skip = (page - 1) * limit;

    const qb = this.transferRepository
      .createQueryBuilder('transfer')
      .leftJoinAndSelect('transfer.fromBranch', 'fromBranch')
      .leftJoinAndSelect('transfer.toBranch', 'toBranch')
      .leftJoinAndSelect('transfer.createdBy', 'createdBy')
      .leftJoinAndSelect('transfer.items', 'items')
      .leftJoinAndSelect('items.product', 'product');

    if (status) qb.andWhere('transfer.status = :status', { status });
    if (fromBranchId)
      qb.andWhere('transfer.fromBranchId = :fromBranchId', { fromBranchId });
    if (toBranchId)
      qb.andWhere('transfer.toBranchId = :toBranchId', { toBranchId });

    const [data, total] = await qb
      .orderBy('transfer.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const transfer = await this.transferRepository.findOne({
      where: { id },
      relations: [
        'fromBranch',
        'toBranch',
        'createdBy',
        'items',
        'items.product',
      ],
    });

    if (!transfer) {
      throw new NotFoundException('Stock transfer not found');
    }

    return transfer;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async approve(id: string, _userId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transfer = await this.findOne(id);

      if (transfer.status !== StockTransferStatus.PENDING) {
        throw new BadRequestException('Only pending transfers can be approved');
      }

      for (const item of transfer.items) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) continue;

        if (product.stockQty < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.title}`,
          );
        }

        product.stockQty -= item.quantity;
        product.branchId = transfer.toBranchId ?? product.branchId;
        await queryRunner.manager.save(product);
      }

      transfer.status = StockTransferStatus.APPROVED;
      await queryRunner.manager.save(StockTransfer, transfer);
      await queryRunner.commitTransaction();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async reject(id: string) {
    const transfer = await this.findOne(id);

    if (transfer.status !== StockTransferStatus.PENDING) {
      throw new BadRequestException('Only pending transfers can be rejected');
    }

    transfer.status = StockTransferStatus.REJECTED;
    return this.transferRepository.save(transfer);
  }
}
