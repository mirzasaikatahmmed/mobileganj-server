'use client';

import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+8801234567890',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/8801234567890',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: MessageCircle,
      label: 'Messenger',
      href: 'https://m.me/mobileganj',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-3 space-y-2 flex flex-col items-end"
          >
            {contactOptions.map((option, idx) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={option.href} target="_blank">
                  <Button
                    className={`${option.color} text-white shadow-lg justify-start gap-2`}
                    size="default"
                  >
                    <option.icon className="h-5 w-5" />
                    <span className="hidden md:inline">{option.label}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon-lg"
        className="rounded-full shadow-2xl bg-primary hover:bg-primary/90 h-12 w-12 md:h-14 md:w-14"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
        )}
      </Button>
    </div>
  );
}
