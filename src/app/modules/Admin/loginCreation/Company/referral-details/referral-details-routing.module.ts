
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSectionDetailsComponent } from '../add-section-details/add-section-details.component';
import { ReferralDetailsComponent } from './referral-details.component';
import { AddReferralDetailsComponent } from '../add-referral-details/add-referral-details.component';
import { NewReferralDetailsComponent } from '../new-refferral-details/new-refferral-details.component';



const routes: Routes = [
  {
    path: '',
    component: ReferralDetailsComponent,
  },
  {
    path: 'addNewReferral',
    component: AddReferralDetailsComponent,
    data: {
      preload: true,
      title: "Add Referral",
      breadcrumb:  "Add Referral",
    }
  },
  {
    path: 'newReferral',
    component: NewReferralDetailsComponent,
    data: {
      preload: true,
      title: "New Referral",
      breadcrumb:  "New Referral",
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralDetailsRoutingModule {}
