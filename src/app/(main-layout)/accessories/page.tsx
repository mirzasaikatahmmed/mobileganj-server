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
import { mockProducts, categories } from "@/lib/mock-data";
import ProductCard from "../(home)/_components/ProductCard";
import { motion } from "framer-motion";
import {
  Headphones,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Package,
  Star,
  Heart,
  Search,
  ArrowRight,
  MessageCircle,
  Zap,
  Battery,
  Smartphone,
  Shield,
  Cable,
  Grid3X3,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
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

// ─── Category config ──────────────────────────────────────
const categoryConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  Accessories: {
    label: "এক্সেসরিজ",
    icon: Headphones,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  Charger: {
    label: "চার্জার",
    icon: Cable,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  Earphone: {
    label: "ইয়ারফোন",
    icon: Headphones,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  "Power Bank": {
    label: "পাওয়ার ব্যাংক",
    icon: Battery,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  Cover: {
    label: "কভার / কেস",
    icon: Smartphone,
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  Glass: {
    label: "গ্লাস প্রটেক্টর",
    icon: Shield,
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
};

export default function AccessoriesPage() {
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const accessoryProducts = useMemo(
    () => mockProducts.filter((p) => p.category !== "Phone"),
    [],
  );

  const accessoryCategories = useMemo(
    () => categories.filter((c) => c.name !== "Phone"),
    [],
  );

  const filteredProducts = useMemo(() => {
    const products =
      selectedCategory === "all"
        ? [...accessoryProducts]
        : accessoryProducts.filter((p) => p.category === selectedCategory);

    return products.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "discount":
          return (
            (b.offerPrice ? ((b.price - b.offerPrice) / b.price) * 100 : 0) -
            (a.offerPrice ? ((a.price - a.offerPrice) / a.price) * 100 : 0)
          );
        default:
          return 0;
      }
    });
  }, [sortBy, selectedCategory, accessoryProducts]);

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-fuchsia-700 via-purple-700 to-violet-700">
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
              <Headphones className="h-16 w-16" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-20 left-[10%] text-white/10"
            >
              <Battery className="h-14 w-14" />
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
              <Cable className="h-10 w-10" />
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
              <span className="text-white font-medium">এক্সেসরিজ</span>
            </motion.nav>

            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
                  <Headphones className="h-4 w-4 text-fuchsia-300" />
                  <span className="text-sm font-medium">
                    প্রিমিয়াম এক্সেসরিজ কালেকশন
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
              >
                মোবাইল{" "}
                <span className="relative">
                  এক্সেসরিজ
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2 text-fuchsia-300/50"
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
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
              >
                চার্জার, ইয়ারফোন, কভার, পাওয়ার ব্যাংক সহ সকল প্রিমিয়াম
                এক্সেসরিজ। আপনার মোবাইল অভিজ্ঞতাকে সম্পূর্ণ করুন!
              </motion.p>

              {/* Highlight badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                {[
                  { icon: ShieldCheck, text: "অরিজিনাল পণ্য" },
                  { icon: Truck, text: "ফ্রি ডেলিভারি" },
                  { icon: RotateCcw, text: "ইজি রিটার্ন" },
                  { icon: Star, text: "সেরা দাম" },
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
                icon: Package,
                value: accessoryProducts.length.toLocaleString("bn-BD") + "+",
                label: "এক্সেসরিজ স্টকে",
                color: "text-blue-500",
              },
              {
                icon: Grid3X3,
                value:
                  accessoryCategories.length.toLocaleString("bn-BD") + "টি",
                label: "ক্যাটাগরি",
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
                value: "৪.৯/৫",
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

      {/* ─── Category Cards ─── */}
      <section className="bg-muted/10 border-b border-border/40">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-6"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                ক্যাটাগরি অনুযায়ী ব্রাউজ করুন
              </Badge>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {/* All */}
            <motion.div variants={scaleIn}>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full rounded-2xl border p-4 text-center transition-all duration-300 group hover:shadow-md ${
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background border-border/60 hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110 ${
                    selectedCategory === "all" ? "bg-white/20" : "bg-muted"
                  }`}
                >
                  <Grid3X3
                    className={`h-5 w-5 ${
                      selectedCategory === "all"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p className="text-sm font-semibold">সকল</p>
                <p
                  className={`text-xs mt-0.5 ${
                    selectedCategory === "all"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {accessoryProducts.length.toLocaleString("bn-BD")}টি পণ্য
                </p>
              </button>
            </motion.div>

            {accessoryCategories.map((cat) => {
              const config = categoryConfig[cat.name];
              if (!config) return null;
              const isActive = selectedCategory === cat.name;
              const Icon = config.icon;

              return (
                <motion.div key={cat.name} variants={scaleIn}>
                  <button
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full rounded-2xl border p-4 text-center transition-all duration-300 group hover:shadow-md ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-background border-border/60 hover:border-primary/30"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? "bg-white/20" : config.bg
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-primary-foreground" : config.color
                        }`}
                      />
                    </div>
                    <p className="text-sm font-semibold">{config.label}</p>
                    <p
                      className={`text-xs mt-0.5 ${
                        isActive
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {cat.count.toLocaleString("bn-BD")}টি পণ্য
                    </p>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Products Section ─── */}
      <div className="container mx-auto px-4">
        <section className="py-8 sm:py-10">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6 gap-4 p-3 rounded-xl bg-muted/30 border border-border/40"
          >
            <p className="text-sm text-muted-foreground">
              মোট{" "}
              <span className="font-semibold text-foreground">
                {filteredProducts.length.toLocaleString("bn-BD")}টি
              </span>{" "}
              পণ্য পাওয়া গেছে
            </p>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] rounded-lg">
                <SelectValue placeholder="সাজান" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">নতুন আগে</SelectItem>
                <SelectItem value="popular">জনপ্রিয়</SelectItem>
                <SelectItem value="price-low">কম দাম আগে</SelectItem>
                <SelectItem value="price-high">বেশি দাম আগে</SelectItem>
                <SelectItem value="discount">সর্বোচ্চ ছাড়</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              key={selectedCategory + sortBy}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filteredProducts.map((product, idx) => (
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
                    এই ক্যাটাগরিতে কোনো পণ্য নেই
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                    অন্য ক্যাটাগরি দেখুন বা সকল এক্সেসরিজ ব্রাউজ করুন।
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSortBy("latest");
                    }}
                    className="rounded-full px-6 gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    সব এক্সেসরিজ দেখুন
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Browse More */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/shop">
                <Button variant="outline" className="rounded-full px-6 gap-2">
                  সম্পূর্ণ শপ দেখুন
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* ─── Why Buy Accessories ─── */}
        <section className="pb-12 sm:pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                কেন আমাদের এক্সেসরিজ?
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold"
            >
              এক্সেসরিজ কেনার সুবিধাসমূহ
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
                title: "অরিজিনাল ব্র্যান্ড",
                description:
                  "সকল এক্সেসরিজ অথরাইজড সোর্স থেকে সংগৃহীত। নকলের কোনো চান্স নেই।",
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-950/30",
              },
              {
                icon: Truck,
                title: "দ্রুত ডেলিভারি",
                description:
                  "৳৫০০+ অর্ডারে ফ্রি ডেলিভারি। ঢাকার ভেতরে ২৪ ঘণ্টায় পৌঁছে যায়।",
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
              },
              {
                icon: CreditCard,
                title: "সাশ্রয়ী মূল্য",
                description:
                  "বাজারের সেরা দামে অরিজিনাল এক্সেসরিজ। কম্বো অফারে বাড়তি ছাড়!",
                color: "text-violet-600",
                bg: "bg-violet-50 dark:bg-violet-950/30",
              },
              {
                icon: RotateCcw,
                title: "ওয়ারেন্টি ও রিটার্ন",
                description:
                  "সকল এক্সেসরিজে ওয়ারেন্টি। সমস্যা হলে সহজে রিটার্ন বা এক্সচেঞ্জ।",
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
      <section className="bg-gradient-to-br from-fuchsia-600/5 via-purple-600/10 to-violet-600/5 border-t border-border/40">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Headphones className="h-10 w-10 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              আপনার প্রয়োজনীয় এক্সেসরি খুঁজে পাননি?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8"
            >
              আমাদের জানান — যেকোনো ব্র্যান্ডের এক্সেসরিজ আমরা এনে দিতে পারি!
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
              <Link href="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2"
                >
                  <Package className="h-4.5 w-4.5" />
                  সম্পূর্ণ শপ দেখুন
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
