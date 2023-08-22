import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaxDetailsComponent } from '../tax-details/tax-details.component';
import { TaxListComponent } from './tax-list.component';

const routes: Routes = [
  {
    path: '',
    component: TaxListComponent,
  },
  {
    path: 'newtaxlist',
    component: NewTaxDetailsComponent,
    data: {
      preload: true,
      title: "Update Dropdown Details",
      breadcrumb:  "Update Dropdown Details",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTaxRoutingModule {}
