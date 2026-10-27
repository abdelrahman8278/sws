import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

export type SupportedLanguage = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly http = inject(HttpClient);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

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

        if (lang === 'ar') {
          this.titleService.setTitle('ستيلار ميديا | التسويق الاستراتيجي والإبداع المؤسسي — أبوظبي');
          this.metaService.updateTag({
            name: 'description',
            content: 'ستيلار ميديا هي وكالة تسويق رائدة مقرها أبوظبي، متخصصة في هندسة استراتيجيات الاتصال للجهات الحكومية والشركات الكبرى في دولة الإمارات.',
          });
          this.metaService.updateTag({ property: 'og:title', content: 'ستيلار ميديا | التسويق الاستراتيجي والإبداع المؤسسي — أبوظبي' });
          this.metaService.updateTag({ property: 'og:description', content: 'نجمع بين الاستراتيجية والإبداع والفكر الرقمي لمساعدة المؤسسات على التواصل بوضوح وتأثير استثنائي.' });
          this.metaService.updateTag({ property: 'og:locale', content: 'ar_AE' });
        } else {
          this.titleService.setTitle('Stellar Media | Strategic Marketing & Institutional Creative — Abu Dhabi');
          this.metaService.updateTag({
            name: 'description',
            content: 'Stellar Media is a premier marketing agency based in Abu Dhabi, UAE, engineering communication architectures for government entities and major brands.',
          });
          this.metaService.updateTag({ property: 'og:title', content: 'Stellar Media | Strategic Marketing & Institutional Creative — Abu Dhabi' });
          this.metaService.updateTag({ property: 'og:description', content: 'We bring strategy, creativity, and digital thinking together to help organizations communicate with clarity and impact.' });
          this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });
        }
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
