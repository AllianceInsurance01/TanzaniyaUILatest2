
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCoverDetailsComponent } from '../new-cover-details/new-cover-details.component';
import { CompanyConfigureComponent } from './company-configure.component';
import { NewRatingDetailsComponent } from '../rating/new-rating-details/new-rating-details.component';
import { RatingListComponent } from '../rating/rating-list/rating-list.component';
import { ExistingDocumentComponent } from '../existing-document/existing-document.component';
import { ExistingReferralComponent } from '../existing-referral/existing-referral.component';
import { ExistingSectionComponent } from '../existing-section/existing-section.component';
import { ExistingCoversComponent } from '../existing-covers/existing-covers.component';
import { NewDocumentDetailsComponent } from '../new-document-details/new-document-details.component';
import { NewSectionDetailsComponent } from '../new-section-details/new-section-details.component';
import { NewBranchDetailsComponent } from '../new-branch-details/new-branch-details.component';
import { NewReferralDetailsComponent } from '../new-referral-details/new-referral-details.component';
import { NewBasicProductDetailsComponent } from '../new-basic-product-details/new-basic-product-details.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyConfigureComponent,
  },
  {
    path: 'companyConfigure',
    component: CompanyConfigureComponent,
    data: {
           preload: true,
           title: 'Product ',
           breadcrumb: 'Product',
    }
  },
  {
    path: 'existingCovers',
    component: ExistingCoversComponent,
    data: {
           preload: true,
           title: 'Existing Covers',
           breadcrumb: 'Existing Covers',
    }
  },
  {
    path: 'newBranchDetails',
    component: NewBranchDetailsComponent,
    data: {
           preload: true,
           title: 'Existing Branch',
           breadcrumb: 'Existing Branch',
    }
  },
  {
    path: 'existingSections',
    component: ExistingSectionComponent,
    data: {
           preload: true,
           title: 'Existing Sections',
           breadcrumb: 'Existing Sections',
    }
  },
  {
    path: 'newSectionDetails',
    component: NewSectionDetailsComponent,
    data: {
           preload: true,
           title: 'Sections Details',
           breadcrumb: 'Sections Details',
    }
  },
  {
    path: 'existingReferral',
    component: ExistingReferralComponent,
    data: {
           preload: true,
           title: 'Existing Referral',
           breadcrumb: 'Existing Referral',
    }
  },
  {
    path: 'newReferralDetails',
    component: NewReferralDetailsComponent,
    data: {
           preload: true,
           title: 'Referral Details',
           breadcrumb: 'Existing Details',
    }
  },
  {
    path: 'newBasicProductlDetails',
    component: NewBasicProductDetailsComponent,
    data: {
           preload: true,
           title: 'Product Details',
           breadcrumb: 'Product Details',
    }
  },
  {
    path: 'existingDocument',
    component: ExistingDocumentComponent,
    data: {
           preload: true,
           title: 'Existing Documents',
           breadcrumb: 'Existing Documents',
    }
  },
  {
    path: 'newDocumentDetails',
    component: NewDocumentDetailsComponent,
    data: {
           preload: true,
           title: 'Update  Document Details',
           breadcrumb: 'Update  Document Details',
    }
  },
  {
    path: 'coverDetails',
    component: NewCoverDetailsComponent,
    data: {
           preload: true,
           title: 'Update Cover Details',
           breadcrumb: 'Update Cover Details',
    }
  },
  {
    path: 'existingRating',
    component: RatingListComponent,
    data: {
           preload: true,
           title: 'Existing Rating List',
           breadcrumb: 'Existing Rating List',
    }
  },
  {
    path: 'updateRating',
    component: NewRatingDetailsComponent,
    data: {
           preload: true,
           title: 'Update Rating Details',
           breadcrumb: 'Update Rating Details',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyConfigurationRoutingModule {}
