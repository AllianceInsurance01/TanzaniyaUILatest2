import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelListComponent } from './model-list/model-list.component';
import { NewmodelDetailsComponent } from './newmodel-details/newmodel-details.component';

const routes: Routes = [
  {
    path: '',
    component: ModelListComponent,
  },
  {
    path: 'newModelDetails',
    component: NewmodelDetailsComponent,
    data: {
      preload: true,
      title: 'New Model Details',
      breadcrumb:  'New Model Details',
    }
  },
  // {
  //   path: 'coverDetails',
  //   loadChildren: () => import('../cover-details/cover-details.module').then(m => m.CoverDetailsModule),
  //   data: {
  //     preload: true,
  //     title: "Existing Covers",
  //     breadcrumb:  "Existing Covers",
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class modelMasterRoutingModule {}




  
