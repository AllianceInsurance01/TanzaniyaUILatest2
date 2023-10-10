import { SMERiskDetailsComponent } from './Components/sme-risk-details/sme-risk-details.component';
import { UpdateCustomerDetailsComponent } from './update-customer-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UpdateCustomerDetailsRoutingModule } from './update-customer-details-routing.module';
import { CustomerDetailsComponent } from './Components/customer-details/customer-details.component';
import { InsuredDetailsComponent } from './Components/insured-details/insured-details.component';
import { PremiumDetailsComponent } from './Components/premium-details/premium-details.component';
import { ExcessDiscountComponent } from './Components/excess-discount/excess-discount.component';
import { MakePayementComponent } from './Components/make-payement/make-payement.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { TablesModule } from '../../../shared/Tables/tables.module';
import { DirectivesModule } from '../../../shared/Directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MotorDetailsComponent } from './Components/motor-details/motor-details.component';
import { VehicleDetailsComponent } from './Components/vehicle-details/vehicle-details.component';
import { UnderWriterDetailsComponent } from './Components/under-writer-details/under-writer-details.component';
import { VehicleWishListComponent } from './Components/vehicle-wish-list/vehicle-wish-list.component';
import { TravelQuoteDetailsComponent } from './Components/travel-quote-details/travel-quote-details.component';
import { CoverDetailsComponent } from './Components/cover-details/cover-details.component';
import { DomesticQuoteDetailsComponent } from './Components/domestic-quote-details/domestic-quote-details.component';
import { TravelPassengerDetailsComponent } from './Components/travel-passenger-details/travel-passenger-details.component';
import { PersonalQuoteDetailsComponent } from './Components/personal-quote-details/personal-quote-details.component';
import { EmployersQuoteDetailsComponent } from './Components/employers-quote-details/employers-quote-details.component';
import { WorkmensQuoteDetailsComponent } from './Components/workmens-quote-details/workmens-quote-details.component';
import { PremiumdetailsSubsectionComponent } from './Components/premiumdetails-subsection/premiumdetails-subsection.component';
//import { NewViewDetailsComponent } from './Components/new-view-details/new-view-details.component';
import { DomesticRiskDetailsComponent } from './Components/domestic-risk-details/domestic-risk-details.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MultiSchemaTypeComponent } from './Components/FormlyComponents/multiSchemaType';
import { ObjectTypeComponent } from './Components/FormlyComponents/objectType';
import { ArrayTypeComponent } from './Components/FormlyComponents/arrayType';
import { NullTypeComponent } from './Components/FormlyComponents/nullType';
import { NgSelectFormlyComponent } from 'src/app/ngselect.type';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InputFieldType } from './Components/FormlyComponents/inputFieldType';
import { DateFieldType } from './Components/FormlyComponents/dateFieldType';
import { FormlyFieldStepper } from './stepper.type';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { CommaSeparatorInput } from './commaSeperatorInput';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatepickerTypeComponent } from './DatepickerTypeComponent';
import { SectionModificationComponent } from './Components/section-modification/section-modification.component';
import { FormlyFieldTabs } from './tab.type';
import { RepeatTypeComponent } from './repeatArray.type';
import { TableTypeComponent } from './tableType';
import { DisplayLabel } from './displayText';
import { CustomerModelComponent } from '../../Customer/customer-model/customer-model.component';
import { RadioList } from './radioList';
import { NgSelect } from './ngselect';

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [
    UpdateCustomerDetailsComponent,
    CustomerDetailsComponent,
    InsuredDetailsComponent,
    VehicleDetailsComponent,
    PremiumDetailsComponent,
    ExcessDiscountComponent,
    MakePayementComponent,
    MotorDetailsComponent,
    UnderWriterDetailsComponent,
    CoverDetailsComponent,
    VehicleWishListComponent,
    TravelQuoteDetailsComponent,
    DomesticQuoteDetailsComponent,
    TravelPassengerDetailsComponent,
    DomesticRiskDetailsComponent,
    PersonalQuoteDetailsComponent,
    EmployersQuoteDetailsComponent,
    WorkmensQuoteDetailsComponent,
    SMERiskDetailsComponent,
    MultiSchemaTypeComponent,
    PremiumdetailsSubsectionComponent,
    ObjectTypeComponent,
    ArrayTypeComponent,
    NullTypeComponent,
    InputFieldType,
    DateFieldType,
    FormlyFieldStepper,
    CommaSeparatorInput,
    DatepickerTypeComponent,
    SectionModificationComponent,
    FormlyFieldTabs,
    RepeatTypeComponent,
    TableTypeComponent,
    CustomerModelComponent,
    RadioList,
    NgSelect
    //NewViewDetailsComponent

    ],
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    MatIconModule,
    ReactiveFormsModule,
    DirectivesModule,
    NgSelectModule,
    NgxPaginationModule,
    UpdateCustomerDetailsRoutingModule,
    TablesModule,
    MaterialModule,
    PipesModule,
    DigitOnlyModule,
    NgbModule,
    MatTabsModule,
    NgxMaskModule.forRoot(options),
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
        {name: 'ngselect', component:NgSelect},
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
    FormlyMaterialModule,
    FormlyBootstrapModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
		FormlyMatToggleModule,
  ],

  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [UpdateCustomerDetailsComponent],
})
export class UpdateCustomerDetailsModule {}
