"use client";

import { ColorPicker } from '@/components/theme/color-picker';
import { LanguageSwitcher } from '@/components/language/language-switcher';
import { CartSheet } from '@/components/cart-sheet';
import { useCartStore } from '@/store/cart';
import { ShoppingBag } from 'lucide-react';
import { Price } from '@/components/ui/price';

export function SidebarFooter() {
  const { items, total } = useCartStore();
  const hasItems = items.length > 0;

  return (
    <div className="p-4 border-t space-y-4">
      <div className="flex items-center justify-between gap-2">
        <LanguageSwitcher />
        <ColorPicker />
      </div>
      
      {hasItems && (
        <CartSheet>
          <div className="w-full p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sepetim</p>
                  <Price amount={total} className="text-lg font-bold" />
                </div>
              </div>
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">
                {items.length}
              </div>
            </div>
          </div>
        </CartSheet>
      )}
    </div>
  );
}