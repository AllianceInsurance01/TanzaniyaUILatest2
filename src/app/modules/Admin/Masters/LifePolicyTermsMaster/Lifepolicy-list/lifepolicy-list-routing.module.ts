
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifePolicyListComponent } from './lifepolicy-list.component';
import { LifePolicyDetailsComponent } from '../Lifepolicy-details/lifepolicy-details.component';


const routes: Routes = [
  {
    path: '',
    component: LifePolicyListComponent,
  },
  {
    path: 'lifepolicydetails',
    component:LifePolicyDetailsComponent,
    data: {
      preload: true,
      title: "Life PolicyTerms",
      breadcrumb:  "Life PolicyTerms",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifePolicyListRoutingModule {}
