import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingPoliciesComponent } from './pending-policies.component';





const routes: Routes = [
  {
    path: '',
    component: PendingPoliciesComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingPoliciesRoutingModule {}
