"use client";

import { useState } from 'react';
import { useLanguageStore } from '@/store/language';
import { languages, type Language } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: Language) => {
    setLanguage(language);
    setIsOpen(false);
    document.documentElement.dir = languages[language].dir;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative group">
          <div className="relative px-3 py-2 rounded-xl flex items-center gap-2.5 hover:bg-white/10 transition-colors">
            {/* Flag */}
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
              <span className="text-2xl leading-none">{languages[currentLanguage].flag}</span>
            </div>
            
            {/* Language Name */}
            <span className="hidden sm:block text-sm font-bold text-white tracking-wide">
              {languages[currentLanguage].name}
            </span>
            
            {/* Icon */}
            <Globe className="h-4 w-4 text-white opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2">
        <div className="grid gap-1">
          {Object.entries(languages).map(([key, { name, flag }]) => (
            <DropdownMenuItem
              key={key}
              className="flex items-center gap-3 p-3 cursor-pointer rounded-lg data-[highlighted]:bg-primary/10"
              onSelect={() => handleSelect(key as Language)}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                <span className="text-2xl">{flag}</span>
              </div>
              <span className="flex-1 font-semibold">{name}</span>
              {currentLanguage === key && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}