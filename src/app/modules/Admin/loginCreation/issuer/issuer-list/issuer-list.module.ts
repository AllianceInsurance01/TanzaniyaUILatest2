
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
import { IssuerListComponent } from './issuer-list.component';
import { IssuerDetailsComponent } from '../issuer-details/issuer-details.component';
import { IssuerListRoutingModule } from './issuer-list-routing.module';
import { IssuerService } from '../Issuer.service';
import { MenuConfigurationComponent } from '../menu-configuration/menu-configuration.component';
import { SumInsuredConfigurationComponent } from '../sum-insured-configuration/sum-insured-configuration.component';
import {NgxPaginationModule} from 'ngx-pagination';




@NgModule({
  declarations: [
    IssuerListComponent,
    IssuerDetailsComponent,
    MenuConfigurationComponent,
    SumInsuredConfigurationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    NgxPaginationModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    IssuerListRoutingModule,
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
  bootstrap: [IssuerListComponent],
  providers: [
    CurrencyPipe,
    IssuerService
  ],
})
export class IssuerListModule { }
