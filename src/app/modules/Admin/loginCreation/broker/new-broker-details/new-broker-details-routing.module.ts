
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBrokerDetailsComponent } from './new-broker-details.component';
import { BrokerdetailsConfigureComponent } from '../brokerdetails-configure/brokerdetails-configure.component';
import { BrokerBranchListComponent } from '../broker-branch-list/broker-branch-list.component';
import { NewBrokerbranchDetailsComponent } from '../new-brokerbranch-details/new-brokerbranch-details.component';
import { BrokerProductListComponent } from '../broker-product-list/broker-product-list.component';
import { AddBrokerProductDetailsComponent } from '../add-broker-product-details/add-broker-product-details.component';
import { BrokerCoverListComponent } from '../broker-cover-list/broker-cover-list.component';
import { NewBrokercoverDetailsComponent } from '../new-brokercover-details/new-brokercover-details.component';
import { NewProductDetailsComponent } from '../new-product-details/new-product-details.component';
import { EndrosementBrokerComponent } from '../endrosementbroker/endrosementbroker.component';

const routes: Routes = [
  {
    path: '',
    component: NewBrokerDetailsComponent,
  },
  {
    path: 'brokerBranchList',
    component: BrokerBranchListComponent,
    data: {
      preload: true,
      title: "Existing Branch",
      breadcrumb:  "Existing Branch",
    },
  },
  {
    path: 'brokerProductList',
    component: BrokerProductListComponent,
    data: {
      preload: true,
      title: "Existing Products",
      breadcrumb:  "Existing Products",
    },
  },
  {
    path: 'brokerCoverList',
    component: BrokerCoverListComponent,
    data: {
      preload: true,
      title: "Existing Covers",
      breadcrumb:  "Existing Covers",
    },
  },
  {
    path: 'addBrokerProducts',
    component: AddBrokerProductDetailsComponent,
    data: {
      preload: true,
      title: "Include Products",
      breadcrumb:  "Include Products",
    },
  },
  {
    path: 'newBrokerCoverDetails',
    component: NewBrokercoverDetailsComponent,
    data: {
      preload: true,
      title: "Update Cover Details",
      breadcrumb:  "Update Cover Details",
    },
  },
  {
    path: 'newBrokerBranchDetails',
    component: NewBrokerbranchDetailsComponent,
    data: {
      preload: true,
      title: "Update Branch Details",
      breadcrumb:  "Update Branch Details",
    },
  },
  {
    path: 'brokerConfigure',
    component: BrokerdetailsConfigureComponent,
    data: {
      preload: true,
      title: "Broker Configuration",
      breadcrumb:  "Broker Configuration",
    },
  },
  {
    path: 'newProductDetails',
    component: NewProductDetailsComponent,
    data: {
      preload: true,
      title: "Update Product Details",
      breadcrumb:  "Update Product Details",
    },
  },
  {
    path: 'Endrosementbroker',
    component: EndrosementBrokerComponent,
    data: {
      preload: true,
      title: "Endrosement Broker",
      breadcrumb:  "Endrosement Broker",
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
export class NewBrokerDetailsRoutingModule {}
