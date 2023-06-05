
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingOccupationsComponent } from './existing-occupations.component';
import { NewOccupationDetailsComponent } from '../new-occupation-details/new-occupation-details.component';


const routes: Routes = [
  {
    path: '',
    component: ExistingOccupationsComponent,
  },
  {
    path: 'updateOccupationDetails',
    component: NewOccupationDetailsComponent,
    data: {
      preload: true,
      title: "Update Occupation Details",
      breadcrumb:  "Update Occupation Details",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingOccupationsRoutingModule {}
