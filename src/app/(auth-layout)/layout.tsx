"use client";

import React from "react";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen">
      {/* Left Side - Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-300 rounded-full blur-2xl" />
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight">
              Mobile<span className="text-blue-200">GANJ</span>
            </span>
            <p className="text-xs text-blue-200 -mt-0.5">Premium Smartphones</p>
          </div>
        </Link>

        {/* Center Content */}
        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold leading-tight">
              বাংলাদেশের সেরা
              <br />
              স্মার্টফোন শপ
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-md">
              নতুন ও ব্যবহৃত ফোন কিনুন সেরা দামে। EMI সুবিধা, ওয়ারেন্টি ও দ্রুত
              ডেলিভারি পান।
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-8 pt-4"
          >
            <div>
              <p className="text-3xl font-bold">5000+</p>
              <p className="text-sm text-blue-200">সন্তুষ্ট গ্রাহক</p>
            </div>
            <div>
              <p className="text-3xl font-bold">100+</p>
              <p className="text-sm text-blue-200">ফোন মডেল</p>
            </div>
            <div>
              <p className="text-3xl font-bold">0%</p>
              <p className="text-sm text-blue-200">EMI সুবিধা</p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-blue-200">
          <p>© {new Date().getFullYear()} MobileGanj. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
