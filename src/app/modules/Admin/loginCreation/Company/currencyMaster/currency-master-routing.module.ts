
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { CurrencyListComponent } from './currency-list/currency-list.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyListComponent,
  },
  {
    path: 'newCurrencyDetails',
    component: CurrencyDetailsComponent,
    data: {
      preload: true,
      title: "Update Currency Details",
      breadcrumb:  "Update Currency Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyMasterRoutingModule {}
