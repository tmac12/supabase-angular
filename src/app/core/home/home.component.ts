import {
  Component,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShiftListComponent } from '../../shifts/shift-list/shift-list.component';
import { FullCalendarWrapperComponent } from '../../calendars/full-calendar-wrapper/full-calendar-wrapper.component';
import { ShiftService } from '../../shifts/shift.service';
import { Shift } from '../../models/shift';
import { WelcomeComponent } from '../welcome/welcome.component';
import { FriendsService } from '../../services/friends.service';
import { ToastComponent } from '../toast/toast.component';
import { NotificationService } from '../../services/notification.service';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    WelcomeComponent,
    ShiftListComponent,
    FullCalendarWrapperComponent,
    ToastComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnDestroy {
  shiftService = inject(ShiftService);
  private readonly friendService = inject(FriendsService);
  private readonly accountService = inject(AccountService);
  friendRequest = this.friendService.friendRequests;
  private readonly notificationService = inject(NotificationService);
  notificationMsg = this.notificationService.message;
  notificationVariant = this.notificationService.variant;
  showNotification = signal(false);

  shifts = signal<Shift[] | null>([]);
  showWelcome = computed(() => {
    const shifts = this.shifts();
    if (shifts) {
      return shifts.length > 0 ? false : true;
    }
    return true;
  });

  userId = this.accountService.userId;
  allFriendsPromise = computed(() => {
    const internalUserId = this.userId();
    if (internalUserId) {
      this.friendService.getAllFriendsPromise(internalUserId).then((res) => {
        console.log('Friends fetched');
      });
    }
  });

  effectFriends = effect(() => {
    this.allFriendsPromise();
  });

  constructor() {
    this.shiftService.getShiftsObservable().subscribe((res) => {
      if (res.error) console.error(res.error);
      this.shifts.set(res.data);
      if (res.data) this.shiftService.shiftList.set(res.data);
    });

    this.friendService.subscribeToFriendChanges();

    effect(
      () => {
        const msg = this.friendRequest();
        this.notificationService.info(msg);
        this.showNotification.set(true);
        this.dismissNotification();
      },
      { allowSignalWrites: true }
    );
  }

  ngOnDestroy(): void {
    this.friendService.unsubscribeFriendChanges();
  }
  dismissNotification() {
    setTimeout(() => this.showNotification.set(false), 3000);
  }
}
