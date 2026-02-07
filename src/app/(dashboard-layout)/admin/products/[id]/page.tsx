'use client';

import { ArrowLeft, Edit2, Trash2, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Product Details</h1>
            <p className="text-muted-foreground">View & edit product information</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(false)}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="card-base p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Product Name</Label>
            <Input defaultValue="iPhone 15 Pro Max" disabled={!isEditing} />
          </div>
          <div>
            <Label>Brand</Label>
            <Input defaultValue="Apple" disabled={!isEditing} />
          </div>
          <div>
            <Label>Category</Label>
            <Input defaultValue="Phone" disabled />
          </div>
          <div>
            <Label>Type</Label>
            <Input defaultValue="Overseas" disabled />
          </div>
          <div>
            <Label>IMEI 1</Label>
            <Input defaultValue="123456789012345" disabled />
          </div>
          <div>
            <Label>IMEI 2</Label>
            <Input defaultValue="987654321098765" disabled />
          </div>
          <div>
            <Label>Purchase Price (৳)</Label>
            <Input type="number" defaultValue="139000" disabled={!isEditing} />
          </div>
          <div>
            <Label>Selling Price (৳)</Label>
            <Input type="number" defaultValue="145000" disabled={!isEditing} />
          </div>
          <div>
            <Label>Stock Quantity</Label>
            <Input type="number" defaultValue="5" disabled={!isEditing} />
          </div>
          <div>
            <Label>Status</Label>
            <Input defaultValue="In Stock" disabled />
          </div>
        </div>
      </div>
    </div>
  );
}
