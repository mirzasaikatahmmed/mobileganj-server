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
  Branch,
  LocalSeller,
  ProductDamage,
  ProductImage,
  SaleItem,
  StockTransferItem,
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
  StockTransferStatus,
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
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
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

  async updateBrand(id: string, updateBrandDto: CreateBrandDto) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    Object.assign(brand, updateBrandDto);
    return this.brandRepository.save(brand);
  }

  async deleteBrand(id: string) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    await this.brandRepository.softDelete(id);
    return { message: 'Brand deleted successfully' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createProductDto: CreateProductDto, _userId: string) {
    const {
      localSellerInfo,
      supplierName,
      supplierPhone,
      images,
      ...productData
    } = createProductDto;

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

    let barcode = createProductDto.barcode;
    if (barcode) {
      const existing = await this.productRepository.findOne({
        where: { barcode },
      });
      if (existing) {
        throw new BadRequestException(`Barcode "${barcode}" already exists`);
      }
    } else {
      barcode = generateBarcode(
        createProductDto.category === ProductCategory.PHONE ? 'PH' : 'AC',
      );
    }

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

    const savedProduct = await this.productRepository.save(product);

    // Save gallery images
    if (images && images.length > 0) {
      const imageEntities = images.map((url, index) =>
        this.productImageRepository.create({
          productId: savedProduct.id,
          url,
          isPrimary: index === 0,
          sortOrder: index,
        }),
      );
      await this.productImageRepository.save(imageEntities);
      // Set cover photo to the first image
      savedProduct.photo = images[0];
      await this.productRepository.save(savedProduct);
    }

    return savedProduct;
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
      branchId,
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
      .leftJoinAndSelect('product.branch', 'branch')
      .leftJoinAndSelect('product.images', 'images');

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

    if (branchId) {
      queryBuilder.andWhere('product.branchId = :branchId', { branchId });
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
      relations: [
        'brand',
        'supplier',
        'localSeller',
        'branch',
        'damages',
        'images',
      ],
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

    if (
      updateProductDto.barcode &&
      updateProductDto.barcode !== product.barcode
    ) {
      const existing = await this.productRepository.findOne({
        where: { barcode: updateProductDto.barcode },
      });
      if (existing) {
        throw new BadRequestException(
          `Barcode "${updateProductDto.barcode}" already exists`,
        );
      }
    }

    const {
      localSellerInfo,
      images,
      brandId,
      supplierId,
      branchId,
      ...productData
    } = updateProductDto;

    Object.assign(product, productData);

    if (brandId !== undefined) {
      product.brandId = brandId;
      product.brand = undefined as unknown as Brand;
    }

    if (supplierId !== undefined) {
      product.supplierId = supplierId;
      product.supplier = undefined as unknown as Supplier;
    }

    if (branchId !== undefined) {
      product.branchId = branchId;
      product.branch = undefined as unknown as Branch;
    }

    if (updateProductDto.stockQty !== undefined) {
      product.status =
        updateProductDto.stockQty > 0
          ? ProductStatus.IN_STOCK
          : ProductStatus.OUT_OF_STOCK;
    }

    if (localSellerInfo) {
      if (product.localSellerId) {
        const seller = await this.localSellerRepository.findOne({
          where: { id: product.localSellerId },
        });
        if (seller) {
          Object.assign(seller, localSellerInfo);
          await this.localSellerRepository.save(seller);
        }
      } else {
        const seller = this.localSellerRepository.create(localSellerInfo);
        const savedSeller = await this.localSellerRepository.save(seller);
        product.localSellerId = savedSeller.id;
        product.localSeller = undefined as unknown as LocalSeller;
      }
    }

    // Update gallery images if provided
    if (images !== undefined) {
      // Remove all existing images
      await this.productImageRepository.delete({ productId: id });

      if (images.length > 0) {
        const imageEntities = images.map((url, index) =>
          this.productImageRepository.create({
            productId: id,
            url,
            isPrimary: index === 0,
            sortOrder: index,
          }),
        );
        const savedImages =
          await this.productImageRepository.save(imageEntities);
        product.images = savedImages;
        // Update the cover photo to the first image
        product.photo = images[0];
      } else {
        product.images = [];
        // All images removed - clear cover photo
        product.photo = '';
      }
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

    if (updateData.isReturned && !damage.isReturned) {
      damage.isReturned = true;
      damage.returnDate = new Date();
      if (damage.product) {
        damage.product.status =
          damage.product.stockQty > 0
            ? ProductStatus.IN_STOCK
            : ProductStatus.OUT_OF_STOCK;
        await this.productRepository.save(damage.product);
      }
    }

    const rest = { ...updateData };
    delete rest.isReturned;
    Object.assign(damage, rest);

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

  async getPerformance() {
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.saleItems', 'saleItem')
      .select('product.id', 'id')
      .addSelect('product.title', 'product')
      .addSelect('product.category', 'category')
      .addSelect('product.stockQty', 'totalStock')
      .addSelect('COALESCE(SUM(saleItem.quantity), 0)', 'sold')
      .addSelect('COALESCE(SUM(saleItem.totalPrice), 0)', 'revenue')
      .addSelect(
        'COALESCE(SUM(saleItem.totalPrice - product.purchasePrice * saleItem.quantity), 0)',
        'profit',
      )
      .addSelect('product.sellingPrice', 'avgPrice')
      .groupBy('product.id')
      .orderBy('revenue', 'DESC');

    interface PerformanceRaw {
      id: string;
      product: string;
      category: string;
      totalStock: string | number;
      sold: string | number;
      revenue: string | number;
      profit: string | number;
      avgPrice: string | number;
    }

    const result = await qb.getRawMany<PerformanceRaw>();

    return result.map((row) => ({
      id: row.id,
      product: row.product,
      category: row.category,
      totalStock: parseInt(String(row.totalStock || '0'), 10),
      sold: parseInt(String(row.sold || '0'), 10),
      revenue: parseFloat(String(row.revenue || '0')),
      profit: parseFloat(String(row.profit || '0')),
      avgPrice: parseFloat(String(row.avgPrice || '0')),
    }));
  }

  async getProductLedger(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const ledger: Array<{
      id: string;
      date: string;
      product: string;
      type: string;
      quantity: number;
      balance: number;
      reference: string;
      branch: string;
      user: string;
    }> = [];

    // 1. Initial purchase/opening stock
    ledger.push({
      id: `INIT-${product.id.substring(0, 6)}`,
      date: new Date(product.createdAt).toISOString().split('T')[0],
      product: product.title,
      type: 'Purchase',
      quantity: product.stockQty,
      balance: product.stockQty,
      reference: product.invoiceReference || 'Opening Stock',
      branch: product.branch?.name || 'Main Branch',
      user:
        product.supplier?.name || product.localSeller?.fullName || 'Supplier',
    });

    // 2. Sales
    const saleItemRepo = this.productRepository.manager.getRepository(SaleItem);
    const saleItems = await saleItemRepo.find({
      where: { productId: id },
      relations: ['sale', 'sale.createdBy', 'sale.branch'],
    });

    for (const item of saleItems) {
      ledger.push({
        id: `SALE-${item.id.substring(0, 6)}`,
        date: new Date(item.sale.saleDate).toISOString().split('T')[0],
        product: product.title,
        type: 'Sale',
        quantity: -item.quantity,
        balance: 0,
        reference: item.sale.invoiceNo,
        branch: item.sale.branch?.name || 'Main Branch',
        user: item.sale.createdBy?.name || 'Staff',
      });
    }

    // 3. Damages
    const damages = await this.damageRepository.find({
      where: { productId: id },
      relations: ['reportedBy'],
    });

    for (const damage of damages) {
      ledger.push({
        id: `DMG-${damage.id.substring(0, 6)}`,
        date: new Date(damage.damageDate).toISOString().split('T')[0],
        product: product.title,
        type: 'Damage',
        quantity: -1,
        balance: 0,
        reference: 'DMG-REPORT',
        branch: product.branch?.name || 'Main Branch',
        user: damage.reportedBy?.name || 'Staff',
      });
    }

    // 4. Transfers
    const transferItemRepo =
      this.productRepository.manager.getRepository(StockTransferItem);
    const transferItems = await transferItemRepo.find({
      where: { productId: id },
      relations: [
        'transfer',
        'transfer.fromBranch',
        'transfer.toBranch',
        'transfer.createdBy',
      ],
    });

    for (const item of transferItems) {
      if (item.transfer.status !== StockTransferStatus.APPROVED) continue;
      const isOut = item.transfer.fromBranchId === product.branchId;
      ledger.push({
        id: `TRF-${item.id.substring(0, 6)}`,
        date: new Date(item.transfer.createdAt).toISOString().split('T')[0],
        product: product.title,
        type: isOut ? 'Transfer Out' : 'Transfer In',
        quantity: isOut ? -item.quantity : item.quantity,
        balance: 0,
        reference: item.transfer.transferNo,
        branch: isOut
          ? item.transfer.fromBranch?.name || 'Main Branch'
          : item.transfer.toBranch?.name || 'Main Branch',
        user: item.transfer.createdBy?.name || 'Staff',
      });
    }

    // Sort by date ascending to calculate running balance correctly
    ledger.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    let runningBalance = 0;
    for (const entry of ledger) {
      runningBalance += entry.quantity;
      entry.balance = runningBalance;
    }

    // Sort descending for display (latest first)
    ledger.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return ledger;
  }
}
