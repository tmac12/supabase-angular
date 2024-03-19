import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  supabase = inject(SupabaseService);

  constructor() {}

  public addFriend(friendId: string) {
    console.log('add friend');
    return from(this.supabase.updateFriend(friendId));
  }
  public async addFriendPromise(friendId: string) {
    console.log('add friend');
    return await this.supabase.updateFriend(friendId);
  }

  public getFriends() {
    return from(this.supabase.getFriends());
  }
  public async getFriendPromise() {
    const { data, error } = await this.supabase.getFriends();
    if (error) console.error(error);
    return data;
  }
}
