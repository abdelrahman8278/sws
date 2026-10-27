import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeId, ThemeService } from '../../../core/services/theme.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent {
  readonly themeService = inject(ThemeService);
  readonly translationService = inject(TranslationService);
  private readonly elementRef = inject(ElementRef);

  readonly isOpen = signal(false);
  readonly isPinned = signal(false);
  private closeTimeout: any = null;

  toggleOpen(): void {
    if (this.isOpen()) {
      this.closeImmediately();
    } else {
      this.openDropdown(true);
    }
  }

  openDropdown(pinned = false): void {
    this.cancelClose();
    if (pinned) {
      this.isPinned.set(true);
    }
    this.isOpen.set(true);
  }

  scheduleClose(): void {
    if (this.isPinned()) {
      return;
    }
    this.closeTimeout = setTimeout(() => {
      this.isOpen.set(false);
      this.isPinned.set(false);
    }, 350);
  }

  cancelClose(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  closeImmediately(): void {
    this.cancelClose();
    this.isOpen.set(false);
    this.isPinned.set(false);
  }

  selectTheme(id: ThemeId): void {
    this.themeService.setTheme(id);
    this.closeImmediately();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeImmediately();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeImmediately();
  }
}
