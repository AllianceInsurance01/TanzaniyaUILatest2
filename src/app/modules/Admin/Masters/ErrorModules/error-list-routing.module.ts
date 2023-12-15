
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorListComponent } from './ErrorModule-list/error-list.component';
import { NewErrorDetailsComponent } from './ErrorModule-details/error-details.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorListComponent,
  },
  {
    path: 'errorDetails',
    component:NewErrorDetailsComponent,
    data: {
      preload: true,
      title: "Error Details",
      breadcrumb:  "Error Details",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErroristRoutingModule {}
