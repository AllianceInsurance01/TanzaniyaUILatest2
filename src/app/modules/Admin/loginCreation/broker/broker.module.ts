
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
//import { PipesModule } from '../../../../shared/pipes/pipes.module';
import { BrokerListComponent } from './broker-list/broker-list.component';
import { BrokersService } from './brokers.service';
import { BrokerdetailsConfigureComponent } from './brokerdetails-configure/brokerdetails-configure.component';
import { NewBrokerDetailsComponent } from './new-broker-details/new-broker-details.component';
import { NewCompanyDetailsComponent } from './new-company-details/new-company-details.component';
import { NewProductDetailsComponent } from './new-product-details/new-product-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrokersRoutingModule } from './brokers-routing.module';






@NgModule({
  declarations: [
    BrokerListComponent,
    NewCompanyDetailsComponent,
    NewProductDetailsComponent
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
    BrokersRoutingModule,
    MatDatepickerModule,
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
  bootstrap: [BrokerListComponent],
  providers: [
    CurrencyPipe,
    BrokersService,
  ],
})
export class BrokersModule { }
