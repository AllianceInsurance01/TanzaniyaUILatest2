import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { CompanyService } from '../company.service';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
//import { ProRataRoutingModule } from './prorata-routing.module';
//import { ProRataDetailsComponent } from './prorata-details/prorata-details.component';

import { ProductBenefitComponent } from './productbenefitdetails/productbenefitdetails.component';
import { ProductBenefitGridComponent } from './productbenefitgrid/productbenefitgrid.component';
import { ProductBenefitRoutingModule } from './productbenefit-routing.module';




@NgModule({
  declarations: [
    ProductBenefitGridComponent,
    ProductBenefitComponent
    //StateListComponent,
    //StateDetailsComponent,
    //AddStateDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ProductBenefitRoutingModule,
    //ThemeModule,
    //NbTabsetModule,
    //NbRouteTabsetModule,
    //NbStepperModule,
    //NbCardModule,
    //NbButtonModule,
    //NbListModule,
    //NbAccordionModule,
    //NbUserModule,
    //StateRoutingModule,
    //ProRataRoutingModule,

    //NbInputModule,
    //NbSelectModule,
    //NbPopoverModule,
    TablesModule,
    //NbSearchModule,
    //NbDatepickerModule,
    //NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [ProductBenefitGridComponent],
  providers: [
    CurrencyPipe,
    CompanyService
  ],
})
export class ProductBenefitModule { }
