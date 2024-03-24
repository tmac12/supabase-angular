import { Component, computed, inject } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsService } from '../services/friends.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { JsonPipe } from '@angular/common';
import { startWith } from 'rxjs';
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
    () => this.friendService.getAllFriends().pipe(startWith([])),
    {
      initialValue: [],
    }
  );

  allFriendsData = computed(() => {
    const response = this.allFriends();
    if (!response) {
      return [];
    }

    const castedRepsonse = response as PostgrestSingleResponse<Friend[]>;
    if (castedRepsonse.error) {
      console.error(castedRepsonse.error);
      return [];
    }

    return castedRepsonse.data;

    //const boh : PostgrestSingleResponse<Friend[]> | never[]
  });

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
