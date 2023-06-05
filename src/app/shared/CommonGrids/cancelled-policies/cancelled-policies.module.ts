import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length

import { DigitOnlyModule } from '@uiowa/digit-only';

import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { CancelledPoliciesComponent } from './cancelled-policies.component';
import { CancelledPoliciesRoutingModule } from './cancelled-policies-routing.module';








@NgModule({
  declarations: [
    CancelledPoliciesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    CancelledPoliciesRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [CancelledPoliciesComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class CancelledPoliciesModule { }
