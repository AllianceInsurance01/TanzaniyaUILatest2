
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorListComponent } from './color-list/color-list.component';
import { NewcolorDetailsComponent } from './newcolor-details/newcolor-details.component';

const routes: Routes = [
  {
    path: '',
    component: ColorListComponent,
  },
  {
    path: 'newColorDetails',
    component: NewcolorDetailsComponent,
    data: {
      preload: true,
      title: 'New Color Details',
      breadcrumb:  'New Color Details',
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
export class ColorMasterRoutingModule {}
