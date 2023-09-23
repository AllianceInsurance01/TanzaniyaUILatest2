
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { B2cLoginComponent } from './b2c-login.component';


const routes: Routes = [
  {
    path: '',
    component: B2cLoginComponent,
    children:[
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class B2cLoginRoutingModule {}
