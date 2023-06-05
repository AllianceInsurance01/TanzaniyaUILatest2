import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeListComponent } from './make-list/make-list.component';
import { NewmakeDetailsComponent } from './newmake-details/newmake-details.component';

const routes: Routes = [
  {
    path: '',
    component: MakeListComponent,
  },
  {
    path: 'newMakeDetails',
    component: NewmakeDetailsComponent,
    data: {
      preload: true,
      title: 'New Make Details',
      breadcrumb:  'New Make Details',
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
export class makeMasterRoutingModule {}
