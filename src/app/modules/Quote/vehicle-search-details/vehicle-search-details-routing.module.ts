import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleSearchDetailsComponent } from './vehicle-search-details.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleSearchDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleSearchDetailsRoutingModule {}
