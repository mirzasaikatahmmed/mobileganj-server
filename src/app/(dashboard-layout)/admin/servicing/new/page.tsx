'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import BorrowedParts from '../_components/BorrowedParts';

export default function NewServiceJobPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/servicing">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Add Service Job</h1>
          <p className="text-muted-foreground">Create new repair/service job</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Customer Phone *</Label>
                <Input placeholder="Enter phone number" required />
              </div>
              <div>
                <Label>Customer Name *</Label>
                <Input placeholder="Enter name" required />
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Device Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Device Model *</Label>
                <Input placeholder="e.g., iPhone 14 Pro" required />
              </div>
              <div>
                <Label>IMEI</Label>
                <Input placeholder="Enter IMEI" />
              </div>
              <div className="col-span-2">
                <Label>Problem / Issue *</Label>
                <Textarea placeholder="Describe the problem..." rows={3} required />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Service Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Service Type *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="hardware">Hardware</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Technician</Label>
                <Input placeholder="Technician name" />
              </div>
              <div>
                <Label>Estimated Delivery</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Status *</Label>
                <Select defaultValue="pending" required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="working">Working</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Parts */}
          <BorrowedParts />
        </div>

        {/* Pricing */}
        <div className="space-y-6">
          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Pricing</h3>
            <div>
              <Label>Service Charge (৳) *</Label>
              <Input type="number" placeholder="0" required />
            </div>
            <div>
              <Label>Parts Cost (৳)</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>৳0</span>
              </div>
            </div>
          </div>

          <div className="card-base p-6 space-y-4">
            <h3 className="font-semibold text-lg">Payment</h3>
            <div>
              <Label>Paid Amount (৳)</Label>
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
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between text-red-600">
                <span>Due</span>
                <span className="font-bold">৳0</span>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Job
          </Button>
          <Link href="/admin/servicing">
            <Button variant="outline" className="w-full">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
