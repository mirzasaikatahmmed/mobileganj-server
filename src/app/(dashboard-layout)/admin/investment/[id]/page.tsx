'use client';

import { ArrowLeft, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const payouts = [
  { id: '1', date: '2024-01-29', amount: 15000, method: 'Cash', note: 'Monthly profit' },
  { id: '2', date: '2023-12-29', amount: 15000, method: 'bKash', note: 'Monthly profit' },
  { id: '3', date: '2023-11-29', amount: 15000, method: 'Bank', note: 'Monthly profit' },
];

export default function InvestorDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/investment">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Investor Details</h1>
            <p className="text-muted-foreground">Jamal Uddin</p>
          </div>
        </div>
        <Button>
          <DollarSign className="w-4 h-4 mr-2" />
          Pay Profit
        </Button>
      </div>

      {/* Investor Info */}
      <div className="card-base p-6">
        <h3 className="font-semibold text-lg mb-4">Investor Information</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">Jamal Uddin</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">01712345678</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Investment Date</p>
            <p className="font-medium">2024-01-01</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Profit Type</p>
            <p className="font-medium">Fixed (৳15,000/mo)</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Investment Amount</p>
          <h3 className="text-2xl font-bold mt-1">৳500,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Total Paid</p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">৳90,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Remaining</p>
          <h3 className="text-2xl font-bold mt-1 text-orange-600">৳90,000</h3>
        </div>
        <div className="card-base p-4">
          <p className="text-sm text-muted-foreground">Status</p>
          <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
            Active
          </span>
        </div>
      </div>

      {/* Payout History */}
      <div className="card-base p-6">
        <h3 className="font-semibold text-lg mb-4">Payout History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Date</th>
                <th className="text-right p-4 font-semibold">Amount</th>
                <th className="text-left p-4 font-semibold">Method</th>
                <th className="text-left p-4 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} className="border-t hover:bg-muted/30">
                  <td className="p-4">{payout.date}</td>
                  <td className="p-4 text-right font-semibold text-green-600">৳{payout.amount.toLocaleString()}</td>
                  <td className="p-4">{payout.method}</td>
                  <td className="p-4 text-muted-foreground">{payout.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
