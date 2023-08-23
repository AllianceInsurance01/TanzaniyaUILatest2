import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTaxListComponent } from './companytax.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyTaxListComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyTaxModule{}
