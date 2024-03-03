import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShiftListComponent } from '../../shifts/shift-list/shift-list.component';
import { FullCalendarWrapperComponent } from '../../calendars/full-calendar-wrapper/full-calendar-wrapper.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, ShiftListComponent, FullCalendarWrapperComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {}
