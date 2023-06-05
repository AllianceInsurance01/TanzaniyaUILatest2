import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreesceptionimagesComponent } from './preesceptionimages.component';



const routes: Routes = [
  {
    path: '',
    component: PreesceptionimagesComponent,
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  PreesceptionimagesRoutingModule {}
