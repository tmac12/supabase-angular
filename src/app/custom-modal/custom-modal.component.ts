import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
})
export class CustomModalComponent {
  isVisible = model(false);
  message = input('');

  closeModal() {
    this.isVisible.set(false);
  }
}
