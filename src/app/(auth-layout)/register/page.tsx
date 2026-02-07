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
  User,
  Phone,
  ArrowRight,
  Chrome,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { showToast } from "@/lib/toast";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "আপনার নাম দিন";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর দিন";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "সঠিক ফোন নম্বর দিন (যেমন: 01XXXXXXXXX)";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল দিন";
    }
    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড দিন";
    } else if (formData.password.length < 6) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "শর্তাবলী মেনে নিন";
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
      showToast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/login");
    } catch {
      showToast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return { level: 0, text: "", color: "" };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 2)
      return { level: score, text: "দুর্বল", color: "bg-red-500" };
    if (score <= 3)
      return { level: score, text: "মাঝারি", color: "bg-yellow-500" };
    return { level: score, text: "শক্তিশালী", color: "bg-green-500" };
  };

  const strength = passwordStrength();

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
          নতুন অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          MobileGanj-এ যোগ দিন এবং সেরা ডিল পান।
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">পুরো নাম *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="আপনার নাম লিখুন"
              className="pl-10 h-11"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              aria-invalid={!!errors.name}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">ফোন নম্বর *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              className="pl-10 h-11"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              aria-invalid={!!errors.phone}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">
            ইমেইল{" "}
            <span className="text-muted-foreground font-normal">(ঐচ্ছিক)</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="pl-10 h-11"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">পাসওয়ার্ড *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="কমপক্ষে ৬ অক্ষর"
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
          {formData.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= strength.level ? strength.color : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                পাসওয়ার্ড শক্তি: {strength.text}
              </p>
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              className="pl-10 pr-10 h-11"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {formData.confirmPassword &&
            formData.password === formData.confirmPassword && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                পাসওয়ার্ড মিলেছে
              </p>
            )}
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms */}
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeTerms: checked as boolean })
              }
              className="mt-0.5"
            />
            <Label
              htmlFor="agreeTerms"
              className="text-sm font-normal leading-snug"
            >
              আমি MobileGanj-এর{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                শর্তাবলী
              </Link>{" "}
              ও{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                গোপনীয়তা নীতি
              </Link>{" "}
              মেনে নিচ্ছি
            </Label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-destructive ml-6">{errors.agreeTerms}</p>
          )}
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
              অ্যাকাউন্ট তৈরি হচ্ছে...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              অ্যাকাউন্ট তৈরি করুন
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

      {/* Social Register */}
      <div className="grid grid-cols-1 gap-3">
        <Button variant="outline" className="h-11" type="button">
          <Chrome className="h-4 w-4 mr-2" />
          Google দিয়ে রেজিস্টার
        </Button>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          লগইন করুন
        </Link>
      </p>
    </motion.div>
  );
}
