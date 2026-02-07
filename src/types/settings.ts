// ===================== SETTINGS TYPES =====================

// --- Store / Business Info ---
export interface StoreInfo {
  storeName: string;
  storeNameBn: string; // Bangla name
  tagline: string;
  email: string;
  phone: string;
  alternatePhone: string;
  address: string;
  addressBn: string;
  city: string;
  district: string;
  division: string;
  postalCode: string;
  logo: string;
  favicon: string;
  website: string;
  googleMapUrl: string;
  openingHours: string;
  closingHours: string;
  offDays: string[];
}

// --- Social Links ---
export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  whatsapp: string;
  telegram: string;
  messenger: string;
}

// --- Invoice / Receipt ---
export interface InvoiceSettings {
  invoicePrefix: string;
  nextInvoiceNumber: number;
  showLogo: boolean;
  showStoreAddress: boolean;
  showCustomerAddress: boolean;
  footerNote: string;
  footerNoteBn: string;
  termsAndConditions: string;
  thankYouMessage: string;
  thankYouMessageBn: string;
  paperSize: 'A4' | 'A5' | 'Thermal-80mm' | 'Thermal-58mm';
  currency: string;
  currencySymbol: string;
  showIMEI: boolean;
  showWarranty: boolean;
}

// --- Warranty ---
export interface WarrantySettings {
  defaultPhoneWarrantyDays: number;
  defaultAccessoryWarrantyDays: number;
  warrantyCardPrefix: string;
  warrantyTerms: string;
  warrantyTermsBn: string;
  showWarrantyOnInvoice: boolean;
  enableWarrantyTracking: boolean;
}

// --- EMI / Installment ---
export interface EMISettings {
  enableEMI: boolean;
  minEMIAmount: number;
  defaultDownPaymentPercent: number;
  interestRate: number;
  availableDurations: number[]; // months
  lateFeePerDay: number;
  gracePeriodDays: number;
  requiredDocuments: string[];
}

// --- SMS / Notification ---
export interface NotificationSettings {
  enableSMS: boolean;
  smsProvider: 'bulsms' | 'sslsms' | 'infobip' | 'twilio' | 'custom';
  smsApiKey: string;
  smsApiSecret: string;
  smsSenderId: string;
  smsBalance: number;
  sendOnSale: boolean;
  sendOnDueReminder: boolean;
  sendOnWarrantyExpiry: boolean;
  sendOnEMIDue: boolean;
  enableEmail: boolean;
  emailProvider: 'smtp' | 'sendgrid' | 'mailgun';
  emailHost: string;
  emailPort: number;
  emailUser: string;
  emailPassword: string;
  enablePushNotification: boolean;
}

// --- Payment ---
export interface PaymentSettings {
  enableCash: boolean;
  enableBkash: boolean;
  bkashNumber: string;
  enableNagad: boolean;
  nagadNumber: string;
  enableRocket: boolean;
  rocketNumber: string;
  enableUpay: boolean;
  upayNumber: string;
  enableBankTransfer: boolean;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankBranch: string;
  bankRoutingNumber: string;
  enableCard: boolean;
  enableOnlinePayment: boolean;
  onlinePaymentGateway: 'sslcommerz' | 'aamarpay' | 'stripe' | 'none';
  onlinePaymentApiKey: string;
  onlinePaymentApiSecret: string;
}

// --- Delivery ---
export interface DeliverySettings {
  enableDelivery: boolean;
  defaultDeliveryCharge: number;
  freeDeliveryMinAmount: number;
  deliveryAreas: DeliveryArea[];
  enableCourierIntegration: boolean;
  courierProvider: 'pathao' | 'steadfast' | 'redx' | 'paperfly' | 'none';
  courierApiKey: string;
  courierApiSecret: string;
  estimatedDeliveryDays: number;
}

export interface DeliveryArea {
  id: string;
  name: string;
  charge: number;
  estimatedDays: number;
}

// --- SEO ---
export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
  tiktokPixelId: string;
}

// --- Appearance ---
export interface AppearanceSettings {
  primaryColor: string;
  accentColor: string;
  theme: 'light' | 'dark' | 'system';
  heroText: string;
  heroTextBn: string;
  heroSubtext: string;
  heroSubtextBn: string;
  showBanner: boolean;
  bannerImage: string;
  bannerLink: string;
  showTopBar: boolean;
  topBarMessage: string;
  topBarMessageBn: string;
}

// --- Security / Users ---
export interface SecuritySettings {
  enableTwoFactor: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  enableActivityLog: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly' | 'manual';
  lastBackupDate: string;
}

// --- POS ---
export interface POSSettings {
  enableQuickSale: boolean;
  enableBarcodeScan: boolean;
  defaultDiscount: number;
  enableCustomerDisplay: boolean;
  enableSoundEffects: boolean;
  autoPrintReceipt: boolean;
  receiptCopies: number;
  enableHoldBill: boolean;
  maxHoldBills: number;
  lowStockAlert: number;
}

// --- Overseas / Import ---
export interface OverseasSettings {
  enableOverseasTracking: boolean;
  defaultCurrency: 'USD' | 'JPY' | 'AUD' | 'GBP' | 'EUR';
  conversionRateUSD: number;
  conversionRateJPY: number;
  conversionRateAUD: number;
  conversionRateGBP: number;
  conversionRateEUR: number;
  defaultShippingMethod: string;
  trackingProviders: string[];
  importDutyPercent: number;
  vatPercent: number;
}

// --- All settings combined ---
export interface AllSettings {
  store: StoreInfo;
  social: SocialLinks;
  invoice: InvoiceSettings;
  warranty: WarrantySettings;
  emi: EMISettings;
  notification: NotificationSettings;
  payment: PaymentSettings;
  delivery: DeliverySettings;
  seo: SEOSettings;
  appearance: AppearanceSettings;
  security: SecuritySettings;
  pos: POSSettings;
  overseas: OverseasSettings;
}
