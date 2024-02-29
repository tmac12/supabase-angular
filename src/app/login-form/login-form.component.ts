import { Component } from '@angular/core';
import { GoogleAuthComponent } from '../google-auth/google-auth.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [GoogleAuthComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {}
