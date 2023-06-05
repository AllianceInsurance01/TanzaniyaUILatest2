
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWarsDerailsComponent } from '../add-wars-derails/add-wars-derails.component';
import { NewWarsDetailsComponent } from '../new-wars-details/new-wars-details.component';
import { WarsListComponent } from './wars-list.component';


const routes: Routes = [
  {
    path: '',
    component: WarsListComponent,
  },
  {
    path: 'newWarsDetails',
    component:NewWarsDetailsComponent,
    data: {
      preload: true,
      title: "Wars Details",
      breadcrumb:  "Wars Details",
    }
  },
  {
    path: 'addWarsDetails',
    component:AddWarsDerailsComponent,
    data: {
      preload: true,
      title: "Wars Details",
      breadcrumb:  "Wars Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarsListRoutingModule {}
