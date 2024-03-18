import { Component, inject } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [AddFriendComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export default class FriendsComponent {
  friendService = inject(FriendsService);

  friends$ = this.friendService.getFriends();
  friends = this.friends$;
}
