import { Injectable, computed, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase = inject(SupabaseService);
  isAuthenticated = computed(() => {
    return this.supabase.sessionSignal() != null;
  });

  constructor() {}
}
