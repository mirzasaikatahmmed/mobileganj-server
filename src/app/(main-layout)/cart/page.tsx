"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/hooks/use-cart";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShoppingCart,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Package,
  X,
  Heart,
  Gift,
  Percent,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ─── Helpers ──────────────────────────────────────────────
function getConditionBadge(condition: string) {
  const map: Record<string, { label: string; className: string }> = {
    "Brand New": {
      label: "নতুন",
      className:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    },
    "Like New": {
      label: "প্রায় নতুন",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
    },
    Used: {
      label: "ব্যবহৃত",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    },
  };
  return (
    map[condition] || {
      label: condition,
      className: "bg-muted text-muted-foreground",
    }
  );
}

// ─── Empty Cart ───────────────────────────────────────────
function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          হোম
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">কার্ট</span>
      </nav>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-16"
      >
        <div className="relative mx-auto mb-6 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-primary/5" />
          <div className="absolute inset-3 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="h-14 w-14 text-primary/40" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">আপনার কার্ট খালি!</h2>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          আপনার পছন্দের পণ্যগুলো কার্টে যোগ করুন এবং সহজেই অর্ডার করুন
        </p>
        <Link href="/shop">
          <Button size="lg" className="rounded-full px-8 gap-2">
            <ShoppingBag className="h-4.5 w-4.5" />
            শপিং শুরু করুন
          </Button>
        </Link>

        {/* Suggestions */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { icon: Gift, label: "অফার দেখুন", href: "/offers" },
            { icon: Package, label: "নতুন পণ্য", href: "/shop" },
            { icon: Percent, label: "EMI সুবিধা", href: "/emi" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Cart Item Row ────────────────────────────────────────
function CartItemRow({
  item,
  index,
  onUpdateQuantity,
  onRemove,
}: {
  item: ReturnType<typeof useCartStore.getState>["items"][0];
  index: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const [removing, setRemoving] = useState(false);
  const unitPrice = item.offerPrice || item.price;
  const subtotal = unitPrice * item.quantity;
  const saved = item.offerPrice
    ? (item.price - item.offerPrice) * item.quantity
    : 0;
  const badge = getConditionBadge(item.condition);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: removing ? 0 : 1, x: removing ? -60 : 0 }}
      exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="group relative bg-card border border-border/60 rounded-2xl p-4 sm:p-5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
        {/* Remove button (top-right on mobile) */}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 sm:hidden p-1.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          aria-label="Remove item"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex gap-4">
          {/* Product Image */}
          <Link href={`/product/${item.slug}`} className="shrink-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-muted/50 rounded-xl overflow-hidden group-hover:shadow-md transition-shadow">
              <Image
                src={item.images[0] || "/placeholder.jpg"}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.offerPrice && (
                <div className="absolute top-1.5 left-1.5">
                  <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md">
                    {Math.round(
                      ((item.price - item.offerPrice) / item.price) * 100,
                    )}
                    % OFF
                  </Badge>
                </div>
              )}
            </div>
          </Link>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-semibold text-sm sm:text-base leading-tight hover:text-primary transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs text-muted-foreground">
                    {item.brand}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 border-0 font-medium ${badge.className}`}
                  >
                    {badge.label}
                  </Badge>
                </div>
                {item.selectedVariant && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {item.selectedVariant.storage && (
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">
                        {item.selectedVariant.storage}
                      </span>
                    )}
                    {item.selectedVariant.color && (
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">
                        {item.selectedVariant.color}
                      </span>
                    )}
                    {item.selectedVariant.ram && (
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">
                        {item.selectedVariant.ram}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop remove */}
              <button
                onClick={handleRemove}
                className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors shrink-0"
                aria-label="Remove item"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>সরান</span>
              </button>
            </div>

            {/* Price + Quantity row */}
            <div className="flex items-end justify-between mt-3 gap-3">
              {/* Quantity */}
              <div className="flex items-center gap-0.5 bg-muted/50 rounded-full p-0.5">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-background disabled:opacity-40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-background disabled:opacity-40 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-lg sm:text-xl font-bold text-foreground tabular-nums">
                  ৳{subtotal.toLocaleString("bn-BD")}
                </p>
                {item.offerPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    ৳{(item.price * item.quantity).toLocaleString("bn-BD")}
                  </p>
                )}
                {saved > 0 && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    ৳{saved.toLocaleString("bn-BD")} সেভ
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stock warning */}
        {item.stock <= 3 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
            <Info className="h-3.5 w-3.5" />
            <span>মাত্র {item.stock}টি স্টকে আছে</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Cart Page ───────────────────────────────────────
export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const totalSaved = useMemo(
    () =>
      items.reduce((acc, item) => {
        if (item.offerPrice) {
          return acc + (item.price - item.offerPrice) * item.quantity;
        }
        return acc;
      }, 0),
    [items],
  );
  const deliveryCharge = totalPrice >= 5000 ? 0 : 80;
  const grandTotal = totalPrice + deliveryCharge;

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          হোম
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/shop" className="hover:text-primary transition-colors">
          শপ
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">কার্ট</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            শপিং কার্ট
            <span className="text-lg sm:text-xl font-normal text-muted-foreground ml-2">
              ({totalItems}টি পণ্য)
            </span>
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="self-start flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          সব মুছুন
        </button>
      </div>

      {/* Savings banner */}
      {totalSaved > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl px-4 py-3"
        >
          <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
            <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              আপনি মোট ৳{totalSaved.toLocaleString("bn-BD")} সেভ করছেন!
            </p>
            <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
              এই অর্ডারে অফার মূল্যে পণ্য পাচ্ছেন
            </p>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        {/* ─── Cart Items ─── */}
        <div className="lg:col-span-8 space-y-3">
          {/* Free delivery progress */}
          {totalPrice < 5000 && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 rounded-xl px-4 py-3 mb-1">
              <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                <Truck className="h-4 w-4 shrink-0" />
                <span>
                  আরো ৳{(5000 - totalPrice).toLocaleString("bn-BD")} অর্ডার করলে{" "}
                  <strong>ফ্রি ডেলিভারি</strong> পাবেন!
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((totalPrice / 5000) * 100, 100)}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => (
              <CartItemRow
                key={item.id}
                item={item}
                index={idx}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </AnimatePresence>

          {/* Continue shopping */}
          <div className="pt-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4"
            >
              <ShoppingBag className="h-4 w-4" />
              আরও শপিং করুন
            </Link>
          </div>
        </div>

        {/* ─── Order Summary Sidebar ─── */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            {/* Summary Card */}
            <Card className="rounded-2xl border-border/60 overflow-hidden">
              <div className="bg-muted/30 px-5 py-4 border-b border-border/40">
                <h2 className="font-bold text-lg">অর্ডার সারাংশ</h2>
              </div>
              <CardContent className="p-5 space-y-4">
                {/* Line items summary */}
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      সাবটোটাল ({totalItems}টি পণ্য)
                    </span>
                    <span className="font-medium tabular-nums">
                      ৳{(totalPrice + totalSaved).toLocaleString("bn-BD")}
                    </span>
                  </div>
                  {totalSaved > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400">
                        ডিসকাউন্ট
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium tabular-nums">
                        -৳{totalSaved.toLocaleString("bn-BD")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ডেলিভারি চার্জ
                    </span>
                    <span
                      className={`font-medium ${deliveryCharge === 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}
                    >
                      {deliveryCharge === 0 ? "ফ্রি" : `৳${deliveryCharge}`}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Coupon */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    কুপন কোড
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="কোড লিখুন..."
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="h-9 text-sm rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 h-9 rounded-lg px-4"
                      disabled={!couponCode.trim()}
                      onClick={() => setCouponApplied(true)}
                    >
                      প্রয়োগ
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-amber-600 mt-1.5">
                      কুপন কোডটি সঠিক নয়
                    </p>
                  )}
                </div>

                <Separator />

                {/* Grand Total */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-base">সর্বমোট</p>
                    <p className="text-[11px] text-muted-foreground">
                      (ভ্যাট সহ)
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary tabular-nums">
                    ৳{grandTotal.toLocaleString("bn-BD")}
                  </p>
                </div>

                {/* EMI hint */}
                <div className="bg-primary/5 rounded-lg px-3 py-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    অথবা মাসিক{" "}
                    <span className="font-semibold text-primary">
                      ৳{Math.round(grandTotal / 12).toLocaleString("bn-BD")}
                    </span>{" "}
                    থেকে EMI
                  </p>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button
                    size="lg"
                    className="w-full rounded-xl gap-2 text-base font-semibold py-6"
                  >
                    চেকআউটে যান
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="rounded-2xl border-border/60">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: Truck,
                      title: "ফ্রি ডেলিভারি",
                      desc: "৳৫,০০০+ অর্ডারে",
                      color: "text-blue-500",
                    },
                    {
                      icon: ShieldCheck,
                      title: "নিরাপদ পেমেন্ট",
                      desc: "১০০% সুরক্ষিত",
                      color: "text-emerald-500",
                    },
                    {
                      icon: RotateCcw,
                      title: "ইজি রিটার্ন",
                      desc: "৭ দিনের মধ্যে",
                      color: "text-orange-500",
                    },
                    {
                      icon: Heart,
                      title: "অরিজিনাল পণ্য",
                      desc: "১০০% গ্যারান্টি",
                      color: "text-rose-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-2.5 p-2"
                    >
                      <item.icon
                        className={`h-4.5 w-4.5 ${item.color} shrink-0 mt-0.5`}
                      />
                      <div>
                        <p className="text-xs font-semibold leading-tight">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment methods hint */}
            <div className="text-center">
              <p className="text-[11px] text-muted-foreground">
                বিকাশ · নগদ · রকেট · কার্ড · ক্যাশ অন ডেলিভারি
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
