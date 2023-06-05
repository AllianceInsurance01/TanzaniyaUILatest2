
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PremiaConfigDatalistComponent } from '../premia-config-datalist/premia-config-datalist.component';
import { PremiaConfigDetailsComponent } from '../premia-config-details/premia-config-details.component';
import { PremiaConfigComponent } from '../premia-config/premia-config.component';
import { PremiaConfigListComponent } from './premia-config-list.component';





const routes: Routes = [
  {
    path: '',
    component: PremiaConfigListComponent,
  },
  {
    path: 'premiaConfigDetails',
    component:PremiaConfigDetailsComponent,
    data: {
      preload: true,
      title: "Premia ConfigDetails",
      breadcrumb:  "Premia ConfigDetails",
    }
  },
  {
    path: 'premiaConfig',
    component:PremiaConfigComponent,
    data: {
      preload: true,
      title: "Premia Config",
      breadcrumb:  "Premia Config",
    }
  },
  {
    path: 'premiaConfigDataList',
    component:PremiaConfigDatalistComponent,
    data: {
      preload: true,
      title: "Premia Config",
      breadcrumb:  "Premia Config",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremiaConfigListRoutingModule {}
