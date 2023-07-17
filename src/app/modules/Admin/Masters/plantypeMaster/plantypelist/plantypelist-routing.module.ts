import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanTypeDetails } from '../plantypedetails/plantypedetails.component';
import { PlanTypeListComponent } from './plantypelist.component';



const routes: Routes = [
  {
    path: '',
    component: PlanTypeListComponent,
  },
  {
    path: 'plantypeDetails',
    component:PlanTypeDetails,
    data: {
      preload: true,
      title: "Emi Details",
      breadcrumb:  "Emi Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanTypeRoutingModule {}