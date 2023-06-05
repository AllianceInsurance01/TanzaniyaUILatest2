import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndorsementTypeDetailsComponent } from '../endorsement-type-details/endorsement-type-details.component';
import { ExistingEndorsementsComponent } from './existing-endorsements.component';

const routes: Routes = [
  {
    path: '',
    component: ExistingEndorsementsComponent,
  },
  {
    path: 'endorsementTypes',
    component: EndorsementTypeDetailsComponent,
    data: {
      preload: true,
      title: "Endorsement-Type",
      breadcrumb: 'Endorsement-Type',
    }
  },
  // {
  //   path: 'customerDetails',
  //   loadChildren: () => import('../update-customer-details/update-customer-details.module').then(m => m.UpdateCustomerDetailsModule),
  //   data: {
  //     preload: true,
  //     title: "Update Customer Details",
  //     breadcrumb: 'Update Customer Details',
  //   }
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingEndorsementsRoutingModule {}
