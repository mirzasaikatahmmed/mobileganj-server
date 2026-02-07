'use client';

import { Search, Eye, Users, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const suppliers = [
  { id: '1', name: 'Dubai Mobile Hub', phone: '+971-50-1234567', totalPhones: 45, totalAmount: 5850000, totalPaid: 5500000, totalDue: 350000, lastPurchase: '2024-01-28' },
  { id: '2', name: 'Singapore Tech', phone: '+65-9123-4567', totalPhones: 28, totalAmount: 3920000, totalPaid: 3920000, totalDue: 0, lastPurchase: '2024-01-25' },
];

const localSellers = [
  { id: '1', name: 'Karim Seller', phone: '01712345678', nid: '1234567890', totalPhones: 3, lastPurchase: '2024-01-27' },
  { id: '2', name: 'Rahim Seller', phone: '01812345678', nid: '9876543210', totalPhones: 5, lastPurchase: '2024-01-26' },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Suppliers & Local Sellers</h1>

      {/* Overseas Suppliers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Overseas Suppliers
          </h2>
          <Link href="/admin/suppliers/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Supplier
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="card-base p-4">
            <p className="text-sm text-muted-foreground">Total Suppliers</p>
            <h3 className="text-2xl font-bold mt-1">12</h3>
          </div>
          <div className="card-base p-4">
            <p className="text-sm text-muted-foreground">Total Purchase</p>
            <h3 className="text-2xl font-bold mt-1">৳9,770,000</h3>
          </div>
          <div className="card-base p-4">
            <p className="text-sm text-muted-foreground">Total Due</p>
            <h3 className="text-2xl font-bold mt-1 text-red-600">৳350,000</h3>
          </div>
        </div>

        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Supplier Name</th>
                  <th className="text-left p-4 font-semibold">Phone</th>
                  <th className="text-center p-4 font-semibold">Total Phones</th>
                  <th className="text-right p-4 font-semibold">Total Amount</th>
                  <th className="text-right p-4 font-semibold">Due</th>
                  <th className="text-center p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-t hover:bg-muted/30">
                    <td className="p-4 font-medium">{supplier.name}</td>
                    <td className="p-4 text-muted-foreground">{supplier.phone}</td>
                    <td className="p-4 text-center">{supplier.totalPhones}</td>
                    <td className="p-4 text-right font-semibold">৳{supplier.totalAmount.toLocaleString()}</td>
                    <td className="p-4 text-right text-red-600 font-semibold">৳{supplier.totalDue.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Local Sellers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Local Sellers
        </h2>

        <div className="card-base overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Seller Name</th>
                  <th className="text-left p-4 font-semibold">Phone</th>
                  <th className="text-left p-4 font-semibold">NID</th>
                  <th className="text-center p-4 font-semibold">Total Phones</th>
                  <th className="text-left p-4 font-semibold">Last Purchase</th>
                  <th className="text-center p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {localSellers.map((seller) => (
                  <tr key={seller.id} className="border-t hover:bg-muted/30">
                    <td className="p-4 font-medium">{seller.name}</td>
                    <td className="p-4 text-muted-foreground">{seller.phone}</td>
                    <td className="p-4 text-muted-foreground">{seller.nid}</td>
                    <td className="p-4 text-center">{seller.totalPhones}</td>
                    <td className="p-4">{seller.lastPurchase}</td>
                    <td className="p-4 text-center">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
