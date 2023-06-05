
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateListComponent } from './state-list/state-list.component';
import { StateDetailsComponent } from './state-details/state-details.component';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent,
  },
  {
    path: 'newStateDetails',
    component: StateDetailsComponent,
    data: {
      preload: true,
      title: "Update State Details",
      breadcrumb:  "Update State Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateMasterRoutingModule {}
