'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const dueList = [
  { id: '1', customer: 'Fatima Rahman', amount: 45000, dueDate: '2024-02-05' },
  { id: '2', customer: 'Rahim Khan', amount: 32000, dueDate: '2024-02-10' },
  { id: '3', customer: 'Ayesha Begum', amount: 28000, dueDate: '2024-02-15' },
  { id: '4', customer: 'Jamal Uddin', amount: 15000, dueDate: '2024-02-20' },
  { id: '5', customer: 'Nadia Islam', amount: 52000, dueDate: '2024-02-25' },
];

export default function DueList() {
  return (
    <div className="card-base p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Due Payments
        </h3>
        <Link href="/customers?filter=due">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </div>
      <div className="space-y-3">
        {dueList.map((due, index) => (
          <motion.div
            key={due.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium">{due.customer}</p>
              <p className="text-xs text-muted-foreground">Due: {due.dueDate}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-600">৳{due.amount.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
