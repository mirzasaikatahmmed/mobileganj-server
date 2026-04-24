import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreOrder } from '../../database/entities';
import { OrderStatus } from '../../common/constants';
import { PaginationDto } from '../../common/dto';

@Injectable()
export class PreOrdersService {
  constructor(
    @InjectRepository(PreOrder)
    private preOrderRepository: Repository<PreOrder>,
  ) {}

  async findAll(
    paginationDto: PaginationDto & {
      status?: OrderStatus;
      search?: string;
      startDate?: string;
      endDate?: string;
    },
  ) {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      startDate,
      endDate,
    } = paginationDto;
    const skip = (page - 1) * limit;

    const qb = this.preOrderRepository
      .createQueryBuilder('preOrder')
      .leftJoinAndSelect('preOrder.customer', 'customer');

    if (status) {
      qb.andWhere('preOrder.status = :status', { status });
    }

    if (search) {
      qb.andWhere(
        '(preOrder.customerName LIKE :search OR preOrder.customerPhone LIKE :search OR preOrder.productName LIKE :search OR preOrder.orderNo LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (startDate && endDate) {
      qb.andWhere('preOrder.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const [data, total] = await qb
      .orderBy('preOrder.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const preOrder = await this.preOrderRepository.findOne({
      where: { id },
      relations: ['customer', 'product'],
    });

    if (!preOrder) {
      throw new NotFoundException('Pre-order not found');
    }

    return preOrder;
  }

  async findByOrderNo(orderNo: string) {
    const preOrder = await this.preOrderRepository.findOne({
      where: { orderNo },
      relations: ['customer', 'product'],
    });

    if (!preOrder) {
      throw new NotFoundException('Pre-order not found');
    }

    return preOrder;
  }

  async updateStatus(id: string, status: OrderStatus, note?: string) {
    const preOrder = await this.findOne(id);
    preOrder.status = status;
    if (note) {
      preOrder.note = note;
    }
    return this.preOrderRepository.save(preOrder);
  }

  async getSummary() {
    const statusCounts = await this.preOrderRepository
      .createQueryBuilder('preOrder')
      .select('preOrder.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .addSelect('SUM(preOrder.totalPrice)', 'totalValue')
      .groupBy('preOrder.status')
      .getRawMany();

    const totals = (await this.preOrderRepository
      .createQueryBuilder('preOrder')
      .select('COUNT(*)', 'totalOrders')
      .addSelect('SUM(preOrder.bookingAmount)', 'totalBookingCollected')
      .addSelect('SUM(preOrder.totalPrice)', 'totalOrderValue')
      .getRawOne()) as Record<string, string | null> | null;

    return {
      statusCounts,
      totalOrders: parseInt(String(totals?.totalOrders || '0')),
      totalBookingCollected: parseFloat(
        String(totals?.totalBookingCollected || '0'),
      ),
      totalOrderValue: parseFloat(String(totals?.totalOrderValue || '0')),
    };
  }
}
