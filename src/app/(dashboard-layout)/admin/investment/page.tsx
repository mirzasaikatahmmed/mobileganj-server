'use client';

import { Plus, TrendingUp, Eye, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const investors = [
  { id: '1', name: 'Jamal Uddin', phone: '01712345678', amount: 500000, profitType: 'Fixed', monthlyProfit: 15000, totalPaid: 90000, remaining: 90000, status: 'Active' },
  { id: '2', name: 'Nadia Islam', phone: '01812345678', amount: 1000000, profitType: 'Share', profitPercent: 15, totalPaid: 180000, remaining: 0, status: 'Closed' },
];

export default function InvestmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Investment Management</h1>
          <p className="text-muted-foreground">Track investors & profit payouts</p>
        </div>
        <Link href="/admin/investment/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Investor
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Investors</p>
          <h3 className="text-2xl font-bold mt-1">8</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Investment</p>
          <h3 className="text-2xl font-bold mt-1">৳3,500,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Paid</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">৳520,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Remaining Payable</p>
          <h3 className="text-2xl font-bold mt-1 text-orange-600">৳180,000</h3>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Investor Name</th>
                <th className="text-left p-4 font-semibold">Phone</th>
                <th className="text-right p-4 font-semibold">Investment</th>
                <th className="text-left p-4 font-semibold">Profit Type</th>
                <th className="text-right p-4 font-semibold">Total Paid</th>
                <th className="text-right p-4 font-semibold">Remaining</th>
                <th className="text-center p-4 font-semibold">Status</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor) => (
                <tr key={investor.id} className="border-t hover:bg-muted/30">
                  <td className="p-4 font-medium">{investor.name}</td>
                  <td className="p-4 text-muted-foreground">{investor.phone}</td>
                  <td className="p-4 text-right font-semibold">৳{investor.amount.toLocaleString()}</td>
                  <td className="p-4">
                    {investor.profitType === 'Fixed' 
                      ? `Fixed (৳${investor.monthlyProfit?.toLocaleString()}/mo)` 
                      : `Share (${investor.profitPercent}%)`
                    }
                  </td>
                  <td className="p-4 text-right text-green-600">৳{investor.totalPaid.toLocaleString()}</td>
                  <td className="p-4 text-right text-orange-600 font-semibold">৳{investor.remaining.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      investor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {investor.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/investment/${investor.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      {investor.status === 'Active' && (
                        <Button variant="ghost" size="icon" className="text-green-600">
                          <DollarSign className="w-4 h-4" />
                        </Button>
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
