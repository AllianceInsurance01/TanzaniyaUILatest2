
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsService } from './product-details.service';
import { NewProductDetailsComponent } from '../new-product-details/new-product-details.component';
//import { ThemeModule } from '../../../../../@theme/theme.module';
import { TaxDetailsComponent } from '../tax-details/tax-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ɵb } from 'ngx-toast-notifications';
import { MultilevelMenuService } from 'ng-material-multilevel-menu';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PlanTypeBenefitsListComponent } from '../PlanTypeBenefits/plan-type-benefits-list/plan-type-benefits-list.component';







@NgModule({
  declarations: [
    ProductDetailsComponent,
    NewProductDetailsComponent,
    TaxDetailsComponent,
    PlanTypeBenefitsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
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
    ProductDetailsRoutingModule,
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
  bootstrap: [ProductDetailsComponent],
  providers: [
    ɵb,MultilevelMenuService,DatePipe, 
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ProductDetailsModule { }
