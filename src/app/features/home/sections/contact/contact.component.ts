import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly isBriefingModalOpen = signal(false);
  readonly isSubmitted = signal(false);
  readonly briefingForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.briefingForm = this.fb.group({
      entityName: ['', [Validators.required, Validators.minLength(2)]],
      representativeName: ['', [Validators.required, Validators.minLength(2)]],
      officialEmail: ['', [Validators.required, Validators.email]],
      mandateScope: ['Strategic Brand Governance', Validators.required],
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

  submitBriefing(): void {
    if (this.briefingForm.invalid) {
      this.briefingForm.markAllAsTouched();
      return;
    }

    this.isSubmitted.set(true);
  }

  resetForm(): void {
    this.briefingForm.reset({
      mandateScope: 'Strategic Brand Governance',
    });
    this.isSubmitted.set(false);
    this.closeBriefingModal();
  }
}
