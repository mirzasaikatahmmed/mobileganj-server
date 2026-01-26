export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  STAFF = 'staff',
}

export enum ProductCategory {
  PHONE = 'phone',
  ACCESSORIES = 'accessories',
}

export enum PhoneType {
  OVERSEAS = 'overseas',
  LOCAL = 'local',
}

export enum AccessoryType {
  CHARGER = 'charger',
  EARPHONE = 'earphone',
  COVER = 'cover',
  GLASS = 'glass',
  POWER_BANK = 'power_bank',
}

export enum ProductStatus {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock',
  SOLD = 'sold',
  DAMAGED = 'damaged',
}

export enum PaymentMethod {
  CASH = 'cash',
  BKASH = 'bkash',
  NAGAD = 'nagad',
  BANK = 'bank',
}

export enum PaymentStatus {
  PAID = 'paid',
  PARTIAL_PAID = 'partial_paid',
  DUE = 'due',
}

export enum ServiceStatus {
  PENDING = 'pending',
  WORKING = 'working',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum ServiceType {
  SOFTWARE = 'software',
  HARDWARE = 'hardware',
  BOTH = 'both',
}

export enum PartsUsageType {
  OWN = 'own',
  BORROWED = 'borrowed',
}

export enum InvestmentType {
  FIXED_PROFIT = 'fixed_profit',
  PROFIT_SHARE = 'profit_share',
}

export enum PayoutMethod {
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
  CUSTOM = 'custom',
}

export enum InvestorStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export enum OverseasPhoneStatus {
  PURCHASED = 'purchased',
  SENT_TO_CARRIER = 'sent_to_carrier',
  WITH_CARRIER = 'with_carrier',
  RETURNED_FROM_CARRIER = 'returned_from_carrier',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum SourceType {
  DUBAI = 'dubai',
  SUPPLIER = 'supplier',
}

export enum ContractType {
  FIXED = 'fixed',
  PER_PHONE = 'per_phone',
}

export enum ExpenseType {
  FIXED = 'fixed',
  UNFIXED = 'unfixed',
}

export enum ProductCondition {
  BRAND_NEW = 'brand_new',
  USED = 'used',
  LIKE_NEW = 'like_new',
}

export enum PhoneRegion {
  USA = 'usa',
  JAPAN = 'japan',
  AUSTRALIA = 'australia',
  UK = 'uk',
  EUROPEAN = 'european',
  OTHER = 'other',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum EmiDuration {
  THREE_MONTHS = 3,
  SIX_MONTHS = 6,
  NINE_MONTHS = 9,
  TWELVE_MONTHS = 12,
}
