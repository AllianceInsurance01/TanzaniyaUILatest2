
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyDetailsComponent } from '../new-company-details/new-company-details.component';
import { CompanyListComponent } from './company-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
  },
  {
    path: 'newCompanyDetails',
    component: NewCompanyDetailsComponent,
    data: {
      title: 'Update Company Details',
      breadcrumb:   'Update Company Details',
    }
  },
  {
    path: 'companyConfigure',
    loadChildren: () => import('../product-list/product-list.module').then(m => m.ProductListModule),
    data: {
      preload: true,
      title: sessionStorage.getItem('insuranceConfigureName'),
      breadcrumb:  sessionStorage.getItem('insuranceConfigureName'),
    }
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
export class CompanyListRoutingModule {}
