
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
//import { ThemeModule } from '../../../../../../@theme/theme.module';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ProductDetailsService } from '../../product-details/product-details.service';
import { NotificationsListComponent } from './notifications-list.component';
//import { NewNotificationDetailsComponent } from '../../../../Masters/notificationMaster/new-notification-details/new-notification-details.component';
import { NotificationsListRoutingModule } from './notifications-list-routing.module';
import { NewNotificationsDetailsComponent } from '../new-notification-details/new-notifications-details.component';
//import { ClausesListComponent } from './noti-list.component';
//import { NewClausesDetailsComponent } from '../new-clauses-details/new-clauses-details.component';
//import { ClausesListRoutingModule } from './noti-list-routing.module';








@NgModule({
  declarations: [
   NotificationsListComponent,
   NewNotificationsDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    NotificationsListRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    TablesModule,
    // NbSearchModule,
    // NbDatepickerModule,
    // NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [NotificationsListComponent],
  providers: [
    CurrencyPipe,
    ProductDetailsService,
  ],
})
export class NotificationsListModule { }
