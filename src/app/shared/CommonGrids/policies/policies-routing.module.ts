import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { ExistingEndorsementsComponent } from 'src/app/modules/Enorsement/existing-endorsements/existing-endorsements.component';
import { PoliciesComponent } from './policies.component';




const routes: Routes = [
  {
    path: '',
    component: PoliciesComponent
  },
  {
    path: 'Endorsements',
    loadChildren: () => import('../../../modules/Enorsement/existing-endorsements/existing-endorsements.module').then(m => m.ExistingEndorsementsModule),
    data: {
      preload: true,
      title: "Endorsements",
      breadcrumb: 'Endorsements',
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliciesRoutingModule {}
