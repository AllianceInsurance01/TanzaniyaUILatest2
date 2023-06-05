
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionListComponent } from './region-list/region-list.component';
import { AddRegionDetailsComponent } from './add-region-details/add-region-details.component';

const routes: Routes = [
  {
    path: '',
    component: RegionListComponent,
  },
  {
    path: 'newRegionDetails',
    component: AddRegionDetailsComponent,
    data: {
      preload: true,
      title: "Add Region Details",
      breadcrumb:  "Add Region Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegionRoutingModule {}
