'use client';

import { useState } from 'react';
import { Search, Plus, Minus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  name: string;
  imei?: string;
  qty: number;
  price: number;
}

export default function ProductCart() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'iPhone 15 Pro Max', imei: '123456789012345', qty: 1, price: 145000 },
    { id: '2', name: 'AirPods Pro 2', qty: 2, price: 25500 },
  ]);

  const updateQty = (id: string, delta: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="card-base p-6 space-y-4">
      <h3 className="font-semibold text-lg">Products</h3>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search by product name or IMEI..." className="pl-10" />
      </div>

      {/* Cart Items */}
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              {item.imei && (
                <p className="text-xs text-muted-foreground">IMEI: {item.imei}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => updateQty(item.id, -1)}
                disabled={item.qty === 1}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-medium">{item.qty}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => updateQty(item.id, 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-right min-w-[100px]">
              <p className="font-semibold">৳{(item.price * item.qty).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">৳{item.price.toLocaleString()} each</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive"
              onClick={() => removeItem(item.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="pt-3 border-t">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>৳{subtotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
