
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiaIntegrationViewComponent } from './premiaintegration/premiaintegration-view.component';
import { PremiaDetailsViewComponent } from './premiadetails/premiadetails-view.component';

const routes: Routes = [
  {
    path: '',
    component:PremiaIntegrationViewComponent
  },
  {
    path: 'Premiadetails',
    component:PremiaDetailsViewComponent,
    data: {
      preload: true,
      title: "Premia Details",
      breadcrumb:  "Premia Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiaIntegrationRoutingModule {}
