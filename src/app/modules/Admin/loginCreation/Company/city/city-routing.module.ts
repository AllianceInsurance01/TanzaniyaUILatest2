
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { AddCityDetailsComponent } from './add-city-details/add-city-details.component';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
  },
  {
    path: 'newCityDetails',
    component: AddCityDetailsComponent,
    data: {
      preload: true,
      title: "Add City Details",
      breadcrumb:  "Add City Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityRoutingModule {}
