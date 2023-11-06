
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
import { PremiaIntegrationViewComponent } from './premiaintegration/premiaintegration-view.component';
import { PremiaIntegrationRoutingModule } from './premia-routing.module';
import { PremiaDetailsViewComponent } from './premiadetails/premiadetails-view.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    PremiaIntegrationViewComponent,
    PremiaDetailsViewComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    PremiaIntegrationRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    HttpClientModule,
    MatTabsModule
  ],
  bootstrap: [PremiaIntegrationViewComponent],
  providers: [
    CurrencyPipe
  ],
})
export class PremiaIntegrationViewModule { }
