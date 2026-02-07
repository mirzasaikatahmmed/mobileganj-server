"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "../(home)/_components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Percent,
  Clock,
  ChevronRight,
  Flame,
  Tag,
  Zap,
  TrendingDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Package,
  Sparkles,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  Gift,
  Timer,
  Heart,
  Star,
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

// ─── Countdown Timer Component ────────────────────────────
function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
        <span className="text-xl sm:text-2xl font-bold tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs mt-1.5 text-white/70 font-medium">
        {label}
      </span>
    </div>
  );
}

// ─── Sort Options ─────────────────────────────────────────
type SortOption = "discount" | "price-low" | "price-high" | "newest";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "discount", label: "সর্বোচ্চ ছাড়" },
  { value: "price-low", label: "কম দাম" },
  { value: "price-high", label: "বেশি দাম" },
  { value: "newest", label: "নতুন" },
];

export default function OffersPage() {
  const [sortBy, setSortBy] = useState<SortOption>("discount");

  const offerProducts = useMemo(() => {
    const products = mockProducts.filter(
      (p) => p.offerPrice && p.offerPrice < p.price,
    );

    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "discount": {
          const discA = ((a.price - (a.offerPrice || a.price)) / a.price) * 100;
          const discB = ((b.price - (b.offerPrice || b.price)) / b.price) * 100;
          return discB - discA;
        }
        case "price-low":
          return (a.offerPrice || a.price) - (b.offerPrice || b.price);
        case "price-high":
          return (b.offerPrice || b.price) - (a.offerPrice || a.price);
        case "newest":
        default:
          return 0;
      }
    });
  }, [sortBy]);

  const maxDiscount = useMemo(() => {
    if (offerProducts.length === 0) return 0;
    return Math.max(
      ...offerProducts.map((p) =>
        Math.round(((p.price - (p.offerPrice || p.price)) / p.price) * 100),
      ),
    );
  }, [offerProducts]);

  const totalSaved = useMemo(() => {
    return offerProducts.reduce(
      (acc, p) => acc + (p.price - (p.offerPrice || p.price)),
      0,
    );
  }, [offerProducts]);

  return (
    <div>
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-600">
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-5 right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            {/* Floating percent icons */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-16 right-[15%] text-white/10"
            >
              <Percent className="h-16 w-16" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-16 left-[10%] text-white/10"
            >
              <Tag className="h-12 w-12" />
            </motion.div>
            <motion.div
              animate={{ y: [-5, 15, -5] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="absolute top-1/3 right-[30%] text-white/10"
            >
              <Gift className="h-10 w-10" />
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
              <span className="text-white font-medium">অফার সমূহ</span>
            </motion.nav>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
                    <Flame className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-medium">
                      সীমিত সময়ের অফার
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
                >
                  সেরা ডিল ও{" "}
                  <span className="relative">
                    অফার সমূহ
                    <svg
                      className="absolute -bottom-1.5 left-0 w-full h-2 text-yellow-300/50"
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
                  className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg"
                >
                  প্রিমিয়াম স্মার্টফোন ও এক্সেসরিজে অবিশ্বাস্য ছাড়! সীমিত
                  স্টকে সেরা দামে কিনুন এখনই।
                </motion.p>

                {/* Highlight badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    {
                      icon: TrendingDown,
                      text: `${maxDiscount}% পর্যন্ত ছাড়`,
                    },
                    { icon: Truck, text: "ফ্রি ডেলিভারি" },
                    { icon: Zap, text: "0% EMI সুবিধা" },
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

              {/* Right: Countdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center lg:items-end"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Timer className="h-5 w-5 text-yellow-300" />
                    <p className="text-sm font-semibold text-white/90">
                      অফার শেষ হবে
                    </p>
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    <CountdownBox value="০৭" label="দিন" />
                    <div className="flex items-center text-xl font-bold text-white/30 pt-0 -mt-4">
                      :
                    </div>
                    <CountdownBox value="১২" label="ঘণ্টা" />
                    <div className="flex items-center text-xl font-bold text-white/30 pt-0 -mt-4">
                      :
                    </div>
                    <CountdownBox value="৪৫" label="মিনিট" />
                    <div className="flex items-center text-xl font-bold text-white/30 pt-0 -mt-4">
                      :
                    </div>
                    <CountdownBox value="৩০" label="সেকেন্ড" />
                  </div>
                  <p className="text-xs text-white/50 mt-4">
                    *অফার স্টক শেষ পর্যন্ত সীমিত
                  </p>
                </div>
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
                value: `${offerProducts.length}টি`,
                label: "পণ্যে অফার চলছে",
                color: "text-blue-500",
              },
              {
                icon: TrendingDown,
                value: `${maxDiscount}%`,
                label: "সর্বোচ্চ ছাড়",
                color: "text-emerald-500",
              },
              {
                icon: Zap,
                value: "০%",
                label: "EMI সুদের হার",
                color: "text-amber-500",
              },
              {
                icon: Truck,
                value: "ফ্রি",
                label: "৳৫,০০০+ অর্ডারে ডেলিভারি",
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

      <div className="container mx-auto px-4">
        {/* ─── Sort & Filter Bar ─── */}
        <section className="py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                সব <span className="text-primary">অফার</span>{" "}
                <span className="text-lg sm:text-xl font-normal text-muted-foreground">
                  ({offerProducts.length}টি পণ্য)
                </span>
              </h2>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-wrap">
              <ArrowDownWideNarrow className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">সাজান:</span>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    sortBy === option.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Products Grid ─── */}
        <section className="pb-12">
          {offerProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {offerProducts.map((product, idx) => (
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
                    <Tag className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    এই মুহূর্তে কোনো অফার নেই
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                    শীঘ্রই নতুন অফার আসবে! আমাদের শপ ভিজিট করুন সেরা দামে পণ্য
                    কিনতে।
                  </p>
                  <Link href="/shop">
                    <Button className="rounded-full px-6 gap-2">
                      <Package className="h-4 w-4" />
                      শপ ভিজিট করুন
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>

        {/* ─── Benefits Section ─── */}
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
                কেন আমাদের থেকে কিনবেন?
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold"
            >
              অফারের সাথে যা পাচ্ছেন
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: ShieldCheck,
                title: "১০০% অরিজিনাল",
                description: "সব পণ্য সরাসরি অথরাইজড সোর্স থেকে",
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
              },
              {
                icon: Truck,
                title: "ফ্রি ডেলিভারি",
                description: "৳৫,০০০+ অর্ডারে সারাদেশে ফ্রি",
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-950/30",
              },
              {
                icon: RotateCcw,
                title: "৭ দিন রিটার্ন",
                description: "কোনো প্রশ্ন ছাড়াই রিটার্ন সুবিধা",
                color: "text-orange-600",
                bg: "bg-orange-50 dark:bg-orange-950/30",
              },
              {
                icon: Zap,
                title: "০% EMI সুবিধা",
                description: "সহজ কিস্তিতে পেমেন্ট করুন",
                color: "text-violet-600",
                bg: "bg-violet-50 dark:bg-violet-950/30",
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
                    <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
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
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-t border-border/40">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Gift className="h-10 w-10 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              নিয়মিত অফার পেতে চান?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8"
            >
              আমাদের ফেসবুক পেজ ফলো করুন এবং হোয়াটসঅ্যাপে যোগ দিন — নতুন অফারের
              আপডেট সবার আগে পান!
            </motion.p>
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <Package className="h-4.5 w-4.5" />
                  শপ ভিজিট করুন
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2"
                >
                  <Sparkles className="h-4.5 w-4.5" />
                  যোগাযোগ করুন
                </Button>
              </Link>
            </motion.div>

            {/* Trust line */}
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
