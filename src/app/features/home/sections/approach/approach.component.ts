import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APPROACH_STEPS } from '../../../../data/approach.data';
import { ApproachStep } from '../../../../core/models/approach.model';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachComponent {
  readonly steps: readonly ApproachStep[] = APPROACH_STEPS;
}
