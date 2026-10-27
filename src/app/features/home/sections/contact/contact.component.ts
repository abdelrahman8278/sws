import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { SupabaseService } from '../../../../core/services/supabase.service';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, DialogComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly supabaseService = inject(SupabaseService);

  readonly isBriefingModalOpen = signal(false);
  readonly isSubmitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly briefingForm: FormGroup;

  constructor() {
    this.briefingForm = this.fb.group({
      entityName: ['', [Validators.required, Validators.minLength(2)]],
      representativeName: ['', [Validators.required, Validators.minLength(2)]],
      officialEmail: ['', [Validators.required, Validators.email]],
      mandateScope: ['Brand Strategy', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  openBriefingModal(): void {
    this.isBriefingModalOpen.set(true);
    this.isSubmitted.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeBriefingModal(): void {
    this.isBriefingModalOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  async submitBriefing(): Promise<void> {
    if (this.briefingForm.invalid) {
      this.briefingForm.markAllAsTouched();
      return;
    }

    try {
      this.isSubmitting.set(true);
      const formVal = this.briefingForm.value;

      await this.supabaseService.insertBriefing({
        entity_name: formVal.entityName,
        representative_name: formVal.representativeName,
        official_email: formVal.officialEmail,
        mandate_scope: formVal.mandateScope,
        message: formVal.message,
      });

      this.isSubmitted.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.briefingForm.reset({
      mandateScope: 'Brand Strategy',
    });
    this.isSubmitted.set(false);
    this.closeBriefingModal();
  }
}
