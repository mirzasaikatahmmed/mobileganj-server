import { AllSettings } from '@/types/settings';

// Default settings - replace with API calls
export const defaultSettings: AllSettings = {
  store: {
    storeName: 'Mobile GANJ',
    storeNameBn: 'মোবাইল গঞ্জ',
    tagline: 'Your Trusted Mobile Shop',
    email: 'info@mobileganj.com',
    phone: '01700000000',
    alternatePhone: '01800000000',
    address: 'Shop #12, Rangpur City Center, Station Road',
    addressBn: 'দোকান #১২, রংপুর সিটি সেন্টার, স্টেশন রোড',
    city: 'Rangpur',
    district: 'Rangpur',
    division: 'Rangpur',
    postalCode: '5400',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    website: 'https://mobileganj.com',
    googleMapUrl: '',
    openingHours: '09:00',
    closingHours: '21:00',
    offDays: ['Friday'],
  },
  social: {
    facebook: 'https://facebook.com/mobileganj',
    instagram: '',
    youtube: '',
    tiktok: '',
    whatsapp: '01700000000',
    telegram: '',
    messenger: 'https://m.me/mobileganj',
  },
  invoice: {
    invoicePrefix: 'MG',
    nextInvoiceNumber: 1001,
    showLogo: true,
    showStoreAddress: true,
    showCustomerAddress: true,
    footerNote: 'Thank you for shopping with us!',
    footerNoteBn: 'আমাদের সাথে কেনাকাটার জন্য ধন্যবাদ!',
    termsAndConditions: 'Products once sold are non-refundable unless defective.',
    thankYouMessage: 'Thank you for your purchase!',
    thankYouMessageBn: 'আপনার ক্রয়ের জন্য ধন্যবাদ!',
    paperSize: 'Thermal-80mm',
    currency: 'BDT',
    currencySymbol: '৳',
    showIMEI: true,
    showWarranty: true,
  },
  warranty: {
    defaultPhoneWarrantyDays: 365,
    defaultAccessoryWarrantyDays: 180,
    warrantyCardPrefix: 'WC',
    warrantyTerms: 'Warranty covers manufacturing defects only. Physical damage, water damage, and unauthorized modifications are not covered.',
    warrantyTermsBn: 'ওয়ারেন্টি শুধুমাত্র উৎপাদন ত্রুটি কভার করে। শারীরিক ক্ষতি, পানির ক্ষতি এবং অননুমোদিত পরিবর্তন কভার করা হয় না।',
    showWarrantyOnInvoice: true,
    enableWarrantyTracking: true,
  },
  emi: {
    enableEMI: true,
    minEMIAmount: 10000,
    defaultDownPaymentPercent: 30,
    interestRate: 0,
    availableDurations: [3, 6, 9, 12],
    lateFeePerDay: 50,
    gracePeriodDays: 3,
    requiredDocuments: ['NID Copy', 'Photo', 'Guarantor NID'],
  },
  notification: {
    enableSMS: false,
    smsProvider: 'bulsms',
    smsApiKey: '',
    smsApiSecret: '',
    smsSenderId: 'MobileGanj',
    smsBalance: 0,
    sendOnSale: true,
    sendOnDueReminder: true,
    sendOnWarrantyExpiry: true,
    sendOnEMIDue: true,
    enableEmail: false,
    emailProvider: 'smtp',
    emailHost: '',
    emailPort: 587,
    emailUser: '',
    emailPassword: '',
    enablePushNotification: false,
  },
  payment: {
    enableCash: true,
    enableBkash: true,
    bkashNumber: '01700000000',
    enableNagad: true,
    nagadNumber: '01700000000',
    enableRocket: false,
    rocketNumber: '',
    enableUpay: false,
    upayNumber: '',
    enableBankTransfer: true,
    bankName: 'Dutch Bangla Bank Ltd',
    bankAccountName: 'Mobile Ganj',
    bankAccountNumber: '1234567890',
    bankBranch: 'Rangpur Branch',
    bankRoutingNumber: '',
    enableCard: false,
    enableOnlinePayment: false,
    onlinePaymentGateway: 'sslcommerz',
    onlinePaymentApiKey: '',
    onlinePaymentApiSecret: '',
  },
  delivery: {
    enableDelivery: true,
    defaultDeliveryCharge: 100,
    freeDeliveryMinAmount: 50000,
    deliveryAreas: [
      { id: '1', name: 'রংপুর সিটি', charge: 50, estimatedDays: 1 },
      { id: '2', name: 'রংপুর জেলা', charge: 100, estimatedDays: 2 },
      { id: '3', name: 'ঢাকা', charge: 150, estimatedDays: 3 },
      { id: '4', name: 'অন্যান্য জেলা', charge: 150, estimatedDays: 3 },
    ],
    enableCourierIntegration: false,
    courierProvider: 'pathao',
    courierApiKey: '',
    courierApiSecret: '',
    estimatedDeliveryDays: 3,
  },
  seo: {
    metaTitle: 'Mobile GANJ - Best Mobile Shop in Rangpur',
    metaDescription: 'Buy original smartphones, accessories at best price. iPhone, Samsung, Google Pixel available. EMI available.',
    metaKeywords: ['mobile shop rangpur', 'iphone rangpur', 'samsung rangpur', 'mobile ganj'],
    ogImage: '/og-image.jpg',
    googleAnalyticsId: '',
    facebookPixelId: '',
    tiktokPixelId: '',
  },
  appearance: {
    primaryColor: '#7c3aed',
    accentColor: '#06b6d4',
    theme: 'system',
    heroText: 'Your Trusted Mobile Shop',
    heroTextBn: 'আপনার বিশ্বস্ত মোবাইল শপ',
    heroSubtext: 'Best deals on brand new and used smartphones',
    heroSubtextBn: 'নতুন এবং ব্যবহৃত স্মার্টফোনে সেরা অফার',
    showBanner: true,
    bannerImage: '',
    bannerLink: '',
    showTopBar: true,
    topBarMessage: '🔥 Special Offer: Up to 20% off on all iPhones!',
    topBarMessageBn: '🔥 বিশেষ অফার: সকল আইফোনে ২০% পর্যন্ত ছাড়!',
  },
  security: {
    enableTwoFactor: false,
    sessionTimeoutMinutes: 480,
    maxLoginAttempts: 5,
    passwordMinLength: 6,
    requireUppercase: false,
    requireNumber: true,
    enableActivityLog: true,
    backupFrequency: 'daily',
    lastBackupDate: '2026-02-06',
  },
  pos: {
    enableQuickSale: true,
    enableBarcodeScan: true,
    defaultDiscount: 0,
    enableCustomerDisplay: false,
    enableSoundEffects: true,
    autoPrintReceipt: true,
    receiptCopies: 1,
    enableHoldBill: true,
    maxHoldBills: 10,
    lowStockAlert: 3,
  },
  overseas: {
    enableOverseasTracking: true,
    defaultCurrency: 'USD',
    conversionRateUSD: 121.5,
    conversionRateJPY: 0.81,
    conversionRateAUD: 78.5,
    conversionRateGBP: 153.0,
    conversionRateEUR: 131.0,
    defaultShippingMethod: 'Air Cargo',
    trackingProviders: ['DHL', 'FedEx', 'Japan Post', 'Australia Post'],
    importDutyPercent: 25,
    vatPercent: 15,
  },
};

