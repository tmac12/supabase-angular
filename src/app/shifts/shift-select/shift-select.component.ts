import { Component, effect, inject, model, signal } from '@angular/core';
import { ShiftService } from '../shift.service';
import { Shift } from '../../models/shift';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shift-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shift-select.component.html',
  styleUrl: './shift-select.component.scss',
})
export class ShiftSelectComponent {
  shiftService = inject(ShiftService);
  shifts = signal<Shift[] | null>([]);
  // selectedValue: Shift | null = null;
  selectedValue = model<Shift | null>(null);

  constructor() {
    effect(() => {
      console.log('change shift: ' + this.selectedValue());
    });

    this.shiftService.getShiftsObservable().subscribe((res) => {
      if (res.error) console.error(res.error);
      this.shifts.set(res.data);
    });
  }

  onSelectionChange(event: any) {
    const selectedValue = event.target.value;
    this.selectedValue.set(selectedValue);
    // Use the selectedValue as needed
  }
}
