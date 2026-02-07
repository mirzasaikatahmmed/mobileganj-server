'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AccessoriesForm() {
  return (
    <div className="space-y-6">
      {/* Accessories Info */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Accessories Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Product Name *</Label>
            <Input placeholder="e.g., AirPods Pro 2" required />
          </div>
          <div>
            <Label>Accessories Type *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="charger">Charger</SelectItem>
                <SelectItem value="earphone">Earphone</SelectItem>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
                <SelectItem value="powerbank">Power Bank</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Brand</Label>
            <Input placeholder="e.g., Apple" />
          </div>
          <div>
            <Label>Purchase Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Selling Price (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Stock Qty *</Label>
            <Input type="number" placeholder="0" required />
          </div>
          <div>
            <Label>Low Stock Alert Qty</Label>
            <Input type="number" placeholder="5" />
          </div>
          <div className="col-span-2">
            <Label>Product Image</Label>
            <Input type="file" accept="image/*" />
          </div>
          <div className="col-span-2">
            <Label>Note</Label>
            <Textarea placeholder="Additional notes..." rows={3} />
          </div>
        </div>
      </div>

      {/* Optional Supplier */}
      <div className="card-base p-6 space-y-4">
        <h3 className="font-semibold text-lg">Supplier (Optional)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Supplier Name</Label>
            <Input placeholder="Enter supplier name" />
          </div>
          <div>
            <Label>Supplier Phone</Label>
            <Input placeholder="Enter phone number" />
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
