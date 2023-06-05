
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TinyurlDetailsComponent } from '../tinyurl-details/tinyurl-details.component';
import { TinyurlListComponent } from './tinyurl-list.component';





const routes: Routes = [
  {
    path: '',
    component: TinyurlListComponent,
  },
  {
    path: 'tinyurlDetails',
    component:TinyurlDetailsComponent,
    data: {
      preload: true,
      title: "TinyUrl Details",
      breadcrumb:  "TinyUrl Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TinyurlListRoutingModule {}
