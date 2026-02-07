"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  MessageCircle,
  Headphones,
  User,
  StickyNote,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// ─── Animation variants ───────────────────────────────────
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

// ─── Contact Methods Data ─────────────────────────────────
const contactMethods = [
  {
    icon: Phone,
    title: "ফোন করুন",
    details: ["+৮৮০ ১২৩৪-৫৬৭৮৯০", "+৮৮০ ১৯৮৭-৬৫৪৩২১"],
    action: "এখনই কল করুন",
    link: "tel:+8801234567890",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "hover:border-blue-300 dark:hover:border-blue-800",
  },
  {
    icon: MessageCircle,
    title: "হোয়াটসঅ্যাপ",
    details: ["+৮৮০ ১২৩৪-৫৬৭৮৯০"],
    action: "চ্যাট করুন",
    link: "https://wa.me/8801234567890",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "hover:border-emerald-300 dark:hover:border-emerald-800",
  },
  {
    icon: Send,
    title: "ফেসবুক মেসেঞ্জার",
    details: ["Mobile GANJ Official"],
    action: "মেসেজ করুন",
    link: "https://facebook.com",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "hover:border-violet-300 dark:hover:border-violet-800",
  },
  {
    icon: Mail,
    title: "ইমেইল",
    details: ["info@mobileganj.com"],
    action: "ইমেইল পাঠান",
    link: "mailto:info@mobileganj.com",
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    borderColor: "hover:border-rose-300 dark:hover:border-rose-800",
  },
];

