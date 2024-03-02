import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Shift } from './models/shift';

export interface Profile {
  id?: string;
  username: string;
  website: string;
  avatar_url: string;
  provider_refresh_token: string | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;
  user = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      console.log(session);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.user.next(session!.user);
        if (event === 'SIGNED_IN') {
          console.log('save user to db');
          //save user to db
          const user = session!.user;
          console.log(user);
          const res = this.updateProfile({
            id: user?.id,
            avatar_url: user?.user_metadata['avatar_url'],
            username: user?.user_metadata['name'],
            website: '',
            provider_refresh_token: session?.provider_refresh_token,
          });
          res.then((res) => {
            console.log('completed');
            console.log(res);
          });
        }

        // this.router.navigate(['/dashboard']);
      } else {
        this.user.next(null);
      }
    });
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url, provider_refresh_token`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async signInGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }

  /** Shifts */
  updateShift(shift: Shift) {
    const update = {
      ...shift,
      updated_at: new Date(),
    };

    return this.supabase.from('shifts').upsert(update);
  }

  getShifts() {
    return this.supabase.from('shifts').select().returns<Shift[]>();
  }
}
