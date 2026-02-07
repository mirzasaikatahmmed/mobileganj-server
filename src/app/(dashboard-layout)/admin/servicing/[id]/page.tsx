'use client';

import { ArrowLeft, Edit2, Printer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServiceJobDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/servicing">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Service Job Details</h1>
            <p className="text-muted-foreground">SRV-001</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Job Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Customer Information</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">Karim Ahmed</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">01712345678</p>
            </div>
          </div>
        </div>

        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Device Information</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Device</p>
              <p className="font-medium">iPhone 14 Pro</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">IMEI</p>
              <p className="font-medium">123456789012345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem & Service */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Service Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Problem</p>
            <p className="font-medium">Screen replacement needed</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Service Type</p>
            <p className="font-medium">Hardware</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Technician</p>
            <p className="font-medium">Rahim Tech</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm">
              Delivered
            </span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Received Date</p>
            <p className="font-medium">2024-01-29</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Delivery Date</p>
            <p className="font-medium">2024-01-30</p>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Payment Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Charge</span>
            <span className="font-semibold">৳12,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Parts Cost</span>
            <span className="font-semibold">৳3,000</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span>Total Amount</span>
            <span>৳15,000</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Paid</span>
            <span className="font-bold">৳15,000</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Due</span>
            <span className="font-bold">৳0</span>
          </div>
          <div className="flex justify-between items-center border-t pt-3">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-medium">Cash</span>
          </div>
        </div>
      </div>
    </div>
  );
}
