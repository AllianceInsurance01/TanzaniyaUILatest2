import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDropdownDetailsComponent } from '../new-dropdown-details/new-dropdown-details.component';
import { ExisitingDropdownsComponent } from './exisiting-dropdowns.component';

const routes: Routes = [
  {
    path: '',
    component: ExisitingDropdownsComponent,
  },
  {
    path: 'newDropdownDetails',
    component: NewDropdownDetailsComponent,
    data: {
      preload: true,
      title: "Update Dropdown Details",
      breadcrumb:  "Update Dropdown Details",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingDropdownsRoutingModule {}
