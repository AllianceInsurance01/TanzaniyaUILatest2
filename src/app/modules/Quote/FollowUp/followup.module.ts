import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule, NbSidebarModule, NbMenuModule, NbDialogModule, NbWindowModule, NbToastrModule, NbChatModule, NbActionsModule, NbCheckboxModule, NbRadioModule, NbIconModule } from '@nebular/theme';
//import { NgxPaginationModule } from 'ngx-pagination';


//import { ThemeModule } from '../../../@theme/theme.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { TablesModule } from '../../../shared/Tables/tables.module';

//import { NbMomentDateModule } from '@nebular/moment';
//import {NbDialogService } from '@nebular/theme';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from '../../../shared/Directives/directives.module';
//import { RejectedQuotesComponent } from './rejected-quotes.component';
//import { RejectedQuotesRoutingModule } from './rejected-quotes-routing.module';
//import { VieQuoteDetailsComponent } from './viewquote-details.component';
//import { ViewQuotesRoutingModule } from './viewquote-details-routing.module';
//import { MailComponent } from './mail.component';
//import { MailRoutingModule } from './mail-routing.module';
import { FollowupComponent } from './followup.component';
import { FollowupRoutingModule } from './followup-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { AmazingTimePickerModule } from 'amazing-time-picker';
//import { MatNativeDateModule } from '@angular/material';





@NgModule({
  declarations: [
    FollowupComponent,
    //MailComponent
    //VieQuoteDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MatDatepickerModule,
    // AmazingTimePickerModule,
    //NbDialogService,
    //ThemeModule,
    //NbTabsetModule,
    // NbRouteTabsetModule,
    //NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    FollowupRoutingModule,
    MatFormFieldModule,
    //MailRoutingModule,
    //ViewQuotesRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    TablesModule,
    // NbSearchModule,
    // NbDatepickerModule,
    //NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [
    //MailComponent
    FollowupComponent
  ],
  providers: [
    CurrencyPipe,
  ],
})
export class FollowupModule { }
