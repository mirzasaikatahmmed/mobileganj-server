import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { databaseConfig, jwtConfig, appConfig, s3Config } from './config';
import { JwtAuthGuard } from './common/guards';
import { AppController } from './app.controller';

import * as entities from './database/entities';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BranchesModule } from './modules/branches/branches.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { InvestmentsModule } from './modules/investments/investments.module';
import { ServicingModule } from './modules/servicing/servicing.module';
import { OverseasTrackingModule } from './modules/overseas-tracking/overseas-tracking.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PublicModule } from './modules/public/public.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PreOrdersModule } from './modules/pre-orders/pre-orders.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ProductSettingsModule } from './modules/product-settings/product-settings.module';
import { StockTransferModule } from './modules/stock-transfer/stock-transfer.module';
import { InvoiceSettingsModule } from './modules/invoice-settings/invoice-settings.module';
import { SaleReturnsModule } from './modules/sale-returns/sale-returns.module';
import { CustomerTypesModule } from './modules/customer-types/customer-types.module';
import { CustomerGroupsModule } from './modules/customer-groups/customer-groups.module';
import { SeedModule } from './database/seeds';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig, s3Config],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: Object.values(entities),
        synchronize: configService.get<boolean>('database.synchronize'),
        logging: false,
        charset: 'utf8mb4',
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    BranchesModule,
    CategoriesModule,
    ProductsModule,
    SalesModule,
    CustomersModule,
    SuppliersModule,
    ExpensesModule,
    InvestmentsModule,
    ServicingModule,
    OverseasTrackingModule,
    DashboardModule,
    PublicModule,
    ReportsModule,
    PreOrdersModule,
    SettingsModule,
    ProductSettingsModule,
    StockTransferModule,
    InvoiceSettingsModule,
    SaleReturnsModule,
    CustomerTypesModule,
    CustomerGroupsModule,
    SeedModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
