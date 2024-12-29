"use client";

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/language';

interface AddToCartButtonProps {
  onClick: () => void;
  isCombo?: boolean;
}

export function AddToCartButton({ onClick, isCombo }: AddToCartButtonProps) {
  const { t } = useLanguageStore();
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        onClick={onClick}
        className="w-full rounded-full hover:scale-105 active:scale-95 transition-all duration-200 gap-2 bg-primary/90 backdrop-blur-sm hover:bg-primary"
      >
        <Plus className="h-4 w-4" />
        {isCombo ? t.common.viewMenu : t.common.addToCart}
      </Button>
    </motion.div>
  );
}