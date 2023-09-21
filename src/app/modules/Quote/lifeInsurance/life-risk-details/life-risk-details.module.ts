import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { LifeRiskDetailsComponent } from './life-risk-details.component';
import { DirectivesModule } from 'src/app/shared/Directives/directives.module';
import { LifeRiskDetailsRoutingModule } from './life-risk-details-routing.module';
import { TablesModule } from 'src/app/shared/Tables/tables.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { FormlyModule } from '@ngx-formly/core';
import { IConfig } from 'ngx-mask';
import { FormlyFieldStepper } from '../formlyTypes/stepper.type';
import { FormlyFieldTabs } from '../formlyTypes/tab.type';
import { RepeatTypeComponent } from '../formlyTypes/repeatArray.type';
import { DisplayLabel } from '../formlyTypes/displayText';
import { RadioList } from '../formlyTypes/radioList';
import { CommaSeparatorInput } from '../formlyTypes/commaSeperatorInput';
import { TableTypeComponent } from '../formlyTypes/tableType';
import { DatepickerTypeComponent } from '../formlyTypes/DatepickerTypeComponent';
import { NgSelectFormlyComponent } from 'src/app/ngselect.type';
import { ObjectTypeComponent } from '../formlyTypes/FormlyComponents/objectType';
import { ArrayTypeComponent } from '../formlyTypes/FormlyComponents/arrayType';
import { NullTypeComponent } from '../formlyTypes/FormlyComponents/nullType';
import { MultiSchemaTypeComponent } from '../formlyTypes/FormlyComponents/multiSchemaType';
// tslint:disable-next-line: max-line-length



export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    LifeRiskDetailsComponent,
    ObjectTypeComponent,
    ArrayTypeComponent,
    NullTypeComponent,
    FormlyFieldStepper,
    CommaSeparatorInput,
    DatepickerTypeComponent,
    FormlyFieldTabs,
    RepeatTypeComponent,
    TableTypeComponent,
    RadioList
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    LifeRiskDetailsRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' },
      { name: 'maxlength', message: maxlengthValidationMessage },],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: [] },
        { name: 'tabs', component: FormlyFieldTabs, wrappers: [] },
        { name: 'null', component: NullTypeComponent, wrappers: ['form-field'] },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'multischema', component: MultiSchemaTypeComponent },
        { name: 'repeat', component: RepeatTypeComponent },
        { name: 'display', component: DisplayLabel },
        { name: 'radioList', component: RadioList },
        { name: 'commaSeparator', component: CommaSeparatorInput, wrappers: ['form-field'] },
        { name: 'table', component: TableTypeComponent, wrappers: ['form-field'] },
        {
          name: 'datepicker',
          component: DatepickerTypeComponent,
          //wrappers: ['form-field'],
          defaultOptions: {
            defaultValue: new Date(),
            templateOptions: {
              datepickerOptions: {},
            },
          },
        },
        {
          name: 'my-autocomplete',
          component: NgSelectFormlyComponent
        },
        {
          name: 'string',
          extends: 'input'
        },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number'
            }
          }
        },
        {
          name: 'date',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'datepicker'
            }
          }
        },
        // { name: 'input', component: InputFieldType },
        // {
        //   name: 'date',
        //    component: DateFieldType
        // }
      ],
		  }),
  ],
  bootstrap: [LifeRiskDetailsRoutingModule],
  providers: [
    CurrencyPipe,
  ],
})
export class LifeRiskDetailsModule { }
