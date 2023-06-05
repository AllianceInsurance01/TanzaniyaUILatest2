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
import { ProductDetailsService } from '../../product-details/product-details.service';
import { EndorsementListComponent } from './endrosementfield-list.component';
//import { NewEndorsementTypeDetailsComponent } from '../new-endorsement-type-details/new-endorsement-type-details.component';
//import { EndorsementTypeListRoutingModule } from './endorsement-type-list-routing.module';
import { EndorsementDetailsComponent } from '../endrosementfield-details/endrosementfield-details.component';
import { EndorsementListRoutingModule } from './endrosementfield-list-routing.module';



@NgModule({
  declarations: [
    EndorsementListComponent,
    EndorsementDetailsComponent 
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    EndorsementListRoutingModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    //EndorsementTypeListRoutingModule,
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
  bootstrap: [EndorsementListComponent,],
  providers: [
    CurrencyPipe,
    ProductDetailsService,
  ],
})
export class EndorsementListModule { }
