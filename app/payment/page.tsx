"use client";

import { useCartStore } from '@/store/cart';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  ArrowLeft, 
  Wallet,
  CreditCardIcon,
  Banknote
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CurrencyDisplay } from '@/components/payment/currency-display';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
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

const cards = [
  { name: "Mastercard", logo: "/cards/mastercard.svg" },
  { name: "Visa", logo: "/cards/visa.svg" },
  { name: "Troy", logo: "/cards/troy.svg" }
];

const foodCards = [
  { name: "Sodexo", logo: "/cards/sodexo.svg" },
  { name: "Multinet", logo: "/cards/multinet.svg" },
  { name: "Setcard", logo: "/cards/setcard.svg" }
];

export default function PaymentPage() {
  const { total } = useCartStore();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[url('/patterns/topography.svg')] bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                className="gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Geri Dön
              </Button>
            </motion.div>

            {/* Header with 3D Effect */}
            <motion.div 
              variants={itemVariants} 
              className="text-center space-y-3 relative"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                initial={{ rotateX: -30, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent pb-2">
                  Ödeme Yöntemi
                </h1>
                <div className="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
              </motion.div>
            </motion.div>

            {/* Amount Display Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10" />
                
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/90" />
                
                {/* Content */}
                <div className="relative p-8">
                  <div className="text-center">
                    {/* Amount Section */}
                    <div className="text-white space-y-4">
                      <div className="text-white/80 text-sm font-medium uppercase tracking-wider">Ödenecek Tutar</div>
                      <div className="text-6xl font-bold tracking-tighter flex items-start justify-center">
                        <span className="text-3xl mt-2">₺</span>
                        <span className="ml-1">{total.toFixed(2)}</span>
                      </div>
                      <CurrencyDisplay amount={total} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Credit Card Option */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
                className="relative group cursor-pointer"
                onClick={() => router.push('/payment/transaction')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500">
                  {/* Card Content */}
                  <div className="p-8">
                    <div className="flex flex-col items-start gap-6">
                      {/* Header */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <CreditCardIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Kredi Kartı</h3>
                          <p className="text-white/80 text-sm">Tüm kartlar desteklenir</p>
                        </div>
                      </div>

                      {/* Card Logos */}
                      <div className="flex gap-4 items-center">
                        {cards.map((card, index) => (
                          <motion.img
                            key={card.name}
                            src={card.logo}
                            alt={card.name}
                            className="h-8 w-auto"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>

              {/* Food Card Option */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                whileTap={{ scale: 0.98 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500">
                  {/* Card Content */}
                  <div className="p-8">
                    <div className="flex flex-col items-start gap-6">
                      {/* Header */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Banknote className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Yemek Kartı</h3>
                          <p className="text-white/80 text-sm">Tüm yemek kartları geçerli</p>
                        </div>
                      </div>

                      {/* Card Logos */}
                      <div className="flex gap-4 items-center">
                        {foodCards.map((card, index) => (
                          <motion.img
                            key={card.name}
                            src={card.logo}
                            alt={card.name}
                            className="h-8 w-auto"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
