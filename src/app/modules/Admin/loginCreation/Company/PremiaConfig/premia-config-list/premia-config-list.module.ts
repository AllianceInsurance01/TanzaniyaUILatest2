
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ProductDetailsService } from '../../product-details/product-details.service';
//import { ThemeModule } from '../../../../../../@theme/theme.module';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { PremiaConfigComponent } from '../premia-config/premia-config.component';
import { PremiaConfigDetailsComponent } from '../premia-config-details/premia-config-details.component';
import { PremiaConfigListComponent } from './premia-config-list.component';
import { PremiaConfigListRoutingModule } from './premia-config-list-routing.module';
import { PremiaConfigDatalistComponent } from '../premia-config-datalist/premia-config-datalist.component';









@NgModule({
  declarations: [
    PremiaConfigComponent,
    PremiaConfigDetailsComponent,
    PremiaConfigListComponent,
    PremiaConfigDatalistComponent

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
    PremiaConfigListRoutingModule,
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
  bootstrap: [],
  providers: [
    CurrencyPipe,
    ProductDetailsService,
  ],
})
export class PremiaConfigListModule { }
