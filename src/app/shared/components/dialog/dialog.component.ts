import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly isOpen = input<boolean>(false);
  readonly title = input<string>('');
  readonly eyebrow = input<string>('');
  readonly maxWidth = input<string>('600px');
  readonly showClose = input<boolean>(true);
  readonly theme = input<'dark' | 'light'>('dark');
  readonly hasFooter = input<boolean>(true);

  readonly closed = output<void>();

  constructor() {
    effect(() => {
      this.updateScrollLock(this.isOpen());
    });
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('app-dialog-backdrop')) {
      this.close();
    }
  }

  private updateScrollLock(lock: boolean): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = lock ? 'hidden' : '';
    }
  }
}
