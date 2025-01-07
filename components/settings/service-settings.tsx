"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { languages } from '@/lib/i18n';
import { themes } from '@/lib/themes';
import { useLanguageStore } from '@/store/language';
import { useThemeStore } from '@/store/theme';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function ServiceSettings() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { currentTheme, setTheme } = useThemeStore();
  const [webserviceUrl, setWebserviceUrl] = useState('https://srv7.robotpos.com/kiosk2025/kioskService.asmx');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const response = await fetch(webserviceUrl);
      if (response.ok) {
        setTestResult('success');
      } else {
        setTestResult('error');
      }
    } catch (error) {
      setTestResult('error');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Restaurant Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Restoran Ayarları</h3>
        <div className="space-y-6">
          {/* Restaurant Name */}
          <div className="space-y-2">
            <Label>Restoran Adı</Label>
            <Input placeholder="Restoran adını girin" />
          </div>

          {/* Restaurant Logo */}
          <div className="space-y-2">
            <Label>Restoran Logosu</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <Button variant="outline">Logo Yükle</Button>
              <p className="text-sm text-muted-foreground mt-2">
                PNG, JPG veya SVG. Maksimum 2MB.
              </p>
            </div>
          </div>

          {/* Banners */}
          <div className="space-y-4">
            <Label>Banner Görselleri</Label>
            <div className="grid gap-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Banner {index}</span>
                    <Button variant="outline" size="sm">Görsel Seç</Button>
                  </div>
                  <div className="bg-muted h-32 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Banner önizleme</span>
                  </div>
                </div>
              ))}
              <Button variant="outline">
                Yeni Banner Ekle
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Webservice Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Webservis Ayarları</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Webservis URL</Label>
            <div className="flex gap-2">
              <Input
                value={webserviceUrl}
                onChange={(e) => setWebserviceUrl(e.target.value)}
                placeholder="https://example.com/api"
              />
              <Button 
                onClick={handleTestConnection}
                disabled={isTesting}
                className="min-w-[120px]"
              >
                {isTesting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : testResult === 'success' ? (
                  'Bağlantı OK'
                ) : testResult === 'error' ? (
                  'Bağlantı Hatası'
                ) : (
                  'Bağlantı Test'
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Language Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Dil Ayarları</h3>
        <div className="space-y-6">
          {/* Default Language */}
          <div className="space-y-2">
            <Label>Varsayılan Dil</Label>
            <select 
              className="w-full h-10 px-3 rounded-md border bg-background"
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as any)}
            >
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <option key={code} value={code}>
                  {flag} {name}
                </option>
              ))}
            </select>
          </div>

          {/* Active Languages */}
          <div className="space-y-4">
            <Label>Aktif Diller</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <div
                  key={code}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{flag}</span>
                    <span className="font-medium">{name}</span>
                  </div>
                  <Switch 
                    checked={code === currentLanguage} 
                    onCheckedChange={() => setLanguage(code as any)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Theme Settings */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Tema Ayarları</h3>
        <div className="space-y-6">
          {/* Default Theme */}
          <div className="space-y-2">
            <Label>Varsayılan Tema</Label>
            <select 
              className="w-full h-10 px-3 rounded-md border bg-background"
              value={currentTheme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((theme) => (
                <option key={theme.name} value={theme.name}>
                  {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Preview */}
          <div className="space-y-4">
            <Label>Tema Önizleme</Label>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {themes.map((theme) => (
                <motion.button
                  key={theme.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTheme(theme.name)}
                  className={`relative p-4 rounded-xl transition-all duration-300 ${
                    currentTheme === theme.name
                      ? 'ring-2 ring-primary'
                      : 'hover:bg-muted'
                  }`}
                >
                  {/* Theme Color Preview */}
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-8 h-8 rounded-full"
                      style={{ background: `hsl(${theme.primary})` }}
                    />
                    <span className="font-medium">
                      {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
                    </span>
                  </div>

                  {/* Theme Preview Elements */}
                  <div className="space-y-2">
                    <div 
                      className="h-2 rounded-full w-3/4"
                      style={{ background: `hsl(${theme.primary})` }}
                    />
                    <div 
                      className="h-2 rounded-full w-1/2"
                      style={{ background: `hsl(${theme.primary}/0.7)` }}
                    />
                    <div 
                      className="h-2 rounded-full w-1/4"
                      style={{ background: `hsl(${theme.primary}/0.4)` }}
                    />
                  </div>

                  {/* Active Indicator */}
                  {currentTheme === theme.name && (
                    <motion.div
                      layoutId="activeTheme"
                      className="absolute inset-0 border-2 border-primary rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}