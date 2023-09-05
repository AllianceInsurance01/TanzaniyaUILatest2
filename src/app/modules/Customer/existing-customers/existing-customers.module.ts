import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: max-line-length

import { ExistingCustomersComponent } from './existing-customers.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { TablesModule } from '../../../shared/Tables/tables.module';

import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ExistingCustomersRoutingModule } from './existing-customers-routing.module';
import { ProductFormComponent } from '../product-form/product-form.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldStepper } from 'src/app/stepper.type';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { NewCustomerDetailsComponent } from '../new-customer-details/new-customer-details.component';





@NgModule({
  declarations: [
    ProductFormComponent,
    ExistingCustomersComponent,
    NewCustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    ExistingCustomersRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    FormlyModule.forRoot({
			validationMessages: [{ name: 'required', message: 'This field is required' }],
			types: [{ name: 'stepper', component: FormlyFieldStepper, wrappers: [] }],
		  }),
    FormlyMaterialModule,
    FormlyBootstrapModule,
		MatNativeDateModule,
		FormlyMatDatepickerModule,
		FormlyMatToggleModule,
  ],
  bootstrap: [ExistingCustomersComponent],
  providers: [
    CurrencyPipe,
  ],
})
export class ExistingCustomersModule { }
