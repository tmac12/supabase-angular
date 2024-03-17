import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { from, take } from 'rxjs';
import { CalendarEvent } from '../models/calendarEvent';
import { Shift } from '../models/shift';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  supabase = inject(SupabaseService);
  eventsAdded = signal<CalendarEvent[] | null>(null);
  constructor() {}

  getEventsObservable() {
    const promise = this.supabase.getEvents();
    const observable = from(promise);
    return observable;
  }

  addEvent(event: CalendarEvent) {
    return from(this.supabase.updateEvent(event));
  }

  subascribeEventChannges() {
    this.supabase.subscribeToEventChanges();

    // this.supabase.onEventChanges().subscribe((event) => {
    //   console.log('event changes');
    //   console.log(event);
    //   this.eventsAdded.set(event);
    // });
  }

  saveShiftToCalendar(shift: Shift, startDate: Date) {
    const fakeEvent: CalendarEvent = {
      created_at: new Date(),
      start_timestamp: startDate,
      end_timestamp: new Date(new Date().getDate() + 1),
      shift_id: shift.id,
      title: shift.name,
      id: undefined,
      shared_with: undefined,
      owner_id: undefined,
    };

    //TODO: pipe take1
    this.addEvent(fakeEvent).subscribe((res) => {
      console.log('add event completed');
      console.log(res);
      this.eventsAdded.set([fakeEvent]);
    });
  }
}
