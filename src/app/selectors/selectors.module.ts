import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorsRoutingModule } from './selectors-routing.module';
import { SelectorsPageComponent } from './pages/selectors-page/selectors-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectorsPageComponent
  ],
  imports: [
    CommonModule,
    SelectorsRoutingModule,
    ReactiveFormsModule
  ]
})
export class SelectorsModule { }
