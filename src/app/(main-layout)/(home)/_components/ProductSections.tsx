'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProducts } from '@/lib/mock-data';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductSections() {
  const newArrivals = mockProducts.filter((p) => p.tags?.includes('New Arrival'));
  const trending = mockProducts.filter((p) => p.tags?.includes('Trending'));
  const bestDeals = mockProducts.filter((p) => p.tags?.includes('Best Deal'));

  return (
    <section className="py-12">
      <Tabs defaultValue="new" className="w-full">
        <div className="flex items-center justify-between mb-8">
          <TabsList>
            <TabsTrigger value="new">New Arrival</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="deals">Best Deals</TabsTrigger>
          </TabsList>
          <Link href="/shop">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <TabsContent value="new">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deals">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestDeals.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
