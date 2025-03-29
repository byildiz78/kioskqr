import CategoryContent from '@/components/category/category-content';
import { fetchMenu } from '@/lib/api';
// JSON dosyasını doğrudan import ediyoruz
import menuData from '@/public/menu.json';

export async function generateStaticParams() {
  try {
    // Yerel JSON dosyasını doğrudan kullanıyoruz
    if (menuData?.d?.Menu && Array.isArray(menuData.d.Menu)) {
      return menuData.d.Menu.map((category) => ({
        id: category.MenuGroupKey,
      }));
    }
    
    // Alternatif olarak API'den veri çekmeyi deneyelim
    console.log('Statik parametre oluşturma için API kullanılıyor');
    const apiMenuData = await fetchMenu();
    return apiMenuData.map((category) => ({
      id: category.MenuGroupKey,
    }));
  } catch (error) {
    console.error('Error generating category paths:', error);
    // Hata durumunda boş bir dizi döndürmek yerine, en azından bir örnek kategori ID'si sağlayalım
    // Bu, build sürecinin devam etmesini sağlar
    return [
      { id: 'c27aba8c-6d56-44be-92d7-a6da01504e0a' },
      { id: 'fallback-category' }
    ];
  }
}

export default function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  return <CategoryContent params={params} />;
}
