import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbededInsuranceRoutingModule } from './embeded-insurance-routing.module';
import { EmbededInsuranceComponent } from './embeded-insurance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    EmbededInsuranceComponent
  ],
  imports: [
    CommonModule,
    EmbededInsuranceRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    DirectivesModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ]
})
export class EmbededInsuranceModule { }
