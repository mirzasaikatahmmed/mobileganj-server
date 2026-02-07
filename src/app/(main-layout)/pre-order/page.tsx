"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockProducts } from "@/lib/mock-data";
import ProductCard from "../(home)/_components/ProductCard";
import { motion } from "framer-motion";
import {
  Plane,
  Clock,
  Shield,
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Globe,
  Package,
  Banknote,
  HandCoins,
  ArrowRight,
  Phone,
  Heart,
  RotateCcw,
  Zap,
  MapPin,
  Timer,
  Star,
  MessageCircle,
  AlertCircle,
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

// ─── How It Works Steps ───────────────────────────────────
const steps = [
  {
    icon: Package,
    title: "পণ্য নির্বাচন করুন",
    description: "আপনার পছন্দের ফোনের মডেল ও ভেরিয়েন্ট বেছে নিন",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800/40",
  },
  {
    icon: HandCoins,
    title: "অগ্রিম পেমেন্ট করুন",
    description: "মোট মূল্যের ২০-৩০% বুকিং অ্যামাউন্ট প্রদান করুন",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800/40",
  },
  {
    icon: Plane,
    title: "দুবাই থেকে আমদানি",
    description: "৩-৭ কার্যদিবসের মধ্যে দুবাই থেকে সরাসরি আমদানি",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "border-violet-200 dark:border-violet-800/40",
  },
  {
    icon: CheckCircle2,
    title: "পণ্য গ্রহণ করুন",
    description: "সম্পূর্ণ ওয়ারেন্টি সহ পণ্য হাতে পান",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800/40",
  },
];

// ─── Terms & Conditions ───────────────────────────────────
const terms = [
  "বুকিং অ্যামাউন্ট: মোট মূল্যের ২০-৩০% অগ্রিম প্রয়োজন",
  "ডেলিভারি সময়: দুবাই থেকে ৩-৭ কার্যদিবসের মধ্যে",
  "বাজার পরিবর্তন ও কাস্টমস এর কারণে দাম ±২-৩% পরিবর্তন হতে পারে",
  "অগ্রিম পেমেন্ট পাওয়ার পর অর্ডার নিশ্চিত হবে",
  "০% সুদে EMI সুবিধা পাওয়া যাবে",
  "সম্পূর্ণ ওয়ারেন্টি ও আফটার-সেলস সাপোর্ট নিশ্চিত",
];

export default function PreOrderPage() {
  const preOrderProducts = useMemo(
    () => mockProducts.filter((p) => p.isPreOrder),
    [],
  );

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700">
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
              <Plane className="h-16 w-16" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-20 left-[10%] text-white/10"
            >
              <Globe className="h-14 w-14" />
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
              <Package className="h-10 w-10" />
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
              <span className="text-white font-medium">প্রি-অর্ডার</span>
            </motion.nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left: Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
                    <Globe className="h-4 w-4 text-cyan-300" />
                    <span className="text-sm font-medium">
                      দুবাই থেকে সরাসরি আমদানি
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
                >
                  প্রি-অর্ডার করুন{" "}
                  <span className="relative">
                    দুবাই থেকে
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
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg"
                >
                  বিশ্বের সর্বশেষ স্মার্টফোনগুলো সরাসরি দুবাই থেকে আমদানি করুন।
                  অগ্রিম পেমেন্ট করে ৩-৭ দিনে হাতে পান অরিজিনাল পণ্য!
                </motion.p>

                {/* Highlight badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    { icon: Plane, text: "৩-৭ দিনে ডেলিভারি" },
                    { icon: ShieldCheck, text: "১০০% অরিজিনাল" },
                    { icon: Zap, text: "০% EMI সুবিধা" },
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

              {/* Right: Visual / Info card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 max-w-sm w-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
                      <Plane className="h-8 w-8 text-cyan-300" />
                    </div>
                    <h3 className="text-lg font-bold">দুবাই ইম্পোর্ট</h3>
                    <p className="text-sm text-white/60 mt-1">
                      UAE থেকে সরাসরি আমদানি
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        icon: Timer,
                        label: "ডেলিভারি সময়",
                        value: "৩-৭ কার্যদিবস",
                      },
                      {
                        icon: HandCoins,
                        label: "অগ্রিম পেমেন্ট",
                        value: "২০-৩০%",
                      },
                      {
                        icon: ShieldCheck,
                        label: "ওয়ারেন্টি",
                        value: "সম্পূর্ণ গ্যারান্টি",
                      },
                      {
                        icon: CreditCard,
                        label: "EMI সুবিধা",
                        value: "০% সুদ",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3"
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon className="h-4 w-4 text-white/60" />
                          <span className="text-sm text-white/70">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-sm font-semibold">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="block mt-5">
                    <Button className="w-full rounded-xl gap-2 bg-white text-indigo-700 hover:bg-white/90 font-semibold">
                      <MessageCircle className="h-4 w-4" />
                      প্রি-অর্ডার করুন
                    </Button>
                  </Link>
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
                icon: Globe,
                value: "দুবাই",
                label: "সরাসরি আমদানি",
                color: "text-blue-500",
              },
              {
                icon: Timer,
                value: "৩-৭",
                label: "দিনে ডেলিভারি",
                color: "text-emerald-500",
              },
              {
                icon: Shield,
                value: "১০০%",
                label: "অরিজিনাল গ্যারান্টি",
                color: "text-amber-500",
              },
              {
                icon: Zap,
                value: "০%",
                label: "EMI সুদের হার",
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
        {/* ─── How It Works ─── */}
        <section className="py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                কিভাবে কাজ করে?
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              প্রি-অর্ডারের ধাপসমূহ
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              মাত্র ৪টি সহজ ধাপে দুবাই থেকে আপনার পছন্দের ফোন পৌঁছে যাবে আপনার
              হাতে
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={scaleIn}
                className="relative"
              >
                <Card
                  className={`rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group`}
                >
                  <CardContent className="p-5 sm:p-6">
                    {/* Step number */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <span className="text-3xl font-bold text-muted-foreground/20">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector arrow (desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-background border border-border/60 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── Terms & Conditions ─── */}
        <section className="pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="rounded-2xl border-primary/20 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-5 sm:px-6 py-4 border-b border-primary/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <AlertCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">
                      প্রি-অর্ডারের শর্তাবলী
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      অর্ডার করার আগে অনুগ্রহ করে পড়ুন
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {terms.map((term, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {term}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* ─── Pre-Order Products ─── */}
        <section className="pb-12 sm:pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                <Package className="h-3.5 w-3.5 mr-1.5" />
                এখনই অর্ডার করুন
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              প্রি-অর্ডার পণ্যসমূহ
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              দুবাই থেকে আমদানিযোগ্য সর্বশেষ মডেলগুলো দেখুন এবং প্রি-অর্ডার করুন
            </motion.p>
          </motion.div>

          {preOrderProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {preOrderProducts.map((product, idx) => (
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
                    <Plane className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    এই মুহূর্তে কোনো প্রি-অর্ডার পণ্য নেই
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                    শীঘ্রই নতুন মডেল আসবে! আমাদের শপ ভিজিট করুন অন্যান্য পণ্য
                    দেখতে।
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

          {/* Browse more */}
          {preOrderProducts.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/shop">
                <Button variant="outline" className="rounded-full px-6 gap-2">
                  সব পণ্য দেখুন
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* ─── Why Pre-Order ─── */}
        <section className="pb-12 sm:pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                কেন প্রি-অর্ডার?
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold"
            >
              প্রি-অর্ডারের সুবিধাসমূহ
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Star,
                title: "সর্বশেষ মডেল সবার আগে",
                description:
                  "বাজারে আসার আগেই সর্বশেষ মডেলগুলো পেয়ে যান। নতুন রিলিজ সবার আগে আপনার হাতে।",
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-950/30",
              },
              {
                icon: Banknote,
                title: "সাশ্রয়ী মূল্য",
                description:
                  "দুবাই থেকে সরাসরি আমদানি তাই মধ্যস্বত্ত্বভোগীদের বাড়তি খরচ নেই। সেরা দামে পণ্য পান।",
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
              },
              {
                icon: ShieldCheck,
                title: "১০০% অরিজিনাল",
                description:
                  "প্রতিটি পণ্য সরাসরি অথরাইজড সোর্স থেকে সংগ্রহ করা। অরিজিনালিটির সম্পূর্ণ গ্যারান্টি।",
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-950/30",
              },
              {
                icon: CreditCard,
                title: "সহজ পেমেন্ট",
                description:
                  "অল্প অগ্রিম দিয়ে বুকিং করুন, বাকি টাকা পণ্য হাতে পেয়ে দিন। EMI সুবিধাও পাবেন।",
                color: "text-violet-600",
                bg: "bg-violet-50 dark:bg-violet-950/30",
              },
              {
                icon: RotateCcw,
                title: "ইজি রিটার্ন",
                description:
                  "পণ্যে কোনো সমস্যা থাকলে সহজেই রিটার্ন বা এক্সচেঞ্জ করুন। ঝামেলামুক্ত প্রক্রিয়া।",
                color: "text-orange-600",
                bg: "bg-orange-50 dark:bg-orange-950/30",
              },
              {
                icon: Truck,
                title: "দ্রুত ডেলিভারি",
                description:
                  "দুবাই থেকে ৩-৭ কার্যদিবসে আপনার দোরগোড়ায়। ট্র্যাকিং সুবিধাসহ নিরাপদ শিপিং।",
                color: "text-pink-600",
                bg: "bg-pink-50 dark:bg-pink-950/30",
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
      <section className="bg-gradient-to-br from-indigo-600/5 via-violet-600/10 to-blue-600/5 border-t border-border/40">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Plane className="h-10 w-10 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              আপনার পছন্দের ফোন দুবাই থেকে আনুন!
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8"
            >
              তালিকায় আপনার পছন্দের ফোন নেই? আমাদের জানান — আমরা দুবাই থেকে
              যেকোনো ব্র্যান্ডের ফোন আনতে পারি!
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
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2"
                >
                  <Phone className="h-4.5 w-4.5" />
                  কল করুন
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
                { icon: Plane, text: "দুবাই ইম্পোর্ট" },
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
