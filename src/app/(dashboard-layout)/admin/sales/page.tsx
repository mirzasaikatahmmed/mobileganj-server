'use client';

import Link from 'next/link';
import { Plus, Search, Eye, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const sales = [
  { id: 'INV-001', date: '2024-01-29', customer: 'Karim Ahmed', phone: '01712345678', total: 145000, paid: 145000, due: 0, status: 'Paid' },
  { id: 'INV-002', date: '2024-01-29', customer: 'Fatima Rahman', phone: '01812345678', total: 89000, paid: 50000, due: 39000, status: 'Partial' },
  { id: 'INV-003', date: '2024-01-28', customer: 'Rahim Khan', phone: '01912345678', total: 25500, paid: 25500, due: 0, status: 'Paid' },
  { id: 'INV-004', date: '2024-01-28', customer: 'Ayesha Begum', phone: '01612345678', total: 129000, paid: 0, due: 129000, status: 'Due' },
];

export default function SalesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>
          <p className="text-muted-foreground">Manage all sales & invoices</p>
        </div>
        <Link href="/admin/sales/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Sales</p>
          <h3 className="text-2xl font-bold mt-1">৳1,250,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Paid</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">৳980,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Due</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">৳270,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Invoices</p>
          <h3 className="text-2xl font-bold mt-1">248</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by invoice, customer, phone..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial Paid</SelectItem>
              <SelectItem value="due">Due</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className="w-[180px]" />
        </div>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Invoice No</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-left p-4 font-semibold">Customer</th>
                <th className="text-left p-4 font-semibold">Phone</th>
                <th className="text-right p-4 font-semibold">Total</th>
                <th className="text-right p-4 font-semibold">Paid</th>
                <th className="text-right p-4 font-semibold">Due</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <motion.tr
                  key={sale.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 font-mono font-medium">{sale.id}</td>
                  <td className="p-4">{sale.date}</td>
                  <td className="p-4 font-medium">{sale.customer}</td>
                  <td className="p-4 text-muted-foreground">{sale.phone}</td>
                  <td className="p-4 text-right font-semibold">৳{sale.total.toLocaleString()}</td>
                  <td className="p-4 text-right text-green-600">৳{sale.paid.toLocaleString()}</td>
                  <td className="p-4 text-right text-red-600">৳{sale.due.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      sale.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      sale.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/sales/${sale.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
