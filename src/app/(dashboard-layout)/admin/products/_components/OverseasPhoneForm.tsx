'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

export default function OverseasPhoneForm() {
  return (
    <div className="space-y-6">
      {/* Supplier Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Supplier Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Supplier Name *</Label>
            <Input placeholder="Enter supplier name" required />
          </div>
          <div>
            <Label>Supplier Phone</Label>
            <Input placeholder="Enter phone number" />
          </div>
          <div className="col-span-2">
            <Label>Invoice / Reference No</Label>
            <Input placeholder="Enter invoice number" />
          </div>
        </div>
      </div>

      {/* Phone Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Phone Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Title *</Label>
            <Input placeholder="e.g., iPhone 15 Pro Max" required />
          </div>
          <div>
            <Label>Brand *</Label>
            <Input placeholder="e.g., Apple" required />
          </div>
          <div>
            <Label>Stock Qty</Label>
            <Input type="number" defaultValue="1" />
          </div>
          <div>
            <Label>IMEI 1 *</Label>
            <Input placeholder="Enter IMEI 1" required />
          </div>
          <div>
            <Label>IMEI 2</Label>
            <Input placeholder="Enter IMEI 2" />
          </div>
          <div>
            <Label>Purchase Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Selling Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div className="col-span-2">
            <Label>Phone Photo</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div className="col-span-2">
            <Label>Note</Label>
            <Textarea placeholder="Additional notes..." rows={3} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1">Save Product</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
