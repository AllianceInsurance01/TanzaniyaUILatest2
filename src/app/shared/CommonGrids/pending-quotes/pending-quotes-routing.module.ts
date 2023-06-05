import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingQuotesComponent } from './pending-quotes.component';


const routes: Routes = [
  {
    path: '',
    component: PendingQuotesComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingQuotesRoutingModule {}
