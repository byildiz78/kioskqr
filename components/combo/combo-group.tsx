"use client";

import { ComboGroup as ComboGroupType, ComboItem } from '@/types/api';
import { ComboSelections } from '@/types/combo';
import { Badge } from '@/components/ui/badge';
import { ComboGroupItem } from './combo-group-item';
import { useLanguageStore } from '@/store/language';
import { motion } from 'framer-motion';

interface ComboGroupProps {
  group: ComboGroupType;
  selections: ComboSelections;
  onSelect: (groupName: string, item: ComboItem, quantity: number) => void;
  progress: number;
}

export function ComboGroup({ group, selections, onSelect, progress }: ComboGroupProps) {
  const currentSelections = selections[group.GroupName] || [];
  const totalQuantity = currentSelections.reduce((sum, s) => sum + s.quantity, 0);
  const { t } = useLanguageStore();
  
  return (
    <div className="space-y-6">
      {/* Group Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg py-4 z-10 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{group.GroupName}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={group.IsForcedGroup ? "default" : "secondary"} className="text-sm">
                {group.IsForcedGroup ? t.product.requiredSelection : t.product.optional}
              </Badge>
              {group.MaxQuantity > 0 && (
                <Badge variant="outline" className="text-sm">
                  {t.product.maximum}: {group.MaxQuantity}
                </Badge>
              )}
              <Badge variant="outline" className="text-sm">
                {totalQuantity} / {group.MaxQuantity || '∞'}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full sm:w-32 h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.Items.map((item) => (
          <ComboGroupItem
            key={item.MenuItemKey}
            item={item}
            group={group}
            quantity={currentSelections.find(s => s.item.MenuItemKey === item.MenuItemKey)?.quantity || 0}
            onSelect={(quantity) => onSelect(group.GroupName, item, quantity)}
          />
        ))}
      </div>
    </div>
  );
}
