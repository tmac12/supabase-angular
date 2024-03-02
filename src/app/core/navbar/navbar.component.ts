import { Component } from '@angular/core';
import AccountComponent from '../../account/account.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AccountComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
