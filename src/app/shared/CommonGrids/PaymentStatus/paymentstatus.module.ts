
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
// import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaymentSuccessComponent } from './paymentSuccess/paymentsuccess.component';
import { PaymentFailedComponent } from './paymentfailed/paymentfailed.component';
import { PaymentRoutingModule } from './paymentstatus-routing.module';
import { PaymentPendingComponent } from './paymentpending/paymentpending.component';


@NgModule({
  declarations: [
    PaymentSuccessComponent, 
    PaymentFailedComponent,
    PaymentPendingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    PaymentRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    HttpClientModule,
    MatTabsModule,
    CdkAccordionModule,
    MatExpansionModule
  ],
  bootstrap: [PaymentSuccessComponent],
  providers: [
    CurrencyPipe
  ],
})
export class PaymentStatusModule { }
