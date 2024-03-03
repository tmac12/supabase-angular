import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { from } from 'rxjs';
import { CalendarEvent } from '../models/calendarEvent';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  supabase = inject(SupabaseService);
  constructor() {}

  getEventsObservable() {
    const promise = this.supabase.getEvents();
    const observable = from(promise);
    return observable;
  }

  addEvent(event: CalendarEvent) {
    return from(this.supabase.updateEvent(event));
  }
}
