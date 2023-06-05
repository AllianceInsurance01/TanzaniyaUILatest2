
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPromoCoverDetailsComponent } from './view-promo-cover-details.component';
import { EditPromoCoverDetailsComponent } from '../edit-promo-cover-details/edit-promo-cover-details.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPromoCoverDetailsComponent,
  },
  {
    path: 'editPromoCoverDetails',
    component: EditPromoCoverDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPromoCoverDetailsRoutingModule {}
