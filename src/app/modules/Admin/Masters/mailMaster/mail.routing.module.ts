
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailDetailsComponent } from './mail-details/mail-details.component';
import { MailListComponent } from './mail-list/mail-list.component';

const routes: Routes = [
  {
    path: '',
    component: MailDetailsComponent,
   },
  {
    path: 'newMailDetails',
     component: MailDetailsComponent,
  data: {
       preload: true,
      title: "Add Mail Details",
      breadcrumb:  "Add Mail Details",
    },
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailRoutingModule {}
