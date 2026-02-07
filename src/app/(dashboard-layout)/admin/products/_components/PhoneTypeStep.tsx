'use client';

import { Plane, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneTypeStepProps {
  selected: 'overseas' | 'local' | null;
  onSelect: (type: 'overseas' | 'local') => void;
}

export default function PhoneTypeStep({ selected, onSelect }: PhoneTypeStepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Phone Type</h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onSelect('overseas')}
          className={cn(
            "p-8 rounded-lg border-2 transition-all hover:shadow-lg",
            selected === 'overseas' 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
        >
          <Plane className="w-12 h-12 mx-auto mb-3 text-primary" />
          <h4 className="font-semibold text-lg">Overseas Phone</h4>
          <p className="text-sm text-muted-foreground mt-1">From supplier (Dubai/International)</p>
        </button>

        <button
          onClick={() => onSelect('local')}
          className={cn(
            "p-8 rounded-lg border-2 transition-all hover:shadow-lg",
            selected === 'local' 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          )}
        >
          <MapPin className="w-12 h-12 mx-auto mb-3 text-primary" />
          <h4 className="font-semibold text-lg">Local Phone</h4>
          <p className="text-sm text-muted-foreground mt-1">From local seller (Used/New)</p>
        </button>
      </div>
    </div>
  );
}
