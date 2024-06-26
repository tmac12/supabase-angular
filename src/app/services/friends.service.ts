import { Injectable, computed, inject, signal } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { from, tap } from 'rxjs';
import { Friend, FriendDto } from '../models/friend';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  supabase = inject(SupabaseService);
  friendRequests = this.supabase.friendRequests;
  friendsSignal = signal<FriendDto[]>([]);
  friendsWithoutOwnerSignal = computed(() => {
    return this.friendsSignal().filter((friend) => !friend.isOwner);
  });

  friendsCount = computed(() => {
    return this.friendsWithoutOwnerSignal().length;
  });

  constructor() {}

  public acceptFriendShip(friendTableId: string) {
    return from(
      this.supabase.updateFriendShipStatus(friendTableId, 'accepted')
    );
  }

  public declineFriendShip(friendTableId: string) {
    return from(
      this.supabase.updateFriendShipStatus(friendTableId, 'declined')
    );
  }

  public addFriend(friendId: string) {
    console.log('add friend');
    return from(this.supabase.updateFriend(friendId));
  }
  public async addFriendPromise(friendId: string) {
    console.log('add friend');
    return await this.supabase.updateFriend(friendId);
  }

  public getAllFriends() {
    return from(this.supabase.getAllFriends());
  }

  public async getAllFriendsPromise(ownerId: string | undefined) {
    const { data, error } = await this.supabase.getAllFriends();
    if (error) {
      console.error(error);
      this.friendsSignal.set([]);
      return;
    }

    if (data) {
      console.log('Friends found');
      const friends = data.map((friend: Friend) => {
        return {
          ...friend,
          isOwner: friend.owner_id === ownerId,
        };
      });
      this.friendsSignal.set(friends);
    } else {
      console.log('No friends found');
      this.friendsSignal.set([]);
    }
  }

  public getAllOwnerFriends() {
    return from(this.supabase.getAllOwnerFriends());
  }

  public getFriends() {
    return from(this.supabase.getFriends());
  }

  public async getFriendPromise() {
    const { data, error } = await this.supabase.getFriends();
    if (error) console.error(error);
    return data;
  }

  //Add friend by email
  async addFriendByEmail(email: string) {
    //TODO: refactor with firstValueFrom or other
    const res = await this.supabase.userExistByEmail(email);

    if (res) {
      console.log('User exists');
      const addResult = await this.supabase.addFriendByEmail(email);

      if (addResult.error) {
        console.error(addResult.error.message);
        return false;
      } else {
        console.log('Friend added');
      }
      //await this.inviteFriend();
    } else {
      console.log('User does not exist');
      const invitationResult = await this.inviteFriend(email);
      if (invitationResult.error) {
        console.error(invitationResult.error.message);
        return false;
      } else {
        console.log('Friend invited');
      }
    }
    return true;
  }

  async inviteFriend(email: string) {
    const res = await this.addFriendPromise(email);
    if (res.error) {
      console.log(res.error.message);
    } else {
      console.log('Friend invited');
    }
    return res;
  }

  subscribeToFriendChanges() {
    console.log('subscribe to friend changes');
    this.supabase.subscribeToFriendChanges();
  }

  unsubscribeFriendChanges() {
    console.log('unsubscribe friend changes');
    this.supabase.unsubscribeFriendsChanges();
  }
}
