"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CategoryIcon } from './category-icon';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useMenuStore } from '@/store/menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Menu } from 'lucide-react';

export function CategoryNav() {
  const pathname = usePathname();
  const { categories, isLoading } = useMenuStore();
  const isHome = pathname === '/';

  if (isLoading) {
    return (
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b z-40"
      >
        <ScrollArea className="w-full">
          <div className="container mx-auto h-14 px-4 mt-2">
            <div className="flex items-center gap-3 h-full">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-32" />
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </motion.nav>
    );
  }

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-16 left-0 right-0 bg-gradient-to-b from-background/98 to-background/95 backdrop-blur-lg border-b z-40 shadow-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <ScrollArea className="w-full">
        <div className="container mx-auto h-14 px-4 mt-2">
          <div className="flex items-center gap-3 h-full">
            {/* Home Menu Link */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Link
                href="/"
                className={cn(
                  "group flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
                  "hover:bg-secondary/80 hover:shadow-md",
                  "border border-transparent",
                  isHome && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full transition-colors",
                  isHome ? "bg-primary-foreground/10" : "bg-secondary",
                  "group-hover:scale-110 transition-transform duration-300"
                )}>
                  <Menu className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  Menü
                </span>
              </Link>
            </motion.div>

            {/* Category Links */}
            {categories.map((category, index) => {
              const isActive = pathname.includes(`/category/${category.id}`);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                >
                  <Link
                    href={`/category/${category.id}`}
                    className={cn(
                      "group flex items-center gap-2 px-4 py-2 rounded-xl transition-all",
                      "hover:bg-secondary/80 hover:shadow-md",
                      "border border-transparent",
                      isActive && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-full transition-all duration-300",
                      isActive ? "bg-primary-foreground/10" : "bg-secondary",
                      "group-hover:scale-110 group-hover:rotate-3"
                    )}>
                      <CategoryIcon categoryId={category.id} className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {category.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </motion.nav>
  );
}