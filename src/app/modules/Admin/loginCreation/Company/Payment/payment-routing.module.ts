
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentListComponent } from './payment-list/payment-list.component';





const routes: Routes = [
  {
    path: '',
    component: PaymentListComponent,
  },
  {
    path: 'paymentDetails',
    component:PaymentDetailsComponent,
    data: {
      preload: true,
      title: "Payment Details",
      breadcrumb:  "Payment Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
