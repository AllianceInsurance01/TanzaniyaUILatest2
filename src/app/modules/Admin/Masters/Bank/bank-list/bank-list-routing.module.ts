
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBankDetailsComponent } from '../new-bank-details/new-bank-details.component';
import { BankListComponent } from './bank-list.component';

const routes: Routes = [
  {
    path: '',
    component: BankListComponent,
  },
  {
    path: 'newBankDetails',
    component:NewBankDetailsComponent,
    data: {
      preload: true,
      title: "Bank Details",
      breadcrumb:  "Bank Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankListRoutingModule {}
