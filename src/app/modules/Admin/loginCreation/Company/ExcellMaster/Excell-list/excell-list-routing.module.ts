
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcellAddNewComponent } from '../Excell-addnew/excell-addnew.component';
import { ExcellDetailsComponent } from '../Excell-details/excell-details.component';
import { ExcellListComponent } from './excell-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExcellListComponent,
  },
  {
    path: 'excelldetails',
    component: ExcellDetailsComponent,
    data: {
      preload: true,
      title: "Excell Details",
      breadcrumb:  "Excell Details",
    }
  },
  {
    path: 'excelladdnew',
    component: ExcellAddNewComponent,
    data: {
      preload: true,
      title: "Excell New Details",
      breadcrumb:  "Excell New Details",
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcellRoutingModule {}
