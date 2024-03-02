import { Injectable, computed, inject, signal } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly supabase = inject(SupabaseService);
  private readonly router = inject(Router);

  loading = signal(false);
  profile = signal<Profile | undefined | null>(undefined);
  userId = signal<string | undefined>(undefined);
  session = this.supabase.session;

  avatarUrl = computed(() => {
    const profile = this.profile();
    if (profile) return profile.avatar_url;
    return 'Empty avatar';
  });

  async signOut() {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }

  async getProfile() {
    try {
      this.loading.set(true);
      if (!this.session) {
        console.error('no session');
        return;
      }
      const { user } = this.session;
      this.userId.set(user.id);
      let { data: profile, error, status } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile.set(profile);
        //this.profile.set(profile);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading.set(false);
    }
  }
}
