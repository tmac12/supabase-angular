import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { ShiftSelectComponent } from '../shifts/shift-select/shift-select.component';
import { Shift } from '../models/shift';
import { ShiftPreviewComponent } from '../shifts/shift-preview/shift-preview.component';
import { CalendarService } from '../services/calendar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shift-editor-modal',
  standalone: true,
  imports: [ShiftSelectComponent, ShiftPreviewComponent, DatePipe],
  templateUrl: './shift-editor-modal.component.html',
  styleUrl: './shift-editor-modal.component.scss',
})
export class ShiftEditorModalComponent implements AfterViewInit {
  @ViewChild('modalDialog') myModal: ElementRef | undefined;
  // @ViewChild('shiftSelect') shiftSelect: ShiftSelectComponent | undefined;
  shiftSelect = viewChild.required<ShiftSelectComponent>('shiftSelect');

  currentDate = model<Date>();
  isVisible = model(false);
  // selectedShift = signal<Shift | null | undefined>(null);
  selectedShift = computed(() => this.shiftSelect().selectedValue());
  calendarService = inject(CalendarService);

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
  ngAfterViewInit(): void {
    //this.selectedShift.set(this.shiftSelect?.selectedValue());
  }

  saveDialog() {
    const currentShift = this.selectedShift();
    const startTimestamp = this.currentDate();
    console.log('save ' + JSON.stringify(currentShift));
    if (currentShift && startTimestamp)
      this.calendarService.saveShiftToCalendar(currentShift, startTimestamp);

    this.myModal?.nativeElement.close();
    this.isVisible.set(false);
  }
  closeDialog() {
    // const selectedValue = this.shiftSelect().selectedValue();
    // this.selectedShift.set(selectedValue);

    this.shiftSelect().selectedValue.set(null);
    this.myModal?.nativeElement.close();
    this.isVisible.set(false);
  }
}
