import { Component, inject, signal } from '@angular/core';
import { ShiftService } from '../shift.service';
import { Shift } from '../../models/shift';

@Component({
  selector: 'app-shift-list',
  standalone: true,
  imports: [],
  templateUrl: './shift-list.component.html',
  styleUrl: './shift-list.component.scss',
})
export class ShiftListComponent {
  shiftService = inject(ShiftService);
  shifts = signal<Shift[] | null>([]);
  /**
   *
   */
  constructor() {
    this.shiftService.getShiftsObservable().subscribe((res) => {
      if (res.error) console.error(res.error);
      this.shifts.set(res.data);
    });
  }
}