// ============ API Service (Replace with actual API calls) ============

export async function getSettings(): Promise<AllSettings> {
  // TODO: Replace with actual API call
  // const response = await axios.get('/api/settings');
  // return response.data;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Try to load from localStorage first
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mobileganj_settings');
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return defaultSettings;
}

export async function updateSettings(settings: Partial<AllSettings>): Promise<AllSettings> {
  // TODO: Replace with actual API call
  // const response = await axios.put('/api/settings', settings);
  // return response.data;

  await new Promise((resolve) => setTimeout(resolve, 300));

  const current = await getSettings();
  const updated = { ...current, ...settings };

  if (typeof window !== 'undefined') {
    localStorage.setItem('mobileganj_settings', JSON.stringify(updated));
  }

  return updated;
}

export async function updateSettingsSection<K extends keyof AllSettings>(
  section: K,
  data: AllSettings[K]
): Promise<AllSettings> {
  // TODO: Replace with actual API call
  // const response = await axios.patch(`/api/settings/${section}`, data);
  // return response.data;

  await new Promise((resolve) => setTimeout(resolve, 300));

  const current = await getSettings();
  const updated = { ...current, [section]: data };

  if (typeof window !== 'undefined') {
    localStorage.setItem('mobileganj_settings', JSON.stringify(updated));
  }

  return updated;
}

export async function resetSettings(): Promise<AllSettings> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mobileganj_settings');
  }
  return defaultSettings;
}

export async function exportSettings(): Promise<string> {
  const settings = await getSettings();
  return JSON.stringify(settings, null, 2);
}

export async function importSettings(json: string): Promise<AllSettings> {
  const settings = JSON.parse(json) as AllSettings;
  if (typeof window !== 'undefined') {
    localStorage.setItem('mobileganj_settings', JSON.stringify(settings));
  }
  return settings;
}
