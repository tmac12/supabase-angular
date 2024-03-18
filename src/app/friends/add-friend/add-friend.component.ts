import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FriendsService } from '../../services/friends.service';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss',
})
export class AddFriendComponent {
  email = signal('');
  linkSuccess = signal(false);
  authService = inject(AuthService);
  friendService = inject(FriendsService);

  async signIn() {
    //send magic link to email
    const result = await this.authService.signInWithEmail(this.email());

    if (!result.error) {
      this.linkSuccess.set(true);
    } else {
      alert(result.error.message);
    }
  }

  async addFriend() {
    const res = await this.friendService.addFriendPromise(this.email());
    if (res.error) {
      alert(res.error.message);
    } else {
      alert('Friend added');
    }
  }
}
