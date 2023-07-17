import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductGroupListComponent } from './productgrouplist.component';
import { ProductGroupDetails } from '../productgroupdetails/productgroupdetails.component';


const routes: Routes = [
  {
    path: '',
    component:ProductGroupListComponent,
  },
  {
    path: 'ProductGroupDetails',
    component:ProductGroupDetails,
    data: {
      preload: true,
      title: "Product Group Details",
      breadcrumb:  "Product Group Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductGroupRoutingModule {}