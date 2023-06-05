import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MaterialModule } from '../../../shared/material/material.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { CustomerSelectionRoutingModule } from './customer-selection-routing.module';
import { CustomerSelectionComponent } from './customer-selection.component';
import { DirectivesModule } from '../../../shared/Directives/directives.module'
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';





@NgModule({
  declarations: [
    CustomerSelectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    CustomerSelectionRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [CustomerSelectionComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class CustomerSelectionModule { }
