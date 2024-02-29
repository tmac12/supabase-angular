import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-google-calendar',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './google-calendar.component.html',
  styleUrl: './google-calendar.component.scss',
})
export class GoogleCalendarComponent {
  private supabaseService = inject(SupabaseService);
  private httpClient = inject(HttpClient);
  calendarResponse = signal<any>(null);

  async getCalendars() {
    const idToken = this.supabaseService.session?.provider_refresh_token;
    if (idToken) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      const data = { code: idToken };
      this.httpClient
        .post('api/getCalendarByRefreshToken', data, httpOptions)
        .subscribe((res) => {
          console.log(res);
          this.calendarResponse.set(res);
        });
    } else {
      console.error('user undefined');
    }
  }
}
