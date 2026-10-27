import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TranslationService,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TranslationService);

    const initReq = httpMock.expectOne('assets/i18n/en.json');
    initReq.flush({
      NAV: { HOME: 'Home' },
      HERO: { TITLE: 'Ideas That Inspire.' },
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and load initial english dictionary', () => {
    expect(service).toBeTruthy();
    expect(service.currentLang()).toBe('en');
    expect(service.translate('NAV.HOME')).toBe('Home');
    expect(service.translate('HERO.TITLE')).toBe('Ideas That Inspire.');
  });

  it('should return the key if translation is missing', () => {
    expect(service.translate('NON.EXISTENT.KEY')).toBe('NON.EXISTENT.KEY');
  });

  it('should switch language to Arabic and translate Arabic keys', async () => {
    const setPromise = service.setLanguage('ar');
    const arReq = httpMock.expectOne('assets/i18n/ar.json');
    arReq.flush({
      NAV: { HOME: 'الرئيسية' },
      HERO: { TITLE: 'أفكار تلهم.' },
    });

    await setPromise;
    expect(service.currentLang()).toBe('ar');
    expect(service.translate('NAV.HOME')).toBe('الرئيسية');
    expect(service.translate('HERO.TITLE')).toBe('أفكار تلهم.');
  });
});
