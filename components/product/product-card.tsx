"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ProductImage } from './product-card/product-image';
import { ProductPrice } from './product-card/product-price';
import { ProductInfo } from './product-card/product-info';
import { ProductBadges } from './product-card/product-badges';
import { AddToCartButton } from './product-card/add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, Check } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    setShowAddedAnimation(true);
    onAddToCart(product);
    
    // Reset animation after duration
    setTimeout(() => {
      setShowAddedAnimation(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="glass-card glass-effect group relative h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Added to Cart Animation Overlay */}
        <AnimatePresence>
          {showAddedAnimation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-primary/90 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col items-center gap-2 text-primary-foreground"
              >
                <div className="rounded-full bg-white/20 p-3">
                  <Check className="w-8 h-8" />
                </div>
                <p className="font-medium text-lg">Sepete Eklendi</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <ProductImage product={product} />
          <ProductPrice price={product.price} />
          {product.isCombo && (
            <Badge 
              className="absolute top-4 left-4 bg-primary text-primary-foreground gap-1.5"
              variant="secondary"
            >
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Menü
            </Badge>
          )}
        </div>

        <div className="p-6 flex-grow">
          <ProductInfo product={product} />
          <ProductBadges product={product} />
          {product.isCombo ? (
            <Link href={`/menu/product/${product.id}`}>
              <AddToCartButton onClick={() => {}} isCombo={true} />
            </Link>
          ) : (
            <AddToCartButton onClick={handleAddToCart} />
          )}
        </div>
      </Card>
    </motion.div>
  );
}
