"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  Users,
  Award,
  TrendingUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Phone,
  MapPin,
  Globe,
  Star,
  Zap,
  Target,
  Eye,
  ChevronRight,
  Sparkles,
  Clock,
  Headphones,
  Package,
  CheckCircle2,
} from "lucide-react";

// ─── Animation variants ───────────────────────────────────
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

// ─── Stats Data ───────────────────────────────────────────
const stats = [
  {
    value: "৫,০০০+",
    label: "সন্তুষ্ট গ্রাহক",
    icon: Users,
    color: "text-blue-500",
  },
  {
    value: "১০,০০০+",
    label: "ডেলিভারকৃত পণ্য",
    icon: Package,
    color: "text-emerald-500",
  },
  {
    value: "৫+",
    label: "বছরের অভিজ্ঞতা",
    icon: Clock,
    color: "text-amber-500",
  },
  {
    value: "৯৮%",
    label: "গ্রাহক সন্তুষ্টি",
    icon: Heart,
    color: "text-rose-500",
  },
];

// ─── Why Choose Us ────────────────────────────────────────
const features = [
  {
    icon: ShieldCheck,
    title: "১০০% অরিজিনাল পণ্য",
    description:
      "সরাসরি অথরাইজড ডিস্ট্রিবিউটর থেকে সংগ্রহ করা। প্রতিটি পণ্যের অরিজিনালিটি গ্যারান্টি।",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: TrendingUp,
    title: "সেরা মূল্য নিশ্চয়তা",
    description:
      "বাজারের সবচেয়ে প্রতিযোগিতামূলক দামে পণ্য। নিয়মিত অফার, EMI সুবিধা ও বিশেষ ছাড়।",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি",
    description:
      "সারাদেশে দ্রুত ডেলিভারি সার্ভিস। ঢাকায় ২৪ ঘণ্টা এবং ঢাকার বাইরে ৪৮-৭২ ঘণ্টায়।",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: RotateCcw,
    title: "ইজি রিটার্ন পলিসি",
    description:
      "৭ দিনের মধ্যে সহজে রিটার্ন। কোনো প্রশ্ন ছাড়াই রিফান্ড বা এক্সচেঞ্জ করুন।",
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    icon: Headphones,
    title: "২৪/৭ সাপোর্ট",
    description: "যেকোনো সময় যোগাযোগ করুন। আমাদের দক্ষ টিম সবসময় আপনার পাশে।",
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  {
    icon: Award,
    title: "ওয়ারেন্টি সুবিধা",
    description:
      "সব পণ্যে অফিসিয়াল ওয়ারেন্টি। বিনামূল্যে সার্ভিসিং ও মেরামত সুবিধা।",
    color: "text-teal-600",
    bg: "bg-teal-50 dark:bg-teal-950/30",
  },
];

// ─── Timeline ─────────────────────────────────────────────
const timeline = [
  {
    year: "২০২১",
    title: "যাত্রা শুরু",
    description: "ঢাকায় ছোট্ট একটি দোকান দিয়ে Mobile GANJ এর পথচলা শুরু।",
  },
  {
    year: "২০২২",
    title: "অনলাইন প্রেজেন্স",
    description: "অনলাইন প্ল্যাটফর্ম চালু। সারাদেশে ডেলিভারি সার্ভিস শুরু।",
  },
  {
    year: "২০২৩",
    title: "ওভারসিজ ফোন",
    description: "দুবাই ও অন্যান্য দেশ থেকে সরাসরি ফোন আমদানি শুরু।",
  },
  {
    year: "২০২৪",
    title: "EMI সুবিধা",
    description:
      "সহজ কিস্তিতে ফোন কেনার সুবিধা চালু। গ্রাহক সংখ্যা ৫০০০+ ছাড়িয়ে যায়।",
  },
  {
    year: "২০২৫",
    title: "সার্ভিসিং সেন্টার",
    description:
      "নিজস্ব সার্ভিসিং সেন্টার চালু। পুরানো ফোন কেনাবেচা প্ল্যাটফর্ম।",
  },
];

// ─── Team ───────────────────────────────────────────────
const team = [
  {
    name: "মোঃ রহিম আহমেদ",
    role: "প্রতিষ্ঠাতা ও CEO",
    image: "/placeholder.jpg",
  },
  {
    name: "তানভীর হাসান",
    role: "অপারেশনস ম্যানেজার",
    image: "/placeholder.jpg",
  },
  {
    name: "সাবরিনা আক্তার",
    role: "কাস্টমার রিলেশন",
    image: "/placeholder.jpg",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-16 sm:py-24 relative">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              হোম
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">আমাদের সম্পর্কে</span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                বাংলাদেশের বিশ্বস্ত মোবাইল শপ
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            >
              প্রযুক্তি হোক সবার{" "}
              <span className="text-primary relative">
                হাতের নাগালে
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2 text-primary/30"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5Q50 1 100 5.5Q150 10 199 3"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8"
            >
              Mobile GANJ বাংলাদেশের একটি বিশ্বস্ত মোবাইল ফোন ও এক্সেসরিজ শপ।
              আমরা বিশ্বের সেরা ব্র্যান্ডগুলোর অরিজিনাল পণ্য সাশ্রয়ী মূল্যে
              আপনার কাছে পৌঁছে দিই। নতুন ও পুরানো ফোন, ওভারসিজ ফোন, EMI সুবিধা —
              সবকিছু এক জায়গায়।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <Store className="h-4.5 w-4.5" />
                  শপ ভিজিট করুন
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2"
                >
                  <Phone className="h-4.5 w-4.5" />
                  যোগাযোগ করুন
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className={`flex flex-col items-center justify-center py-8 sm:py-10 ${
                  i < stats.length - 1 ? "border-r border-border/40" : ""
                }`}
              >
                <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                <p className="text-2xl sm:text-3xl font-bold tabular-nums">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* ─── Our Story ─── */}
        <section className="py-16 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Left: Image / Visual */}
              <motion.div variants={fadeInUp} custom={0} className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-border/40 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Store className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-primary">
                        Mobile GANJ
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Since 2021
                      </p>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <ShieldCheck className="h-7 w-7 text-emerald-500" />
                  </div>
                  <div className="absolute bottom-6 left-6 w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <Globe className="h-7 w-7 text-blue-500" />
                  </div>
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>
                </div>
              </motion.div>

              {/* Right: Story text */}
              <motion.div variants={fadeInUp} custom={1}>
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                  আমাদের গল্প
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  বিশ্বাসের ভিত্তিতে গড়ে ওঠা
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    ২০২১ সালে ঢাকায় ছোট্ট একটি দোকান থেকে আমাদের যাত্রা শুরু।
                    শুধুমাত্র অরিজিনাল পণ্য ও সৎ ব্যবসায়ের নীতিতে চলে আমরা
                    হাজার হাজার গ্রাহকের ভালোবাসা অর্জন করেছি।
                  </p>
                  <p>
                    আজ আমরা শুধু একটি মোবাইল শপ নই — আমরা একটি পরিপূর্ণ
                    ইকোসিস্টেম। নতুন ফোন, পুরানো ফোন কেনাবেচা, দুবাই থেকে সরাসরি
                    আমদানি, সার্ভিসিং সেন্টার, EMI সুবিধা — সবকিছু এক ছাদের
                    নিচে।
                  </p>
                  <p>
                    আমাদের লক্ষ্য সহজ — প্রযুক্তি যেন সবার হাতের নাগালে থাকে,
                    সাশ্রয়ী মূল্যে, নির্ভরযোগ্যভাবে।
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ─── Mission & Vision ─── */}
        <section className="pb-16 sm:pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto"
          >
            <motion.div variants={scaleIn}>
              <Card className="rounded-2xl border-border/60 overflow-hidden h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">আমাদের মিশন</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    বাংলাদেশের প্রতিটি মানুষের কাছে অরিজিনাল ও মানসম্পন্ন মোবাইল
                    পণ্য সাশ্রয়ী মূল্যে পৌঁছে দেওয়া। পাশাপাশি অনন্য গ্রাহক
                    সেবা নিশ্চিত করা যা বিশ্বাস ও সন্তুষ্টির ভিত্তি গড়ে তোলে।
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Card className="rounded-2xl border-border/60 overflow-hidden h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                <CardContent className="p-6 sm:p-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">আমাদের ভিশন</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    বাংলাদেশের সবচেয়ে বিশ্বস্ত ও পছন্দের মোবাইল ফোন ডেস্টিনেশন
                    হওয়া — যেখানে গুণমান, অরিজিনালিটি ও গ্রাহক সন্তুষ্টি সবার
                    উপরে।
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Why Choose Us ─── */}
        <section className="pb-16 sm:pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                কেন আমরা?
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              আমাদের বেছে নেওয়ার কারণ
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              হাজার হাজার গ্রাহক আমাদের বিশ্বাস করেন — এর পেছনের কারণগুলো জানুন
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
                  <CardContent className="p-5 sm:p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-base mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── Timeline / Journey ─── */}
        <section className="pb-16 sm:pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                আমাদের যাত্রা
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold"
            >
              একনজরে আমাদের পথচলা
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-border" />

              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    variants={fadeInUp}
                    custom={i}
                    className="flex gap-5 group"
                  >
                    {/* Dot */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center z-10 relative group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                        <span className="text-xs font-bold text-primary">
                          {item.year.slice(2)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <Card className="flex-1 rounded-xl border-border/60 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className="text-[10px] px-2 py-0 font-medium"
                          >
                            {item.year}
                          </Badge>
                          <h4 className="font-bold text-sm">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── Team Section ─── */}
        <section className="pb-16 sm:pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                আমাদের টিম
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              যারা আছেন আমাদের পেছনে
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              অভিজ্ঞ ও দক্ষ একটি টিম সবসময় আপনার সেবায় নিয়োজিত
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 overflow-hidden text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                      <Users className="h-9 w-9 text-primary/60" />
                    </div>
                    <h4 className="font-bold text-base">{member.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* ─── CTA Section ─── */}
      <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-y border-border/40">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-4"
            >
              আজই শুরু করুন!
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              হাজার হাজার সন্তুষ্ট গ্রাহকের তালিকায় আপনার নামটিও যুক্ত করুন।
              আমাদের শপ ভিজিট করুন অথবা সরাসরি যোগাযোগ করুন।
            </motion.p>
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <Store className="h-4.5 w-4.5" />
                  শপ ভিজিট করুন
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2"
                >
                  <Phone className="h-4.5 w-4.5" />
                  যোগাযোগ করুন
                </Button>
              </Link>
            </motion.div>

            {/* Quick trust badges */}
            <motion.div
              variants={fadeInUp}
              custom={4}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {[
                { icon: CheckCircle2, text: "১০০% অরিজিনাল" },
                { icon: Truck, text: "ফ্রি ডেলিভারি" },
                { icon: RotateCcw, text: "৭ দিন রিটার্ন" },
                { icon: ShieldCheck, text: "ওয়ারেন্টি" },
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
