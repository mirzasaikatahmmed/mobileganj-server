'use client';

import { ArrowLeft, Eye, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const invoices = [
  { id: 'INV-001', date: '2024-01-29', total: 145000, paid: 145000, due: 0, status: 'Paid' },
  { id: 'INV-005', date: '2024-01-25', total: 89000, paid: 50000, due: 39000, status: 'Partial' },
  { id: 'INV-012', date: '2024-01-20', total: 25500, paid: 25500, due: 0, status: 'Paid' },
];

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/customers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Customer Details</h1>
            <p className="text-muted-foreground">Karim Ahmed</p>
          </div>
        </div>
        <Link href="/admin/customers/due-collection">
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            Collect Due
          </Button>
        </Link>
      </div>

      {/* Customer Info */}
      <div className="card-base p-6">
        <h3 className="font-semibold text-lg mb-4">Customer Information</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">Karim Ahmed</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">01712345678</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Purchase</p>
          <h3 className="text-2xl font-bold mt-1">৳259,500</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Paid</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">৳220,500</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Due</p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">৳39,000</h3>
        </div>
      </div>

      {/* Invoice History */}
      <div className="card-base p-6">
        <h3 className="font-semibold text-lg mb-4">Invoice History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Invoice No</th>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-right p-4 font-semibold">Total</th>
                <th className="text-right p-4 font-semibold">Paid</th>
                <th className="text-right p-4 font-semibold">Due</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t hover:bg-muted/30">
                  <td className="p-4 font-mono font-medium">{invoice.id}</td>
                  <td className="p-4">{invoice.date}</td>
                  <td className="p-4 text-right font-semibold">৳{invoice.total.toLocaleString()}</td>
                  <td className="p-4 text-right text-green-600">৳{invoice.paid.toLocaleString()}</td>
                  <td className="p-4 text-right text-red-600">৳{invoice.due.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      invoice.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link href={`/admin/sales/${invoice.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
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
