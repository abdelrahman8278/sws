import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-heading.component.html',
  styleUrls: ['./section-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input() centered = false;
  @Input() titleLevel: 'h1' | 'h2' | 'h3' = 'h2';
}
