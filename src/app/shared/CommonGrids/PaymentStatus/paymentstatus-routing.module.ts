
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentFailedComponent } from './paymentfailed/paymentfailed.component';
import { PaymentSuccessComponent } from './paymentSuccess/paymentsuccess.component';
import { PaymentPendingComponent } from './paymentpending/paymentpending.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentSuccessComponent,
  },
  {
    path: 'paymentfailed',
    component:PaymentFailedComponent,
    data: {
      preload: true,
      title: "Payment Failed",
      breadcrumb:  "Payment Failed",
    }
  },
  {
    path: 'paymentpending',
    component:PaymentPendingComponent,
    data: {
      preload: true,
      title: "Payment Pending",
      breadcrumb:  "Payment Pending",
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
