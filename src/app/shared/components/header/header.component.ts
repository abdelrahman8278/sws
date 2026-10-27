import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NAVIGATION_ITEMS } from '../../../data/navigation.data';
import { NavItem } from '../../../core/models/navigation.model';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly translationService = inject(TranslationService);

  readonly navItems: readonly NavItem[] = NAVIGATION_ITEMS;
  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly currentLang = this.translationService.currentLang;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 20);
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
    this.updateBodyScrollLock(this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.updateBodyScrollLock(false);
  }

  private updateBodyScrollLock(lock: boolean): void {
    if (typeof document !== 'undefined') {
      if (lock) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }
}
