'use client';

import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: '3-7 days from Dubai',
  },
  {
    icon: Shield,
    title: 'Authentic Products',
    description: '100% original guarantee',
  },
  {
    icon: CreditCard,
    title: 'EMI Available',
    description: 'Flexible payment plans',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="bg-primary/10 p-3 rounded-lg">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
