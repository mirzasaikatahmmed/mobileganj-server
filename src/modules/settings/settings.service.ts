import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../../database/entities';

const DEFAULT_SETTINGS: Record<string, Record<string, unknown>> = {
  store: {
    name: 'Mobile GANJ',
    tagline: 'Your Trusted Mobile Partner',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Bangladesh',
    currency: 'BDT',
    currencySymbol: '৳',
    logo: '',
    favicon: '',
    timezone: 'Asia/Dhaka',
    language: 'en',
  },
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
    whatsapp: '',
  },
  invoice: {
    prefix: 'INV',
    showLogo: true,
    showAddress: true,
    showPhone: true,
    footerNote: 'Thank you for your purchase!',
    termsAndConditions: '',
  },
  warranty: {
    defaultMonths: 6,
    showOnInvoice: true,
    warrantyNote: 'Warranty covers manufacturing defects only.',
  },
  emi: {
    enabled: true,
    interestRate: 0,
    durations: [3, 6, 9, 12],
    minAmount: 10000,
  },
  payment: {
    cash: true,
    bkash: true,
    nagad: true,
    bank: true,
    bkashNumber: '',
    nagadNumber: '',
    bankDetails: '',
  },
  notification: {
    emailEnabled: false,
    smsEnabled: false,
    lowStockAlert: true,
    dueSaleAlert: true,
  },
  delivery: {
    enabled: false,
    charge: 0,
    freeAbove: 0,
    estimatedDays: '3-7',
  },
  seo: {
    metaTitle: 'Mobile GANJ - Your Trusted Mobile Partner',
    metaDescription: '',
    keywords: '',
    googleAnalyticsId: '',
  },
  appearance: {
    theme: 'light',
    primaryColor: '#2563eb',
    accentColor: '#f59e0b',
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
  },
  pos: {
    autoFocusSearch: true,
    showBarcode: true,
    printReceipt: true,
    soundEnabled: false,
  },
  overseas: {
    defaultCarrier: '',
    trackingEnabled: true,
    dubaySources: [],
  },
};

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}

  async getAll(): Promise<Record<string, Record<string, unknown>>> {
    const records = await this.settingsRepository.find();
    const result: Record<string, Record<string, unknown>> = {
      ...DEFAULT_SETTINGS,
    };

    for (const record of records) {
      result[record.key] = record.value;
    }

    return result;
  }

  async getSection(key: string): Promise<Record<string, unknown>> {
    const record = await this.settingsRepository.findOne({ where: { key } });
    return record?.value ?? DEFAULT_SETTINGS[key] ?? {};
  }

  async updateAll(settings: Record<string, Record<string, unknown>>) {
    for (const [key, value] of Object.entries(settings)) {
      await this.upsertSection(key, value);
    }
    return this.getAll();
  }

  async updateSection(key: string, value: Record<string, unknown>) {
    await this.upsertSection(key, value);
    return this.getSection(key);
  }

  private async upsertSection(key: string, value: Record<string, unknown>) {
    const existing = await this.settingsRepository.findOne({ where: { key } });

    if (existing) {
      existing.value = {
        ...existing.value,
        ...value,
      };
      return this.settingsRepository.save(existing);
    }

    const defaults = DEFAULT_SETTINGS[key] ?? {};
    const record = this.settingsRepository.create({
      key,
      value: { ...defaults, ...value },
    });
    return this.settingsRepository.save(record);
  }

  async reset() {
    await this.settingsRepository.delete({});
    return DEFAULT_SETTINGS;
  }
}
