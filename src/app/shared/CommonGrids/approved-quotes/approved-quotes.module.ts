import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MaterialModule } from '../../../shared/material/material.module';
import { TablesModule } from '../../../shared/Tables/tables.module';

import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ApprovedQuotesComponent } from './approved-quotes.component';
import { ApprovedQuotesRoutingModule } from './approved-quotes-routing.module';






@NgModule({
  declarations: [
    ApprovedQuotesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ApprovedQuotesRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [ApprovedQuotesComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class ApprovedQuotesModule { }
