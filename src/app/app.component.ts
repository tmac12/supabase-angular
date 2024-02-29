import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';
import { SupabaseService } from './supabase.service';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GoogleAuthComponent,
    GoogleCalendarComponent,
    AccountComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'supabase-angular';
  private readonly supabase = inject(SupabaseService);
  session = this.supabase.session;

  ngOnInit(): void {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
}
