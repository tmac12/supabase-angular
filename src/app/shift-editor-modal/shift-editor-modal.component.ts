import {
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  model,
  viewChild,
} from '@angular/core';
import { ShiftSelectComponent } from '../shifts/shift-select/shift-select.component';
import { ShiftPreviewComponent } from '../shifts/shift-preview/shift-preview.component';
import { CalendarService } from '../services/calendar.service';
import { DatePipe } from '@angular/common';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-shift-editor-modal',
  standalone: true,
  imports: [ShiftSelectComponent, ShiftPreviewComponent, DatePipe],
  templateUrl: './shift-editor-modal.component.html',
  styleUrl: './shift-editor-modal.component.scss',
})
export class ShiftEditorModalComponent {
  @ViewChild('modalDialog') myModal: ElementRef | undefined;
  shiftSelect = viewChild.required<ShiftSelectComponent>('shiftSelect'); //viewChild signal

  currentDate = model<Date>();
  isVisible = model(false);
  selectedShift = computed(() => this.shiftSelect().selectedValue());
  calendarService = inject(CalendarService);
  friendService = inject(FriendsService);
  friendsWithoutOwner = this.friendService.friendsWithoutOwnerSignal;

  constructor() {
    effect(() => {
      console.log(`The current isVisible is: ${this.isVisible()}`);
      if (this.isVisible()) {
        this.myModal?.nativeElement.showModal();
      }
      // console.log(
      //   'selected shift in editor: ' +
      //     JSON.stringify(this.shiftSelect().selectedValue())
      // );
    });
  }

  saveDialog() {
    const currentShift = this.selectedShift();
    const startTimestamp = this.currentDate();
    console.log('save ' + JSON.stringify(currentShift));
    if (currentShift && startTimestamp) {
      const sharedFriends = this.friendsWithoutOwner();
      //convert sharedFriends to string with id of friends comma separated
      const sharedFriendsString = sharedFriends
        .map((friend) => friend.owner_id)
        .join(',');
      this.calendarService.saveShiftToCalendar(
        currentShift,
        startTimestamp,
        sharedFriendsString
      );
    }

    this.closeDialog();
  }
  closeDialog() {
    this.shiftSelect().selectedValue.set(null);
    this.myModal?.nativeElement.close();
    this.isVisible.set(false);
  }
}
