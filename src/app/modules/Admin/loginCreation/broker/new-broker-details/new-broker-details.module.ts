
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { NewBrokerDetailsComponent } from './new-broker-details.component';
import { NewBrokerDetailsRoutingModule } from './new-broker-details-routing.module';
import { BrokersService } from '../brokers.service';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BrokerdetailsConfigureComponent } from '../brokerdetails-configure/brokerdetails-configure.component';
import { BrokerBranchListComponent } from '../broker-branch-list/broker-branch-list.component';
import { NewBrokerbranchDetailsComponent } from '../new-brokerbranch-details/new-brokerbranch-details.component';
import { BrokerProductListComponent } from '../broker-product-list/broker-product-list.component';
import { AddBrokerProductDetailsComponent } from '../add-broker-product-details/add-broker-product-details.component';
import { BrokerCoverListComponent } from '../broker-cover-list/broker-cover-list.component';
import { NewBrokercoverDetailsComponent } from '../new-brokercover-details/new-brokercover-details.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EndrosementBrokerComponent } from '../endrosementbroker/endrosementbroker.component';
import { HttpInterceptorService } from 'src/app/HttpInterceptors/http-interceptor.service';
import { DepositMasterComponent } from '../DepositMaster/depositmaster.component';
import { DepositAddNewComponent } from '../depositaddnew/depositaddnew.component';
// import { DepositDetailsComponent } from '../DepositDetails/depositdetails.component';

//import { HttpInterceptorService } from '../../../../../HttpInterceptors/http-interceptor.service';





@NgModule({
  declarations: [
    NewBrokerDetailsComponent,
    NewBrokerbranchDetailsComponent,
    NewBrokercoverDetailsComponent,
    AddBrokerProductDetailsComponent,
    BrokerBranchListComponent,
    BrokerProductListComponent,
    BrokerCoverListComponent,
    BrokerdetailsConfigureComponent,
    EndrosementBrokerComponent,
    DepositMasterComponent,
    DepositAddNewComponent
    // DepositDetailsComponent,
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
     NewBrokerDetailsRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [NewBrokerDetailsComponent],
  providers: [
    CurrencyPipe,
    BrokersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
})
export class NewBrokerDetailsModule { }
