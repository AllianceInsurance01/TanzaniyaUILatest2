import { MaterialTableComponent } from './material-table/material-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '../Directives/directives.module';
import { MaterialModule } from '../material/material.module';
import { GridTableComponent } from './grid-table/grid-table.component';
import { CommodityTableComponent } from './commodity-table/commodity-table.component';
import { InnerTableComponent } from './commodity-table/inner-table/inner-table.component';
import { SharedService } from '../shared.service';
import { PipesModule } from '../pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCollapseModule } from 'ngx-collapse';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MaterialTableComponent,
    GridTableComponent,
    CommodityTableComponent,
    InnerTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MaterialModule,
    DirectivesModule,
    NgxCollapseModule,
    DigitOnlyModule,
    PipesModule,
    MatIconModule


  ],
  exports: [
    MaterialTableComponent,
    GridTableComponent,
    CommodityTableComponent,
  ],
  providers: [SharedService,DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],

})
export class TablesModule { }
