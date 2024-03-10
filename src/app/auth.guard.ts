import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { AuthService } from './services/auth.service';

//TODO: needs refactor. See this: https://gist.github.com/kylerummens/c2ec82e65d137f3220748ff0dee76c3f

export const authGuard: CanActivateFn = (route, state) => {
  return true;
  // const supabaseService = inject(SupabaseService);
  // const authService = inject(AuthService);
  // // return supabaseService.session != null
  // return supabaseService.getUser().then((user) => {
  //   if (user.data.user) return true;
  //   return false;
  // });
  // // return authService.isAuthenticated()
  // //   ? true
  // //   : inject(Router).createUrlTree(['/login']);
};
