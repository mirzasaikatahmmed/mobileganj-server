import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Product,
  Brand,
  Supplier,
  LocalSeller,
  ProductDamage,
} from '../../database/entities';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductFilterDto,
  CreateBrandDto,
  CreateDamageDto,
} from './dto';
import {
  ProductCategory,
  PhoneType,
  ProductStatus,
} from '../../common/constants';
import {
  generateBarcode,
  generateBarcodeImage,
  generateBarcodeSVG,
} from '../../common/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(LocalSeller)
    private localSellerRepository: Repository<LocalSeller>,
    @InjectRepository(ProductDamage)
    private damageRepository: Repository<ProductDamage>,
  ) {}

  async createBrand(createBrandDto: CreateBrandDto) {
    const brand = this.brandRepository.create(createBrandDto);
    return this.brandRepository.save(brand);
  }

  async findAllBrands() {
    return this.brandRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createProductDto: CreateProductDto, _userId: string) {
    const { localSellerInfo, supplierName, supplierPhone, ...productData } =
      createProductDto;

    if (createProductDto.category === ProductCategory.PHONE) {
      if (!createProductDto.phoneType) {
        throw new BadRequestException('Phone type is required for phones');
      }

      if (
        createProductDto.phoneType === PhoneType.OVERSEAS &&
        !createProductDto.supplierId &&
        !supplierName
      ) {
        throw new BadRequestException(
          'Supplier is required for overseas phones',
        );
      }

      if (createProductDto.phoneType === PhoneType.LOCAL && !localSellerInfo) {
        throw new BadRequestException(
          'Local seller info is required for local phones',
        );
      }
    }

    let supplierId = createProductDto.supplierId;
    if (
      createProductDto.category === ProductCategory.PHONE &&
      createProductDto.phoneType === PhoneType.OVERSEAS &&
      supplierName &&
      !supplierId
    ) {
      let supplier = await this.supplierRepository.findOne({
        where: { name: supplierName },
      });

      if (!supplier) {
        supplier = this.supplierRepository.create({
          name: supplierName,
          phone: supplierPhone,
        });
        supplier = await this.supplierRepository.save(supplier);
      }

      supplierId = supplier.id;
    }

    let localSellerId: string | undefined;
    if (
      createProductDto.category === ProductCategory.PHONE &&
      createProductDto.phoneType === PhoneType.LOCAL &&
      localSellerInfo
    ) {
      const localSeller = this.localSellerRepository.create(localSellerInfo);
      const savedLocalSeller =
        await this.localSellerRepository.save(localSeller);
      localSellerId = savedLocalSeller.id;
    }

    const barcode = generateBarcode(
      createProductDto.category === ProductCategory.PHONE ? 'PH' : 'AC',
    );

    const product = this.productRepository.create({
      ...productData,
      barcode,
      supplierId,
      localSellerId,
      stockQty: createProductDto.stockQty || 1,
      status:
        (createProductDto.stockQty || 1) > 0
          ? ProductStatus.IN_STOCK
          : ProductStatus.OUT_OF_STOCK,
    });

    return this.productRepository.save(product);
  }

  async findAll(filterDto: ProductFilterDto) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      phoneType,
      status,
      condition,
      brandId,
      supplierId,
      imei,
      startDate,
      endDate,
    } = filterDto;

    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.supplier', 'supplier')
      .leftJoinAndSelect('product.localSeller', 'localSeller')
      .leftJoinAndSelect('product.branch', 'branch');

    if (search) {
      queryBuilder.andWhere(
        '(product.title LIKE :search OR product.imei1 LIKE :search OR product.imei2 LIKE :search OR product.barcode LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (phoneType) {
      queryBuilder.andWhere('product.phoneType = :phoneType', { phoneType });
    }

    if (status) {
      queryBuilder.andWhere('product.status = :status', { status });
    }

    if (condition) {
      queryBuilder.andWhere('product.condition = :condition', { condition });
    }

    if (brandId) {
      queryBuilder.andWhere('product.brandId = :brandId', { brandId });
    }

    if (supplierId) {
      queryBuilder.andWhere('product.supplierId = :supplierId', { supplierId });
    }

    if (imei) {
      queryBuilder.andWhere(
        '(product.imei1 = :imei OR product.imei2 = :imei)',
        { imei },
      );
    }

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'product.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    queryBuilder.orderBy('product.createdAt', 'DESC').skip(skip).take(limit);

    const [products, total] = await queryBuilder.getManyAndCount();

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'supplier', 'localSeller', 'branch', 'damages'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findByImei(imei: string) {
    const product = await this.productRepository.findOne({
      where: [{ imei1: imei }, { imei2: imei }],
      relations: ['brand', 'supplier', 'localSeller'],
    });

    return product;
  }

  async findByBarcode(barcode: string) {
    const product = await this.productRepository.findOne({
      where: { barcode },
      relations: ['brand', 'supplier', 'localSeller'],
    });

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);

    if (updateProductDto.stockQty !== undefined) {
      product.status =
        updateProductDto.stockQty > 0
          ? ProductStatus.IN_STOCK
          : ProductStatus.OUT_OF_STOCK;
    }

    return this.productRepository.save(product);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.productRepository.softDelete(id);
    return { message: 'Product deleted successfully' };
  }

  async getSummary() {
    const totalProducts = await this.productRepository.count();
    const totalStockQty = (await this.productRepository
      .createQueryBuilder('product')
      .select('SUM(product.stockQty)', 'total')
      .getRawOne()) as {
      total?: string | null;
    } | null;

    const lowStockItems = await this.productRepository
      .createQueryBuilder('product')
      .where('product.stockQty <= product.lowStockAlertQty')
      .andWhere('product.lowStockAlertQty IS NOT NULL')
      .getCount();

    const outOfStockItems = await this.productRepository.count({
      where: { status: ProductStatus.OUT_OF_STOCK },
    });

    return {
      totalProducts,
      totalStockQty: parseInt(String(totalStockQty?.total || '0')),
      lowStockItems,
      outOfStockItems,
    };
  }

  async createDamage(createDamageDto: CreateDamageDto, userId: string) {
    const product = await this.findOne(createDamageDto.productId);

    const damage = this.damageRepository.create({
      ...createDamageDto,
      reportedById: userId,
    });

    product.status = ProductStatus.DAMAGED;
    await this.productRepository.save(product);

    return this.damageRepository.save(damage);
  }

  async findAllDamages(productId?: string) {
    const where = productId ? { productId } : {};
    return this.damageRepository.find({
      where,
      relations: ['product', 'reportedBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateDamage(
    id: string,
    updateData: Partial<CreateDamageDto> & { isReturned?: boolean },
  ) {
    const damage = await this.damageRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!damage) {
      throw new NotFoundException('Damage record not found');
    }

    Object.assign(damage, updateData);
    return this.damageRepository.save(damage);
  }

  async generateBarcodeImage(
    barcode: string,
    format: 'png' | 'svg' = 'png',
  ): Promise<Buffer | string> {
    try {
      if (format === 'png') {
        return await generateBarcodeImage(barcode);
      } else {
        return generateBarcodeSVG(barcode);
      }
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : 'Failed to generate barcode',
      );
    }
  }
}
