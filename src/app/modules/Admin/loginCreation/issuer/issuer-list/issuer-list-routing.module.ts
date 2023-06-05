
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuerListComponent } from './issuer-list.component';
import { IssuerDetailsComponent } from '../issuer-details/issuer-details.component';
import { MenuConfigurationComponent } from '../menu-configuration/menu-configuration.component';
import { SumInsuredConfigurationComponent } from '../sum-insured-configuration/sum-insured-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: IssuerListComponent,
  },
  {
    path: 'newIssuerDetails',
    component: IssuerDetailsComponent,
    data: {
      preload: true,
      title: "Update Insurance Employee Details",
      breadcrumb:  "Update Insurance Employee Details",
    },
  },
  {
    path: 'productReferralConfguration',
    component: SumInsuredConfigurationComponent,
    data: {
      preload: true,
      title: "Product Referral Configuration",
      breadcrumb:  "Product Referral Configuration",
    },
  },
  {
    path: 'issuerMenuCongifuration',
    component: MenuConfigurationComponent,
    data: {
      preload: true,
      title: "Insurance Employee Configuration",
      breadcrumb:  "Insurance Employee Configuration",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuerListRoutingModule {}
