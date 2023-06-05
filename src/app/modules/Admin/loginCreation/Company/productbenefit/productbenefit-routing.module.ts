import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBenefitGridComponent } from './productbenefitgrid/productbenefitgrid.component';
import { ProductBenefitComponent } from './productbenefitdetails/productbenefitdetails.component';

//import { StateListComponent } from './state-list/state-list.component';
//import { AddStateDetailsComponent } from './add-state-details/add-state-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductBenefitGridComponent,
  },
  {
    path: 'productbenefitnew',
    component:ProductBenefitComponent,
    data: {
      preload: true,
      title: "Product Benefit Details",
      breadcrumb:  "Product Benefit Details",
    }
  },
  /*{
    path: 'addStateDetails',
    component: AddStateDetailsComponent,
    data: {
      preload: true,
      title: "Add State Details",
      breadcrumb:  "Add State Details",
    },
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductBenefitRoutingModule {}
