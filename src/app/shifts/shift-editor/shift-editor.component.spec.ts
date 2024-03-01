import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftEditorComponent } from './shift-editor.component';

describe('ShiftEditorComponent', () => {
  let component: ShiftEditorComponent;
  let fixture: ComponentFixture<ShiftEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
