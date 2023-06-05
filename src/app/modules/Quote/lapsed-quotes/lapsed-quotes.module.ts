import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MaterialModule } from '../../../shared/material/material.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { LapsedQuotesComponent } from './lapsed-quotes.component';
import { LapsedQuotesRoutingModule } from './lapsed-quotes-routing.module';





@NgModule({
  declarations: [
    LapsedQuotesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    LapsedQuotesRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [LapsedQuotesComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class LapsedQuotesModule { }
