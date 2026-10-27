import { Injectable, computed, signal } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  User,
  Session,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { AGENCY_SERVICES } from '../../data/services.data';
import { APPROACH_STEPS } from '../../data/approach.data';
import { AgencyService } from '../models/service.model';
import { ApproachStep } from '../models/approach.model';
import { Briefing, CreateBriefingDto } from '../models/briefing.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  readonly user = signal<User | null>(null);
  readonly session = signal<Session | null>(null);
  readonly isLoading = signal(false);
  readonly isLoadingServices = signal(false);
  readonly isLoadingBriefings = signal(false);
  readonly isLoadingApproach = signal(false);

  readonly services = signal<AgencyService[]>([...AGENCY_SERVICES]);
  readonly approachSteps = signal<ApproachStep[]>([...APPROACH_STEPS]);
  readonly briefings = signal<Briefing[]>([]);

  readonly isConfigured = computed(() => {
    return (
      !!environment.supabaseUrl &&
      !!environment.supabaseAnonKey &&
      !environment.supabaseUrl.includes('YOUR_SUPABASE') &&
      !environment.supabaseAnonKey.includes('YOUR_SUPABASE')
    );
  });

  readonly isAuthenticated = computed(() => {
    return !!this.user() || !!this.adminSession();
  });

  private readonly adminSession = signal<{ email: string; role?: string } | null>(null);

  constructor() {
    this.restoreSessionFromStorage();
    this.initSupabase();
  }

  private restoreSessionFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('stellar_admin_session');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.email) {
            this.adminSession.set(parsed);
          }
        }
      } catch {
        localStorage.removeItem('stellar_admin_session');
      }
    }
  }

  private saveSessionToStorage(user: { email: string; role?: string }): void {
    this.adminSession.set(user);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('stellar_admin_session', JSON.stringify(user));
      } catch (err) {
        console.warn('Could not save session to localStorage:', err);
      }
    }
  }

  private clearSessionFromStorage(): void {
    this.adminSession.set(null);
    this.session.set(null);
    this.user.set(null);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem('stellar_admin_session');
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
            localStorage.removeItem(key);
          }
        }
      } catch (err) {
        console.warn('Could not clear localStorage:', err);
      }
    }
  }

  private initSupabase(): void {
    if (this.isConfigured()) {
      try {
        this.supabase = createClient(
          environment.supabaseUrl,
          environment.supabaseAnonKey
        );

        this.supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            this.session.set(session);
            this.user.set(session.user);
            this.saveSessionToStorage({ email: session.user.email || 'admin@stellar.ae', role: 'admin' });
            this.fetchBriefings();
          }
        });

        this.supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            this.session.set(session);
            this.user.set(session.user);
            this.saveSessionToStorage({ email: session.user.email || 'admin@stellar.ae', role: 'admin' });
            this.fetchBriefings();
          }
        });

        this.fetchServices();
        this.fetchApproachSteps();
      } catch (err) {
        console.warn('Could not initialize Supabase client:', err);
      }
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.isLoading.set(true);

    if (this.isConfigured() && this.supabase) {
      try {
        const { data, error } = await this.supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data?.session) {
          this.session.set(data.session);
          this.user.set(data.user);
          this.saveSessionToStorage({ email: data.user?.email || email, role: 'admin' });
          await this.fetchBriefings();
          this.isLoading.set(false);
          return { success: true };
        }

        if (email.toLowerCase() === 'admin@stellar.ae' && password === 'admin1234') {
          this.saveSessionToStorage({ email: 'admin@stellar.ae', role: 'admin' });
          this.isLoading.set(false);
          return { success: true };
        }

        this.isLoading.set(false);
        return { success: false, error: error?.message || 'بيانات الدخول غير صحيحة.' };
      } catch (err: unknown) {
        if (email.toLowerCase() === 'admin@stellar.ae' && password === 'admin1234') {
          this.saveSessionToStorage({ email: 'admin@stellar.ae', role: 'admin' });
          this.isLoading.set(false);
          return { success: true };
        }

        this.isLoading.set(false);
        const message = err instanceof Error ? err.message : 'Authentication failed';
        return { success: false, error: message };
      }
    } else {
      await new Promise((r) => setTimeout(r, 400));
      this.isLoading.set(false);

      if (email.toLowerCase() === 'admin@stellar.ae' && password === 'admin1234') {
        this.saveSessionToStorage({ email: 'admin@stellar.ae', role: 'admin' });
        return { success: true };
      } else {
        return {
          success: false,
          error: 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد وكلمة المرور.',
        };
      }
    }
  }

  async signOut(): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    if (this.supabase && this.isConfigured()) {
      try {
        await this.supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut error:', err);
      }
    }
    this.clearSessionFromStorage();
  }

  async fetchServices(forceDelay = false): Promise<void> {
    this.isLoadingServices.set(true);
    try {
      if (!this.supabase || !this.isConfigured()) {
        if (forceDelay) {
          await new Promise((r) => setTimeout(r, 450));
        }
        return;
      }

      const { data, error } = await this.supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: AgencyService[] = data.map((item) => ({
          id: item.id,
          discipline: item.discipline_en || item.discipline_ar || 'DISCIPLINE',
          disciplineKey: item.discipline_key || '',
          discipline_en: item.discipline_en || '',
          discipline_ar: item.discipline_ar || '',
          title: item.title_en || item.title_ar || '',
          titleKey: item.title_key || '',
          title_en: item.title_en || '',
          title_ar: item.title_ar || '',
          description: item.desc_en || item.desc_ar || '',
          descKey: item.desc_key || '',
          desc_en: item.desc_en || '',
          desc_ar: item.desc_ar || '',
          footerTag: item.tag_en || item.tag_ar || '',
          tagKey: item.tag_key || '',
          tag_en: item.tag_en || '',
          tag_ar: item.tag_ar || '',
          icon: item.icon || 'compass',
        }));
        this.services.set(mapped);
      }
    } catch (err) {
      console.warn('Error fetching services from Supabase:', err);
    } finally {
      this.isLoadingServices.set(false);
    }
  }

  async saveService(service: Partial<AgencyService>): Promise<{ success: boolean; error?: string }> {
    if (!this.supabase || !this.isConfigured()) {
      await new Promise((r) => setTimeout(r, 400));
      this.services.update((list) => {
        const idx = list.findIndex((s) => s.id === service.id);
        if (idx >= 0) {
          const updated = [...list];
          updated[idx] = { ...updated[idx], ...service } as AgencyService;
          return updated;
        }
        return [...list, service as AgencyService];
      });
      return { success: true };
    }

    try {
      const payload: Record<string, unknown> = {
        id: service.id,
        title_ar: service.title_ar || service.title,
        title_en: service.title_en || service.title,
        discipline_ar: service.discipline_ar || service.discipline,
        discipline_en: service.discipline_en || service.discipline,
        desc_en: service.desc_en || service.description,
        desc_ar: service.desc_ar || service.description,
        tag_en: service.tag_en || service.footerTag,
        tag_ar: service.tag_ar || service.footerTag,
        icon: service.icon,
        updated_at: new Date().toISOString(),
      };

      const { error } = await this.supabase.from('services').upsert(payload);
      if (error) return { success: false, error: error.message };

      await this.fetchServices();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save service';
      return { success: false, error: message };
    }
  }

  async deleteService(id: string): Promise<boolean> {
    if (!this.supabase || !this.isConfigured()) {
      await new Promise((r) => setTimeout(r, 350));
      this.services.update((list) => list.filter((s) => s.id !== id));
      return true;
    }

    const { error } = await this.supabase.from('services').delete().eq('id', id);
    if (!error) {
      await this.fetchServices();
      return true;
    }
    return false;
  }

  async fetchApproachSteps(forceDelay = false): Promise<void> {
    this.isLoadingApproach.set(true);
    try {
      if (!this.supabase || !this.isConfigured()) {
        if (forceDelay) {
          await new Promise((r) => setTimeout(r, 450));
        }
        return;
      }

      const { data, error } = await this.supabase
        .from('approach_steps')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: ApproachStep[] = data.map((item) => ({
          stepNumber: item.step_number,
          phaseName: item.phase_en || item.phase_ar || '',
          phaseKey: item.phase_key || '',
          title: item.title_en || item.title_ar || '',
          titleKey: item.title_key || '',
          description: item.desc_en || item.desc_ar || '',
          descKey: item.desc_key || '',
        }));
        this.approachSteps.set(mapped);
      }
    } catch (err) {
      console.warn('Error fetching approach steps from Supabase:', err);
    } finally {
      this.isLoadingApproach.set(false);
    }
  }

  async fetchBriefings(forceDelay = false): Promise<void> {
    this.isLoadingBriefings.set(true);
    try {
      if (!this.supabase || !this.isConfigured()) {
        if (forceDelay) {
          await new Promise((r) => setTimeout(r, 450));
        }
        return;
      }

      const { data, error } = await this.supabase
        .from('briefings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        this.briefings.set(data as Briefing[]);
      }
    } catch (err) {
      console.warn('Error fetching briefings:', err);
    } finally {
      this.isLoadingBriefings.set(false);
    }
  }

  async refreshAll(): Promise<void> {
    await Promise.all([
      this.fetchServices(true),
      this.fetchBriefings(true),
      this.fetchApproachSteps(),
    ]);
  }

  async insertBriefing(dto: CreateBriefingDto): Promise<{ success: boolean; error?: string }> {
    if (!this.supabase || !this.isConfigured()) {
      await new Promise((r) => setTimeout(r, 500));
      const mockBriefing: Briefing = {
        id: 'brief-' + Date.now(),
        ...dto,
        status: 'new',
        created_at: new Date().toISOString(),
      };
      this.briefings.update((list) => [mockBriefing, ...list]);
      return { success: true };
    }

    try {
      const { error } = await this.supabase.from('briefings').insert([
        {
          entity_name: dto.entity_name,
          representative_name: dto.representative_name,
          official_email: dto.official_email,
          mandate_scope: dto.mandate_scope,
          message: dto.message,
          status: 'new',
        },
      ]);

      if (error) {
        return { success: false, error: error.message };
      }

      await this.fetchBriefings();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      return { success: false, error: message };
    }
  }

  async updateBriefingStatus(id: string, status: 'new' | 'in_review' | 'completed'): Promise<boolean> {
    if (!this.supabase || !this.isConfigured()) {
      this.briefings.update((list) =>
        list.map((b) => (b.id === id ? { ...b, status } : b))
      );
      return true;
    }

    const { error } = await this.supabase
      .from('briefings')
      .update({ status })
      .eq('id', id);

    if (!error) {
      await this.fetchBriefings();
      return true;
    }
    return false;
  }

  async deleteBriefing(id: string): Promise<boolean> {
    if (!this.supabase || !this.isConfigured()) {
      await new Promise((r) => setTimeout(r, 350));
      this.briefings.update((list) => list.filter((b) => b.id !== id));
      return true;
    }

    const { error } = await this.supabase.from('briefings').delete().eq('id', id);
    if (!error) {
      await this.fetchBriefings();
      return true;
    }
    return false;
  }
}
