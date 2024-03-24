import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  message = signal<string | null>(null);
  variant = signal<'info' | 'error' | 'warning' | null>(null);

  constructor() {}

  public info(message: string) {
    this.message.set(message);
    this.variant.set('info');
  }
}
