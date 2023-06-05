import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { NewPolicyTypeDetailsComponent } from '../new-policy-type-details/new-policy-type-details.component';
//import { PolicyTypeListComponent } from './policy-type-list.component';
import { PolicyTypeListComponent } from './policy-type-lists.component';
import { PolicyTypeDetailsComponent } from '../policy-type-details/policy-type-details.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyTypeListComponent,
  },
  {
    path: 'PolicyTypeDetails',
    component: PolicyTypeDetailsComponent,
    data: {
      preload: true,
      title: "PolicyType Details",
      breadcrumb:  "PolicyType Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyTypeListsRoutingModule {}
