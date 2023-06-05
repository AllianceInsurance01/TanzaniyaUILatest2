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
import { ExistingEndorsementsComponent } from './existing-endorsements.component';
import { EndorsementTypeDetailsComponent } from '../endorsement-type-details/endorsement-type-details.component';
import { ExistingEndorsementsRoutingModule } from './existing-endorsements-routing.module';





@NgModule({
  declarations: [
    ExistingEndorsementsComponent,
    EndorsementTypeDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ExistingEndorsementsRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
  ],
  bootstrap: [ExistingEndorsementsComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class ExistingEndorsementsModule { }
