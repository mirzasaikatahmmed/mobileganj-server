'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BorrowedParts() {
  const [partsType, setPartsType] = useState<'own' | 'borrowed' | null>(null);

  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-lg">Parts Usage</h3>
      
      <div>
        <Label>Parts Type *</Label>
        <Select value={partsType || ''} onValueChange={(v: any) => setPartsType(v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="own">Own Parts</SelectItem>
            <SelectItem value="borrowed">Borrowed Parts (Dhar)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {partsType === 'own' && (
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <Label>Part Name</Label>
            <Input placeholder="e.g., Screen" />
          </div>
          <div>
            <Label>Qty</Label>
            <Input type="number" defaultValue="1" />
          </div>
          <div className="col-span-2">
            <Label>Part Cost (৳)</Label>
            <Input type="number" placeholder="0" />
          </div>
        </div>
      )}

      {partsType === 'borrowed' && (
        <div className="space-y-4 pt-2 border-t">
          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
            <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Borrowed Parts Tracking</p>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Record borrowed parts for future reference</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Borrow From (Person Name) *</Label>
              <Input placeholder="Enter person name" required />
            </div>
            <div className="col-span-2">
              <Label>Phone Number *</Label>
              <Input placeholder="Enter phone" required />
            </div>
            <div>
              <Label>Part Name *</Label>
              <Input placeholder="e.g., Display" required />
            </div>
            <div>
              <Label>Qty *</Label>
              <Input type="number" defaultValue="1" required />
            </div>
            <div>
              <Label>Price per Unit (৳) *</Label>
              <Input type="number" placeholder="0" required />
            </div>
            <div>
              <Label>Total Amount (৳)</Label>
              <Input type="number" placeholder="0" disabled />
            </div>
            <div>
              <Label>Paid Amount (৳)</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div>
              <Label>Due Amount (৳)</Label>
              <Input type="number" placeholder="0" disabled />
            </div>
            <div className="col-span-2">
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
