import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftPreviewComponent } from './shift-preview.component';

describe('ShiftPreviewComponent', () => {
  let component: ShiftPreviewComponent;
  let fixture: ComponentFixture<ShiftPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
