
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverDetailsComponent } from './cover-details.component';
import { AddCoverDetailsComponent } from '../add-cover-details/add-cover-details.component';
import { NewCoverDetailsComponent } from '../new-cover-details/new-cover-details.component';


const routes: Routes = [
  {
    path: '',
    component: CoverDetailsComponent,
  },
  {
    path: 'updateCoverDetails',
    component: NewCoverDetailsComponent,
    data: {
      preload: true,
      title: "Update Cover Details",
      breadcrumb:  "Update Cover Details",
    }
  },
  {
    path: 'addNewCover',
    component: AddCoverDetailsComponent,
    data: {
      preload: true,
      title: "Add Covers",
      breadcrumb:  "Add Covers",
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverDetailsRoutingModule {}
