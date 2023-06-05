
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWarrantyDerailsComponent } from '../add-warranty-derails/add-warranty-derails.component';
import { NewWarrantyDetailsComponent } from '../new-warranty-details/new-warranty-details.component';
import { WarrantyListComponent } from './warranty-list.component';



const routes: Routes = [
  {
    path: '',
    component: WarrantyListComponent,
  },
  {
    path: 'newWarrantyDetails',
    component:NewWarrantyDetailsComponent,
    data: {
      preload: true,
      title: "Warranty Details",
      breadcrumb:  "Warranty Details",
    }
  },
  {
    path: 'addWarrantyDetails',
    component:AddWarrantyDerailsComponent,
    data: {
      preload: true,
      title: "Add Warranty Details",
      breadcrumb:  "Add Warranty Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarrantyListRoutingModule {}