// ─── FAQ Data ─────────────────────────────────────────────
const faqs = [
  {
    q: "অর্ডার করার পর কত দিনে ডেলিভারি পাব?",
    a: "ঢাকায় ২৪ ঘণ্টা এবং ঢাকার বাইরে ৪৮-৭২ ঘণ্টার মধ্যে ডেলিভারি দেওয়া হয়।",
  },
  {
    q: "রিটার্ন পলিসি কেমন?",
    a: "পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে রিটার্ন করতে পারবেন। পণ্যে কোনো ত্রুটি থাকলে সম্পূর্ণ রিফান্ড বা এক্সচেঞ্জ।",
  },
  {
    q: "EMI সুবিধা কিভাবে পাব?",
    a: "৳১০,০০০+ যেকোনো পণ্যে ৩-১২ মাসের EMI সুবিধা পাবেন। বিস্তারিত জানতে আমাদের EMI পেজ দেখুন।",
  },
  {
    q: "পুরানো ফোন কি বিক্রি করতে পারব?",
    a: "হ্যাঁ! আমাদের Sell Phone সেকশনে আপনার ফোনের তথ্য দিন, আমরা সেরা দাম অফার করব।",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্যগুলো পূরণ করুন");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast.success(
      "আপনার মেসেজ সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।",
    );
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 sm:py-16 relative">
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
            <span className="text-foreground font-medium">যোগাযোগ</span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 px-3 py-1">
                <Headphones className="h-3.5 w-3.5 mr-1.5" />
                আমরা সবসময় আপনার পাশে
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            >
              আমাদের সাথে{" "}
              <span className="text-primary relative">
                যোগাযোগ করুন
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
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              যেকোনো প্রশ্ন, পরামর্শ বা সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন।
              আমাদের দক্ষ টিম সবসময় আপনার সেবায় প্রস্তুত।
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── Contact Methods ─── */}
      <section className="border-b border-border/40">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {contactMethods.map((method) => (
              <motion.div key={method.title} variants={scaleIn}>
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card
                    className={`rounded-2xl border-border/60 h-full hover:shadow-lg hover:shadow-primary/5 ${method.borderColor} transition-all duration-300 group cursor-pointer`}
                  >
                    <CardContent className="p-5 sm:p-6 text-center">
                      <div
                        className={`w-14 h-14 rounded-2xl ${method.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <method.icon className={`h-7 w-7 ${method.color}`} />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base mb-2">
                        {method.title}
                      </h3>
                      {method.details.map((detail, i) => (
                        <p
                          key={i}
                          className="text-xs sm:text-sm text-muted-foreground mb-0.5"
                        >
                          {detail}
                        </p>
                      ))}
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline underline-offset-2">
                        {method.action}
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* ─── Form + Store Info ─── */}
        <section className="py-12 sm:py-16">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* ─── LEFT: Contact Form ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Send className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">মেসেজ পাঠান</h2>
                      <p className="text-xs text-muted-foreground">
                        আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেব
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="flex items-center gap-1.5 text-sm font-medium"
                        >
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          আপনার নাম <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="নাম লিখুন"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="h-11 rounded-lg"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="phone"
                          className="flex items-center gap-1.5 text-sm font-medium"
                        >
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          ফোন নম্বর <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="০১XXXXXXXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="h-11 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-1.5 text-sm font-medium"
                      >
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        ইমেইল{" "}
                        <span className="text-muted-foreground text-xs">
                          (ঐচ্ছিক)
                        </span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="h-11 rounded-lg"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="subject"
                        className="flex items-center gap-1.5 text-sm font-medium"
                      >
                        <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />
                        বিষয়{" "}
                        <span className="text-muted-foreground text-xs">
                          (ঐচ্ছিক)
                        </span>
                      </Label>
                      <Input
                        id="subject"
                        placeholder="কি বিষয়ে যোগাযোগ করতে চান?"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subject: e.target.value,
                          })
                        }
                        className="h-11 rounded-lg"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="flex items-center gap-1.5 text-sm font-medium"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                        মেসেজ <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="আপনার মেসেজ বিস্তারিত লিখুন..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        required
                        rows={5}
                        className="resize-none rounded-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl gap-2 text-base font-semibold py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                          পাঠানো হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Send className="h-4.5 w-4.5" />
                          মেসেজ পাঠান
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── RIGHT: Store Info ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="lg:col-span-5 space-y-5"
            >
              {/* Store Visit Card */}
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="font-bold text-lg">আমাদের দোকান</h2>
                  </div>
                </div>
                <CardContent className="p-5 space-y-5">
                  {/* Address */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">ঠিকানা</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        ১২৩ মেইন স্ট্রিট, গুলশান-১
                        <br />
                        ঢাকা-১২১২, বাংলাদেশ
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Business Hours */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1.5">
                        ব্যবসায়িক সময়
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-muted-foreground">
                            শনিবার - বৃহস্পতিবার
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-medium px-2 py-0.5"
                          >
                            সকাল ১০:০০ - রাত ৮:০০
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-muted-foreground">
                            শুক্রবার
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-medium px-2 py-0.5"
                          >
                            দুপুর ২:০০ - রাত ৮:০০
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Quick Contact */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">
                        দ্রুত যোগাযোগ
                      </p>
                      <p className="text-sm text-muted-foreground">
                        +৮৮০ ১২৩৪-৫৬৭৮৯০
                      </p>
                      <p className="text-sm text-muted-foreground">
                        info@mobileganj.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="rounded-2xl border-border/60 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                    {/* Decorative map-like elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/4 left-1/3 w-20 h-20 rounded-full border-2 border-primary" />
                      <div className="absolute top-1/3 left-1/4 w-32 h-0.5 bg-primary/50 rotate-45" />
                      <div className="absolute bottom-1/3 right-1/4 w-24 h-0.5 bg-primary/50 -rotate-12" />
                      <div className="absolute top-1/2 right-1/3 w-16 h-0.5 bg-primary/50 rotate-90" />
                    </div>

                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                      <MapPin className="h-8 w-8 text-primary" />
                      <div className="absolute -bottom-1 w-4 h-2 bg-primary/20 rounded-full blur-sm" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">গুলশান-১, ঢাকা</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Google Maps শীঘ্রই যুক্ত হবে
                      </p>
                    </div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full gap-1.5 text-xs"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        ম্যাপে দেখুন
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Quick support badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: CheckCircle2, text: "২৪ ঘণ্টায় উত্তর" },
                  { icon: Headphones, text: "২৪/৭ সাপোর্ট" },
                  { icon: ShieldCheck, text: "বিশ্বস্ত সেবা" },
                ].map((badge) => (
                  <Badge
                    key={badge.text}
                    variant="outline"
                    className="rounded-full px-3 py-1.5 gap-1.5 text-xs font-medium border-border/60"
                  >
                    <badge.icon className="h-3.5 w-3.5 text-primary" />
                    {badge.text}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="pb-16 sm:pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                সচরাচর জিজ্ঞাসা
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              সাধারণ প্রশ্নোত্তর
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground max-w-lg mx-auto"
            >
              আমাদের কাছে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নগুলোর উত্তর
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="rounded-2xl border-border/60 h-full hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-sm font-bold text-primary">
                          {i + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
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
              <Headphones className="h-10 w-10 text-primary mx-auto mb-4" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="text-2xl sm:text-3xl font-bold mb-3"
            >
              এখনো প্রশ্ন আছে?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-muted-foreground mb-8"
            >
              সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে মেসেজ করুন — আমরা সবসময় আপনার
              পাশে!
            </motion.p>
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="tel:+8801234567890">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  <Phone className="h-4.5 w-4.5" />
                  কল করুন
                </Button>
              </a>
              <a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 gap-2"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  হোয়াটসঅ্যাপ
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
