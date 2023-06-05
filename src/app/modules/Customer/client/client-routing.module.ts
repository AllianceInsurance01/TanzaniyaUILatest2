import { ClientAddressComponent } from './Components/client-address/client-address.component';
import { ClientDetailsComponent } from './Components/client-details/client-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientTypeComponent } from './Components/client-type/client-type.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', redirectTo: 'client-details', pathMatch: 'full' },

      {
        path: 'client-details',
        component: ClientDetailsComponent,
        data: {
          title: "ClientDetails-stepper",
        }
      },
      {
        path: 'client-type',
        component: ClientTypeComponent,
        data: {
          title: "ClientType-stepper",
        }
      },
      {
        path: 'client-address',
        component: ClientAddressComponent,
        data: {
          title: "ClientAddress-stepper",
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
