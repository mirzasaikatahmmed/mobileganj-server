"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { showToast } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = "ইমেইল বা ফোন নম্বর দিন";
    }
    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড দিন";
    } else if (formData.password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // TODO: Replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast.success("সফলভাবে লগইন হয়েছে!");
      router.push("/");
    } catch {
      showToast.error("লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center gap-2 justify-center mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Smartphone className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold">
          Mobile<span className="text-blue-600">GANJ</span>
        </span>
      </div>

      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight">
          আপনার অ্যাকাউন্টে লগইন করুন
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          MobileGanj-এ স্বাগতম! আপনার তথ্য দিয়ে লগইন করুন।
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email / Phone */}
        <div className="space-y-2">
          <Label htmlFor="emailOrPhone">ইমেইল বা ফোন নম্বর</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="emailOrPhone"
              type="text"
              placeholder="email@example.com বা 01XXXXXXXXX"
              className="pl-10 h-11"
              value={formData.emailOrPhone}
              onChange={(e) =>
                setFormData({ ...formData, emailOrPhone: e.target.value })
              }
              aria-invalid={!!errors.emailOrPhone}
            />
          </div>
          {errors.emailOrPhone && (
            <p className="text-xs text-destructive">{errors.emailOrPhone}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <Link
              href="#"
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10 pr-10 h-11"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, rememberMe: checked as boolean })
            }
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal">
            আমাকে মনে রাখুন
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              লগইন হচ্ছে...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              লগইন করুন
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">অথবা</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-1 gap-3">
        <Button variant="outline" className="h-11" type="button">
          <Chrome className="h-4 w-4 mr-2" />
          Google দিয়ে লগইন
        </Button>
      </div>

      {/* Register Link */}
      <p className="text-center text-sm text-muted-foreground">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          নতুন অ্যাকাউন্ট তৈরি করুন
        </Link>
      </p>
    </motion.div>
  );
}
