
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailListComponent } from './mail-list/mail-list.component';


const routes: Routes = [
  {
    path: '',
    component: MailListComponent,
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
export class MailRoutingModule {}
