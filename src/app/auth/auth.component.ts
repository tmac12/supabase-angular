import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const { error } = await this.supabase.signIn(email);
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
