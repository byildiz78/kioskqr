"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useLanguageStore } from '../../store/language';
import { HeroSlider } from '../home/hero-slider';

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
          className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
        >
          {/* Hero Slider Background */}
          <HeroSlider />

          {/* Content */}
          <div className="relative text-center space-y-8 p-8 z-10">
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
              className="text-4xl md:text-6xl font-bold text-white"
            >
              Hoş Geldiniz
            </motion.h1>

            {/* Instructions */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/80"
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
              className="mt-12 text-white/60"
            >
              👆
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
