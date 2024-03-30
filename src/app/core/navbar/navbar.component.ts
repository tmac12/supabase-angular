import { Component, OnInit, inject } from '@angular/core';
import AccountComponent from '../../account/account.component';
import { AccountService } from '../../account/account.service';
import { RouterLink } from '@angular/router';
import { FriendsService } from '../../services/friends.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AccountComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  avatarUrl = this.accountService.avatarUrl;
  friendsService = inject(FriendsService);
  friendsCount = this.friendsService.friendsCount;

  ngOnInit(): void {
    this.accountService.getProfile();
  }

  async signOut() {
    await this.accountService.signOut();
  }
}
