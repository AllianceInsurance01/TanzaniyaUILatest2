import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingCustomersComponent } from './existing-customers.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { NewCustomerDetailsComponent } from '../new-customer-details/new-customer-details.component';

const routes: Routes = [
  {
    path: '',
    component: ExistingCustomersComponent,
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
  {
    path: 'ClientDetails',
    component: NewCustomerDetailsComponent,
    data: {
      preload: true,
      title: "",
      breadcrumb: 'Customers',
    }
  },
  {
    path: 'Client',
    component: ProductFormComponent,
    data: {
      preload: true,
      title: "",
      breadcrumb: 'Customers',
    }
  },
  // {
  //   path: 'Client',
  //   loadChildren: () => import('../client/client.module').then(m => m.ClientModule),
  //   data: {
  //     preload: true,
  //     title: "",
  //     breadcrumb: 'Customers',
  //   }
  // },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingCustomersRoutingModule {}
