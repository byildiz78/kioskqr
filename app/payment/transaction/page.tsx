"use client";

import { useCartStore } from '@/store/cart';
import { PaymentStatus } from '@/components/payment/payment-status';
import { PaymentAmount } from '@/components/payment/payment-amount';
import { PaymentProgress } from '@/components/payment/payment-progress';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

export default function PaymentTransactionPage() {
  const { total } = useCartStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold">Ödeme İşlemi</h1>
          </div>

          {/* Payment Status */}
          <PaymentStatus />

          {/* Progress Steps */}
          <PaymentProgress />

          {/* Amount Display */}
          <PaymentAmount amount={total} />
        </motion.div>
      </div>
    </div>
  );
}
