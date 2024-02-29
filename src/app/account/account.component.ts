import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private readonly supabase = inject(SupabaseService);

  session = this.supabase.session;
  loading = signal(false);
  //avatarUrl = signal('');
  profile = signal<Profile | undefined | null>(undefined);

  avatarUrl = computed(() => {
    const profile = this.profile();
    if (profile) return profile.avatar_url;
    return 'Empty avatar';
  });

  async ngOnInit(): Promise<void> {
    this.supabase.user.value?.app_metadata.provider;
    await this.getProfile();
  }

  signOut() {
    this.supabase.signOut();
  }

  async getProfile() {
    try {
      this.loading.set(true);
      if (!this.session) {
        console.error('no session');
        return;
      }
      const { user } = this.session;
      let { data: profile, error, status } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile.set(profile);
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
