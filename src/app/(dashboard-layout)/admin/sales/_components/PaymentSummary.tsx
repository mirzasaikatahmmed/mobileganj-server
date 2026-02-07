'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PaymentSummary() {
  const [subtotal] = useState(196000);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'fixed' | 'percent'>('fixed');
  const [paid, setPaid] = useState(0);

  const discountAmount = discountType === 'percent' 
    ? (subtotal * discount) / 100 
    : discount;
  
  const grandTotal = subtotal - discountAmount;
  const due = grandTotal - paid;

  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-lg">Payment Summary</h3>

      {/* Subtotal */}
      <div className="flex justify-between text-lg">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-semibold">৳{subtotal.toLocaleString()}</span>
      </div>

      {/* Discount */}
      <div className="space-y-2">
        <Label>Discount</Label>
        <div className="flex gap-2">
          <Input 
            type="number" 
            placeholder="0"
            value={discount || ''}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
          <Select value={discountType} onValueChange={(v: any) => setDiscountType(v)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">৳</SelectItem>
              <SelectItem value="percent">%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {discountAmount > 0 && (
          <p className="text-sm text-muted-foreground">
            Discount: ৳{discountAmount.toLocaleString()}
          </p>
        )}
      </div>

      {/* Grand Total */}
      <div className="flex justify-between text-xl font-bold pt-3 border-t">
        <span>Grand Total</span>
        <span className="text-primary">৳{grandTotal.toLocaleString()}</span>
      </div>

      {/* Paid Amount */}
      <div>
        <Label>Paid Amount *</Label>
        <Input 
          type="number" 
          placeholder="0"
          value={paid || ''}
          onChange={(e) => setPaid(Number(e.target.value))}
          required
        />
      </div>

      {/* Due Amount */}
      <div className="flex justify-between text-lg">
        <span className="text-muted-foreground">Due Amount</span>
        <span className={`font-semibold ${due > 0 ? 'text-red-600' : 'text-green-600'}`}>
          ৳{due.toLocaleString()}
        </span>
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

      {/* Due Date (if due) */}
      {due > 0 && (
        <div>
          <Label>Due Date</Label>
          <Input type="date" />
        </div>
      )}

      {/* Status Badge */}
      <div className="pt-3 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${
            due === 0 ? 'bg-green-100 text-green-700' :
            paid > 0 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {due === 0 ? 'Paid' : paid > 0 ? 'Partial Paid' : 'Due'}
          </span>
        </div>
      </div>
    </div>
  );
}
