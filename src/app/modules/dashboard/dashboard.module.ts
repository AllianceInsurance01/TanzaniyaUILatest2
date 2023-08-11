
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DirectivesModule } from '../../shared/Directives/directives.module';
import { TablesModule } from '../../shared/Tables/tables.module';
import { MaterialModule } from '../../shared/material/material.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ReferralPendingComponent } from '../referral/referral-pending/referral-pending.component';
import { ReferralApprovedComponent } from '../referral/referral-approved/referral-approved.component';
import { ReferralRejectedComponent } from '../referral/referral-rejected/referral-rejected.component';
import { ReferralRequoteComponent } from '../referral/referral-requote/referral-requote.component';
import { DialogComponent } from '../Quote/dialog/dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
//import { MotorDocumentsComponent } from 'src/app/shared/MotorDocuments/MotorDocuments.component';






@NgModule({
  declarations: [
    DashboardComponent,
    ReferralPendingComponent,
    ReferralApprovedComponent,
    ReferralRejectedComponent,
    ReferralRequoteComponent,
    DialogComponent,
    
    //MotorDocumentsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    DashboardRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    NgxPaginationModule
  ],
  bootstrap: [DashboardComponent],
  providers: [
    CurrencyPipe,
    DashboardService,
  ],
})
export class DashboardModule { }
