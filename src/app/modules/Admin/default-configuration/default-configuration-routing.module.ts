
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyConfigureComponent } from './company-configure/company-configure.component';

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
           title: 'Global Configurations',
           breadcrumb: 'Global Configurations',
    }
  },
  // {
  //   path: 'coverDetails',
  //   loadChildren: () => import('../cover-details/cover-details.module').then(m => m.CoverDetailsModule),
  //   data: {
  //     preload: true,
  //     title: "Existing Covers",
  //     breadcrumb:  "Existing Covers",
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultConfigurationRoutingModule {}
