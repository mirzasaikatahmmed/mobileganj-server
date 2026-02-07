'use client';

import { Plus, Calendar, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const expenses = [
  { id: '1', date: '2024-01-29', category: 'Shop Rent', amount: 50000, method: 'Cash', type: 'Fixed', note: 'January rent' },
  { id: '2', date: '2024-01-28', category: 'Staff Salary', amount: 35000, method: 'Bank', type: 'Fixed', note: 'Monthly salary' },
  { id: '3', date: '2024-01-27', category: 'Transport', amount: 2500, method: 'Cash', type: 'Unfixed', note: 'Product delivery' },
];

export default function ExpensePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Expense Management</h1>
        <p className="text-muted-foreground">Track all business expenses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Expense</p>
          <h3 className="text-2xl font-bold mt-1">৳185,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">This Month</p>
          <h3 className="text-2xl font-bold mt-1">৳87,500</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Today</p>
          <h3 className="text-2xl font-bold mt-1">৳2,500</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Expense Form */}
        <div className="card-base p-6 space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Expense
          </h3>

          <div>
            <Label>Expense Date *</Label>
            <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
          </div>

          <div>
            <Label>Category *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Shop Rent</SelectItem>
                <SelectItem value="salary">Staff Salary</SelectItem>
                <SelectItem value="electricity">Electricity Bill</SelectItem>
                <SelectItem value="internet">Internet / WiFi</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="maintenance">Shop Maintenance</SelectItem>
                <SelectItem value="marketing">Marketing / Ads</SelectItem>
                <SelectItem value="packaging">Packaging</SelectItem>
                <SelectItem value="misc">Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Expense Type *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="unfixed">Unfixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Amount (৳) *</Label>
            <Input type="number" placeholder="0" required />
          </div>

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

          <div>
            <Label>Note</Label>
            <Textarea placeholder="Additional notes..." rows={2} />
          </div>

          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Expense List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="card-base p-4">
            <div className="flex gap-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="rent">Shop Rent</SelectItem>
                  <SelectItem value="salary">Staff Salary</SelectItem>
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
                    <th className="text-left p-4 font-semibold">Date</th>
                    <th className="text-left p-4 font-semibold">Category</th>
                    <th className="text-left p-4 font-semibold">Type</th>
                    <th className="text-right p-4 font-semibold">Amount</th>
                    <th className="text-left p-4 font-semibold">Method</th>
                    <th className="text-center p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">{expense.date}</td>
                      <td className="p-4 font-medium">{expense.category}</td>
                      <td className="p-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          expense.type === 'Fixed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {expense.type}
                        </span>
                      </td>
                      <td className="p-4 text-right font-semibold">৳{expense.amount.toLocaleString()}</td>
                      <td className="p-4">{expense.method}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
