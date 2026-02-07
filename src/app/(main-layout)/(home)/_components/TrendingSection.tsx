"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function TrendingSection() {
  const trending = mockProducts
    .filter((p) => p.tags?.includes("Trending"))
    .slice(0, 4);

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-orange-600">Trending</span> Now
            </h2>
            <p className="text-sm text-muted-foreground">
              Most popular picks this week
            </p>
          </div>
        </div>
        <Link href="/shop?sort=popular">
          <Button variant="outline" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {trending.map((product, idx) => (
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
