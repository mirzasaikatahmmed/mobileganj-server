'use client';

import { Smartphone, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryStepProps {
  selected: 'phone' | 'accessories' | null;
  onSelect: (category: 'phone' | 'accessories') => void;
}

export default function CategoryStep({ selected, onSelect }: CategoryStepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Product Category</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('phone')}
          className={cn(
            "p-8 rounded-lg border-2 transition-all hover:shadow-lg",
            selected === 'phone' 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
        >
          <Smartphone className="w-12 h-12 mx-auto mb-3 text-primary" />
          <h4 className="font-semibold text-lg">Phone</h4>
          <p className="text-sm text-muted-foreground mt-1">Add mobile phones with IMEI</p>
        </button>

        <button
          onClick={() => onSelect('accessories')}
          className={cn(
            "p-8 rounded-lg border-2 transition-all hover:shadow-lg",
            selected === 'accessories' 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
        >
          <Headphones className="w-12 h-12 mx-auto mb-3 text-primary" />
          <h4 className="font-semibold text-lg">Accessories</h4>
          <p className="text-sm text-muted-foreground mt-1">Add accessories & gadgets</p>
        </button>
      </div>
    </div>
  );
}
