import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  
  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favGames: this.fb.array([
      ['Final Fantasy IX', Validators.required],
      ['Dota 2', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {}

  public get favGames(): FormArray {
    return this.dynamicForm.get('favGames') as FormArray
  }

  public isInvalidField(field: string): boolean | null { 
    return this.dynamicForm.controls[field].errors 
    && this.dynamicForm.controls[field].touched
  }

  public isInvalidFieldInArray(formArray: FormArray, i: number): boolean | null {
    return formArray.controls[i].errors
      && formArray.controls[i].touched
  }

  public getFieldError(field: string): string | null {
    if (!this.dynamicForm.controls[field]) return null;

    const errors = this.dynamicForm.controls[field].errors || {};

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

  public onDeleteFavourite(index: number): void {
    this.favGames.removeAt(index);
  }

  public onAddToFavorites(): void {
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favGames.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  public onSubmit(): void {
    if(this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    (this.dynamicForm.controls['favGames'] as FormArray) = this.fb.array([]);
    this.dynamicForm.reset({ });
  }
}
