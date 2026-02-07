'use client';

import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const recentSales = [
  { id: 'INV-001', customer: 'Karim Ahmed', amount: 145000, status: 'Paid' },
  { id: 'INV-002', customer: 'Fatima Rahman', amount: 89000, status: 'Due' },
  { id: 'INV-003', customer: 'Rahim Khan', amount: 25500, status: 'Paid' },
  { id: 'INV-004', customer: 'Ayesha Begum', amount: 129000, status: 'Partial' },
  { id: 'INV-005', customer: 'Jamal Uddin', amount: 45000, status: 'Paid' },
];

export default function RecentSales() {
  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Sales</h3>
        <Link href="/admin/sales">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>
      <div className="space-y-3">
        {recentSales.map((sale, index) => (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium">{sale.id}</p>
              <p className="text-sm text-muted-foreground">{sale.customer}</p>
            </div>
            <div className="text-right mr-3">
              <p className="font-semibold">৳{sale.amount.toLocaleString()}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                sale.status === 'Paid' ? 'bg-green-100 text-green-700' :
                sale.status === 'Due' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {sale.status}
              </span>
            </div>
            <Button variant="ghost" size="icon">
              <Eye className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
