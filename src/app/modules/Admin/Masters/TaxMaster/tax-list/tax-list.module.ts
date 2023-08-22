import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//mport { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TaxListComponent } from './tax-list.component';
import { NewTaxDetailsComponent } from '../tax-details/tax-details.component';
import { NewTaxRoutingModule } from './tax-list-routing.module';


@NgModule({
  declarations: [
    TaxListComponent,
    NewTaxDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    NewTaxRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [TaxListComponent],
  providers: [
    CurrencyPipe,

  ],
})
export class TaxListsModule { }
