
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExclusionDerailsComponent } from '../add-exclusion-derails/add-exclusion-derails.component';
import { NewExclusionDetailsComponent } from '../new-exclusion-details/new-exclusion-details.component';
import { ExclusionListComponent } from './exclusion-list.component';


const routes: Routes = [
  {
    path: '',
    component: ExclusionListComponent,
  },
  {
    path: 'newExclusionDetails',
    component:NewExclusionDetailsComponent,
    data: {
      preload: true,
      title: "Exclusion Details",
      breadcrumb:  "Exclusion Details",
    }
  },
  {
    path: 'AddExclusionDetails',
    component:AddExclusionDerailsComponent,
    data: {
      preload: true,
      title: "Exclusion Details",
      breadcrumb:  "Exclusion Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExclusionListRoutingModule {}
