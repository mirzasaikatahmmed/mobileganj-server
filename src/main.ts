import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { seedSuperAdmin } from './database/seeders/superadmin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialize SuperAdmin on app startup
  try {
    const dataSource = app.get(DataSource);
    // Wait for connection to be established
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    await seedSuperAdmin(dataSource);
  } catch (error) {
    console.error('Error seeding SuperAdmin:', error);
  }

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mobile GANJ API')
    .setDescription(
      `
## Mobile GANJ - Complete Mobile Shop Management System

### Features:
- **Dashboard** - Analytics, filters, summary cards
- **Products** - Phones (Overseas/Local), Accessories, Damage tracking
- **Sales** - Invoicing, cart system, payments, due management
- **Customers** - Auto-add, due tracking, collection
- **Suppliers** - Overseas suppliers, Local sellers
- **Expenses** - Categories (fixed/unfixed), tracking
- **Investments** - Investors, profit sharing, payouts
- **Mobile Servicing** - Jobs, parts (own/borrowed), due collection
- **Overseas Phone Tracking** - Carrier tracking, status timeline (Admin only)
- **Public API** - Shop, Pre-order, EMI calculator

### Authentication:
All endpoints (except Public API) require JWT authentication.
Use the \`/api/auth/login\` endpoint to get a token.

### Default Users:
- **SuperAdmin**: Automatically created on app startup (credentials in .env file)
- **Admin**: Create an admin user using database seeder or first registration
      `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Dashboard', 'Dashboard analytics')
    .addTag('Users', 'User management (Admin only)')
    .addTag('Branches', 'Branch management')
    .addTag('Products', 'Product management - Phones & Accessories')
    .addTag('Sales', 'Sales and invoicing')
    .addTag('Customers', 'Customer management and due collection')
    .addTag('Suppliers', 'Supplier and Local Seller management')
    .addTag('Expenses', 'Expense tracking')
    .addTag('Investments', 'Investor and payout management')
    .addTag('Mobile Servicing', 'Service job management')
    .addTag('Overseas Phone Tracking (Admin Only)', 'Carrier tracking system')
    .addTag('Public API (Landing Page)', 'Public endpoints for website')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   Mobile GANJ API Server is running!                      ║
  ║                                                           ║
  ║   API URL:     http://localhost:${port}/api                  ║
  ║   Swagger:     http://localhost:${port}/api/docs             ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
}
void bootstrap();
