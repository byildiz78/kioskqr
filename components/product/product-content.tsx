"use client";

import { useMenuStore } from '@/store/menu';
import { ProductHeader } from '@/components/product/product-header';
import { ProductImage } from '@/components/product/product-image';
import { ProductInfo } from '@/components/product/product-info';
import { ProductIngredients } from '@/components/product/product-ingredients';
import { ProductAllergens } from '@/components/product/product-allergens';
import { ComboSelector } from '@/components/combo/combo-selector';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { notFound } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { ComboSelections } from '@/types/combo';
import { ShoppingCart } from 'lucide-react';
import { useLanguageStore } from '@/store/language';
import { containerVariants, itemVariants } from './animations';

export default function ProductContent({ params }: { params: { id: string } }) {
  const { products, isLoading, error } = useMenuStore();
  const addToCart = useCartStore((state) => state.addItem);
  const { t } = useLanguageStore();
  const router = useRouter();
  const product = products.find((p) => p.id === params.id);

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-40 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
        <p className="text-muted-foreground mt-2">{t.common.tryAgain}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 pt-40">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] rounded-lg" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-[200px]" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    notFound();
  }

  const handleComboAddToCart = (selections: ComboSelections) => {
    addToCart({
      ...product,
      comboSelections: selections
    });
    router.push(`/menu/category/${product.category}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    router.push(`/menu/category/${product.category}`);
  };

  return (
    <motion.main
      className="container mx-auto px-4 pt-40 pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants}>
        <ProductHeader categoryId={product.category} />
      </motion.div>
      
      {/* Product Details */}
      <div className="mt-6 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Product Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-center mb-2">{product.name}</h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              {product.description}
            </p>
          </motion.div>

          {/* Product Image and Info */}
          <motion.div variants={itemVariants}>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <ProductImage image={product.image} name={product.name} />
              <div className="space-y-6">
                <ProductInfo product={product} />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.ingredients && (
                    <ProductIngredients ingredients={product.ingredients} />
                  )}
                  {product.allergens && (
                    <ProductAllergens allergens={product.allergens} />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Combo Selections or Add to Cart */}
          {product.isCombo && product.Combo ? (
            <motion.div variants={itemVariants}>
              <div className="mt-12 bg-secondary/20 rounded-2xl p-6 sm:p-8">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {t.product.menuSelections}
                </h2>
                <ComboSelector
                  groups={product.Combo}
                  basePrice={product.price}
                  onAddToCart={handleComboAddToCart}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="sticky bottom-0 bg-background/95 backdrop-blur-lg border-t p-4">
              <Button 
                className="w-full gap-2" 
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                {t.common.addToCart} ({product.price} ₺)
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
}