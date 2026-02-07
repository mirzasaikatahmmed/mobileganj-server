'use client';

import { ArrowLeft, Save, Printer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CustomerSearch from '../_components/CustomerSearch';
import ProductCart from '../_components/ProductCart';
import PaymentSummary from '../_components/PaymentSummary';
import WarrantySettings from '../_components/WarrantySettings';

export default function NewSalePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/sales">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">New Sale</h1>
            <p className="text-muted-foreground">Create new invoice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Invoice No:</span>
          <span className="font-mono font-bold">INV-{Date.now().toString().slice(-6)}</span>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <CustomerSearch />
          <ProductCart />
          <WarrantySettings />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <PaymentSummary />
          
          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save Sale
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Printer className="w-4 h-4 mr-2" />
              Save & Print
            </Button>
            <Link href="/admin/sales">
              <Button variant="ghost" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
