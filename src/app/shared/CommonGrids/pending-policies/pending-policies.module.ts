import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length

import { DigitOnlyModule } from '@uiowa/digit-only';

import { DirectivesModule } from '../../Directives/directives.module';
import { TablesModule } from '../../Tables/tables.module';
import { MaterialModule } from '../../material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PendingPoliciesComponent } from './pending-policies.component';
import { PendingPoliciesRoutingModule } from './pending-policies-routing.module';








@NgModule({
  declarations: [
    PendingPoliciesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    PendingPoliciesRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [PendingPoliciesComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class PendingPoliciesModule { }
