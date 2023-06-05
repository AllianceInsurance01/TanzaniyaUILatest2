
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length
//import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbInputModule, NbListModule, NbPopoverModule, NbRouteTabsetModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
//import { NbMomentDateModule } from '@nebular/moment';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { NewBasicProductDetailsComponent } from '../new-basic-product-details/new-basic-product-details.component';
import { CompanyConfigureComponent } from './company-configure.component';
//import { ThemeModule } from '../../../../@theme/theme.module';
import { CompanyConfigurationRoutingModule } from './company-configuration-routing.module';
import { ExistingCoversComponent } from '../existing-covers/existing-covers.component';
import { ExistingSectionComponent } from '../existing-section/existing-section.component';
import { ExistingReferralComponent } from '../existing-referral/existing-referral.component';
import { ExistingDocumentComponent } from '../existing-document/existing-document.component';
import { RatingListComponent } from '../rating/rating-list/rating-list.component';
import { NewRatingDetailsComponent } from '../rating/new-rating-details/new-rating-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NewSubCoverDetailsComponent } from '../new-sub-cover-details/new-sub-cover-details.component';
import { NewSectionDetailsComponent } from '../new-section-details/new-section-details.component';
import { NewReferralDetailsComponent } from '../new-referral-details/new-referral-details.component';
import { NewProductDetailsComponent } from '../new-product-details/new-product-details.component';
import { NewDocumentDetailsComponent } from '../new-document-details/new-document-details.component';
import { NewCoverDetailsComponent } from '../new-cover-details/new-cover-details.component';
import { NewBranchDetailsComponent } from '../new-branch-details/new-branch-details.component';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
//import { NewmakeDetailsComponent } from '../../Masters/makeMaster/newmake-details/newmake-details.component';

@NgModule({
  declarations: [
    CompanyConfigureComponent,
    ExistingCoversComponent,
    ExistingSectionComponent,
    ExistingReferralComponent,
    ExistingDocumentComponent,
    NewBasicProductDetailsComponent,
    RatingListComponent,
    NewRatingDetailsComponent,
    NewSubCoverDetailsComponent,
    NewSectionDetailsComponent,
    NewReferralDetailsComponent,
    NewProductDetailsComponent,
    NewDocumentDetailsComponent,
    NewCoverDetailsComponent,
    NewBranchDetailsComponent,
    //NewmakeDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    CompanyConfigurationRoutingModule,
    // NbInputModule,
    //NbSelectModule,
    // NbPopoverModule,
    TablesModule,
    // NbSearchModule,
    // NbDatepickerModule,
    // NbMomentDateModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,

  ],
  bootstrap: [CompanyConfigureComponent],
  providers: [
    CurrencyPipe
  ],
})
export class CompanyConfigurationModule { }
