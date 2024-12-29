"use client";

import { ComboSelections } from '@/types/combo';
import { Price } from '@/components/ui/price';

interface ComboItemDetailsProps {
  selections: ComboSelections;
  className?: string;
}

export function ComboItemDetails({ selections, className }: ComboItemDetailsProps) {
  return (
    <div className={className}>
      {Object.entries(selections).map(([groupName, groupSelections]) => (
        <div key={groupName} className="mt-2">
          <p className="text-sm text-muted-foreground">{groupName}:</p>
          <ul className="ml-4">
            {groupSelections.map((selection) => (
              <li key={selection.item.MenuItemKey} className="text-sm flex justify-between">
                <span>
                  {selection.quantity}x {selection.item.MenuItemText}
                </span>
                {selection.item.ExtraPriceTakeOut_TL > 0 && (
                  <Price
                    amount={selection.item.ExtraPriceTakeOut_TL * selection.quantity}
                    className="text-sm text-muted-foreground"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}