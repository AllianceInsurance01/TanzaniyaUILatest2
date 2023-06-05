
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CityListComponent } from './city-list/city-list.component';
//import { CityDetailsComponent } from './city-details/city-details.component';
import { SmsListComponent } from './sms-list/sms-list.component';
import { SmsDetailsComponent } from './sms-details/sms-details.component';

const routes: Routes = [
  {
    path: '',
    component: SmsListComponent,
  },
  {
    path: 'newSmsDetails',
    component: SmsDetailsComponent,
    data: {
      preload: true,
      title: "Update Sms Details",
      breadcrumb:  "Update Sms Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsMasterRoutingModule {}
