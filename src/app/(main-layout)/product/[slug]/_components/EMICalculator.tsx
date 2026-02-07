"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Calculator, CreditCard } from "lucide-react";

interface EMICalculatorProps {
  productPrice: number;
}

export default function EMICalculator({ productPrice }: EMICalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [duration, setDuration] = useState<3 | 6 | 9 | 12>(6);

  const downPayment = Math.round((productPrice * downPaymentPercent) / 100);
  const loanAmount = productPrice - downPayment;
  const monthlyInstallment = Math.ceil(loanAmount / duration);
  const totalPayable = downPayment + loanAmount;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Calculator className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold">EMI ক্যালকুলেটর</h3>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-5 md:p-6 space-y-6">
        {/* Down Payment Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">
              ডাউন পেমেন্ট ({downPaymentPercent}%)
            </label>
            <span className="text-sm font-bold">
              ৳{downPayment.toLocaleString()}
            </span>
          </div>
          <Slider
            value={[downPaymentPercent]}
            onValueChange={(v) => setDownPaymentPercent(v[0])}
            min={10}
            max={60}
            step={5}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>১০%</span>
            <span>৬০%</span>
          </div>
        </div>

        {/* Duration Buttons */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            কিস্তির মেয়াদ
          </label>
          <div className="grid grid-cols-4 gap-2">
            {([3, 6, 9, 12] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
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

        <Separator />

        {/* Results */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">প্রোডাক্ট প্রাইস</span>
            <span className="font-medium">
              ৳{productPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ডাউন পেমেন্ট</span>
            <span className="font-medium">৳{downPayment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ঋণের পরিমাণ</span>
            <span className="font-medium">৳{loanAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">সুদের হার</span>
            <Badge
              variant="outline"
              className="text-emerald-600 border-emerald-300 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800 text-xs"
            >
              ০%
            </Badge>
          </div>

          <Separator />

          {/* Monthly EMI Highlight */}
          <div className="text-center py-3 rounded-xl bg-primary/5 border border-primary/15">
            <p className="text-xs text-muted-foreground mb-1">মাসিক কিস্তি</p>
            <motion.div
              key={`${downPaymentPercent}-${duration}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-3xl font-bold text-primary">
                ৳{monthlyInstallment.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">/মাস</span>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-1">
              {duration} মাসের জন্য
            </p>
          </div>

          <div className="flex justify-between text-sm pt-1">
            <span className="font-medium">মোট পরিশোধযোগ্য</span>
            <span className="font-bold">৳{totalPayable.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        * EMI সুবিধা অনুমোদন সাপেক্ষে। শর্তাবলী প্রযোজ্য।
      </p>
    </div>
  );
}
