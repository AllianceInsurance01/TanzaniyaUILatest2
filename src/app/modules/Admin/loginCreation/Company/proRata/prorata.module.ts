import { ProRataListComponent } from './prorata-list/prorata-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
// import { NbCardModule } from '@nebular/theme';
// import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
//import {StateRoutingModule} from './state-routing.module';
import { CompanyService } from '../company.service';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ProRataRoutingModule } from './prorata-routing.module';
import { ProRataDetailsComponent } from './prorata-details/prorata-details.component';
import { ProductDetailsService } from '../product-details/product-details.service';
//import { StateListComponent } from './state-list/state-list.component';
//import { ProRataListComponent } from './prorata-list/prorata-list.component';
//import { StateDetailsComponent } from './state-details/state-details.component';
//import { AddStateDetailsComponent } from './add-state-details/add-state-details.component';



@NgModule({
  declarations: [
    ProRataListComponent,
    ProRataDetailsComponent
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
    ProRataRoutingModule,

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
  bootstrap: [ProRataListComponent],
  providers: [
    CurrencyPipe,
    ProductDetailsService
  ],
})
export class ProRataModule { }
