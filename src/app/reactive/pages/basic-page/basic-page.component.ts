import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {
  
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private fb: FormBuilder) {}
  
  public isInvalidField(field: string): boolean | null { 
    return this.myForm.controls[field].errors 
    && !this.myForm.controls[field].pristine
  }

  public getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required'

        case 'minlength':
          return `The minimum length is ${errors[key].requiredLength} characters `
      }
    }

    return null;
  }

  public onSave(): void {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({ price: 0, inStorage: 0 });
  }
}
