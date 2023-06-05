
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewNotificationsDetailsComponent } from '../new-notification-details/new-notifications-details.component';
import { NotificationsListComponent } from './notifications-list.component';
//import { NewClausesDetailsComponent } from '../new-clauses-details/new-clauses-details.component';
//import { ClausesListComponent } from './noti-list.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsListComponent,
  },
  {
    path: 'newNotificationDetails',
    component:NewNotificationsDetailsComponent,
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
export class NotificationsListRoutingModule {}
