"use client";

import { useCartStore } from '@/store/cart';
import { motion } from 'framer-motion';
import { CreditCard, ArrowLeft, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CurrencyDisplay } from '@/components/payment/currency-display';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function PaymentPage() {
  const { total } = useCartStore();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Siparişinizi vermeye çok az kaldı!
            </h1>
            <p className="text-xl text-muted-foreground">
              Hangi ödeme şekliyle ödemek istersiniz?
            </p>
          </motion.div>

          {/* Amount Display */}
          <motion.div variants={itemVariants}>
            <div className="bg-orange-500 text-white rounded-2xl p-8 text-center mb-8">
              <div className="text-6xl font-bold mb-2">
                ₺ {total.toFixed(2)}
              </div>
              <CurrencyDisplay amount={total} />
            </div>
          </motion.div>

          {/* Payment Options */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
              onClick={() => router.push('/payment/transaction')}
            >
              <div className="absolute inset-0 bg-[#4CAF50]/20 rounded-2xl blur-xl group-hover:bg-[#4CAF50]/30 transition-colors" />
              <div className="relative p-8 rounded-2xl bg-[#4CAF50] text-white text-center hover:shadow-lg transition-all duration-300 border border-white/10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">Kredi Kartı</div>
                    <div className="text-sm text-white/80">Tüm kartlar desteklenir</div>
                  </div>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-[#2196F3]/20 rounded-2xl blur-xl group-hover:bg-[#2196F3]/30 transition-colors" />
              <div className="relative p-8 rounded-2xl bg-[#2196F3] text-white text-center hover:shadow-lg transition-all duration-300 border border-white/10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Wallet className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">Yemek Kartı</div>
                    <div className="text-sm text-white/80">Sodexo, Multinet, Setcard</div>
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}