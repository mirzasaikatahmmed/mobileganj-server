"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";
import { motion } from "framer-motion";

export default function BrandNewPhoneSection() {
  const brandNewPhones = mockProducts
    .filter((p) => p.condition === "Brand New" && p.category === "Phone")
    .slice(0, 6);

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <Smartphone className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Brand New <span className="text-blue-600">Phones</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Factory sealed, 100% original with warranty
            </p>
          </div>
        </div>
        <Link href="/shop?condition=new">
          <Button variant="outline" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Brand new info banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-100 dark:border-blue-900/50"
      >
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Official Warranty</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <span className="text-muted-foreground">Factory Sealed Box</span>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <span className="text-muted-foreground">USA / UK / Dubai Import</span>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <span className="text-muted-foreground">EMI Available</span>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {brandNewPhones.map((phone, idx) => (
          <motion.div
            key={phone.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <Link href={`/product/${phone.slug}`} className="group block">
              <div className="rounded-xl overflow-hidden bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <Image
                    src={phone.images[0] || "/placeholder.jpg"}
                    alt={phone.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-[10px]">
                    Brand New
                  </Badge>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                    {phone.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {phone.brand}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    {phone.offerPrice ? (
                      <>
                        <span className="text-sm font-bold text-blue-600">
                          ৳{phone.offerPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          ৳{phone.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold">
                        ৳{phone.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
