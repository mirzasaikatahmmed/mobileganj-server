"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Phone,
  MessageCircle,
  Heart,
  Truck,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  PackageX,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  Banknote,
  Smartphone,
  FileCheck,
  AlertTriangle,
  ClipboardCheck,
  Send,
  Search,
  RefreshCw,
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

// ─── Data ─────────────────────────────────────────────────
const eligibilityItems = [
  {
    icon: PackageCheck,
    text: "পণ্য অবশ্যই আসল প্যাকেজিং সহ মূল অবস্থায় থাকতে হবে",
  },
  {
    icon: FileCheck,
    text: "ক্রয়ের সময়ের ইনভয়েস ও ওয়ারেন্টি কার্ড থাকতে হবে",
  },
  {
    icon: Smartphone,
    text: "পণ্যে কোনো ফিজিক্যাল ড্যামেজ থাকা যাবে না",
  },
  {
    icon: ClipboardCheck,
    text: "ক্রয়ের ৭ দিনের মধ্যে রিটার্ন রিকোয়েস্ট করতে হবে",
  },
  {
    icon: RefreshCw,
    text: "পণ্য ব্যাপকভাবে ব্যবহৃত হতে পারবে না",
  },
];

const nonReturnableItems = [
  "ফিজিক্যাল ড্যামেজ বা পানিতে ক্ষতিগ্রস্ত পণ্য",
  "অরিজিনাল প্যাকেজিং ছাড়া পণ্য",
  "স্পেশাল সেল বা ক্লিয়ারেন্সের পণ্য",
  "ওপেন করা এক্সেসরিজ (ইয়ারফোন, চার্জার ইত্যাদি)",
];

