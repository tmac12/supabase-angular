import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FriendsService } from '../../services/friends.service';
import { SupabaseService } from '../../supabase.service';

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
  supabase = inject(SupabaseService);

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
    const res = await this.supabase.userExistByEmail(this.email());

    if (res) {
      alert('User exists');
      const addResult = await this.supabase.addFriendByEmail(this.email());
      //TODO: fix result
      if (addResult.error) {
        alert(addResult.error.message);
      } else {
        alert('Friend added');
      }
      //await this.inviteFriend();
    } else {
      alert('User does not exist');
      await this.inviteFriend();
    }
  }

  async inviteFriend() {
    const res = await this.friendService.addFriendPromise(this.email());
    if (res.error) {
      alert(res.error.message);
    } else {
      alert('Friend added');
    }
  }
}
