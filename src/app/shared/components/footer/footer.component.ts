import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FOOTER_INSTITUTIONAL_LINKS } from '../../../data/navigation.data';
import { NavItem } from '../../../core/models/navigation.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly navLinks: readonly NavItem[] = FOOTER_INSTITUTIONAL_LINKS;
  readonly currentYear = new Date().getFullYear();
}
