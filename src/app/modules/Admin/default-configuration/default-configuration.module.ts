
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from '../../shared/Directives/directives.module';
//import { ThemeModule } from '../../../@theme/theme.module';
import { DefaultConfigurationRoutingModule } from './default-configuration-routing.module';
import { TablesModule } from '../../shared/Tables/tables.module';
import { MaterialModule } from '../../shared/material/material.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CompanyConfigureComponent } from './company-configure/company-configure.component';
import { NewBasicProductDetailsComponent } from './new-basic-product-details/new-basic-product-details.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    DefaultConfigurationRoutingModule,
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
  bootstrap: [CompanyConfigureComponent],
  providers: [
    CurrencyPipe
  ],
})
export class DefaultConfigurationModule { }
