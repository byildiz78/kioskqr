"use client";

import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/menu/category/${category.id}`}>
        <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="relative h-40">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              src={category.image}
              alt={category.name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h2 className="text-xl font-semibold text-white text-center">
                {category.name}
              </h2>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
