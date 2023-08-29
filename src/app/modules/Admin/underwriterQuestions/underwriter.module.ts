
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
//import { ThemeModule } from '../../../../@theme/theme.module';
//import { UserListComponent } from './user-list/user-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { UnderWriterComponent } from './underwriter.component';
import { UnderWriterRoutingModule } from './underwriter-routing.module';
import { UserService } from '../loginCreation/user/User.service';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
   UnderWriterComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    UnderWriterRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    NgxPaginationModule
  ],
  bootstrap: [UnderWriterComponent],
  providers: [
    CurrencyPipe,
    UserService,
  ],
})
export class UnderWriterModule { }
