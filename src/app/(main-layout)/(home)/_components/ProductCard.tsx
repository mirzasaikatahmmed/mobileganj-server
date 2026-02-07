"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star, Eye, Zap, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/hooks/use-cart";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasOffer = product.offerPrice && product.offerPrice < product.price;
  const discount = hasOffer
    ? Math.round(((product.price - product.offerPrice!) / product.price) * 100)
    : 0;
  const savedAmount = hasOffer ? product.price - product.offerPrice! : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} কার্টে যোগ হয়েছে`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? "উইশলিস্ট থেকে সরানো হয়েছে" : "উইশলিস্টে যোগ হয়েছে",
    );
  };

  // Rating stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : i < rating
              ? "fill-amber-400/50 text-amber-400"
              : "fill-muted text-muted-foreground/30"
        }`}
      />
    ));
  };

  const isOutOfStock = product.stock === 0 && !product.isPreOrder;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="group h-full"
    >
      <Link href={`/product/${product.slug}`} className="block h-full">
        <div className="relative h-full rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
          {/* ── Image Section ── */}
          <div className="relative aspect-square bg-muted/30 overflow-hidden">
            {/* Skeleton loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}

            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* ── Top Left Badges ── */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
              {hasOffer && (
                <Badge className="bg-red-500 hover:bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 shadow-sm">
                  -{discount}%
                </Badge>
              )}
              {product.tags?.includes("New Arrival") && (
                <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  নতুন
                </Badge>
              )}
              {product.tags?.includes("Hot") && (
                <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  <Zap className="h-2.5 w-2.5 mr-0.5 fill-current" />
                  হট
                </Badge>
              )}
              {product.tags?.includes("Best Deal") && (
                <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  বেস্ট ডিল
                </Badge>
              )}
              {product.isPreOrder && (
                <Badge className="bg-violet-500 hover:bg-violet-500 text-white text-[10px] font-medium px-2 py-0.5 shadow-sm">
                  প্রি-অর্ডার
                </Badge>
              )}
            </div>

            {/* ── Condition Badge (Top Right) ── */}
            {product.condition !== "Brand New" && (
              <div className="absolute top-2.5 right-2.5">
                <Badge
                  variant="outline"
                  className={`text-[10px] font-medium backdrop-blur-sm shadow-sm ${
                    product.condition === "Used"
                      ? "bg-amber-500/90 text-white border-amber-500"
                      : "bg-teal-500/90 text-white border-teal-500"
                  }`}
                >
                  {product.condition === "Used" ? "ইউজড" : "লাইক নিউ"}
                </Badge>
              </div>
            )}

            {/* ── Hover Action Buttons ── */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <Button
                size="icon"
                variant="secondary"
                className={`h-8 w-8 rounded-full shadow-md backdrop-blur-sm transition-colors ${
                  isWishlisted
                    ? "bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900"
                    : "bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                }`}
                onClick={handleWishlist}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${isWishlisted ? "fill-red-500" : ""}`}
                />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full shadow-md bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* ── Out of Stock Overlay ── */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                <span className="bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  স্টক শেষ
                </span>
              </div>
            )}
          </div>

          {/* ── Content Section ── */}
          <div className="p-3.5 flex flex-col gap-2">
            {/* Brand */}
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </span>

            {/* Product Name */}
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200 min-h-10">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                </div>
                <span className="text-[11px] font-medium text-foreground/70">
                  {product.rating}
                </span>
                {product.reviewCount && (
                  <span className="text-[11px] text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Price Section */}
            <div className="flex flex-col gap-0.5 mt-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">
                  ৳
                  {(hasOffer
                    ? product.offerPrice!
                    : product.price
                  ).toLocaleString()}
                </span>
                {hasOffer && (
                  <span className="text-xs text-muted-foreground line-through">
                    ৳{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              {hasOffer && (
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  ৳{savedAmount.toLocaleString()} সেভ করুন
                </span>
              )}
            </div>

            {/* Delivery / Stock Info */}
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              {isLowStock ? (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  মাত্র {product.stock}টি বাকি!
                </span>
              ) : product.deliveryDays ? (
                <>
                  <Truck className="h-3 w-3" />
                  <span>{product.deliveryDays} দিনে ডেলিভারি</span>
                </>
              ) : (
                <>
                  <Truck className="h-3 w-3" />
                  <span>দ্রুত ডেলিভারি</span>
                </>
              )}
            </div>

            {/* Add to Cart Button */}
            <AnimatePresence>
              <motion.div initial={false} className="pt-1">
                <Button
                  className={`w-full py-6 text-base  rounded-lg transition-all duration-200 ${
                    isOutOfStock
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : product.isPreOrder
                        ? "bg-violet-600 hover:bg-violet-700 text-white"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                  size="sm"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                  {isOutOfStock
                    ? "স্টক শেষ"
                    : product.isPreOrder
                      ? "প্রি-অর্ডার করুন"
                      : "কার্টে যোগ করুন"}
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
