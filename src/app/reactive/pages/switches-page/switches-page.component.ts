import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder) {}

  public isInvalidField(field: string): boolean | null { 
    return this.myForm.controls[field].errors 
    && this.myForm.controls[field].touched
  }


  public onSubmit(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({ gender: 'M', wantNotifications: true, termsAndConditions: false});
  }
}
