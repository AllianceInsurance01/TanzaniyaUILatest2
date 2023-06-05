
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
//import { MastersService } from '../../Masters.service';
import { PromoCodeListComponent } from './promo-code-list/promo-code-list.component';
import { NewPromoCodeDetailsComponent } from './new-promo-code-details/new-promo-code-details.component';
import { PromoCodeMasterRoutingModule } from './promo-code-master-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewPromoCoverDetailsComponent } from './view-promo-cover-details/view-promo-cover-details.component';
import { ViewPromoDiscountDetailsComponent } from './view-promo-discount-details/view-promo-discount-details.component';
import { ProductDetailsService } from '../product-details/product-details.service';




@NgModule({
  declarations: [
    PromoCodeListComponent,
    NewPromoCodeDetailsComponent,
    ViewPromoDiscountDetailsComponent
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
    PromoCodeMasterRoutingModule,
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
    MatFormFieldModule

  ],
  bootstrap: [PromoCodeListComponent],
  providers: [
    CurrencyPipe,
    ProductDetailsService,
  ],
})
export class PromoCodeMasterModule { }
