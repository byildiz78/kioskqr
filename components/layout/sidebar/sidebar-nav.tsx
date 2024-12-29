"use client";

import { useMenuStore } from '@/store/menu';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CategoryIcon } from '../category-icon';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function SidebarNav() {
  const { categories, isLoading } = useMenuStore();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  return (
    <nav className="flex-1 p-4 space-y-2 overflow-auto">
      <Link href="/menu" className="block mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={cn(
            "p-4 rounded-xl transition-colors",
            pathname === '/menu' 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <CategoryIcon categoryId="home" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">Tüm Menü</h3>
              <p className="text-sm opacity-80">Kategorilere göz atın</p>
            </div>
          </div>
        </motion.div>
      </Link>

      {categories.map((category) => (
        <Link key={category.id} href={`/menu/category/${category.id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
              "p-4 rounded-xl transition-colors",
              pathname.includes(`/category/${category.id}`)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <CategoryIcon categoryId={category.id} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm opacity-80">Ürünlere göz atın</p>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </nav>
  );
}