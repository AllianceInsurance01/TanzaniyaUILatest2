import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelledPoliciesComponent } from './cancelled-policies.component';





const routes: Routes = [
  {
    path: '',
    component: CancelledPoliciesComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelledPoliciesRoutingModule {}
