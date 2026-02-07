'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function DueCollectionPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/customers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Due Collection</h1>
          <p className="text-muted-foreground">Receive due payment from customer</p>
        </div>
      </div>

      {/* Form */}
      <div className="card-base p-6 space-y-6">
        {/* Customer Select */}
        <div>
          <Label>Select Customer *</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Search by name or phone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Fatima Rahman - 01812345678</SelectItem>
              <SelectItem value="2">Ayesha Begum - 01612345678</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Total Due Display */}
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-red-900 dark:text-red-100">Total Due Amount</span>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">৳39,000</span>
          </div>
        </div>

        {/* Receive Amount */}
        <div>
          <Label>Receive Amount (৳) *</Label>
          <Input type="number" placeholder="Enter amount" required />
        </div>

        {/* Payment Method */}
        <div>
          <Label>Payment Method *</Label>
          <Select required>
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

        {/* Receive Date */}
        <div>
          <Label>Receive Date *</Label>
          <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
        </div>

        {/* Note */}
        <div>
          <Label>Note</Label>
          <Textarea placeholder="Additional notes (optional)" rows={3} />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Collection
          </Button>
          <Link href="/admin/customers">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </div>

      {/* Recent Collections */}
      <div className="card-base p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Collections</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium">Fatima Rahman</p>
                <p className="text-sm text-muted-foreground">2024-01-29 • Cash</p>
              </div>
              <span className="font-semibold text-green-600">৳10,000</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
