import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { MaterialModule } from '../../../shared/material/material.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { VehicleSearchDetailsRoutingModule } from './vehicle-search-details-routing.module';
import { VehicleSearchDetailsComponent } from './vehicle-search-details.component';
import { DirectivesModule } from '../../../shared/Directives/directives.module'
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';





@NgModule({
  declarations: [
    VehicleSearchDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    VehicleSearchDetailsRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [VehicleSearchDetailsComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class VehicleSearchDetailsModule { }
