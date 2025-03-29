import { ApiCategory, MenuApiResponse } from '@/types/api';
import { Product, Category } from '@/types';
import { getNextProductImage, getNextCategoryImage } from './utils/mock-images';
import { getRandomCalories, getRandomDescription } from './utils/mock-data';
import { processComboGroups } from './utils/combo-processor';
import { API_CONFIG, fetchWithRetry } from './utils/api-helpers';
import { MenuFetchError, handleApiError } from './utils/error-handling';

const MENU_ENDPOINT = `${API_CONFIG.baseUrl}/getKioskMenu`;

export async function fetchMenu(): Promise<ApiCategory[]> {
  console.log('[MENU] Başlangıç: Menu verisi çekiliyor...');
  try {
    // Gerçek API çağrısı geçici olarak devre dışı bırakıldı
    // console.log(`[MENU] API isteği yapılıyor: ${MENU_ENDPOINT}`);
    // const response = await fetchWithRetry(MENU_ENDPOINT, {
    //   method: 'POST',
    //   headers: API_CONFIG.headers,
    //   body: JSON.stringify({
    //     currentMenuLastUpdateDateTime: "2000-01-01"
    //   })
    // });

    // Yerel JSON dosyasından veri yükleme - önbellek sorununu önlemek için timestamp ekliyoruz
    const timestamp = new Date().getTime(); // Önbelleği atlatmak için
    const jsonUrl = `/menu.json?t=${timestamp}`;
    console.log(`[MENU] Yerel JSON dosyasından veri yükleniyor: ${jsonUrl}`);
    
    try {
      const response = await fetch(jsonUrl);
      
      if (!response.ok) {
        throw new MenuFetchError(`Yerel JSON dosyası yüklenemedi: ${response.status}`);
      }
      
      const menuData = await response.json();
      console.log('[MENU] Yerel JSON dosyası başarıyla yüklendi');
      
      if (!menuData?.d?.Menu || !Array.isArray(menuData.d.Menu)) {
        console.error('[MENU] Hata: Geçersiz JSON formatı');
        throw new MenuFetchError('Invalid JSON format in local file');
      }
      
      console.log(`[MENU] Başarılı: ${menuData.d.Menu.length} kategori alındı (yerel JSON)`);
      return menuData.d.Menu;
    } catch (fetchError) {
      console.error('[MENU] Yerel JSON dosyası yüklenemedi:', fetchError);
      throw new MenuFetchError('Failed to load local JSON file');
    }
  } catch (error) {
    console.error('[MENU] Hata: Menu çekilemedi:', handleApiError(error));
    console.log('[MENU] Yedek menu verileri kullanılıyor');
    return getFallbackData();
  }
}

function getFallbackData(): ApiCategory[] {
  console.log('[MENU] Yedek menu verileri oluşturuluyor');
  return [
    {
      MenuGroupKey: "fallback-category",
      MenuGroupText: "Menu",
      Items: [
        {
          MenuItemKey: "fallback-item",
          MenuItemText: "Sample Item",
          Description: "A sample menu item",
          TakeOutPrice_TL: 100,
          DeliveryPrice_TL: 100,
          Badges: [],
          Combo: [],
          IsMainCombo: false
        }
      ]
    }
  ];
}

export function mapApiDataToApp(apiData: ApiCategory[]): { 
  categories: Category[],
  products: Product[] 
} {
  console.log('[MENU] Başlangıç: API verileri uygulama formatına dönüştürülüyor');
  
  if (!Array.isArray(apiData) || !apiData.length) {
    console.error('[MENU] Hata: Geçersiz veya boş API verisi');
    throw new MenuFetchError('Invalid or empty API data');
  }

  console.log(`[MENU] Kategori sayısı: ${apiData.length}`);
  const categories: Category[] = apiData.map(cat => ({
    id: cat.MenuGroupKey,
    name: cat.MenuGroupText,
    image: getNextCategoryImage()
  }));

  let totalProducts = 0;
  const products: Product[] = apiData.flatMap(cat => {
    console.log(`[MENU] "${cat.MenuGroupText}" kategorisinde ${cat.Items.length} ürün işleniyor`);
    totalProducts += cat.Items.length;
    
    return cat.Items.map(item => {
      const combo = item.Combo || [];
      const hasValidCombo = combo.length > 0 && combo.some(group => 
        group.Items?.length > 0
      );

      const baseProduct = {
        id: item.MenuItemKey,
        name: item.MenuItemText,
        description: item.Description || getRandomDescription(),
        price: item.TakeOutPrice_TL,
        image: getNextProductImage(),
        category: cat.MenuGroupKey,
        isSpicy: item.Badges?.includes('Acılı') ?? false,
        isVegetarian: item.Badges?.includes('Vejetaryen') ?? false,
        rating: 4.9,
        calories: getRandomCalories(),
        prepTime: 15 + Math.floor(Math.random() * 20),
      };

      if (hasValidCombo) {
        return {
          ...baseProduct,
          isCombo: true,
          Combo: processComboGroups(combo)
        };
      }

      return baseProduct;
    });
  });

  console.log(`[MENU] Dönüştürme tamamlandı: ${categories.length} kategori, ${totalProducts} ürün`);
  return { categories, products };
}
