import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeRiskDetailsComponent } from './life-risk-details.component';



const routes: Routes = [
  {
    path: '',
    component: LifeRiskDetailsComponent,
  }
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
export class LifeRiskDetailsRoutingModule {}
