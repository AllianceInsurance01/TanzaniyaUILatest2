import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedQuotesComponent } from './rejected-quotes.component';





const routes: Routes = [
  {
    path: '',
    component: RejectedQuotesComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RejectedQuotesRoutingModule {}
