import { Injectable, signal } from '@angular/core';
import { Shift } from '../models/shift';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  currentShift = signal<Shift>({
    name: '',
    color: '',
    created_at: '',
    start_time: '',
    end_time: '',
    id: undefined,
    owner_id: undefined,
  });
  constructor() {}

  saveShift(shift: Shift) {}

  updateColor(color: string) {
    this.currentShift.update((shift) => {
      shift.color = color;
      return shift;
    });
  }
}
