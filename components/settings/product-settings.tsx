"use client";

import { useState } from 'react';
import { useMenuStore } from '@/store/menu';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { languages } from '@/lib/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Image as ImageIcon, Save, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const defaultBadges = {
  tr: {
    spicy: 'Acılı',
    vegetarian: 'Vejetaryen',
    glutenFree: 'Glutensiz',
    monthlySpecial: 'Ayın Ürünü',
    popular: 'Popüler Ürün',
    bestSeller: 'En Çok Satan'
  }
};

export function ProductSettings() {
  const { products } = useMenuStore();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('tr');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedProductData = selectedProduct 
    ? products.find(p => p.id === selectedProduct)
    : null;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Products List */}
      <Card className="p-4 md:col-span-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Ürünler</h3>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Yeni
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredProducts.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={`w-full text-left rounded-lg transition-all overflow-hidden ${
                  selectedProduct === product.id
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                    : 'hover:bg-muted'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="relative w-20 h-20">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 p-2">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm opacity-70">{product.price} ₺</div>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.isSpicy && (
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-red-100 text-red-600">
                          Acılı
                        </span>
                      )}
                      {product.isVegetarian && (
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
                          Vejetaryen
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </Card>

      {/* Product Edit Form */}
      <Card className="p-6 md:col-span-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Ürün Düzenle</h3>
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
            <Label>Ürün Görseli</Label>
            {selectedProductData?.image ? (
              <div className="relative group">
                <img
                  src={selectedProductData.image}
                  alt={selectedProductData.name}
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

          {/* Basic Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fiyat (₺)</Label>
              <Input 
                type="number" 
                placeholder="0.00"
                defaultValue={selectedProductData?.price}
              />
            </div>
            <div className="space-y-2">
              <Label>Hazırlama Süresi (dk)</Label>
              <Input 
                type="number" 
                placeholder="15"
                defaultValue={selectedProductData?.prepTime}
              />
            </div>
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
                      <Label>Ürün Adı</Label>
                      <Input 
                        placeholder={`Ürün adı (${name})`}
                        defaultValue={code === 'tr' ? selectedProductData?.name : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Açıklama</Label>
                      <Textarea 
                        placeholder={`Ürün açıklaması (${name})`}
                        defaultValue={code === 'tr' ? selectedProductData?.description : ''}
                      />
                    </div>
                    
                    {/* Badge Translations */}
                    <div className="space-y-4">
                      <Label>Rozetler</Label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Spicy Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Switch 
                              id={`spicy-${code}`}
                              defaultChecked={code === 'tr' && selectedProductData?.isSpicy}
                            />
                            <Label htmlFor={`spicy-${code}`}>Acılı</Label>
                          </div>
                          <Input 
                            placeholder="Acılı rozet çevirisi" 
                            defaultValue={code === 'tr' ? defaultBadges.tr.spicy : ''}
                          />
                        </div>

                        {/* Vegetarian Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Switch 
                              id={`vegetarian-${code}`}
                              defaultChecked={code === 'tr' && selectedProductData?.isVegetarian}
                            />
                            <Label htmlFor={`vegetarian-${code}`}>Vejetaryen</Label>
                          </div>
                          <Input 
                            placeholder="Vejetaryen rozet çevirisi"
                            defaultValue={code === 'tr' ? defaultBadges.tr.vegetarian : ''}
                          />
                        </div>

                        {/* Gluten Free Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Switch id={`glutenFree-${code}`} />
                            <Label htmlFor={`glutenFree-${code}`}>Glutensiz</Label>
                          </div>
                          <Input 
                            placeholder="Glutensiz rozet çevirisi"
                            defaultValue={code === 'tr' ? defaultBadges.tr.glutenFree : ''}
                          />
                        </div>

                        {/* Monthly Special Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Switch id={`monthlySpecial-${code}`} />
                            <Label htmlFor={`monthlySpecial-${code}`}>Ayın Ürünü</Label>
                          </div>
                          <Input 
                            placeholder="Ayın ürünü rozet çevirisi"
                            defaultValue={code === 'tr' ? defaultBadges.tr.monthlySpecial : ''}
                          />
                        </div>

                        {/* Popular Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Switch id={`popular-${code}`} />
                            <Label htmlFor={`popular-${code}`}>Popüler Ürün</Label>
                          </div>
                          <Input 
                            placeholder="Popüler ürün rozet çevirisi"
                            defaultValue={code === 'tr' ? defaultBadges.tr.popular : ''}
                          />
                        </div>

                        {/* Best Seller Badge */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Switch id={`bestSeller-${code}`} />
                            <Label htmlFor={`bestSeller-${code}`}>En Çok Satan</Label>
                          </div>
                          <Input 
                            placeholder="En çok satan rozet çevirisi"
                            defaultValue={code === 'tr' ? defaultBadges.tr.bestSeller : ''}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
}