"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Heart,
  MessageCircle,
  Truck,
  Shield,
  Clock,
  Share2,
  Star,
  CheckCircle,
  Zap,
  ChevronRight,
  Package,
  CreditCard,
  RotateCcw,
  MapPin,
  Phone,
  Copy,
  Check,
} from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import ProductGallery from "./_components/ProductGallery";
import VariantSelector from "./_components/VariantSelector";
import EMICalculator from "./_components/EMICalculator";
import ProductReviews from "./_components/ProductReviews";
import { motion } from "framer-motion";
import { useCartStore } from "@/hooks/use-cart";
import { toast } from "sonner";
import ProductCard from "@/app/(main-layout)/(home)/_components/ProductCard";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const addItem = useCartStore((state) => state.addItem);
  const product = mockProducts.find((p) => p.slug === slug);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!product) {
    notFound();
  }

  const hasOffer = product.offerPrice && product.offerPrice < product.price;
  const discount = hasOffer
    ? Math.round(((product.price - product.offerPrice!) / product.price) * 100)
    : 0;
  const savedAmount = hasOffer ? product.price - product.offerPrice! : 0;
  const displayPrice = hasOffer ? product.offerPrice! : product.price;

  // Related products (same brand or category, excluding current)
  const relatedProducts = mockProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand || p.category === product.category),
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} কার্টে যোগ হয়েছে`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "উইশলিস্ট থেকে সরানো হয়েছে" : "উইশলিস্টে যোগ হয়েছে",
    );
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      toast.success("লিংক কপি হয়েছে!");
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast.error("কপি করা যায়নি");
    }
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-muted text-muted-foreground/30"
        }`}
      />
    ));

  return (
    <div className="min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="bg-muted/30 border-b border-border/40">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              হোম
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/shop" className="hover:text-primary transition-colors">
              শপ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/shop?brand=${product.brand}`}
              className="hover:text-primary transition-colors"
            >
              {product.brand}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium truncate max-w-48">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Product Section ── */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ── Left: Gallery (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5"
          >
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </motion.div>

          {/* ── Center: Product Info (4 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-4 space-y-5"
          >
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {product.tags?.map((tag) => (
                <Badge
                  key={tag}
                  className={`text-[11px] font-medium ${
                    tag === "Hot"
                      ? "bg-orange-500 hover:bg-orange-500 text-white"
                      : tag === "Best Deal"
                        ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                        : tag === "New Arrival"
                          ? "bg-blue-500 hover:bg-blue-500 text-white"
                          : "bg-red-500 hover:bg-red-500 text-white"
                  }`}
                >
                  {tag === "Hot" && (
                    <Zap className="h-3 w-3 mr-0.5 fill-current" />
                  )}
                  {tag}
                </Badge>
              ))}
              {product.isPreOrder && (
                <Badge className="bg-violet-500 hover:bg-violet-500 text-white text-[11px]">
                  প্রি-অর্ডার
                </Badge>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-muted-foreground">
                  ব্র্যান্ড:{" "}
                  <span className="text-foreground font-medium">
                    {product.brand}
                  </span>
                </span>
                {product.productCode && (
                  <>
                    <span className="text-muted-foreground/40">|</span>
                    <span className="text-muted-foreground">
                      SKU: {product.productCode}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount || 0} রিভিউ)
                </span>
              </div>
            )}

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  ৳{displayPrice.toLocaleString()}
                </span>
                {hasOffer && (
                  <span className="text-lg text-muted-foreground line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {hasOffer && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/10 border border-red-200 dark:border-red-800">
                    {discount}% ছাড়
                  </Badge>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    ৳{savedAmount.toLocaleString()} সাশ্রয়
                  </span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                ক্যাশ প্রাইস (সকল ট্যাক্স সহ)
              </p>
            </div>

            {/* Condition */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">কন্ডিশন:</span>
              <Badge
                variant="outline"
                className={`${
                  product.condition === "Brand New"
                    ? "border-emerald-300 text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                    : product.condition === "Like New"
                      ? "border-teal-300 text-teal-700 bg-teal-50 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800"
                      : "border-amber-300 text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
                }`}
              >
                {product.condition === "Brand New"
                  ? "ব্র্যান্ড নিউ"
                  : product.condition === "Like New"
                    ? "লাইক নিউ"
                    : "ইউজড"}
              </Badge>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <div className="flex items-center gap-1.5 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    স্টকে আছে
                  </span>
                  {product.stock <= 5 && (
                    <span className="text-amber-600 dark:text-amber-400 text-xs">
                      (মাত্র {product.stock}টি বাকি)
                    </span>
                  )}
                </div>
              ) : product.isPreOrder ? (
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="h-4 w-4 text-violet-500" />
                  <span className="text-violet-600 dark:text-violet-400 font-medium">
                    প্রি-অর্ডার ({product.deliveryDays} দিনে ডেলিভারি)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-sm">
                  <Package className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    স্টক শেষ
                  </span>
                </div>
              )}
            </div>

            <Separator />

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <>
                <VariantSelector variants={product.variants} />
                <Separator />
              </>
            )}

            {/* Warranty */}
            {product.warranty && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {product.warranty}
                  </p>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
                    অফিসিয়াল ওয়ারেন্টি সুবিধা
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 h-12 text-base gap-2"
                  disabled={product.stock === 0 && !product.isPreOrder}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {product.isPreOrder ? "প্রি-অর্ডার করুন" : "কার্টে যোগ করুন"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`h-12 w-12 shrink-0 ${
                    isWishlisted
                      ? "text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                      : ""
                  }`}
                  onClick={handleWishlist}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`}
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-12 shrink-0"
                  onClick={handleShare}
                >
                  {linkCopied ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Share2 className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* EMI Quick Info */}
              <Link href="#emi-tab">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/15 hover:bg-primary/10 transition-colors cursor-pointer">
                  <CreditCard className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      EMI মাত্র ৳
                      {Math.ceil((displayPrice * 0.8) / 12).toLocaleString()}
                      /মাস
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ০% সুদে ১২ মাস পর্যন্ত কিস্তি
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>

              {/* WhatsApp / Contact */}
              <Button
                size="lg"
                variant="secondary"
                className="w-full h-11 gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                এই প্রোডাক্ট সম্পর্কে জানতে যোগাযোগ করুন
              </Button>
            </div>
          </motion.div>

          {/* ── Right: Trust & Info Sidebar (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Delivery Info Card */}
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <div className="px-4 py-3 bg-muted/50 border-b border-border/40">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  ডেলিভারি তথ্য
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">ঢাকায় ডেলিভারি</p>
                    <p className="text-xs text-muted-foreground">
                      ১-২ কার্যদিবসের মধ্যে
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Truck className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">ঢাকার বাইরে</p>
                    <p className="text-xs text-muted-foreground">
                      ৩-৫ কার্যদিবসের মধ্যে
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Package className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">ফ্রি ডেলিভারি</p>
                    <p className="text-xs text-muted-foreground">
                      ৳৫০,০০০+ অর্ডারে
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges Card */}
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <div className="px-4 py-3 bg-muted/50 border-b border-border/40">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  কেন আমাদের থেকে কিনবেন?
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  {
                    icon: CheckCircle,
                    title: "১০০% অরিজিনাল",
                    desc: "গ্যারান্টিড অথেন্টিক প্রোডাক্ট",
                  },
                  {
                    icon: Shield,
                    title: "অফিসিয়াল ওয়ারেন্টি",
                    desc: "সম্পূর্ণ ওয়ারেন্টি সুবিধা",
                  },
                  {
                    icon: RotateCcw,
                    title: "ইজি রিটার্ন",
                    desc: "৭ দিনের মধ্যে রিটার্ন পলিসি",
                  },
                  {
                    icon: CreditCard,
                    title: "০% EMI",
                    desc: "১২ মাস পর্যন্ত কিস্তি সুবিধা",
                  },
                  {
                    icon: Clock,
                    title: "দ্রুত ডেলিভারি",
                    desc: "ঢাকায় ১-২ দিনে ডেলিভারি",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <div className="px-4 py-3 bg-muted/50 border-b border-border/40">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  সাহায্য প্রয়োজন?
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  প্রোডাক্ট সম্পর্কে প্রশ্ন থাকলে যোগাযোগ করুন
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full gap-2" size="sm">
                    <Phone className="h-4 w-4" />
                    যোগাযোগ করুন
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs Section ── */}
      <section className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start bg-transparent border-b border-border/40 rounded-none p-0 h-auto gap-0">
              {[
                { value: "description", label: "বিবরণ" },
                { value: "emi", label: "EMI ক্যালকুলেটর" },
                { value: "delivery", label: "ডেলিভারি তথ্য" },
                {
                  value: "reviews",
                  label: `রিভিউ (${product.reviewCount || 0})`,
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-sm font-medium"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4">প্রোডাক্ট বিবরণ</h3>
                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    {product.description ||
                      `${product.name} — ${product.brand} এর একটি চমৎকার প্রোডাক্ট। এটি ${product.condition === "Brand New" ? "সম্পূর্ণ নতুন" : product.condition === "Like New" ? "প্রায় নতুনের মতো" : "ব্যবহৃত কিন্তু ভালো কন্ডিশনে"} এবং সম্পূর্ণ অরিজিনাল।`}
                  </p>
                </div>

                {/* Key Specs Grid */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-8">
                    <h4 className="font-semibold mb-4">মূল বৈশিষ্ট্য</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {product.variants[0].storage && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/40">
                          <span className="text-sm text-muted-foreground">
                            স্টোরেজ
                          </span>
                          <span className="text-sm font-medium ml-auto">
                            {product.variants[0].storage}
                          </span>
                        </div>
                      )}
                      {product.variants[0].ram && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/40">
                          <span className="text-sm text-muted-foreground">
                            RAM
                          </span>
                          <span className="text-sm font-medium ml-auto">
                            {product.variants[0].ram}
                          </span>
                        </div>
                      )}
                      {product.variants[0].color && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/40">
                          <span className="text-sm text-muted-foreground">
                            কালার
                          </span>
                          <span className="text-sm font-medium ml-auto">
                            {product.variants[0].color}
                          </span>
                        </div>
                      )}
                      {product.variants[0].region && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/40">
                          <span className="text-sm text-muted-foreground">
                            রিজিয়ন
                          </span>
                          <span className="text-sm font-medium ml-auto">
                            {product.variants[0].region}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="emi" className="mt-8" id="emi-tab">
              <div className="max-w-xl">
                <EMICalculator productPrice={displayPrice} />
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="mt-8">
              <div className="max-w-3xl space-y-6">
                <h3 className="text-xl font-bold mb-4">
                  ডেলিভারি ও শিপিং তথ্য
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Truck,
                      title: "স্ট্যান্ডার্ড ডেলিভারি",
                      desc: "ঢাকায় ১-২ কার্যদিবস, ঢাকার বাইরে ৩-৫ কার্যদিবস",
                    },
                    {
                      icon: Package,
                      title: "ফ্রি শিপিং",
                      desc: "৳৫০,০০০ এর উপরে অর্ডারে ফ্রি ডেলিভারি",
                    },
                    {
                      icon: CheckCircle,
                      title: "ক্যাশ অন ডেলিভারি",
                      desc: "হাতে পেয়ে পেমেন্ট করার সুবিধা",
                    },
                    {
                      icon: Shield,
                      title: "প্রোডাক্ট চেকিং",
                      desc: "ডেলিভারির আগে প্রতিটি প্রোডাক্ট চেক করা হয়",
                    },
                    {
                      icon: RotateCcw,
                      title: "রিটার্ন পলিসি",
                      desc: "৭ দিনের মধ্যে রিটার্ন বা এক্সচেঞ্জ সুবিধা",
                    },
                    {
                      icon: MapPin,
                      title: "সারাদেশে ডেলিভারি",
                      desc: "বাংলাদেশের সকল জেলায় ডেলিভারি সুবিধা",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-card"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <ProductReviews
                reviews={product.reviews}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">সম্পর্কিত প্রোডাক্ট</h2>
              <p className="text-sm text-muted-foreground mt-1">
                আপনার পছন্দ হতে পারে
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline" size="sm" className="gap-1">
                সব দেখুন <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
