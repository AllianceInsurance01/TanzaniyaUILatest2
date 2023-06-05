
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoCodeListComponent } from './promo-code-list/promo-code-list.component';
import { NewPromoCodeDetailsComponent } from './new-promo-code-details/new-promo-code-details.component';
import { ViewPromoCoverDetailsComponent } from './view-promo-cover-details/view-promo-cover-details.component';
import { ViewPromoDiscountDetailsComponent } from './view-promo-discount-details/view-promo-discount-details.component';

const routes: Routes = [
  {
    path: '',
    component: PromoCodeListComponent,
  },
  {
    path: 'newPromoCodeDetails',
    component: NewPromoCodeDetailsComponent,
    data: {
      preload: true,
      title: "Update PromoCode Details",
      breadcrumb:  "Update PromoCode Details",
    },
  },
  {
    path: 'viewPromoCoverDetails',
    loadChildren: () => import('./view-promo-cover-details/view-promo-cover-details.module').then(m => m.ViewPromoCoverDetailsModule),
    data: {
      preload: true,
      title: "View PromoCode Cover Details",
      breadcrumb:  "View PromoCode Cover Details",
    },
  },
  {
    path: 'viewPromoDiscountDetails',
    component: ViewPromoDiscountDetailsComponent,
    data: {
      preload: true,
      title: "View PromoCode Discount Details",
      breadcrumb:  "View PromoCode Discount Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoCodeMasterRoutingModule {}
