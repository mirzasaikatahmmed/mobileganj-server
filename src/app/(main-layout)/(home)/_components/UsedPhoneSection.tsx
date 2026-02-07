"use client";

import Link from "next/link";
import {
  ArrowRight,
  Recycle,
  Check,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Mock used phones (in real app, these would come from API)
const usedPhones = [
  {
    id: "u1",
    name: "iPhone 14 Pro Max",
    slug: "used-iphone-14-pro-max",
    image: "/products/iphone-14-pro-max.jpg",
    originalPrice: 115000,
    price: 85000,
    condition: "Like New",
    battery: "92%",
    storage: "256GB",
    color: "Deep Purple",
  },
  {
    id: "u2",
    name: "Samsung S23 Ultra",
    slug: "used-samsung-s23-ultra",
    image: "/products/samsung-s23-ultra.jpg",
    originalPrice: 115000,
    price: 78000,
    condition: "Like New",
    battery: "89%",
    storage: "256GB",
    color: "Phantom Black",
  },
  {
    id: "u3",
    name: "iPhone 13 Pro",
    slug: "used-iphone-13-pro",
    image: "/products/iphone-15-pro.jpg",
    originalPrice: 95000,
    price: 58000,
    condition: "Used",
    battery: "85%",
    storage: "128GB",
    color: "Graphite",
  },
  {
    id: "u4",
    name: "Google Pixel 7 Pro",
    slug: "used-google-pixel-7-pro",
    image: "/products/google-pixel-7-pro.jpg",
    originalPrice: 79000,
    price: 42000,
    condition: "Used",
    battery: "88%",
    storage: "128GB",
    color: "Obsidian",
  },
];

export default function UsedPhoneSection() {
  return (
    <section className="py-12">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20 border border-emerald-100 dark:border-emerald-900/30 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white">
              <Recycle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Used <span className="text-emerald-600">Phones</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Quality checked & verified — Save up to 50%
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/sell-phone">
              <Button
                variant="outline"
                className="gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/50"
              >
                <MessageCircle className="w-4 h-4" />
                Sell Your Phone
              </Button>
            </Link>
            <Link href="/buy-phone">
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                Buy Used <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { icon: Check, text: "Quality Inspected" },
            { icon: ShieldCheck, text: "7-Day Return" },
            { icon: Check, text: "Battery Health Checked" },
            { icon: Check, text: "IMEI Verified" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-white/60 dark:bg-white/5 px-3 py-1.5 rounded-full"
            >
              <badge.icon className="w-3.5 h-3.5" />
              {badge.text}
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {usedPhones.map((phone, idx) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/product/${phone.slug}`} className="group block">
                <div className="rounded-xl overflow-hidden bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px]">
                      {phone.condition}
                    </Badge>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-md">
                      🔋 {phone.battery}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {phone.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 mb-2">
                      <span className="text-xs text-muted-foreground">
                        {phone.storage}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {phone.color}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-emerald-600">
                        ৳{phone.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ৳{phone.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-600 font-medium mt-1">
                      Save ৳
                      {(phone.originalPrice - phone.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
