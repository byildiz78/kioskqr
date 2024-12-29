"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ProductImage } from './product-card/product-image';
import { ProductPrice } from './product-card/product-price';
import { ProductInfo } from './product-card/product-info';
import { ProductBadges } from './product-card/product-badges';
import { AddToCartButton } from './product-card/add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="glass-card glass-effect group relative h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
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
            <AddToCartButton onClick={() => onAddToCart(product)} />
          )}
        </div>
      </Card>
    </motion.div>
  );
}