import { Component, inject } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsService } from '../services/friends.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { JsonPipe } from '@angular/common';

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
}
