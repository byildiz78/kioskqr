import { Utensils, Coffee, Wine, Cake } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  '1': Utensils,
  '2': Coffee,
  '3': Wine,
  '4': Cake,
};

interface CategoryIconProps {
  categoryId: string;
  className?: string;
}

export function CategoryIcon({ categoryId, className }: CategoryIconProps) {
  const Icon = categoryIcons[categoryId];
  if (!Icon) return null;
  
  return <Icon className={className} />;
}