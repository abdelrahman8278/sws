import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../core/services/supabase.service';
import { AgencyService } from '../../core/models/service.model';
import { Briefing } from '../../core/models/briefing.model';
import { TranslationService } from '../../core/services/translation.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  readonly supabaseService = inject(SupabaseService);
  readonly translationService = inject(TranslationService);

  readonly activeTab = signal<'briefings' | 'services' | 'approach'>('briefings');
  readonly selectedBriefing = signal<Briefing | null>(null);
  readonly deleteConfirm = signal<{ type: 'briefing' | 'service'; id: string; title: string } | null>(null);

  readonly isServiceModalOpen = signal(false);
  readonly editingServiceId = signal<string | null>(null);
  readonly serviceForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    title_ar: ['', Validators.required],
    title_en: ['', Validators.required],
    discipline_ar: [''],
    discipline_en: [''],
    description: ['', Validators.required],
    footerTag: ['Enterprise & Sovereign'],
    icon: ['compass'],
  });

  setTab(tab: 'briefings' | 'services' | 'approach'): void {
    this.activeTab.set(tab);
  }

  async updateStatus(id: string, status: 'new' | 'in_review' | 'completed'): Promise<void> {
    await this.supabaseService.updateBriefingStatus(id, status);
  }

  openDeleteBriefingConfirm(briefing: Briefing): void {
    this.deleteConfirm.set({
      type: 'briefing',
      id: briefing.id,
      title: briefing.entity_name,
    });
  }

  openDeleteServiceConfirm(service: AgencyService): void {
    const title = this.translationService.currentLang() === 'en'
      ? (service.title_en || service.title)
      : (service.title_ar || service.title);
    this.deleteConfirm.set({
      type: 'service',
      id: service.id,
      title: title || service.id,
    });
  }

  cancelDelete(): void {
    this.deleteConfirm.set(null);
  }

  async executeDelete(): Promise<void> {
    const item = this.deleteConfirm();
    if (!item) return;

    if (item.type === 'briefing') {
      await this.supabaseService.deleteBriefing(item.id);
      if (this.selectedBriefing()?.id === item.id) {
        this.selectedBriefing.set(null);
      }
    } else if (item.type === 'service') {
      await this.supabaseService.deleteService(item.id);
    }

    this.deleteConfirm.set(null);
  }

  openBriefingDetails(briefing: Briefing): void {
    this.selectedBriefing.set(briefing);
  }

  closeBriefingDetails(): void {
    this.selectedBriefing.set(null);
  }

  openAddServiceModal(): void {
    this.editingServiceId.set(null);
    this.serviceForm.reset({
      id: 'service-' + Date.now(),
      title_ar: '',
      title_en: '',
      discipline_ar: '',
      discipline_en: '',
      description: '',
      footerTag: 'Strategic Mandate',
      icon: 'sparkle',
    });
    this.isServiceModalOpen.set(true);
  }

  openEditServiceModal(service: AgencyService): void {
    this.editingServiceId.set(service.id);
    this.serviceForm.patchValue({
      id: service.id,
      title_ar: service.title_ar || service.title,
      title_en: service.title_en || service.title,
      discipline_ar: service.discipline_ar || service.discipline,
      discipline_en: service.discipline_en || service.discipline,
      description: service.description,
      footerTag: service.footerTag,
      icon: service.icon,
    });
    this.isServiceModalOpen.set(true);
  }

  closeServiceModal(): void {
    this.isServiceModalOpen.set(false);
  }

  async saveService(): Promise<void> {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    const formVal = this.serviceForm.value;
    await this.supabaseService.saveService({
      id: formVal.id,
      title: formVal.title_ar || formVal.title_en,
      title_ar: formVal.title_ar,
      title_en: formVal.title_en,
      discipline: formVal.discipline_ar || formVal.discipline_en || 'DISCIPLINE',
      discipline_ar: formVal.discipline_ar,
      discipline_en: formVal.discipline_en,
      description: formVal.description,
      footerTag: formVal.footerTag,
      icon: formVal.icon,
    });

    this.closeServiceModal();
  }

  async onLogout(): Promise<void> {
    await this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }
}
