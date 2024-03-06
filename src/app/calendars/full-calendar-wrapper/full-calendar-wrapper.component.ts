import { Component, inject, signal } from '@angular/core';
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
  ],
  templateUrl: './full-calendar-wrapper.component.html',
  styleUrl: './full-calendar-wrapper.component.scss',
})
export class FullCalendarWrapperComponent {
  calendarVisible = signal(true);
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
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);
  selectedDate = signal<Date>(new Date());

  handleDateClick(arg: DateClickArg) {
    this.modalMessage = `You clicked on date: ${arg.dateStr}`;
    this.selectedDate.set(arg.date);
    this.isModalVisible.set(true);
    return;

    alert('date click! ' + arg.dateStr);
    const fakeEvent: CalendarEvent = {
      created_at: new Date(),
      start_timestamp: arg.date,
      end_timestamp: new Date(new Date().getDate() + 1),
      shift_id: 6,
      title: 'test 1',
      id: undefined,
      shared_with: undefined,
      owner_id: undefined,
    };
    this.calendarService.addEvent(fakeEvent).subscribe((res) => {
      console.log('add event completed');
      console.log(res);
    });
  }

  /**
   *
   */
  calendarService = inject(CalendarService);
  events = signal<CalendarEvent[] | null>([]);
  constructor() {
    this.calendarService.getEventsObservable().subscribe((res) => {
      if (res.error) console.error(res.error);
      this.events.set(res.data);

      const calendarEvents = res.data?.map((item) => {
        const eventItem = {
          title: item.title,
          date: item.start_timestamp,
        };
        return eventItem;
      });

      this.calendarOptions.update((opt) => {
        opt.events = calendarEvents;
        // opt.events = [
        //   { title: 'event 1', date: '2024-03-01' },
        //   { title: 'event 2', date: '2024-03-02' },
        // ];
        return opt;
      });

      // let eventsApi: EventApi[] = [];
      // this.events()?.forEach((item) => {
      //   eventsApi.push({
      //     start: item.start_timestamp,
      //     end: item.end_timestamp,
      //     title: item.title,
      //   });
      // });
      // this.currentEvents.set(eventsApi);
    });
  }

  private eventGuid = 0;

  isModalVisible = signal(false);
  modalMessage: string = '';

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
