
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralPendingComponent } from './ReferralCases/referral-pending/referral-pending.component';
import { ReferralRejectedComponent } from './ReferralCases/referral-rejected/referral-rejected.component';
import { ReferralApprovedComponent } from './ReferralCases/referral-approved/referral-approved.component';
import { AdminComponent } from './admin.component';
import { EndorsementFieldMasterComponent } from './Masters/endorsement-field-master/endorsement-field-master.component';
import { ReferralRequoteComponent } from './ReferralCases/referral-requote/referral-requote.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
    
  },
  {
    path: 'globalConfigure',
    loadChildren: () => import('./default-configuration/company-configure/company-configuration.module').then(m => m.CompanyConfigurationModule),
    data: {
      preload: true,
      title: "Global Configuration",
      breadcrumb: 'Global Configuration',
    }
  },
  {
    path: 'brokersList',
    loadChildren: () => import('./loginCreation/broker/broker.module').then(m => m.BrokersModule),
    data: {
      preload: true,
      title: "Existing Brokers",
      breadcrumb: 'Existing Brokers',
    }
  },
  {
    path: 'companyList',
    loadChildren: () => import('./loginCreation/Company/company-list/company-list.module').then(m => m.CompanyListModule),
    data: {
      preload: true,
      title: "Existing Companies",
      breadcrumb: 'Existing Companies',
    }
  },
  {
    path: 'userList',
    loadChildren: () => import('./loginCreation/user/user-list/user-list.module').then(m => m.UserListModule),
    data: {
      preload: true,
      title: "Existing User",
      breadcrumb: 'Existing User',
    }
  },
  {
    path: 'issuerList',
    loadChildren: () => import('./loginCreation/issuer/issuer-list/issuer-list.module').then(m => m.IssuerListModule),
    data: {
      preload: true,
      title: "Existing Insurance Employees",
      breadcrumb: 'Existing Insurance Employees',
    }
  },
  {
    path: 'countryMaster',
    loadChildren: () => import('./Masters/countryMaster/country-master.module').then(m => m.CountryMasterModule),
    data: {
      preload: true,
      title: "Country Master",
      breadcrumb: 'Country Master',
    }
  },
  {
    path: 'makeMaster',
    loadChildren: () => import('./Masters/makeMaster/make-master-module').then(m => m.MakeMasterModule),
    data: {
      preload: true,
      title: "Existing Make",
      breadcrumb: 'Existing Make',
    }
  },
  {
    path: 'modelMaster',
    loadChildren: () => import('./Masters/modelMaster/model-master-module').then(m => m.ModelMasterModule),
    data: {
      preload: true,
      title: "Existing Model",
      breadcrumb: 'Existing Model',
    }
  },
  {
    path: 'colorMaster',
    loadChildren: () => import('./Masters/colorMaster/color-master-module').then(m => m.ColorMasterModule),
    data: {
      preload: true,
      title: "Color Master",
      breadcrumb: 'Color Master',
    }
  },
  {
    path: 'occupationMaster',
    loadChildren: () => import('./Masters/occupationMaster/existing-occupations/existing-occupations.module').then(m => m.ExistingOccupationsModule),
    data: {
      preload: true,
      title: 'Existing Occupations',
      breadcrumb:  'Existing Occupations',
    }
  },
  {
    path: 'bankMaster',
    loadChildren: () => import('./Masters/Bank/bank-list/bank-list.module').then(m => m.BankListModule),
    data: {
      preload: true,
      title: "Bank Master",
      breadcrumb: 'Bank Master',
    }
  },
  {
    path: 'exchangeMaster',
    loadChildren: () => import('./Masters/Exchange/exchange-list/exchange-list.module').then(m => m.ExchangeListModule),
    data: {
      preload: true,
      title: "Exchange Master",
      breadcrumb: 'Exchange Master',
    }
  },
  {
    path: 'Industry',
    loadChildren: () => import('./Masters/industry/industry-list/industry-list.module').then(m => m.IndustryListModule),
    data: {
      preload: true,
      title: "Industry Master",
      breadcrumb: 'Industry Master',
    }
  },
  {
    path: 'bodyTypeMaster',
    loadChildren: () => import('./Masters/BodyType/body-type-list/body-type-list.module').then(m => m.BodyTypeListModule),
    data: {
      preload: true,
      title: "Body Type Master",
      breadcrumb: 'Body Type Master',
    }
  },
  {
    path: 'vehicleUsageMaster',
    loadChildren: () => import('./Masters/VehicleUsage/Vehicle-usage-list/vehicle-usage-list.module').then(m => m.VehicleUsageListModule),
    data: {
      preload: true,
      title: "Vehicle Usage Master",
      breadcrumb: 'Vehicle Usage Master',
    }
  },
  {
    path:'preException',
    loadChildren: () => import('./preesceptionimages/preesceptionimagesmodule').then(m => m.PreesceptionimagesModule),
    data:{
       preload: true,
       title: 'Pre-Exception',
       breadcrumb:'Pre-Exception'
    }
   },
  {
		path:'endorsementfieldDetails',
		component:EndorsementFieldMasterComponent
	},
  {
    path: 'warrantyMaster',
    loadChildren: () => import('./Masters/Warranty/warranty-list/warranty-list.module').then(m => m.WarrantyListModule),
    data: {
      preload: true,
      title: "Warranty Master",
      breadcrumb: 'Warranty Master',
    }
  },
  {
    path: 'CompanyTax',
    loadChildren: () => import('./Masters/companytax/companytax.module').then(m => m.CompanyTaxListsModule),
    data: {
      preload: true,
      title: "Warranty Master",
      breadcrumb: 'Warranty Master',
    }
  },
  {
    path: 'exclusionMaster',
    loadChildren: () => import('./Masters/Exclusion/exclusion-list/exclusion-list.module').then(m => m.ExclusionListModule),
    data: {
      preload: true,
      title: "Exclusion Master",
      breadcrumb: 'Exclusion Master',
    }
  },
  {
    path: 'clausesMaster',
    loadChildren: () => import('./Masters/Clauses/clauses-list/clauses-list.module').then(m => m.ClausesListModule),
    data: {
      preload: true,
      title: "Clauses Master",
      breadcrumb: 'Clauses Master',
    }
  },
  {
    path: 'warsMaster',
    loadChildren: () => import('./Masters/Wars/wars-list/wars-list.module').then(m => m.WarsListModule),
    data: {
      preload: true,
      title: "Wars Master",
      breadcrumb: 'Wars Master',
    }
  },
  {
    path: 'dropdownMaster',
    loadChildren: () => import('./Masters/dropdownMaster/exisiting-dropdowns/exisiting-dopdowns.module').then(m => m.ExistingDropdownsModule),
    data: {
      preload: true,
      title: "Dropdown Master",
      breadcrumb: 'Dropdown Master',
	  }
	},
  {
    path: 'RegionMaster',
    loadChildren: () => import('./Masters/region/region.module').then(m => m.RegionModule),
    data: {
      preload: true,
      title: "Region Master",
      breadcrumb: 'Region Master',
	  }
	},
  {
    path: 'PlanTypeMaster',
    loadChildren: () => import('./Masters/plantypeMaster/plantypelist/plantypelist.module').then(m => m.PlanTypeModule),
    data: {
      preload: true,
      title: "Plan Type Master",
      breadcrumb: 'Plan Type Master',
	  }
	},
  {
    path: 'ProductGroupMaster',
    loadChildren: () => import('./Masters/productgroupMaster/productgrouplist/productgrouplist.module').then(m => m.ProductGroupModule),
    data: {
      preload: true,
      title: "Product Group Master",
      breadcrumb: 'Product Group Master',
	  }
	},
	{
    path: 'mailMaster',
    loadChildren: () => import('./Masters/mailMaster/mail.module').then(m => m.MailModule),
    data: {
      preload: true,
      title: 'Mail Details',
      breadcrumb:  'Mail Details',
    }
  },
  {
    path: 'taxMaster',
    loadChildren: () => import('./Masters/TaxMaster/tax-list/tax-list.module').then(m => m.TaxListsModule),
    data: {
      preload: true,
      title: 'Tax Details',
      breadcrumb:  'Tax Details',
    }
  },
  {
    path: 'smsMaster',
    loadChildren: () => import('./Masters/SmsMaster/sms-master.module').then(m => m.SmsMasterModule),
    data: {
      preload: true,
      title: 'Existing Sms',
      breadcrumb:  'Existing Sms',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
