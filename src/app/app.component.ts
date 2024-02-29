import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleAuthComponent, GoogleCalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'supabase-angular';
}
