import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedQuotesComponent } from './approved-quotes.component';




const routes: Routes = [
  {
    path: '',
    component: ApprovedQuotesComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedQuotesRoutingModule {}
