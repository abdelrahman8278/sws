import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { SupabaseService } from '../../../../core/services/supabase.service';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproachComponent {
  private readonly supabaseService = inject(SupabaseService);
  readonly steps = this.supabaseService.approachSteps;
}
