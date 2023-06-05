
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ProductDetailsService } from '../../../loginCreation/Company/product-details/product-details.service';
//import { EmiListComponent } from './emi-list.component';
import { IndustryListComponent } from './industry-list.component';
//import { IndustryDetailsComponent } from './industry-details/industry-details.component';
import { IndustryDetailsComponent } from '../industry-details/industry-details.component';
//import { IndustryDetailsComponent } from '..industry-details.component';
import { IndustryListRoutingModule } from './industry-list-routing.module';
//import { NewEmidetailsComponent } from '../new-emidetails/new-emidetails.component';
//import { EmiListRoutingModule } from './emi-list-routing.module';







@NgModule({
  declarations: [
    IndustryListComponent,
    IndustryDetailsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    //ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    IndustryListRoutingModule,
    //EmiListRoutingModule,
    // NbInputModule,
    // NbSelectModule,
    // NbPopoverModule,
    TablesModule,
    // NbSearchModule,
    // NbDatepickerModule,
    // NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [IndustryListComponent],
  providers: [
    CurrencyPipe,
    ProductDetailsService,
  ],
})
export class IndustryListModule { }
