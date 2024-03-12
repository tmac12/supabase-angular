import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ColorPickerComponent } from '../../color-picker/color-picker.component';
import { SupabaseService } from '../../supabase.service';
import { Shift } from '../../models/shift';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShiftService } from '../shift.service';
import { AccountService } from '../../account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shift-editor',
  standalone: true,
  imports: [ReactiveFormsModule, ColorPickerComponent],
  templateUrl: './shift-editor.component.html',
  styleUrl: './shift-editor.component.scss',
})
export default class ShiftEditorComponent implements AfterViewInit {
  @ViewChild('name') nameInput: ElementRef<HTMLInputElement> | undefined;

  supabase = inject(SupabaseService);
  shiftService = inject(ShiftService);
  accountService = inject(AccountService);
  currentShift = this.shiftService.currentShift();
  router = inject(Router);

  shiftForm: FormGroup;
  //shiftName = signal('');
  // nameSignal = signal<any | undefined>(undefined);
  nameControl = new FormControl('', Validators.required);
  startTimeControl = new FormControl('00:00:00', Validators.required);
  endTimeControl = new FormControl('00:00:00', Validators.required);
  shiftName = toSignal(this.nameControl.valueChanges, { initialValue: '' });
  startTime = toSignal(this.startTimeControl.valueChanges, {
    initialValue: '00:00:00',
  });
  endTime = toSignal(this.endTimeControl.valueChanges, {
    initialValue: '00:00:00',
  });

  constructor(private fb: FormBuilder) {
    this.shiftForm = this.fb.group({
      name: [''],
    });
    // const formName = this.shiftForm.get('name');
    // if (formName) {
    //   const newName = toSignal(formName.valueChanges, {
    //     initialValue: '',
    //   });
    //   this.nameSignal.set(newName);
    // }
  }
  ngAfterViewInit(): void {
    // Represent the 'firstName' form control as a Signal
    // this.nameInput?.nativeElement.addEventListener('change', () => {
    //   this.shiftName.set(this.nameInput?.nativeElement.value ?? '');
    // });
  }

  saveShift() {
    const shiftName = this.shiftName();
    if (!shiftName) {
      console.log('no shift name');
      return;
    }
    const startTime = this.startTime();
    if (!startTime) {
      console.log('no start time');
      return;
    }
    const endTime = this.endTime();
    if (!endTime) {
      console.log('no end time');
      return;
    }

    const shift = this.shiftService.currentShift();
    const owner_id = this.accountService.userId();
    const shiftToSave = {
      ...shift,
      name: shiftName,
      created_at: new Date().toUTCString(),
      start_time: startTime,
      end_time: endTime,
      owner_id: owner_id,
    };
    //  : Shift = {
    //     name: this.shiftName(),
    //     created_at:  new Date().toUTCString(),
    //     start_time: 10,
    //     end_time: 11,
    //     color
    //   }

    const res = this.supabase.updateShift(shiftToSave);
    res.then((res) => {
      console.log('shift updated');
      console.log(res);
      this.router.navigate(['home']);
    });
  }
}
