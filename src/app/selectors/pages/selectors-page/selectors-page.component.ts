import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './selectors-page.component.html',
  styles: ``
})
export class SelectorsPageComponent {
  
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}
}
