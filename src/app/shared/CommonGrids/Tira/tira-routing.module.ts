
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiraSuccessComponent } from './tiraSuccess/tiraSuccess.component';
import { TiraFailureComponent } from './tiraFailure/tiraFailure.component';
import { TiraPendingComponent } from './tiraPending/tirapending.component';

const routes: Routes = [
  {
    path: '',
    component:TiraSuccessComponent,
  },
  {
    path: 'tirafailed',
    component:TiraFailureComponent,
    data: {
      preload: true,
      title: "Tira Failed",
      breadcrumb:  "Tira Failed",
    }
  },
  {
    path: 'tirapending',
    component:TiraPendingComponent,
    data: {
      preload: true,
      title: "Tira Pending",
      breadcrumb:  "Tira Pending",
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiraViewRoutingModule {}
