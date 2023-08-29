
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderWriterComponent } from './underwriter.component';


const routes: Routes = [
  {
    path: '',
    component: UnderWriterComponent,
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
export class UnderWriterRoutingModule {}
