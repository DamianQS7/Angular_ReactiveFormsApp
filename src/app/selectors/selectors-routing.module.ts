import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorsPageComponent } from './pages/selectors-page/selectors-page.component';

const routes: Routes = [
  { path: '', component: SelectorsPageComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectorsRoutingModule { }
