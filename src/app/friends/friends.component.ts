import { Component, computed, inject } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsService } from '../services/friends.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { JsonPipe } from '@angular/common';
import { map, startWith } from 'rxjs';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [AddFriendComponent, JsonPipe],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export default class FriendsComponent {
  friendService = inject(FriendsService);

  //friends$ = toSignal(this.friendService.getFriends());
  friends = computedAsync(() => this.friendService.getFriendPromise(), {
    initialValue: [],
  });

  allFriends = computedAsync(
    () =>
      this.friendService.getAllFriends().pipe(
        // startWith([] as Friend[]),

        // map((friends: Friend[] | PostgrestResponseFailure) => {
        map((friendsResponse) => {
          if (friendsResponse.error) {
            console.error('Error fetching friends', friendsResponse.error);
            return [] as Friend[];
          }

          let uniqueIds = new Set();
          const friends = friendsResponse.data;
          if (!Array.isArray(friends)) return [];
          return friends.filter((friend) => {
            if (!uniqueIds.has(friend.owner_id)) {
              uniqueIds.add(friend.owner_id);
              return true;
            }
            return false;
          });
        })
      ),
    {
      initialValue: [],
    }
  );

  // allFriendsData = computed(() => {
  //   const response = this.allFriends();
  //   if (!response) {
  //     return [];
  //   }

  //   const castedResponse = response as PostgrestSingleResponse<Friend[]>;
  //   if (castedResponse.error) {
  //     console.error(castedResponse.error);
  //     return [];
  //   }
  //   return castedResponse.data;
  // });

  // isPostgrestSingleResponse(
  //   obj: any
  // ): obj is PostgrestSingleResponse<Friend[]> {
  //   return (
  //     obj &&
  //     obj.data &&
  //     Array.isArray(obj.data) &&
  //     obj.data.every((item: any) => item instanceof Friend)
  //   );
  // }
}
