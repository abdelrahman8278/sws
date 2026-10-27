import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  if (supabaseService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
