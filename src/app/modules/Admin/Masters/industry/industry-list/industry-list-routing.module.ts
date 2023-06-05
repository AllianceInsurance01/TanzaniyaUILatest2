import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { TinyurlDetailsComponent } from '../tinyurl-details/tinyurl-details.component';
//import { TinyurlListComponent } from './tinyurl-list.component';
import { IndustryListComponent } from './industry-list.component';
import { IndustryDetailsComponent } from '../industry-details/industry-details.component';





const routes: Routes = [
  {
    path: '',
    component: IndustryListComponent ,
  },
  {
    path: 'industryDetails',
    component:IndustryDetailsComponent,
    data: {
      preload: true,
      title: "Industry Details",
      breadcrumb:  "Industry Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndustryListRoutingModule {}
