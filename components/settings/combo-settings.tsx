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
import { Plus, Image as ImageIcon, Save, Trash2, Search, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export function ComboSettings() {
  const { products } = useMenuStore();
  const [selectedCombo, setSelectedCombo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('tr');

  // Filter only combo products
  const comboProducts = products.filter(product => product.isCombo);
  const filteredCombos = comboProducts.filter(combo => 
    combo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedComboData = selectedCombo 
    ? comboProducts.find(c => c.id === selectedCombo)
    : null;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Combos List */}
      <Card className="p-4 md:col-span-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Combo Menüler</h3>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Yeni
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Menü ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredCombos.map((combo) => (
              <motion.button
                key={combo.id}
                onClick={() => setSelectedCombo(combo.id)}
                className={`w-full text-left rounded-lg transition-all overflow-hidden ${
                  selectedCombo === combo.id
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                    : 'hover:bg-muted'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-3">
                  {/* Combo Image */}
                  <div className="relative w-20 h-20">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Combo Info */}
                  <div className="flex-1 p-2">
                    <div className="font-medium">{combo.name}</div>
                    <div className="text-sm opacity-70">{combo.price} ₺</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {combo.Combo?.length || 0} Grup
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </Card>

      {/* Combo Edit Form */}
      <Card className="p-6 md:col-span-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Combo Menü Düzenle</h3>
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
            <Label>Menü Görseli</Label>
            {selectedComboData?.image ? (
              <div className="relative group">
                <img
                  src={selectedComboData.image}
                  alt={selectedComboData.name}
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
              <Label>Temel Fiyat (₺)</Label>
              <Input 
                type="number" 
                placeholder="0.00"
                defaultValue={selectedComboData?.price}
              />
            </div>
            <div className="space-y-2">
              <Label>Hazırlama Süresi (dk)</Label>
              <Input 
                type="number" 
                placeholder="15"
                defaultValue={selectedComboData?.prepTime}
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
                      <Label>Menü Adı</Label>
                      <Input 
                        placeholder={`Menü adı (${name})`}
                        defaultValue={code === 'tr' ? selectedComboData?.name : ''}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Açıklama</Label>
                      <Textarea 
                        placeholder={`Menü açıklaması (${name})`}
                        defaultValue={code === 'tr' ? selectedComboData?.description : ''}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Combo Groups */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Menü Grupları</Label>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Grup Ekle
              </Button>
            </div>

            <div className="space-y-4">
              {selectedComboData?.Combo?.map((group, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    {/* Group Header */}
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                      <div className="flex-1">
                        <Input 
                          placeholder="Grup Adı" 
                          defaultValue={group.GroupName}
                        />
                      </div>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Group Settings */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Maksimum Seçim</Label>
                        <Input 
                          type="number" 
                          defaultValue={group.MaxQuantity}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id={`required-${index}`}
                            defaultChecked={group.IsForcedGroup}
                          />
                          <Label htmlFor={`required-${index}`}>Zorunlu</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id={`multiple-${index}`}
                            defaultChecked={group.MaxQuantity !== 1}
                          />
                          <Label htmlFor={`multiple-${index}`}>Çoklu Seçim</Label>
                        </div>
                      </div>
                    </div>

                    {/* Group Items */}
                    <div className="space-y-2">
                      <Label>Grup Ürünleri ({group.Items.length})</Label>
                      <div className="space-y-2">
                        {group.Items.map((item, itemIndex) => (
                          <div 
                            key={itemIndex}
                            className="flex items-center gap-3 p-2 bg-muted rounded-lg"
                          >
                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                            <div className="flex-1">
                              <div className="font-medium">{item.MenuItemText}</div>
                              <div className="text-sm text-muted-foreground">
                                +{item.ExtraPriceTakeOut_TL} ₺
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Ürün Ekle
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}