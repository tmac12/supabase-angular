import { Injectable, signal } from '@angular/core';
import { Profile } from '../supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  profile = signal<Profile | undefined | null>(undefined);
  userId = signal<string | undefined>(undefined);
}
