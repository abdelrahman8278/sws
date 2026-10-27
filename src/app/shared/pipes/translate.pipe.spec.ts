import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from '../../core/services/translation.service';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TranslationService,
        TranslatePipe,
      ],
    });

    service = TestBed.inject(TranslationService);
    pipe = TestBed.inject(TranslatePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should delegate transform calls to TranslationService', () => {
    const spy = vi.spyOn(service, 'translate').mockReturnValue('Translated Value');
    const result = pipe.transform('TEST.KEY');
    expect(spy).toHaveBeenCalledWith('TEST.KEY');
    expect(result).toBe('Translated Value');
  });
});
