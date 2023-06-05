
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBodyTypeDetailsComponent } from '../new-body-type-details/new-body-type-details.component';
import { BodyTypeListComponent } from './body-type-list.component';


const routes: Routes = [
  {
    path: '',
    component: BodyTypeListComponent,
  },
  {
    path: 'newBodyTypeDetails',
    component:NewBodyTypeDetailsComponent,
    data: {
      preload: true,
      title: "BodyType Details",
      breadcrumb:  "BodyType Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyTypeListRoutingModule {}
