
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsListComponent } from './sms-list/sms-list.component';



const routes: Routes = [
  {
    path: '',
    component: SmsListComponent,
  },
  // {
  //   path: 'addStateDetails',
  //   component: AddStateDetailsComponent,
  //   data: {
  //     preload: true,
  //     title: "Add State Details",
  //     breadcrumb:  "Add State Details",
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsRoutingModule {}
