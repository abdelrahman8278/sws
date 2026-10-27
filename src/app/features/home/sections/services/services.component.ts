import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { SupabaseService } from '../../../../core/services/supabase.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, TranslatePipe],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  private readonly supabaseService = inject(SupabaseService);
  readonly services = this.supabaseService.services;
  readonly isLoading = this.supabaseService.isLoadingServices;
  readonly skeletonItems = Array.from({ length: 6 });
}
