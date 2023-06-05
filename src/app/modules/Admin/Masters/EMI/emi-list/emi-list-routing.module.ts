
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEmidetailsComponent } from '../new-emidetails/new-emidetails.component';
import { EmiListComponent } from './emi-list.component';


const routes: Routes = [
  {
    path: '',
    component: EmiListComponent,
  },
  {
    path: 'newEmiDetails',
    component:NewEmidetailsComponent,
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
export class EmiListRoutingModule {}
