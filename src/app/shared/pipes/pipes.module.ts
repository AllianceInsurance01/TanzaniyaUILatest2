import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Commaseparator } from './commaseparator.pipe';
import { CountryFilterPipe } from './country-filter.pipe';
import { CurrencyPipe } from './currency.pipe';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ CurrencyPipe, Commaseparator, CountryFilterPipe ],
  exports : [ CurrencyPipe, Commaseparator, CountryFilterPipe ],
})
export class PipesModule { }
