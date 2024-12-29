"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useLanguageStore } from '@/store/language';

export default function WelcomePage() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const { t } = useLanguageStore();

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/menu');
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/5 cursor-pointer"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074')] bg-cover bg-center opacity-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative text-center space-y-8 p-8">
            {/* Animated Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-8"
            >
              <ShoppingBag className="w-16 h-16 text-primary" />
            </motion.div>

            {/* Welcome Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold"
            >
              Hoş Geldiniz
            </motion.h1>

            {/* Instructions */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground"
            >
              Siparişinizi vermek için ekrana dokunun
            </motion.p>

            {/* Touch Indicator */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mt-12 text-primary/60"
            >
              👆
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}