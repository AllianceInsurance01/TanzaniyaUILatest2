import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedQuotesComponent } from './rejected-quotes.component';



const routes: Routes = [
  {
    path: '',
    component: RejectedQuotesComponent,
  },
  {
    path: 'customerSelection',
    loadChildren: () => import('../customer-selection/customer-selection.module').then(m => m.CustomerSelectionModule),
    data: {
      preload: true,
      title: "Customer Selection",
      breadcrumb: 'Customer Selection',
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
export class RejectedQuotesRoutingModule {}
