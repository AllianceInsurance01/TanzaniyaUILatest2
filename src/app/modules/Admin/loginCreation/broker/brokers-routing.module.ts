
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerListComponent } from './broker-list/broker-list.component';
import { NewProductDetailsComponent } from './new-product-details/new-product-details.component';
import { NewBrokerDetailsComponent } from './new-broker-details/new-broker-details.component';
import { BrokerdetailsConfigureComponent } from './brokerdetails-configure/brokerdetails-configure.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerListComponent,
  },
  {
    path: 'newBrokerDetails',
    loadChildren: () => import('./new-broker-details/new-broker-details.module')
    .then(m => m.NewBrokerDetailsModule),
    data: {
      preload: true,
      title: "Update Broker Details",
      breadcrumb:  "Update Broker Details",
    },
  },

  // {
  //   path: 'coverDetails',
  //   loadChildren: () => import('../cover-details/cover-details.module').then(m => m.CoverDetailsModule),
  //   data: {
  //     preload: true,
  //     title: "Existing Covers",
  //     breadcrumb:  "Existing Covers",
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrokersRoutingModule {}
