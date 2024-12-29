"use client";

import { Star } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types';

interface ProductImageProps {
  product: Product;
}

export function ProductImage({ product }: ProductImageProps) {
  return (
    <Link href={`/menu/product/${product.id}`}>
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {product.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full">
            <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        )}
      </div>
    </Link>
  );
}