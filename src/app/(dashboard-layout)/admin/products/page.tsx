'use client';

import Link from 'next/link';
import { Plus, Search, Filter, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const products = [
  { id: '1', name: 'iPhone 15 Pro Max', category: 'Phone', type: 'Overseas', imei: '123456789012345', purchase: 139000, selling: 145000, stock: 5, status: 'In Stock' },
  { id: '2', name: 'Samsung S24 Ultra', category: 'Phone', type: 'Overseas', imei: '987654321098765', purchase: 129000, selling: 135000, stock: 3, status: 'In Stock' },
  { id: '3', name: 'AirPods Pro 2', category: 'Accessories', type: '—', imei: '—', purchase: 22000, selling: 25500, stock: 15, status: 'In Stock' },
  { id: '4', name: 'iPhone 14 Pro', category: 'Phone', type: 'Local', imei: '456789012345678', purchase: 95000, selling: 105000, stock: 0, status: 'Out of Stock' },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your inventory</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/damage">
            <Button variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Damage Tracking
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <h3 className="text-2xl font-bold mt-1">248</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Stock</p>
          <h3 className="text-2xl font-bold mt-1">1,245</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Low Stock</p>
          <h3 className="text-2xl font-bold mt-1 text-orange-600">12</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Out of Stock</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">5</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="card-base p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name, IMEI, supplier..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Stock Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">SL</th>
                <th className="text-left p-4 font-semibold">Product Name</th>
                <th className="text-left p-4 font-semibold">Category</th>
                <th className="text-left p-4 font-semibold">Type</th>
                <th className="text-left p-4 font-semibold">IMEI</th>
                <th className="text-right p-4 font-semibold">Purchase</th>
                <th className="text-right p-4 font-semibold">Selling</th>
                <th className="text-center p-4 font-semibold">Stock</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.type}</td>
                  <td className="p-4 text-sm text-muted-foreground">{product.imei}</td>
                  <td className="p-4 text-right">৳{product.purchase.toLocaleString()}</td>
                  <td className="p-4 text-right">৳{product.selling.toLocaleString()}</td>
                  <td className="p-4 text-center">{product.stock}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
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
