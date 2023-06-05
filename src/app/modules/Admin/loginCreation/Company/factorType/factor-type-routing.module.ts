
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactorTypeListComponent } from './factor-type-list/factor-type-list.component';
import { NewFactorTypeDetailsComponent } from './new-factor-type-details/new-factor-type-details.component';


const routes: Routes = [
  {
    path: '',
    component: FactorTypeListComponent,
  },
  {
    path: 'newFactorTypeDetails',
    component: NewFactorTypeDetailsComponent,
    data: {
      preload: true,
      title: "Add FactorType Details",
      breadcrumb:  "Add FactorType Details",
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactorTypeRoutingModule {}
