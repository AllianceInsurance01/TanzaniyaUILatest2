
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClausesDerailsComponent } from '../add-clauses-derails/add-clauses-derails.component';
import { NewClausesDetailsComponent } from '../new-clauses-details/new-clauses-details.component';
import { ClausesListComponent } from './clauses-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClausesListComponent,
  },
  {
    path: 'newClausesDetails',
    component:NewClausesDetailsComponent,
    data: {
      preload: true,
      title: "Clauses Details",
      breadcrumb:  "Clauses Details",
    }
  },
  {
    path: 'AddClausesDetails',
    component:AddClausesDerailsComponent,
    data: {
      preload: true,
      title: "Clauses Details",
      breadcrumb:  "Clauses Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClausesListRoutingModule {}
