import { Component, OnInit, inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.scss',
})
export class GoogleAuthComponent implements OnInit {
  private supabaseService = inject(SupabaseService);

  ngOnInit(): void {
    // this.supabaseService.signInGoogle().then((res) => {
    //   console.log(res);
    // });
  }

  async handleAuth() {
    const { data, error } = await this.supabaseService.signInGoogle();
    // const response = await this.auth.signInWithGithub();

    if (data) {
      console.log(data);
      const user = this.supabaseService.user.value;
      console.log(user);
      this.supabaseService.updateProfile({
        id: user?.id,
        avatar_url: user?.user_metadata['avatar_url'],
        username: user?.user_metadata['name'],
        website: '',
      });
    } else console.error(error);
  }
}
