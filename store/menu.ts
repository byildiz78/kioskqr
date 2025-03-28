import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category, Product } from '@/types';
import { fetchMenu, mapApiDataToApp } from '@/lib/api';
import { handleApiError } from '@/lib/utils/error-handling';

interface MenuState {
  categories: Category[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null;
  fetchData: () => Promise<void>;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set, get) => ({
      categories: [],
      products: [],
      isLoading: false,
      error: null,
      lastFetch: null,
      fetchData: async () => {
        try {
          const now = Date.now();
          const lastFetch = get().lastFetch;
          const hasData = get().categories.length > 0 && get().products.length > 0;
          
          // Use cached data if available and recent (5 minutes)
          if (lastFetch && hasData && now - lastFetch < 5 * 60 * 1000) {
            return;
          }

          set({ isLoading: true, error: null });

          const apiData = await fetchMenu();
          const { categories, products } = mapApiDataToApp(apiData);

          // Only throw if both categories and products are empty
          if (!categories.length && !products.length) {
            throw new Error('No menu data available');
          }

          set({ 
            categories: categories.length ? categories : get().categories, 
            products: products.length ? products : get().products, 
            isLoading: false,
            lastFetch: now,
            error: null
          });
        } catch (error) {
          const errorMessage = handleApiError(error);
          console.error('Menu fetch error:', errorMessage);
          
          // Keep existing data if available
          const currentState = get();
          set({ 
            isLoading: false,
            error: errorMessage,
            // Only use empty arrays if there's no existing data
            categories: currentState.categories.length ? currentState.categories : [],
            products: currentState.products.length ? currentState.products : []
          });
        }
      }
    }),
    {
      name: 'menu-storage',
      partialize: (state) => ({
        categories: state.categories,
        products: state.products,
        lastFetch: state.lastFetch
      })
    }
  )
);
