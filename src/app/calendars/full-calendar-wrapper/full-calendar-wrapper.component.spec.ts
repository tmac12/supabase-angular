import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCalendarWrapperComponent } from './full-calendar-wrapper.component';

describe('FullCalendarWrapperComponent', () => {
  let component: FullCalendarWrapperComponent;
  let fixture: ComponentFixture<FullCalendarWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCalendarWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullCalendarWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
