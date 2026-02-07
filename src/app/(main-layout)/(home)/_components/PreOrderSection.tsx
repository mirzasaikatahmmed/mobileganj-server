'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PreOrderSection() {
  return (
    <section className="py-12">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pre-Order from Dubai
              </h2>
              <p className="text-lg mb-6 text-white/90">
                Get the latest smartphones directly from Dubai. Fast delivery within 3-7 working days with EMI options available.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">3-7 Days Delivery</p>
                    <p className="text-sm text-white/80">Fast shipping from Dubai</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">100% Authentic</p>
                    <p className="text-sm text-white/80">Original products guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">EMI Available</p>
                    <p className="text-sm text-white/80">Flexible payment options</p>
                  </div>
                </div>
              </div>

              <Link href="/pre-order">
                <Button size="lg" variant="secondary" className="gap-2">
                  Explore Pre-Orders
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-64 md:h-96 bg-white/10 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-white">
                <p className="text-6xl mb-4">📱</p>
                <p className="text-xl font-semibold">iPhone 16 Series</p>
                <p className="text-white/80">Coming Soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
