"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, ThumbsUp, CheckCircle, MessageSquare } from "lucide-react";
import { Review } from "@/types/product";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ProductReviewsProps {
  reviews?: Review[];
  rating?: number;
  reviewCount?: number;
}

export default function ProductReviews({
  reviews = [],
  rating = 0,
  reviewCount = 0,
}: ProductReviewsProps) {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("রিভিউ সফলভাবে জমা হয়েছে!");
    setUserRating(0);
    setComment("");
  };

  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.floor(r.rating) === star).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => Math.floor(r.rating) === star).length /
            reviews.length) *
          100
        : 0,
  }));

  return (
    <div className="max-w-3xl space-y-8">
      {/* ── Rating Summary ── */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Average Rating */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-border/60 bg-card text-center">
          <div className="text-5xl font-bold text-foreground mb-2">
            {rating.toFixed(1)}
          </div>
          <div className="flex items-center gap-0.5 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {reviewCount} টি রিভিউ এর উপর ভিত্তি করে
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="p-6 rounded-xl border border-border/60 bg-card space-y-2.5">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-2.5">
              <span className="text-sm font-medium w-3">{d.star}</span>
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
              <span className="text-xs text-muted-foreground w-6 text-right">
                {d.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Write Review ── */}
      <div className="rounded-xl border border-border/60 bg-card p-5 md:p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          রিভিউ লিখুন
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              আপনার রেটিং
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`${star} স্টার রেটিং`}
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      star <= (hoverRating || userRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30 hover:text-amber-300"
                    }`}
                  />
                </button>
              ))}
              {userRating > 0 && (
                <span className="text-sm text-muted-foreground ml-2 self-center">
                  {userRating === 1
                    ? "খারাপ"
                    : userRating === 2
                      ? "মোটামুটি"
                      : userRating === 3
                        ? "ভালো"
                        : userRating === 4
                          ? "দারুণ"
                          : "অসাধারণ!"}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              আপনার মতামত
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="এই প্রোডাক্ট সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন..."
              rows={4}
              className="resize-none"
              required
            />
          </div>

          <Button type="submit" disabled={userRating === 0} className="gap-2">
            <Star className="h-4 w-4" />
            রিভিউ জমা দিন
          </Button>
        </form>
      </div>

      {/* ── Reviews List ── */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            সকল রিভিউ
            <Badge variant="secondary" className="text-xs">
              {reviews.length}
            </Badge>
          </h3>

          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-xl border border-border/60 bg-card p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">
                          {review.userName}
                        </p>
                        {review.verified && (
                          <Badge
                            variant="outline"
                            className="text-[10px] text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800 gap-0.5"
                          >
                            <CheckCircle className="h-2.5 w-2.5" />
                            যাচাইকৃত
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3.5 w-3.5 ${
                                star <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-muted text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-13">
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="text-center py-12 rounded-xl border border-dashed border-border/60">
          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground font-medium">
            এখনো কোনো রিভিউ নেই
          </p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            প্রথম রিভিউ দিন!
          </p>
        </div>
      )}
    </div>
  );
}
