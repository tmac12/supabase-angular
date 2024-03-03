import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftEditorModalComponent } from './shift-editor-modal.component';

describe('ShiftEditorModalComponent', () => {
  let component: ShiftEditorModalComponent;
  let fixture: ComponentFixture<ShiftEditorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftEditorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
