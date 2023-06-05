
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewExchangeDetailsComponent } from '../new-exchange-details/new-exchange-details.component';
import { ExchangeListComponent } from './exchange-list.component';


const routes: Routes = [
  {
    path: '',
    component: ExchangeListComponent,
  },
  {
    path: 'newExchangeDetails',
    component:NewExchangeDetailsComponent,
    data: {
      preload: true,
      title: "Exchange Details",
      breadcrumb:  "Exchange Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeListRoutingModule {}
