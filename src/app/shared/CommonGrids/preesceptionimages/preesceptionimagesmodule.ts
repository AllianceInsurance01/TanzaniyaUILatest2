import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { PreesceptionimagesRoutingModule } from './preesceptionimages-routing.module';
import { DirectivesModule } from '../../Directives/directives.module';
import { TablesModule } from '../../Tables/tables.module';
import { MaterialModule } from '../../material/material.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PreesceptionimagesComponent } from './preesceptionimages.component';
import { NgxPaginationModule } from 'ngx-pagination';







@NgModule({
  declarations: [
    PreesceptionimagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    PreesceptionimagesRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    NgxPaginationModule
  ],
  bootstrap: [PreesceptionimagesComponent],
  providers: [
    CurrencyPipe,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class  PreesceptionimagesModule { }
