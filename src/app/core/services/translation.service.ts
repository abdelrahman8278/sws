import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type SupportedLanguage = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly http = inject(HttpClient);

  readonly currentLang = signal<SupportedLanguage>('en');
  readonly isLoaded = signal<boolean>(false);
  private translations: Record<string, any> = {};

  constructor() {
    this.initLanguage();
  }

  private async initLanguage(): Promise<void> {
    let savedLang: SupportedLanguage = 'en';
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('stellar_lang') as SupportedLanguage;
      if (stored === 'ar' || stored === 'en') {
        savedLang = stored;
      }
    }
    await this.setLanguage(savedLang);
  }

  async setLanguage(lang: SupportedLanguage): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<Record<string, any>>(`assets/i18n/${lang}.json`)
      );
      this.translations = data;
      this.currentLang.set(lang);
      this.isLoaded.set(true);

      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      }

      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('stellar_lang', lang);
      }
    } catch (err) {
      console.error(`Failed to load translation file for ${lang}`, err);
    }
  }

  toggleLanguage(): void {
    const nextLang: SupportedLanguage = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(nextLang);
  }

  translate(key: string): string {
    if (!key) return '';
    const keys = key.split('.');
    let result: any = this.translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  }
}
