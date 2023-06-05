
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { DirectivesModule } from '../../../../../shared/Directives/directives.module';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { TablesModule } from '../../../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { PipesModule } from '../../../../../shared/pipes/pipes.module';
import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';
import { EmiListComponent } from './emi-list.component';
import { NewEmidetailsComponent } from '../new-emidetails/new-emidetails.component';
import { EmiListRoutingModule } from './emi-list-routing.module';







@NgModule({
  declarations: [
    EmiListComponent,
    NewEmidetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    EmiListRoutingModule,
    NbInputModule,
    NbSelectModule,
    NbPopoverModule,
    TablesModule,
    NbSearchModule,
    NbDatepickerModule,
    NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [EmiListComponent],
  providers: [
    CurrencyPipe,
    ProductDetailsService,
  ],
})
export class EmiListModule { }
