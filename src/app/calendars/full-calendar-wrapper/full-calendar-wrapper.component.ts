import { Component, computed, effect, inject, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../services/calendar.service';
import { CustomModalComponent } from '../../custom-modal/custom-modal.component';
import { ShiftEditorModalComponent } from '../../shift-editor-modal/shift-editor-modal.component';
import { ShiftService } from '../../shifts/shift.service';
import { JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import timeGridPlugin from '@fullcalendar/timegrid';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-full-calendar-wrapper',
  standalone: true,
  imports: [
    FullCalendarModule,
    CustomModalComponent,
    ShiftEditorModalComponent,
    JsonPipe,
  ],
  templateUrl: './full-calendar-wrapper.component.html',
  styleUrl: './full-calendar-wrapper.component.scss',
})
export class FullCalendarWrapperComponent {
  calendarVisible = signal(true);

  currentEvents = signal<EventApi[]>([]);
  selectedDate = signal<Date>(new Date());
  shiftService = inject(ShiftService);
  calendarService = inject(CalendarService);
  // shifts = this.shiftService.getShiftsSignal();
  shifts = this.shiftService.shiftList;
  eventsAdded = this.calendarService.eventsAdded;

  eventsSubject = new BehaviorSubject(
    this.calendarService.getEventsObservable()
  );

  shiftSignal = toSignal(this.shiftService.getShiftsObservable());
  // eventsSignal = toSignal(this.calendarService.getEventsObservable());
  eventsSignal = toSignal(
    this.eventsSubject.pipe(
      switchMap(() => this.calendarService.getEventsObservable())
    )
  );
  eventsComputed = computed(() => {
    const res = this.eventsSignal();
    if (res) {
      if (res.error) console.error(res.error);
      return res.data;
    }
    return res;
  });
  calendarEventsComputed = computed(() => {
    const events = this.eventsComputed();
    if (events) {
      const calendarEvents = events.map((item) => {
        const backgroundColor = this.getShiftColor(item.shift_id);
        const eventItem = {
          title: item.title,
          date: item.start_timestamp,
          backgroundColor: backgroundColor,
          allDay: true,
          display: 'background',
        };
        return eventItem;
      });

      return calendarEvents;
    }
    return [];
  });

  calendarOptionsComputed = computed(() => {
    const calendarEvents = this.calendarEventsComputed();
    const opt: CalendarOptions = {
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'dayGridMonth',
      // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      dateClick: (arg) => this.handleDateClick(arg),
    };
    if (calendarEvents) opt.events = calendarEvents;
    return opt;
  });

  // calendarOptions = signal<CalendarOptions>({
  //   plugins: [
  //     interactionPlugin,
  //     dayGridPlugin,
  //     // timeGridPlugin,
  //     // listPlugin,
  //   ],
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  //   },
  //   initialView: 'dayGridMonth',
  //   // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   dateClick: (arg) => this.handleDateClick(arg),
  //   // eventSources: [this.FAKEcalendarEventsComputed()],
  //   // select: this.handleDateSelect.bind(this),
  //   // eventClick: this.handleEventClick.bind(this),
  //   // eventsSet: this.handleEvents.bind(this)
  //   /* you can update a remote database when these fire:
  //   eventAdd:
  //   eventChange:
  //   eventRemove:
  //   */
  // });

  constructor() {
    effect(() => {
      const newEvent = this.eventsAdded();
      if (newEvent) {
        console.log('new event added');
        console.log(newEvent);
        //reload events. Thanks to; https://stackoverflow.com/questions/77606078/how-to-update-an-observable-when-it-has-been-converted-to-signal-if-new-data-has
        this.eventsSubject.next(this.calendarService.getEventsObservable());
      }
      console.log(
        'FullCalendarWrapperComponent isVisible: ' + this.calendarVisible()
      );
    });

    this.calendarService.subascribeEventChanges();
  }

  handleDateClick(arg: DateClickArg) {
    this.modalMessage = `You clicked on date: ${arg.dateStr}`;
    this.selectedDate.set(arg.date);
    this.isModalVisible.set(true);
  }

  isModalVisible = signal(false);
  modalMessage: string = '';

  getShiftColor(shift_id: number | undefined) {
    const shifts = this.shifts();
    const currentShift = shifts.find((s) => s.id == shift_id);
    return currentShift?.color ?? 'blue';
  }

  //Thanks to: https://github.com/fullcalendar/fullcalendar-examples/blob/main/angular17/src/app/app.component.ts#L42
  // handleDateSelect(selectInfo: DateSelectArg) {
  //   const title = prompt('Please enter a new title for your event');
  //   const calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: this.createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }
  // }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    // this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
