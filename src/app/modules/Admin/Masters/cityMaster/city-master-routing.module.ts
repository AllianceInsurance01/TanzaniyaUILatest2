
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { CityDetailsComponent } from './city-details/city-details.component';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
  },
  {
    path: 'newCityDetails',
    component: CityDetailsComponent,
    data: {
      preload: true,
      title: "Update City Details",
      breadcrumb:  "Update City Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityMasterRoutingModule {}
