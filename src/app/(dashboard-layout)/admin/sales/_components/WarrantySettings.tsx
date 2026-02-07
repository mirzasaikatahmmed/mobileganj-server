'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function WarrantySettings() {
  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-lg">Warranty Settings</h3>
      
      <div>
        <Label>Product Category *</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile">Mobile Phone</SelectItem>
            <SelectItem value="gadget">Gadget</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Warranty Type *</Label>
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select warranty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="official">Official Warranty</SelectItem>
            <SelectItem value="shop">Shop Warranty</SelectItem>
            <SelectItem value="no">No Warranty</SelectItem>
            <SelectItem value="custom">Custom Warranty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Warranty Duration</Label>
        <div className="flex gap-2">
          <Input type="number" placeholder="Duration" />
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="months">Months</SelectItem>
              <SelectItem value="years">Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Warranty Details</Label>
        <Input placeholder="e.g., 1 Year Official Warranty" />
      </div>
    </div>
  );
}
