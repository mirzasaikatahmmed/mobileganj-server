'use client';

import { Search, Eye, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const customers = [
  { id: '1', name: 'Karim Ahmed', phone: '01712345678', totalPurchase: 245000, totalPaid: 245000, totalDue: 0, lastPurchase: '2024-01-29' },
  { id: '2', name: 'Fatima Rahman', phone: '01812345678', totalPurchase: 189000, totalPaid: 150000, totalDue: 39000, lastPurchase: '2024-01-29' },
  { id: '3', name: 'Rahim Khan', phone: '01912345678', totalPurchase: 125500, totalPaid: 125500, totalDue: 0, lastPurchase: '2024-01-28' },
  { id: '4', name: 'Ayesha Begum', phone: '01612345678', totalPurchase: 329000, totalPaid: 200000, totalDue: 129000, lastPurchase: '2024-01-28' },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage customer database</p>
        </div>
        <Link href="/admin/customers/due-collection">
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            Due Collection
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <h3 className="text-2xl font-bold mt-1">1,248</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Purchase</p>
          <h3 className="text-2xl font-bold mt-1">৳5,250,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Paid</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">৳4,980,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Due</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">৳270,000</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name or phone..." className="pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="due-only" />
            <label htmlFor="due-only" className="text-sm font-medium cursor-pointer">
              Due Customers Only
            </label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">SL</th>
                <th className="text-left p-4 font-semibold">Customer Name</th>
                <th className="text-left p-4 font-semibold">Phone</th>
                <th className="text-right p-4 font-semibold">Total Purchase</th>
                <th className="text-right p-4 font-semibold">Total Paid</th>
                <th className="text-right p-4 font-semibold">Total Due</th>
                <th className="text-left p-4 font-semibold">Last Purchase</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{customer.name}</td>
                  <td className="p-4 text-muted-foreground">{customer.phone}</td>
                  <td className="p-4 text-right font-semibold">৳{customer.totalPurchase.toLocaleString()}</td>
                  <td className="p-4 text-right text-green-600">৳{customer.totalPaid.toLocaleString()}</td>
                  <td className="p-4 text-right text-red-600 font-semibold">৳{customer.totalDue.toLocaleString()}</td>
                  <td className="p-4">{customer.lastPurchase}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/customers/${customer.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      {customer.totalDue > 0 && (
                        <Link href="/admin/customers/due-collection">
                          <Button variant="ghost" size="icon" className="text-green-600">
                            <DollarSign className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
