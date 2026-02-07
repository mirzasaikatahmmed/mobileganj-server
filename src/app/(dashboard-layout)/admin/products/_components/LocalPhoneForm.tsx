'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function LocalPhoneForm() {
  return (
    <div className="space-y-6">
      {/* Local Seller Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Local Seller Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Seller Full Name *</Label>
            <Input placeholder="Enter full name" required />
          </div>
          <div>
            <Label>Father's Name *</Label>
            <Input placeholder="Enter father's name" required />
          </div>
          <div>
            <Label>Mother's Name *</Label>
            <Input placeholder="Enter mother's name" required />
          </div>
          <div>
            <Label>Mobile Number *</Label>
            <Input placeholder="Enter mobile number" required />
          </div>
          <div className="col-span-2">
            <Label>Full Address *</Label>
            <Textarea placeholder="Enter complete address" rows={2} required />
          </div>
          <div>
            <Label>NID Number *</Label>
            <Input placeholder="Enter NID number" required />
          </div>
          <div>
            <Label>NID Front Photo *</Label>
            <Input type="file" accept="image/*" required />
          </div>
          <div>
            <Label>NID Back Photo *</Label>
            <Input type="file" accept="image/*" required />
          </div>
          <div>
            <Label>Seller Photo *</Label>
            <Input type="file" accept="image/*" required />
          </div>
        </div>
      </div>

      {/* Phone Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Phone Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Title *</Label>
            <Input placeholder="e.g., iPhone 14 Pro" required />
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
