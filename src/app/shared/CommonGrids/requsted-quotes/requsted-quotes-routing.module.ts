import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequstedQuotesComponent } from './requsted-quotes.component';



const routes: Routes = [
  {
    path: '',
    component: RequstedQuotesComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequstedQuotesRoutingModule {}
