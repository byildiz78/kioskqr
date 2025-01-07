"use client";

import { useState } from 'react';
import { useMenuStore } from '@/store/menu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { languages } from '@/lib/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Image as ImageIcon, Save, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function CategorySettings() {
  const { categories } = useMenuStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('tr');

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCategoryData = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)
    : null;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Categories List */}
      <Card className="p-4 md:col-span-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Kategoriler</h3>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Yeni
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Kategori ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left rounded-lg transition-all overflow-hidden ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                    : 'hover:bg-muted'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-3">
                  {/* Category Image */}
                  <div className="relative w-20 h-20">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Category Info */}
                  <div className="flex-1 p-2">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {/* Ürün sayısını göster */}
                      {Math.floor(Math.random() * 20) + 1} Ürün
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </Card>

      {/* Category Edit Form */}
      <Card className="p-6 md:col-span-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Kategori Düzenle</h3>
            <div className="space-x-2">
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Sil
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Kategori Görseli</Label>
            {selectedCategoryData?.image ? (
              <div className="relative group">
                <img
                  src={selectedCategoryData.image}
                  alt={selectedCategoryData.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary">Görseli Değiştir</Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Görsel yüklemek için tıklayın veya sürükleyin
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Translations */}
          <div className="space-y-4">
            <Label>Çeviriler</Label>
            <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
              <TabsList className="w-full">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                  <TabsTrigger key={code} value={code} className="flex items-center gap-2">
                    <span className="text-lg">{flag}</span>
                    <span>{name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(languages).map(([code, { name }]) => (
                <TabsContent key={code} value={code} className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Kategori Adı</Label>
                      <Input 
                        placeholder={`Kategori adı (${name})`}
                        defaultValue={code === 'tr' ? selectedCategoryData?.name : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Açıklama</Label>
                      <Textarea 
                        placeholder={`Kategori açıklaması (${name})`}
                        defaultValue={code === 'tr' ? 'Lezzetli yemeklerimiz' : ''}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <Label>Görünüm Ayarları</Label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sıralama</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Görünürlük</Label>
                <select className="w-full h-10 px-3 rounded-md border bg-background">
                  <option value="visible">Görünür</option>
                  <option value="hidden">Gizli</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}