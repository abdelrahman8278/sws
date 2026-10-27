import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappButtonComponent {
  readonly phoneNumber = '201061711822';
  readonly whatsappUrl = `https://wa.me/201061711822`;
}
