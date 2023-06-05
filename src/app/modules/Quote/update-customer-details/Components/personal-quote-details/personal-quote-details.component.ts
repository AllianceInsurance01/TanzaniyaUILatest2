import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { FormGroup, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProductData } from '../models/product';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from 'src/app/shared/Services/shared.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
export class ForceLengthValidators {
  static maxLength(maxLength: number) {
    return (control: FormControl): ValidationErrors => {
      if (!control.value) {
        return null;
      }

      if (control.value.length > maxLength) {
        //force the length to 
        control.setValue(control.value.substring(0, maxLength));
      }

      return null;
    };
  }
  static min(min: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {

      let val: number = control.value;

      if (control.pristine || control.pristine) {
        return null;
      }
      if (val >= min) {
        return null;
      }
      return { 'min': true };
    }
  }
}
@Component({
  selector: 'app-personal-quote-details',
  templateUrl: './personal-quote-details.component.html',
  styleUrls: ['./personal-quote-details.component.scss']
})
export class PersonalQuoteDetailsComponent implements OnInit {
  fields: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  public commonApiUrl: any = this.AppConfig.CommonApiUrl;
  occupationList: any; userDetails: any;
  loginId: any; agencyCode: any;
  branchCode: any; productId: any;
  insuranceId: any; commonDetails: any;
  brokerbranchCode: any; branchList: any;
  userType: any;
  brokerCode: any;
  applicationId: string;
  subuserType: any = null;
  acExecutiveId: any = null;
  commissionType: any = null;
  customerDetails: any; categoryDesc: any;
  requestReferenceNo: any = null;
  uwQuestionList: any[] = []; questionSection: boolean = false;
  dobminDate: Date;
  sourceType: any = null;
  customerCode: any = null;
  bdmCode: any = null;
  quoteDetails: any;
  issuerSection: boolean;
  industryList: any[] = [];
  formSection: boolean = false; viewSection: boolean = false;
  BuildingUsageList: any;
  buglaryValue:any[] =[];
  categoryList: any[] = [];
  endorsementSection: boolean = false;
  orgPolicyNo: string;
  endorsementId: any;
  enableFieldsList: any;
  endorsePolicyNo: any;
  endorseCategory: any;
  endorsementName: any;
  endorsementDate: any = null; endorsementEffectiveDate: any = null;
  endorsementType: any = null; endorsementRemarks: any = null;
  endorsementTypeDesc: any = null; endtCategoryDesc: any = null;
  endtCount: any = null; endtPrevPolicyNo: any = null;
  endtStatus: any = null; endtPrevQuoteNo: any = null;
  orginalPolicyNo: any = null; isFinanceEndt: any = null;
  endorseEffectiveDate: any; employeeCountList: any[] = [];
  dobDate: any; industryTypeList: any[] = [];
  wallMaterialList: any[] = []; audientTypeList: any[] = [];
  roofMaterialList: any[] = [];
  sumInsuredList: any[] = [];
  natureTradeList: any[] = [];
  insuranceForList: any[] = [];
  ceilingMaterialList: any;
  regionList: any;
  stateList: any;
  windowMaterialList: any[] = [];
  doorsMaterialList: any[] = [];
  nightLeftDoors: any[] = [];
  buildingOccupiedList: any[] = []; coversRequired: any = 'C';
  constructor(private formlyJsonschema: FormlyJsonschema, private sharedService: SharedService, private datePipe: DatePipe,
    private router: Router, private http: HttpClient, private updateComponent: UpdateCustomerDetailsComponent) {
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if (commonDetails) this.commonDetails = commonDetails;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    console.log('boooooooo', this.brokerbranchCode);
    this.branchCode = this.userDetails.Result.BranchCode;
    console.log('branchCode', this.branchCode);
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.productId=='19'){
      this.updateComponent.showStepperSection = false;
    }
    else this.updateComponent.showStepperSection = true;
    if (this.productId != '3' && this.productId != '19') {
      this.getOccupationList();
    }
    this.productItem = new ProductData();
    this.productItem.BuildingOwnerYn = 'Y';
    this.dobminDate = new Date();
    if (sessionStorage.getItem('endorsePolicyNo')) {
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if (endorseObj) {
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        console.log("Enable Obj in Vehicle", this.enableFieldsList, this.endorsementId)
        // if(this.endorsementId!=42 && this.endorsementId!=842){
        //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
        // }
      }
    }
  }

  countyList: any[] = []; public productItem: ProductData = null
  policyStartDate: any;
  DateOfBirth: any;
  FirstName: any;
  minDate: Date;
  maxDate: Date;
  activeMenu: any = 'menu1';
  BenifitList: any[] = []; public form = new FormGroup({})
  public model: any = { maxDate: '2019-09-10' }
  ngOnInit(): void {
    var d = new Date();
    let minDate = new Date();
    let regDate = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.dobDate = new Date(year - 18, month, day);
    if (this.productId == '13') {
      this.fields = [
        {
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'offset-2 col-7',
                  type: 'input',
                  key: 'CustomerName',
                  props: {
                    label: 'Insurer Name',
                    disabled: this.checkDisable('CustomerName'),
                    required: true,
                    options: [

                    ],
                  },

                  expressions: {
                  },
                },
                {
                  className: 'offset-2 col-7',
                  key: 'Dob',
                  type: 'datepicker',
                  props: {
                    label: 'Date Of Birth',
                    disabled: this.checkDisable('Dob'),
                    required: true,
                    type: 'date',
                    datepickerOptions: {
                      max: this.dobDate
                    },
                  }
                },
                {
                  className: 'offset-2 col-7',
                  type: 'select',
                  key: 'OccupationType',
                  props: {
                    label: 'Occupation',
                    disabled: this.checkDisable('OccupationType'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
                    'props.disabled': '!model.CustomerName',
                  },
                },
                {
                  className: 'offset-2 col-7',
                  type: 'commaSeparator',
                  key: 'SalaryPerAnnum',

                  props: {
                    label: `Salary/Year (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('SalaryPerAnnum'),
                    required: true,
                    options: [

                    ],

                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                      field.formControl.valueChanges.subscribe(() => {
                        this.getSIValue();
                      });
                    },
                  },
                  expressions: {
                  },
                },
                {
                  className: 'offset-2 col-7',
                  type: 'select',
                  key: 'BenefitCoverMonth',
                  props: {
                    label: 'Benefit Period',
                    disabled: this.checkDisable('BenefitCoverMonth'),
                    required: true,
                    options: [
                      { label: '12 Months', value: '12' },
                      { label: '24 Months', value: '24' },
                      { label: '36 Months', value: '36' },
                    ],
                  },
                  hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                      field.formControl.valueChanges.subscribe(() => {
                        this.getSIValue();
                      });
                    },
                  },
                  expressions: {
                    'props.disabled': '!model.CustomerName',
                  },
                },
                {
                  className: 'offset-2 col-7',
                  type: 'commaSeparator',
                  key: 'SumInsured',
                  props: {
                    label: `SumInsured  (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('SumInsured'),
                    required: true,
                    options: [

                    ],

                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  expressions: {

                  },
                },
              ]
            }
          ],
        },
      ];
      console.log(JSON.stringify(this.fields))
    }
    else if (this.productId == '14') {
      this.fields = [
        {
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                // {
                //   key: 'CustomerName',
                //   type: 'input',
                //   className: 'col-4',
                //   id: 'CustomerName',
                //   props: {
                //     label: 'Insurer Name',
                //     pattern: /[a-zA-Z ]+/gm,
                //     required: true,
                //     maxLength: 10
                //   },
                //   validation: {
                //     messages: {
                //       pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^a-zA-Z ]+/gm, ''))
                //     },
                //   },
                // },
                // {
                //   className: 'col-4',
                //   key: 'Dob',
                //   type: 'datepicker',
                //   props: {
                //     label: 'Date Of Birth',
                //     disabled: this.checkDisable('Dob'),
                //     required: true,
                //     type: 'date',
                //     datepickerOptions: {
                //       max: this.dobDate
                //     },
                //   }

                // },
                // {
                //   className: 'col-4',
                //   type: 'select',
                //   key: 'OccupationType',
                //   props: {
                //     label: 'Occupation',
                //     required: true,
                //     disabled: this.checkDisable('OccupationType'),
                //     options: [
                //     ],
                //   },
                //   expressions: {
                //     'props.disabled': '!model.CustomerName',
                //   },
                // },
                // {
                //   className: 'col-4',
                //   type: 'commaSeparator',
                //   key: 'SalaryPerAnnum',

                //   props: {
                //     label: `Salary/Year (${this.commonDetails[0].Currency})`,
                //     disabled: this.checkDisable('SalaryPerAnnum'),
                //     required: true,
                //     options: [

                //     ],
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //     onInit: (field: FormlyFieldConfig) => {
                //       field.formControl.valueChanges.subscribe(() => {
                //         this.getSIValue();
                //       });
                //     },
                //   },
                //   expressions: {
                //   },
                // },
                // {
                //   className: 'col-4',
                //   type: 'select',
                //   key: 'JobJoiningMonth',
                //   props: {
                //     label: 'Job Joined Year',
                //     disabled: this.checkDisable('JobJoiningMonth'),
                //     required: true,
                //     options: [
                //       { label: '12 Months', value: '12' },
                //       { label: '24 Months', value: '24' },
                //       { label: '36 Months', value: '36' },
                //     ],
                //   },
                //   expressions: {
                //     'props.disabled': '!model.CustomerName',
                //   },
                // },

                // {
                //   className: 'col-4',
                //   type: 'commaSeparator',
                //   key: 'SumInsured',
                //   props: {
                //     label: `Employee's SumInsured  (${this.commonDetails[0].Currency})`,
                //     disabled: this.checkDisable('SumInsured'),
                //     required: true,
                //     options: [

                //     ],
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   expressions: {

                //   },
                // },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'TotalNoOfEmployees',
                  props: {
                    label: 'Total no of Employees',
                    disabled: this.checkDisable('TotalNoOfEmployees'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'TotalExcludedEmployees',
                  props: {
                    label: 'Excluded Employees',
                    placeholder: "",
                    required: true,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('TotalExcludedEmployees'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'TotalRejoinedEmployees',
                  props: {
                    label: 'Rejoined Employees',
                    placeholder: "",
                    required: true,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('TotalRejoinedEmployees'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'SumInsured',
                  props: {
                    label: `Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('SumInsured'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  }
                },
              ]
            }
          ],
        }

      ];
      this.getIndustryTypeList();
      this.getEmployeeCountList();
    }
    else if (this.productId == '15') {
      // this.fields = [
      //   {
      //     fieldGroup: [
      //       {
      //         fieldGroupClassName: 'row',
      //         fieldGroup: [
      //           {
      //             className: 'col-4',
      //             type: 'input',
      //             key: 'CustomerName',
      //             props: {
      //               label: 'Insurer Name',
      //               required: true,
      //               maxlength: 100,
      //               pattern: /[a-zA-Z ]+/gm,
      //               disabled: this.checkDisable('CustomerName'),
      //               options: [

      //               ],
      //             },
      //             validation: {
      //               messages: {
      //                 pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^a-zA-Z ]+/gm, ''))
      //               },
      //             },
      //             expressions: {
      //             },
      //           },
      //           {
      //             className: 'col-4',
      //             key: 'Dob',
      //             type: 'datepicker',
      //             props: {
      //               label: 'Date Of Birth',
      //               required: true,
      //               disabled: this.checkDisable('Dob'),
      //               type: 'date',
      //               datepickerOptions: {
      //                 max: this.dobDate,
      //               },
      //             }
      //           },
      //           {
      //             className: 'col-4',
      //             type: 'select',
      //             key: 'OccupationType',
      //             props: {
      //               label: 'Occupation',
      //               disabled: this.checkDisable('OccupationType'),
      //               required: true,
      //               options: [
      //               ],
      //             },
      //             expressions: {
      //               'props.disabled': '!model.CustomerName',
      //             },
      //           },
      //           {
      //             className: 'col-4',
      //             type: 'commaSeparator',
      //             key: 'SalaryPerAnnum',

      //             props: {
      //               label: `Salary/Year (${this.commonDetails[0].Currency})`,
      //               disabled: this.checkDisable('SalaryPerAnnum'),
      //               required: true,
      //               options: [

      //               ],
      //             },
      //             validators: {
      //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
      //             },
      //             hooks: {
      //               onInit: (field: FormlyFieldConfig) => {
      //                 field.formControl.valueChanges.subscribe(() => {
      //                   this.getSIValue();
      //                 });
      //               },
      //             },
      //             expressions: {
      //             },
      //           },
      //           {
      //             className: 'col-4',
      //             type: 'select',
      //             key: 'JobJoiningMonth',
      //             props: {
      //               label: 'Job Joined  Year',
      //               disabled: this.checkDisable('JobJoiningMonth'),
      //               required: true,
      //               options: [
      //                 { label: '12 Months', value: '12' },
      //                 { label: '24 Months', value: '24' },
      //                 { label: '36 Months', value: '36' },
      //               ],
      //             },
      //             expressions: {
      //               'props.disabled': '!model.CustomerName',
      //             },
      //           },
      //           // {
      //           //   className: 'col-4',
      //           //   type: 'select',
      //           //   key: 'BetweenDiscontinued',
      //           //   props: {
      //           //   label: 'Between Discontinued?',
      //           //   required: true,
      //           //   options: [
      //           //     { label: '- Select -', value: '' },
      //           //     { label: 'Yes', value: 'Y' },
      //           //     { label: 'No', value: 'N' },
      //           //   ],
      //           //   },

      //           //   expressions: {
      //           //   'props.disabled': '!model.CustomerName',
      //           //   },
      //           // },
      //           // {
      //           //   className: 'col-4',
      //           //   type: 'select',
      //           //   key: 'EthicalWorkInvolved',
      //           //   props: {
      //           //   label: 'Involved in Unethical Work?',
      //           //   required: true,
      //           //   options: [
      //           //     { label: '- Select -', value: '' },
      //           //     { label: 'Yes', value: 'Y' },
      //           //     { label: 'No', value: 'N' },
      //           //   ],
      //           //   },
      //           //   expressions: {
      //           //   'hide': "model.BetweenDiscontinued!='Y'",
      //           //   },
      //           // },
      //           {
      //             className: 'col-4',
      //             type: 'commaSeparator',
      //             key: 'SumInsured',
      //             disabled: this.checkDisable('SumInsured'),
      //             props: {
      //               label: `WorkMen's SumInsured  (${this.commonDetails[0].Currency})`,
      //               required: true,
      //               options: [

      //               ],
      //             },
      //             validators: {
      //               validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
      //             },
      //             expressions: {

      //             },
      //           },
      //         ]
      //       }
      //     ],
      //   }

      // ];
      this.fields = [
        {
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                // {
                //   key: 'CustomerName',
                //   type: 'input',
                //   className: 'col-4',
                //   id: 'CustomerName',
                //   props: {
                //     label: 'Insurer Name',
                //     pattern: /[a-zA-Z ]+/gm,
                //     required: true,
                //     maxLength: 10
                //   },
                //   validation: {
                //     messages: {
                //       pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^a-zA-Z ]+/gm, ''))
                //     },
                //   },
                // },
                // {
                //   className: 'col-4',
                //   key: 'Dob',
                //   type: 'datepicker',
                //   props: {
                //     label: 'Date Of Birth',
                //     disabled: this.checkDisable('Dob'),
                //     required: true,
                //     type: 'date',
                //     datepickerOptions: {
                //       max: this.dobDate
                //     },
                //   }

                // },
                // {
                //   className: 'col-4',
                //   type: 'select',
                //   key: 'OccupationType',
                //   props: {
                //     label: 'Occupation',
                //     required: true,
                //     disabled: this.checkDisable('OccupationType'),
                //     options: [
                //     ],
                //   },
                //   expressions: {
                //     'props.disabled': '!model.CustomerName',
                //   },
                // },
                // {
                //   className: 'col-4',
                //   type: 'commaSeparator',
                //   key: 'SalaryPerAnnum',

                //   props: {
                //     label: `Salary/Year (${this.commonDetails[0].Currency})`,
                //     disabled: this.checkDisable('SalaryPerAnnum'),
                //     required: true,
                //     options: [

                //     ],
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   hooks: {
                //     onInit: (field: FormlyFieldConfig) => {
                //       field.formControl.valueChanges.subscribe(() => {
                //         this.getSIValue();
                //       });
                //     },
                //   },
                //   expressions: {
                //   },
                // },
                // {
                //   className: 'col-4',
                //   type: 'select',
                //   key: 'JobJoiningMonth',
                //   props: {
                //     label: 'Job Joined Year',
                //     disabled: this.checkDisable('JobJoiningMonth'),
                //     required: true,
                //     options: [
                //       { label: '12 Months', value: '12' },
                //       { label: '24 Months', value: '24' },
                //       { label: '36 Months', value: '36' },
                //     ],
                //   },
                //   expressions: {
                //     'props.disabled': '!model.CustomerName',
                //   },
                // },

                // {
                //   className: 'col-4',
                //   type: 'commaSeparator',
                //   key: 'SumInsured',
                //   props: {
                //     label: `Employee's SumInsured  (${this.commonDetails[0].Currency})`,
                //     disabled: this.checkDisable('SumInsured'),
                //     required: true,
                //     options: [

                //     ],
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   expressions: {

                //   },
                // },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'TotalNoOfEmployees',
                  props: {
                    label: 'Total no of Employees',
                    disabled: this.checkDisable('TotalNoOfEmployees'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'TotalExcludedEmployees',
                  props: {
                    label: 'Excluded Employees',
                    placeholder: "",
                    required: true,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('TotalExcludedEmployees'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'TotalRejoinedEmployees',
                  props: {
                    label: 'Rejoined Employees',
                    placeholder: "",
                    required: true,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('TotalRejoinedEmployees'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'SumInsured',
                  props: {
                    label: `Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('SumInsured'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  }
                },
              ]
            }
          ],
        }

      ];
      this.getIndustryTypeList();
      this.getEmployeeCountList();
    }
    else if (this.productId == '19') {
      this.checkDomesticForm('direct')
      console.log(JSON.stringify(this.fields))
    }
    else if (this.productId == '32') {
      this.fields = [
        {
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'IndustryName',
                  props: {
                    label: 'Organization Name',
                    disabled: this.checkDisable('IndustryName'),
                    required: true,
                    maxLength: 100,
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'NatureOfBusinessId',
                  props: {
                    label: 'Nature of Business Type',
                    disabled: this.checkDisable('NatureOfBusinessId'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'TotalNoOfEmployees',
                  props: {
                    label: 'Total no of Employees',
                    disabled: this.checkDisable('TotalNoOfEmployees'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'SumInsured',
                  props: {
                    label: `Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('SumInsured'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  }
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'TotalExcludedEmployees',
                  props: {
                    label: 'Excluded Employees',
                    placeholder: "",
                    required: true,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('TotalExcludedEmployees'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'TotalRejoinedEmployees',
                  props: {
                    label: 'Rejoined Employees',
                    placeholder: "",
                    required: true,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('TotalRejoinedEmployees'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'input',
                  key: 'AccountOutstandingEmployees',
                  props: {
                    label: 'Total Employees Outstanding',
                    placeholder: "",
                    required: true,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('AccountOutstandingEmployees'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                      pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                    },
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'TotalOutstandingAmount',
                  required: true,
                  maxLength: 10,
                  placeholder: "0000000000",
                  templateOptions: {
                    label: `Employees Outstanding Amount (${this.commonDetails[0].Currency})`,
                  },
                  validators: {
                  },
                  hooks: {

                  },

                  expressions: {
                    disabled: this.checkDisable('TotalOutstandingAmount'),
                  },
                },
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'AccountAuditentType',
                  props: {
                    label: 'Bank/Account Statement Audit Period',
                    disabled: this.checkDisable('AccountAuditentType'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },


              ]

            }
          ]


        }
      ]
    }
    else if (this.productId == '3') {
      this.checkDomesticForm('direct');
    }
    else if (this.productId == '1') {
      this.fields = [
        {
          type: 'stepper',
          fieldGroup: [

            {
              props: { label: 'Burglary' },
              fieldGroup: [
                {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'NatureOfTradeId',
                      props: {
                        label: 'Nature Of Trade',
                        required: true,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'IndustryId',
                      props: {
                        label: 'Industry Type',
                        required: true,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      key: 'InsuranceForId',
                      className: 'col-6',
                      type: 'multicheckbox',
                      props: {
                        label: 'Insurance For',
                        required: true,
                        options: [

                        ],
                      },
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'WallType',
                      props: {
                        label: 'External Wall Type',
                        required: false,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'InternalWallType',
                      props: {
                        label: 'Internal Wall Type',
                        required: false,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'RoofType',
                      props: {
                        label: 'Roof Type',
                        required: false,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'CeilingType',
                      props: {
                        label: 'Ceiling Type',
                        required: false,
                        options: []
                      },
                      expressions: {

                      }
                    },
                  ]
                }
              ]
            },
            {
              props: { label: 'Sum Insured Details' },
              fieldGroup: [
                {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      className: 'col-6',
                      type: 'commaSeparator',
                      key: 'StockInTradeSi',
                      props: {
                        label: `Stock In Trade (${this.commonDetails[0].Currency})`,
                        required: false,
                        placeholder: "",
                        options: [],
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'commaSeparator',
                      key: 'GoodsSi',
                      props: {
                        label: `Goods in Trust/Commission consisting (${this.commonDetails[0].Currency})`,
                        required: false,
                        placeholder: "",
                        options: [
                        ],
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'commaSeparator',
                      key: 'FurnitureSi',
                      props: {
                        label: `Furniture Fixtures and Fittings (${this.commonDetails[0].Currency})`,
                        required: false,
                        placeholder: "",
                        options: [
                        ],
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'commaSeparator',
                      key: 'ApplianceSi',
                      props: {
                        label: `Business Plan & Appliances (${this.commonDetails[0].Currency})`,
                        required: false,
                        placeholder: "",
                        options: [
                        ],
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'commaSeparator',
                      key: 'CashValueablesSi',
                      props: {
                        label: `Cash or Valuables secured in Locked safe (${this.commonDetails[0].Currency})`,
                        required: false,
                        placeholder: "",
                        options: [
                        ],
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'FirstLossPercentId',
                      props: {
                        label: 'Loss(%)',
                        placeholder: "Select Maximum Chance Of Loss",
                        required: true,
                        options: [
                        ],
                      },
                      validation: {

                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'Address',
                      props: {
                        label: 'Address',
                        required: false,
                        maxLength: 100,
                        options: [
                        ],
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'RegionCode',
                      props: {
                        label: 'Region',
                        required: false,
                        options: []
                      },
                      expressions: {

                      },
                      hooks: {
                        onInit: (field: FormlyFieldConfig) => {
                          field.formControl.valueChanges.subscribe(() => {
                            this.ongetDistrictList('change')
                          });
                        },
                      },
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'DistrictCode',
                      props: {
                        label: 'District',
                        required: false,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      key: 'BuildingOwnerYn',
                      type: 'radio',
                      templateOptions: {
                        type: 'radio',
                        label: 'Do You Rent Or Own Home ?',
                        required: true,
                        disabled: this.checkDisable('BuildingOwnerYn'),
                        name: 'BuildingOwnerYn',
                        options: [{ value: 'N', label: 'I Rent Home' }, { value: 'Y', label: 'I Own Home' }],
                      }
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'BuildingBuildYear',
                      props: {
                        label: 'Built Construction Year',
                        placeholder: "YYYY",
                        required: false,
                        maxLength: 4,
                        pattern: /[0-9]+/gm,
                        disabled: this.checkDisable('BuildingBuildYear'),
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'OccupiedYear',
                      props: {
                        label: 'Occupied From(Year)',
                        placeholder: "YYYY",
                        required: false,
                        maxLength: 4,
                        pattern: /[0-9]+/gm,
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'WatchmanGuardHours',
                      props: {
                        label: 'Watchman Guard Premises(Hours)',
                        placeholder: "00",
                        required: false,
                        maxLength: 2,
                        pattern: /[0-9]+/gm,
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },

                  ]
                }
              ]
            },
            {
              props: { label: 'Doors & Windows in premises' },
              fieldGroup: [
                {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'AccessibleWindows',
                      props: {
                        label: 'Accessible Windows',
                        placeholder: "00",
                        required: false,
                        maxLength: 2,
                        pattern: /[0-9]+/gm,
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'ShowWindow',
                      props: {
                        label: 'Show Windows',
                        placeholder: "00",
                        required: false,
                        maxLength: 2,
                        pattern: /[0-9]+/gm,
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'FrontDoors',
                      props: {
                        label: 'Front Door',
                        placeholder: "00",
                        required: false,
                        maxLength: 2,
                        pattern: /[0-9]+/gm,
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'BackDoors',
                      props: {
                        label: 'Back Door',
                        placeholder: "00",
                        required: false,
                        maxLength: 2,
                        pattern: /[0-9]+/gm,
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'input',
                      key: 'TrapDoors',
                      props: {
                        label: 'Skylights and Trap Doors',
                        placeholder: "00",
                        required: false,
                        maxLength: 2,
                        pattern: /[0-9]+/gm,
                        options: [
                        ],
                      },
                      validation: {
                        messages: {
                          pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                        },
                      },
                      expressions: {

                      },
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'WindowsMaterialId',
                      props: {
                        label: 'Windows Construction Material',
                        required: true,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'DoorsMaterialId',
                      props: {
                        label: 'Doors Construction Material',
                        required: true,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'NightLeftDoor',
                      props: {
                        label: 'In Night by which door are the premises Left',
                        required: true,
                        options: []
                      },
                      expressions: {

                      }
                    },
                    {
                      className: 'col-6',
                      type: 'select',
                      key: 'BuildingOccupied',
                      props: {
                        label: 'Building occupied',
                        required: true,
                        options: []
                      },
                      expressions: {

                      }
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
      this.getNatureTradeList();
      this.getIndustryTypeList();
      this.getInsuranceForList();
      this.getWallMaterialList();
        this.buglaryloss();
      this.getRoofMaterialList();
      this.getCeilingMaterialList();
      this.getRegionList();
      this.getWindowConsMaterialList();
      this.getDoorsMaterilalList(); this.getNightLeftDoorList(); this.getBuildingOccupiedList();
    }



    this.BenifitList = [
      { Code: 1, CodeDescription: '12 Months' },
      { Code: 2, CodeDescription: '24 Months' },
      { Code: 3, CodeDescription: '36 Months' },
    ];


    this.getUWDetails()

    if (this.productId == '19') this.getIndustryList();
    if (this.productId == '32') {
      this.getIndustryTypeList();
      this.getEmployeeCountList();
      this.getAudientTypeList();
      this.getSumInsuredList()
    }
  }
  onChangeOwnerType(type) {
    this.coversRequired = 'C';
    this.checkDomesticForm(type);
  }
  checkDomesticForm(type) {
    let sectionList = [];
    if (this.coversRequired != null) {
      if (type != 'change') {
        let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        if (referenceNo) {
          this.requestReferenceNo = referenceNo;
          this.setSMEFormValues(type)
        }
        else {
          this.productItem.BuildingBuildYear = '';
          this.productItem.BuildingOwnerYn = 'Y';

          if (this.productId == '3') this.setDomesticForm('create', type);
          else if (this.productId == '19') this.setSMEForm('create', type);
        }
      }
      else {
        if (this.coversRequired == 'C') this.productItem.BuildingSuminsured = null;
        else if (this.coversRequired == 'B') this.productItem.ContentSuminsured = null;
        if (this.productId == '3') this.setDomesticForm('edit', type);
        else if (this.productId == '19') this.setSMEForm('edit', type);
      }


    }
  }
  setSMEForm(type, mode) {
    this.fields = [
      {
        type: 'tabs',
        fieldGroup: [
          // {
          //   props: { label: 'Fire And Allied Perils' },

          //   fieldGroupClassName: 'row',
          //   fieldGroup: [
          //     {
          //       className: 'col-6',
          //       key: 'BuildingOwnerYn',
          //       type: 'radio',
          //       templateOptions: {
          //         type: 'radio',
          //         label: 'Do You Rent Or Own Home ?',
          //         required: true,
          //         disabled: this.checkDisable('BuildingOwnerYn'),
          //         name: 'BuildingOwnerYn',
          //         options: [{ value: 'N', label: 'I Rent Home' }, { value: 'Y', label: 'I Own Home' }],
          //       }
          //     },
          //     {
          //       className: 'offset-2 col-7',
          //       key: 'IndustryId',
          //       type: 'select',
          //       props: {
          //         label: 'Industry',
          //         required: true,
          //         disabled: this.checkDisable('IndustryId'),
          //         options: [],
          //       },
          //     },
          //     {
          //       className: 'offset-2 col-7',
          //       type: 'commaSeparator',
          //       key: 'BuildingSuminsured',
          //       templateOptions: {
          //         label: `Building Sum Insured (${this.commonDetails[0].Currency})`,
          //         required: true,
          //       },
          //       validators: {
          //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
          //       },
          //       hooks: {
          //       },

          //       expressions: {
          //         disabled: this.checkDisable('BuildingSuminsured'),
          //       },
          //     },
          //   ]
          // },
          // {
          //   props: { label: 'Content' },
          //   fieldGroup: [
          //     {
          //       fieldGroupClassName: 'row',
          //       fieldGroup: [
          //         {
          //           className: 'offset-2 col-7',
          //           type: 'commaSeparator',
          //           key: 'ContentSuminsured',
          //           templateOptions: {
          //             label: `House Hold Content (${this.commonDetails[0].Currency})`,
          //             required: true,
          //           },
          //           validators: {
          //             validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
          //           },
          //           hooks: {
          //           },
          //           expressions: {
          //             disabled: this.checkDisable('ContentSuminsured'),
          //           },
          //         },
          //       ]
          //     },
          //   ],
          // },
          {
            props: { label: 'All Risk' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'AllRiskSumInsured',
                    templateOptions: {
                      label: `All Risk Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
                    expressions: {
                      disabled: this.checkDisable('AllRiskSumInsured'),
                    },
                  },
                ]
              },
    
            ],
          },
          {
            props: { label: 'Eelectronic Equipments' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'ElecEquipSuminsured',
                    templateOptions: {
                      label: `Electronic Equipment Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('ElecEquipSuminsured'),
                    },
                  },
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Employers Liablity' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'select',
                    key: 'TotalNoOfEmployees',
                    props: {
                      label: 'Empolyees Count',
                      disabled: this.checkDisable('TotalNoOfEmployees'),
                      required: true,
                      options: [
                      ],
                    },
                    expressions: {
    
                    },
                  },
    
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'EmpLiabilitySi',
                    templateOptions: {
                      label: `Employees Total Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('EmpLiabilitySi'),
                    },
                  },
    
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Fidelity Guaranty' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'select',
                    key: 'FidEmpCount',
                    props: {
                      label: 'Fidelity Empolyees Count',
                      disabled: this.checkDisable('FidEmpCount'),
                      required: true,
                      options: [
                      ],
                    },
                    expressions: {
    
                    },
                  },
    
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'FidEmpSi',
                    templateOptions: {
                      label: `Fidelity Employees Total Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
    
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('FidEmpSi'),
                    },
                  },
    
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Accidental Damage' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'AccDamageSi',
                    templateOptions: {
                      label: `Accidental Damage Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
    
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('AccDamageSi'),
                    },
                  },
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Burglary  and House breaking' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'BurglarySi',
                    templateOptions: {
                      label: `Burglary Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('BurglarySi'),
                    },
                  },
    
                  {
                    className: 'offset-2 col-7',
                    type: 'select',
                    key: 'FirstLossPercentId',
                    props: {
                      label: 'FirstLoss Percent',
                      disabled: this.checkDisable('FirstLossPercentId'),
                      required: true,
                      options: [
                      ],
                    },
                    expressions: {
    
                    },
                  },
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Marchery BreakDown' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'PowerPlantSi',
                    templateOptions: {
                      label: `Power Plant Suminsured (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('PowerPlantSi'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'ElecMachinesSi',
                    templateOptions: {
                      label: `Electrical Machines Suminsured (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('ElecMachinesSi'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'EquipmentSi',
                    templateOptions: {
                      label: `Equipments Suminsured (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('EquipmentSi'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'MachineEquipSi',
                    templateOptions: {
                      label: `Elelctronic Equipment Suminsured (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('MachineEquipSi'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'GeneralMachineSi',
                    templateOptions: {
                      label: `General Machines Suminsured (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('GeneralMachineSi'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'ManuUnitsSi',
                    templateOptions: {
                      label: `Manufacturing Units Suminsured (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('ManuUnitsSi'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'BoilerPlantsSi',
                    templateOptions: {
                      label: `Boiler And Pressur Plants  Suminsured (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('BoilerPlantsSi'),
                    },
                  },
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Money' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'MoneyInSafeBusiness',
                    templateOptions: {
                      label: `Money In Safe During Working Hours (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('MoneyInSafeBusiness'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'MoneyOutSafeBusiness',
                    templateOptions: {
                      label: `Money In Safe Outside Working Hours (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('MoneyOutSafeBusiness'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'MoneyInPremises',
                    templateOptions: {
                      label: `Money In Residence Of Director And Partner (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('MoneyInPremises'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'CashInTransit',
                    templateOptions: {
                      label: `Cash In Transit Limit (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('CashInTransit'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'CashInHandEmployees',
                    templateOptions: {
                      label: `Money in Custody Of Collectors (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('CashInHandEmployees'),
                    },
                  },
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'CashInSafe',
                    templateOptions: {
                      label: `Money - Value Of Safe (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('CashInSafe'),
                    },
                  },
    
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'MoneyAnnualcarrySuminsured',
                    templateOptions: {
                      label: `Estimated Annual Cash Carrying (${this.commonDetails[0].Currency})`,
    
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('MoneyAnnualcarrySuminsured'),
                    },
                  },
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Plate Glass' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'PlateGlassSi',
                    templateOptions: {
                      label: `Plate Glass Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('PlateGlassSi'),
                    },
                  },
    
                ]
              },
    
            ],
          },
          {
            props: { label: 'Public Liability' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'offset-2 col-7',
                    type: 'commaSeparator',
                    key: 'LiabilitySi',
                    templateOptions: {
                      label: `Public Liability Suminsured (${this.commonDetails[0].Currency})`,
                      required: true,
                    },
                    validators: {
                      validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    },
                    hooks: {
                    },
    
                    expressions: {
                      disabled: this.checkDisable('LiabilitySi'),
                    },
                  },
    
                ]
              },
    
            ],
          },
        ],
      }
    ];
  // this.fields = [
  //   {
  //     type: 'stepper',
  //     fieldGroup: [
  //       {
  //         props: { label: 'Breakdown of equipment' },
  //         fieldGroup: [
  //           {
  //             fieldGroupClassName: 'row',
  //             fieldGroup: [
  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'ElecEquipSuminsured',
  //                 props: {
  //                   label: `Electronic Equipment Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('ElecEquipSuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         props: { label: 'Money Risk (Cash/Cheque)' },
  //         fieldGroup: [
  //           {
  //             fieldGroupClassName: 'row',
  //             fieldGroup: [
  //               {
  //                 className: 'col-6',
  //                 type: 'commaSeparator',
  //                 key: 'CashInTransit',
  //                 props: {
  //                   label: 'Money In Transit Limit',
  //                   placeholder: "",
  //                   required: true,
  //                   maxLength: 20,
  //                   pattern: /[0-9]+/gm,
  //                   disabled: this.checkDisable('CashInTransit'),
  //                   options: [
  //                   ],
  //                 },
  //                 validation: {
  //                   messages: {
  //                     pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
  //                   },
  //                 },
  //                 expressions: {

  //                 },
  //               },
  //               {
  //                 className: 'col-6',
  //                 type: 'commaSeparator',
  //                 key: 'CashInHandEmployees',
  //                 props: {
  //                   label: 'Money in Custody Of Collectors',
  //                   placeholder: "",
  //                   required: true,
  //                   maxLength: 40,
  //                   pattern: /[0-9]+/gm,
  //                   disabled: this.checkDisable('CashInHandEmployees'),
  //                   options: [
  //                   ],
  //                 },
  //                 validation: {
  //                   messages: {
  //                     pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
  //                   },
  //                 },
  //                 expressions: {

  //                 },
  //               },
  //               {
  //                 className: 'col-6',
  //                 type: 'commaSeparator',
  //                 key: 'CashInSafe',
  //                 props: {
  //                   label: 'Money in Safe',
  //                   placeholder: "",
  //                   required: true,
  //                   maxLength: 20,
  //                   pattern: /[0-9]+/gm,
  //                   disabled: this.checkDisable('CashInSafe'),
  //                   options: [
  //                   ],
  //                 },
  //                 validation: {
  //                   messages: {
  //                     pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
  //                   },
  //                 },
  //                 expressions: {

  //                 },
  //               },
  //               {
  //                 className: 'col-6',
  //                 type: 'commaSeparator',
  //                 key: 'MoneyAnnualcarrySuminsured',
  //                 props: {
  //                   label: `Annual Carrying SumInsured`,
  //                   disabled: this.checkDisable('MoneyAnnualcarrySuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'col-6',
  //                 type: 'commaSeparator',
  //                 key: 'MoneyInSafeBusiness',
  //                 props: {
  //                   label: 'Money In Safe During Business Hours',
  //                   placeholder: "",
  //                   required: true,
  //                   maxLength: 40,
  //                   pattern: /[0-9]+/gm,
  //                   disabled: this.checkDisable('MoneyInSafeBusiness'),
  //                   options: [
  //                   ],
  //                 },
  //                 validation: {
  //                   messages: {
  //                     pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
  //                   },
  //                 },
  //                 expressions: {

  //                 },
  //               },
  //               {
  //                 className: 'col-6',
  //                 type: 'commaSeparator',
  //                 key: 'MoneyOutSafeBusiness',
  //                 props: {
  //                   label: 'Money in Safe After Business Hours',
  //                   placeholder: "",
  //                   required: true,
  //                   maxLength: 20,
  //                   pattern: /[0-9]+/gm,
  //                   disabled: this.checkDisable('MoneyOutSafeBusiness'),
  //                   options: [
  //                   ],
  //                 },
  //                 validation: {
  //                   messages: {
  //                     pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
  //                   },
  //                 },
  //                 expressions: {

  //                 },
  //               },
  //               {
  //                 className: 'col-6',
  //                 type: 'commaSeparator',
  //                 key: 'MoneyInPremises',
  //                 props: {
  //                   label: 'Money in residence of director & partner',
  //                   placeholder: "",
  //                   required: true,
  //                   maxLength: 40,
  //                   pattern: /[0-9]+/gm,
  //                   disabled: this.checkDisable('MoneyInPremises'),
  //                   options: [
  //                   ],
  //                 },
  //                 validation: {
  //                   messages: {
  //                     pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
  //                   },
  //                 },
  //                 expressions: {

  //                 },
  //               }
  //             ]
  //           }
  //         ]
  //       },

  //       {
  //         props: { label: 'Fidelity Guarantee' },
  //         fieldGroup: [
  //           {
  //             fieldGroupClassName: 'row',
  //             fieldGroup: [

  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'FidelityAnyoccuSuminsured',
  //                 props: {
  //                   label: `AnyOne Occurance Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('FidelityAnyoccuSuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {

  //                 },
  //               },
  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'FidelityAnnualSuminsured',
  //                 props: {
  //                   label: `Annual Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('FidelityAnnualSuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {

  //                 },
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         props: { label: 'Liability' },
  //         fieldGroup: [
  //           {
  //             fieldGroupClassName: 'row',
  //             fieldGroup: [
  //               // {
  //               //   className: 'offset-2 col-7',
  //               //   key: 'LiabilityYN',
  //               //   type: 'radio',
  //               //   props: {
  //               //   label: 'Liability Cover Required?',
  //               //   required: false,
  //               //   options: [
  //               //     {
  //               //       "label": "Yes",
  //               //       "value": 'Yes'
  //               //     },
  //               //     {
  //               //       "label": "No",
  //               //       "value": "No"
  //               //     }
  //               //   ],
  //               //   },
  //               // },
  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'TpliabilityAnyoccuSuminsured',
  //                 props: {
  //                   label: `TPL AnyOne Occurence Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('TpliabilityAnyoccuSuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         props: { label: 'WC/EL' },
  //         fieldGroup: [
  //           {
  //             fieldGroupClassName: 'row',
  //             fieldGroup: [
  //               // {
  //               //   className: 'offset-2 col-7',
  //               //   key: 'WcYN',
  //               //   type: 'radio',
  //               //   props: {
  //               //   label: 'Workmen Compensation / Employers Liability Cover Required?',
  //               //   required: false,
  //               //   options: [
  //               //     {
  //               //       "label": "Yes",
  //               //       "value": 'Yes'
  //               //     },
  //               //     {
  //               //       "label": "No",
  //               //       "value": "No"
  //               //     }
  //               //   ],
  //               //   },
  //               // },
  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'EmpliabilityExcessSuminsured',
  //                 props: {
  //                   label: `Employer's Excess Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('EmpliabilityExcessSuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'EmpliabilityAnnualSuminsured',
  //                 props: {
  //                   label: `Employer's Annual Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('EmpliabilityAnnualSuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         props: { label: 'Goods In Transit' },
  //         fieldGroup: [
  //           {
  //             fieldGroupClassName: 'row',
  //             fieldGroup: [
  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'GoodsSinglecarrySuminsured',
  //                 props: {
  //                   label: `Goods Single Carry Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('GoodsSinglecarrySuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               },
  //               {
  //                 className: 'offset-2 col-7',
  //                 type: 'commaSeparator',
  //                 key: 'GoodsTurnoverSuminsured',
  //                 props: {
  //                   label: `Goods Turn Over Sum insured (${this.commonDetails[0].Currency})`,
  //                   disabled: this.checkDisable('GoodsTurnoverSuminsured'),
  //                   required: true,
  //                   options: [

  //                   ],

  //                 },
  //                 validators: {
  //                   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
  //                 },
  //                 hooks: {
  //                 },
  //                 expressions: {
  //                 },
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  if(this.coversRequired== 'BC') {
  let entry = [
    {
      props: { label: 'Fire Risk' },
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            // {
            //   className: 'offset-2 col-7',
            //   key: 'CategoryId',
            //   type: 'select',
            //   props: {
            //     label: 'Category',
            //     disabled: this.checkDisable('CategoryId'),
            //     required: true,
            //     options: []

            //   },
            //   hooks: {
            //     onInit: (field) => field.formControl.valueChanges.pipe(
            //       tap(value => this.getIndustryList()),
            //     )
            //   }
            // },
            // {
            //   className: 'offset-2 col-7',
            //   key: 'IndustryId',
            //   type: 'select',
            //   props: {
            //     label: 'Industry',
            //     required: true,
            //     disabled: this.checkDisable('IndustryId'),
            //     options: [],
            //   },
            // },
            {
              className: 'offset-2 col-7',
              type: 'commaSeparator',
              key: 'BuildingSuminsured',

              props: {
                label: `Building Value (${this.commonDetails[0].Currency})`,
                disabled: this.checkDisable('BuildingSuminsured'),
                required: true,
                options: [

                ],

              },
              validators: {
                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
              },
              hooks: {
              },
              expressions: {
              },
            },

          ]
        }
      ]
    },
    {
      props: { label: 'HouseHold Contents Risk' },
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'offset-2 col-7',
              type: 'commaSeparator',
              key: 'ContentSuminsured',

              props: {
                label: `Contents Value (${this.commonDetails[0].Currency})`,
                disabled: this.checkDisable('ContentSuminsured'),
                required: true,
                options: [

                ],

              },
              validators: {
                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
              },
              hooks: {
              },
              expressions: {
              },
            },
          ]
        }
      ]
    },
  ]
  this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
}
  else if (this.coversRequired == 'B') {
  let entry = [
    {
      props: { label: 'Fire Risk' },
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            // {
            //   className: 'offset-2 col-7',
            //   key: 'CategoryId',
            //   type: 'select',
            //   props: {
            //     label: 'Category',
            //     disabled: this.checkDisable('CategoryId'),
            //     required: true,
            //     options: []

            //   },
            //   hooks: {
            //     onInit: (field) => field.formControl.valueChanges.pipe(
            //       tap(value => this.getIndustryList()),
            //     )
            //   }
            // },
            // {
            //   className: 'offset-2 col-7',
            //   key: 'IndustryId',
            //   type: 'select',
            //   props: {
            //     label: 'Industry',
            //     required: true,
            //     disabled: this.checkDisable('IndustryId'),
            //     options: [],
            //   },
            // },
            {
              className: 'offset-2 col-7',
              type: 'commaSeparator',
              key: 'BuildingSuminsured',

              props: {
                label: `Building Value (${this.commonDetails[0].Currency})`,
                disabled: this.checkDisable('BuildingSuminsured'),
                required: true,
                options: [

                ],

              },
              validators: {
                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
              },
              hooks: {
              },
              expressions: {
              },
            },

          ]
        }
      ]
    }
  ]
  this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
}
else if (this.coversRequired == 'C') {
  let entry = [
    {
      props: { label: 'HouseHold Contents Risk' },
      fieldGroup: [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              className: 'offset-2 col-7',
              type: 'commaSeparator',
              key: 'ContentSuminsured',

              props: {
                label: `Contents Value (${this.commonDetails[0].Currency})`,
                disabled: this.checkDisable('ContentSuminsured'),
                required: true,
                options: [

                ],

              },
              validators: {
                validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
              },
              hooks: {
              },
              expressions: {
              },
            },
          ]
        }
      ]
    },
  ]
  this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)

}
if (type == 'create' || mode == 'change') { this.formSection = true; this.viewSection = false; }
else { this.formSection = false; this.viewSection = true; }
}
setDomesticForm(type, mode){
  this.fields = [
    {
      type: 'stepper',
      fieldGroup: [
        {
          props: { label: 'All Risk' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'AllriskSumInsured',

                  props: {
                    label: `Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('AllriskSumInsured'),
                    required: true,
                    options: [

                    ],

                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            }
          ]
        },
        {
          props: { label: 'Personal Accident' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'OccupationType',
                  props: {
                    label: 'Occupation',
                    required: true,
                    disabled: this.checkDisable('OccupationType'),
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'PersonalAccidentSuminsured',
                  props: {
                    label: `Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('PersonalAccidentSuminsured'),
                    required: true,
                    options: [

                    ],

                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            }
          ]
        },
        {
          props: { label: 'Personal Liability' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6',
                  type: 'select',
                  key: 'LiabilityOccupationId',
                  props: {
                    label: 'Occupation',
                    required: true,
                    disabled: this.checkDisable('OccupationType'),
                    options: [
                    ],
                  },
                  expressions: {

                  },
                },
                {
                  className: 'col-6',
                  type: 'commaSeparator',
                  key: 'PersonalIntermediarySuminsured',

                  props: {
                    label: `Sum Insured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('PersonalIntermediarySuminsured'),
                    required: true,
                    options: [

                    ],

                  },
                  validators: {
                  },
                  hooks: {
                  },
                  expressions: {
                  },
                },
              ]
            }
          ]
        },
      ]
    }
  ];
  if (this.coversRequired == 'C') {
    let entry = [
      {
        props: { label: 'House Hold Content Risk' },
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-6',
                type: 'commaSeparator',
                key: 'ContentSuminsured',

                props: {
                  label: `HouseHold Content Sum Insured (${this.commonDetails[0].Currency})`,
                  disabled: this.checkDisable('ContentSuminsured'),
                  required: false,
                  options: [

                  ],

                },
                validators: {
                },
                hooks: {
                },
                expressions: {
                },
              },
            ]
          }
        ]
      }
    ]
    this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
    this.productItem.BuildingUsageId = '';
    this.productItem.BuildingBuildYear = null;
    this.productItem.WallType = '';
    this.productItem.RoofType = '';
    this.productItem.BuildingSuminsured = 0;
  }
  if (this.coversRequired == 'BC') {
    let entry = [
      {
        props: { label: 'Building Risk' },

        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              // {
              //   className: 'col-6',
              //   key: 'BuildingOwnerYn',
              //   type: 'radio',
              //   templateOptions: {
              //     type: 'radio',
              //     label: 'Do You Rent Or Own Home ?',
              //     required: true,
              //     disabled: this.checkDisable('BuildingOwnerYn'),
              //     name: 'BuildingOwnerYn',
              //     options: [{ value: 'N', label: 'I Rent Home' }, { value: 'Y', label: 'I Own Home' }],
              //   }
              // },
              {
                className: 'col-6',
                type: 'select',
                key: 'BuildingUsageId',
                props: {
                  label: 'Building Usage',
                  //hideExpression: "model.BuildingOwnerYn =='N'",
                  disabled: this.checkDisable('BuildingUsageId'),
                  required: true,
                  options: [
                  ],
                },
                expressions: {

                },
              },
              {
                className: 'col-6',
                type: 'input',
                key: 'BuildingBuildYear',
                props: {
                  label: 'Built Year',
                  placeholder: "YYYY",
                  required: false,
                  maxLength: 4,
                  pattern: /[0-9]+/gm,
                  disabled: this.checkDisable('BuildingBuildYear'),
                  options: [
                  ],
                },
                validation: {
                  messages: {
                    pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                  },
                },
                expressions: {

                },
              },
              {
                className: 'col-6',
                type: 'select',
                key: 'WallType',
                props: {
                  label: 'Used Contruction Materials (Wall)',
                  disabled: this.checkDisable('WallType'),
                  required: false,
                  options: [
                  ],
                },
                expressions: {

                },
              },
              {
                className: 'col-6',
                type: 'select',
                key: 'RoofType',
                props: {
                  label: 'Used Contruction Materials (Roof)',
                  disabled: this.checkDisable('RoofType'),
                  required: false,
                  options: [
                  ],
                },
                expressions: {

                },
              },
              // {
              //   className: 'col-6',
              //   key: 'OutbuildConstructType',
              //   type: 'radio',
              //   templateOptions: {
              //     type: 'radio',
              //     label: 'How Are The Outbuildings (if any) Constructed?',
              //     required: true,
              //     disabled: this.checkDisable('OutbuildConstructType'),
              //     name: 'OutbuildConstructType',
              //     options: [{ value: 'W', label: 'Wall' }, { value: 'R', label: 'Roof' }]
              //   }
              // },

              // {
              //   className: 'col-6',
              //   type: 'number',
              //   key: 'BuildingFloors',
              //   props: {
              //   label: 'What Is its Height In Storeys?',
              //   disabled: this.checkDisable('BuildingFloors'),
              //   required: false,
              //   options: [

              //   ],
              //   },
              //   validators: {
              //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
              //   },
              //   expressions: {
              //     hide: "model.InbuildConstructType != 'W'",
              //   },
              // },

              {
                className: 'col-6',
                type: 'commaSeparator',
                key: 'BuildingSuminsured',
                templateOptions: {
                  label: `Building Sum Insured (${this.commonDetails[0].Currency})`,

                },
                validators: {
                },
                hooks: {

                },

                expressions: {
                  disabled: this.checkDisable('BuildingSuminsured'),
                },
              }

            ]
          }
        ]
      },
      {
        props: { label: 'House Hold Content Risk' },
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-6',
                type: 'commaSeparator',
                key: 'ContentSuminsured',

                props: {
                  label: `HouseHold Content Sum Insured (${this.commonDetails[0].Currency})`,
                  disabled: this.checkDisable('ContentSuminsured'),
                  required: false,
                  options: [

                  ],

                },
                validators: {
                },
                hooks: {
                },
                expressions: {
                },
              },
            ]
          }
        ]
      }
    ]
    this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
  }
  if (this.coversRequired == 'B') {
    this.productItem.ContentSuminsured = '0';
    let entry = [
      {
        props: { label: 'Building Risk' },

        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              // {
              //   className: 'col-6',
              //   key: 'BuildingOwnerYn',
              //   type: 'radio',
              //   templateOptions: {
              //     type: 'radio',
              //     label: 'Do You Rent Or Own Home ?',
              //     required: true,
              //     disabled: this.checkDisable('BuildingOwnerYn'),
              //     name: 'BuildingOwnerYn',
              //     options: [{ value: 'N', label: 'I Rent Home' }, { value: 'Y', label: 'I Own Home' }],
              //   }
              // },
              {
                className: 'col-6',
                type: 'select',
                key: 'BuildingUsageId',
                props: {
                  label: 'Building Usage',
                  //hideExpression: "model.BuildingOwnerYn =='N'",
                  disabled: this.checkDisable('BuildingUsageId'),
                  required: true,
                  options: [
                  ],
                },
                expressions: {

                },
              },
              {
                className: 'col-6',
                type: 'input',
                key: 'BuildingBuildYear',
                props: {
                  label: 'Built Year',
                  placeholder: "YYYY",
                  required: false,
                  maxLength: 4,
                  pattern: /[0-9]+/gm,
                  disabled: this.checkDisable('BuildingBuildYear'),
                  options: [
                  ],
                },
                validation: {
                  messages: {
                    pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                  },
                },
                expressions: {

                },
              },
              {
                className: 'col-6',
                type: 'select',
                key: 'WallType',
                props: {
                  label: 'Used Contruction Materials (Wall)',
                  disabled: this.checkDisable('WallType'),
                  required: false,
                  options: [
                  ],
                },
                expressions: {

                },
              },
              {
                className: 'col-6',
                type: 'select',
                key: 'RoofType',
                props: {
                  label: 'Used Contruction Materials (Roof)',
                  disabled: this.checkDisable('RoofType'),
                  required: false,
                  options: [
                  ],
                },
                expressions: {

                },
              },
              // {
              //   className: 'col-6',
              //   key: 'OutbuildConstructType',
              //   type: 'radio',
              //   templateOptions: {
              //     type: 'radio',
              //     label: 'How Are The Outbuildings (if any) Constructed?',
              //     required: true,
              //     disabled: this.checkDisable('OutbuildConstructType'),
              //     name: 'OutbuildConstructType',
              //     options: [{ value: 'W', label: 'Wall' }, { value: 'R', label: 'Roof' }]
              //   }
              // },

              // {
              //   className: 'col-6',
              //   type: 'number',
              //   key: 'BuildingFloors',
              //   props: {
              //   label: 'What Is its Height In Storeys?',
              //   disabled: this.checkDisable('BuildingFloors'),
              //   required: false,
              //   options: [

              //   ],
              //   },
              //   validators: {
              //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
              //   },
              //   expressions: {
              //     hide: "model.InbuildConstructType != 'W'",
              //   },
              // },

              {
                className: 'col-6',
                type: 'commaSeparator',
                key: 'BuildingSuminsured',
                templateOptions: {
                  label: `Building Sum Insured (${this.commonDetails[0].Currency})`,

                },
                validators: {
                },
                hooks: {

                },

                expressions: {
                  disabled: this.checkDisable('BuildingSuminsured'),
                },
              }

            ]
          }
        ]
      }
    ]
    this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
  }
  if (this.productId == '3') {
    this.getOccupationList();
    this.getWallMaterialList();
    this.getRoofMaterialList();
    this.getbuildingpurposeList();
  }

  if(this.productId =='1'){
    this.buglaryloss();
  }

  

  if (type == 'create' || mode == 'change') { this.formSection = true; this.viewSection = false; }
  else { this.formSection = false; this.viewSection = true; }
}
getWallMaterialList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/walltypes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        let defaultObj = [{ 'label': '-Select-', 'value': '' }]
        this.wallMaterialList = data.Result;
        for (let i = 0; i < this.wallMaterialList.length; i++) {
          this.wallMaterialList[i].label = this.wallMaterialList[i]['CodeDesc'];
          this.wallMaterialList[i].value = this.wallMaterialList[i]['Code'];
          delete this.wallMaterialList[i].CodeDesc;
          if (i == this.wallMaterialList.length - 1) {
            if (this.productId == '1') {
              this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.wallMaterialList);
              this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].props.options = defaultObj.concat(this.wallMaterialList);
            }
            else this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.wallMaterialList);
          }
        }
      }
    },
    (err) => { },
  );
}
getRoofMaterialList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/rooftypes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        if (res.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.roofMaterialList = data.Result;
          for (let i = 0; i < this.roofMaterialList.length; i++) {
            this.roofMaterialList[i].label = this.roofMaterialList[i]['CodeDesc'];
            this.roofMaterialList[i].value = this.roofMaterialList[i]['Code'];
            delete this.roofMaterialList[i].CodeDesc;
            if (i == this.roofMaterialList.length - 1) {
              if (this.productId == '1') {
                this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.roofMaterialList);
              }
              else this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
            }
          }
        }
      }
    },
    (err) => { },
  );
}
getCeilingMaterialList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/ceilingtype`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        if (res.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.ceilingMaterialList = data.Result;
          for (let i = 0; i < this.ceilingMaterialList.length; i++) {
            this.ceilingMaterialList[i].label = this.ceilingMaterialList[i]['CodeDesc'];
            this.ceilingMaterialList[i].value = this.ceilingMaterialList[i]['Code'];
            delete this.ceilingMaterialList[i].CodeDesc;
            if (i == this.ceilingMaterialList.length - 1) {
              this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.ceilingMaterialList);

            }
          }
        }
      }
    },
    (err) => { },
  );
}
getRegionList() {
  let ReqObj = {
    "CountryId": 'TZA'
  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.regionList = data.Result;
        if (data.Result.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.regionList = data.Result;
          for (let i = 0; i < this.regionList.length; i++) {
            this.regionList[i].label = this.regionList[i]['CodeDesc'];
            this.regionList[i].value = this.regionList[i]['Code'];
            delete this.regionList[i].CodeDesc;
            if (i == this.regionList.length - 1) {
              this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.regionList);

            }
          }
        }
      }
    },
    (err) => { },
  );
}
getWindowConsMaterialList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/windowsmaterials`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        if (res.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.windowMaterialList = data.Result;
          for (let i = 0; i < this.windowMaterialList.length; i++) {
            this.windowMaterialList[i].label = this.windowMaterialList[i]['CodeDesc'];
            this.windowMaterialList[i].value = this.windowMaterialList[i]['Code'];
            delete this.windowMaterialList[i].CodeDesc;
            if (i == this.windowMaterialList.length - 1) {
              this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.windowMaterialList);

            }
          }
        }
      }
    },
    (err) => { },
  );
}
getDoorsMaterilalList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/doorsmaterials`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        if (res.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.doorsMaterialList = data.Result;
          for (let i = 0; i < this.doorsMaterialList.length; i++) {
            this.doorsMaterialList[i].label = this.doorsMaterialList[i]['CodeDesc'];
            this.doorsMaterialList[i].value = this.doorsMaterialList[i]['Code'];
            delete this.doorsMaterialList[i].CodeDesc;
            if (i == this.doorsMaterialList.length - 1) {
              this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.doorsMaterialList);

            }
          }
        }
      }
    },
    (err) => { },
  );
}
getNightLeftDoorList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/nightleftdoor`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        if (res.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.nightLeftDoors = data.Result;
          for (let i = 0; i < this.nightLeftDoors.length; i++) {
            this.nightLeftDoors[i].label = this.nightLeftDoors[i]['CodeDesc'];
            this.nightLeftDoors[i].value = this.nightLeftDoors[i]['Code'];
            delete this.nightLeftDoors[i].CodeDesc;
            if (i == this.nightLeftDoors.length - 1) {
              this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.nightLeftDoors);

            }
          }
        }
      }
    },
    (err) => { },
  );
}
getBuildingOccupiedList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/buildingoccupied`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        if (res.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.buildingOccupiedList = data.Result;
          for (let i = 0; i < this.buildingOccupiedList.length; i++) {
            this.buildingOccupiedList[i].label = this.buildingOccupiedList[i]['CodeDesc'];
            this.buildingOccupiedList[i].value = this.buildingOccupiedList[i]['Code'];
            delete this.buildingOccupiedList[i].CodeDesc;
            if (i == this.buildingOccupiedList.length - 1) {
              this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.buildingOccupiedList);

            }
          }
        }
      }
    },
    (err) => { },
  );
}
ongetDistrictList(type){
  let ReqObj = {
    "CountryId": 'TZA',
    "RegionCode": this.productItem.RegionCode
  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.stateList = data.Result;
        if (data.Result.length != 0) {
          let defaultObj = [{ 'label': '-Select-', 'value': '' }]
          this.stateList = data.Result;
          for (let i = 0; i < this.stateList.length; i++) {
            this.stateList[i].label = this.stateList[i]['CodeDesc'];
            this.stateList[i].value = this.stateList[i]['Code'];
            delete this.stateList[i].CodeDesc;
            if (i == this.stateList.length - 1) {
              this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.stateList);
              if (type == 'change') this.productItem.DistrictCode = '';
              let exist = this.stateList.some(ele => ele.value == this.productItem.DistrictCode);
            }
          }
        }
      }
    },
    (err) => { },
  );
}
getUWDetails() {
  // let branchCode = '';
  // if(this.userType!='Broker' && this.userType!='User'){
  //   branchCode = this.branchCode
  // }
  // else{
  //   branchCode = this.brokerbranchCode
  // }
  let ReqObj = {
    "Limit": "0",
    "Offset": "100",
    "ProductId": this.productId,
    "LoginId": this.loginId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}master/getactiveuwquestions`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        this.uwQuestionList = res;
        this.getEditUwQuestions();
      }
      else {
      }
    },
    (err) => { },
  );
}
getEditUwQuestions() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "LoginId": this.loginId,
    "RequestReferenceNo": this.requestReferenceNo,
    "VehicleId": "1"
  }
  let urlLink = `${this.commonApiUrl}api/getuwquestionsdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let uwList = data?.Result;
      if (uwList.length != 0) {
        let i = 0;
        for (let ques of uwList) {
          let entry = this.uwQuestionList.find(ele => ele.UwQuestionId == ques.UwQuestionId);
          if (entry) { entry.Value = ques.Value };
          i += 1;
          if (i == uwList.length) {

            console.log('vvvvvvvv', uwList)
            this.uwQuestionList.forEach(x => {
              if (x.QuestionType == '01') {
                console.log('gggggg', x.Value)
                x.Value = x.Value ? '' || x.Value : x.Value
              }

            });
            this.questionSection = true; console.log("Final UW List", this.uwQuestionList);
          }
        }
      }
      else {
        let i = 0
        for (let ques of this.uwQuestionList) {
          if (ques.QuestionType == '01') {
            ques.Value = 'N';
          }
          i += 1;
          if (i == this.uwQuestionList.length) { this.questionSection = true; console.log("Final UW List", this.uwQuestionList); }
        }
      }
    },
    (err) => { },
  );
}
getCategoryList() {
  let ReqObj = {
    "BranchCode": this.branchCode,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
  }
  let urlLink = `${this.commonApiUrl}dropdown/industrycategory`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      this.categoryList = data.Result;
      for (let i = 0; i < this.categoryList.length; i++) {
        this.categoryList[i].label = this.categoryList[i]['CodeDesc'];
        this.categoryList[i].value = this.categoryList[i]['Code'];
        delete this.categoryList[i].CodeDesc;
        if (i == this.categoryList.length - 1) {
          console.log("Fields Industry", this.fields)
          this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.categoryList);
          let referenceNo = sessionStorage.getItem('quoteReferenceNo');
          if (referenceNo) {
            this.requestReferenceNo = referenceNo;
            if (this.productId != '19' && this.productId != '3') this.setFormValues();
            else this.setSMEFormValues('edit')
          }
          else {
            if (this.productId != '19') {

              this.productItem = new ProductData();
              this.productItem.BuildingBuildYear = '';
              this.formSection = true; this.viewSection = false;
            }


          }
        }
      }
    },
    (err) => { },
  );
}
getProductBasedSchema(productId) {
  if (productId == '13') {
    this.http.get("./assets/json-schema/personalAccident.json").subscribe(data => {
      console.log("JSONNNNNN", data);
      let res: any = data;
      let schema = res.schema;
      this.model = res.model;
      this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
      console.log("Fields ", this.fields)
    })
    // this.http
    //   .get<any>(``)
    //   .pipe(
    //     tap(({ schema, model }) => {
    //       this.form = new FormGroup({});
    //       this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
    //       this.model = model;
    //     }),
    //   )
    //   .subscribe();

  }
}
onIndustryChange(){
  if (this.productId == '14' || this.productId == '15') {
    if (this.productItem.NatureOfBusinessId) {
      let entry = this.industryList.find(ele => ele.Code == this.productItem.NatureOfBusinessId);
      console.log("Selected Entry ", entry);
      if (entry) {
        this.categoryDesc = entry.CategoryDesc;
        this.productItem.CategoryId = entry.CategoryId;
      }

    }
  }
  else if (this.productItem.IndustryId) {
    let entry = this.industryList.find(ele => ele.Code == this.productItem.IndustryId);
    console.log("Selected Entry ", entry);
    if (entry) {
      this.categoryDesc = entry.CategoryDesc;
      this.productItem.CategoryId = entry.CategoryId;
    }

  }

}
getSIValue() {
  let salary = this.productItem?.SalaryPerAnnum;
  let benefits = this.productItem?.BenefitCoverMonth;
  let sumInsured = this.productItem?.SumInsured;
  if (salary != null && salary != '' && salary != undefined) {
    if (benefits != null && benefits != '' && benefits != undefined) {
      if (benefits == '12') {
        this.productItem.SumInsured = String(Number(salary) * 1);
        this.form.controls['SumInsured'].setValue(this.productItem.SumInsured)
      }
      else if (benefits == '24') {
        this.productItem.SumInsured = String(Number(salary) * 2);
        this.form.controls['SumInsured'].setValue(this.productItem.SumInsured)
      }
      else if (benefits == '36') {
        this.productItem.SumInsured = String(Number(salary) * 3);
        this.form.controls['SumInsured'].setValue(this.productItem.SumInsured)
      }
    }
  }
}
onChangeEvent(event, model) {
  console.log(event, model)
}
onAddVehicle(value) {
  //sessionStorage.setItem('vehicleType',value);
  // //this.updateComponent.resetVehicleTab();
  if (value == 'edit') {

    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }
  if (value == 'new') {
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }

}
getNatureTradeList(){
  this.natureTradeList = [];
  this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = [];
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/natureoftrade`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      this.natureTradeList = data.Result;
      for (let i = 0; i < this.natureTradeList.length; i++) {
        this.natureTradeList[i].label = this.natureTradeList[i]['CodeDesc'];
        this.natureTradeList[i].value = this.natureTradeList[i]['Code'];
        delete this.natureTradeList[i].CodeDesc;
        if (i == this.natureTradeList.length - 1) {
          this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.natureTradeList);
        }
      }
    },
    (err) => { },
  );
}
getIndustryTypeList(){
  this.industryTypeList = [];
  if (this.productId == '32') { this.fields[0].fieldGroup[0].fieldGroup[1].props.options = []; }
  else if (this.productId != '14' && this.productId != '15') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = [];
  let ReqObj = {
    "ProductId": this.productId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}master/dropdown/industry`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      let altObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
      this.industryTypeList = data.Result;
      if (this.productId != '14' && this.productId != '15') {
        for (let i = 0; i < this.industryTypeList.length; i++) {
          this.industryTypeList[i].label = this.industryTypeList[i]['CodeDesc'];
          this.industryTypeList[i].value = this.industryTypeList[i]['Code'];
          //delete this.industryTypeList[i].CodeDesc;
          if (i == this.industryTypeList.length - 1) {
            this.industryList = defaultObj.concat(this.industryList)
            console.log("Fields Industry", this.fields)
            if (this.productId == '32') {
              this.fields[0].fieldGroup[0].fieldGroup[1].props.options = this.industryTypeList;
            }
            else this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.industryTypeList;
          }
        }
      }
      else this.industryList = altObj.concat(this.industryTypeList)
    },
    (err) => { },
  );
}
getInsuranceForList(){

  this.insuranceForList = [];
  this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = [];
  let ReqObj = {
    "ProductId": this.productId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/burglaryinsurancefor`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      this.insuranceForList = data.Result;

      for (let i = 0; i < this.insuranceForList.length; i++) {
        this.insuranceForList[i].label = this.insuranceForList[i]['CodeDesc'];
        this.insuranceForList[i].value = this.insuranceForList[i]['Code'];
        delete this.insuranceForList[i].CodeDesc;
        if (i == this.insuranceForList.length - 1) {
          this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = this.insuranceForList;
        }
      }
    },
    (err) => { },
  );
}
getEmployeeCountList(){
  this.employeeCountList = [];

  if (this.productId != '14' && this.productId != '15') this.fields[0].fieldGroup[0].fieldGroup[2].props.options = [];
  else this.fields[0].fieldGroup[0].fieldGroup[0].props.options = [];
  let ReqObj = {
    "ProductId": this.productId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/fidelityEmployeeCount`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      this.employeeCountList = data.Result;
      for (let i = 0; i < this.employeeCountList.length; i++) {
        this.employeeCountList[i].label = this.employeeCountList[i]['CodeDesc'];
        this.employeeCountList[i].value = this.employeeCountList[i]['Code'];
        delete this.employeeCountList[i].CodeDesc;
        if (i == this.employeeCountList.length - 1) {
          if (this.productId != '14' && this.productId != '15') this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.employeeCountList);
          else this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.employeeCountList);
          // this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.employeeCountList);
        }
      }
    },
    (err) => { },
  );
}
hideBuildingSection(){
  return this.productItem.BuildingOwnerYn == 'Y';
}
getAudientTypeList(){
  this.audientTypeList = [];
  this.fields[0].fieldGroup[0].fieldGroup[8].props.options = [];
  let ReqObj = {
    "ProductId": this.productId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/auditenttype`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      this.audientTypeList = data.Result;
      for (let i = 0; i < this.audientTypeList.length; i++) {
        this.audientTypeList[i].label = this.audientTypeList[i]['CodeDesc'];
        this.audientTypeList[i].value = this.audientTypeList[i]['Code'];
        delete this.audientTypeList[i].CodeDesc;
        if (i == this.audientTypeList.length - 1) {
          this.fields[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.audientTypeList);
        }
      }
    },
    (err) => { },
  );
}
getSumInsuredList(){
  this.sumInsuredList = [];
  this.fields[0].fieldGroup[0].fieldGroup[3].props.options = [];
  let ReqObj = {
    "ProductId": this.productId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/fidelitySuminsured`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      this.sumInsuredList = data.Result;
      for (let i = 0; i < this.sumInsuredList.length; i++) {
        this.sumInsuredList[i].label = this.sumInsuredList[i]['CodeDesc'];
        this.sumInsuredList[i].value = this.sumInsuredList[i]['Code'];
        delete this.sumInsuredList[i].CodeDesc;
        if (i == this.sumInsuredList.length - 1) {
          this.fields[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.sumInsuredList);
        }
      }
    },
    (err) => { },
  );
}
getYearList() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  const currentYear = new Date().getFullYear() - 40, years = [];
  while (year >= currentYear) {
    let yearEntry = year--
    years.push({ "label": String(yearEntry), "value": String(yearEntry) });
    if (year == currentYear) {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      if (this.productId != '3') this.fields[0].fieldGroup[0].fieldGroup[4].props.options = defaultObj.concat(years);
      //if(this.productId=='3') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(years);
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        if (this.productId != '19' && this.productId != '3') this.setFormValues();
        else this.setSMEFormValues('edit')
      }
      else {
        this.productItem = new ProductData();
        this.formSection = true; this.viewSection = false;

      }
    }

  }
}
onSubmit(productData) {
  if (this.productId == '3' || this.productId == '19' || this.productId == '1') {
    let sectionId = [];
    // if((this.productItem.BuildingOwnerYn=='N' || this.productItem.BuildingOwnerYn==null) && this.productId=='3'){
    //   this.productItem.BuildingSuminsured = null;
    // }

    if (this.productItem.ElecEquipSuminsured != '0' && this.productItem.ElecEquipSuminsured != '' && this.productItem.ElecEquipSuminsured != null) {
      sectionId.push('41');
    }
    else {
      this.productItem.ElecEquipSuminsured = '0';
    }
    if (this.productItem.CashInSafe != '0' && this.productItem.CashInSafe != '' && this.productItem.CashInSafe != null) {
      sectionId.push('42');
    }
    if (this.productItem.CashInTransit != '0' && this.productItem.CashInTransit != '' && this.productItem.CashInTransit != null) {
      if (!sectionId.some(ele => ele == '42')) sectionId.push('42');
    }
    if (this.productItem.MoneyAnnualcarrySuminsured != '0' && this.productItem.MoneyAnnualcarrySuminsured != '' && this.productItem.MoneyAnnualcarrySuminsured != null) {
      if (!sectionId.some(ele => ele == '42')) sectionId.push('42');
    }
    if (this.productItem.CashInHandEmployees != '0' && this.productItem.CashInHandEmployees != '' && this.productItem.CashInHandEmployees != null) {
      if (!sectionId.some(ele => ele == '42')) sectionId.push('42');
    }
    if (this.productItem.MoneyInSafeBusiness != '0' && this.productItem.MoneyInSafeBusiness != '' && this.productItem.MoneyInSafeBusiness != null) {
      if (!sectionId.some(ele => ele == '42')) sectionId.push('42');
    }
    if (this.productItem.MoneyOutSafeBusiness != '0' && this.productItem.MoneyOutSafeBusiness != '' && this.productItem.MoneyOutSafeBusiness != null) {
      if (!sectionId.some(ele => ele == '42')) sectionId.push('42');
    }
    if (this.productItem.MoneyInPremises != '0' && this.productItem.MoneyInPremises != '' && this.productItem.MoneyInPremises != null) {
      if (!sectionId.some(ele => ele == '42')) sectionId.push('42');
    }
    if (this.productItem.FidelityAnnualSuminsured != '0' && this.productItem.FidelityAnnualSuminsured != '' && this.productItem.FidelityAnnualSuminsured != null &&
      this.productItem.FidelityAnyoccuSuminsured != '0' && this.productItem.FidelityAnyoccuSuminsured != '' && this.productItem.FidelityAnyoccuSuminsured != null) {
      sectionId.push('43');
    }
    else {
      this.productItem.FidelityAnnualSuminsured = '0';
      this.productItem.FidelityAnyoccuSuminsured = '0';
    }

    if (this.productItem.TpliabilityAnyoccuSuminsured != '0' && this.productItem.TpliabilityAnyoccuSuminsured != '' && this.productItem.TpliabilityAnyoccuSuminsured != null) {
      sectionId.push('44');
    }
    else {
      this.productItem.TpliabilityAnyoccuSuminsured = '0';
    }
    if (this.productItem.EmpliabilityExcessSuminsured != '0' && this.productItem.EmpliabilityExcessSuminsured != '' && this.productItem.EmpliabilityExcessSuminsured != null &&
      this.productItem.EmpliabilityExcessSuminsured != '0' && this.productItem.EmpliabilityExcessSuminsured != '' && this.productItem.EmpliabilityExcessSuminsured != null) {
      sectionId.push('45');
    }
    else {
      this.productItem.EmpliabilityExcessSuminsured = '0';
      this.productItem.EmpliabilityAnnualSuminsured = '0';
    }
    if (this.productItem.GoodsTurnoverSuminsured != '0' && this.productItem.GoodsTurnoverSuminsured != '' && this.productItem.GoodsTurnoverSuminsured != null &&
      this.productItem.GoodsSinglecarrySuminsured != '0' && this.productItem.GoodsSinglecarrySuminsured != '' && this.productItem.GoodsSinglecarrySuminsured != null) {
      sectionId.push('46');
    }
    else {
      this.productItem.GoodsTurnoverSuminsured = '0';
      this.productItem.GoodsSinglecarrySuminsured = '0';
    }
    if (this.productId != '3') {
      if (this.productItem.BuildingSuminsured != '0' && this.productItem.BuildingSuminsured != null && this.productItem.BuildingSuminsured != '') {
        sectionId.push('40');
      }
      else {
        if (this.coversRequired == 'B' || this.coversRequired == 'BC') sectionId.push('40');
        this.productItem.BuildingSuminsured = null;
      }
      if (this.productItem.ContentSuminsured != '0' && this.productItem.ContentSuminsured != undefined && this.productItem.ContentSuminsured != null && this.productItem.ContentSuminsured != '') {
        sectionId.push('47');
      }
      else {
        if (this.coversRequired == 'C' || this.coversRequired == 'BC') sectionId.push('47');
        this.productItem.ContentSuminsured = '0';
      }
    }
    else {
      if (this.productItem.BuildingSuminsured != '0' && this.productItem.BuildingSuminsured != null && this.productItem.BuildingSuminsured != '') {
        sectionId.push('1');
      }
      else {
        if (this.coversRequired == 'B' || this.coversRequired == 'BC') sectionId.push('1');
        this.productItem.BuildingSuminsured = null;
      }
      if (this.productItem.ContentSuminsured != '0' && this.productItem.ContentSuminsured != undefined && this.productItem.ContentSuminsured != null && this.productItem.ContentSuminsured != '') {
        sectionId.push('47');
      }
      else {
        if (this.coversRequired == 'C' || this.coversRequired == 'BC') sectionId.push('47');
        this.productItem.ContentSuminsured = '0';
      }
    }
    if (this.productItem.PersonalAccidentSuminsured != '0' && this.productItem.PersonalAccidentSuminsured != null && this.productItem.PersonalAccidentSuminsured != '') {
      sectionId.push('35');
    }
    else {
      this.productItem.PersonalAccidentSuminsured = '0';
    }
    if (this.productItem.PersonalIntermediarySuminsured != '0' && this.productItem.PersonalIntermediarySuminsured != null && this.productItem.PersonalIntermediarySuminsured != '') {
      sectionId.push('36');
    }
    else {
      this.productItem.PersonalIntermediarySuminsured = '0';
    }
    if (this.productItem.AllriskSumInsured != '0' && this.productItem.AllriskSumInsured != null && this.productItem.AllriskSumInsured != '') {
      sectionId.push('3');
    }
    else {
      this.productItem.AllriskSumInsured = '0';
    }
    let insuranceForList = [];
    if (this.productId == '1') {

      if (this.productItem.InsuranceForId != null) {
        insuranceForList = Object.keys(this.productItem.InsuranceForId);
      }
      sectionId.push('52')
    }
    let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let appId = "1", loginId = "", brokerbranchCode = "";
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else {
        appId = this.loginId;
        loginId = this.commonDetails[0].LoginId
        brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
    else this.issuerSection = false
    this.subuserType = sessionStorage.getItem('typeValue');
    //if(vehicleDetails?.FleetOwnerYn==null) vehicleDetails.FleetOwnerYn = 'N';
    let reqRefNo = null;
    if (sessionStorage.getItem('quoteReferenceNo')) {
      reqRefNo = sessionStorage.getItem('quoteReferenceNo')
    }
    if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
    console.log("Quote Status Received", quoteStatus, this.commonDetails)
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
    }
    if (this.commonDetails[0].CommissionType != null) this.commissionType = this.commonDetails[0].CommissionType;
    if (this.commonDetails[0].AcexecutiveId != null) this.acExecutiveId = this.commonDetails[0].AcexecutiveId;
    console.log("Common Details", this.commonDetails)
    if (this.issuerSection) {
      this.sourceType = this.commonDetails[0].SourceType;
      this.bdmCode = this.commonDetails[0].BrokerCode;
      this.brokerCode = this.commonDetails[0].BrokerCode;
      this.brokerbranchCode = this.commonDetails[0].BrokerBranchCode;

    }
    let promocode = null;
    if (this.commonDetails[0].Promocode) {
      promocode = this.commonDetails[0].Promocode;
    }
    else if (this.commonDetails[0].PromoCode) promocode = this.commonDetails[0].PromoCode;
    if (this.commonDetails[0].CustomerCode != null && this.commonDetails[0].CustomerCode != undefined) this.customerCode = this.commonDetails[0].CustomerCode;
    let ReqObj = {
      "AcexecutiveId": this.commonDetails[0].AcexecutiveId,
      "AgencyCode": this.agencyCode,
      "ApplicationId": appId,
      "BdmCode": this.bdmCode,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": this.brokerbranchCode,
      "BrokerCode": this.brokerCode,
      "BuidingAreaSqm": null,
      "BuildingBuildYear": this.productItem.BuildingBuildYear,
      "BuildingCondition": null,
      "BuildingFloors": this.productItem.BuildingFloors,
      "BuildingOccupationType": this.productItem.OccupationType,
      "OccupationType": this.productItem.OccupationType,
      "LiabilityOccupationId": this.productItem.LiabilityOccupationId,
      "BuildingOwnerYn": this.productItem.BuildingOwnerYn,
      "BuildingPurposeId": "3",
      "BuildingSuminsured": this.productItem.BuildingSuminsured,
      "BuildingType": null,
      "BuildingUsageId": this.productItem.BuildingUsageId,
      "BuildingUsageYn": null,
      "Createdby": createdBy,
      "SourceType": this.sourceType,
      "Currency": this.commonDetails[0].Currency,
      "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
      "CustomerCode": this.customerCode,
      "ContentSuminsured": this.productItem.ContentSuminsured,
      "PersonalAccSuminsured": this.productItem.PersonalAccidentSuminsured,
      "PersonalIntermediarySuminsured": this.productItem.PersonalIntermediarySuminsured,
      "AllriskSumInsured": this.productItem.AllriskSumInsured,
      "ExchangeRate": this.commonDetails[0].ExchangeRate,
      "Havepromocode": this.commonDetails[0].HavePromoCode,
      "Promocode": promocode,
      "InbuildConstructType": this.productItem.InbuildConstructType,
      "InsuranceId": this.insuranceId,
      "InsuranceType": null,
      "LocationId": "1",
      "LoginId": loginId,
      "UserType": this.userType,
      "OutbuildConstructType": this.productItem.OutbuildConstructType,
      "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
      "PolicyStartDate": this.commonDetails[0].PolicyStartDate,
      "ProductId": this.productId,
      "SectionId": sectionId,
      "SubUsertype": this.subuserType,
      "ElecEquipSuminsured": this.productItem.ElecEquipSuminsured,
      "MoneyAnnualcarrySuminsured": this.productItem.MoneyAnnualcarrySuminsured,
      "CashInTransit": this.productItem.CashInTransit,
      "CashInHandEmployees": this.productItem.CashInHandEmployees,
      "CashInSafe": this.productItem.CashInSafe,
      "MoneyInSafeBusiness": this.productItem.MoneyInSafeBusiness,
      "MoneyOutSafeBusiness": this.productItem.MoneyOutSafeBusiness,
      "MoneyInPremises": this.productItem.MoneyInPremises,
      "FidelityAnyoccuSuminsured": this.productItem.FidelityAnyoccuSuminsured,
      "FidelityAnnualSuminsured": this.productItem.FidelityAnnualSuminsured,
      "TpliabilityAnyoccuSuminsured": this.productItem.TpliabilityAnyoccuSuminsured,
      "EmpliabilityAnnualSuminsured": this.productItem.EmpliabilityAnnualSuminsured,
      "EmpliabilityExcessSuminsured": this.productItem.EmpliabilityExcessSuminsured,
      "GoodsSinglecarrySuminsured": this.productItem.GoodsSinglecarrySuminsured,
      "GoodsTurnoverSuminsured": this.productItem.GoodsTurnoverSuminsured,
      "InsuranceForId": insuranceForList,
      "NatureOfTradeId": this.productItem.NatureOfTradeId,

      "IndustryId": this.productItem.IndustryId,

      "CategoryId": this.productItem.CategoryId,
      "WallType": this.productItem.WallType,
      "InternalWallType": this.productItem.InternalWallType,
      "CeilingType": this.productItem.CeilingType,
      "FirstLossPercentId":this.productItem.FirstLossPercentId,
      "StockInTradeSi": this.productItem.StockInTradeSi,
      "GoodsSi": this.productItem.GoodsSi,
      "FurnitureSi": this.productItem.FurnitureSi,
      "ApplianceSi": this.productItem.ApplianceSi,
      "CashValueablesSi": this.productItem.CashValueablesSi,
      "Address": this.productItem.Address,
      "RegionCode": this.productItem.RegionCode,
      "DistrictCode": this.productItem.DistrictCode,
      "OccupiedYear": this.productItem.OccupiedYear,
      "WatchmanGuardHours": this.productItem.WatchmanGuardHours,
      "AccessibleWindows": this.productItem.AccessibleWindows,
      "ShowWindow": this.productItem.ShowWindow,
      "FrontDoors": this.productItem.FrontDoors,
      "BackDoors": this.productItem.BackDoors,
      "TrapDoors": this.productItem.TrapDoors,
      "WindowsMaterialId": this.productItem.WindowsMaterialId,
      "DoorsMaterialId": this.productItem?.DoorsMaterialId,
      "NightLeftDoor": this.productItem?.NightLeftDoor,
      "BuildingOccupied": this.productItem?.BuildingOccupied,

      "RoofType": this.productItem.RoofType,
      "RequestReferenceNo": reqRefNo,
      "EndorsementDate": this.endorsementDate,
      "EndorsementEffectiveDate": this.endorsementEffectiveDate,
      "EndorsementRemarks": this.endorsementRemarks,
      "EndorsementType": this.endorsementType,
      "EndorsementTypeDesc": this.endorsementTypeDesc,
      "EndtCategoryDesc": this.endtCategoryDesc,
      "EndtCount": this.endtCount,
      "EndtPrevPolicyNo": this.endtPrevPolicyNo,
      "EndtPrevQuoteNo": this.endtPrevQuoteNo,
      "EndtStatus": this.endtStatus,
      "IsFinanceEndt": this.isFinanceEndt,
      "OrginalPolicyNo": this.orginalPolicyNo,
      "PolicyNo": this.endorsePolicyNo
    }
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.productItem?.Status;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}home/savebuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {

          }
        }
        else if (data.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          this.commonDetails[0]['SectionId'] = sectionId;
          console.log("Final Common Details", this.commonDetails)
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
          this.onCalculate(data.Result);

        }
      },
      (err) => { },
    );
  }
  else this.onFormSubmit();
}
checkDisable(fieldName) {
  console.log("Disable Check", fieldName);
  if (this.endorsementSection) {
    let entry = this.enableFieldsList.some(ele => ele == fieldName);
    console.log("Entry ", fieldName, entry)
    return !entry;
  }
  else return false;

}
onCalculate(buildDetails) {
  let createdBy = ""
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  if (quoteStatus == 'AdminRP') {
    createdBy = ""
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }
  else createdBy = this.loginId;
  if (buildDetails.length != 0) {
    this.requestReferenceNo = buildDetails[0].RequestReferenceNo;
    sessionStorage.setItem('quoteReferenceNo', buildDetails[0].RequestReferenceNo);
    let i = 0;
    for (let build of buildDetails) {
      let effectiveDate = null, coverModificationYN = 'N';
      if (this.endorsementSection) {
        effectiveDate = this.endorseEffectiveDate;
        let entry = this.enableFieldsList.some(ele => ele == 'Covers');
        if (entry) coverModificationYN = 'Y';
        else coverModificationYN = 'N';
      }
      else {
        effectiveDate = this.commonDetails[0].PolicyStartDate
      }
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "SectionId": build.SectionId,
        "ProductId": this.productId,
        "MSRefNo": build.MSRefNo,
        "VehicleId": build.LocationId,
        "CdRefNo": build.CdRefNo,
        "VdRefNo": build.VdRefNo,
        "CreatedBy": this.loginId,
        "productId": this.productId,
        "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo'),
        "EffectiveDate": effectiveDate,
        "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
        "CoverModification": coverModificationYN
      }
      let urlLink = `${this.CommonApiUrl}calculator/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data) {

            let entry = data?.Result;


            i += 1;
            console.log("Indexxx", i, buildDetails.length)
            if (i == buildDetails.length) {

              if (this.uwQuestionList.length != 0) {
                let i = 0;
                let uwList: any[] = [];
                //let branchCode = '';
                for (let ques of this.uwQuestionList) {


                  // if(this.userType!='Broker' && this.userType!='User'){
                  //   branchCode = this.branchCode
                  // }
                  // else{
                  //   branchCode = this.brokerbranchCode
                  // }
                  ques['BranchCode'] = this.branchCode;
                  let quoteStatus = sessionStorage.getItem('QuoteStatus');
                  // if(quoteStatus=='AdminRP'){
                  //     createdBy = ;
                  // }
                  // else{
                  //   createdBy = this.loginId;
                  // }
                  if (ques.QuestionType == '01') {

                    ques['CreatedBy'] = createdBy;
                    ques['RequestReferenceNo'] = this.requestReferenceNo;
                    ques['UpdatedBy'] = this.loginId;
                    ques["VehicleId"] = build.LocationId
                    uwList.push(ques);
                  }
                  else if (ques.Value != "") {
                    ques['CreatedBy'] = createdBy;
                    ques['RequestReferenceNo'] = this.requestReferenceNo;
                    ques['UpdatedBy'] = this.loginId;
                    ques["VehicleId"] = build.LocationId
                    uwList.push(ques);
                  }
                  i += 1;
                  if (i == this.uwQuestionList.length) this.onSaveUWQues(uwList, entry);
                }
              }
              else {

                this.onFinalProceed();
              }


            }
          }
        },
        (err) => { },
      );
    }

  }
}
onFinalProceed() {
  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  // if (this.uwQuestionList.length != 0) {

  // }
  /*else{
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }*/
}
getIndustryList() {
  this.industryList = [];
  //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = [];
  let ReqObj = {
    "CategoryId": this.productItem.CategoryId,
    "BranchCode": this.branchCode,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
  }
  let urlLink = `${this.commonApiUrl}master/dropdown/industry`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
      this.industryList = defaultObj.concat(data.Result);


    },
    (err) => { },
  );
}
onStartDateChange() {

}
getbuildingpurposeList() {
  let ReqObj = {
    "InsuranceId": "",
    "BranchCode": "",
  }
  let urlLink = `${this.CommonApiUrl}dropdown/buildingusage`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res: any = data;
      if (res.Result) {
        let defaultObj = [{ 'label': '-Select-', 'value': '' }]
        this.BuildingUsageList = data.Result;
        for (let i = 0; i < this.BuildingUsageList.length; i++) {
          this.BuildingUsageList[i].label = this.BuildingUsageList[i]['CodeDesc'];
          this.BuildingUsageList[i].value = this.BuildingUsageList[i]['Code'];
          delete this.BuildingUsageList[i].CodeDesc;
          if (i == this.BuildingUsageList.length - 1) {
            this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.BuildingUsageList);
          }
        }
      }
    },
    (err) => { },
  );
}

buglaryloss(){
  //this.buglaryValue = [];
  //this.fields[0].fieldGroup[0].fieldGroup[3].props.options = [];
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/firstlosspercent`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = []//[{ 'label': '-Select-', 'value': '' }]
      this.buglaryValue = data.Result;
      for (let i = 0; i < this.buglaryValue.length; i++) {
        this.buglaryValue[i].label = this.buglaryValue[i]['CodeDesc'];
        this.buglaryValue[i].value = this.buglaryValue[i]['Code'];

        console.log('HHHHHHHHHHHHHHHHH',this.buglaryValue[i].value);
        console.log('IIIIIIIIIIIIII',this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options);
        //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
        delete this.buglaryValue[i].CodeDesc;
        if (i == this.buglaryValue.length - 1) {
          this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
        }
        /*if (i == this.buglaryValue.length - 1) {
          //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].props.options
          this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
        }*/
      }
    },
    (err) => { },
  );
}
getOccupationList() {
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode,
    "ProductId": this.productId
  }
  let urlLink = `${this.commonApiUrl}master/dropdown/occupation`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let defaultObj = [{ 'label': '-Select-', 'value': '' }]
        this.occupationList = data.Result;
        if (this.occupationList.length != 0) {
          for (let i = 0; i < this.occupationList.length; i++) {
            this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
            this.occupationList[i].value = this.occupationList[i]['Code'];
            delete this.occupationList[i].CodeDesc;
            if (i == this.occupationList.length - 1) {
              if (this.productId != '19' && this.productId != '3' && this.productId != '32') this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.occupationList);
              if (this.productId == '3') {
                if (this.coversRequired == 'C' || this.coversRequired == 'B') {
                  this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  this.fields[0].fieldGroup[3].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                }
                else {
                  this.fields[0].fieldGroup[3].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                  this.fields[0].fieldGroup[4].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                }
              }
              if (this.productId != '3' && this.productId != '19') {

                let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                if (referenceNo) {
                  this.requestReferenceNo = referenceNo;
                  if (this.productId != '19') this.setFormValues();
                  else this.setSMEFormValues('edit')
                }
                else {
                  this.productItem.BuildingBuildYear = '';
                  this.formSection = true; this.viewSection = false;
                }
              }

              console.log("Final Form Fields", this.fields)

              // if(this.customerReferenceNo){
              // 	this.setValues();
              // }
              //this.getBusinessTypeList();

            }
          }
        }
        else {
          let referenceNo = sessionStorage.getItem('quoteReferenceNo');
          if (referenceNo) {
            this.requestReferenceNo = referenceNo;
            if (this.productId != '19' && this.productId != '3' && this.productId != '1') this.setFormValues();
            else this.setSMEFormValues('edit')
          }
          else if (this.productId != '19' && this.productId != '3') {
            this.productItem = new ProductData();
            this.productItem.BuildingBuildYear = '';
            this.formSection = true; this.viewSection = false;
          }
        }
      }
    },
    (err) => { },
  );
}
setSMEFormValues(type) {
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo
  }
  let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data)
      let customerDatas = data.Result[0];
      this.productItem.IndustryId = customerDatas?.IndustryId;

      let entry = this.industryList.find(ele => ele.Code == this.productItem.IndustryId)
      if (customerDatas?.WallType != null && customerDatas?.WallType != undefined) this.productItem.WallType = customerDatas?.WallType;
      else this.productItem.WallType = '';
      if (customerDatas?.RoofType != null && customerDatas?.RoofType != undefined) this.productItem.RoofType = customerDatas?.RoofType;
      else this.productItem.RoofType = '';
      this.productItem.BuildingBuildYear = customerDatas?.BuildingBuildYear;
      this.productItem.BuildingUsageId = customerDatas?.BuildingUsageId;
      this.productItem.BuildingOwnerYn = customerDatas?.BuildingOwnerYn;
      this.productItem.OccupationType = customerDatas?.OccupationType;
      this.productItem.InbuildConstructType = customerDatas?.InbuildConstructType;
      this.productItem.OutbuildConstructType = customerDatas?.OutbuildConstructType;
      this.productItem.BuildingFloors = customerDatas?.BuildingFloors;
      this.productItem.CategoryId = customerDatas?.CategoryId;
      this.productItem.LiabilityOccupationId = customerDatas?.LiabilityOccupationId;
      if (this.endorsementSection) {
        this.endorsementDate = customerDatas?.EndorsementDate;
        this.endorsementEffectiveDate = customerDatas?.EndorsementEffectiveDate;
        this.endorsementRemarks = customerDatas?.EndorsementRemarks;
        this.endorsementType = customerDatas?.EndorsementType;
        this.endorsementTypeDesc = customerDatas?.EndorsementTypeDesc;
        this.endtCategoryDesc = customerDatas?.EndtCategoryDesc;
        this.endtCount = customerDatas?.EndtCount;
        this.endtPrevPolicyNo = customerDatas?.EndtPrevPolicyNo;
        this.endtPrevQuoteNo = customerDatas?.EndtPrevQuoteNo;
        this.endtStatus = customerDatas?.EndtStatus;
        this.isFinanceEndt = customerDatas?.IsFinanceEndt;
        this.orginalPolicyNo = customerDatas?.OrginalPolicyNo;
      }
      if (this.productId != '3' && this.productId != '19') this.getIndustryList();
      if (this.productId == '3' || this.productId == '19') {
        let sectionId = customerDatas?.SectionId;
        let contents = sectionId.some(ele => ele == '47');
        let building = sectionId.some(ele => ele == '1' || ele == '40');
        if (building && contents) this.coversRequired = 'BC';
        else if (building) this.coversRequired = 'B';
        else if (contents) this.coversRequired = 'C';
      }
      if (customerDatas?.BuildingSuminsured != null && customerDatas?.BuildingSuminsured != '0') {
        this.productItem.BuildingSuminsured = customerDatas?.BuildingSuminsured;
      }
      else {
        this.productItem.BuildingSuminsured = '0';
      }
      if (customerDatas?.ContentSuminsured != null && customerDatas?.ContentSuminsured != '0' && customerDatas?.ContentSuminsured != undefined) {
        this.productItem.ContentSuminsured = customerDatas?.ContentSuminsured;
      }
      else this.productItem.ContentSuminsured = '0';
      if (customerDatas?.ElecEquipSuminsured != null && customerDatas?.ElecEquipSuminsured != '0') {
        this.productItem.ElecEquipSuminsured = customerDatas?.ElecEquipSuminsured;
        this.productItem.BreakDownCoverYN = 'Yes';
      }
      else {
        this.productItem.ElecEquipSuminsured = '0';
        this.productItem.BreakDownCoverYN = 'No';
      }
      if (customerDatas?.GoodsTurnoverSuminsured != null && customerDatas?.GoodsTurnoverSuminsured != '0') {
        this.productItem.GoodsTurnoverSuminsured = customerDatas?.GoodsTurnoverSuminsured;
        this.productItem.GoodsSinglecarrySuminsured = customerDatas?.GoodsSinglecarrySuminsured;
        this.productItem.GoodsYN = 'Yes';
      }
      else {
        this.productItem.GoodsTurnoverSuminsured = '0';
        this.productItem.GoodsSinglecarrySuminsured = '0';
        this.productItem.GoodsYN = "No"
      }
      if (customerDatas?.MoneyAnnualcarrySuminsured) this.productItem.MoneyAnnualcarrySuminsured = customerDatas?.MoneyAnnualcarrySuminsured;
      else this.productItem.MoneyAnnualcarrySuminsured = '0';
      if (customerDatas?.MoneySinglecarrySuminsured) this.productItem.MoneySinglecarrySuminsured = customerDatas?.MoneySinglecarrySuminsured;
      else this.productItem.MoneySinglecarrySuminsured = '0';
      if (customerDatas?.MoneyInsafeSuminsured) this.productItem.MoneyInsafeSuminsured = customerDatas?.MoneyInsafeSuminsured;
      else this.productItem.MoneyInsafeSuminsured = '0';
      if (customerDatas?.CashInTransit) this.productItem.CashInTransit = customerDatas?.CashInTransit;
      else this.productItem.CashInTransit = '0';
      if (customerDatas?.CashInHandEmployees) this.productItem.CashInHandEmployees = customerDatas?.CashInHandEmployees;
      else this.productItem.CashInHandEmployees = '0';
      if (customerDatas?.CashInSafe) this.productItem.CashInSafe = customerDatas?.CashInSafe;
      else this.productItem.CashInSafe = '0';
      if (customerDatas?.MoneyInSafeBusiness) this.productItem.MoneyInSafeBusiness = customerDatas?.MoneyInSafeBusiness;
      else this.productItem.MoneyInSafeBusiness = '0';
      if (customerDatas?.MoneyOutSafeBusiness) this.productItem.MoneyOutSafeBusiness = customerDatas?.MoneyOutSafeBusiness;
      else this.productItem.MoneyOutSafeBusiness = '0';
      if (customerDatas?.MoneyInPremises) this.productItem.MoneyInPremises = customerDatas?.MoneyInPremises;
      else this.productItem.MoneyInPremises = '0';
      if (customerDatas?.MoneyInLocker) this.productItem.MoneyInLocker = customerDatas?.MoneyInLocker;
      else this.productItem.MoneyInLocker = '0';
      //this.productItem.MoneyCoverYN = 'Yes';
      if (customerDatas?.FidelityAnnualSuminsured != null && customerDatas?.FidelityAnnualSuminsured != '0') {
        this.productItem.FidelityAnnualSuminsured = customerDatas?.FidelityAnnualSuminsured;
        this.productItem.FidelityAnyoccuSuminsured = customerDatas?.FidelityAnyoccuSuminsured;
        this.productItem.FidelityCoverYN = 'Yes';
      }
      else {
        this.productItem.FidelityAnnualSuminsured = '0';
        this.productItem.FidelityAnyoccuSuminsured = '0';
        this.productItem.FidelityCoverYN = 'No';
      }
      if (customerDatas?.TpliabilityAnyoccuSuminsured != null && customerDatas?.TpliabilityAnyoccuSuminsured != '0') {
        this.productItem.TpliabilityAnyoccuSuminsured = customerDatas?.TpliabilityAnyoccuSuminsured;
        this.productItem.LiabilityYN = 'Yes';
      }
      else {
        this.productItem.TpliabilityAnyoccuSuminsured = '0';
        this.productItem.LiabilityYN = 'No';
      }
      if (customerDatas?.EmpliabilityExcessSuminsured != null && customerDatas?.EmpliabilityExcessSuminsured != '0') {
        this.productItem.EmpliabilityExcessSuminsured = customerDatas?.EmpliabilityExcessSuminsured;
        this.productItem.EmpliabilityAnnualSuminsured = customerDatas?.EmpliabilityAnnualSuminsured;
        this.productItem.WcYN = 'Yes';
      }
      else {
        this.productItem.EmpliabilityExcessSuminsured = '0';
        this.productItem.EmpliabilityAnnualSuminsured = '0';
        this.productItem.WcYN = 'No';
      }
      if (customerDatas?.PersonalAccSuminsured != null && customerDatas?.PersonalAccSuminsured != '0') {
        this.productItem.PersonalAccidentSuminsured = customerDatas?.PersonalAccSuminsured;
      }
      else {
        this.productItem.PersonalAccidentSuminsured = '0';
      }
      if (customerDatas?.PersonalIntermediarySuminsured != null && customerDatas?.PersonalIntermediarySuminsured != '0') {
        this.productItem.PersonalIntermediarySuminsured = customerDatas?.PersonalIntermediarySuminsured;
      }
      else {
        this.productItem.PersonalIntermediarySuminsured = '0';
      }
      if (customerDatas?.AllriskSumInsured != null && customerDatas?.AllriskSumInsured != '0') {
        this.productItem.AllriskSumInsured = customerDatas?.AllriskSumInsured;
      }
      else {
        this.productItem.AllriskSumInsured = '0';
      }
      if (customerDatas?.InsuranceForId != null) {
        let value = {}, i = 0;
        for (let element of customerDatas?.InsuranceForId) {
          if (element != '0') {
            value[element] = true;
          }
          i += 1;
          if (i == customerDatas?.InsuranceForId.length) this.productItem.InsuranceForId = value;
        }
      }
      this.productItem.NatureOfTradeId = customerDatas?.NatureOfTradeId;
      this.productItem.IndustryId = customerDatas?.IndustryId;
      if (this.productId == '19') this.onIndustryChange();
      this.productItem.WallType = customerDatas?.WallType;
      this.productItem.InternalWallType = customerDatas?.InternalWallType;
      this.productItem.RoofType = customerDatas?.RoofType;
      this.productItem.CeilingType = customerDatas?.CeilingType;
      this.productItem.StockInTradeSi = customerDatas?.StockInTradeSi;
      this.productItem.GoodsSi = customerDatas?.GoodsSi;
      this.productItem.FurnitureSi = customerDatas?.FurnitureSi;
      this.productItem.ApplianceSi = customerDatas?.ApplianceSi;
      this.productItem.CashValueablesSi = customerDatas?.CashValueablesSi;
      this.productItem.Address = customerDatas?.Address;
      this.productItem.RegionCode = customerDatas?.RegionCode;
      this.productItem.DistrictCode = customerDatas?.DistrictCode;
      this.productItem.BuildingOwnerYn = customerDatas?.BuildingOwnerYn;
      this.productItem.BuildingBuildYear = customerDatas?.BuildingBuildYear;
      this.productItem.OccupiedYear = customerDatas?.OccupiedYear;
      this.productItem.WatchmanGuardHours = customerDatas?.WatchmanGuardHours;
      this.productItem.AccessibleWindows = customerDatas?.AccessibleWindows;
      this.productItem.ShowWindow = customerDatas?.showWindow;
      this.productItem.FrontDoors = customerDatas?.FRONT_DOORS;
      this.productItem.BackDoors = customerDatas?.BACK_DOORS;
      this.productItem.TrapDoors = customerDatas?.TrapDoors;
      this.productItem.WindowsMaterialId = customerDatas?.WindowsMaterialId;
      this.productItem.FirstLossPercentId = customerDatas?.FirstLossPercentId;
      this.productItem.DoorsMaterialId = customerDatas?.DoorsMaterialId;
      this.productItem.NightLeftDoor = customerDatas?.NightLeftDoor;
      this.productItem.BuildingOccupied = customerDatas?.BuildingOccupied;
      this.ongetDistrictList('edit')


      if (this.productId == '3') {
        this.setDomesticForm('edit', type);
      }
      else if (this.productId == '19') this.setSMEForm('edit', type)
      else {
        this.formSection = true; this.viewSection = false;
      }

    }

  );
}
onProceed() {
  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
}
setFormValues() {
  let urlLink: any;
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1"
  }
  urlLink = `${this.motorApiUrl}api/geteservicebyriskid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let customerData = data.Result;
        this.quoteDetails = data.Result;
        this.productItem = new ProductData();
        this.applicationId = customerData.ApplicationId;
        this.productItem.CustomerName = customerData.CustomerName;
        this.productItem.BetweenDiscontinued = customerData.BetweenDiscontinued;
        this.productItem.EthicalWorkInvolved = customerData.EthicalWorkInvolved;
        this.productItem.IndustryName = customerData.IndustryName;
        this.productItem.NatureOfBusinessId = customerData?.NatureOfBusinessId;
        if (this.productId == '14' || this.productId == '15') this.onIndustryChange();
        this.productItem.TotalNoOfEmployees = customerData?.TotalNoOfEmployees;
        this.productItem.TotalExcludedEmployees = customerData?.TotalExcludedEmployees;
        this.productItem.TotalRejoinedEmployees = customerData?.TotalRejoinedEmployees;
        this.productItem.AccountOutstandingEmployees = customerData?.AccountOutstandingEmployees;
        this.productItem.AccountAuditentType = customerData?.AccountAuditentType;
        this.productItem.TotalOutstandingAmount = customerData?.TotalOutstandingAmount;
        this.productItem.JobJoiningMonth = customerData.JobJoiningMonth;
        this.productItem.OccupationType = customerData.OccupationType;
        this.productItem.SalaryPerAnnum = customerData.SalaryPerAnnum;
        this.productItem.SectionId = customerData.SalaryPerAnnum;
        this.productItem.SumInsured = customerData.SumInsured;
        this.productItem.BenefitCoverMonth = customerData.BenefitCoverMonth;
        if (this.endorsementSection) {
          this.endorsementDate = customerData?.EndorsementDate;
          this.endorsementEffectiveDate = customerData?.EndorsementEffectiveDate;
          this.endorsementRemarks = customerData?.EndorsementRemarks;
          this.endorsementType = customerData?.EndorsementType;
          this.endorsementTypeDesc = customerData?.EndorsementTypeDesc;
          this.endtCategoryDesc = customerData?.EndtCategoryDesc;
          this.endtCount = customerData?.EndtCount;
          this.endtPrevPolicyNo = customerData?.EndtPrevPolicyNo;
          this.endtPrevQuoteNo = customerData?.EndtPrevQuoteNo;
          this.endtStatus = customerData?.EndtStatus;
          this.isFinanceEndt = customerData?.IsFinanceEndt;
          this.orginalPolicyNo = customerData?.OrginalPolicyNo;
        }
        let dob = "";
        if (customerData.Dob != '' && customerData.Dob != null && customerData != undefined) {
          var dateParts = customerData?.Dob.split("/");
          this.productItem.Dob = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
        }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
          if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
          else { this.issuerSection = false; }
        }
        else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
        else this.issuerSection = false
        this.formSection = true; this.viewSection = false;

      }
    },
    (err) => { },
  );
}
onFormSubmit() {
  let createdBy = "";
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  let appId = "1", loginId = "", brokerbranchCode = "";
  if (this.productId == '3') {
    this.productItem.OutbuildConstructType = 'W';
    if (this.productItem.OutbuildConstructType == 'W' || this.productItem.BuildingFloors == null || this.productItem.BuildingFloors == '') {
      this.productItem.BuildingFloors == '0';

    }
  }
  if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    //createdBy = this.vehicleDetailsList[0].CreatedBy;
  }
  else {
    createdBy = this.loginId;
    if (this.userType != 'Issuer') {
      this.brokerCode = this.agencyCode;
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else {
      appId = this.loginId;
      loginId = this.commonDetails[0].LoginId
      brokerbranchCode = null;
    }
  }
  this.applicationId = appId;
  if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
    else { this.issuerSection = false; }
  }
  else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
  else this.issuerSection = false
  this.subuserType = sessionStorage.getItem('typeValue');
  console.log("AcExecutive", this.acExecutiveId);
  //if(vehicleDetails?.FleetOwnerYn==null) vehicleDetails.FleetOwnerYn = 'N';


  console.log("Quote Status Received", quoteStatus, this.commonDetails)
  if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    //brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
  }
  let dob = "";
  if (this.productItem.Dob != '' && this.productItem.Dob != null && this.productItem.Dob != undefined) {
    dob = this.datePipe.transform(this.productItem.Dob, "dd/MM/yyyy");
  }
  if (this.commonDetails[0].CommissionType != null) this.commissionType = this.commonDetails[0].CommissionType;
  if (this.commonDetails[0].AcexecutiveId != null) this.acExecutiveId = this.commonDetails[0].AcexecutiveId;
  if (this.issuerSection) {
    this.sourceType = this.commonDetails[0].SourceType;
    this.bdmCode = this.commonDetails[0].BrokerCode;
    this.brokerCode = this.commonDetails[0].BrokerCode;
    this.brokerbranchCode = this.commonDetails[0].BrokerBranchCode;

  }
  if (this.commonDetails[0].CustomerCode != null && this.commonDetails[0].CustomerCode != undefined) this.customerCode = this.commonDetails[0].CustomerCode;
  let sectionId = null;
  if (this.productId == '13') sectionId = '35';
  else if (this.productId == '14') sectionId = '37';
  else if (this.productId == '15') sectionId = '38';
  else if (this.productId == '32') sectionId = '43';
  if (this.productItem.BetweenDiscontinued == 'N') this.productItem.EthicalWorkInvolved = 'N';
  if (this.requestReferenceNo == 'undefined' || this.requestReferenceNo == undefined) this.requestReferenceNo = null;
  let ReqObj = {
    "AcexecutiveId": this.acExecutiveId,
    "AgencyCode": this.agencyCode,
    "BenefitCoverMonth": this.productItem.BenefitCoverMonth,
    "CreatedBy": createdBy,
    "Havepromocode": this.commonDetails[0].HavePromoCode,
    "OccupationType": this.productItem.OccupationType,
    "LiabilityOccupationId": this.productItem.LiabilityOccupationId,
    "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
    "PolicyStartDate": this.commonDetails[0].PolicyStartDate,
    "Promocode": this.commonDetails[0].Promocode,
    "RiskId": this.commonDetails[0].RiskId,
    "SalaryPerAnnum": this.productItem.SalaryPerAnnum,
    "SourceType": this.sourceType,
    "SubUsertype": this.subuserType,
    "SumInsured": this.productItem.SumInsured,
    "CommissionType": this.commissionType,
    "BrokerCode": this.brokerCode,
    "LoginId": loginId,
    "ApplicationId": appId,
    "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
    "RequestReferenceNo": this.requestReferenceNo,
    "BranchCode": this.branchCode,
    "ProductId": this.productId,
    "UserType": this.userType,
    "BrokerBranchCode": this.brokerbranchCode,
    "BdmCode": this.bdmCode,
    "CustomerCode": this.customerCode,
    "InsuranceId": this.insuranceId,
    "SectionId": sectionId,
    "Currency": this.commonDetails[0].Currency,
    "ExchangeRate": this.commonDetails[0].ExchangeRate,
    "HavePromoCode": this.commonDetails[0].HavePromoCode,
    "PromoCode": this.commonDetails[0].PromoCode,
    "PolicyPeriod": this.commonDetails[0].PolicyPeriod,
    "CustomerName": this.productItem.CustomerName,
    "Dob": dob,
    "JobJoiningMonth": this.productItem.JobJoiningMonth,
    "BetweenDiscontinued": this.productItem.BetweenDiscontinued,
    "EthicalWorkInvolved": this.productItem.EthicalWorkInvolved,
    "IndustryName": this.productItem?.IndustryName,
    "NatureOfBusinessId": this.productItem?.NatureOfBusinessId,
    "TotalNoOfEmployees": this.productItem?.TotalNoOfEmployees,
    "TotalExcludedEmployees": this.productItem?.TotalExcludedEmployees,
    "TotalRejoinedEmployees": this.productItem?.TotalRejoinedEmployees,
    "AccountOutstandingEmployees": this.productItem?.AccountOutstandingEmployees,
    "AccountAuditentType": this.productItem?.AccountAuditentType,
    "TotalOutstandingAmount": this.productItem?.TotalOutstandingAmount,
    "EndorsementDate": this.endorsementDate,
    "EndorsementEffectiveDate": this.endorsementEffectiveDate,
    "EndorsementRemarks": this.endorsementRemarks,
    "EndorsementType": this.endorsementType,
    "EndorsementTypeDesc": this.endorsementTypeDesc,
    "EndtCategoryDesc": this.endtCategoryDesc,
    "EndtCount": this.endtCount,
    "EndtPrevPolicyNo": this.endtPrevPolicyNo,
    "EndtPrevQuoteNo": this.endtPrevQuoteNo,
    "EndtStatus": this.endtStatus,
    "IsFinanceEndt": this.isFinanceEndt,
    "OrginalPolicyNo": this.orginalPolicyNo,
    "PolicyNo": this.endorsePolicyNo
  }
  let urlLink = `${this.motorApiUrl}api/saveeservicedetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
        this.updateComponent.referenceNo = data?.Result[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', data?.Result[0]?.RequestReferenceNo);
        let entry = data?.Result;
        entry['PolicyEndDate'] = this.commonDetails[0].PolicyEndDate;
        entry['PolicyStartDate'] = this.commonDetails[0].PolicyStartDate;

        entry['InsuranceType'] = sectionId;
        entry['MSRefNo'] = data?.Result[0]?.MSRefNo;
        entry['VdRefNo'] = data?.Result[0]?.VdRefNo;
        entry['CdRefNo'] = data?.Result[0]?.CdRefNo;
        entry['RequestReferenceNo'] = data?.Result[0]?.RequestReferenceNo;
        entry['Active'] = true;
        entry['VehicleId'] = data.Result[0]?.RiskId;
        if (this.uwQuestionList.length != 0) {
          let i = 0;
          let uwList: any[] = [];
          //let branchCode = '';
          for (let ques of this.uwQuestionList) {


            // if(this.userType!='Broker' && this.userType!='User'){
            //   branchCode = this.branchCode
            // }
            // else{
            //   branchCode = this.brokerbranchCode
            // }
            ques['BranchCode'] = this.branchCode;
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            // if(quoteStatus=='AdminRP'){
            //     createdBy = ;
            // }
            // else{
            //   createdBy = this.loginId;
            // }
            if (ques.QuestionType == '01') {

              ques['CreatedBy'] = createdBy;
              ques['RequestReferenceNo'] = this.requestReferenceNo;
              ques['UpdatedBy'] = this.loginId;
              ques["VehicleId"] = data.Result[0]?.RiskId
              uwList.push(ques);
            }
            else if (ques.Value != "") {
              ques['CreatedBy'] = createdBy;
              ques['RequestReferenceNo'] = this.requestReferenceNo;
              ques['UpdatedBy'] = this.loginId;
              ques["VehicleId"] = data.Result[0]?.RiskId
              uwList.push(ques);
            }
            i += 1;
            if (i == this.uwQuestionList.length) this.onSaveUWQues(uwList, entry);
          }
        }
        else {
          this.getCalculationDetails(entry);

        }
      }
    },
    (err) => { },
  );
}
onSMEFormSubmit() {

}
getCalculationDetails(vehicleDetails) {
  let createdBy = "";
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  if (quoteStatus == 'AdminRP') {
    //createdBy = this.vehicleDetailsList[0].CreatedBy;
  }
  else {
    createdBy = this.loginId;
  }
  if (this.productId != '3') {
    let sectionId = null;
    if (this.productId == '13') sectionId = '35';
    else if (this.productId == '14') sectionId = '37';
    else if (this.productId == '15') sectionId = '38';
    else if (this.productId == '32') sectionId = '43';
    let effectiveDate = null;
    if (this.endorsementSection) {
      effectiveDate = this.endorseEffectiveDate;
    }
    else {
      effectiveDate = this.commonDetails[0].PolicyStartDate
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "SectionId": sectionId,
      "ProductId": this.productId,
      "MSRefNo": vehicleDetails?.MSRefNo,
      "VehicleId": vehicleDetails?.VehicleId,
      "CdRefNo": vehicleDetails?.CdRefNo,
      "VdRefNo": vehicleDetails?.VdRefNo,
      "CreatedBy": createdBy,
      "productId": this.productId,
      "sectionId": sectionId,
      "RequestReferenceNo": this.requestReferenceNo,
      "EffectiveDate": effectiveDate,
      "PolicyEndDate": this.commonDetails[0].PolicyEndDate
    }
    let urlLink = `${this.commonApiUrl}calculator/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if (homeDetails) {
          if (this.productId != '3') {
            if (homeDetails.SectionId == undefined || homeDetails.SectionId == "undefined") homeDetails['SectionId'] = [sectionId];
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
          }

        }
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);

      },
      (err) => { },
    );
  }
  else if (vehicleDetails.length != 0) {
    let i = 0;
    for (let veh of vehicleDetails) {
      let effectiveDate = null; let coverModificationYN = 'N';
      if (this.endorsementSection) {
        effectiveDate = this.endorseEffectiveDate;
        let entry = this.enableFieldsList.some(ele => ele == 'Covers');
        if (entry) coverModificationYN = 'Y';
        else coverModificationYN = 'N';
      }
      else {
        effectiveDate = this.commonDetails[0].PolicyStartDate
      }

      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "SectionId": veh.SectionId,
        "ProductId": this.productId,
        "MSRefNo": veh?.MSRefNo,
        "VehicleId": veh?.VehicleId,
        "CdRefNo": veh?.CdRefNo,
        "VdRefNo": veh?.VdRefNo,
        "CreatedBy": createdBy,
        "productId": this.productId,
        "sectionId": veh.SectionId,
        "RequestReferenceNo": this.requestReferenceNo,
        "EffectiveDate": effectiveDate,
        "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
        "CoverModification": coverModificationYN
      }
      let urlLink = `${this.commonApiUrl}calculator/calc`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          let res: any = data;
          i += 1;
          if (i == vehicleDetails.length) {

            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
        },
        (err) => { },
      );
    }
  }
}
onSaveUWQues(uwList, entry) {
  if (uwList.length != 0) {
    let urlLink = `${this.commonApiUrl}api/saveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
      (data: any) => {
        if (data.Result) {
          if (this.productId == '19' || this.productId == '3') {
            this.onFinalProceed();
          }
          else { this.getCalculationDetails(entry); }
        }
      },
      (err) => { },
    );
  }
}
checkCoverValues() {
  if (this.productId == '19') {
    return ((this.productItem.BuildingSuminsured == '0' || this.productItem.BuildingSuminsured == '' ||
      this.productItem.ContentSuminsured == '0' || this.productItem.ContentSuminsured == '') && (this.productItem.MoneySinglecarrySuminsured == '0' || this.productItem.MoneySinglecarrySuminsured == '' ||
        this.productItem.MoneyAnnualcarrySuminsured == '0' || this.productItem.MoneyAnnualcarrySuminsured == '' ||
        this.productItem.MoneyInsafeSuminsured == '0' || this.productItem.MoneyInsafeSuminsured == '') && (this.productItem.FidelityAnyoccuSuminsured == '0' || this.productItem.FidelityAnyoccuSuminsured == '' ||
          this.productItem.FidelityAnnualSuminsured == '0' || this.productItem.FidelityAnnualSuminsured == '') && (this.productItem.TpliabilityAnyoccuSuminsured == '0' || this.productItem.TpliabilityAnyoccuSuminsured == '') &&
      (this.productItem.EmpliabilityExcessSuminsured == '0' || this.productItem.EmpliabilityExcessSuminsured == '' ||
        this.productItem.EmpliabilityAnnualSuminsured == '0' || this.productItem.EmpliabilityAnnualSuminsured == '') &&
      (this.productItem.GoodsTurnoverSuminsured == '0' || this.productItem.GoodsTurnoverSuminsured == '' ||
        this.productItem.GoodsSinglecarrySuminsured == '0' || this.productItem.GoodsSinglecarrySuminsured == ''))
  }

  if (this.productId == '3') {
    return ((this.productItem.BuildingSuminsured == '0' || this.productItem.BuildingSuminsured == '' || this.productItem.BuildingSuminsured == null) && (this.productItem.ContentSuminsured == '0' || this.productItem.ContentSuminsured == '') &&
      (this.productItem.PersonalAccidentSuminsured == '0' || this.productItem.PersonalAccidentSuminsured == '') && (this.productItem.PersonalIntermediarySuminsured == '0' || this.productItem.PersonalIntermediarySuminsured == '') && (this.productItem.AllriskSumInsured == '0' || this.productItem.AllriskSumInsured == ''))
  }
}
}
