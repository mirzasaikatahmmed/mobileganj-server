'use client';

import Link from 'next/link';
import { Plus, UserPlus, DollarSign, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickActions = [
  { icon: Plus, label: 'Add Sale', href: '/admin/sales/new', color: 'bg-green-500 hover:bg-green-600' },
  { icon: UserPlus, label: 'Add Customer', href: '/admin/customers/new', color: 'bg-blue-500 hover:bg-blue-600' },
  { icon: DollarSign, label: 'Add Expense', href: '/admin/expense/new', color: 'bg-orange-500 hover:bg-orange-600' },
  { icon: Package, label: 'Add Stock', href: '/admin/products/new', color: 'bg-purple-500 hover:bg-purple-600' },
];

export default function QuickActions() {
  return (
    <div className="card-base p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}>
              <Button 
                className={`w-full h-auto py-4 flex-col gap-2 ${action.color} text-white`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
