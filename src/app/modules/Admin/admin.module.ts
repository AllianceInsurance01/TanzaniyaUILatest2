
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from '../../shared/Directives/directives.module';
import { TablesModule } from '../../shared/Tables/tables.module';
import { MaterialModule } from '../../shared/material/material.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ReferralPendingComponent } from './ReferralCases/referral-pending/referral-pending.component';
import { ReferralApprovedComponent } from './ReferralCases/referral-approved/referral-approved.component';
import { ReferralRejectedComponent } from './ReferralCases/referral-rejected/referral-rejected.component';
import { ReferralRequoteComponent } from './ReferralCases/referral-requote/referral-requote.component';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { DataManipulationComponent } from './data-manipulation/data-manipulation.component';
import { NgxPaginationModule } from 'ngx-pagination';





@NgModule({
  declarations: [
    AdminComponent,
    ReferralPendingComponent,
    ReferralApprovedComponent,
    ReferralRejectedComponent,
    ReferralRequoteComponent,
    DataManipulationComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    AdminRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  bootstrap: [],
  providers: [
    CurrencyPipe
  ],
})
export class AdminModule { }
