
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { NewClausesDetailsComponent } from '../new-clauses-details/new-clauses-details.component';
//import { ClausesListComponent } from './noti-list.component';
import { NewNotificationDetailsComponent } from '../new-notification-details/new-notification-details.component';
import { NotificationListComponent } from './notification-list.component';
const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent,
  },
  {
    path: 'newNotificationDetails',
    component:NewNotificationDetailsComponent,
    data: {
      preload: true,
      title: "Notification Details",
      breadcrumb:  "Notification Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationListRoutingModule {}
