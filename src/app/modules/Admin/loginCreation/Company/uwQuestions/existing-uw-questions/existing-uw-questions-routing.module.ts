
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExistingUwQuestionsComponent } from './existing-uw-questions.component';
import { NewUwQuestionDetailsComponent } from '../new-uw-question-details/new-uw-question-details.component';


const routes: Routes = [
  {
    path: '',
    component: ExistingUwQuestionsComponent,
  },
  {
    path: 'updateUWQuestionDetails',
    component: NewUwQuestionDetailsComponent,
    data: {
      preload: true,
      title: "Update UnderWriter Questions",
      breadcrumb:  "Update UnderWriter Questions",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingUwQuestionsRoutingModule {}
