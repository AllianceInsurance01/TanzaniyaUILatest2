
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
import { CheckStatusComponent } from './checkstatus/checkstatus.component';
import { OthersComponent } from './others/others.component';
import { OthersRoutingModule } from './others-routing.module';
import { TiraSearchComponent } from './tirasearch/tirasearch.component';
import { DeleteTiraComponent } from './deletetira/deletetira.component';
import { TiraIntegrationComponent } from './Integrationreports/Integration.component';



@NgModule({
  declarations: [
    CheckStatusComponent,
    OthersComponent,
    DeleteTiraComponent,
    TiraSearchComponent,
    TiraIntegrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    OthersRoutingModule,
    NgSelectModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    HttpClientModule,
    MatTabsModule,
    CdkAccordionModule,
    MatExpansionModule
  ],
  bootstrap: [OthersComponent],
  providers: [
    CurrencyPipe
  ],
})
export class OthersViewModule { }
