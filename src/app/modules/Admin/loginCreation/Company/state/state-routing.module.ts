
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateListComponent } from './state-list/state-list.component';
import { AddStateDetailsComponent } from './add-state-details/add-state-details.component';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent,
  },
  {
    path: 'addStateDetails',
    component: AddStateDetailsComponent,
    data: {
      preload: true,
      title: "Add State Details",
      breadcrumb:  "Add State Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateRoutingModule {}
