import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAVIGATION_ITEMS } from '../../../data/navigation.data';
import { NavItem } from '../../../core/models/navigation.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly navItems: readonly NavItem[] = NAVIGATION_ITEMS;
  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);

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
