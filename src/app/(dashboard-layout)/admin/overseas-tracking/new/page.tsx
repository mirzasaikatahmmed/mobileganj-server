'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function NewOverseasPhonePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/overseas-tracking">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Overseas Phone</h1>
          <p className="text-muted-foreground">Track new international phone</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Phone Info */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Phone Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Phone Model *</Label>
              <Input placeholder="e.g., iPhone 15 Pro Max" required />
            </div>
            <div>
              <Label>Brand *</Label>
              <Input placeholder="e.g., Apple" required />
            </div>
            <div>
              <Label>Storage / Variant</Label>
              <Input placeholder="e.g., 256GB" />
            </div>
            <div>
              <Label>IMEI 1 *</Label>
              <Input placeholder="Enter IMEI 1" required />
            </div>
            <div>
              <Label>IMEI 2</Label>
              <Input placeholder="Enter IMEI 2" />
            </div>
          </div>
        </div>

        {/* Source Info */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Source Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Source Type *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dubai">Dubai</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Source Person / Supplier *</Label>
              <Input placeholder="Enter name" required />
            </div>
            <div>
              <Label>Phone / WhatsApp</Label>
              <Input placeholder="Enter contact" />
            </div>
            <div>
              <Label>Location</Label>
              <Input placeholder="e.g., Dubai" />
            </div>
          </div>
        </div>

        {/* Carrier Info */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Carrier Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Carrier Name</Label>
              <Input placeholder="Enter carrier name" />
            </div>
            <div>
              <Label>Carrier Phone</Label>
              <Input placeholder="Enter phone" />
            </div>
            <div className="col-span-2">
              <Label>Contract Details</Label>
              <Textarea placeholder="e.g., Per phone 1,500 taka" rows={2} />
            </div>
            <div>
              <Label>Expected Delivery Date</Label>
              <Input type="date" />
            </div>
          </div>
        </div>

        {/* Financial Info */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Financial Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Amount Given (৳)</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment Date</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Initial Status *</Label>
              <Select defaultValue="purchased" required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchased">Purchased</SelectItem>
                  <SelectItem value="sent">Sent to Carrier</SelectItem>
                  <SelectItem value="with-carrier">With Carrier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Note</Label>
              <Textarea placeholder="Additional notes..." rows={3} />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Entry
          </Button>
          <Link href="/admin/overseas-tracking">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
