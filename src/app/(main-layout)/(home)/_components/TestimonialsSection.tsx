"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Karim Ahmed",
    location: "Rangpur",
    rating: 5,
    text: "iPhone 15 Pro Max কিনলাম Mobile GANJ থেকে। ১০০% অরিজিনাল প্রোডাক্ট পেয়েছি। EMI সুবিধাও দারুণ!",
    product: "iPhone 15 Pro Max",
    avatar: "👨",
  },
  {
    id: 2,
    name: "Fatima Akter",
    location: "Dhaka",
    rating: 5,
    text: "Pre-order করেছিলাম Dubai থেকে Samsung S24 Ultra। ৫ দিনের মধ্যে পেয়ে গেছি। Excellent service!",
    product: "Samsung S24 Ultra",
    avatar: "👩",
  },
  {
    id: 3,
    name: "Rahim Khan",
    location: "Bogura",
    rating: 5,
    text: "পুরানো iPhone বিক্রি করে নতুন ফোন কিনলাম। Exchange offer সত্যিই ভালো। ধন্যবাদ Mobile GANJ!",
    product: "Trade-in Service",
    avatar: "👨",
  },
  {
    id: 4,
    name: "Sumaiya Rahman",
    location: "Rangpur",
    rating: 4,
    text: "Used phone কিনেছি, condition ekdom new মনে হচ্ছে। Battery health 92%। ভালো লেগেছে।",
    product: "Used iPhone 14 Pro",
    avatar: "👩",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          What Our <span className="text-primary">Customers</span> Say
        </h2>
        <p className="text-muted-foreground">
          Trusted by 2000+ happy customers across Bangladesh
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border rounded-xl p-5 hover:shadow-md transition-all"
          >
            <Quote className="w-8 h-8 text-primary/20 mb-3" />
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              &quot;{t.text}&quot;
            </p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < t.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{t.avatar}</span>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.location} • {t.product}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
