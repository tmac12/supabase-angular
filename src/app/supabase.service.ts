import { Injectable, inject, signal } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  RealtimeChannel,
  Session,
  SupabaseClient,
  User,
  createClient,
} from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Shift } from './models/shift';
import { CalendarEvent } from './models/calendarEvent';
import { Friend } from './models/friend';

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
  sessionSignal = signal<AuthSession | null>(null);
  user = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      console.log(session);
      this.sessionSignal.set(session);

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

  async getUser() {
    const user = await this.supabase.auth.getUser();
    return user;
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

  //thanks to: https://supabase.com/docs/guides/auth/concepts/redirect-urls
  getURL = () => {
    let url = environment.publicUrl ?? window.location.origin;
    // Make sure to include `https://` when not localhost.
    //url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
  };

  async signInGoogle() {
    return this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: this.getURL(),
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

  /** Events */
  updateEvent(calendarEvent: CalendarEvent) {
    const update = {
      ...calendarEvent,
      updated_at: new Date(),
      owner_id: calendarEvent.owner_id ?? this._session?.user.id,
    };
    return this.supabase.from('events').upsert(update);
  }

  getEvents() {
    return this.supabase.from('events').select().returns<CalendarEvent[]>();
  }

  subscribeToEventChanges() {
    const channel = this.supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'events',
        },
        (payload) => console.log(payload)
      )
      .subscribe();
    this.eventsChannel = channel;
  }

  eventsChannel: RealtimeChannel | undefined;

  unsubscribeEventChanges() {
    if (this.eventsChannel) this.supabase.removeChannel(this.eventsChannel);
  }

  /** Friends */

  updateFriendShipStatus(id: string, status: string) {
    const update = {
      status,
    };
    return this.supabase.from('friends').update(update).eq('id', id);
  }

  updateFriend(friendUid: string) {
    const update = {
      owner_id: this._session?.user.id,
      user_id: friendUid,
    };
    return this.supabase.from('friends').upsert(update);
  }

  getFriends() {
    return this.supabase
      .from('friends')
      .select()
      .eq('status', 'accepted')
      .returns<Friend[]>();
  }

  /**
   * Get friend with all status (pending, accepted, rejected, blocked)
   * @returns
   */
  getAllFriends() {
    return this.supabase.from('friends').select().returns<Friend[]>();
  }

  /**
   * Get all friends of the current logged user
   * @returns
   */
  getAllOwnerFriends() {
    return this.supabase
      .from('friends')
      .select()
      .eq('owner_id', this._session?.user.id)
      .returns<Friend[]>();
  }

  getFriendsRequest() {
    return this.supabase
      .from('friends')
      .select()
      .eq('status', 'pending')
      .returns<Friend[]>();
  }

  // Invite others
  // async addFriend(boardId: string, email: string) {
  //   const user = await this.supabase
  //     .from('USERS_TABLE')
  //     .select('id')
  //     .match({ email })
  //     .single();

  //   if (user.data?.id) {
  //     const userId = user.data.id;
  //     const userBoard = await this.supabase.from(USER_BOARDS_TABLE).insert({
  //       user_id: userId,
  //       board_id: boardId,
  //     });
  //     return userBoard;
  //   } else {
  //     return null;
  //   }
  // }

  async userExistByEmail(email: string) {
    const { data, error } = await this.supabase.rpc(
      'check_user_exists_by_email',
      { user_email: email }
    );
    if (error) {
      console.error(error);
      return false;
    }
    return data;
  }

  async addFriendByEmail(email: string) {
    // const { data, error } = await this.supabase.rpc('add_friend_by_email', {
    return await this.supabase.rpc('add_friend_by_email', {
      user_email: email,
    });

    // if (error) {
    //   console.error(error);
    //   return false;
    // }
    // return data;
  }

  friendRequests = signal('');

  subscribeToFriendChanges() {
    const channel = this.supabase
      .channel('friends-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'friends',
        },
        (payload) => {
          console.log(payload);
          this.friendRequests.set('new friend request ' + payload);
        }
      )
      .subscribe();
    this.friendsChannel = channel;
  }

  friendsChannel: RealtimeChannel | undefined;

  unsubscribeFriendsChanges() {
    if (this.friendsChannel) this.supabase.removeChannel(this.friendsChannel);
  }
}
