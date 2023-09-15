import { PremiumDetailsComponent } from './Components/premium-details/premium-details.component';
import { InsuredDetailsComponent } from './Components/insured-details/insured-details.component';
import { CustomerDetailsComponent } from './Components/customer-details/customer-details.component';
import { UpdateCustomerDetailsComponent } from './update-customer-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcessDiscountComponent } from './Components/excess-discount/excess-discount.component';
import { MakePayementComponent } from './Components/make-payement/make-payement.component';
import { MotorDetailsComponent } from './Components/motor-details/motor-details.component';
import { VehicleDetailsComponent } from './Components/vehicle-details/vehicle-details.component';
import { UnderWriterDetailsComponent } from './Components/under-writer-details/under-writer-details.component';
import { DomesticQuoteDetailsComponent } from './Components/domestic-quote-details/domestic-quote-details.component';
import { TravelPassengerDetailsComponent } from './Components/travel-passenger-details/travel-passenger-details.component';
import { DomesticRiskDetailsComponent } from './Components/domestic-risk-details/domestic-risk-details.component';
import { PersonalQuoteDetailsComponent } from './Components/personal-quote-details/personal-quote-details.component';
import { EmployersQuoteDetailsComponent } from './Components/employers-quote-details/employers-quote-details.component';
import { WorkmensQuoteDetailsComponent } from './Components/workmens-quote-details/workmens-quote-details.component';
import { SMERiskDetailsComponent } from './Components/sme-risk-details/sme-risk-details.component';
import { VieQuoteDetailsComponent } from '../viewquote-details/viewquote-details.component';
import { SectionModificationComponent } from './Components/section-modification/section-modification.component';
import { CustomerModelComponent } from '../../Customer/customer-model/customer-model.component';
import { LifeCoverDetailsComponent } from './life-cover-details/life-cover-details.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateCustomerDetailsComponent,
    children: [
      { path: '', redirectTo: 'customer-details', pathMatch: 'full' },

      {
        path: 'customer-details',
        component: CustomerDetailsComponent,
        data: {
          title: "Customer-stepper",
        }
      },
      {
        path: 'userDetails',
        component: CustomerModelComponent,
        data: {
          title: "UserDetails-stepper",
        }
      },
      {
        path: 'motor-details',
        component: MotorDetailsComponent,
        data: {
          title: "Motor-stepper",
        }
      },
      {
        path: 'insured-details',
        component: InsuredDetailsComponent,
        data: {
          title: "Insured-stepper",
        }
      },
      {
        path: 'domestic-quote-details',
        component: DomesticQuoteDetailsComponent,
        data: {
          title: "Domestic-stepper",
        }
      },
      {
        path: 'domestic-risk-details',
        component: DomesticRiskDetailsComponent,
        data: {
          title: "DomesticRisk-stepper",
        }
      },
      {
        path: 'sme-risk-details',
        component:SMERiskDetailsComponent,
        data: {
          title: "SMERisk-stepper",
        }
      },
      {
        path: 'travel-quote-details',
        component: TravelPassengerDetailsComponent,
        data: {
          title: "Travel-stepper",
        }
      },
      {
        path: 'vehicle-details',
        component: VehicleDetailsComponent,
        data: {
          title: "Vehicle-stepper",
        }
      },
      {
        path: 'underwriter-details',
        component: UnderWriterDetailsComponent,
        data: {
          title: "UW-stepper",
        }
      },
      {
        path: 'excess-discount',
        component: ExcessDiscountComponent,
        data: {
          title: "Excess-stepper",
        }
      },
      {
        path: 'life-cover-details',
        component: LifeCoverDetailsComponent,
        data: {
          title: "Life-Excess-stepper",
        }
      },
      {
        path: 'premium-details',
        component: PremiumDetailsComponent,
        data: {
          title: "Premium-stepper",
        }
      },
      {
        path: 'make-payment',
        component: MakePayementComponent,
        data: {
          title: "Payment-stepper",
        }
      },
      {
        path: 'risk-selection',
        component: SectionModificationComponent,
        data: {
          title: "RiskSelection-Stepper",
        }
      },
      {
        path: 'personal-accident',
        component: PersonalQuoteDetailsComponent,
        data: {
          title: "PersonalAccident-stepper",
        }
      },
      {
        path: 'Employers-Liability',
        component: EmployersQuoteDetailsComponent,
        data: {
          title: "EmployersLiability-stepper",
        }
      },
      {
        path: 'workmens-Compensation',
        component: WorkmensQuoteDetailsComponent,
        data: {
          title: "WorkmensCompensation-stepper",
        }
      },
      
      /*{
        path: 'viewquote-details',
        component: VieQuoteDetailsComponent,
        data: {
          title: "ViewQuoteDetails-stepper",
        }
      },*/
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateCustomerDetailsRoutingModule { }
