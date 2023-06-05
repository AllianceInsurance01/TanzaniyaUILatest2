
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionDetailsComponent } from './section-details.component';
import { AddSectionDetailsComponent } from '../add-section-details/add-section-details.component';
import { NewSectionDetailsComponent } from '../new-section-details/new-section-details.component';


const routes: Routes = [
  {
    path: '',
    component: SectionDetailsComponent,
  },
  {
    path: 'addNewSection',
    component: AddSectionDetailsComponent,
    data: {
      preload: true,
      title: "Add Sections",
      breadcrumb:  "Add Sections",
    }
  },
  {
    path: 'newSectionDetails',
    component: NewSectionDetailsComponent,
    data: {
      preload: true,
      title: "New Section Details",
      breadcrumb:  "New Section Details",
    }
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionDetailsRoutingModule {}
