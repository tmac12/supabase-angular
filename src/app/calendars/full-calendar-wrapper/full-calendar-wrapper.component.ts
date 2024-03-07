import { Component, computed, effect, inject, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventSourceInput,
} from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../services/calendar.service';
import { CalendarEvent } from '../../models/calendarEvent';
import { options } from '@fullcalendar/core/preact';
import { CustomModalComponent } from '../../custom-modal/custom-modal.component';
import { ShiftEditorModalComponent } from '../../shift-editor-modal/shift-editor-modal.component';
import { ShiftService } from '../../shifts/shift.service';
import { JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import { INITIAL_EVENTS, createEventId } from './event-utils';

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

  shiftSignal = toSignal(this.shiftService.getShiftsObservable());
  eventsSignal = toSignal(this.calendarService.getEventsObservable());
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
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        // timeGridPlugin,
        // listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
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

  // calendarOptionsEffect = effect(() => {
  //   this.calendarOptions.update((opt) => {
  //     const calendarEvents = this.calendarEventsComputed();
  //     if (calendarEvents) opt.events = calendarEvents;
  //     return opt;
  //   });
  // });

  FAKEcalendarEventsComputed = signal<EventSourceInput>(() => {
    const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

    const result = [
      {
        id: 1,
        title: 'All-day event',
        start: TODAY_STR,
      },
      {
        id: 2,
        title: 'Timed event',
        start: TODAY_STR + 'T00:00:00',
        end: TODAY_STR + 'T03:00:00',
      },
      {
        id: 3,
        title: 'Timed event',
        start: TODAY_STR + 'T12:00:00',
        end: TODAY_STR + 'T15:00:00',
      },
    ];
    return result;
  });

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      // timeGridPlugin,
      // listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: (arg) => this.handleDateClick(arg),
    // eventSources: [this.FAKEcalendarEventsComputed()],
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });

  handleDateClick(arg: DateClickArg) {
    this.modalMessage = `You clicked on date: ${arg.dateStr}`;
    this.selectedDate.set(arg.date);
    this.isModalVisible.set(true);
  }

  events = signal<CalendarEvent[] | null>([]);
  // constructor() {
  //   this.calendarService.getEventsObservable().subscribe((res) => {
  //     if (res.error) console.error(res.error);
  //     this.events.set(res.data);

  //     const calendarEvents = res.data?.map((item) => {
  //       const backgroundColor = this.getShiftColor(item.shift_id);
  //       const eventItem = {
  //         title: item.title,
  //         date: item.start_timestamp,
  //         backgroundColor: backgroundColor,
  //         allDay: true,
  //         display: 'background',
  //       };
  //       return eventItem;
  //     });

  //     this.calendarOptions.update((opt) => {
  //       opt.events = calendarEvents;
  //       // opt.events = [
  //       //   { title: 'event 1', date: '2024-03-01' },
  //       //   { title: 'event 2', date: '2024-03-02' },
  //       // ];
  //       return opt;
  //     });

  //     // let eventsApi: EventApi[] = [];
  //     // this.events()?.forEach((item) => {
  //     //   eventsApi.push({
  //     //     start: item.start_timestamp,
  //     //     end: item.end_timestamp,
  //     //     title: item.title,
  //     //   });
  //     // });
  //     // this.currentEvents.set(eventsApi);
  //   });
  // }

  private eventGuid = 0;

  isModalVisible = signal(false);
  modalMessage: string = '';

  getShiftColor(shift_id: number | undefined) {
    const shifts = this.shifts();
    const currentShift = shifts.find((s) => s.id == shift_id);
    return currentShift?.color ?? 'blue';
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  //Thanks to: https://github.com/fullcalendar/fullcalendar-examples/blob/main/angular17/src/app/app.component.ts#L42
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    // this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
