import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { GoogleCalendarComponent } from './google-calendar/google-calendar.component';
import { SupabaseService } from './supabase.service';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ShiftEditorComponent } from './shifts/shift-editor/shift-editor.component';
import { ShiftListComponent } from './shifts/shift-list/shift-list.component';
import AccountComponent from './account/account.component';
import LoginFormComponent from './login-form/login-form.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GoogleAuthComponent,
    GoogleCalendarComponent,
    AccountComponent,
    LoginFormComponent,
    ColorPickerComponent,
    ShiftEditorComponent,
    ShiftListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'supabase-angular';
  private readonly supabase = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  session = this.supabase.session;
  isAuthenticated = this.authService.isAuthenticated;

  ngOnInit(): void {
    this.supabase.authChanges((_, session) => {
      this.session = session;
      this.supabase.sessionSignal.set(session);
    });
  }
}
