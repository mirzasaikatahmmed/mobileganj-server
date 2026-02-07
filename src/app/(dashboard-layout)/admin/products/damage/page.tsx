'use client';

import { AlertTriangle, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const damagedProducts = [
  { id: '1', name: 'iPhone 14 Pro', imei: '123456789012345', damageType: 'Screen Crack', damageDate: '2024-01-28', status: 'Pending', returnStatus: 'Not Returned' },
  { id: '2', name: 'Samsung S23', imei: '987654321098765', damageType: 'Water Damage', damageDate: '2024-01-25', status: 'Returned', returnStatus: 'Returned to Supplier' },
];

export default function ProductDamagePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            Product Damage Tracking
          </h1>
          <p className="text-muted-foreground">Track damaged products & returns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Damage Form */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg">Report Damage</h3>
          
          <div>
            <Label>Product / IMEI *</Label>
            <Input placeholder="Search product or IMEI" required />
          </div>

          <div>
            <Label>Damage Type *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="screen">Screen Crack</SelectItem>
                <SelectItem value="water">Water Damage</SelectItem>
                <SelectItem value="battery">Battery Issue</SelectItem>
                <SelectItem value="hardware">Hardware Failure</SelectItem>
                <SelectItem value="software">Software Issue</SelectItem>
                <SelectItem value="physical">Physical Damage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Damage Date *</Label>
            <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea placeholder="Describe the damage..." rows={3} required />
          </div>

          <div>
            <Label>Damage Photo</Label>
            <Input type="file" accept="image/*" />
          </div>

          <div>
            <Label>Responsible Party</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Report Damage
          </Button>
        </div>

        {/* Damage List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="card-base p-4">
              <p className="text-sm text-muted-foreground">Total Damaged</p>
              <h3 className="text-2xl font-bold mt-1 text-red-600">12</h3>
            </div>
            <div className="card-base p-4">
              <p className="text-sm text-muted-foreground">Pending</p>
              <h3 className="text-2xl font-bold mt-1 text-orange-600">5</h3>
            </div>
            <div className="card-base p-4">
              <p className="text-sm text-muted-foreground">Returned</p>
              <h3 className="text-2xl font-bold mt-1 text-green-600">7</h3>
            </div>
          </div>

          <div className="card-base overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Product</th>
                    <th className="text-left p-4 font-semibold">IMEI</th>
                    <th className="text-left p-4 font-semibold">Damage Type</th>
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-center p-4 font-semibold">Status</th>
                    <th className="text-center p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {damagedProducts.map((product) => (
                    <tr key={product.id} className="border-t hover:bg-muted/30">
                      <td className="p-4 font-medium">{product.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{product.imei}</td>
                      <td className="p-4">{product.damageType}</td>
                      <td className="p-4">{product.damageDate}</td>
                      <td className="p-4 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.status === 'Returned' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
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
    </div>
  );
}
