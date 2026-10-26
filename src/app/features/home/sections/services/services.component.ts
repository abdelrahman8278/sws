import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AGENCY_SERVICES } from '../../../../data/services.data';
import { AgencyService } from '../../../../core/models/service.model';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  readonly services: readonly AgencyService[] = AGENCY_SERVICES;
}
