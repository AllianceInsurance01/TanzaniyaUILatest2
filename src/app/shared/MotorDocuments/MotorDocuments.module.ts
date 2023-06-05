import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { MotorDocumentsComponent } from './MotorDocuments.component';
import {MotorRoutingModule} from './MotorDocument-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MotorCustomerInfoComponent } from './MotorCustomerInfo/MotorCustomerInfo.component';
import { vechileCustomer } from './VechileCustomer/vechileCustomer.component';
import {PaymentComponent} from './Payment/Payment.component';
import { RatingComponent } from './Rating/Rating.component';
//import { PolicyIntegration} from './PolicyIntegration/Policyintegration.component';


import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from '../Directives/directives.module';
import { TablesModule } from '../Tables/tables.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { PolicyIntegration } from './PolicyIntegration/Policyintegration.component';

// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule, NbSidebarModule, NbMenuModule, NbDialogModule, NbWindowModule, NbToastrModule, NbChatModule, NbActionsModule, NbCheckboxModule, NbRadioModule, NbIconModule } from '@nebular/theme';
//import { NgxPaginationModule } from 'ngx-pagination';


//import { ThemeModule } from '../../../@theme/theme.module';
// import { MaterialModule } from '../shared/material/material.module';
// import { TablesModule } from '../../../shared/Tables/tables.module';

// //import { NbMomentDateModule } from '@nebular/moment';
// //import {NbDialogService } from '@nebular/theme';
// import { PipesModule } from '../../../shared/pipes/pipes.module';
// import { DigitOnlyModule } from '@uiowa/digit-only';
// import { DirectivesModule } from '../../../shared/Directives/directives.module';
// //import { RejectedQuotesComponent } from './rejected-quotes.component';
// //import { RejectedQuotesRoutingModule } from './rejected-quotes-routing.module';
// import { VieQuoteDetailsComponent } from './viewquote-details.component';
// import { ViewQuotesRoutingModule } from './viewquote-details-routing.module';






@NgModule({
  declarations: [
    MotorDocumentsComponent,
    MotorCustomerInfoComponent,
    vechileCustomer,
    PaymentComponent,
    RatingComponent,
    PolicyIntegration
  ],
  imports: [
    CommonModule,
    DigitOnlyModule ,
    DirectivesModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    MotorRoutingModule,
    //DirectivesModule,
    NgSelectModule,
    MatTabsModule,
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
    //ViewQuotesRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    //TablesModule,
    // NbSearchModule,
    // NbDatepickerModule,
    //NbMomentDateModule,
    //MaterialModule,
    //PipesModule,
    //DigitOnlyModule,
  ],
  bootstrap: [MotorDocumentsComponent ],
  providers: [
    CurrencyPipe,
  ],
})
export class MotorDocumentModule{ }
