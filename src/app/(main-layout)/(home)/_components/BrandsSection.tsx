"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const brands = [
  {
    name: "Apple",
    logo: "🍎",
    count: 8,
    slug: "Apple",
    color: "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
  },
  {
    name: "Samsung",
    logo: "📱",
    count: 5,
    slug: "Samsung",
    color: "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40",
  },
  {
    name: "Google",
    logo: "🔍",
    count: 3,
    slug: "Google",
    color:
      "from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/40",
  },
  {
    name: "OnePlus",
    logo: "🔴",
    count: 1,
    slug: "Others",
    color: "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/40",
  },
  {
    name: "Xiaomi",
    logo: "🟠",
    count: 1,
    slug: "Others",
    color:
      "from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/40",
  },
];

export default function BrandsSection() {
  return (
    <section className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Shop by <span className="text-primary">Brand</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          All brands, one destination
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {brands.map((brand, idx) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <Link
              href={`/shop?brand=${brand.slug}`}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-br ${brand.color} border hover:shadow-lg transition-all hover:-translate-y-1 min-w-[160px]`}
            >
              <span className="text-3xl">{brand.logo}</span>
              <div>
                <p className="font-bold text-sm">{brand.name}</p>
                <p className="text-xs text-muted-foreground">
                  {brand.count}+ models
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
