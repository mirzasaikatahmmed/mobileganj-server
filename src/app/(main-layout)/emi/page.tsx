"use client";

import {
  CreditCard,
  CheckCircle,
  Clock,
  Shield,
  Calculator,
  ArrowRight,
  Banknote,
  Percent,
  Building2,
  Phone,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function EMIPage() {
  const [price, setPrice] = useState(80000);
  const [duration, setDuration] = useState(6);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  const downPayment = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = price - downPayment;
  const monthly = Math.ceil(loanAmount / duration);

  const banks = [
    { name: "BRAC Bank", color: "bg-red-500" },
    { name: "City Bank", color: "bg-blue-600" },
    { name: "Eastern Bank", color: "bg-green-600" },
    { name: "DBBL", color: "bg-emerald-600" },
    { name: "Islami Bank", color: "bg-teal-600" },
    { name: "Standard Chartered", color: "bg-sky-700" },
    { name: "HSBC", color: "bg-red-600" },
    { name: "Prime Bank", color: "bg-indigo-600" },
    { name: "Mutual Trust Bank", color: "bg-violet-600" },
    { name: "AB Bank", color: "bg-orange-600" },
    { name: "UCB", color: "bg-cyan-600" },
    { name: "Southeast Bank", color: "bg-amber-600" },
  ];

  const features = [
    {
      icon: CreditCard,
      title: "সহজ প্রক্রিয়া",
      desc: "চেকআউটে EMI সিলেক্ট করুন, ব্যাংক বেছে নিন। কোনো ঝামেলা নেই।",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle,
      title: "তাৎক্ষণিক অনুমোদন",
      desc: "মিনিটের মধ্যে EMI অনুমোদন পান। দীর্ঘ কাগজপত্র লাগবে না।",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: Clock,
      title: "ফ্লেক্সিবল মেয়াদ",
      desc: "৩, ৬, ৯, বা ১২ মাস — আপনার সুবিধামতো মেয়াদ বেছে নিন।",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Shield,
      title: "নিরাপদ পেমেন্ট",
      desc: "১০০% সিকিউর পেমেন্ট গেটওয়ে। আপনার তথ্য সর্বদা সুরক্ষিত।",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const steps = [
    { num: "১", text: "পছন্দের ফোনটি বেছে নিন" },
    { num: "২", text: 'চেকআউটে "EMI" সিলেক্ট করুন' },
    { num: "৩", text: "ব্যাংক ও মেয়াদ নির্বাচন করুন" },
    { num: "৪", text: "ডাউন পেমেন্ট দিন, বাকি কিস্তিতে!" },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-violet-500/5 py-16 md:py-24">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                ০% সুদে কিস্তি সুবিধা
              </Badge>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              স্বপ্নের ফোন এখনই নিন,{" "}
              <span className="bg-linear-to-r from-primary to-violet-600 bg-clip-text text-transparent">
                কিস্তিতে পরিশোধ করুন
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              কোনো লুকানো চার্জ নেই, কোনো অতিরিক্ত ফি নেই। মাত্র কয়েক মিনিটেই
              EMI অনুমোদন পান!
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="gap-2 px-8 h-12 text-base">
                  <Phone className="h-4 w-4" />
                  ফোন দেখুন
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-8 h-12 text-base"
                >
                  <Calculator className="h-4 w-4" />
                  EMI হিসাব করুন
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-12 text-center"
            >
              {[
                { value: "০%", label: "সুদের হার" },
                { value: "১২+", label: "পার্টনার ব্যাংক" },
                { value: "১০%", label: "মিনিমাম ডাউন পেমেন্ট" },
                { value: "১২ মাস", label: "সর্বোচ্চ মেয়াদ" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">কেন আমাদের EMI সেরা?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              সহজ, দ্রুত, এবং সম্পূর্ণ নিরাপদ কিস্তি সুবিধা
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/60 bg-card p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-linear-to-br ${f.gradient} text-white mb-4 shadow-sm`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMI Calculator ── */}
      <section id="calculator" className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-3 px-3 py-1 text-primary border-primary/30"
            >
              <Calculator className="h-3.5 w-3.5 mr-1" />
              ইন্টার‌্যাক্টিভ ক্যালকুলেটর
            </Badge>
            <h2 className="text-3xl font-bold mb-3">EMI হিসাব করুন</h2>
            <p className="text-muted-foreground">
              নিচের স্লাইডার ব্যবহার করে আপনার মাসিক কিস্তি জানুন
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-6">
              {/* Input Panel */}
              <div className="md:col-span-3 rounded-2xl border border-border/60 bg-card p-6 md:p-8 space-y-8">
                {/* Price Slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">ফোনের দাম</label>
                    <span className="text-lg font-bold text-primary">
                      ৳{price.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[price]}
                    onValueChange={(v) => setPrice(v[0])}
                    min={10000}
                    max={300000}
                    step={5000}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>৳১০,০০০</span>
                    <span>৳৩,০০,০০০</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">
                      ডাউন পেমেন্ট ({downPaymentPercent}%)
                    </label>
                    <span className="text-lg font-bold">
                      ৳{downPayment.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[downPaymentPercent]}
                    onValueChange={(v) => setDownPaymentPercent(v[0])}
                    min={10}
                    max={60}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>১০%</span>
                    <span>৬০%</span>
                  </div>
                </div>

                {/* Duration Select */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    কিস্তির মেয়াদ
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 9, 12].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                          duration === d
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 text-muted-foreground"
                        }`}
                      >
                        {d} মাস
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result Panel */}
              <div className="md:col-span-2 rounded-2xl border-2 border-primary/20 bg-linear-to-br from-primary/5 to-violet-500/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-6">
                    আপনার EMI সামারি
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        ফোনের দাম
                      </span>
                      <span className="font-semibold">
                        ৳{price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        ডাউন পেমেন্ট
                      </span>
                      <span className="font-semibold">
                        ৳{downPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        ঋণের পরিমাণ
                      </span>
                      <span className="font-semibold">
                        ৳{loanAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        সুদের হার
                      </span>
                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800"
                      >
                        ০%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        মেয়াদ
                      </span>
                      <span className="font-semibold">{duration} মাস</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      মাসিক কিস্তি
                    </p>
                    <motion.div
                      key={`${price}-${downPaymentPercent}-${duration}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <span className="text-4xl font-bold text-primary">
                        ৳{monthly.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /মাস
                      </span>
                    </motion.div>
                  </div>
                </div>

                <Link href="/shop" className="mt-8 block">
                  <Button className="w-full gap-2 h-11">
                    EMI তে কিনুন
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMI Table ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">কিস্তির হিসাব</h2>
            <p className="text-muted-foreground">
              জনপ্রিয় দামের ফোনের EMI পরিমাণ দেখুন (০% সুদে)
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left text-sm font-semibold py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-primary" />
                        ফোনের দাম
                      </div>
                    </th>
                    <th className="text-center text-sm font-semibold py-4 px-4">
                      ৩ মাস
                    </th>
                    <th className="text-center text-sm font-semibold py-4 px-4">
                      ৬ মাস
                    </th>
                    <th className="text-center text-sm font-semibold py-4 px-4">
                      ৯ মাস
                    </th>
                    <th className="text-center text-sm font-semibold py-4 px-4">
                      ১২ মাস
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[30000, 50000, 80000, 100000, 150000, 200000].map(
                    (p, idx) => {
                      const dp = p * 0.2;
                      const loan = p - dp;
                      return (
                        <tr
                          key={p}
                          className={`border-t border-border/40 transition-colors hover:bg-muted/30 ${
                            idx % 2 === 0 ? "" : "bg-muted/10"
                          }`}
                        >
                          <td className="py-4 px-6 font-semibold">
                            ৳{p.toLocaleString()}
                            <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                              ডাউন পেমেন্ট: ৳{dp.toLocaleString()}
                            </span>
                          </td>
                          {[3, 6, 9, 12].map((m) => (
                            <td
                              key={m}
                              className="py-4 px-4 text-center text-sm"
                            >
                              <span className="font-bold">
                                ৳{Math.ceil(loan / m).toLocaleString()}
                              </span>
                              <span className="text-muted-foreground">
                                /মাস
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-muted/30 px-6 py-3 text-xs text-muted-foreground text-center border-t border-border/40">
              * ২০% ডাউন পেমেন্ট ধরে হিসাব করা হয়েছে। প্রকৃত EMI পরিবর্তিত হতে
              পারে।
            </div>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">কিভাবে EMI নিবেন?</h2>
            <p className="text-muted-foreground">মাত্র ৪টি সহজ ধাপে</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-primary-foreground text-xl font-bold mb-4 shadow-md">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-5 -right-3 h-5 w-5 text-muted-foreground/40" />
                  )}
                  <p className="text-sm font-medium leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Supported Banks ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-3xl font-bold">পার্টনার ব্যাংকসমূহ</h2>
            </div>
            <p className="text-muted-foreground">
              দেশের শীর্ষস্থানীয় ব্যাংকগুলির সাথে আমাদের EMI পার্টনারশিপ
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {banks.map((bank, i) => (
              <motion.div
                key={bank.name}
                {...fadeUp}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border/60 bg-card hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div
                  className={`h-8 w-8 shrink-0 rounded-lg ${bank.color} flex items-center justify-center`}
                >
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium truncate">
                  {bank.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ / Important Info ── */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">জরুরি তথ্য</h2>

            <div className="space-y-4">
              {[
                {
                  q: "EMI এর জন্য কি ক্রেডিট কার্ড লাগবে?",
                  a: "হ্যাঁ, EMI সুবিধা নিতে উপরের যেকোনো ব্যাংকের ক্রেডিট কার্ড থাকতে হবে।",
                },
                {
                  q: "EMI তে কোনো অতিরিক্ত চার্জ আছে?",
                  a: "না, আমাদের কাছ থেকে কোনো অতিরিক্ত চার্জ নেই। তবে কিছু ব্যাংক প্রসেসিং ফি নিতে পারে।",
                },
                {
                  q: "সর্বনিম্ন কত টাকার প্রোডাক্টে EMI পাওয়া যায়?",
                  a: "৳১০,০০০ বা তার বেশি দামের যেকোনো প্রোডাক্টে EMI সুবিধা পাওয়া যায়।",
                },
                {
                  q: "ডাউন পেমেন্ট কত দিতে হবে?",
                  a: "সর্বনিম্ন ১০% ডাউন পেমেন্ট দিয়ে EMI শুরু করা যায়।",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-border/60 bg-card p-5"
                >
                  <h3 className="font-semibold mb-2 flex items-start gap-2">
                    <Percent className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              আজই EMI তে আপনার স্বপ্নের ফোন নিন!
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              ০% সুদে ১২ মাস পর্যন্ত কিস্তি সুবিধা। এখনই শপিং শুরু করুন।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="gap-2 px-10 h-12 text-base">
                  শপিং শুরু করুন
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 px-10 h-12 text-base"
                >
                  <Phone className="h-4 w-4" />
                  যোগাযোগ করুন
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
