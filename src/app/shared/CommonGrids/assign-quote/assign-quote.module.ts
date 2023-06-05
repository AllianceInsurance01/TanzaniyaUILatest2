import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length

import { DigitOnlyModule } from '@uiowa/digit-only';
import { AssignQuoteComponent } from './assign-quote.component';
import { AssignQuoteRoutingModule } from './assign-quote-routing.module';
import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';







@NgModule({
  declarations: [
    AssignQuoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    AssignQuoteRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [AssignQuoteComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class AssignQuoteModule { }
