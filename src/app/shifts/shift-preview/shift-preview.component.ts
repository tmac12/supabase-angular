import { Component, input, signal } from '@angular/core';
import { Shift } from '../../models/shift';

@Component({
  selector: 'app-shift-preview',
  standalone: true,
  imports: [],
  templateUrl: './shift-preview.component.html',
  styleUrl: './shift-preview.component.scss',
})
export class ShiftPreviewComponent {
  shift = input.required<Shift | null | undefined>();
}
