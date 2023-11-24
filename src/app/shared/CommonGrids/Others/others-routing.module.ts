
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthersComponent } from './others/others.component';
import { CheckStatusComponent } from './checkstatus/checkstatus.component';
import { TiraSearchComponent } from './tirasearch/tirasearch.component';
import { DeleteTiraComponent } from './deletetira/deletetira.component';
import { TiraIntegrationComponent } from './Integrationreports/Integration.component';


const routes: Routes = [
  {
    path: '',
    component: OthersComponent,
  },
  {
    path: 'checkstatus',
    component:CheckStatusComponent,
    data: {
      preload: true,
      title: "Check Staus",
      breadcrumb:  "Check Status",
    }
  },
  {
    path: 'tirasearchedvehicles',
    component:TiraSearchComponent,
    data: {
      preload: true,
      title: "Searched Vehicles",
      breadcrumb:  "Searched Vehicles",
    }
  },
  {
    path: 'deletetiravehicle',
    component:DeleteTiraComponent,
    data: {
      preload: true,
      title: "Delete Tira Vehicles",
      breadcrumb:  "Delete Tira Vehicles",
    }
  },
  {
    path: 'tiraintegration',
    component:TiraIntegrationComponent,
    data: {
      preload: true,
      title: "Tira Integration",
      breadcrumb:  "Tira Integration",
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersRoutingModule {}
