"use client";

import { CartSheet } from '@/components/cart-sheet';
import { useCartStore } from '@/store/cart';
import { useLanguageStore } from '@/store/language';
import { motion, AnimatePresence } from 'framer-motion';
import { Price } from '../ui/price';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function CartFooter() {
  const { items, total } = useCartStore();
  const { t } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();
  const hasItems = items.length > 0;
  const [showBounce, setShowBounce] = useState(false);

  // Check if current page is a product detail page
  const isProductDetailPage = pathname?.startsWith('/menu/product/');

  // Watch for changes in items to trigger bounce animation
  useEffect(() => {
    if (items.length > 0) {
      setShowBounce(true);
      const timer = setTimeout(() => setShowBounce(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [items.length]);

  // Don't show footer if there are no items or if we're on a product detail page
  if (!hasItems || isProductDetailPage) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <CartSheet>
        <div className="bg-background/95 backdrop-blur-lg border-t shadow-lg">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="h-20 flex items-center justify-between gap-4">
              {/* Cart Info */}
              <div className="flex items-center gap-4">
                <motion.div 
                  animate={showBounce ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center relative"
                >
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <AnimatePresence>
                    <motion.div
                      key={items.length}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      {items.length}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.common.total}</p>
                  <motion.div
                    key={total}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Price amount={total} className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent" />
                  </motion.div>
                </div>
              </div>

              {/* Order Button */}
              <Button 
                size="lg" 
                className="h-12 px-6 gap-2 text-base group"
                onClick={() => router.push('/payment')}
              >
                {t.common.placeOrder}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
        </div>
      </CartSheet>
    </motion.div>
  );
}
