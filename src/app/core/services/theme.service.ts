import { Injectable, computed, signal } from '@angular/core';

export type ThemeId = 'gold' | 'blue' | 'emerald' | 'crimson' | 'amber' | 'purple';

export interface ThemeOption {
  id: ThemeId;
  name_ar: string;
  name_en: string;
  primaryColor: string;
  accentLight: string;
  preview: string;
}

export const SYSTEM_THEMES: ThemeOption[] = [
  {
    id: 'gold',
    name_ar: 'الذهبي الملكي',
    name_en: 'Royal Sovereign Gold',
    primaryColor: '#c9a86a',
    accentLight: '#e2c285',
    preview: 'linear-gradient(135deg, #c9a86a 0%, #0b1120 100%)',
  },
  {
    id: 'blue',
    name_ar: 'الأزرق السيادي',
    name_en: 'Federal Sovereign Blue',
    primaryColor: '#3b82f6',
    accentLight: '#93c5fd',
    preview: 'linear-gradient(135deg, #3b82f6 0%, #060e1d 100%)',
  },
  {
    id: 'emerald',
    name_ar: 'الزمرد الإماراتي',
    name_en: 'Emirati Emerald',
    primaryColor: '#10b981',
    accentLight: '#6ee7b7',
    preview: 'linear-gradient(135deg, #10b981 0%, #05140f 100%)',
  },
  {
    id: 'crimson',
    name_ar: 'العنابي الدبلوماسي',
    name_en: 'Diplomatic Crimson',
    primaryColor: '#f43f5e',
    accentLight: '#fda4af',
    preview: 'linear-gradient(135deg, #f43f5e 0%, #14070d 100%)',
  },
  {
    id: 'amber',
    name_ar: 'برونز السعديات',
    name_en: 'Saadiyat Bronze',
    primaryColor: '#f59e0b',
    accentLight: '#fde68a',
    preview: 'linear-gradient(135deg, #f59e0b 0%, #130c04 100%)',
  },
  {
    id: 'purple',
    name_ar: 'الأرجواني القيادي',
    name_en: 'Executive Violet',
    primaryColor: '#8b5cf6',
    accentLight: '#c4b5fd',
    preview: 'linear-gradient(135deg, #8b5cf6 0%, #0d081b 100%)',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'stellar_theme';
  readonly themes = SYSTEM_THEMES;

  readonly currentTheme = signal<ThemeId>(this.getInitialTheme());

  readonly activeThemeOption = computed(() => {
    return this.themes.find((t) => t.id === this.currentTheme()) || this.themes[0];
  });

  constructor() {
    this.applyThemeToDom(this.currentTheme());
  }

  setTheme(themeId: ThemeId): void {
    this.currentTheme.set(themeId);
    this.applyThemeToDom(themeId);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, themeId);
      } catch (e) {
        console.warn('Could not save theme to localStorage:', e);
      }
    }
  }

  private getInitialTheme(): ThemeId {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem(this.storageKey) as ThemeId | null;
        if (saved && SYSTEM_THEMES.some((t) => t.id === saved)) {
          return saved;
        }
      } catch {
        // Fallback to default
      }
    }
    return 'gold';
  }

  private applyThemeToDom(themeId: ThemeId): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeId);
    }
  }
}
