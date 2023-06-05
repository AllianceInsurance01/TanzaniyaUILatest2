
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { CoverDetailsService } from './cover-details.service';
import { CoverDetailsComponent } from './cover-details.component';
import { CoverDetailsRoutingModule } from './cover-details-routing.module';
import { AddCoverDetailsComponent } from '../add-cover-details/add-cover-details.component';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { NewCoverDetailsComponent } from '../new-cover-details/new-cover-details.component';
import { PageHeaderComponent } from 'src/app/shared/Header/page-header/page-header.component';

//import { PageComponent } from '../../../../shared/page/page.component';
import {NgxPaginationModule} from 'ngx-pagination';





@NgModule({
  declarations: [
    CoverDetailsComponent,
    AddCoverDetailsComponent,
    NewCoverDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    // ThemeModule,
    // NbTabsetModule,
    // NbRouteTabsetModule,
    // NbStepperModule,
    // NbCardModule,
    // NbButtonModule,
    // NbListModule,
    // NbAccordionModule,
    // NbUserModule,
    CoverDetailsRoutingModule,
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
    NgxPaginationModule

  ],
  bootstrap: [CoverDetailsComponent],
  providers: [
    CurrencyPipe,
    CoverDetailsService,
  ],
})
export class CoverDetailsModule { }
