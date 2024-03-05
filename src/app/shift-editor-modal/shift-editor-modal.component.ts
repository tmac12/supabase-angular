import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  model,
  signal,
} from '@angular/core';
import { ShiftSelectComponent } from '../shifts/shift-select/shift-select.component';
import { Shift } from '../models/shift';
import { ShiftPreviewComponent } from '../shifts/shift-preview/shift-preview.component';

@Component({
  selector: 'app-shift-editor-modal',
  standalone: true,
  imports: [ShiftSelectComponent, ShiftPreviewComponent],
  templateUrl: './shift-editor-modal.component.html',
  styleUrl: './shift-editor-modal.component.scss',
})
export class ShiftEditorModalComponent implements AfterViewInit {
  @ViewChild('modalDialog') myModal: ElementRef | undefined;
  @ViewChild('shiftSelect') shiftSelect: ShiftSelectComponent | undefined;
  isVisible = model(false);
  // selectedShift = signal<Shift | null | undefined>(null);
  selectedShift = computed(() => this.shiftSelect?.selectedValue());

  constructor() {
    effect(() => {
      console.log(`The current isVisible is: ${this.isVisible()}`);
      if (this.isVisible()) {
        this.myModal?.nativeElement.showModal();
      }

      console.log(
        'selected shift in editor: ' +
          JSON.stringify(this.shiftSelect?.selectedValue())
      );
    });
  }
  ngAfterViewInit(): void {
    //this.selectedShift.set(this.shiftSelect?.selectedValue());
  }
  closeDialog() {
    const selectedValue = this.shiftSelect?.selectedValue();
    // this.selectedShift.set(selectedValue);
    this.myModal?.nativeElement.close();
    this.isVisible.set(false);
  }
}
