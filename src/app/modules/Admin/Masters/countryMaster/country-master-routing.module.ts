
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { NewCountryDetailsComponent } from './new-country-details/new-country-details.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
  },
  {
    path: 'newCountryDetails',
    component: NewCountryDetailsComponent,
    data: {
      preload: true,
      title: "Update Country Details",
      breadcrumb:  "Update Country Details",
    },
  },
  {
    path: 'stateList',
    loadChildren: () => import('../stateMaster/state-master.module').then(m => m.StateMasterModule),
    data: {
      preload: true,
      title: "Existing States",
      breadcrumb:  "Existing States",
    },
  },
  {
    path: 'cityList',
    loadChildren: () => import('../cityMaster/city-master.module').then(m => m.CityMasterModule),
    data: {
      preload: true,
      title: "Existing Cities",
      breadcrumb:  "Existing Cities",
    },
  },
  {
    path: 'regionList',
    loadChildren: () => import('../region/region.module').then(m => m.RegionModule),
    data: {
      preload: true,
      title: "Existing Region",
      breadcrumb:  "Existing Region",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryMasterRoutingModule {}
