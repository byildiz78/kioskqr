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
          console.log('[MENU-STORE] Başlangıç: Menu verisi kontrol ediliyor');
          const now = Date.now();
          const lastFetch = get().lastFetch;
          const hasData = get().categories.length > 0 && get().products.length > 0;
          
          // Use cached data if available and recent (5 minutes)
          if (lastFetch && hasData && now - lastFetch < 5 * 60 * 1000) {
            console.log('[MENU-STORE] Önbellek kullanılıyor: Son güncelleme ' + new Date(lastFetch).toLocaleTimeString());
            return;
          }

          console.log('[MENU-STORE] Menu verisi yükleniyor...');
          set({ isLoading: true, error: null });

          console.log('[MENU-STORE] API çağrısı yapılıyor');
          const apiData = await fetchMenu();
          console.log('[MENU-STORE] API verisi alındı, dönüştürülüyor');
          const { categories, products } = mapApiDataToApp(apiData);

          console.log(`[MENU-STORE] Veri doğrulanıyor: ${categories.length} kategori, ${products.length} ürün`);
          if (!categories.length && !products.length) {
            console.error('[MENU-STORE] Hata: Menu verisi bulunamadı');
            throw new Error('No menu data available');
          }

          console.log('[MENU-STORE] Menu verisi başarıyla güncellendi');
          set({ 
            categories, 
            products, 
            isLoading: false,
            lastFetch: now,
            error: null
          });
        } catch (error) {
          const errorMessage = handleApiError(error);
          console.error('[MENU-STORE] Menu yükleme hatası:', errorMessage);
          
          // Keep existing data if available
          const currentState = get();
          const hasExistingData = currentState.categories.length > 0 || currentState.products.length > 0;
          
          if (hasExistingData) {
            console.log('[MENU-STORE] Mevcut veriler korunuyor');
          } else {
            console.warn('[MENU-STORE] Hiç veri yok, boş state kullanılacak');
          }
          
          set({ 
            isLoading: false,
            error: errorMessage,
            categories: currentState.categories,
            products: currentState.products
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
