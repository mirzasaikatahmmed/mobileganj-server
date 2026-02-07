"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Smartphone,
  Banknote,
  CheckCircle2,
  Upload,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Zap,
  DollarSign,
  HandCoins,
  ArrowRight,
  Phone,
  MapPin,
  MessageCircle,
  Star,
  Eye,
  BadgeCheck,
  Wallet,
  RotateCcw,
  Heart,
  Camera,
  FileText,
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

// ─── Steps ────────────────────────────────────────────────
const steps = [
  {
    icon: FileText,
    title: "তথ্য দিন",
    description: "আপনার ফোনের বিস্তারিত তথ্য ফর্মে পূরণ করুন",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Eye,
    title: "মূল্যায়ন পান",
    description: "আমরা যাচাই করে আপনাকে সেরা দাম জানাবো",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Wallet,
    title: "বিক্রি ও পেমেন্ট",
    description: "ফোন জমা দিন এবং তাৎক্ষণিক পেমেন্ট নিন",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

// ─── Price Guide ──────────────────────────────────────────
const priceGuide = [
  { model: "iPhone 15 Pro Max", range: "৳১,১০,০০০ - ৳১,৩০,০০০" },
  { model: "iPhone 14 Pro", range: "৳৮৫,০০০ - ৳৯৫,০০০" },
  { model: "Samsung S24 Ultra", range: "৳৯৫,০০০ - ৳১,১০,০০০" },
  { model: "Samsung S23 Ultra", range: "৳৭৫,০০০ - ৳৮৫,০০০" },
  { model: "Google Pixel 8 Pro", range: "৳৬০,০০০ - ৳৭০,০০০" },
];

export default function SellPhonePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    phoneBrand: "",
    phoneModel: "",
    storage: "",
    condition: "",
    accessories: "",
    expectedPrice: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "আপনার রিকোয়েস্ট সফলভাবে জমা হয়েছে! শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।",
    );
    setFormData({
      name: "",
      phone: "",
      email: "",
      phoneBrand: "",
      phoneModel: "",
      storage: "",
      condition: "",
      accessories: "",
      expectedPrice: "",
      description: "",
    });
  };

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-orange-600 via-rose-600 to-pink-600">
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
              <Banknote className="h-14 w-14" />
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
              <HandCoins className="h-10 w-10" />
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
              <span className="text-white font-medium">ফোন বিক্রি</span>
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
                    <Banknote className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-medium">
                      তাৎক্ষণিক ক্যাশ পেমেন্ট
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
                >
                  আপনার পুরাতন ফোন{" "}
                  <span className="relative">
                    বিক্রি করুন
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
                  সেরা দামে আপনার পুরাতন ফোন বিক্রি করুন। দ্রুত মূল্যায়ন,
                  তাৎক্ষণিক পেমেন্ট এবং সম্পূর্ণ ঝামেলামুক্ত প্রক্রিয়া!
                </motion.p>

                {/* Highlight badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-wrap gap-2"
                >
                  {[
                    { icon: Zap, text: "তাৎক্ষণিক পেমেন্ট" },
                    { icon: ShieldCheck, text: "সেরা বাজারমূল্য" },
                    { icon: Clock, text: "একই দিনে প্রসেসিং" },
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

              {/* Right: Quick stats card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex justify-center lg:justify-end"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 max-w-sm w-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="h-8 w-8 text-yellow-300" />
                    </div>
                    <h3 className="text-lg font-bold">ফোন বিক্রি সার্ভিস</h3>
                    <p className="text-sm text-white/60 mt-1">
                      সহজ ও নিরাপদ প্রক্রিয়া
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        icon: Zap,
                        label: "পেমেন্ট",
                        value: "তাৎক্ষণিক ক্যাশ",
                      },
                      {
                        icon: Star,
                        label: "মূল্যায়ন",
                        value: "সম্পূর্ণ ফ্রি",
                      },
                      {
                        icon: Clock,
                        label: "সময়",
                        value: "একই দিনে",
                      },
                      {
                        icon: ShieldCheck,
                        label: "হিডেন চার্জ",
                        value: "শূন্য",
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

                  <a
                    href="https://wa.me/8801234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-5"
                  >
                    <Button className="w-full rounded-xl gap-2 bg-white text-rose-600 hover:bg-white/90 font-semibold">
                      <MessageCircle className="h-4 w-4" />
                      এখনই যোগাযোগ করুন
                    </Button>
                  </a>
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
                icon: Smartphone,
                value: "২,০০০+",
                label: "ফোন কেনা হয়েছে",
                color: "text-blue-500",
              },
              {
                icon: Banknote,
                value: "সেরা",
                label: "বাজারমূল্য নিশ্চিত",
                color: "text-emerald-500",
              },
              {
                icon: Zap,
                value: "একই দিন",
                label: "পেমেন্ট দেওয়া হয়",
                color: "text-amber-500",
              },
              {
                icon: Star,
                value: "৯৮%",
                label: "গ্রাহক সন্তুষ্টি",
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
              মাত্র ৩টি সহজ ধাপ
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              কোনো জটিলতা নেই — ফর্ম পূরণ করুন, মূল্যায়ন পান, তাৎক্ষণিক পেমেন্ট
              নিন
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-3 gap-4"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                variants={scaleIn}
                className="relative"
              >
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardContent className="p-5 sm:p-6">
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

                {idx < steps.length - 1 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-10">
                    <div className="w-5 h-5 rounded-full bg-background border border-border/60 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── Form + Sidebar ─── */}
        <section className="pb-12 sm:pb-16">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* ─── Sell Form (3 cols) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">ফোনের তথ্য দিন</h2>
                      <p className="text-xs text-muted-foreground">
                        সেরা মূল্যায়নের জন্য সঠিক তথ্য প্রদান করুন
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* ── Personal Info ── */}
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        ব্যক্তিগত তথ্য
                      </p>
                      <div className="space-y-3.5">
                        <div>
                          <Label htmlFor="name">আপনার নাম *</Label>
                          <Input
                            id="name"
                            placeholder="পুরো নাম লিখুন"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                            className="mt-1.5 rounded-xl"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <Label htmlFor="phone">ফোন নম্বর *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="০১XXXXXXXXX"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              required
                              className="mt-1.5 rounded-xl"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="example@email.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="mt-1.5 rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* ── Phone Details ── */}
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                        <Smartphone className="h-4 w-4 text-primary" />
                        ফোনের বিবরণ
                      </p>
                      <div className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <Label htmlFor="phoneBrand">ব্র্যান্ড *</Label>
                            <Select
                              value={formData.phoneBrand}
                              onValueChange={(value) =>
                                setFormData({
                                  ...formData,
                                  phoneBrand: value,
                                })
                              }
                            >
                              <SelectTrigger className="mt-1.5 rounded-xl">
                                <SelectValue placeholder="ব্র্যান্ড নির্বাচন করুন" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="samsung">Samsung</SelectItem>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="oneplus">OnePlus</SelectItem>
                                <SelectItem value="xiaomi">Xiaomi</SelectItem>
                                <SelectItem value="vivo">Vivo</SelectItem>
                                <SelectItem value="oppo">Oppo</SelectItem>
                                <SelectItem value="realme">Realme</SelectItem>
                                <SelectItem value="others">অন্যান্য</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="phoneModel">মডেল *</Label>
                            <Input
                              id="phoneModel"
                              value={formData.phoneModel}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phoneModel: e.target.value,
                                })
                              }
                              placeholder="যেমন: iPhone 14 Pro"
                              required
                              className="mt-1.5 rounded-xl"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <Label htmlFor="storage">স্টোরেজ *</Label>
                            <Select
                              value={formData.storage}
                              onValueChange={(value) =>
                                setFormData({ ...formData, storage: value })
                              }
                            >
                              <SelectTrigger className="mt-1.5 rounded-xl">
                                <SelectValue placeholder="স্টোরেজ নির্বাচন করুন" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="64gb">64GB</SelectItem>
                                <SelectItem value="128gb">128GB</SelectItem>
                                <SelectItem value="256gb">256GB</SelectItem>
                                <SelectItem value="512gb">512GB</SelectItem>
                                <SelectItem value="1tb">1TB</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="condition">কন্ডিশন *</Label>
                            <Select
                              value={formData.condition}
                              onValueChange={(value) =>
                                setFormData({
                                  ...formData,
                                  condition: value,
                                })
                              }
                            >
                              <SelectTrigger className="mt-1.5 rounded-xl">
                                <SelectValue placeholder="কন্ডিশন নির্বাচন করুন" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="excellent">
                                  এক্সেলেন্ট (নতুনের মতো)
                                </SelectItem>
                                <SelectItem value="good">
                                  ভালো (সামান্য স্ক্র্যাচ)
                                </SelectItem>
                                <SelectItem value="fair">
                                  মোটামুটি (দৃশ্যমান ব্যবহারের চিহ্ন)
                                </SelectItem>
                                <SelectItem value="poor">
                                  খারাপ (ভাঙা/ক্ষতিগ্রস্ত)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="accessories">
                            সাথে যা যা আছে (ঐচ্ছিক)
                          </Label>
                          <Input
                            id="accessories"
                            value={formData.accessories}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accessories: e.target.value,
                              })
                            }
                            placeholder="যেমন: বক্স, চার্জার, ইয়ারফোন"
                            className="mt-1.5 rounded-xl"
                          />
                        </div>

                        <div>
                          <Label htmlFor="expectedPrice">
                            আপনার প্রত্যাশিত মূল্য (ঐচ্ছিক)
                          </Label>
                          <Input
                            id="expectedPrice"
                            type="number"
                            value={formData.expectedPrice}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                expectedPrice: e.target.value,
                              })
                            }
                            placeholder="৳ টাকায় লিখুন"
                            className="mt-1.5 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* ── Additional ── */}
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
                        <Camera className="h-4 w-4 text-primary" />
                        অতিরিক্ত তথ্য
                      </p>
                      <div className="space-y-3.5">
                        <div>
                          <Label htmlFor="description">
                            বিস্তারিত বিবরণ (ঐচ্ছিক)
                          </Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            placeholder="ফোনের কোনো সমস্যা, মেরামত ইতিহাস বা অন্য কোনো তথ্য থাকলে লিখুন..."
                            rows={3}
                            className="mt-1.5 rounded-xl"
                          />
                        </div>

                        {/* Upload Area */}
                        <div>
                          <Label>ফোনের ছবি আপলোড করুন (ঐচ্ছিক)</Label>
                          <div className="mt-1.5 border-2 border-dashed border-border/60 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                            <p className="text-sm text-muted-foreground">
                              ক্লিক করুন বা ড্র্যাগ করে ছবি দিন
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              PNG, JPG — সর্বোচ্চ ১০MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl gap-2"
                    >
                      <HandCoins className="h-4.5 w-4.5" />
                      মূল্যায়নের জন্য জমা দিন
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── Sidebar (2 cols) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Why Sell to Us */}
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <h3 className="font-bold flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    কেন আমাদের কাছে বিক্রি?
                  </h3>
                </div>
                <CardContent className="p-5">
                  <ul className="space-y-2.5">
                    {[
                      "তাৎক্ষণিক ক্যাশ পেমেন্ট",
                      "সেরা বাজারমূল্য গ্যারান্টি",
                      "ফ্রি ফোন মূল্যায়ন",
                      "সম্পূর্ণ নিরাপদ প্রক্রিয়া",
                      "কোনো হিডেন চার্জ নেই",
                      "একই দিনে প্রসেসিং",
                    ].map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Price Guide */}
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <h3 className="font-bold flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    আনুমানিক মূল্য তালিকা
                  </h3>
                </div>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    {priceGuide.map((item) => (
                      <div
                        key={item.model}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
                      >
                        <span className="text-sm font-medium">
                          {item.model}
                        </span>
                        <span className="text-sm font-bold text-primary whitespace-nowrap ml-3">
                          {item.range}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    * মূল্য ফোনের কন্ডিশন, স্টোরেজ ও এক্সেসরিজের উপর নির্ভর করে।
                    চূড়ান্ত মূল্য সরাসরি পরীক্ষার পর নির্ধারণ করা হবে।
                  </p>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="rounded-2xl border-primary/20 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    সাহায্য দরকার?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    কল করুন বা সরাসরি আমাদের শপে আসুন
                  </p>
                  <div className="space-y-2.5">
                    <a
                      href="tel:+8801234567890"
                      className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      +৮৮০ ১২৩৪-৫৬৭৮৯০
                    </a>
                    <div className="flex items-center gap-2.5 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      গুলশান-১, ঢাকা
                    </div>
                    <div className="flex items-center gap-2.5 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      শনি-বৃহঃ সকাল ১০টা - রাত ৮টা
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <a
                      href="https://wa.me/8801234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full rounded-xl gap-1.5 text-xs"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        হোয়াটসঅ্যাপ
                      </Button>
                    </a>
                    <a href="tel:+8801234567890" className="flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full rounded-xl gap-1.5 text-xs"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        কল করুন
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
                আমাদের সুবিধাসমূহ
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold"
            >
              কেন Mobile GANJ বেছে নেবেন?
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
                icon: Banknote,
                title: "সেরা বাজারমূল্য",
                description:
                  "আমরা বাজারের সর্বোচ্চ মূল্যে আপনার ফোন কিনি। অন্য কোথাও বেশি দাম পেলে জানান!",
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
              },
              {
                icon: Zap,
                title: "তাৎক্ষণিক পেমেন্ট",
                description:
                  "ফোন জমা দেওয়ার সাথে সাথে পেমেন্ট পেয়ে যান। কোনো অপেক্ষা বা দেরি নেই।",
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-950/30",
              },
              {
                icon: ShieldCheck,
                title: "নিরাপদ প্রক্রিয়া",
                description:
                  "আপনার ফোনের সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হয়। বিক্রির আগে ডেটা ওয়াইপ করা হয়।",
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-950/30",
              },
              {
                icon: Eye,
                title: "স্বচ্ছ মূল্যায়ন",
                description:
                  "আমরা আপনার সামনেই ফোন যাচাই করি। মূল্যায়নের প্রতিটি ধাপ স্বচ্ছভাবে দেখানো হয়।",
                color: "text-violet-600",
                bg: "bg-violet-50 dark:bg-violet-950/30",
              },
              {
                icon: RotateCcw,
                title: "সহজ প্রক্রিয়া",
                description:
                  "কোনো কঠিন ডকুমেন্টেশন বা দীর্ঘ অপেক্ষা নেই। সব কাজ একই দিনে সম্পন্ন হয়।",
                color: "text-orange-600",
                bg: "bg-orange-50 dark:bg-orange-950/30",
              },
              {
                icon: Heart,
                title: "গ্রাহক সন্তুষ্টি",
                description:
                  "আমাদের ৯৮% গ্রাহক আমাদের সার্ভিসে সন্তুষ্ট এবং পুনরায় আমাদের কাছে আসেন।",
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
      <section className="bg-gradient-to-br from-orange-600/5 via-rose-600/10 to-pink-600/5 border-t border-border/40">
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
              আজই আপনার ফোন বিক্রি করুন!
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8"
            >
              পুরাতন ফোন ফেলে রাখবেন কেন? সেরা দামে বিক্রি করুন এবং নতুন ফোন
              কেনার জন্য বাজেট তৈরি করুন!
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
                { icon: Banknote, text: "তাৎক্ষণিক পেমেন্ট" },
                { icon: ShieldCheck, text: "নিরাপদ প্রক্রিয়া" },
                { icon: Star, text: "সেরা বাজারমূল্য" },
                { icon: Heart, text: "২,০০০+ সন্তুষ্ট গ্রাহক" },
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
