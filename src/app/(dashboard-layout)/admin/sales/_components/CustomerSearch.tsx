'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CustomerSearch() {
  const [phone, setPhone] = useState('');
  const [showNewCustomer, setShowNewCustomer] = useState(false);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    // Simulate checking if customer exists
    setShowNewCustomer(value.length === 11);
  };

  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-lg">Customer Information</h3>
      
      <div>
        <Label>Customer Phone *</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Enter phone number" 
            className="pl-10"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            required
          />
        </div>
      </div>

      {showNewCustomer && (
        <div className="space-y-4 pt-2 border-t">
          <p className="text-sm text-muted-foreground">New customer - Please provide details</p>
          <div>
            <Label>Customer Name *</Label>
            <Input placeholder="Enter customer name" required />
          </div>
          <div>
            <Label>Address</Label>
            <Input placeholder="Enter address (optional)" />
          </div>
        </div>
      )}
    </div>
  );
}
