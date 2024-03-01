import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private readonly supabase = inject(SupabaseService);
  private readonly accountService = inject(AccountService);

  session = this.supabase.session;
  loading = signal(false);
  //avatarUrl = signal('');
  //profile = signal<Profile | undefined | null>(undefined);
  profile = this.accountService.profile;

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
      this.accountService.userId.set(user.id);
      let { data: profile, error, status } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.accountService.profile.set(profile);
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
