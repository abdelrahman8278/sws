import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ScrollToTopComponent } from '../../shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ScrollToTopComponent,
  ],
  template: `
    <app-header />
    <app-home />
    <app-footer />
    <app-scroll-to-top />
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-height: 100dvh;
      padding-top: var(--header-height);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayoutComponent {}
