import { Component, computed, inject } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsService } from '../services/friends.service';
import { computedAsync } from 'ngxtension/computed-async';
import { JsonPipe } from '@angular/common';
import { map } from 'rxjs';
import { Friend } from '../models/friend';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [AddFriendComponent, JsonPipe],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export default class FriendsComponent {
  friendService = inject(FriendsService);
  accountService = inject(AccountService);

  //friends$ = toSignal(this.friendService.getFriends());
  // friends = computedAsync(() => this.friendService.getFriendPromise(), {
  //   initialValue: [],
  // });

  allFriends = computedAsync(
    () =>
      this.friendService.getAllFriends().pipe(
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

  //add isOwner field
  friendsVm = computed(() => {
    const friends = this.allFriends();
    if (!friends) {
      return [];
    }

    const userId = this.accountService.userId();
    return friends.map((friend) => {
      return {
        ...friend,
        isOwner: friend.owner_id === userId,
      };
    });
  });

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

  acceptFriendship(friendId: string) {
    console.log('accept friend');
    this.friendService.acceptFriendShip(friendId).subscribe();
  }
  declineFriendShip(friendId: string) {
    console.log('decline friend');
    this.friendService.declineFriendShip(friendId);
  }
}
