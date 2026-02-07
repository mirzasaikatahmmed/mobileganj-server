'use client';

import { ArrowLeft, Printer, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SaleDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/sales">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Invoice Details</h1>
            <p className="text-muted-foreground">INV-001</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Invoice */}
      <div className="card-base p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between border-b pb-6">
          <div>
            <h2 className="text-2xl font-bold">Mobile GANJ</h2>
            <p className="text-sm text-muted-foreground mt-1">Dhaka, Bangladesh</p>
            <p className="text-sm text-muted-foreground">Phone: 01712345678</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Invoice No</p>
            <p className="text-xl font-bold">INV-001</p>
            <p className="text-sm text-muted-foreground mt-2">Date: 2024-01-29</p>
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <h3 className="font-semibold mb-2">Customer Information</h3>
          <p className="text-sm">Karim Ahmed</p>
          <p className="text-sm text-muted-foreground">Phone: 01712345678</p>
          <p className="text-sm text-muted-foreground">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Products */}
        <div>
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">
                  <p className="font-medium">iPhone 15 Pro Max</p>
                  <p className="text-xs text-muted-foreground">IMEI: 123456789012345</p>
                </td>
                <td className="text-center">1</td>
                <td className="text-right">৳145,000</td>
                <td className="text-right font-semibold">৳145,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳145,000</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>৳0</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Grand Total</span>
              <span>৳145,000</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Paid</span>
              <span>৳145,000</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Due</span>
              <span>৳0</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="font-medium">Cash</p>
          </div>
          <div>
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
              Paid
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
