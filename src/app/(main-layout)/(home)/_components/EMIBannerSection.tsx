"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, ArrowRight } from "lucide-react";

export default function EMIBannerSection() {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold">
                EMI Available — 0% Interest!
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Buy any phone with easy installments. 3, 6, 9, or 12 months EMI.
                No hidden charges.
              </p>
            </div>
          </div>
          <Link href="/emi">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 whitespace-nowrap font-semibold"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
