# Mobileganj API Documentation

**Base URL:** `http://localhost:3000/api`  
**Interactive Docs (Swagger):** `http://localhost:3000/api/docs`  
**Version:** 1.0.0

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Users](#2-users)
3. [Branches](#3-branches)
4. [Products & Inventory](#4-products--inventory)
5. [Sales](#5-sales)
6. [Customers](#6-customers)
7. [Suppliers](#7-suppliers)
8. [Expenses](#8-expenses)
9. [Mobile Servicing](#9-mobile-servicing)
10. [Investments](#10-investments)
11. [Overseas Phone Tracking](#11-overseas-phone-tracking)
12. [Stock Transfer](#12-stock-transfer)
13. [Pre-Orders (Admin)](#13-pre-orders-admin)
14. [Dashboard](#14-dashboard)
15. [Reports](#15-reports)
16. [Settings](#16-settings)
17. [Public API (Landing Page)](#17-public-api-landing-page)

---

## Authentication

All protected endpoints require a **Bearer token** in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

Access tokens expire in **7 days**. Use the refresh endpoint to get new tokens.

### Roles

| Role | Description |
|------|-------------|
| `superadmin` | Full system access |
| `admin` | Admin panel access |
| `staff` | Limited operational access |
| `user` | Public user (customer portal) |

---

## 1. Authentication

**Base path:** `/auth`

---

### POST `/auth/login`

Login with email and password.

**Auth required:** No

**Request body:**
```json
{
  "email": "superadmin@mobileganj.com",
  "password": "superadmin123"
}
```

**Response `200`:**
```json
{
  "user": {
    "id": "uuid",
    "name": "Super Admin",
    "email": "superadmin@mobileganj.com",
    "role": "superadmin",
    "phone": "01700000001"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error `401`:** Invalid credentials

---

### POST `/auth/register`

Register a new staff/admin user. **Admin only.**

**Auth required:** Yes (admin)

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@mobileganj.com",
  "password": "password123",
  "phone": "01712345678",
  "role": "staff"
}
```

**Response `201`:** Created user object

---

### POST `/auth/register/user`

Public self-registration for customer accounts.

**Auth required:** No

**Request body:**
```json
{
  "name": "Customer Name",
  "email": "customer@email.com",
  "password": "password123",
  "phone": "01712345678"
}
```

**Response `201`:**
```json
{
  "user": { "id": "uuid", "role": "user", ... },
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### GET `/auth/profile`

Get the currently authenticated user's profile.

**Auth required:** Yes

**Response `200`:** User object with role and branch info

---

### POST `/auth/change-password`

Change the current user's password.

**Auth required:** Yes

**Request body:**
```json
{
  "oldPassword": "currentPassword",
  "newPassword": "newPassword123"
}
```

**Response `200`:** `{ "message": "Password changed successfully" }`

---

### POST `/auth/refresh`

Get a new access token using a refresh token.

**Auth required:** No

**Request body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response `200`:**
```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### POST `/auth/logout`

Logout and revoke the refresh token.

**Auth required:** Yes

**Request body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response `200`:** `{ "message": "Logged out successfully" }`

---

## 2. Users

**Base path:** `/users`  
**Auth required:** Yes (admin only — all endpoints)

---

### POST `/users`

Create a new user account.

**Request body:**
```json
{
  "name": "Staff Member",
  "email": "staff@mobileganj.com",
  "password": "password123",
  "phone": "01712345678",
  "role": "staff",
  "branchId": "uuid"
}
```

**Response `201`:** Created user object

---

### GET `/users`

Get paginated list of all users.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

**Response `200`:**
```json
{
  "data": [ ...users ],
  "meta": { "total": 50, "page": 1, "limit": 10, "totalPages": 5 }
}
```

---

### GET `/users/:id`

Get a user by ID.

**Response `200`:** User object  
**Response `404`:** User not found

---

### PATCH `/users/:id`

Update a user's details.

**Request body:** Partial user fields (`name`, `email`, `phone`, `role`, `branchId`)

**Response `200`:** Updated user object

---

### DELETE `/users/:id`

Soft-delete a user.

**Response `200`:** `{ "message": "User deleted successfully" }`

---

## 3. Branches

**Base path:** `/branches`  
**Auth required:** Yes

---

### POST `/branches`

Create a new branch. **Admin only.**

**Request body:**
```json
{
  "name": "Main Branch",
  "address": "Mobileganj, Madaripur",
  "phone": "01712345678",
  "isMain": true
}
```

**Response `201`:** Created branch object

---

### GET `/branches`

Get all branches.

**Response `200`:** Array of branch objects

---

### GET `/branches/:id`

Get a branch by ID.

**Response `200`:** Branch object  
**Response `404`:** Branch not found

---

### PATCH `/branches/:id`

Update a branch. **Admin only.**

**Request body:** Partial branch fields

**Response `200`:** Updated branch object

---

### DELETE `/branches/:id`

Delete a branch. **Admin only.**

**Response `200`:** Success message

---

## 4. Products & Inventory

**Base path:** `/products`  
**Auth required:** Yes

---

### POST `/products/brands`

Create a new phone/product brand.

**Request body:**
```json
{
  "name": "Apple",
  "logo": "https://example.com/logo.png"
}
```

**Response `201`:** Created brand object

---

### GET `/products/brands`

Get all brands.

**Response `200`:** Array of brand objects

---

### POST `/products`

Add a new product to stock (Stock In).

**Request body:**
```json
{
  "name": "iPhone 15 Pro",
  "category": "phone",
  "brandId": "uuid",
  "model": "iPhone 15 Pro",
  "color": "Natural Titanium",
  "storage": "256GB",
  "ram": "8GB",
  "imei": "123456789012345",
  "imei2": "123456789012346",
  "barcode": "BAR123456",
  "purchasePrice": 120000,
  "sellingPrice": 145000,
  "condition": "brand_new",
  "phoneType": "overseas",
  "region": "usa",
  "supplierId": "uuid",
  "branchId": "uuid",
  "note": "Optional note"
}
```

**Response `201`:** Created product object

---

### GET `/products`

Get paginated list of products with filters.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `category` | string | `phone` \| `accessories` |
| `status` | string | `in_stock` \| `out_of_stock` \| `sold` \| `damaged` |
| `brandId` | string | Filter by brand |
| `branchId` | string | Filter by branch |
| `search` | string | Search by name, IMEI, barcode |
| `startDate` | string | Filter by stock-in date (YYYY-MM-DD) |
| `endDate` | string | Filter by stock-in date (YYYY-MM-DD) |

**Response `200`:**
```json
{
  "data": [ ...products ],
  "meta": { "total": 100, "page": 1, "limit": 10, "totalPages": 10 }
}
```

---

### GET `/products/summary`

Get inventory summary statistics.

**Response `200`:**
```json
{
  "totalProducts": 200,
  "inStock": 150,
  "sold": 45,
  "damaged": 5,
  "totalPurchaseValue": 18000000,
  "totalSellingValue": 21750000
}
```

---

### GET `/products/search/imei/:imei`

Find a product by IMEI number.

**Response `200`:** Product object  
**Response `404`:** Product not found

---

### GET `/products/search/barcode/:barcode`

Find a product by barcode.

**Response `200`:** Product object  
**Response `404`:** Product not found

---

### GET `/products/barcode/generate`

Generate a barcode image for a given value.

**Query params:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `value` | string | Yes | Barcode value |
| `format` | string | No | `png` (default) or `svg` |

**Response `200`:** Image binary (`image/png` or `image/svg+xml`)

---

### GET `/products/:id`

Get a product by ID with full details.

**Response `200`:** Product object  
**Response `404`:** Product not found

---

### PATCH `/products/:id`

Update product details.

**Request body:** Partial product fields

**Response `200`:** Updated product object

---

### DELETE `/products/:id`

Delete a product. **Admin only.**

**Response `200`:** Success message

---

### POST `/products/damages`

Report a product as damaged.

**Request body:**
```json
{
  "productId": "uuid",
  "reason": "Screen cracked during handling",
  "repairCost": 5000,
  "note": "Sent for repair"
}
```

**Response `201`:** Damage report object

---

### GET `/products/damages/all`

Get all damage reports.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `productId` | string | Filter by product ID |

**Response `200`:** Array of damage reports

---

### PATCH `/products/damages/:id`

Update a damage report.

**Request body:** Partial damage report fields

**Response `200`:** Updated damage report

---

## 5. Sales

**Base path:** `/sales`  
**Auth required:** Yes

---

### POST `/sales`

Create a new sale / generate invoice.

**Request body:**
```json
{
  "customerId": "uuid",
  "branchId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "quantity": 1,
      "sellingPrice": 145000,
      "discount": 5000
    }
  ],
  "totalAmount": 140000,
  "paidAmount": 100000,
  "paymentMethod": "cash",
  "isEmi": false,
  "note": "Optional note"
}
```

**Response `201`:** Sale object with generated invoice number

---

### GET `/sales`

Get paginated list of sales with filters.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `branchId` | string | Filter by branch |
| `customerId` | string | Filter by customer |
| `startDate` | string | Start date (YYYY-MM-DD) |
| `endDate` | string | End date (YYYY-MM-DD) |
| `paymentStatus` | string | `paid` \| `partial_paid` \| `due` |

**Response `200`:** Paginated sales list

---

### GET `/sales/recent`

Get recent sales.

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | 10 | Number of records |

**Response `200`:** Array of recent sales

---

### GET `/sales/due-list`

Get sales with outstanding dues.

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | 10 | Number of records |

**Response `200`:** Array of due sales

---

### GET `/sales/invoice/:invoiceNo`

Get a sale by invoice number (e.g. `INV-20260425-001`).

**Response `200`:** Full sale object with items and customer  
**Response `404`:** Sale not found

---

### GET `/sales/:id`

Get a sale by ID.

**Response `200`:** Full sale object  
**Response `404`:** Sale not found

---

## 6. Customers

**Base path:** `/customers`  
**Auth required:** Yes

---

### POST `/customers`

Create a new customer.

**Request body:**
```json
{
  "name": "Customer Name",
  "phone": "01712345678",
  "email": "customer@email.com",
  "address": "Dhaka, Bangladesh"
}
```

**Response `201`:** Created customer object

---

### GET `/customers`

Get paginated list of customers.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `search` | string | Search by name or phone |
| `dueOnly` | boolean | Show only customers with due |

**Response `200`:** Paginated customer list

---

### GET `/customers/search/phone/:phone`

Find a customer by phone number.

**Response `200`:** Customer object  
**Response `404`:** Customer not found

---

### GET `/customers/:id`

Get customer details with sales history and due amount.

**Response `200`:** Customer object with `sales`, `totalPurchase`, `totalPaid`, `totalDue`

---

### PATCH `/customers/:id`

Update customer information.

**Request body:** Partial customer fields

**Response `200`:** Updated customer object

---

### POST `/customers/due-collection`

Collect a due payment from a customer.

**Request body:**
```json
{
  "customerId": "uuid",
  "saleId": "uuid",
  "amount": 40000,
  "paymentMethod": "bkash",
  "collectionDate": "2026-04-25",
  "note": "Optional note"
}
```

**Response `200`:** Due collection record

---

### GET `/customers/due-collection/history`

Get due collection history.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `customerId` | string | Filter by customer |

**Response `200`:** Array of due collection records

---

## 7. Suppliers

**Base path:** `/suppliers`  
**Auth required:** Yes

---

### POST `/suppliers`

Create a new supplier.

**Request body:**
```json
{
  "name": "Supplier Name",
  "phone": "01712345678",
  "email": "supplier@email.com",
  "address": "Dhaka, Bangladesh",
  "isLocalSeller": false,
  "nidNumber": "1234567890",
  "nidPhoto": "url-to-photo"
}
```

**Response `201`:** Created supplier object

---

### GET `/suppliers`

Get paginated list of suppliers.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `search` | string | Search by name or phone |
| `dueOnly` | boolean | Show only suppliers with due |

**Response `200`:** Paginated supplier list with due amounts

---

### GET `/suppliers/local-sellers`

Get all local sellers (phone resellers).

**Query params:** `page`, `limit`, `search`

**Response `200`:** Paginated local seller list

---

### GET `/suppliers/local-sellers/:id`

Get local seller details including NID info. **Admin only.**

**Response `200`:** Full local seller details  
**Response `404`:** Seller not found

---

### GET `/suppliers/:id`

Get supplier by ID with payment history.

**Response `200`:** Supplier object  
**Response `404`:** Supplier not found

---

### POST `/suppliers/:id/payment`

Make a payment to a supplier.

**Request body:**
```json
{
  "amount": 50000,
  "paymentMethod": "bank",
  "paymentDate": "2026-04-25",
  "note": "Partial payment"
}
```

**Response `200`:** Payment record

---

## 8. Expenses

**Base path:** `/expenses`  
**Auth required:** Yes

---

### POST `/expenses/categories`

Create an expense category. **Admin only.**

**Request body:**
```json
{
  "name": "Rent",
  "type": "fixed",
  "monthlyAmount": 15000,
  "description": "Shop rent"
}
```

**Response `201`:** Created category object

---

### GET `/expenses/categories`

Get all expense categories.

**Response `200`:** Array of categories

---

### POST `/expenses/categories/seed`

Seed default expense categories (Rent, Salary, Electricity, Internet, etc.).

**Response `200`:** Success message

---

### POST `/expenses`

Add a new expense entry.

**Request body:**
```json
{
  "categoryId": "uuid",
  "amount": 15000,
  "paymentMethod": "cash",
  "expenseDate": "2026-04-25",
  "description": "April rent payment",
  "note": "Optional"
}
```

**Response `201`:** Created expense object

---

### GET `/expenses`

Get paginated list of expenses with filters.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `startDate` | string | Start date (YYYY-MM-DD) |
| `endDate` | string | End date (YYYY-MM-DD) |
| `categoryId` | string | Filter by category |
| `paymentMethod` | string | `cash` \| `bkash` \| `nagad` \| `bank` |

**Response `200`:** Paginated expenses list

---

### GET `/expenses/summary`

Get expense summary for a date range.

**Query params:** `startDate`, `endDate`

**Response `200`:**
```json
{
  "totalExpenses": 45000,
  "byCategory": [
    { "categoryName": "Rent", "total": 15000 },
    { "categoryName": "Salary", "total": 30000 }
  ]
}
```

---

### GET `/expenses/unlogged-fixed`

Get fixed expenses that have not been logged yet for the current month.

**Response `200`:** Array of unlogged fixed expense categories

---

### GET `/expenses/:id`

Get an expense by ID.

**Response `200`:** Expense object  
**Response `404`:** Expense not found

---

### PATCH `/expenses/:id`

Update an expense. Admins can edit any; staff can only edit their own.

**Request body:** Partial expense fields

**Response `200`:** Updated expense object

---

### DELETE `/expenses/:id`

Delete an expense. **Admin only.**

**Response `200`:** Success message

---

## 9. Mobile Servicing

**Base path:** `/servicing`  
**Auth required:** Yes

---

### POST `/servicing/jobs`

Create a new service/repair job.

**Request body:**
```json
{
  "customerName": "Customer Name",
  "customerPhone": "01712345678",
  "deviceName": "Samsung Galaxy S23",
  "problem": "Screen cracked, touch not working",
  "serviceType": "hardware",
  "estimatedCost": 8000,
  "advancePaid": 2000,
  "paymentMethod": "cash",
  "technicianName": "Tech Name",
  "warrantyDays": 30,
  "note": "Handle with care"
}
```

**Response `201`:** Service job object with generated job number

---

### GET `/servicing/jobs`

Get paginated list of service jobs.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `status` | string | `pending` \| `working` \| `ready` \| `delivered` \| `cancelled` |
| `technicianName` | string | Filter by technician |
| `dueOnly` | boolean | Show only jobs with due amount |
| `startDate` | string | Start date (YYYY-MM-DD) |
| `endDate` | string | End date (YYYY-MM-DD) |

**Response `200`:** Paginated service jobs list

---

### GET `/servicing/jobs/summary`

Get service department summary.

**Response `200`:**
```json
{
  "total": 120,
  "pending": 15,
  "working": 20,
  "ready": 8,
  "delivered": 75,
  "cancelled": 2,
  "totalRevenue": 480000,
  "totalDue": 32000
}
```

---

### GET `/servicing/jobs/:id`

Get a service job by ID.

**Response `200`:** Full service job details  
**Response `404`:** Job not found

---

### PATCH `/servicing/jobs/:id/status`

Update the status of a service job.

**Request body:**
```json
{
  "status": "ready"
}
```

Status values: `pending` → `working` → `ready` → `delivered` | `cancelled`

**Response `200`:** Updated service job

---

### POST `/servicing/jobs/:id/due-collection`

Collect remaining due payment for a service job.

**Request body:**
```json
{
  "amount": 6000,
  "paymentMethod": "bkash",
  "note": "Final payment on delivery"
}
```

**Response `200`:** Updated job with new due amount

---

## 10. Investments

**Base path:** `/investments`  
**Auth required:** Yes

---

### POST `/investments/investors`

Add a new investor.

**Request body:**
```json
{
  "name": "Investor Name",
  "phone": "01712345678",
  "address": "Dhaka",
  "investmentAmount": 500000,
  "investmentDate": "2026-01-01",
  "investmentType": "fixed_profit",
  "monthlyProfitAmount": 5000,
  "payoutMethod": "monthly",
  "totalInstallmentCount": 24,
  "note": "2 year contract"
}
```

Investment types:
- `fixed_profit` — fixed monthly profit amount
- `profit_share` — percentage of shop profit

**Response `201`:** Created investor object

---

### GET `/investments/investors`

Get paginated list of investors.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `search` | string | Search by name or phone |
| `status` | string | `active` \| `closed` |

**Response `200`:** Paginated investors list with `totalProfitPaid` and `remainingPayable`

---

### GET `/investments/investors/:id`

Get investor details with payout history.

**Response `200`:** Investor with `payouts`, `totalProfitPaid`, `remainingPayable`

---

### POST `/investments/payouts`

Make a profit payout to an investor.

**Request body:**
```json
{
  "investorId": "uuid",
  "amount": 5000,
  "paymentMethod": "bkash",
  "paymentDate": "2026-04-25",
  "note": "April profit"
}
```

**Response `201`:** Payout record

---

### GET `/investments/payouts`

Get payout history.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `investorId` | string | Filter by investor |

**Response `200`:** Array of payout records

---

## 11. Overseas Phone Tracking

**Base path:** `/overseas-tracking`  
**Auth required:** Yes (admin only — all endpoints)

---

### POST `/overseas-tracking/carriers`

Create a new shipping carrier.

**Request body:**
```json
{
  "name": "Carrier Name",
  "phone": "01712345678",
  "country": "Dubai",
  "contractType": "per_phone",
  "ratePerPhone": 2000,
  "fixedMonthlyRate": null
}
```

**Response `201`:** Created carrier object

---

### GET `/overseas-tracking/carriers`

Get all carriers.

**Response `200`:** Array of carrier objects

---

### POST `/overseas-tracking`

Add a new overseas phone shipment entry.

**Request body:**
```json
{
  "phoneName": "iPhone 15 Pro Max",
  "model": "A3293",
  "color": "Desert Titanium",
  "storage": "512GB",
  "purchasePrice": 120000,
  "carrierId": "uuid",
  "sourceType": "dubai",
  "purchaseDate": "2026-03-01",
  "note": "Ordered from supplier"
}
```

**Response `201`:** Tracking entry object

---

### GET `/overseas-tracking`

Get paginated list of overseas phone trackings.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `status` | string | `purchased` \| `sent_to_carrier` \| `with_carrier` \| `returned_from_carrier` \| `delivered` \| `cancelled` |
| `carrierId` | string | Filter by carrier |
| `sourceType` | string | `dubai` \| `supplier` |
| `startDate` | string | Start date (YYYY-MM-DD) |
| `endDate` | string | End date (YYYY-MM-DD) |

**Response `200`:** Paginated tracking list

---

### GET `/overseas-tracking/summary`

Get tracking summary and carrier breakdown.

**Response `200`:**
```json
{
  "total": 50,
  "byStatus": { "purchased": 5, "with_carrier": 10, "delivered": 30, ... },
  "byCarrier": [ { "carrierName": "Carrier", "count": 15, "totalCost": 30000 } ]
}
```

---

### GET `/overseas-tracking/:id`

Get tracking details by ID.

**Response `200`:** Full tracking object with history  
**Response `404`:** Not found

---

### PATCH `/overseas-tracking/:id/status`

Update the status of an overseas phone.

**Request body:**
```json
{
  "status": "sent_to_carrier",
  "note": "Handed to carrier on 2026-04-20"
}
```

**Response `200`:** Updated tracking entry

---

### POST `/overseas-tracking/:id/add-to-stock`

Add a delivered overseas phone to the product inventory.

**Response `200`:** Created product in inventory

---

## 12. Stock Transfer

**Base path:** `/stock-transfers`  
**Auth required:** Yes

---

### POST `/stock-transfers`

Create a stock transfer request between branches.

**Request body:**
```json
{
  "fromBranchId": "uuid",
  "toBranchId": "uuid",
  "items": [
    { "productId": "uuid", "quantity": 1 }
  ],
  "note": "Transfer for display"
}
```

**Response `201`:** Transfer object with status `pending`

---

### GET `/stock-transfers`

Get paginated list of stock transfers.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `status` | string | `pending` \| `approved` \| `rejected` |
| `fromBranchId` | string | Filter by source branch |
| `toBranchId` | string | Filter by destination branch |

**Response `200`:** Paginated transfer list

---

### GET `/stock-transfers/:id`

Get stock transfer details.

**Response `200`:** Transfer with items, branches, and creator info  
**Response `404`:** Transfer not found

---

### PATCH `/stock-transfers/:id/approve`

Approve a stock transfer. Moves stock from source to destination branch. **Admin only.**

**Response `200`:** Transfer with status `approved`  
**Response `400`:** Transfer already processed or insufficient stock

---

### PATCH `/stock-transfers/:id/reject`

Reject a stock transfer. **Admin only.**

**Response `200`:** Transfer with status `rejected`

---

## 13. Pre-Orders (Admin)

**Base path:** `/pre-orders`  
**Auth required:** Yes

> Pre-orders are created via the public endpoint `POST /public/pre-order`. This module provides the admin management interface.

---

### GET `/pre-orders`

Get paginated list of all pre-orders.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `status` | string | `pending` \| `confirmed` \| `processing` \| `delivered` \| `cancelled` |
| `search` | string | Search by customer name or phone |
| `startDate` | string | Start date (YYYY-MM-DD) |
| `endDate` | string | End date (YYYY-MM-DD) |

**Response `200`:** Paginated pre-orders list

---

### GET `/pre-orders/summary`

Get pre-order statistics.

**Response `200`:**
```json
{
  "total": 45,
  "pending": 10,
  "confirmed": 15,
  "processing": 8,
  "delivered": 10,
  "cancelled": 2,
  "totalBookingAmount": 450000
}
```

---

### GET `/pre-orders/order/:orderNo`

Get a pre-order by order number (e.g. `PO-20260425-001`).

**Response `200`:** Pre-order details  
**Response `404`:** Pre-order not found

---

### GET `/pre-orders/:id`

Get a pre-order by ID.

**Response `200`:** Full pre-order details  
**Response `404`:** Pre-order not found

---

### PATCH `/pre-orders/:id/status`

Update a pre-order's status. **Admin only.**

**Request body:**
```json
{
  "status": "confirmed",
  "note": "Phone available, will deliver in 3 days"
}
```

**Response `200`:** Updated pre-order

---

## 14. Dashboard

**Base path:** `/dashboard`  
**Auth required:** Yes

---

### GET `/dashboard/stats`

Get dashboard statistics and KPIs.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `branchId` | string | Filter by branch |
| `dateFilter` | string | `today` \| `last_7_days` \| `this_month` \| `custom` |
| `startDate` | string | Required when `dateFilter=custom` |
| `endDate` | string | Required when `dateFilter=custom` |

**Response `200`:**
```json
{
  "totalSales": 250000,
  "totalExpenses": 45000,
  "netProfit": 205000,
  "totalDue": 35000,
  "totalProducts": 150,
  "totalCustomers": 80,
  "salesCount": 25,
  "serviceJobsCount": 12
}
```

---

### GET `/dashboard/recent-sales`

Get the most recent sales.

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | 10 | Number of records |

**Response `200`:** Array of recent sales with customer and amount info

---

### GET `/dashboard/due-list`

Get customers/sales with the highest outstanding dues.

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | 10 | Number of records |

**Response `200`:** Array of due records

---

## 15. Reports

**Base path:** `/reports`  
**Auth required:** Yes

All report endpoints support optional `startDate` and `endDate` query params (format: `YYYY-MM-DD`).

---

### GET `/reports/sales`

Sales report with daily breakdown.

**Query params:** `startDate`, `endDate`, `branchId`

**Response `200`:**
```json
{
  "summary": {
    "totalRevenue": 500000,
    "totalCOGS": 350000,
    "grossProfit": 150000,
    "totalSales": 35
  },
  "daily": [
    { "date": "2026-04-25", "revenue": 50000, "salesCount": 4 }
  ]
}
```

---

### GET `/reports/purchase`

Purchase report — products stocked in during the period.

**Query params:** `startDate`, `endDate`, `supplierId`

**Response `200`:**
```json
{
  "summary": { "totalProducts": 20, "totalCost": 2400000 },
  "items": [ ...product stock records ]
}
```

---

### GET `/reports/expense`

Expense report with category breakdown.

**Query params:** `startDate`, `endDate`, `categoryId`

**Response `200`:**
```json
{
  "summary": { "totalExpenses": 45000 },
  "byCategory": [ { "category": "Rent", "total": 15000, "count": 1 } ],
  "items": [ ...expense records ]
}
```

---

### GET `/reports/payment`

Payment collections report — sale payments and due collections combined.

**Query params:** `startDate`, `endDate`

**Response `200`:**
```json
{
  "summary": {
    "totalCash": 200000,
    "totalBkash": 50000,
    "totalNagad": 25000,
    "totalBank": 75000,
    "grandTotal": 350000
  },
  "items": [ ...payment records ]
}
```

---

### GET `/reports/profit-loss`

Profit and loss report.

**Query params:** `startDate`, `endDate`, `branchId`

**Response `200`:**
```json
{
  "revenue": 500000,
  "cogs": 350000,
  "grossProfit": 150000,
  "expenses": 45000,
  "netProfit": 105000,
  "profitMargin": 21
}
```

---

### GET `/reports/customer-due`

Customer due report — all customers with outstanding dues.

**Query params:** `search`

**Response `200`:**
```json
{
  "totalDue": 125000,
  "customers": [
    { "name": "Customer", "phone": "017...", "totalDue": 25000 }
  ]
}
```

---

### GET `/reports/supplier-due`

Supplier due report — all suppliers with outstanding balances.

**Query params:** `search`

**Response `200`:** Similar structure to customer due report

---

### GET `/reports/service`

Service/repair revenue and jobs report.

**Query params:** `startDate`, `endDate`

**Response `200`:**
```json
{
  "summary": {
    "totalJobs": 50,
    "totalRevenue": 400000,
    "totalDue": 15000,
    "completed": 45
  },
  "items": [ ...service job records ]
}
```

---

### GET `/reports/stock`

Current stock / inventory report.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | `in_stock` \| `sold` \| `damaged` |

**Response `200`:**
```json
{
  "summary": {
    "totalItems": 150,
    "totalPurchaseValue": 18000000,
    "totalSellingValue": 21750000,
    "potentialProfit": 3750000
  },
  "items": [ ...product records ]
}
```

---

### GET `/reports/day-book`

Daily transaction log — all inflows and outflows for a given date.

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `date` | string | today | Date (YYYY-MM-DD) |

**Response `200`:**
```json
{
  "date": "2026-04-25",
  "totalInflow": 150000,
  "totalOutflow": 45000,
  "netCash": 105000,
  "transactions": [
    { "type": "sale", "amount": 100000, "description": "Invoice INV-001" },
    { "type": "expense", "amount": 15000, "description": "Rent" }
  ]
}
```

---

### GET `/reports/balance-sheet`

Balance sheet — assets vs liabilities snapshot.

**Response `200`:**
```json
{
  "assets": {
    "stockValue": 18000000,
    "customerDues": 125000,
    "cash": 500000,
    "total": 18625000
  },
  "liabilities": {
    "supplierDues": 200000,
    "investorPayable": 120000,
    "total": 320000
  },
  "netWorth": 18305000
}
```

---

## 16. Settings

**Base path:** `/settings`  
**Auth required:** Yes (write operations: admin only)

Settings are stored per-section. Available section keys:

| Key | Description |
|-----|-------------|
| `store` | Shop name, address, phone, logo |
| `invoice` | Invoice prefix, footer text, show/hide fields |
| `emi` | EMI interest rate, available durations |
| `payment` | Accepted payment methods, bKash/Nagad numbers |
| `warranty` | Default warranty days, warranty text |
| `notification` | SMS/email notification toggles |
| `delivery` | Delivery areas and charges |
| `seo` | Meta title, description, keywords |
| `appearance` | Theme color, fonts |
| `security` | Session timeout, login attempts |
| `pos` | POS printer settings |
| `overseas` | Overseas phone tracking defaults |
| `social` | Facebook, Instagram, YouTube links |

---

### GET `/settings`

Get all settings as a flat object with all sections.

**Response `200`:**
```json
{
  "store": { "shopName": "Mobileganj", "address": "...", ... },
  "invoice": { "prefix": "INV", ... },
  "emi": { "interestRate": 2.5, ... }
}
```

---

### GET `/settings/:key`

Get a specific settings section.

**Example:** `GET /settings/store`

**Response `200`:**
```json
{
  "shopName": "Mobileganj",
  "address": "Mobileganj, Madaripur",
  "phone": "01700000001"
}
```

---

### PUT `/settings`

Replace all settings at once. **Admin only.**

**Request body:** Full settings object with all section keys

**Response `200`:** Updated settings object

---

### PATCH `/settings/:key`

Update a single settings section. **Admin only.**

**Example:** `PATCH /settings/store`

**Request body:**
```json
{
  "shopName": "Mobileganj Official",
  "phone": "01700000002"
}
```

**Response `200`:** Updated section values

---

### DELETE `/settings/reset`

Reset all settings to factory defaults. **Admin only.**

**Response `200`:** Default settings object

---

## 17. Public API (Landing Page)

**Base path:** `/public`  
**Auth required:** No — all endpoints are public

---

### GET `/public/brands`

Get all phone brands for filtering.

**Response `200`:** Array of brand objects

---

### GET `/public/shop`

Get all shop products with filters for the main shop page.

**Query params:**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number |
| `limit` | number | Items per page |
| `category` | string | `phone` \| `accessories` |
| `brandId` | string | Filter by brand |
| `condition` | string | `brand_new` \| `used` \| `like_new` |
| `minPrice` | number | Minimum selling price |
| `maxPrice` | number | Maximum selling price |
| `search` | string | Search by product name |

**Response `200`:** Paginated product list (in-stock items only)

---

### GET `/public/phones`

Get phones for the "Buy Phone" page.

**Query params:** `page`, `limit`, `brandId`, `condition`, `sort`

Sort values: `price_asc`, `price_desc`, `newest`

**Response `200`:** Paginated phones list

---

### GET `/public/accessories`

Get accessories.

**Query params:** `page`, `limit`, `accessoryType`, `minPrice`, `maxPrice`

Accessory types: `charger`, `earphone`, `cover`, `glass`, `power_bank`

**Response `200`:** Paginated accessories list

---

### GET `/public/pre-order`

Get products available for pre-order.

**Response `200`:** Array of pre-order product listings

---

### GET `/public/offers`

Get products currently on offer/discount.

**Response `200`:** Array of offer products

---

### GET `/public/featured`

Get featured products for homepage.

**Response `200`:** Array of featured products

---

### GET `/public/new-arrivals`

Get newest products in stock.

**Response `200`:** Array of new arrival products

---

### GET `/public/trending`

Get trending/best-selling products.

**Response `200`:** Array of trending products

---

### GET `/public/products/:id`

Get full product details for the product detail page.

**Response `200`:** Full product object  
**Response `404`:** Product not found

---

### GET `/public/emi-calculator`

Calculate EMI installment details.

**Query params:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `totalPrice` | number | Yes | Total product price |
| `downPayment` | number | Yes | Down payment amount |
| `duration` | number | Yes | `3`, `6`, `9`, or `12` months |
| `interestRate` | number | No | Annual interest rate % (uses default if omitted) |

**Response `200`:**
```json
{
  "totalPrice": 100000,
  "downPayment": 20000,
  "loanAmount": 80000,
  "duration": 6,
  "interestRate": 2.5,
  "monthlyInstallment": 14000,
  "totalPayable": 104000,
  "totalInterest": 4000
}
```

---

### POST `/public/pre-order`

Submit a pre-order from the landing page.

**Request body:**
```json
{
  "customerName": "John Doe",
  "customerPhone": "01712345678",
  "customerAddress": "Dhaka, Bangladesh",
  "productId": "uuid",
  "productName": "iPhone 16 Pro Max",
  "variantDetails": "256GB, Desert Titanium",
  "totalPrice": 160000,
  "isEmi": true,
  "emiDuration": 6,
  "downPayment": 40000,
  "emiInterestRate": 2.5,
  "bookingAmount": 10000,
  "paymentMethod": "bkash",
  "note": "Need by Eid"
}
```

Required fields: `customerName`, `customerPhone`, `productName`, `totalPrice`, `bookingAmount`

**Response `201`:** Pre-order object with generated order number

---

## Enums Reference

### UserRole
`superadmin` | `admin` | `staff` | `user`

### ProductCategory
`phone` | `accessories`

### ProductCondition
`brand_new` | `used` | `like_new`

### ProductStatus
`in_stock` | `out_of_stock` | `sold` | `damaged`

### PhoneType
`overseas` | `local`

### PhoneRegion
`usa` | `japan` | `australia` | `uk` | `european` | `other`

### AccessoryType
`charger` | `earphone` | `cover` | `glass` | `power_bank`

### PaymentMethod
`cash` | `bkash` | `nagad` | `bank`

### PaymentStatus
`paid` | `partial_paid` | `due`

### ServiceStatus
`pending` | `working` | `ready` | `delivered` | `cancelled`

### ServiceType
`software` | `hardware` | `both`

### OrderStatus
`pending` | `confirmed` | `processing` | `delivered` | `cancelled`

### StockTransferStatus
`pending` | `approved` | `rejected`

### OverseasPhoneStatus
`purchased` | `sent_to_carrier` | `with_carrier` | `returned_from_carrier` | `delivered` | `cancelled`

### InvestmentType
`fixed_profit` | `profit_share`

### PayoutMethod
`monthly` | `weekly` | `custom`

### InvestorStatus
`active` | `closed`

### SourceType
`dubai` | `supplier`

### ExpenseType
`fixed` | `unfixed`

### EmiDuration
`3` | `6` | `9` | `12`

---

## Common Response Structures

### Paginated Response
```json
{
  "data": [ ...items ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

---