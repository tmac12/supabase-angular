import { Component, computed, inject, signal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShiftListComponent } from '../../shifts/shift-list/shift-list.component';
import { FullCalendarWrapperComponent } from '../../calendars/full-calendar-wrapper/full-calendar-wrapper.component';
import { ShiftService } from '../../shifts/shift.service';
import { Shift } from '../../models/shift';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    WelcomeComponent,
    ShiftListComponent,
    FullCalendarWrapperComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  shiftService = inject(ShiftService);
  shifts = signal<Shift[] | null>([]);
  showWelcome = computed(() => {
    const shifts = this.shifts();
    if (shifts) {
      return shifts.length > 0 ? false : true;
    }
    return true;
  });

  constructor() {
    this.shiftService.getShiftsObservable().subscribe((res) => {
      if (res.error) console.error(res.error);
      this.shifts.set(res.data);
      if (res.data) this.shiftService.shiftList.set(res.data);
    });
  }
}
