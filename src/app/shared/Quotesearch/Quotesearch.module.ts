import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
//import { CopyQuoteRoutingModule } from './copy-quote-routing.module';

//import { CopyQuoteComponent } from './copy-quote.component';
import { QuotesearchComponent } from './Quotesearch.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from '../Directives/directives.module';
import { TablesModule } from '../Tables/tables.module';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { QuotesearchRoutingModule } from './Quotesearch-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    QuotesearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    QuotesearchRoutingModule, 
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    MatExpansionModule
  ],
  bootstrap: [QuotesearchComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class QuoteSearchModule { }
