"use client";

import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ComboItemDetails } from "./combo-item-details";
import { calculateItemPrice } from "@/lib/utils/price-calculator";
import type { CartItem } from "@/types";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div className="glass-card glass-effect p-4 rounded-xl">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-medium text-lg">{item.product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {item.product.description}
          </p>
          
          {item.product.comboSelections && (
            <ComboItemDetails 
              selections={item.product.comboSelections}
              className="mt-2 border-t pt-2"
            />
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 -mt-1 text-muted-foreground hover:text-destructive"
          onClick={() => removeItem(item.product.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-secondary/50 rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-secondary"
            onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center tabular-nums font-medium">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-secondary"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Price 
          amount={calculateItemPrice(item)} 
          className="text-lg font-semibold"
        />
      </div>
    </div>
  );
}