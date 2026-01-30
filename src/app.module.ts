import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { databaseConfig, jwtConfig, appConfig } from './config';
import { JwtAuthGuard } from './common/guards';
import { AppController } from './app.controller';

import * as entities from './database/entities';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BranchesModule } from './modules/branches/branches.module';
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
import { SeedModule } from './database/seeds';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig],
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
        logging: configService.get<boolean>('database.logging'),
        charset: 'utf8mb4',
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    BranchesModule,
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
    SeedModule,
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