const returnSteps = [
  {
    title: "রিটার্ন রিকোয়েস্ট",
    description:
      "আমাদের সাপোর্ট টিমে কল করুন বা হোয়াটসঅ্যাপে রিটার্নের কারণ জানিয়ে আবেদন করুন।",
    icon: Send,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "পণ্য প্যাক করুন",
    description:
      "পণ্যটি সমস্ত আনুষঙ্গিক জিনিস ও আসল প্যাকেজিং সহ ভালোভাবে প্যাক করুন।",
    icon: PackageCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "পাঠিয়ে দিন / জমা দিন",
    description:
      "আমাদের কুরিয়ার সার্ভিসে পাঠান অথবা সরাসরি আমাদের শপে জমা দিন।",
    icon: Truck,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    title: "পরীক্ষা ও রিফান্ড",
    description:
      "পণ্য পরীক্ষার পর ৩-৫ কর্মদিবসের মধ্যে আপনার পছন্দের পদ্ধতিতে রিফান্ড করা হবে।",
    icon: Search,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

const refundMethods = [
  {
    icon: Banknote,
    title: "ব্যাংক ট্রান্সফার",
    duration: "৩-৫ কর্মদিবস",
    description: "আপনার ব্যাংক অ্যাকাউন্টে সরাসরি ফেরত",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: CreditCard,
    title: "স্টোর ক্রেডিট",
    duration: "তাৎক্ষণিক",
    description: "পরবর্তী ক্রয়ে ব্যবহারযোগ্য স্টোর ব্যালেন্স",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Wallet,
    title: "মোবাইল ব্যাংকিং",
    duration: "তাৎক্ষণিক",
    description: "বিকাশ, নগদ বা রকেটে ফেরত",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    icon: ArrowLeftRight,
    title: "এক্সচেঞ্জ",
    duration: "তাৎক্ষণিক",
    description: "অন্য পণ্যের সাথে বদলে নিন",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
];

export default function ReturnPage() {
  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700">
          {/* Decorative */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-16 right-[15%] text-white/10"
            >
              <RotateCcw className="h-16 w-16" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-20 left-[10%] text-white/10"
            >
              <PackageCheck className="h-14 w-14" />
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
              <span className="text-white font-medium">রিটার্ন পলিসি</span>
            </motion.nav>

            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5 border border-white/20">
                  <RotateCcw className="h-4 w-4 text-purple-300" />
                  <span className="text-sm font-medium">সহজ রিটার্ন পলিসি</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
              >
                ৭ দিনের{" "}
                <span className="relative">
                  ইজি রিটার্ন
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2 text-purple-300/50"
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
                পণ্যে সন্তুষ্ট নন? চিন্তার কিছু নেই! ৭ দিনের মধ্যে
                ঝামেলামুক্তভাবে রিটার্ন করে পূর্ণ রিফান্ড পান।
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                {[
                  { icon: RotateCcw, text: "৭ দিন রিটার্ন" },
                  { icon: Truck, text: "ফ্রি রিটার্ন শিপিং" },
                  { icon: Banknote, text: "১০০% মানি ব্যাক" },
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
            className="grid grid-cols-3"
          >
            {[
              {
                icon: Clock,
                value: "৭ দিন",
                label: "রিটার্ন উইন্ডো",
                color: "text-violet-500",
              },
              {
                icon: Truck,
                value: "ফ্রি",
                label: "রিটার্ন শিপিং",
                color: "text-emerald-500",
              },
              {
                icon: Banknote,
                value: "১০০%",
                label: "মানি ব্যাক গ্যারান্টি",
                color: "text-amber-500",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className={`flex flex-col items-center justify-center py-8 sm:py-10 ${
                  i < 2 ? "border-r border-border/40" : ""
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
        {/* ─── Eligibility ─── */}
        <section className="py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                রিটার্নের শর্তাবলী
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold"
            >
              রিটার্নের যোগ্যতা
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {eligibilityItems.map((item) => (
              <motion.div key={item.text} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all duration-300 group">
                  <CardContent className="p-5 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-4.5 w-4.5 text-emerald-600" />
                    </div>
                    <span className="text-sm leading-relaxed mt-1.5">
                      {item.text}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── Non-Returnable ─── */}
        <section className="pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="rounded-2xl border-destructive/20 overflow-hidden">
              <div className="bg-destructive/5 px-5 sm:px-6 py-4 border-b border-destructive/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                    <PackageX className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">
                      যা রিটার্ন করা যাবে না
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      এই পণ্যগুলো রিটার্ন পলিসির আওতায় পড়ে না
                    </p>
                  </div>
                </div>
              </div>
              <CardContent className="p-5 sm:p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {nonReturnableItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 p-3 rounded-xl bg-destructive/5 hover:bg-destructive/8 transition-colors"
                    >
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* ─── Return Process ─── */}
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
                রিটার্ন প্রক্রিয়া
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              রিটার্ন করবেন কীভাবে?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              মাত্র ৪টি সহজ ধাপে আপনার রিটার্ন ও রিফান্ড সম্পন্ন হবে
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {returnSteps.map((step, idx) => (
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

                {idx < returnSteps.length - 1 && (
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

        {/* ─── Refund Methods ─── */}
        <section className="pb-12 sm:pb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-violet-500/10 text-violet-600 border-violet-500/20 hover:bg-violet-500/15">
                <Wallet className="h-3.5 w-3.5 mr-1.5" />
                রিফান্ড
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              রিফান্ড পদ্ধতি
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              আপনার সুবিধামতো যেকোনো পদ্ধতিতে রিফান্ড নিন
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {refundMethods.map((method) => (
              <motion.div key={method.title} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <div
                      className={`w-14 h-14 rounded-2xl ${method.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <method.icon className={`h-7 w-7 ${method.color}`} />
                    </div>
                    <h3 className="font-bold text-base mb-1">{method.title}</h3>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium mb-2"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {method.duration}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-gradient-to-br from-violet-600/5 via-purple-600/10 to-fuchsia-600/5 border-t border-border/40">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <RotateCcw className="h-10 w-10 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              রিটার্ন করতে সাহায্য চান?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8"
            >
              আমাদের সাপোর্ট টিম সবসময় আপনাকে সাহায্য করতে প্রস্তুত। এখনই
              যোগাযোগ করুন!
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

            <motion.div
              variants={fadeInUp}
              custom={4}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {[
                { icon: RotateCcw, text: "৭ দিন রিটার্ন" },
                { icon: Truck, text: "ফ্রি শিপিং" },
                { icon: ShieldCheck, text: "১০০% নিরাপদ" },
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
