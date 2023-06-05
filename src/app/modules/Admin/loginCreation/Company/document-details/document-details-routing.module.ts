
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSectionDetailsComponent } from '../add-section-details/add-section-details.component';
import {  DocumentDetailsComponent } from './document-details.component';
import { AddReferralDetailsComponent } from '../add-referral-details/add-referral-details.component';
import { AddDocumentDetailsComponent } from '../add-document-details/add-document-details.component';
import { NewDocumentDetailsComponent } from '../new-document-details/new-document-details.component';


const routes: Routes = [
  {
    path: '',
    component: DocumentDetailsComponent,
  },
  {
    path: 'addNewDocument',
    component: AddDocumentDetailsComponent,
    data: {
      preload: true,
      title: "Add Document",
      breadcrumb:  "Add Document",
    }
  },
  {
    path:'newDocumentDetails',
    component:NewDocumentDetailsComponent,
    data:{
      preload:true,
      title:"New Document",
      breadcrumb:" New Documnet"
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentDetailsRoutingModule {}
