import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
// { VieQuoteDetailsComponent } from './viewquote-details.component';
//import { MailComponent } from './mail.component';
//import { FollowupComponent } from './followup.component';
//import { MotorDocumentModule } from './MotorDocuments.module';
import { QuotesearchComponent } from './Quotesearch.component';


const routes: Routes = [
  {
    path: '',
    component:QuotesearchComponent,
  },

/*{
    path: 'MotorCustomer',
    component: MotorCustomerInfoComponent,
    data: {
      preload: true,
      title: 'MotorCustomerInfo',
      breadcrumb:  'Motor Customer Info',
    }
  },*/
  /*{
    path: 'customerSelection',
    loadChildren: () => import('../customer-selection/customer-selection.module').then(m => m.CustomerSelectionModule),
    data: {
      preload: true,
      title: "Customer Selection",
      breadcrumb: 'Customer Selection',
    }
  },*/
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
export class QuotesearchRoutingModule {}
