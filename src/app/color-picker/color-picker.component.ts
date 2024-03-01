import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ShiftService } from '../shifts/shift.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent implements AfterViewInit {
  @ViewChild('colorPickerInput') colorPickerInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  @ViewChild('colorDisplay') colorDisplay: ElementRef | undefined;
  @ViewChild('colorPreviewBtn') colorPreviewBtn: ElementRef | undefined;
  private readonly shiftService = inject(ShiftService);

  selectedColor = signal<string | undefined>('red');

  constructor() {}
  ngAfterViewInit(): void {
    this.colorPickerInput?.nativeElement.addEventListener('change', () => {
      const chosenColor = this.colorPickerInput?.nativeElement.value;
      this.selectedColor.set(chosenColor);
      this.shiftService.updateColor(chosenColor ?? '');
      // if (this.colorDisplay)
      //   this.colorDisplay.nativeElement.style.backgroundColor = chosenColor;
    });

    this.colorPreviewBtn?.nativeElement.addEventListener('click', () => {
      // Implement your preview logic here
    });
  }
}
