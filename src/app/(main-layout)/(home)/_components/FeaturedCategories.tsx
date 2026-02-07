'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/lib/mock-data';

export default function FeaturedCategories() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          Featured <span className="text-primary">Categories</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              href={`/shop?category=${category.name}`}
              className="block p-6 rounded-lg shadow-md bg-card hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-3 text-center">{category.icon}</div>
              <h3 className="font-semibold text-center text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground text-center">{category.count} items</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
