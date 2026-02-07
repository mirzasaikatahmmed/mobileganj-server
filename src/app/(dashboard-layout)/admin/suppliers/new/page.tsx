'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function NewSupplierPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/suppliers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Supplier</h1>
          <p className="text-muted-foreground">Add new overseas supplier contact</p>
        </div>
      </div>

      <div className="card-base p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Supplier Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Shop Name *</Label>
              <Input placeholder="Enter shop name" required />
            </div>
            <div>
              <Label>Contact Person</Label>
              <Input placeholder="Enter name" />
            </div>
            <div>
              <Label>Phone Number *</Label>
              <Input placeholder="Enter phone" required />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input placeholder="Enter WhatsApp" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter email" />
            </div>
            <div className="col-span-2">
              <Label>Address *</Label>
              <Input placeholder="Enter address" required />
            </div>
            <div>
              <Label>City</Label>
              <Input placeholder="e.g., Dubai" />
            </div>
            <div>
              <Label>Country</Label>
              <Input placeholder="e.g., UAE" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Business Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Supplier Type</Label>
              <Input placeholder="e.g., Wholesaler" />
            </div>
            <div>
              <Label>Payment Terms</Label>
              <Input placeholder="e.g., 30 days credit" />
            </div>
            <div className="col-span-2">
              <Label>Note</Label>
              <Textarea placeholder="Additional notes..." rows={3} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Supplier
          </Button>
          <Link href="/admin/suppliers">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
