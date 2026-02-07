"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function BestDealsSection() {
  const bestDeals = mockProducts
    .filter((p) => p.tags?.includes("Best Deal") && p.category === "Phone")
    .slice(0, 4);

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10">
            <Flame className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Best <span className="text-red-600">Deals</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Don&apos;t miss these amazing discounts
            </p>
          </div>
        </div>
        <Link href="/shop?sort=discount">
          <Button variant="outline" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {bestDeals.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <ProductCard product={product} index={idx} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
