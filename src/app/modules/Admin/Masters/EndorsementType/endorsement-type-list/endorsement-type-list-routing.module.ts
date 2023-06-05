
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEndorsementTypeDetailsComponent } from '../new-endorsement-type-details/new-endorsement-type-details.component';
import { EndorsementTypeListComponent } from './endorsement-type-list.component';


const routes: Routes = [
  {
    path: '',
    component: EndorsementTypeListComponent,
  },
  {
    path: 'newEndorsementTypeDetails',
    component:NewEndorsementTypeDetailsComponent,
    data: {
      preload: true,
      title: "EndorsementType Details",
      breadcrumb:  "EndorsementType Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndorsementTypeListRoutingModule {}
