import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopyQuoteComponent } from './copy-quote.component';



const routes: Routes = [
  {
    path: '',
    component: CopyQuoteComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyQuoteRoutingModule {}
