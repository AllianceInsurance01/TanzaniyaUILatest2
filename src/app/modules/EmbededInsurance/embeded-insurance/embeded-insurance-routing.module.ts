import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbededInsuranceComponent } from './embeded-insurance.component';

const routes: Routes = [
  {
		path: '',
		component: EmbededInsuranceComponent,
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmbededInsuranceRoutingModule { }
