import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Profile, SupabaseService } from '../supabase.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export default class AccountComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  profile = this.accountService.profile;

  avatarUrl = computed(() => {
    const profile = this.profile();
    if (profile) return profile.avatar_url;
    return 'Empty avatar';
  });

  async ngOnInit(): Promise<void> {
    await this.accountService.getProfile();
  }

  async signOut() {
    this.accountService.signOut();
  }
}
