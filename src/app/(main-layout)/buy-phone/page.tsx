"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "../(home)/_components/ProductCard";
import FilterSidebar from "../shop/_components/FilterSidebar";
import { motion } from "framer-motion";
import {
  Smartphone,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Package,
  Star,
  Heart,
  Grid3X3,
  LayoutGrid,
  Search,
  ArrowRight,
  Phone,
  MessageCircle,
  Zap,
  BadgeCheck,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as const,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export default function BuyPhonePage() {
  const [sortBy, setSortBy] = useState("latest");

  const phoneProducts = useMemo(() => {
    const phones = mockProducts.filter((p) => p.category === "Phone");

    return [...phones].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    });
  }, [sortBy]);

  // Get unique brands from phone products
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockProducts
      .filter((p) => p.category === "Phone")
      .forEach((p) => {
        counts[p.brand] = (counts[p.brand] || 0) + 1;
      });
    return counts;
  }, []);

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

            {/* Floating icons */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-16 right-[15%] text-white/10"
            >
              <Smartphone className="h-16 w-16" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-20 left-[10%] text-white/10"
            >
              <Package className="h-14 w-14" />
            </motion.div>
            <motion.div
              animate={{ y: [-5, 12, -5] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="absolute top-1/3 right-[35%] text-white/8"
            >
              <Star className="h-10 w-10" />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 relative text-white">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-white/60 mb-8"
            >
              <Link href="/" className="hover:text-white transition-colors">
                হোম
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white font-medium">ফোন কিনুন</span>
            </motion.nav>

            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  <span className="text-sm font-medium">
                    প্রিমিয়াম স্মার্টফোন কালেকশন
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
              >
                আপনার পছন্দের{" "}
                <span className="relative">
                  স্মার্টফোন
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2 text-cyan-300/50"
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M1 5.5Q50 1 100 5.5Q150 10 199 3"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                কিনুন
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
              >
                শীর্ষ ব্র্যান্ডের প্রিমিয়াম স্মার্টফোন কালেকশন। সকল পণ্য ১০০%
                অরিজিনাল ও ওয়ারেন্টি সহ।
              </motion.p>

              {/* Highlight badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                {[
                  { icon: ShieldCheck, text: "১০০% অরিজিনাল" },
                  { icon: Truck, text: "ফ্রি ডেলিভারি" },
                  { icon: RotateCcw, text: "ইজি রিটার্ন" },
                  { icon: CreditCard, text: "EMI সুবিধা" },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10 text-sm"
                  >
                    <badge.icon className="h-3.5 w-3.5" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {[
              {
                icon: Smartphone,
                value: `${phoneProducts.length}+`,
                label: "ফোন স্টকে আছে",
                color: "text-blue-500",
              },
              {
                icon: BadgeCheck,
                value: `${Object.keys(brandCounts).length}+`,
                label: "ব্র্যান্ড পাওয়া যায়",
                color: "text-emerald-500",
              },
              {
                icon: ShieldCheck,
                value: "১০০%",
                label: "অরিজিনাল গ্যারান্টি",
                color: "text-amber-500",
              },
              {
                icon: Star,
                value: "৪.৮/৫",
                label: "গ্রাহক রেটিং",
                color: "text-rose-500",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className={`flex flex-col items-center justify-center py-8 sm:py-10 ${
                  i < 3 ? "border-r border-border/40" : ""
                }`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 text-center px-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Brand Chips ─── */}
      <section className="border-b border-border/40 bg-muted/10">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar"
          >
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              জনপ্রিয় ব্র্যান্ড:
            </span>
            {Object.entries(brandCounts).map(([brand, count]) => (
              <button
                key={brand}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-background hover:bg-muted hover:border-primary/30 transition-all text-sm whitespace-nowrap"
              >
                <span className="font-medium">{brand}</span>
                <span className="text-xs text-muted-foreground">({count})</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Main Content: Filter + Products ─── */}
      <div className="container mx-auto px-4">
        <section className="py-8 sm:py-10">
          <div className="flex gap-6 lg:gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <Card className="rounded-2xl border-border/60 overflow-hidden">
                  <div className="bg-muted/30 px-4 py-3 border-b border-border/40">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-primary" />
                      ফিল্টার
                    </h3>
                  </div>
                  <CardContent className="p-0">
                    <FilterSidebar />
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Products Area */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6 gap-4 p-3 rounded-xl bg-muted/30 border border-border/40"
              >
                <div className="flex items-center gap-3">
                  {/* Mobile Filter */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="lg:hidden gap-2 rounded-lg"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        ফিল্টার
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <FilterSidebar isMobile onClose={() => {}} />
                    </SheetContent>
                  </Sheet>

                  <p className="text-sm text-muted-foreground">
                    মোট{" "}
                    <span className="font-semibold text-foreground">
                      {phoneProducts.length.toLocaleString("bn-BD")}টি
                    </span>{" "}
                    ফোন পাওয়া গেছে
                  </p>
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] rounded-lg">
                    <SelectValue placeholder="সাজান" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">নতুন আগে</SelectItem>
                    <SelectItem value="popular">জনপ্রিয়</SelectItem>
                    <SelectItem value="price-low">কম দাম আগে</SelectItem>
                    <SelectItem value="price-high">বেশি দাম আগে</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Products Grid */}
              {phoneProducts.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {phoneProducts.map((product, idx) => (
                    <motion.div key={product.id} variants={scaleIn}>
                      <ProductCard product={product} index={idx} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="rounded-2xl border-border/60">
                    <CardContent className="py-16 text-center">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Search className="h-10 w-10 text-muted-foreground/40" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        কোনো ফোন পাওয়া যায়নি
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                        আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন বা আমাদের শপ
                        ভিজিট করুন।
                      </p>
                      <Link href="/shop">
                        <Button className="rounded-full px-6 gap-2">
                          <Package className="h-4 w-4" />
                          সব পণ্য দেখুন
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Browse More */}
              {phoneProducts.length > 0 && (
                <div className="text-center mt-8">
                  <Link href="/shop">
                    <Button
                      variant="outline"
                      className="rounded-full px-6 gap-2"
                    >
                      সব পণ্য দেখুন
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─── Why Buy From Us ─── */}
        <section className="pb-12 sm:pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                কেন আমরা?
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold"
            >
              আমাদের কাছ থেকে কেন কিনবেন?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: ShieldCheck,
                title: "১০০% অরিজিনাল",
                description:
                  "প্রতিটি পণ্য সরাসরি অথরাইজড সোর্স থেকে সংগ্রহ করা। নকলের কোনো সুযোগ নেই।",
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-950/30",
              },
              {
                icon: Truck,
                title: "ফ্রি ও দ্রুত ডেলিভারি",
                description:
                  "৳৫,০০০+ অর্ডারে সম্পূর্ণ ফ্রি ডেলিভারি। ঢাকায় একই দিনে পৌঁছে যায়।",
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
              },
              {
                icon: CreditCard,
                title: "সহজ EMI সুবিধা",
                description:
                  "০% সুদে ৩-১২ মাসের EMI সুবিধা পাবেন। কিস্তিতে কিনুন সহজেই।",
                color: "text-violet-600",
                bg: "bg-violet-50 dark:bg-violet-950/30",
              },
              {
                icon: RotateCcw,
                title: "সহজ রিটার্ন পলিসি",
                description:
                  "পণ্যে কোনো সমস্যা থাকলে ৭ দিনের মধ্যে সহজেই রিটার্ন বা এক্সচেঞ্জ।",
                color: "text-orange-600",
                bg: "bg-orange-50 dark:bg-orange-950/30",
              },
            ].map((feature) => (
              <motion.div key={feature.title} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
                  <CardContent className="p-5">
                    <div
                      className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-sm mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-gradient-to-br from-blue-600/5 via-indigo-600/10 to-violet-600/5 border-t border-border/40">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Smartphone className="h-10 w-10 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              আপনার পছন্দের ফোন খুঁজে পাননি?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8"
            >
              আমাদের জানান — যেকোনো ব্র্যান্ড বা মডেলের ফোন আমরা আনতে পারি।
              প্রি-অর্ডারও করতে পারেন!
            </motion.p>
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <MessageCircle className="h-4.5 w-4.5" />
                  হোয়াটসঅ্যাপে জানান
                </Button>
              </a>
              <Link href="/pre-order">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2"
                >
                  <Zap className="h-4.5 w-4.5" />
                  প্রি-অর্ডার করুন
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              custom={4}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {[
                { icon: ShieldCheck, text: "অরিজিনাল পণ্য" },
                { icon: Truck, text: "ফ্রি ডেলিভারি" },
                { icon: RotateCcw, text: "ইজি রিটার্ন" },
                { icon: Heart, text: "৫,০০০+ গ্রাহক" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <badge.icon className="h-4 w-4 text-primary" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
