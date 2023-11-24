
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
// import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { TiraSuccessComponent } from './tiraSuccess/tiraSuccess.component';
import { TiraViewRoutingModule } from './tira-routing.module';
import { TiraFailureComponent } from './tiraFailure/tiraFailure.component';
import { TiraPendingComponent } from './tiraPending/tirapending.component';



@NgModule({
  declarations: [
    TiraSuccessComponent, 
    TiraFailureComponent,
    TiraPendingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    TiraViewRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    HttpClientModule,
    MatTabsModule,
    CdkAccordionModule,
    MatExpansionModule
  ],
  bootstrap: [TiraSuccessComponent],
  providers: [
    CurrencyPipe
  ],
})
export class TiraViewModule { }
