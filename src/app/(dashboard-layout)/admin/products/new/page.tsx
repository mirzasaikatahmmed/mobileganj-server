'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import CategoryStep from '../_components/CategoryStep';
import PhoneTypeStep from '../_components/PhoneTypeStep';
import OverseasPhoneForm from '../_components/OverseasPhoneForm';
import LocalPhoneForm from '../_components/LocalPhoneForm';
import AccessoriesForm from '../_components/AccessoriesForm';

export default function NewProductPage() {
  const [category, setCategory] = useState<'phone' | 'accessories' | null>(null);
  const [phoneType, setPhoneType] = useState<'overseas' | 'local' | null>(null);

  const handleCategorySelect = (cat: 'phone' | 'accessories') => {
    setCategory(cat);
    setPhoneType(null);
  };

  const handleReset = () => {
    setCategory(null);
    setPhoneType(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground">Stock in new product to inventory</p>
          </div>
        </div>
        {category && (
          <Button variant="outline" onClick={handleReset}>
            Reset Selection
          </Button>
        )}
      </div>

      {/* Step 1: Category Selection */}
      {!category && (
        <CategoryStep selected={category} onSelect={handleCategorySelect} />
      )}

      {/* Step 2: Phone Type (Only for Phone) */}
      {category === 'phone' && !phoneType && (
        <PhoneTypeStep selected={phoneType} onSelect={setPhoneType} />
      )}

      {/* Step 3: Forms */}
      {category === 'phone' && phoneType === 'overseas' && <OverseasPhoneForm />}
      {category === 'phone' && phoneType === 'local' && <LocalPhoneForm />}
      {category === 'accessories' && <AccessoriesForm />}
    </div>
  );
}
