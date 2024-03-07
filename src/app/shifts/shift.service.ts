import { Injectable, inject, signal } from '@angular/core';
import { Shift } from '../models/shift';
import { SupabaseService } from '../supabase.service';
import { from } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  supabase = inject(SupabaseService);
  shiftList = signal<Shift[]>([]);

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

  getShiftsObservable() {
    const promise = this.supabase.getShifts();
    const observable = from(promise);
    return observable;
  }

  getShiftsSignal() {
    return toSignal(this.getShiftsObservable());
  }

  async getShiftsPromise() {
    const { data, error } = await this.supabase.getShifts();
    if (error) console.error(error);
    return data;
  }
}
