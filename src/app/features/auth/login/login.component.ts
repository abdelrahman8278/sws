import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../core/services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly supabaseService = inject(SupabaseService);

  ngOnInit(): void {
    if (this.supabaseService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  readonly loginForm: FormGroup = this.fb.group({
    email: ['admin@stellar.ae', [Validators.required, Validators.email]],
    password: ['admin1234', [Validators.required, Validators.minLength(6)]],
  });

  readonly showPassword = signal(false);
  readonly errorMessage = signal<string | null>(null);

  togglePasswordVisibility(): void {
    this.showPassword.update((val) => !val);
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    const { email, password } = this.loginForm.value;

    const res = await this.supabaseService.signIn(email, password);
    if (res.success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage.set(res.error || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.');
    }
  }
}
