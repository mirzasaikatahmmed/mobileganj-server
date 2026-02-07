'use client';

import Link from 'next/link';
import { ArrowRight, Smartphone, DollarSign, ClipboardCheck, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Tell Us About Your Phone',
    desc: 'Select brand, model, storage & condition',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: DollarSign,
    title: 'Get Instant Price',
    desc: "We'll give you the best offer",
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Smartphone,
    title: 'Visit Our Store',
    desc: "Bring it to us or we'll pick it up",
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: BadgeCheck,
    title: 'Get Paid Instantly',
    desc: 'Cash, bKash, or exchange for new phone',
    color: 'from-orange-500 to-orange-600',
  },
];

export default function SellPhoneCTASection() {
  return (
    <section className="py-12">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Sell Your Old Phone
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Get the best price for your used phone. Trade-in and upgrade to the latest model.
            </p>

            <div className="space-y-4 mb-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${step.color} flex-shrink-0`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="text-xs text-white/70">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/sell-phone">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                Sell Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
              <div className="absolute inset-8 rounded-full bg-white/5" />
              <div className="absolute inset-16 rounded-full bg-white/10 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl mb-2">📱💰</p>
                  <p className="text-xl font-bold">Up to</p>
                  <p className="text-3xl font-bold text-yellow-300">৳80,000</p>
                  <p className="text-sm text-white/70">for your old phone</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
