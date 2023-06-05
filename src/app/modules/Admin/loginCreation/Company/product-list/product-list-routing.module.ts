
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { AddProductDetailsComponent } from '../add-product-details/add-product-details.component';
import { BranchDetailsComponent } from '../branch-details/branch-details.component';
//import { MakeMasterModule } from '../makeMaster/make-master-module';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'newProductDetails',
    component: AddProductDetailsComponent,
  },

  {
    path: 'branchDetails',
    component: BranchDetailsComponent,
    data: {
      preload: true,
      title: 'Existing Branch',
      breadcrumb:  'Existing Branch',
    }
  },
  {
    path: 'currencyList',
    loadChildren: () => import('../currencyMaster/currency-master.module').then(m => m.CurrencyMasterModule),
    data: {
      preload: true,
      title: "Existing Currencies",
      breadcrumb:  "Existing Currencies",
    },
  },
  {
    path: 'regionList',
    loadChildren: () => import('../region/region.module').then(m => m.RegionModule),
    data: {
      preload: true,
      title: 'Existing Region',
      breadcrumb:  'Existing Region',
    }
  },
  {
    path: 'stateList',
    loadChildren: () => import('../state/state.module').then(m => m.StateModule),
    data: {
      preload: true,
      title: 'Existing State',
      breadcrumb:  'Existing State',
    }
  },
  {
    path: 'cityList',
    loadChildren: () => import('../city/city.module').then(m => m.CityModule),
    data: {
      preload: true,
      title: 'Existing City',
      breadcrumb:  'Existing City',
    }
  },
  {
    path: 'colorList',
    loadChildren: () => import('../colorMaster/color-master-module').then(m => m.ColorMasterModule),
    data: {
      preload: true,
      title: 'Existing Color',
      breadcrumb:  'Existing Color',
    }
  },
  {
    path: 'MakeList',
    loadChildren: () => import('../makeMaster/make-master-module').then(m => m.MakeMasterModule),
    data: {
      preload: true,
      title: 'Existing Make',
      breadcrumb:  'Existing Make',
    }
  },
  {
    path: 'ModelList',
    loadChildren: () => import('../modelMaster/model-master-module').then(m => m.ModelMasterModule),
    data: {
      preload: true,
      title: 'Existing Model',
      breadcrumb:  'Existing Model',
    }
  },
  {
    path: 'productDetails',
    loadChildren: () => import('../product-details/product-details.module').then(m => m.ProductDetailsModule),
    data: {
      preload: true,
      title: sessionStorage.getItem('productName'),
      breadcrumb:  sessionStorage.getItem('productName'),
    }
  },
  {
    path: 'policyTypeDetails',
    loadChildren: () => import('../PolicyType/policy-type-list/policy-type-list.module').then(m => m.PolicyTypeModule),
    data: {
      preload: true,
      title: 'PolicyTypeDetails',
      breadcrumb:  'Policy Type Details',
    }
  },
  {
    path: 'mailList',
    loadChildren: () => import('../Mail/mail.module').then(m => m.MailModule),
    data: {
      preload: true,
      title: 'Existing Mail',
      breadcrumb:  'Existing Mail',
    }
  },
  {
    path: 'SmsList',
    loadChildren: () => import('../SMS/sms.module').then(m => m.SmsModule),
    data: {
      preload: true,
      title: 'Existing SMS',
      breadcrumb:  'Existing SMS',
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListRoutingModule {}
