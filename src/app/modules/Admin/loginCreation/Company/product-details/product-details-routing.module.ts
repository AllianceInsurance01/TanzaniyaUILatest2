import { ProRataListComponent } from './../proRata/prorata-list/prorata-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';
import { TaxDetailsComponent } from '../tax-details/tax-details.component';
import { PlanTypeBenefitsListComponent } from '../PlanTypeBenefits/plan-type-benefits-list/plan-type-benefits-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
  },
  {
    path: 'referralDetails',
    loadChildren: () => import('../referral-details/referral-details.module').then(m => m.ReferralDetailsModule),
    data: {
      preload: true,
      title: "Existing Referrals",
      breadcrumb:  "Existing Referrals",
    }
  },
  {
    path: 'sectionDetails',
    loadChildren: () => import('../section-details/section-details.module').then(m => m.SectionDetailsModule),
    data: {
      preload: true,
      title: "Existing Sections",
      breadcrumb:  "Existing Sections",
    }
  },
  {
    path: 'coverDetails',
    loadChildren: () => import('../cover-details/cover-details.module').then(m => m.CoverDetailsModule),
    data: {
      preload: true,
      title: "Existing Covers",
      breadcrumb:  "Existing Covers",
    }
  },
  {
    path: 'subCoverDetails',
    loadChildren: () => import('../sub-cover-details/sub-cover-details.module').then(m => m.SubCoverDetailsModule),
    data: {
      preload: true,
      title: "Existing SubCovers",
      breadcrumb:  "Existing SubCovers",
    }
  },
  {
    path: 'planTypeBenefits',
    component:PlanTypeBenefitsListComponent,
    data: {
      preload: true,
      title: "Tax Details",
      breadcrumb:  "Tax Details",
    }
  },
  {
    path: 'taxDetails',
    component:TaxDetailsComponent,
    data: {
      preload: true,
      title: "Tax Details",
      breadcrumb:  "Tax Details",
    }
  },

  {
    path: 'prorata',
    loadChildren: () => import('../proRata/prorata.module').then(m => m.ProRataModule),
    //component:ProRataListComponent,
    data: {
      preload: true,
      title: "Prorata Details",
      breadcrumb:  "Prorata Details",
    }
  },
  {
    path: 'uwQuestionsList',
    loadChildren: () => import('../uwQuestions/existing-uw-questions/existing-uw-questions.module').then(m => m.ExistingUwQuestionsModule),
    data: {
      preload: true,
      title: "Existing UwQuestions",
      breadcrumb:  "Existing UwQuestions",
    }
  },
  {
    path: 'documentDetails',
    loadChildren: () => import('../document-details/document-details.module').then(m => m.DocumentDetailsModule),
    data: {
      preload: true,
      title: "Existing Documents",
      breadcrumb:  "Existing Documents",
    }
  },
  {
    path: 'factorTypeList',
    loadChildren: () => import('../factorType/factor-type.module').then(m => m.FactorTypeModule),
    data: {
      preload: true,
      title: "Existing FactorType",
      breadcrumb:  "Existing FactorType",
    }
  },
  {
    path: 'emiDetails',
    loadChildren: () => import('../EMI/emi-list.module').then(m => m.EmiListModule),
    data: {
      preload: true,
      title: 'EMI Details',
      breadcrumb:  'EMI Details',
    }
  },
  {
    path: 'endorsementType',
    loadChildren: () => import('../EndorsementType/endorsement-type-list/endorsement-type-list.module').then(m => m.EndorsementTypeListModule),
    data: {
      preload: true,
      title: "Existing EndorsementType",
      breadcrumb: 'Existing EndorsementType',
    }
  },
  {
    path: 'endorsementfield',
    loadChildren: () => import('../EndrosementField/endrosementfield-list/endrosementfield-list.module').then(m => m.EndorsementListModule),
    data: {
      preload: true,
      title: "Existing EndorsementType",
      breadcrumb: 'Existing EndorsementType',
    }
  },
  {
    path: 'paymentList',
    loadChildren: () => import('../Payment/payment.module').then(m => m.PaymentModule),
    data: {
      preload: true,
      title: 'Payment List',
      breadcrumb:  'Payment List',
    }
  },
  {
    path: 'notification',
    loadChildren: () => import('../Notification/notification-list/notifications-list.module').then(m => m.NotificationsListModule),
    data: {
      preload: true,
      title: 'Notification List',
      breadcrumb:  'Notification List',
    }
  },
  {
    path: 'tinyurlList',
    loadChildren: () => import('../TinyUrl/tinyurl-list/tinyurl-list.module').then(m => m.TinyUrlListModule),
    data: {
      preload: true,
      title: 'TinyUrl List',
      breadcrumb:  'TinyUrl List',
    }
  },
  /*{
    path: 'IndustryList',
    loadChildren: () => import('../industry/industry-list/industry-list.module').then(m => m.IndustryListModule),
    data: {
      preload: true,
      title: 'Industry List',
      breadcrumb:  'Industry List',
    }
  },*/
  {
    path: 'premiaConfigList',
    loadChildren: () => import('../PremiaConfig/premia-config-list/premia-config-list.module').then(m => m.PremiaConfigListModule),
    data: {
      preload: true,
      title: 'Premia ConfigList',
      breadcrumb:  'Premia ConfigList',
    }
  },
  {
    path: 'policytypeList',
    loadChildren: () => import('../policy-type/policy-type-lists/policy-type-lists.module').then(m => m.PolicyTypesModule),
    data: {
      preload: true,
      title: 'Premia ConfigList',
      breadcrumb:  'Premia ConfigList',
    }
  },
  {
    path: 'promoCodeMaster',
    loadChildren: () => import('../promoCodeMaster/promo-code-master.module').then(m => m.PromoCodeMasterModule),
    data: {
      preload: true,
      title: "PromoCode Master",
      breadcrumb: 'PromoCode Master',
    }
  },
  {
    path: 'productbenefit',
    loadChildren: () => import('../productbenefit/productbenefit.module').then(m => m.ProductBenefitModule),
    data: {
      preload: true,
      title: "Product Benefit",
      breadcrumb: 'Product Benefit',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsRoutingModule {}
