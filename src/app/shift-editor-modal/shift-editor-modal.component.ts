import { Component, ElementRef, ViewChild, effect, input } from '@angular/core';

@Component({
  selector: 'app-shift-editor-modal',
  standalone: true,
  imports: [],
  templateUrl: './shift-editor-modal.component.html',
  styleUrl: './shift-editor-modal.component.scss',
})
export class ShiftEditorModalComponent {
  @ViewChild('modalDialog') myModal: ElementRef | undefined;
  isVisible = input(false);

  constructor() {
    effect(() => {
      console.log(`The current isVisible is: ${this.isVisible()}`);
      if (this.isVisible()) {
        this.myModal?.nativeElement.showModal();
      }
    });
  }
}
