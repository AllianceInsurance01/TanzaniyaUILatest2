
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCoverDetailsComponent } from './sub-cover-details.component';
import { AddSubCoverDetailsComponent } from '../add-sub-cover-details/add-sub-cover-details.component';


const routes: Routes = [
  {
    path: '',
    component: SubCoverDetailsComponent,
  },
  {
    path: 'addNewSubCover',
    component: AddSubCoverDetailsComponent,
    data: {
      preload: true,
      title: "Include SubCovers",
      breadcrumb:  "Include SubCovers",
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCoverDetailsRoutingModule {}
