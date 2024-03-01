import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';

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

  selectedColor = signal<string | undefined>('red');

  constructor() {}
  ngAfterViewInit(): void {
    this.colorPickerInput?.nativeElement.addEventListener('change', () => {
      const chosenColor = this.colorPickerInput?.nativeElement.value;
      this.selectedColor.set(chosenColor);
      // if (this.colorDisplay)
      //   this.colorDisplay.nativeElement.style.backgroundColor = chosenColor;
    });

    this.colorPreviewBtn?.nativeElement.addEventListener('click', () => {
      // Implement your preview logic here
    });
  }
}
