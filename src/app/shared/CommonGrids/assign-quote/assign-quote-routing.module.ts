import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignQuoteComponent } from './assign-quote.component';



const routes: Routes = [
  {
    path: '',
    component: AssignQuoteComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignQuoteRoutingModule {}
