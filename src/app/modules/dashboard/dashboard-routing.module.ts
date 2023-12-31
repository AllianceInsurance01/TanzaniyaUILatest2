import { MailModule } from './../Quote/Mail/mail.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralPendingComponent } from '../referral/referral-pending/referral-pending.component';
import { ReferralRejectedComponent } from '../referral/referral-rejected/referral-rejected.component';
import { ReferralApprovedComponent } from '../referral/referral-approved/referral-approved.component';
import { ReferralRequoteComponent } from '../referral/referral-requote/referral-requote.component';
//import { MotorDocument } from '../../shared/MotorDocuments/MotorDocuments.module';
import { MotorDocumentsComponent } from 'src/app/shared/MotorDocuments/MotorDocuments.component';
import { QuotesearchComponent } from 'src/app/shared/Quotesearch/Quotesearch.component';
import { CustomerModelComponent } from '../Customer/customer-model/customer-model.component';
import { ApproverPortfolioComponent } from '../approverportfolio/approverportfolio.component';
import { NewComponent } from '../newpage/newpage.component';
import { LifeRiskDetailsComponent } from '../Quote/lifeInsurance/life-risk-details/life-risk-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

  },
  
  {
    path: 'customer',
    loadChildren: () => import('../Customer/existing-customers/existing-customers.module').then(m => m.ExistingCustomersModule),
    data: {
      preload: true,
      title: "Existing Customers",
      breadcrumb: 'Existing Customers',
    }
  },
  {
    path: 'tira-vehicle-search',
    loadChildren: () => import('../Quote/vehicle-search-details/vehicle-search-details.module').then(m => m.VehicleSearchDetailsModule),
    data: {
      preload: true,
      title: "TiraVehicleSearch",
      breadcrumb: 'TiraVehicleSearch',
    }
  },
  {
    path: 'existingQuotes',
    loadChildren: () => import('../Quote/existing-quotes/existing-quotes.module').then(m => m.ExistingQuotesModule),
    data: {
      preload: true,
      title: "Existing Quotes",
      breadcrumb: 'Existing Quotes',
    }
  },

  {
    path: 'lapsedQuotes',
    loadChildren: () => import('../Quote/lapsed-quotes/lapsed-quotes.module').then(m => m.LapsedQuotesModule),
    data: {
      preload: true,
      title: "Lapsed Quotes",
      breadcrumb: 'Lapsed Quotes',
    }
  },
  {
    path: 'rejectedQuotes',
    loadChildren: () => import('../Quote/rejected-quotes/rejected-quotes.module').then(m => m.RejectedQuotesModule),
    data: {
      preload: true,
      title: "Rejected Quotes",
      breadcrumb: 'Rejected Quotes',
    }
  },
  {
    path: 'NewDetails',
    loadChildren: () => import('../newpage/newpage.module').then(m => m.NewPageModule),
    data: {
      preload: true,
      title: "ProductGrid",
      breadcrumb: 'ProductGrid',
    }
  },
  // {
  //   path: 'brokersList',
  //   loadChildren: () => import('../Admin/loginCreation/broker/broker.module').then(m => m.BrokersModule),
  //   data: {
  //     preload: true,
  //     title: "Existing Brokers",
  //     breadcrumb: 'Existing Brokers',
  //   }
  // },
  // {
  //   path: 'userList',
  //   loadChildren: () => import('../Admin/loginCreation/user/user-list/user-list.module').then(m => m.UserListModule),
  //   data: {
  //     preload: true,
  //     title: "Existing User",
  //     breadcrumb: 'Existing User',
  //   }
  // },
  // {
  //   path: 'issuerList',
  //   loadChildren: () => import('../Admin/loginCreation/issuer/issuer-list/issuer-list.module').then(m => m.IssuerListModule),
  //   data: {
  //     preload: true,
  //     title: "Existing Insurance Employees",
  //     breadcrumb: 'Existing Insurance Employees',
  //   }
  // },
   {
     path:'customerPendingQuotes',
    loadChildren: () => import('../../shared/CommonGrids/pending-quotes/pending-quotes.module').then(m => m.PendingQuotesModule),
    data:{
       preload: true,
       title: 'Pending Quotes',
      breadcrumb:'Pending Quotes'
     }
   },
   {
     path:'customerRequestedReQuotes',
     loadChildren: () => import('../../shared/CommonGrids/requsted-quotes/requsted-quotes.module').then(m => m.RequstedQuotesModule),
    data:{
       preload: true,
       title: 'Reusted For ReQuotes',
       breadcrumb:'Reusted For ReQuotes'
    }
   },
   {
     path:'customerApprovedQuotes',
     loadChildren: () => import('../../shared/CommonGrids/approved-quotes/approved-quotes.module').then(m => m.ApprovedQuotesModule),
    data:{
       preload: true,
       title: 'Approved Quotes',
       breadcrumb:'Approved Quotes'
     }
   },
   {
     path:'customerRejectedQuotes',
     loadChildren: () => import('../../shared/CommonGrids/rejected-quotes/rejected-quotes.module').then(m => m.RejectedQuotesModule),
     data:{
       preload: true,
       title: 'Rejected Quotes',
       breadcrumb:'Rejected Quotes'
     }
   },
   {
    path:'copyQuote',
     loadChildren: () => import('../../shared/CommonGrids/copy-quote/copy-quote.module').then(m => m.CopyQuoteModule),
     data:{
       preload: true,
       title: 'Copy Quote',
       breadcrumb:'Copy Quote'
     }
   },
   {
     path:'assignQuote',
     loadChildren: () => import('../../shared/CommonGrids/assign-quote/assign-quote.module').then(m => m.AssignQuoteModule),
     data:{
       preload: true,
       title: 'Assign Quote',
       breadcrumb:'Assign Quote'
     }
   },
   {
     path:'search',
     loadChildren: () => import('../../shared/CommonGrids/search/search.module').then(m => m.SearchModule),
    data:{
      preload: true,
      title: 'Search',
      breadcrumb:'Search'
     }
   },
   {
    path:'report',
    loadChildren: () => import('../../shared/CommonGrids/report/report.module').then(m => m.ReportModule),
    data:{
       preload: true,
       title: 'Report',
       breadcrumb:'Report'
    }
   },
   {
    path:'preException',
    loadChildren: () => import('../../shared/CommonGrids/preesceptionimages/preesceptionimagesmodule').then(m => m.PreesceptionimagesModule),
    data:{
       preload: true,
       title: 'Pre-Exception',
       breadcrumb:'Pre-Exception'
    }
   },
   {
     path:'policies',
     loadChildren: () => import('../../shared/CommonGrids/policies/policies.module').then(m => m.PoliciesModule),
     data:{
      preload: true,
      title: 'Policies',
      breadcrumb:'Policies'
    }
   },
   {
    path:'paymentstatus',
    loadChildren: () => import('../../shared/CommonGrids/PaymentStatus/paymentstatus.module').then(m => m.PaymentStatusModule),
    data:{
     preload: true,
     title: 'Policies',
     breadcrumb:'Policies'
   }
  },
  {
    path: 'others',
    loadChildren: () => import('../../shared/CommonGrids/Others/others.module').then(m => m.OthersViewModule),
    data: {
      preload: true,
      title: 'Others',
      breadcrumb:  'Others',
    }
  },
   {
    path: 'premiaintegrationgrid',
    loadChildren: () => import('../../shared/CommonGrids/othersmenu/premia.module').then(m => m.PremiaIntegrationViewModule),
    data: {
      preload: true,
      title: 'Premia',
      breadcrumb:  'Premia',
    }
  },
  {
    path:'tirastatus',
    loadChildren: () => import('../../shared/CommonGrids/Tira/tira.module').then(m => m.TiraViewModule),
    data:{
     preload: true,
     title: 'Tira Success',
     breadcrumb:'Tira Success'
   }
  },
   {
     path:'cancelledPolicies',
    loadChildren: () => import('../../shared/CommonGrids/cancelled-policies/cancelled-policies.module').then(m => m.CancelledPoliciesModule),
    data:{
      preload: true,
     title: 'Cancelled Policies',
       breadcrumb:'Cancelled Policies'
    }
   },
   {
    path:'pendingPolicies',
   loadChildren: () => import('../../shared/CommonGrids/pending-policies/pending-policies.module').then(m => m.PendingPoliciesModule),
   data:{
     preload: true,
    title: 'pending Policies',
      breadcrumb:'pending Policies'
   }
  },
   {
     path: 'referralPending',
     component: ReferralPendingComponent,
     data: {
       preload: true,
       title: "Referral Pending Quotes",
       breadcrumb: 'Referral Pending Quotes',
     }
   },
   {
     path: 'referralRejected',
     component: ReferralRejectedComponent,
     data: {
       preload: true,
       title: "Referral Rejected Quotes",
       breadcrumb: 'Referral Rejected Quotes',
     }
   },
   {
     path: 'referralApproved',
    component: ReferralApprovedComponent,
    data: {
       preload: true,
       title: "Referral Approved Quotes",
       breadcrumb: 'Referral Approved Quotes',
     }
   },
   {
    path: 'referralReQuote',
    component: ReferralRequoteComponent,
    data: {
      preload: true,
      title: "Referral ReQuote Quotes",
      breadcrumb: 'Referral ReQuote Quotes',
    }
  },
   {
    path: 'viewQuotes',
    loadChildren: () => import('../Quote/viewquote-details/viewquote-details.module').then(m => m.ViewQuotesModule),
    data: {
      preload: true,
      title: "View Quotes",
      breadcrumb: 'View Quotes',
    }
  },
  {
    path: 'Mail',
    loadChildren: () => import('../Quote/Mail/mail.module').then(m => m.MailModule),
    data: {
      preload: true,
      title: "Mail",
      breadcrumb: 'Mail',
    }
  },
  {
    path: 'Sms',
    loadChildren: () => import('../Quote/Sms/Sms.module').then(m => m.SmsModule),
    data: {
      preload: true,
      title: "Sms",
      breadcrumb: 'Sms',
    }
  },
 {
    path: 'Followup',
    loadChildren: () => import('../Quote/FollowUp/followup.module').then(m => m.FollowupModule),
    data: {
      preload: true,
      title: "FollowUp",
      breadcrumb: 'FollowUp',
    }
  },
  {
    path:'MotorDocument',
    component: MotorDocumentsComponent,
    loadChildren: () => import('../../shared/MotorDocuments/MotorDocuments.module').then(m => m.MotorDocumentModule),
    //loadChildren:() => import('../../shared/MotorDocuments/MotorDocuments.module').then(m=> m.MotorDocument),
    data: {
      preload: true,
      title: "Motor",
      breadcrumb: 'Motor',
    }
  },

  {
    path:'QuoteSearch',
    component:QuotesearchComponent,
    loadChildren: () => import('../../shared/Quotesearch/Quotesearch.module').then(m => m.QuoteSearchModule),
    data: {
      preload: true,
      title: "Quote",
      breadcrumb: 'Quote',
    }
  },
  {
    path:'ApproverPortfolio',
    component:ApproverPortfolioComponent,
    loadChildren: () => import('../approverportfolio/approverportfolio.module').then(m => m.ApproverPortfolioModule),
    data: {
      preload: true,
      title: "PortFolio",
      breadcrumb: 'PortFolio',
    }
  },
  {
    path:'life-risk-details',
    component:LifeRiskDetailsComponent,
    loadChildren: () => import('../Quote/lifeInsurance/life-risk-details/life-risk-details.module').then(m => m.LifeRiskDetailsModule),
    data: {
      preload: true,
      title: "Risk Information",
      breadcrumb: 'Risk Information',
    }
  },
  

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
