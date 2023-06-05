
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewVehicleUsageDetailsComponent } from '../new-vehicle-usage-details/new-vehicle-usage-details.component';
import { VehicleUsageListComponent } from './vehicle-usage-list.component';


const routes: Routes = [
  {
    path: '',
    component: VehicleUsageListComponent,
  },
  {
    path: 'newVehicleUsageDetails',
    component:NewVehicleUsageDetailsComponent,
    data: {
      preload: true,
      title: "VehicleUsage Details",
      breadcrumb:  "VehicleUsage Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleUsageListRoutingModule {}
