import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
import { HouseHoldContents } from '../models/HouseHoldContents';
import { FireAlliedPerils } from '../models/FireAlliedPerils';
import { FormlyFieldTabs } from '../../tab.type';
import { MachineryBreakDown } from '../models/machineryBreakdown';
import { Money } from '../models/Money';
import { EmployersLiability } from '../models/EmployersLiability';
import { RepeatTypeComponent } from '../../repeatArray.type';
import { Fidelity } from '../models/Fidelity';
import { Burglary } from '../models/Burglary';
import { ElectronicEquipment } from '../newmodels/ElectronicEquipment';
import { Moneys } from '../newmodels/Moneys';
import { BussinessAllRisk } from '../newmodels/Bussinessallrisk';
import { PlantAllRisk } from '../newmodels/Plantallrisk';
import { EmployersLiabilitys } from '../newmodels/EmployersLiability';
import { Burglarys } from '../newmodels/Buglarys';
import { PublicLiabilitys } from '../newmodels/PublicLiablityCover';
import { CyberInsurance } from '../models/CyberInsurance';
import { MedicalInsurance } from '../models/MedicalInsurance';
import { FireAndMaterialDamage } from '../newmodels/Fire&MaterialDamage';
import Swal from 'sweetalert2';
import { Building } from '../models/Building';
import { AllRisk } from '../models/AllRisk';
import { PersonalLiability } from '../models/PersonalLiability';
import { PersonalAccident } from '../models/PersonalAccident';
import { MatStepper } from '@angular/material/stepper';
import { ShortTermVehicle } from '../models/ShortTermVehicle';
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
  @ViewChild('myStepper', {static: false}) private myStepper: MatStepper;
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
  userType: any;employeeError:boolean=false;
  brokerCode: any;
  applicationId: string;
  subuserType: any = null;
  acExecutiveId: any = null;
  commissionType: any = null;
  customerDetails: any; categoryDesc: any;
  requestReferenceNo: any = null;
  uwQuestionList: any[] = []; questionSection: boolean = false;
  dobminDate: Date;showSection:boolean = false;
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
  Hidevalidation: boolean =false;
  endorsementId: any;
  enableFieldsList: any;
  endorsePolicyNo: any;
  endorseCategory: any;
  endorsementName: any;selectedIndex:number=0;
  endorsementDate: any = null; endorsementEffectiveDate: any = null;
  endorsementType: any = null; endorsementRemarks: any = null;
  endorsementTypeDesc: any = null; endtCategoryDesc: any = null;
  endtCount: any = null; endtPrevPolicyNo: any = null;
  endtStatus: any = null; endtPrevQuoteNo: any = null;
  orginalPolicyNo: any = null; isFinanceEndt: any = null;
  endorseEffectiveDate: any; employeeCountList: any[] = [];
  dobDate: any; industryTypeList: any[] = [];
  wallMaterialList: any[] = []; audientTypeList: any[] = [];
  roofMaterialList: any[] = [];proceedSection:boolean = false;
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
  houseHoldContents: HouseHoldContents;fireAlliedPerils: FireAlliedPerils;
  indemityPeriodList: any[];public tab:FormlyFieldTabs=new FormlyFieldTabs();
  sectionCount: number;
  currencyCode: any;
  industryName: any;
  countryId: any;
  sectionList: any[]=[];
  CyperNewList: any[]=[];
  ProductsList: any[]=[];
  CyberCode:any="1";
  ProductCode:any="68";
  aooSIList: any[]=[];
  aggSIList: any[]=[];
  MoneyDirectorError:any;paymentMode='01';
  paymentModeList: any[]=[];
  endorseCoverModification: any=null;
  customerName: any;
  enableProceed: boolean;
  title: any;
  clientName: any;
  ownerName: any;
  dateOfBirth: any;
  clientType: string;
  emailId: any;
  mobileNo: any;
  idNumber: any;
  ownerList: any[]=[];
  makeList: any[]=[];
  fuelTypeList: any;
  colorList: any;
  bodyTypeList: any;
  usageList: any;
  motorCategoryList: any;
  modelList: any;
  noOfDays: number;
  vehicleDetails: any;
  motorDetails: any;
  constructor(private formlyJsonschema: FormlyJsonschema, private sharedService: SharedService, private datePipe: DatePipe,
    private router: Router, private http: HttpClient, private updateComponent: UpdateCustomerDetailsComponent) {
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if (commonDetails){this.commonDetails = commonDetails;}
    
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    console.log('boooooooo', this.brokerbranchCode);
    this.branchCode = this.userDetails.Result.BranchCode;
    console.log('branchCode', this.branchCode);
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.countryId = this.userDetails.Result.CountryId;
    this.productId = this.userDetails.Result.ProductId;
    if(this.productId=='46'){
      let commonDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if (commonDetails){this.commonDetails = commonDetails;}
    }
    this.currencyCode = this.commonDetails[0].Currency
    if(this.commonDetails[0].IndustryName) this.industryName = this.commonDetails[0].IndustryName;
    
    this.insuranceId = this.userDetails.Result.InsuranceId;
    console.log('OOOOOOOOOOOOO',this.insuranceId);
     this.updateComponent.showStepperSection = false;
    if (this.productId != '3' && this.productId != '19' && this.productId != '46' && this.productId != '42' && this.productId != '43' && this.productId!='39' && this.productId!='16' && this.productId!='1' && this.productId!='25' && this.productId!='21' && this.productId!='26' && this.productId!='27') {
      this.getOccupationList(null);
    }
    if(this.productId=='45'){
      this.currencyCode = 'TZS';
      this.paymentModeList = [
          {"Code":"01","CodeDesc":"Monthly"},
          {"Code":"02","CodeDesc":"Quarterly"},
          {"Code":"03","CodeDesc":"Half-Yearly"},
          {"Code":"04","CodeDesc":"Yearly"},
      ]
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
        this.endorseCoverModification = endorseObj?.CoverModificationYn
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
  public model: any = { maxDate: '2019-09-10',employeeList: [{}] }
  ngOnInit(): void {
    var d = new Date();
    let minDate = new Date();
    let regDate = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.dobDate = new Date(year - 18, month, day);
    if(this.customerDetails){
      console.log("customer details",this.customerDetails)
      this.title = this.customerDetails?.TitleDesc;
      this.clientName = this.customerDetails?.ClientName;
      this.ownerName = this.customerDetails?.ClientName;
      this.dateOfBirth = this.customerDetails?.DobOrRegDate;
      if(this.customerDetails?.PolicyHolderType == '1') this.clientType = "Individual";
      if(this.customerDetails?.PolicyHolderType == '2') this.clientType = "Corporate";
      //this.ownerCategory = this.customerDetails?.PolicyHolderType;
      this.emailId = this.customerDetails?.Email1;
      this.mobileNo = this.customerDetails?.MobileNo1;
      this.idNumber = this.customerDetails?.IdNumber;
    }
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
    else if (this.productId == '19' || this.productId=='3') {
      this.checkDomesticForm('direct')
      console.log(JSON.stringify(this.fields))
    }
    else if (this.productId == '32') {
      
      
    }
    else if (this.productId == '46') {
      let fireData = new ShortTermVehicle();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let bodyTypeHooks = { onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
              this.onBodyTypeChange('change')
        });
      } }
      let makeHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.onMakeChange('change')
        });
      } }
      this.fields[0].fieldGroup[0].fieldGroup[0].hooks = bodyTypeHooks;
      this.fields[0].fieldGroup[0].fieldGroup[1].hooks = makeHooks;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.setCommonFormValues();
      }
      else {
          this.productItem = new ProductData();
          this.onBodyTypeChange('change');
          this.formSection = true; this.viewSection = false;
          this.productItem.OwnerName = this.customerDetails.ClientName;
          if(this.customerDetails?.PolicyHolderType){
            this.productItem.OwnerCategory = this.customerDetails.PolicyHolderType;
          } 
          this.getMakeList();
          this.getFuelTypeList();
          this.getYearList();
          this.getColorsList();
          this.getBodyTypeList();
          this.getUsageList();
          //this.getMotorCategoryList();
      }
    }
    // else if (this.productId == '3') {
    //   this.checkDomesticForm('direct');
    // }
    else if (this.productId == '1' && this.insuranceId =='100002') {
      let fireData = new Burglary();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('change')
        });
      } }
      this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
       this.getNatureTradeList();
       this.getInsuranceForList();
       this.getWallMaterialList();
       this.buglaryloss();
       this.getRoofMaterialList();
       this.getCeilingMaterialList();
       this.getRegionList();
       this.getWindowConsMaterialList();
       this.getDoorsMaterilalList(); this.getNightLeftDoorList(); this.getBuildingOccupiedList();
       let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.setCommonFormValues();
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if (this.productId == '1' && this.insuranceId =='100004') {
      let fireData = new Burglarys();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
          this.ongetDistrictList('change')
        });
      } }
      this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
       this.getNatureTradeList();
       this.getInsuranceForList();
       this.getWallMaterialList();
       this.buglaryloss();
       this.getRoofMaterialList();
       this.getCeilingMaterialList();
       this.getRegionList();
       this.getWindowConsMaterialList();
       this.getDoorsMaterilalList(); this.getNightLeftDoorList(); this.getBuildingOccupiedList();
       let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.setCommonFormValues();
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='6' && this.insuranceId=='100002'){
      let fireData = new FireAlliedPerils();
      let entry = [];
      this.fields[0] = fireData?.fields;
      this.getIndemityPeriodList();
    }
    else if(this.productId=='6' && this.insuranceId=='100004'){
      let fireData = new FireAndMaterialDamage();
      let entry = [];
      this.fields[0] = fireData?.fields;
    }
    else if(this.productId=='39'){
      let fireData = new MachineryBreakDown();
      let entry = [];
      let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
            this.checkMachineryYNChanges()
        });
      }};
      let groupList = fireData?.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      let i=0;
      for(let group of groupList){
         group.fieldGroup[0].hooks = checkYnHooks;
         i+=1;
         if(i==groupList.length){ 
          this.fields[0] = fireData?.fields;
           this.checkMachineryYNChanges();
           let referenceNo = sessionStorage.getItem('quoteReferenceNo');
            if (referenceNo) {
              this.requestReferenceNo = referenceNo;
              this.setCommonFormValues();
            }
            else {
                this.productItem = new ProductData();
                this.formSection = true; this.viewSection = false;
            }
        }
      }

    }
    else if(this.productId=='16' && this.insuranceId != '100004'){
      console.log('MMMMMMMMMMMMMMMM',this.productId,this.insuranceId)
      let fireData = new Money();
      let entry = [];
      let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
            this.checkMoneyYNChanges()
        });
      }};
      let groupList:any = fireData?.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      let i=0;
        for(let group of groupList){
           group.fieldGroup[0].hooks = checkYnHooks;
           i+=1;
           if(i==groupList.length){
            this.fields[0] = fireData?.fields;
            let referenceNo = sessionStorage.getItem('quoteReferenceNo');
            this.checkMoneyYNChanges();
            if (referenceNo) {
              this.requestReferenceNo = referenceNo;
              this.setCommonFormValues();
            }
            else {
                this.productItem = new ProductData();
                this.formSection = true; this.viewSection = false;
            }
          }
        }
      
      console.log("Final Fields",groupList);
      
    }

    else if(this.productId=='16' && this.insuranceId == '100004'){
      console.log('UUUUUUUUUUUUU',this.productId,this.insuranceId)
      let fireData = new Moneys();
      let entry = [];
      let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
        field.formControl.valueChanges.subscribe(() => {
            this.checkMoneyYNChanges()
        });
      }};
      let groupList:any = fireData?.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
      let i=0;
        for(let group of groupList){
           group.fieldGroup[0].hooks = checkYnHooks;
           i+=1;
           if(i==groupList.length){
            this.fields[0] = fireData?.fields;
            let referenceNo = sessionStorage.getItem('quoteReferenceNo');
            this.checkMoneyYNChanges();
            if (referenceNo) {
              this.requestReferenceNo = referenceNo;
              this.setCommonFormValues();
            }
            else {
                this.productItem = new ProductData();
                this.formSection = true; this.viewSection = false;
            }
          }
        }
      
      console.log("Final Fields",groupList);
      
    }
    
    else if(this.productId=='21'){
      // let fireData = new FireAlliedPerils();
      // let entry = [];
      // this.fields[0] = fireData?.fields;
      // this.getIndemityPeriodList();
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      let fireData = new PlantAllRisk();
      let entry = [];
      this.fields[0] = fireData?.fields;
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues();
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
     
    // else if(this.productId=='20'){
    //   let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //   let fireData = new FireAndMaterialDamage();
    //   let entry = [];
    //   this.fields[0] = fireData?.fields;
    //   if (referenceNo) {
    //     this.requestReferenceNo = referenceNo;
    //     this.productItem = new ProductData();
    //     this.setCommonFormValues();
       
    //   }
    //   else {
    //       this.productItem = new ProductData();
    //       this.formSection = true; this.viewSection = false;
    //   }
    // }
    else if(this.productId=='26'){
     
      let fireData = new BussinessAllRisk();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues();
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='27'){
     
      let fireData = new PublicLiabilitys();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues();
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='25'){
     
      let fireData = new ElectronicEquipment();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues();
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='42'){
      let fireData = new CyberInsurance();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.setCommonFormValues();
       
      }
      else {
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.productId=='43'){
      let fireData = new MedicalInsurance();
      let entry = [];
      this.fields[0] = fireData?.fields;
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.requestReferenceNo = referenceNo;
        this.productItem = new ProductData();
        this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.options = [
          { value: 'A', 
            list:[
                "Nurses","Dietician","Lab/Path.Tech","Physiotherapist","X-Ray Tech","Scanning Tech.Pathologist",
                "Clinical Pathologist","Forensic Pathologist"
            ] 
          }, 
          { value: 'B', list:[
                "Midwife", "General Practitioner", "Psychiatrist", "Nephrologist", "Radiologist", "Ophthalmologist (non-surgical)", "Dentist", "Acupuncture Specialist", "Pharmacist", "Emergency doctor", "Neurologist (Non-Surgical)", "Pulmonologist(non-surgical)", "Gastroenterologist(non-surgical)", "Internist (non-surgical)"
          ] },
          { value: 'C', list:[
            "Surgeons including Vascular/cardiovascular", "maxillofacial", "thoracic", "ENT (ear/nose/throat)", "Neurologist", "Urologist", "Plastic", "Venereal Disease Specialist and Dermatologist", "Ophthalmologist", "Neurology", "Gastroenterologist", "Rheumatologist", "Pulmonologist"
          ]},
          { value: 'X', list:[
            "Non-Surgical Specialist", "Gynaecologist", "Obstetrician & Gynaecologist", "Cardiologist", "Anaesthetist", "Paediatrician(non-surgical)", "Obstetrician", "Paediatrician(surgical)", "General surgeon", "orthopaedic surgery", "Doctor (including Surgery)", "Doctor (non-surgical)", "haematology"
          ]}
        ];
        let aggHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.ongetAggSIList('change')
          });
        } }
        this.fields[0].fieldGroup[0].fieldGroup[1].hooks = aggHooks;
        this.setCommonFormValues();
        this.getAooSIList();
        console.log("Final Forms ",this.fields)
        
        //this.setCommonFormValues();
       
      }
      else {
          this.productItem = new ProductData();
          this.fields[0].fieldGroup[0].fieldGroup[0].templateOptions.options = [
            { value: 'A', 
            list:[
                "Nurses","Dietician","Lab/Path.Tech","Physiotherapist","X-Ray Tech","Scanning Tech.Pathologist",
                "Clinical Pathologist","Forensic Pathologist"
            ] 
          }, 
          { value: 'B', list:[
                "Midwife", "General Practitioner", "Psychiatrist", "Nephrologist", "Radiologist", "Ophthalmologist (non-surgical)", "Dentist", "Acupuncture Specialist", "Pharmacist", "Emergency doctor", "Neurologist (Non-Surgical)", "Pulmonologist(non-surgical)", "Gastroenterologist(non-surgical)", "Internist (non-surgical)"
          ] },
          { value: 'C', list:[
            "Surgeons including Vascular/cardiovascular", "maxillofacial", "thoracic", "ENT (ear/nose/throat)", "Neurologist", "Urologist", "Plastic", "Venereal Disease Specialist and Dermatologist", "Ophthalmologist", "Neurology", "Gastroenterologist", "Rheumatologist", "Pulmonologist"
          ]},
          { value: 'X', list:[
            "Non-Surgical Specialist", "Gynaecologist", "Obstetrician & Gynaecologist", "Cardiologist", "Anaesthetist", "Paediatrician(non-surgical)", "Obstetrician", "Paediatrician(surgical)", "General surgeon", "orthopaedic surgery", "Doctor (including Surgery)", "Doctor (non-surgical)", "haematology"
          ]}
          ];
          this.fields[0].fieldGroup[0].fieldGroup[1].props.options=[
            {label:"--Select--",value:''},
            {label:"100,000",value:'100000'},
            {label:"50,000",value:'50000'},
            {label:"25,000",value:'25000'},
            {label:"15,000",value:'15000'},
          ];
          this.fields[0].fieldGroup[0].fieldGroup[2].props.options=[
            {label:"--Select--",value:''},
            {label:"100,000",value:'100000'},
            {label:"50,000",value:'50000'},
            {label:"25,000",value:'25000'},
            {label:"15,000",value:'15000'},
          ]
          console.log("Final Forms ",this.fields)
          this.formSection = true; this.viewSection = false;
          this.formSection = true; this.viewSection = false;
      }
    }
    this.BenifitList = [
      { Code: 1, CodeDescription: '12 Months' },
      { Code: 2, CodeDescription: '24 Months' },
      { Code: 3, CodeDescription: '36 Months' },
    ];
    this.getUWDetails()

    if (this.productId == '19' || this.productId=='3') this.getIndustryList();
    if (this.productId == '32') {
      this.getIndustryTypeList();
      this.getEmployeeCountList();
      this.getAudientTypeList();
      this.getSumInsuredList()
    }
    if (this.productId=='42'){
      this.cyberinsutypes();
      this.productTypes();
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
          //this.setSMEFormValues(type)
          //if (this.productId == '3') this.setSMEFormValues('edit');
          if (this.productId == '19' || this.productId=='3') this.setSMEForm('create', type);
        }
        else {
          this.productItem.BuildingBuildYear = '';
          this.productItem.BuildingOwnerYn = 'Y';

           if (this.productId == '3') this.setDomesticForm('create', type);
           if (this.productId == '19' || this.productId=='3') this.setSMEForm('create', type);
        }
      }
      else {
        if (this.coversRequired == 'C') this.productItem.BuildingSuminsured = null;
        else if (this.coversRequired == 'B') this.productItem.ContentSuminsured = null;
        // if (this.productId == '3') this.setDomesticForm('change', type);
        else if (this.productId == '19' || this.productId=='3') this.setSMEForm('edit', type);
      }


    }
  }
  setSMEForm(type, mode) {
    let sections:any[] = this.commonDetails[0].SectionId;
    this.tab = new FormlyFieldTabs();
    this.fields = [
      {
        type: 'tabs',
        fieldGroup: [
          
          
        ],
      }
    ];
    
    if(sections){
      //this.updateComponent.setTabCountSection(0);
      this.showSection = true;
      if(sections.some(ele=>ele=='1')){
        let contentData = new Building();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]);
        this.getWallMaterialList();
        this.getRoofMaterialList();
        this.getbuildingpurposeList();
      }
      if(sections.some(ele=>ele=='40')){
        let fireData = new FireAlliedPerils();
        let entry = [];
        entry.push(fireData?.fields);
        this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
        this.getIndemityPeriodList();
      }
      if(sections.some(ele=>ele=='47')){
        let contentData = new HouseHoldContents();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields])
      }
      if(sections.some(ele=>ele=='36')){
        let contentData = new PersonalLiability();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields])
      }
      if(sections.some(ele=>ele=='35')){
        let contentData = new PersonalAccident();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields])
      }
      if(sections.some(ele=>ele=='3')){
        let contentData = new AllRisk();
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields])
      }
      if(sections.some(ele=>ele=='45')){
        let employeeData = new EmployersLiability();
        let field = {
          props: { label: 'Employers Liability' },
          fieldGroup: employeeData.fields
        }
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field]);
      }
      if(sections.some(ele=>ele=='43')){
        let fidelity = new Fidelity();
        let field = {
          props: { label: 'Fidelity' },
          fieldGroup: fidelity.fields
        }
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field]);
      }
      if(sections.some(ele=>ele=='45')) this.productItem.employeeList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
        if(sections.some(ele=>ele=='43')) this.productItem.fidelityList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
      if(sections.some(ele=>ele=='41')){
        let contentData = new MachineryBreakDown();
        let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
              this.checkMachineryYNChanges()
          });
        }};
        let groupList = contentData.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
        let i=0;
        for(let group of groupList){
           group.fieldGroup[0].hooks = checkYnHooks;
           i+=1;
           if(i==groupList.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([contentData?.fields]); this.checkMachineryYNChanges()}
        }
      }
      if(sections.some(ele=>ele=='42')){
        let money = new Money();
        let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
              this.checkMoneyYNChanges()
          });
        }};
        let groupList = money.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
        let i=0;
        for(let group of groupList){
           group.fieldGroup[0].hooks = checkYnHooks;
           i+=1;
           if(i==groupList.length){this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([money?.fields]); this.checkMoneyYNChanges()}
        }
        // this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([money?.fields])
      }
      
      if(sections.some(ele=>ele=='52')){
        let fireData = new Burglary();
        let field = {
          props: { label: 'Burglary' },
          fieldGroup: [fireData.fields]
        }
        console.log("Burglary Fields",field)
        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.ongetDistrictList('change')
          });
        } }
        
        field.fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
        this.fields[0].fieldGroup = this.fields[0].fieldGroup.concat([field])
          this.getNatureTradeList();
          this.getInsuranceForList();
          this.getWallMaterialList();
          this.buglaryloss();
          this.getRoofMaterialList();
          this.getCeilingMaterialList();
          this.getRegionList();
          this.getWindowConsMaterialList();
          this.getDoorsMaterilalList(); 
          this.getNightLeftDoorList(); this.getBuildingOccupiedList();
      }
      if(this.requestReferenceNo){
           this.sectionCount = 0;
           if(sections.some(ele=>ele=='1')) this.getBuildingDetails(sections);
           if(sections.some(ele=>ele=='3')) this.getAllRiskDetails(sections);
           if(sections.some(ele=>ele=='47')) this.getContentDetails(sections);
           if(sections.some(ele=>ele=='35')) this.getPersonalAccidentDetails(sections);
           if(sections.some(ele=>ele=='36')) this.getPersonalLiabilityDetails(sections);
           if(sections.some(ele=>ele=='40')) this.getFireAlliedRiskDetails(sections);
           if(sections.some(ele=>ele=='45')){ this.getEmployeeRiskDetails(sections)}
           if(sections.some(ele=>ele=='43')){ this.getFidelityRiskDetails(sections)}
           if(sections.some(ele=>ele=='41')){ this.getMachineryBreakDownDetails(sections)}
           if(sections.some(ele=>ele=='42')){ this.getMoneyDetails(sections)}
           if(sections.some(ele=>ele=='52')){ this.getBurglaryDetails(sections) }
           if(sections.some(ele=>ele=='3') && this.productId=='21' || this.productId == '26'){ this.getPlantallrisk(sections) }
          //  if(sections.some(ele=>ele=='3') && this.productId=='21'){ this.getElectronicEquipment(sections) }
           if(sections.some(ele=>ele=='56' || ele=='53' || ele=='54')){ 
            this.sectionCount +=1;
            if(sections.length==this.sectionCount){
              this.formSection = true; this.viewSection = false;
            }
           }
          
      }
      else{
        
        this.formSection = true; this.viewSection = false;
      }
      console.log("Final Fields",this.fields)
      //  if (type == 'create' || mode == 'change') {  }
      //  else { this.formSection = false; this.viewSection = true; };
    }
    
  } 
checkMachineryYNChanges(){
  console.log("Form",this.productItem,this.fields)
  if(this.productId=='19'){
    let fields = this.fields[0].fieldGroup;
      for(let field of fields){
        if(field.props.label=='Machinery BreakDown'){
            let tableData = field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
            tableData[0].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.PowerPlantSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
            tableData[1].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ElecMachinesSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
            tableData[2].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.EquipmentSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
            tableData[3].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.MachineEquipSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
            tableData[4].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.GeneralMachineSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
            tableData[5].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ManuUnitsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
            tableData[6].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.BoilerPlantsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
            if(!this.productItem.PowerPlantSIYN){this.productItem.PowerPlantSi = '0'; this.form?.controls['PowerPlantSi']?.setValue('0')}
            if(!this.productItem.ElecMachinesSIYN) {this.productItem.ElecMachinesSi = '0'; this.form?.controls['ElecMachinesSi']?.setValue('0')}
            if(!this.productItem.EquipmentSIYN) { this.productItem.EquipmentSi = '0'; this.form?.controls['EquipmentSi']?.setValue('0')}
            if(!this.productItem.MachineEquipSIYN) { this.productItem.MachineEquipSi = '0'; this.form?.controls['MachineEquipSi']?.setValue('0')}
            if(!this.productItem.GeneralMachineSIYN) { this.productItem.GeneralMachineSi = '0'; this.form?.controls['GeneralMachineSi']?.setValue('0')}
            if(!this.productItem.ManuUnitsSIYN) { this.productItem.ManuUnitsSi = '0'; this.form?.controls['ManuUnitsSi']?.setValue('0')}
            if(!this.productItem.BoilerPlantsSIYN) { this.productItem.BoilerPlantsSi = '0'; this.form?.controls['BoilerPlantsSi']?.setValue('0')}
        }
      }
  }
  else{
    let tableData = this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
    tableData[0].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.PowerPlantSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    tableData[1].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ElecMachinesSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    tableData[2].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.EquipmentSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    tableData[3].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.MachineEquipSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    tableData[4].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.GeneralMachineSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    tableData[5].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.ManuUnitsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    tableData[6].fieldGroup[2].templateOptions['disabled'] = (!this.productItem.BoilerPlantsSIYN || (this.endorsementSection && this.endorsementId!=850 && this.endorsementId!=851));
    if(!this.productItem.PowerPlantSIYN){this.productItem.PowerPlantSi = '0'; this.form?.controls['PowerPlantSi']?.setValue('0')}
    if(!this.productItem.ElecMachinesSIYN) {this.productItem.ElecMachinesSi = '0'; this.form?.controls['ElecMachinesSi']?.setValue('0')}
    if(!this.productItem.EquipmentSIYN) { this.productItem.EquipmentSi = '0'; this.form?.controls['EquipmentSi']?.setValue('0')}
    if(!this.productItem.MachineEquipSIYN) { this.productItem.MachineEquipSi = '0'; this.form?.controls['MachineEquipSi']?.setValue('0')}
    if(!this.productItem.GeneralMachineSIYN) { this.productItem.GeneralMachineSi = '0'; this.form?.controls['GeneralMachineSi']?.setValue('0')}
    if(!this.productItem.ManuUnitsSIYN) { this.productItem.ManuUnitsSi = '0'; this.form?.controls['ManuUnitsSi']?.setValue('0')}
    if(!this.productItem.BoilerPlantsSIYN) { this.productItem.BoilerPlantsSi = '0'; this.form?.controls['BoilerPlantsSi']?.setValue('0')}
  }
}
checkMoneyYNChanges(){
  if(this.productId=='19'){
    let fields = this.fields[0].fieldGroup;
    for(let field of fields){
      if(field.props.label=='Money'){
        console.log("Moneyyyyyyyyyy product 19",this.fields[0].fieldGroup)
        let tableData = field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
        tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
        tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
        tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
        tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
        tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
        tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
        if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneySafeLimit = '0'; this.form?.controls['MoneySafeLimit']?.setValue('0')}
        if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutofSafe = '0'; this.form?.controls['MoneyOutofSafe']?.setValue('0')}
        if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyDirectorResidence = '0'; this.form?.controls['MoneyDirectorResidence']?.setValue('0')}
        if(!this.productItem.CashInTransitSIYN) { this.productItem.MoneyMajorLoss = '0'; this.form?.controls['MoneyMajorLoss']?.setValue('0')}
        if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.MoneyCollector = '0'; this.form?.controls['MoneyCollector']?.setValue('0')}
        if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualEstimate = '0'; this.form?.controls['MoneyAnnualEstimate']?.setValue('0')}
          // let tableData = field.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
          // tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
          // tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
          // tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
          // tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
          // tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
          // tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInSafeSIYN;
          // tableData[6].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
          // if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneyInSafeBusiness = '0'; this.form?.controls['MoneyInSafeBusiness']?.setValue('0')}
          // if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutSafeBusiness = '0'; this.form?.controls['MoneyOutSafeBusiness']?.setValue('0')}
          // if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyInPremises = '0'; this.form?.controls['MoneyInPremises']?.setValue('0')}
          // if(!this.productItem.CashInTransitSIYN) { this.productItem.CashInTransit = '0'; this.form?.controls['CashInTransit']?.setValue('0')}
          // if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.CashInHandEmployees = '0'; this.form?.controls['CashInHandEmployees']?.setValue('0')}
          // if(!this.productItem.CashInSafeSIYN) { this.productItem.CashInSafe = '0'; this.form?.controls['CashInSafe']?.setValue('0')}
          // if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualcarrySuminsured = '0'; this.form?.controls['MoneyAnnualcarrySuminsured']?.setValue('0')}
         
      }
    }
  }
  else if(this.productId == '16' && this.insuranceId != '100004'){
    console.log("Moneyyyyyyyyyy 10002",this.fields[0].fieldGroup)
    let tableData = this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
    tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
    tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
    tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
    tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
    tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
    tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
    //tableData[6].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
    if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneySafeLimit = '0'; this.form?.controls['MoneySafeLimit']?.setValue('0')}
    if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutofSafe = '0'; this.form?.controls['MoneyOutofSafe']?.setValue('0')}
    if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyDirectorResidence = '0'; this.form?.controls['MoneyDirectorResidence']?.setValue('0')}
    if(!this.productItem.CashInTransitSIYN) { this.productItem.MoneyMajorLoss = '0'; this.form?.controls['MoneyMajorLoss']?.setValue('0')}
    if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.MoneyCollector = '0'; this.form?.controls['MoneyCollector']?.setValue('0')}
    if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualEstimate = '0'; this.form?.controls['MoneyAnnualEstimate']?.setValue('0')}
    // if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneyInSafeBusiness = '0'; this.form?.controls['MoneyInSafeBusiness']?.setValue('0')}
    // if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutSafeBusiness = '0'; this.form?.controls['MoneyOutSafeBusiness']?.setValue('0')}
    // if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyInPremises = '0'; this.form?.controls['MoneyInPremises']?.setValue('0')}
    // if(!this.productItem.CashInTransitSIYN) { this.productItem.CashInTransit = '0'; this.form?.controls['CashInTransit']?.setValue('0')}
    // if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.CashInHandEmployees = '0'; this.form?.controls['CashInHandEmployees']?.setValue('0')}
    // if(!this.productItem.CashInSafeSIYN) { this.productItem.CashInSafe = '0'; this.form?.controls['CashInSafe']?.setValue('0')}
    // if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualcarrySuminsured = '0'; this.form?.controls['MoneyAnnualcarrySuminsured']?.setValue('0')}
    console.log("Tablessssss",tableData)
  }
  else if(this.productId == '16' && this.insuranceId == '100004'){
    console.log("Moneyyyyyyyyyy 100004",this.fields[0].fieldGroup)
    let tableData = this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
    
    tableData[0].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInSafeBusinessSIYN;
    tableData[1].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyOutSafeBusinessSIYN;
    tableData[2].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyInPremisesSIYN;
    tableData[3].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInTransitSIYN;
    tableData[4].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInHandEmployeesSIYN;
    // tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.CashInSafeSIYN;
    tableData[5].fieldGroup[2].templateOptions['disabled'] = !this.productItem.MoneyAnnualcarrySuminsuredSIYN;
    if(!this.productItem.MoneyInSafeBusinessSIYN){this.productItem.MoneySafeLimit = '0'; this.form?.controls['MoneySafeLimit']?.setValue('0')}
    if(!this.productItem.MoneyOutSafeBusinessSIYN) {this.productItem.MoneyOutofSafe = '0'; this.form?.controls['MoneyOutofSafe']?.setValue('0')}
    if(!this.productItem.MoneyInPremisesSIYN) { this.productItem.MoneyDirectorResidence = '0'; this.form?.controls['MoneyDirectorResidence']?.setValue('0')}
    if(!this.productItem.CashInTransitSIYN) { this.productItem.MoneyMajorLoss = '0'; this.form?.controls['MoneyMajorLoss']?.setValue('0')}
    if(!this.productItem.CashInHandEmployeesSIYN) { this.productItem.MoneyCollector = '0'; this.form?.controls['MoneyCollector']?.setValue('0')}
    // if(!this.productItem.CashInSafeSIYN) { this.productItem.CashInSafe = '0'; this.form?.controls['CashInSafe']?.setValue('0')}
    if(!this.productItem.MoneyAnnualcarrySuminsuredSIYN) { this.productItem.MoneyAnnualEstimate = '0'; this.form?.controls['MoneyAnnualEstimate']?.setValue('0')}
    console.log("Tablessssss",tableData)
  }
}
getBurglaryDetails(sections){
  let sectionId = null;
  if(this.productId=='19') sectionId='52';
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  sectionId
  }
  let urlLink = `${this.motorApiUrl}api/slide3/getburglaryandhouse`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let details = data?.Result;
        this.productItem.AccessibleWindows = details?.AccessibleWindows;
            this.productItem.Address = details?.Address;
            this.productItem.BackDoors = details?.BackDoors;
            this.productItem.BuildingOccupied = details?.BuildingOccupied;
            this.productItem.CeilingType = details?.CeilingType;
             if(details?.RegionCode!=null && details?.RegionCode!=''){
              this.productItem.RegionCode = details?.RegionCode;
              this.ongetDistrictList('direct');
              this.productItem.DistrictCode = details?.DistrictCode
            }
            this.productItem.DoorsMaterialId = details?.DoorsMaterialId;
            this.productItem.WallType = details?.WallType;
            this.productItem.RoofType = details?.RoofType;
            this.productItem.BuildingOwnerYn = details?.BuildingOwnerYn;
            this.productItem.BuildingBuildYear = details?.BuildingBuildYear;
            this.productItem.FrontDoors = details?.FrontDoors;
            this.productItem.InternalWallType = details?.InternalWallType;
            this.productItem.NatureOfTradeId = details?.NatureOfTradeId;
            this.productItem.NightLeftDoor = details?.NightLeftDoor;
            this.productItem.OccupiedYear = details?.OccupiedYear;
            this.productItem.ShowWindow = details?.ShowWindow;
            this.productItem.TrapDoors = details?.TrapDoors;
            this.productItem.WatchmanGuardHours = details?.WatchmanGuardHours;
            this.productItem.WindowsMaterialId = details?.WindowsMaterialId;
            this.productItem.ApplianceSi = details?.ApplianceSi;
            this.productItem.GoodsSi = details?.GoodsSi;
            this.productItem.FurnitureSi = details?.FurnitureSi;
            this.productItem.CashValueablesSi = details?.CashValueablesSi;
            this.productItem.StockInTradeSi = details?.StockInTradeSi;
            if(details?.ApplianceLossPercent!='0' && details?.ApplianceLossPercent != null) this.productItem.ApplianceLossPercent = details?.ApplianceLossPercent;
            if(details?.CashValueablesLossPercent!='0' && details?.CashValueablesLossPercent != null) this.productItem.CashValueablesLossPercent = details?.CashValueablesLossPercent;
            if(details?.FurnitureLossPercent!='0' && details?.FurnitureLossPercent != null) this.productItem.FurnitureLossPercent = details?.FurnitureLossPercent;
            if(details?.GoodsLossPercent!='0' && details?.GoodsLossPercent != null) this.productItem.GoodsLossPercent = details?.GoodsLossPercent;
            if(details?.StockLossPercent!='0' && details?.StockLossPercent != null) this.productItem.StockLossPercent = details?.StockLossPercent;
            if (details?.InsuranceForId != null) {
              let value = {}, i = 0;
              for (let element of details?.InsuranceForId) {
                if (element != '0') {
                  value[element] = true;
                }
                i += 1;
                if (i == details?.InsuranceForId.length)this.productItem.InsuranceForId = value;
              }
            }
            this.sectionCount +=1;
            if(sections.length==this.sectionCount){
              this.formSection = true; this.viewSection = false;
            }
      }
    },
    (err) => { },
  );
}
getElectronicEquipment(sections){
  let sectionId = null;
  if(this.productId=='25') sectionId='39';
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  sectionId
  }
  let urlLink = `${this.motorApiUrl}api/slide6/getelectronicequip`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let details = data?.Result;
        console.log('PPPPPPPPPPPPPPPPP',details);
        this.productItem.ElectronicEquipSuminsured = details?.MiningPlantSi;
       
        console.log('KKKKKKKKKKKKKKKKKK',this.productItem.ElectronicEquipSuminsured);
       
      }
    },
    (err) => { },
  );
}
getPlantallrisk(sections){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  '3'
  }
  let urlLink = `${this.motorApiUrl}api/slide2/getallriskdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let details = data?.Result;
        this.productItem.AllriskSumInsured = details?.AllriskSumInsured;
      }
    },
    (err) => { },
  );
}
getMoneyDetails(sections){
  let sectionId = null;
  if(this.productId=='19') sectionId='42';
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  sectionId
  }
  let urlLink = `${this.motorApiUrl}api/slide10/getmoneydetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let details = data?.Result;
        this.productItem.MoneySafeLimit=details?.MoneySafeLimit;
        this.productItem.MoneyOutofSafe=details?.MoneyOutofSafe;
        this.productItem.MoneyDirectorResidence=details?.MoneyDirectorResidence;
        this.productItem.MoneyCollector=details?.MoneyCollector;
        this.productItem.MoneyAnnualEstimate=details?.MoneyAnnualEstimate;
        this.productItem.MoneyMajorLoss=details?.MoneyMajorLoss;
        // this.productItem.CashInHandEmployees = details?.CashInHandEmployees;
        // this.productItem.CashInSafe = details?.CashInSafe;
        // this.productItem.CashInTransit = details?.CashInTransit;
        // this.productItem.MoneyAnnualcarrySuminsured = details?.MoneyAnnualcarrySuminsured;
        // this.productItem.MoneyInPremises = details?.MoneyInPremises;
        // this.productItem.MoneyInSafeBusiness = details?.MoneyInSafeBusiness;
        // this.productItem.MoneyOutSafeBusiness = details?.MoneyOutSafeBusiness;
        if(details?.EndorsementDate){
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsementRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategoryDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus;
          this.isFinanceEndt = details?.IsFinanceEndt;
          this.orginalPolicyNo = details?.OrginalPolicyNo;
        }
        // if(this.productItem.CashInHandEmployees!=null && this.productItem.CashInHandEmployees!='0' && this.productItem.CashInHandEmployees!='' && this.productItem.CashInHandEmployees!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
        // if(this.productItem.CashInSafe!=null && this.productItem.CashInSafe!='0' && this.productItem.CashInSafe!='' && this.productItem.CashInSafe!='0.0') this.productItem.CashInSafeSIYN = true;
        // if(this.productItem.CashInTransit!=null && this.productItem.CashInTransit!='0' && this.productItem.CashInTransit!='' && this.productItem.CashInTransit!='0.0') this.productItem.CashInTransitSIYN = true;
        // if(this.insuranceId!== '100004' && this.productItem.MoneyAnnualcarrySuminsured!=null && this.productItem.MoneyAnnualcarrySuminsured!='0' && this.productItem.MoneyAnnualcarrySuminsured!='' && this.productItem.MoneyAnnualcarrySuminsured!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
        // if(this.productItem.MoneyInPremises!=null && this.productItem.MoneyInPremises!='0' && this.productItem.MoneyInPremises!='' && this.productItem.MoneyInPremises!='0.0') this.productItem.MoneyInPremisesSIYN = true;
        // if(this.productItem.MoneyInSafeBusiness!=null && this.productItem.MoneyInSafeBusiness!='0' && this.productItem.MoneyInSafeBusiness!='' && this.productItem.MoneyInSafeBusiness!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
        // if(this.productItem.MoneyOutSafeBusiness!=null && this.productItem.MoneyOutSafeBusiness!='0'&& this.productItem.MoneyOutSafeBusiness!='' && this.productItem.MoneyOutSafeBusiness!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
        if(this.productItem.MoneySafeLimit!=null && this.productItem.MoneySafeLimit!='0' && this.productItem.MoneySafeLimit!='' && this.productItem.MoneySafeLimit!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
        if(this.productItem.MoneyOutofSafe!=null && this.productItem.MoneyOutofSafe!='0' && this.productItem.MoneyOutofSafe!='' && this.productItem.MoneyOutofSafe!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
        if(this.productItem.MoneyDirectorResidence!=null && this.productItem.MoneyDirectorResidence!='0' && this.productItem.MoneyDirectorResidence!='' && this.productItem.MoneyDirectorResidence!='0.0') this.productItem.MoneyInPremisesSIYN = true;
        if(this.productItem.MoneyCollector!=null && this.productItem.MoneyCollector!='0' && this.productItem.MoneyCollector!='' && this.productItem.MoneyCollector!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
        if(this.productItem.MoneyAnnualEstimate!=null && this.productItem.MoneyAnnualEstimate!='0' && this.productItem.MoneyAnnualEstimate!='' && this.productItem.MoneyAnnualEstimate!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
        if(this.productItem.MoneyMajorLoss!=null && this.productItem.MoneyMajorLoss!='0' && this.productItem.MoneyMajorLoss!='' && this.productItem.MoneyMajorLoss!='0.0') this.productItem.CashInTransitSIYN = true;
        this.checkMoneyYNChanges();
        this.sectionCount +=1;
        if(sections.length==this.sectionCount){
          this.formSection = true; this.viewSection = false;
        }
      }
    },
    (err) => { },
  );
}
getMachineryBreakDownDetails(sections){
  let sectionId = null;
  if(this.productId=='19') sectionId='41';
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  sectionId
  }
  let urlLink = `${this.motorApiUrl}api/slide9/getmachinerybreakdown`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        let details = data?.Result;
        if(details?.EndorsementDate){
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsementRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategoryDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus;
          this.isFinanceEndt = details?.IsFinanceEndt;
          this.orginalPolicyNo = details?.OrginalPolicyNo;
        }
        this.productItem.BoilerPlantsSi = details?.BoilerPlantsSi;
        this.productItem.ElecMachinesSi = details?.ElecMachinesSi;
        this.productItem.EquipmentSi = details?.EquipmentSi;
        this.productItem.GeneralMachineSi = details?.GeneralMachineSi;
        this.productItem.MachineEquipSi = details?.MachineEquipSi;
        this.productItem.ManuUnitsSi = details?.ManuUnitsSi;
        this.productItem.PowerPlantSi = details?.PowerPlantSi;
        if(this.productItem.BoilerPlantsSi!=null && this.productItem.BoilerPlantsSi!='0' && this.productItem.BoilerPlantsSi!='' && this.productItem.BoilerPlantsSi!='0.0') this.productItem.BoilerPlantsSIYN = true;
        if(this.productItem.ElecMachinesSi!=null && this.productItem.ElecMachinesSi!='0' && this.productItem.ElecMachinesSi!='' && this.productItem.ElecMachinesSi!='0.0') this.productItem.ElecMachinesSIYN = true;
        if(this.productItem.EquipmentSi!=null && this.productItem.EquipmentSi!='0' && this.productItem.EquipmentSi!='' && this.productItem.EquipmentSi!='0.0') this.productItem.EquipmentSIYN = true;
        if(this.productItem.GeneralMachineSi!=null && this.productItem.GeneralMachineSi!='0' && this.productItem.GeneralMachineSi!='' && this.productItem.GeneralMachineSi!='0.0') this.productItem.GeneralMachineSIYN = true;
        if(this.productItem.MachineEquipSi!=null && this.productItem.MachineEquipSi!='0' && this.productItem.MachineEquipSi!='' && this.productItem.MachineEquipSi!='0.0') this.productItem.MachineEquipSIYN = true;
        if(this.productItem.ManuUnitsSi!=null && this.productItem.ManuUnitsSi!='0' && this.productItem.ManuUnitsSi!='' && this.productItem.ManuUnitsSi!='0.0') this.productItem.ManuUnitsSIYN = true;
        if(this.productItem.PowerPlantSi!=null && this.productItem.PowerPlantSi!='0' && this.productItem.PowerPlantSi!='' && this.productItem.PowerPlantSi!='0.0') this.productItem.PowerPlantSIYN = true;
        this.checkMachineryYNChanges();
        this.sectionCount +=1;
        if(sections.length==this.sectionCount){
          this.formSection = true; this.viewSection = false;
        }
      }
    },
    (err) => { },
  );
}
getFidelityRiskDetails(sections){
  let sectionId = null;
  if(this.productId=='19') sectionId='43';
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  sectionId
  }
  let urlLink = `${this.motorApiUrl}api/slide8/getfidelityemp`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        if(data.Result.length!=0) this.productItem.fidelityList = data.Result;
        //else this.productItem.fidelityList = [{"LiabilityOccupationId":'',"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
        this.getOccupationList(sections);
      }
    },
    (err) => { },
  );
}
getEmployeeRiskDetails(sections){
  let sectionId = null;
  if(this.productId=='19') sectionId='45';
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  sectionId
  }
  let urlLink = `${this.motorApiUrl}api/slide7/getempliablity`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        if(data.Result.length!=0) this.productItem.employeeList = data.Result;
        //else this.productItem.employeeList = [{"LiabilityOccupationId":'',"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
        this.getOccupationList(sections);
      }
    },
    (err) => { },
  );
}
getFireAlliedRiskDetails(sections){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  null
  }
  let urlLink = `${this.motorApiUrl}api/slide4/getfireandperils`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
            //this.productItem.ContentSuminsured = data?.Result?.ContentSuminsured;
            this.productItem.BuildingSuminsured = data?.Result?.BuildingSuminsured;
            this.productItem.IndemityPeriod = data?.Result?.IndemityPeriod;
            this.productItem.MakutiYn = data?.Result?.MakutiYn;
            let details = data.Result;
            if(details?.EndorsementDate){
              this.endorsementDate = details?.EndorsementDate;
              this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
              this.endorsementRemarks = details?.EndorsementRemarks;
              this.endorsementType = details?.EndorsementType;
              this.endorsementTypeDesc = details?.EndorsementTypeDesc;
              this.endtCategoryDesc = details?.EndtCategoryDesc;
              this.endtCount = details?.EndtCount;
              this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
              this.endtStatus = details?.EndtStatus;
              this.isFinanceEndt = details?.IsFinanceEndt;
              this.orginalPolicyNo = details?.OrginalPolicyNo;
            }
            this.sectionCount +=1;
            if(sections.length==this.sectionCount){
              this.formSection = true; this.viewSection = false;
            }
            console.log("Products",this.productItem)
      }
    },
    (err) => { },
  );
}
getContentDetails(sections){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  '47'
  }
  let urlLink = `${this.motorApiUrl}api/slide5/getcontent`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
            this.productItem.ContentSuminsured = data?.Result?.ContentSuminsured;
            let entry = data?.Result;
            if(entry.EndorsementDate){
              this.endorsementDate = entry?.EndorsementDate;
              this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
              this.endorsementRemarks = entry?.EndorsementRemarks;
              this.endorsementType = entry?.EndorsementType;
              this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
              this.endtCategoryDesc = entry?.EndtCategoryDesc;
              this.endtCount = entry?.EndtCount;
              this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
              this.endtStatus = entry?.EndtStatus;
              this.isFinanceEndt = entry?.IsFinanceEndt;
              this.orginalPolicyNo = entry?.OrginalPolicyNo;
            }
            this.sectionCount +=1;
            if(sections.length==this.sectionCount){
              this.formSection = true; this.viewSection = false;
            }
            console.log("Products",this.productItem)
      }
    },
    (err) => { },
  );
}
getPersonalAccidentDetails(sections){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  "35"
  }
  let urlLink = `${this.motorApiUrl}api/slide13/getpersonlaaccident`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        if(data.Result.length!=0){
          this.productItem.PersonalAccidentSuminsured = data.Result[0].SumInsured;
          if(data.Result[0].OccupationType!=null)this.productItem.OccupationType = data.Result[0].OccupationType;
          else this.productItem.OccupationType = null;
          let entry = data?.Result[0];
            if(entry.EndorsementDate){
              this.endorsementDate = entry?.EndorsementDate;
              this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
              this.endorsementRemarks = entry?.EndorsementRemarks;
              this.endorsementType = entry?.EndorsementType;
              this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
              this.endtCategoryDesc = entry?.EndtCategoryDesc;
              this.endtCount = entry?.EndtCount;
              this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
              this.endtStatus = entry?.EndtStatus;
              this.isFinanceEndt = entry?.IsFinanceEndt;
              this.orginalPolicyNo = entry?.OrginalPolicyNo;
            }
            console.log("Products",this.productItem)
        }
        else this.productItem.OccupationType = null;
        this.getOccupationList(sections);
      }
    },
    (err) => { },
  );
}
getPersonalLiabilityDetails(sections){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  "36"
  }
  let urlLink = `${this.motorApiUrl}api/slide7/getempliablity`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if (data.Result) {
        if(data.Result.length!=0){
          this.productItem.EmpLiabilitySi = data.Result[0].EmpLiabilitySi;
          this.productItem.LiabilityOccupationId = data.Result[0].LiabilityOccupationId;
          let entry = data?.Result[0];
            if(entry.EndorsementDate){
              this.endorsementDate = entry?.EndorsementDate;
              this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
              this.endorsementRemarks = entry?.EndorsementRemarks;
              this.endorsementType = entry?.EndorsementType;
              this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
              this.endtCategoryDesc = entry?.EndtCategoryDesc;
              this.endtCount = entry?.EndtCount;
              this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
              this.endtStatus = entry?.EndtStatus;
              this.isFinanceEndt = entry?.IsFinanceEndt;
              this.orginalPolicyNo = entry?.OrginalPolicyNo;
            }
            console.log("Products",this.productItem)
        }
        else this.productItem.LiabilityOccupationId = null;
        this.getOccupationList(sections);
      }
    },
    (err) => { },
  );
}
getBuildingDetails(sections){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  "1"
  }
  let urlLink = `${this.motorApiUrl}api/slide14/getbuilding`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
            this.productItem.BuildingSuminsured = data?.Result?.BuildingSumInsured;
            this.productItem.BuildingBuildYear = data?.Result?.BuildingBuildYear;
            if(data?.Result?.BuildingOwnerYn) this.productItem.BuildingOwnerYn = data.Result.BuildingOwnerYn;
            if(data?.Result?.BuildingUsageId) this.productItem.BuildingUsageId = data.Result.BuildingUsageId;
            if(data?.Result?.WallType) this.productItem.WallType = data.Result.WallType;
            if(data?.Result?.RoofType) this.productItem.RoofType = data.Result.RoofType;
            let entry = data?.Result;
            if(entry.EndorsementDate){
              this.endorsementDate = entry?.EndorsementDate;
              this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
              this.endorsementRemarks = entry?.EndorsementRemarks;
              this.endorsementType = entry?.EndorsementType;
              this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
              this.endtCategoryDesc = entry?.EndtCategoryDesc;
              this.endtCount = entry?.EndtCount;
              this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
              this.endtStatus = entry?.EndtStatus;
              this.isFinanceEndt = entry?.IsFinanceEndt;
              this.orginalPolicyNo = entry?.OrginalPolicyNo;
            }
            this.sectionCount +=1;
            if(sections.length==this.sectionCount){
              this.formSection = true; this.viewSection = false;
            }
            console.log("Products",this.productItem)
      }
    },
    (err) => { },
  );
}
getAllRiskDetails(sections){
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId": '3'
  }
  let urlLink = `${this.motorApiUrl}api/slide2/getallriskdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
            this.productItem.AllriskSumInsured = data?.Result?.AllriskSumInsured;
            let entry = data?.Result;
            if(entry.EndorsementDate){
              this.endorsementDate = entry?.EndorsementDate;
              this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
              this.endorsementRemarks = entry?.EndorsementRemarks;
              this.endorsementType = entry?.EndorsementType;
              this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
              this.endtCategoryDesc = entry?.EndtCategoryDesc;
              this.endtCount = entry?.EndtCount;
              this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
              this.endtStatus = entry?.EndtStatus;
              this.isFinanceEndt = entry?.IsFinanceEndt;
              this.orginalPolicyNo = entry?.OrginalPolicyNo;
            }
            this.sectionCount +=1;
            if(sections.length==this.sectionCount){
              this.formSection = true; this.viewSection = false;
            }
            console.log("Products",this.productItem)
      }
    },
    (err) => { },
  );
}
addEmployee(){
  let entry = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
  this.model.investments = entry.concat(this.model.investments)
}
setDomesticForm(type, mode){
  if(this.insuranceId!='100004'){
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
  }

  if(this.insuranceId == '100004'){
    this.fields = [
      {
        type: 'stepper',
        fieldGroup: [
          {
            props: { label: 'All Risk - Excluding Cash , Jewellery' },
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
        
        
        ]
      }
    ];
  }
console.log('INSURANCE IDDDDDDD',this.insuranceId);
  if (this.coversRequired == 'C' && this.insuranceId!=='100004') {
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

  if (this.coversRequired == 'C' && this.insuranceId==='100004') {
    let entry = [
      {
        props: { label: 'Contents' },
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-6',
                type: 'commaSeparator',
                key: 'ContentSuminsured',

                props: {
                  label: `Contents(${this.commonDetails[0].Currency})`,
                  disabled: this.checkDisable('ContentSuminsured'),
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
      }
    ]
    this.fields[0].fieldGroup = entry.concat(this.fields[0].fieldGroup)
    this.productItem.BuildingUsageId = '';
    this.productItem.BuildingBuildYear = null;
    this.productItem.WallType = '';
    this.productItem.RoofType = '';
    this.productItem.BuildingSuminsured = 0;
  }
  if (this.coversRequired == 'BC' && this.insuranceId!=='100004') {
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
  if (this.coversRequired == 'BC' && this.insuranceId==='100004') {
    let entry = [
      {
        props: { label: 'Building Risk' },

        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
    
              {
                className: 'col-6',
                type: 'select',
                key: 'BuildingUsageId',
                props: {
                  label: 'Building Usage',
                  
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
                key: 'RoofType',
                props: {
                  label: 'Used Contruction Materials (Roof)',
                  disabled: this.checkDisable('RoofType'),
                  required: true,
                  options: [
                  ],
                },
                expressions: {

                },
              },

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
        props: { label: 'Content' },
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-6',
                type: 'commaSeparator',
                key: 'ContentSuminsured',

                props: {
                  label: `Content Sum Insured (${this.commonDetails[0].Currency})`,
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
    this.getOccupationList(null);
    if(this.coversRequired=='BC' || this.coversRequired=='B'){
      this.getWallMaterialList();
      this.getRoofMaterialList();
    }
    
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
              this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.wallMaterialList);
              this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.wallMaterialList);
            }
            else if(this.productId!='19' && this.productId!='3'){
              this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.wallMaterialList);
            }
            else{
              let fields = this.fields[0].fieldGroup;
              for(let field of fields){
                if(field.props.label=='Burglary'){
                        console.log("Burglary Filtered Fields",field)
                    field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.wallMaterialList);
                    field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.wallMaterialList);
                }
                else if(field.props.label=='Building Risk'){
                  console.log("UsageFilter",field)
                  field.fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.wallMaterialList);
                }
              }
            } 
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
                this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
              }
              else if(this.productId!='19' && this.productId!='3') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                      field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.roofMaterialList);
                  }
                  else if(field.props.label=='Building Risk'){
                    field.fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(this.roofMaterialList);
                  }
                }
              } 
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
              if(this.productId!='19') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.ceilingMaterialList);
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                          console.log("Burglary Filtered Fields",field)
                      field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.ceilingMaterialList);
                  }
                }
              } 

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
    "CountryId": this.countryId
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
              if(this.productId!='19') this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.regionList);
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                          console.log("Burglary Filtered Fields Region",field)
                      field.fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.regionList);
                  }
                }
              }
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
              if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.windowMaterialList);
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                      field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.windowMaterialList);
                  }
                }
              }
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
             if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.doorsMaterialList);
             else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                      field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[6].props.options = defaultObj.concat(this.doorsMaterialList);
                  }
                }
             }
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
              if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.nightLeftDoors);
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                      field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[7].props.options = defaultObj.concat(this.nightLeftDoors);
                  }
                }
              }
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
             if(this.productId!='19') this.fields[0].fieldGroup[2].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.buildingOccupiedList);
             else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                      field.fieldGroup[0].fieldGroup[2].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(this.buildingOccupiedList);
                      
                  }
                }
             }
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
              if(this.productId!='19') this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.stateList);
              else{
                let fields = this.fields[0].fieldGroup;
                for(let field of fields){
                  if(field.props.label=='Burglary'){
                      field.fieldGroup[0].fieldGroup[1].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.stateList);
                  }
                }
              }
              if (type == 'change') this.productItem.DistrictCode = '';
            }
          }
        }
      }
    },
    (err) => { },
  );
}
onChangeUWValue(rowData,index,optionList){
  this.uwQuestionList[index].Value = rowData.UwQuesOptionDesc;
  this.showUWQUestion(rowData,optionList,'change');
}
checkHideQUestion(rowData){
  return rowData['HiddenYN']=='Y';
}
showUWQUestion(rowData,optionList,type){
      if(optionList.length!=0 && rowData!=undefined){
        for(let option of optionList){
          if(option.DependentYn!=null && option.DependentYn=='Y'){
              if(option.DependentUnderwriterId==rowData.DependentUnderwriterId){
                let ques = this.uwQuestionList.find(ele=>ele.UwQuestionId==option.DependentUnderwriterId)
                ques['HiddenYN'] = 'N';
                if(type=='change') ques['Value']=null;
              }
              else{
                let ques = this.uwQuestionList.find(ele=>ele.UwQuestionId==option.DependentUnderwriterId)
                ques['HiddenYN'] = 'Y';
              }
          }
        }
      }
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
  let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let res: any = data.Result;
      if (res.length != 0) {
        this.uwQuestionList = res;
        if(this.uwQuestionList.length!=0){
          let i=0;
          for(let ques of this.uwQuestionList){
              if(ques['HiddenYN']==undefined) ques['HiddenYN'] = 'N';
              if(ques.Options!=null && ques.Options.length!=0){
                let j=0;
                for(let option of ques.Options){
                  if(option.DependentYn=='Y'){
                    let uwQues = this.uwQuestionList.find(ele=>ele.UwQuestionId==option.DependentUnderwriterId);
                    if(uwQues) uwQues['HiddenYN'] = 'Y';
                  }
                  j+=1;
                  if(j==ques.Options.length){i+=1; if(i==this.uwQuestionList.length) this.getEditUwQuestions();}
                
                }
              }
              else{i+=1;if(i==this.uwQuestionList.length) this.getEditUwQuestions();}
          }
        }
        
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
  let urlLink = `${this.CommonApiUrl}api/getuwquestionsdetails`;
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

            this.uwQuestionList.forEach(x => {
              if (x.QuestionType == '01') {
               
                console.log('gggggg', x.Value)
                x.Value = x.Value ? '' || x.Value : x.Value
                if(x.Options!=null) this.showUWQUestion(x.Options.find(ele=>ele.UwQuesOptionDesc==x.Value),x.Options,'direct');
              }
              
            });
            
            this.questionSection = true; console.log("Final UW List", this.uwQuestionList);
          }
        }
      }
      else {
        let i = 0
        for (let ques of this.uwQuestionList) {
            ques.Value = null;
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
getMakeList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}master/dropdown/motormake`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.makeList = data.Result;
          for (let i = 0; i < this.makeList.length; i++) {
            this.makeList[i].label = this.makeList[i]['CodeDesc'];
            this.makeList[i].value = this.makeList[i]['Code'];
            delete this.makeList[i].CodeDesc;
            if (i == this.makeList.length - 1) {
                let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.makeList);
                console.log("Final Details",this.fields)
                if(this.motorDetails){
                  this.productItem.Make = this.makeList.find(ele=>ele.label==this.motorDetails.Vehiclemake || ele.Code==this.motorDetails.Vehiclemake)?.Code;
                  this.productItem.ModelDesc = this.motorDetails.VehicleModelDesc;
                  if(this.productItem.Make) this.onMakeChange('direct');
                  else this.formSection = true; this.viewSection = false;
                }
            }
          }
      }

    },
    (err) => { },
  );
}
onBodyTypeChange(type){
      if(type=='change'){
        this.productItem.Model = '';
        this.productItem.ModelDesc = null;
      }
      if(this.productItem.BodyType==null || this.productItem.BodyType=='' || this.productItem.BodyType=='1' || this.productItem.BodyType=='2' || this.productItem.BodyType=='3' || this.productItem.BodyType=='4' || this.productItem.BodyType=='5'){
        let fields = this.fields[0].fieldGroup[0].fieldGroup;
        for(let field of fields){
          if(field.key=='Model'){field.hideExpression=false;field.hide=false;}
          else if(field.key=='ModelDesc'){field.hideExpression=true;}
        }
        // this.fields[0].fieldGroup[0].fieldGroup[3].hideExpression = true;
        // this.fields[0].fieldGroup[0].fieldGroup[2].hideExpression = false;
      }
      else{
        let fields = this.fields[0].fieldGroup[0].fieldGroup;
        for(let field of fields){
          if(field.key=='Model'){field.hideExpression=true;field.hide=true;}
          else if(field.key=='ModelDesc'){field.hideExpression=false;}
        }
      }
      console.log("Final Fields",this.fields[0])
}
onMakeChange(type){
  if(this.productItem.Make!='' && this.productItem.Make!=null){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "MakeId": this.productItem.Make
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/motormakemodel`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.modelList = data.Result;
            for (let i = 0; i < this.modelList.length; i++) {
              this.modelList[i].label = this.modelList[i]['CodeDesc'];
              this.modelList[i].value = this.modelList[i]['Code'];
              delete this.modelList[i].CodeDesc;
              if (i == this.modelList.length - 1) {
                  let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                  this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.modelList);
                  if(type=='change') this.productItem.Model = '';
                  else if(this.motorDetails){
                    this.productItem.Model = this.modelList.find(ele=>ele.label==this.motorDetails.Vehcilemodel || ele.Code==this.motorDetails.Vehcilemodel)?.Code;
                    this.formSection = true; this.viewSection = false;
                  }
                  else this.formSection = true; this.viewSection = false;
              }
            }
        }
      },
      (err) => { },
    );
  }
  else{
    this.productItem.Model='';
    this.fields[0].fieldGroup[0].fieldGroup[2].props.options = [{ 'label': '-Select-', 'value': '' }];
  }
}
getFuelTypeList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/fueltype`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
          this.fuelTypeList = data.Result;
          for (let i = 0; i < this.fuelTypeList.length; i++) {
            this.fuelTypeList[i].label = this.fuelTypeList[i]['CodeDesc'];
            this.fuelTypeList[i].value = this.fuelTypeList[i]['Code'];
            delete this.fuelTypeList[i].CodeDesc;
            if (i == this.fuelTypeList.length - 1) {
                let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                this.fields[0].fieldGroup[0].fieldGroup[9].props.options = defaultObj.concat(this.fuelTypeList);
                if(this.motorDetails){
                  this.productItem.FuelType = this.fuelTypeList.find(ele=>ele.label==this.motorDetails.FuelType || ele.Code==this.motorDetails.FuelType)?.Code;
                }
            }
          }
      }

    },
    (err) => { },
  );
}
getColorsList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}master/dropdown/color`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
          this.colorList = data.Result;
          for (let i = 0; i < this.colorList.length; i++) {
            this.colorList[i].label = this.colorList[i]['CodeDesc'];
            this.colorList[i].value = this.colorList[i]['Code'];
            delete this.colorList[i].CodeDesc;
            if (i == this.colorList.length - 1) {
                let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                this.fields[0].fieldGroup[0].fieldGroup[10].props.options = defaultObj.concat(this.colorList);
                if(this.motorDetails){
                  this.productItem.Color = this.colorList.find(ele=>ele.label==this.motorDetails.Color || ele.Code == this.motorDetails.Color)?.Code;
                }
            }
          }
      }
    },
    (err) => { },
  );
}
getBodyTypeList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}master/dropdown/induvidual/bodytype`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.bodyTypeList = data.Result;
          for (let i = 0; i < this.bodyTypeList.length; i++) {
            this.bodyTypeList[i].label = this.bodyTypeList[i]['CodeDesc'];
            this.bodyTypeList[i].value = this.bodyTypeList[i]['Code'];
            delete this.bodyTypeList[i].CodeDesc;
            if (i == this.bodyTypeList.length - 1) {
                let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.bodyTypeList);
                if(this.motorDetails){
                  this.productItem.BodyType = this.bodyTypeList.find(ele=>ele.label==this.motorDetails.VehicleType || ele.Code ==this.motorDetails.VehicleType)?.Code;
                  this.onBodyTypeChange('direct');
                }
            }
          } 
      }

    },
    (err) => { },
  );
}
getUsageList(){
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}api/dropdown/induvidual/vehicleusage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.usageList = data.Result;
          for (let i = 0; i < this.usageList.length; i++) {
            this.usageList[i].label = this.usageList[i]['CodeDesc'];
            this.usageList[i].value = this.usageList[i]['Code'];
            delete this.usageList[i].CodeDesc;
            if (i == this.usageList.length - 1) {
                let defaultObj = [{ 'label': '-Select-', 'value': '' }];
                this.fields[0].fieldGroup[0].fieldGroup[11].props.options = defaultObj.concat(this.usageList);
                if(this.motorDetails){
                  this.productItem.MotorUsage = this.usageList.find(ele=>ele.label==this.motorDetails.Motorusage || ele.Code ==this.motorDetails.Motorusage)?.Code;
                }
            }
          } 
          
      }

    },
    (err) => { },
  );
}
// getMotorCategoryList(){
//   let ReqObj = {
//     "InsuranceId": this.insuranceId,
//     "BranchCode": this.branchCode
//   }
//   let urlLink = `${this.commonApiUrl}dropdown/motorcategory`;
//   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
//     (data: any) => {
//       console.log(data);
//       if(data.Result){
//           this.motorCategoryList = data.Result;
          
//       }

//     },
//     (err) => { },
//   );
// }
getNatureTradeList(){
  this.natureTradeList = [];
  if(this.productId!='19'){this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = [];}
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
          if(this.productId!='19'){
            this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.natureTradeList);
          }
          else{
            let fields = this.fields[0].fieldGroup;
            for(let field of fields){
              if(field.props.label=='Burglary'){
                      console.log("Burglary Filtered Fields",field)
                  field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.natureTradeList);
              }
            }
          }
        }
      }
    },
    (err) => { },
  );
}
productTypes(){
  let ReqObj = {
    "InsuranceId":this.insuranceId,
  "ProductId":this.productId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
      this.ProductsList = data.Result;
      // for (let i = 0; i < this.ProductsList.length; i++) {
      //   this.ProductsList[i].label = this.ProductsList[i]['CodeDesc'];
      //   this.ProductsList[i].value = this.ProductsList[i]['Code'];
      //   delete this.ProductsList[i].CodeDesc;
      //   if (i == this.ProductsList.length - 1) {
      //     this.fields[0].fieldGroup[0].fieldGroup[1].props.options= defaultObj.concat(this.ProductsList);
      //   }
      // }
    },
    (err) => { },
  );
}
cyberinsutypes(){
   //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = [];
   let ReqObj = {
    "BranchCode": this.branchCode,
    "InsuranceId": this.insuranceId,
  }
  let urlLink = `${this.commonApiUrl}dropdown/cyberinsurancetypes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
      this.CyperNewList = data.Result;
      // for (let i = 0; i < this.CyperNewList.length; i++) {
      //   this.CyperNewList[i].label = this.CyperNewList[i]['CodeDesc'];
      //   this.CyperNewList[i].value = this.CyperNewList[i]['Code'];
      //   delete this.CyperNewList[i].CodeDesc;
      //   if (i == this.CyperNewList.length - 1) {
      //     this.fields[0].fieldGroup[0].fieldGroup[1].props.options= defaultObj.concat(this.CyperNewList);
      //   }
      // }
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
getAooSIList(){
  this.aooSIList = [];
  let ReqObj = {
    "InsuranceId": this.insuranceId
  }
  let urlLink = `${this.motorApiUrl}api/dropdown/medmalinsuranceaoo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': null }]
      this.aooSIList = data.Result;
      for (let i = 0; i < this.aooSIList.length; i++) {
        this.aooSIList[i].label = this.aooSIList[i]['CodeDesc'];
        this.aooSIList[i].value = this.aooSIList[i]['Code'];
        delete this.aooSIList[i].CodeDesc;
        if (i == this.aooSIList.length - 1) {
          this.fields[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.aooSIList);
        }
      }
    },
    (err) => { },
  );
}
ongetAggSIList(type){
  if(type=='change'){this.productItem.AggSumInsured = null; console.log("Final Agg Data",this.productItem,this.fields)}
  this.aggSIList = [];
  let ReqObj = {
    "Aoo":this.productItem.AooSumInsured,
    "InsuranceId": this.insuranceId
  }
  let urlLink = `${this.motorApiUrl}api/dropdown/medmalinsuranceagg`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
     
      let defaultObj = [{ 'label': '-Select-', 'value': null }]
      this.aggSIList = data.Result;
      for (let i = 0; i < this.aggSIList.length; i++) {
        this.aggSIList[i].label = this.aggSIList[i]['CodeDesc'];
        this.aggSIList[i].value = this.aggSIList[i]['Code'];
        delete this.aggSIList[i].CodeDesc;
        if (i == this.aggSIList.length - 1) {
          this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.aggSIList);
          if(type=='change'){this.fields[0].fieldGroup[0].fieldGroup[2].formControl.setValue(null);this.productItem.AggSumInsured = null;}
        }
      }
    },
    (err) => { },
  );
}
getInsuranceForList(){

  this.insuranceForList = [];
  if(this.productId!='19'){this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = [];}
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
          if(this.productId!='19'){
            this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.insuranceForList;
          }
          else{
            let fields = this.fields[0].fieldGroup;
            for(let field of fields){
              if(field.props.label=='Burglary'){
                  field.fieldGroup[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.insuranceForList;
              }
            }
          }
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
getIndemityPeriodList(){
  this.indemityPeriodList = [];
  if(this.productId=='6') this.fields[0].fieldGroup[0].fieldGroup[0].props.options=[];
  else if(this.productId=='19'){this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = [];}
  let ReqObj = {
    "IntemType":"INDEMITY_PERIOD",
    "InsuranceId":this.insuranceId,
    "BranchCode": this.branchCode
  }
  let urlLink = `${this.commonApiUrl}dropdown/indemity`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      this.indemityPeriodList = data.Result;
      for (let i = 0; i < this.indemityPeriodList.length; i++) {
        this.indemityPeriodList[i].label = this.indemityPeriodList[i]['CodeDesc'];
        this.indemityPeriodList[i].value = this.indemityPeriodList[i]['Code'];
        delete this.indemityPeriodList[i].CodeDesc;
        if (i == this.indemityPeriodList.length - 1) {
          if(this.productId=='6'){
                this.fields[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.indemityPeriodList);
                let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                if (referenceNo) {
                  this.requestReferenceNo = referenceNo;
                }
                else {
                    this.productItem = new ProductData();
                    this.productItem.BuildingBuildYear = '';
                    this.productItem.MakutiYn = 'N';
                    this.formSection = true; this.viewSection = false;
                }
          }
          else if(this.productId=='19'){this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.indemityPeriodList);}
        }
      }
    },
    (err) => { },
  );
}
onPreviousTab(){
  this.selectedIndex-=1;
}
onSaveMotorDetails(){
  let make = "";
    if(this.productItem.Make!='' && this.productItem.Make!=undefined && this.productItem.Make!=null){
      let entry = this.makeList.find(ele=>ele.Code==this.productItem.Make);
      make = entry.label;
    }
    let regNo = null;
    if(this.productItem.RegistrationNo=='' || this.productItem.RegistrationNo==null){
      regNo = this.productItem.ChassisNo;
    }
    else regNo = this.productItem.RegistrationNo;
    let ReqObj = {
      "AxelDistance": '01',
      "Chassisnumber": this.productItem.ChassisNo,
      "Color": this.productItem.Color,
      "CreatedBy": this.loginId,
      "EngineNumber": this.productItem.EngineNo,
      "FuelType": this.productItem.FuelType,
      "Grossweight": "100",
      "ManufactureYear": this.productItem.ManufactureYear,
      "MotorCategory": "01",
      "Motorusage": this.productItem.MotorUsage,
      "NumberOfAxels": "1",
      "OwnerCategory": this.productItem.OwnerCategory,
      "Registrationnumber": regNo,
      "ResEngineCapacity": this.productItem.EngineCapacity,
      "ResOwnerName": this.productItem.OwnerName,
      "ResStatusCode": "Y",
      "ResStatusDesc": "None",
      "SeatingCapacity": this.productItem.SeatingCapacity,
      "Tareweight": "100",
      "Vehcilemodel": this.productItem.Model,
      "VehicleType": this.productItem.BodyType,
      "Vehiclemake": make
    }
    let urlLink = `${this.motorApiUrl}regulatory/savevehicleinfo`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          //this.saveMotorRiskDetails(ReqObj);
        }
      });
}
saveMotorRiskDetails(){
    let make = "";
    if(this.productItem.Make!='' && this.productItem.Make!=undefined && this.productItem.Make!=null){
      let entry = this.makeList.find(ele=>ele.Code==this.productItem.Make);
      make = entry.label;

    }
    let model=null,modelDesc = null;
    if(this.productItem.BodyType!='' && this.productItem.BodyType!=undefined && this.productItem.BodyType!=null){
      let bodyType = this.productItem.BodyType
        if(bodyType=='1' || bodyType=='2' || bodyType=='3' || bodyType=='4' || bodyType=='5'){
          if(this.productItem.Model!='' && this.productItem.Model!=null){
            let entry = this.modelList.find(ele=>ele.Code==this.productItem.Model);
            modelDesc = entry.label;
            model = this.productItem.Model;
          }
        }
        else{
          model = null;
          modelDesc = this.productItem.ModelDesc;
        }
    }
    let regNo = null;
    if(this.productItem.RegistrationNo=='' || this.productItem.RegistrationNo==null){
      regNo = this.productItem.ChassisNo;
    }
    else regNo = this.productItem.RegistrationNo;
    let createdBy="";
        let startDate = "",endDate = "",vehicleSI="",accSI="",windSI="",tppSI="";
        startDate = this.commonDetails[0].PolicyStartDate;
        endDate = this.commonDetails[0].PolicyEndDate;
        if(this.policyStartDate){
          // if(this.endorsementSection && (this.enableAddVehicle && this.endorsementYn=='Y')){
          //    startDate = this.endorseEffectiveDate;
          //    const oneday = 24 * 60 * 60 * 1000;
          //     const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
          //     const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          //     const formattedDatecurrent = new Date(startDate);
          //     console.log(formattedDate);
    
          //   console.log(formattedDatecurrent);
    
          //   this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          // }
        }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      this.subuserType = sessionStorage.getItem('typeValue');
      console.log("AcExecutive",this.acExecutiveId,this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
      
      let appId = "1",loginId="",brokerbranchCode="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
          createdBy = this.commonDetails[0].CreatedBy;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; loginId=this.loginId;
          brokerbranchCode = this.brokerbranchCode;
        }
        else{
          appId = this.loginId;
          loginId = this.commonDetails[0].LoginId;
          loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
          
          this.sourceType = this.commonDetails[0].SourceType;
          this.bdmCode = this.commonDetails[0].BrokerCode;
          this.brokerCode = this.commonDetails[0].BrokerCode;
          brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
          this.customerCode = this.commonDetails[0].CustomerCode;
        }
        else{
          this.sourceType = this.updateComponent.sourceType;
          this.bdmCode = this.updateComponent.brokerCode;
          this.brokerCode = this.updateComponent.brokerCode;
          brokerbranchCode =  this.updateComponent.brokerBranchCode;
          this.customerCode = this.updateComponent.CustomerCode;
        }
        }
        else {
          this.sourceType = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
        }
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
   
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": this.acExecutiveId,
      "CommissionType": this.commissionType,
      "CustomerCode": this.customerCode,
      "CustomerName": this.productItem.OwnerName,
      "BdmCode": this.customerCode,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": refNo,
      "RequestReferenceNo": this.requestReferenceNo,
      "Idnumber": IdNo,
      "VehicleId": "1",
      "AcccessoriesSumInsured": null,
      "AccessoriesInformation": "",
      "AdditionalCircumstances": "",
      "AxelDistance": '01',
      "Chassisnumber": this.productItem.ChassisNo,
      "Color": this.productItem.Color,
      "CityLimit": null,
      "CoverNoteNo": null,
      "OwnerCategory": this.productItem.OwnerCategory,
      "CubicCapacity": "100",
      "CreatedBy": createdBy,
      "DrivenByDesc": 'Driver',
      "EngineNumber": this.productItem.EngineNo,
      "EngineCapacity": this.productItem.EngineCapacity,
      "FuelType": this.productItem.FuelType,
      "Gpstrackinginstalled": 'N',
      "Grossweight": "100",
      "HoldInsurancePolicy": "N",
      "Insurancetype": "73",
      "InsuranceId": this.insuranceId,
      "InsuranceClass": "3",
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear":this.productItem.ManufactureYear,
      "ModelNumber": null,
      "MotorCategory": "01",
      "Motorusage": this.productItem.MotorUsage,
      "NcdYn": 'N',
      "NoOfClaims": null,
      "NumberOfAxels": "1",
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": '73',
      "PolicyType": IdType,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": regYear,
      "Registrationnumber": regNo,
      "RoofRack": null,
      "SeatingCapacity": this.productItem.SeatingCapacity,
      "SourceType":this.sourceType,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": vehicleSI,
      "Tareweight": '100',
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": tppSI,
      "TrailerDetails": null,
      "Vehcilemodel": model,
      "VehicleModelDesc": modelDesc,
      "VehicleType": this.productItem.BodyType,
      "Vehiclemake":this.productItem.Make,
      "WindScreenSumInsured": windSI,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": "30",
      "PolicyStartDate": startDate,
      "PolicyEndDate": endDate,
      "Currency" : this.currencyCode,
      "ExchangeRate": this.commonDetails[0].ExchangeRate,
      "HavePromoCode": this.commonDetails[0].HavePromoCode,
      "PromoCode" : this.commonDetails[0].PromoCode,
      "CollateralYn": 'N',
      "BorrowerType": null,
      "CollateralName": null,
      "FirstLossPayee": null,
      "FleetOwnerYn": 'N',
      "NoOfVehicles": "1",
      "NoOfComprehensives": null,
      "ClaimRatio": null,
      "SavedFrom": "Owner",
      "UserType": this.userType,
      "SearchFromApi":false,
      "TiraCoverNoteNo": null,
      "EndorsementYn": 'N',
      "EndorsementDate":this.endorsementDate,
      "EndorsementEffectiveDate": this.endorsementEffectiveDate,
      "EndorsementRemarks": this.endorsementRemarks,
      "EndorsementType": this.endorsementType,
      "EndorsementTypeDesc": this.endorsementTypeDesc,
      "EndtCategoryDesc": this.endtCategoryDesc,
      "EndtCount":this.endtCount,
      "EndtPrevPolicyNo":this.endtPrevPolicyNo,
      "EndtPrevQuoteNo": this.endtPrevQuoteNo,
      "EndtStatus": this.endtStatus,
      "IsFinanceEndt": this.isFinanceEndt,
      "OrginalPolicyNo": this.orginalPolicyNo,
      "Scenarios": {
        "ExchangeRateScenario": {
          "OldAcccessoriesSumInsured": null,
          "OldCurrency": null,
          "OldExchangeRate": null,
          "OldSumInsured": null,
          "OldTppdIncreaeLimit": null,
          "OldWindScreenSumInsured": null
        }
      }
      }
      ReqObj['FleetOwnerYn'] = "N";
      if(this.endorsementSection){
         ReqObj['Status'] = 'E';
        ReqObj['PolicyNo'] = this.endorsePolicyNo
      }
      else{
        ReqObj['Status'] = 'Y';
      }
      let urlLink = `${this.motorApiUrl}api/savemotordetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(data.ErrorMessage.length!=0){
            if(res.ErrorMessage){
            }
          }
          else{
            this.onCheckUWQuestionProceed([data.Result],'proceed','Direct');
          }
        });
}
onNextProceed(){
  
  let count = this.selectedIndex;
  let totalCount = 0;
  if(this.fields[0].fieldGroup.length!=0) totalCount = this.fields[0].fieldGroup.length-1;
  let rowData:any = this.fields[0].fieldGroup[count];
  let type="";
  console.log("Final Counts",count,totalCount)
  if(count!=totalCount) type='save';
  else type ='proceed';
  if(rowData.props.label=='Building Risk'){
    this.onSaveBuildingDetails(type,'Group');
  }
  if(rowData.props.label=='Fire & Allied Perils'){
     this.onSaveFireAlliedDetails(type,'Group');
  }
  else if(rowData.props.label=='HouseHold Contents Risk'){
    this.onSaveContentRiskDetails(type,'Group');
  }
  else if(rowData.props.label=='All Risk'){
    this.onSaveAllRiskDetails(type,'Group');
  }
  else if(rowData.props.label=='Personal Accident'){
    this.onSavePersonalAccidentDetails(type,'Group');
  }
   else if(rowData.props.label=='Personal Liability'){
    this.onSavePersonalLiability(type,'Group');
  }
  else if(rowData.props.label=='Machinery BreakDown'){
    this.onSaveMachineryDetails(type,'Group');
  }
  else if(rowData.props.label=='Employers Liability'){
    this.onSaveEmployeeDetails(type,'Group');
  }
  else if(rowData.props.label=='Fidelity'){
    this.onSaveFidelityDetails(type,'Group');
  }
  else if(rowData.props.label=='Machinery BreakDown'){
    this.onSaveMachineryDetails(type,'Group');
  }
  else if(rowData.props.label=='Money'){
    this.onSaveMoneyDetails(type,'Group');
  }
  else if(rowData.props.label=='Burglary'){
    this.onSaveBurglaryDetails(type,'Group');
  }
}
isValid(field: FormlyFieldConfig): boolean {
    
  if (field.key) {
    return field.formControl.value!='' && field.formControl.value!='0';
  }
  return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
}
onCheckProceed(index){
  if(index == this.fields[0].fieldGroup.length-1) this.enableProceed = false;
  else this.enableProceed = true;
}
getYearList() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  const currentYear = new Date().getFullYear() - 40, years = [];
  console.log("Entered File",this.fields)
  while (year >= currentYear) {
    let yearEntry = year--
    years.push({ "label": String(yearEntry), "value": String(yearEntry) });
    if (year == currentYear) {
      let defaultObj = [{ 'label': '-Select-', 'value': '' }]
      if (this.productId != '3' && this.productId!='46') this.fields[0].fieldGroup[0].fieldGroup[4].props.options = defaultObj.concat(years);
      if(this.productId=='46'){
        let fields = this.fields[0].fieldGroup[0].fieldGroup;
        for(let field of fields){
          console.log("Received Iterate",field)
          if(field.key=='ManufactureYear'){
            field.props.options = defaultObj.concat(years);
          }
        }
        //this.fields[0].fieldGroup[0].fieldGroup[8].props.options = defaultObj.concat(years);
      }
      //if(this.productId=='3') this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultObj.concat(years);
      if(this.productId!='46'){
        let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        if (referenceNo) {
          this.requestReferenceNo = referenceNo;
          if (this.productId != '19' && this.productId != '3') this.setFormValues();
          else this.setSMEFormValues('edit')
        }
        else if (this.productId != '19'){
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
  
        }
      }
      
    }

  }
}
onSubmit(productData) {
  if (this.productId == '3' || this.productId == '19') {
    let sectionId = [];
    // if((this.productItem.BuildingOwnerYn=='N' || this.productItem.BuildingOwnerYn==null) && this.productId=='3'){
    //   this.productItem.BuildingSuminsured = null;
    // }
    if(this.endorsementSection && this.enableFieldsList.some(ele=>ele=='BuildingSuminsured')){
      sectionId = this.sectionList;
    }
    if (this.productItem.ElecEquipSuminsured != '0' && this.productItem.ElecEquipSuminsured != '' && this.productItem.ElecEquipSuminsured != null) {
      if (!sectionId.some(ele => ele == '41')) sectionId.push('41');
    }
    else {
      this.productItem.ElecEquipSuminsured = '0';
    }
    if (this.productItem.CashInSafe != '0' && this.productItem.CashInSafe != '' && this.productItem.CashInSafe != null) {
      if (!sectionId.some(ele => ele == '42')) sectionId.push('42');
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
        if (!sectionId.some(ele => ele == '43')) sectionId.push('43');
    }
    else {
      this.productItem.FidelityAnnualSuminsured = '0';
      this.productItem.FidelityAnyoccuSuminsured = '0';
    }

    if (this.productItem.TpliabilityAnyoccuSuminsured != '0' && this.productItem.TpliabilityAnyoccuSuminsured != '' && this.productItem.TpliabilityAnyoccuSuminsured != null) {
      if (!sectionId.some(ele => ele == '44')) sectionId.push('44');
    }
    else {
      this.productItem.TpliabilityAnyoccuSuminsured = '0';
    }
    if (this.productItem.EmpliabilityExcessSuminsured != '0' && this.productItem.EmpliabilityExcessSuminsured != '' && this.productItem.EmpliabilityExcessSuminsured != null &&
      this.productItem.EmpliabilityExcessSuminsured != '0' && this.productItem.EmpliabilityExcessSuminsured != '' && this.productItem.EmpliabilityExcessSuminsured != null) {
        if (!sectionId.some(ele => ele == '45')) sectionId.push('45');
    }
    else {
      this.productItem.EmpliabilityExcessSuminsured = '0';
      this.productItem.EmpliabilityAnnualSuminsured = '0';
    }
    if (this.productItem.GoodsTurnoverSuminsured != '0' && this.productItem.GoodsTurnoverSuminsured != '' && this.productItem.GoodsTurnoverSuminsured != null &&
      this.productItem.GoodsSinglecarrySuminsured != '0' && this.productItem.GoodsSinglecarrySuminsured != '' && this.productItem.GoodsSinglecarrySuminsured != null) {
        if (!sectionId.some(ele => ele == '46')) sectionId.push('46');
    }
    else {
      this.productItem.GoodsTurnoverSuminsured = '0';
      this.productItem.GoodsSinglecarrySuminsured = '0';
    }
    if (this.productId != '3') {
      if (this.productItem.BuildingSuminsured != '0' && this.productItem.BuildingSuminsured != null && this.productItem.BuildingSuminsured != '') {
        if (!sectionId.some(ele => ele == '40')) sectionId.push('40');
      }
      else {
        if (this.coversRequired == 'B' || this.coversRequired == 'BC') sectionId.push('40');
        this.productItem.BuildingSuminsured = null;
      }
      if (this.productItem.ContentSuminsured != '0' && this.productItem.ContentSuminsured != undefined && this.productItem.ContentSuminsured != null && this.productItem.ContentSuminsured != '') {
        if (!sectionId.some(ele => ele == '47')) sectionId.push('47');
      }
      else {
        if (this.coversRequired == 'C' || this.coversRequired == 'BC') if (!sectionId.some(ele => ele == '47')) sectionId.push('47');
        this.productItem.ContentSuminsured = '0';
      }
    }
    else {
      if (this.productItem.BuildingSuminsured != '0' && this.productItem.BuildingSuminsured != null && this.productItem.BuildingSuminsured != '') {
        if (!sectionId.some(ele => ele == '1')) sectionId.push('1');
      }
      else {
        if (this.coversRequired == 'B' || this.coversRequired == 'BC') sectionId.push('1');
        this.productItem.BuildingSuminsured = null;
      }
      if (this.productItem.ContentSuminsured != '0' && this.productItem.ContentSuminsured != undefined && this.productItem.ContentSuminsured != null && this.productItem.ContentSuminsured != '') {
        if (!sectionId.some(ele => ele == '47')) sectionId.push('47');
      }
      else {
        if (this.coversRequired == 'C' || this.coversRequired == 'BC')  if (!sectionId.some(ele => ele == '47')) sectionId.push('47');
        this.productItem.ContentSuminsured = '0';
      }
    }
    if (this.productItem.PersonalAccidentSuminsured != '0' && this.productItem.PersonalAccidentSuminsured != null && this.productItem.PersonalAccidentSuminsured != '') {
      if (!sectionId.some(ele => ele == '35')) sectionId.push('35');
    }
    else {
      this.productItem.PersonalAccidentSuminsured = '0';
    }
    if (this.productItem.PersonalIntermediarySuminsured != '0' && this.productItem.PersonalIntermediarySuminsured != null && this.productItem.PersonalIntermediarySuminsured != '') {
      if (!sectionId.some(ele => ele == '36')) sectionId.push('36');
    }
    else {
      this.productItem.PersonalIntermediarySuminsured = '0';
    }
    if (this.productItem.AllriskSumInsured != '0' && this.productItem.AllriskSumInsured != null && this.productItem.AllriskSumInsured != '') {
      if (!sectionId.some(ele => ele == '3')) sectionId.push('3');
    }
    else {
      this.productItem.AllriskSumInsured = '0';
    }
    let insuranceForList = [];
    if (this.productId == '1') {

      if (this.productItem.InsuranceForId != null) {
        insuranceForList = Object.keys(this.productItem.InsuranceForId);
      }
      if (!sectionId.some(ele => ele == '52')) sectionId.push('52')
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
    else{
      this.sourceType = this.subuserType;
    }
    let promocode = null;
    if (this.commonDetails[0].Promocode) {
      promocode = this.commonDetails[0].Promocode;
    }
    else if (this.commonDetails[0].PromoCode) promocode = this.commonDetails[0].PromoCode;
    if (this.commonDetails[0].CustomerCode != null && this.commonDetails[0].CustomerCode != undefined){ this.customerCode = this.commonDetails[0].CustomerCode; this.customerName= this.commonDetails[0].CustomerName;}
    else{
      this.customerCode = null; this.customerName= null;
    }
    let ReqObj = {
      "AcexecutiveId": this.commonDetails[0].AcexecutiveId,
      "AgencyCode": this.agencyCode,
      "ApplicationId": appId,
      "BdmCode": this.customerCode,
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
      "CustomerName": this.customerName,
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
          this.onCheckUWQuestionProceed(data.Result,null,'individual');

        }
      },
      (err) => { },
    );
  }
  else if(this.productId=='6') this.onSaveFireAlliedDetails('proceed','individual');
  //else if(this.productId=='42') this.onCyperSave('proceed','individual');
  else this.onFormSubmit();
}

onCyperSave(type,formType){
  let createdBy = "";
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  let appId = "1", loginId = "", brokerbranchCode = "";
  let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
  if (refNo!=undefined && refNo!="undefined") {
    reqRefNo = sessionStorage.getItem('quoteReferenceNo')
  }
  if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
  let sectionId = [];
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
  this.subuserType = sessionStorage.getItem('typeValue');
  let promocode = null;
  if (this.commonDetails[0].Promocode) {
    promocode = this.commonDetails[0].Promocode;
  }
  else if (this.commonDetails[0].PromoCode) promocode = this.commonDetails[0].PromoCode;
  if (this.ProductCode != '' && this.ProductCode != undefined && this.ProductCode!= null) {
   sectionId.push(this.ProductCode);
  }
  else {
    this.productItem.ElecEquipSuminsured = '0';
  }
  this.subuserType = sessionStorage.getItem('typeValue');
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        createdBy = this.commonDetails[0].CreatedBy;
    }
    else{
      createdBy = this.loginId;
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else{
        appId = this.loginId;
        loginId = this.commonDetails[0].LoginId;
        loginId = this.updateComponent.brokerLoginId
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
      }
    }
    if(this.userType!='Broker' && this.userType!='User'){
      this.sourceType = this.commonDetails[0].SourceType;
      this.bdmCode = this.commonDetails[0].BrokerCode;
      this.brokerCode = this.commonDetails[0].BrokerCode;
      this.brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
     
    }
    else{
      this.sourceType = this.subuserType;
    }
    this.customerCode = this.commonDetails[0].CustomerCode;
  let ReqObj = {
    "AcexecutiveId": this.commonDetails[0].AcexecutiveId,
    "AgencyCode": this.agencyCode,
    "ApplicationId": appId,
    "BdmCode": this.bdmCode,
    "BranchCode": this.branchCode,
    "BrokerBranchCode": this.brokerbranchCode,
    "BrokerCode": this.brokerCode,
    "BuildingOwnerYn": this.productItem.BuildingOwnerYn,
    "Createdby": createdBy,
    "SourceType": this.sourceType,
    "Currency": this.commonDetails[0].Currency,
    "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
    "CustomerCode": this.customerCode,
    "ExchangeRate": this.commonDetails[0].ExchangeRate,
    "Havepromocode": this.commonDetails[0].HavePromoCode,
    "Promocode": promocode,
    "InsuranceId": this.insuranceId,
    "LoginId": loginId,
    "UserType": this.userType,
    // "OutbuildConstructType": this.productItem.OutbuildConstructType,
    "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
    "PolicyStartDate": this.commonDetails[0].PolicyStartDate,
    "ProductId": this.productId,
    "SectionIds": sectionId,
    "SubUsertype": this.subuserType,
    "IndustryId": this.productItem.IndustryId,
    "RiskId": "1",
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
    "PolicyNo": this.endorsePolicyNo,
    "Status": "Y",
    "ProductType": "Asset",
    "TiraCoverNoteNo": null,
  }
  let urlLink = `${this.motorApiUrl}api/slide/savecommondetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data?.Result) {
        this.commonDetails[0]['SectionId'] = sectionId
        this.requestReferenceNo = data?.Result?.RequestReferenceNo;
        this.updateComponent.quoteRefNo = data?.Result?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
        if(type=='proceed'){
          this.anothercyberSave(type,formType);
          // this.commonDetails[0]['SectionId'] = ['40'];
         
        }
        //this.onCalculate(data.Result,type,formType);
      }
  },
  (err) => { },
);
}
anothercyberSave(type,formType){
  console.log('NNNNNNNNNNNNN',this.ProductCode);
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
  let ReqObj={
      "CreatedBy":createdBy,
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId": this.ProductCode,
      "OccupationType":this.CyberCode
  }
  let urlLink = `${this.motorApiUrl}api/slide6/saveelectronicequip`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data?.Result) {
        console.log("Final Save Session",this.commonDetails)
        sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails));
        this.onCheckUWQuestionProceed(data.Result,type,formType);
      }
  },
  (err) => { },
);
}
onSaveMedicalDetails(type,formType){
      let ReqObj = {
        "CreatedBy": this.loginId,
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "RequestReferenceNo": this.requestReferenceNo,
        "RiskId": "1",
        "SectionId": "70",
        "AooSumInsured": this.productItem?.AooSumInsured,
        "AggSumInsured": this.productItem?.AggSumInsured,
        "Category": this.productItem?.Category,
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
        "OrginalPolicyNo": this.orginalPolicyNo
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
    let urlLink = `${this.motorApiUrl}api/slide12/savepublicliability`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed'){
              this.commonDetails[0]['SectionId'] = ['70'];
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
            }
            this.onCheckUWQuestionProceed(data.Result,type,formType);
          }
      },
      (err) => { },
    );
}
onSaveFireAlliedDetails(type,formType){
  let ReqObj = {
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  "40",
    "BuildingSuminsured": this.productItem?.BuildingSuminsured,
    "IndemityPeriod": this.productItem?.IndemityPeriod,
    //"FireBuildingSi": this.productItem?.FireBuildingSi,
    "FirePlantSi": this.productItem?.FirePlantSi,
    "FireEquipSi": this.productItem?.FireEquipSi,
    "StockInTradeSi": this.productItem?.FireStockSi,
    "MakutiYn": this.productItem?.MakutiYn,
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
  let urlLink = `${this.motorApiUrl}api/slide4/savefireandperils`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed'){
              this.commonDetails[0]['SectionId'] = ['40'];
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
            }
            this.onCheckUWQuestionProceed(data.Result,type,formType);
          }
      },
      (err) => { },
    );
}
onSaveMachineryDetails(type,formType){
  console.log("Final Form",this.productItem)
  let ReqObj = {
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  "41",
    "BoilerPlantsSi": this.productItem?.BoilerPlantsSi,
    "ElecMachinesSi": this.productItem?.ElecMachinesSi,
    "EquipmentSi": this.productItem?.EquipmentSi,
    "GeneralMachineSi": this.productItem?.GeneralMachineSi,
    "MachineEquipSi": this.productItem?.MachineEquipSi,
    "ManuUnitsSi": this.productItem?.ManuUnitsSi,
    "PowerPlantSi": this.productItem?.PowerPlantSi,
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
  let urlLink = `${this.motorApiUrl}api/slide9/savemachinerybreakdown`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed' && this.productId!='19'){
            this.commonDetails[0]['SectionId'] = ['41'];
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
            }
             this.onCheckUWQuestionProceed(data.Result,type,formType);
          }
      },
      (err) => { },
    );
}
onSaveBuildingDetails(type,formType){
  this.subuserType = sessionStorage.getItem('typeValue');
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  let appId = "1",loginId="",brokerbranchCode="";
  let createdBy="";
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        createdBy = this.commonDetails[0].CreatedBy;
    }
    else{
      createdBy = this.loginId;
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else{
        appId = this.loginId;
        loginId = this.commonDetails[0].LoginId;
        loginId = this.updateComponent.brokerLoginId
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
      }
    }
    if(this.userType!='Broker' && this.userType!='User'){
      this.sourceType = this.commonDetails[0].SourceType;
      this.bdmCode = this.commonDetails[0].BrokerCode;
      this.brokerCode = this.commonDetails[0].BrokerCode;
      this.brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
      this.customerCode = this.commonDetails[0].CustomerCode;
    }
    let insuranceForList = [];
    if (this.productItem.InsuranceForId != null) {
      insuranceForList = Object.keys(this.productItem.InsuranceForId);
    }
    let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
    if (refNo!=undefined && refNo!="undefined") {
      reqRefNo = sessionStorage.getItem('quoteReferenceNo')
    }
    if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
  let ReqObj = {
    "CreatedBy": createdBy,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo": reqRefNo,
    "RiskId": "1",
    "SectionId":  "1",
    "RoofType": this.productItem.RoofType,
    "WallType": this.productItem.WallType,
    "BuildingBuildYear": this.productItem.BuildingBuildYear,
    "BuildingOwnerYn": this.productItem.BuildingOwnerYn,
    "BuildingSumInsured": this.productItem.BuildingSuminsured,
    "BuildingUsageId": this.productItem.BuildingUsageId,
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
    "PolicyNo": this.endorsePolicyNo,
    "Status": "Y",
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
  let urlLink = `${this.motorApiUrl}api/slide14/savebuilding`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            if(data.Result.length!=0){
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
              if(type=='proceed'){
                this.commonDetails[0]['SectionId'] = ['1'];
                sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
              }
              this.onCheckUWQuestionProceed(data.Result,type,formType);
            }
            
          }
      },
      (err) => { },
    );
}
onSaveBurglaryDetails(type,formType){
  this.subuserType = sessionStorage.getItem('typeValue');
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  let appId = "1",loginId="",brokerbranchCode="";
  let createdBy="";
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        createdBy = this.commonDetails[0].CreatedBy;
    }
    else{
      createdBy = this.loginId;
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else{
        appId = this.loginId;
        loginId = this.commonDetails[0].LoginId;
        loginId = this.updateComponent.brokerLoginId
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
      }
    }
    if(this.userType!='Broker' && this.userType!='User'){
      this.sourceType = this.commonDetails[0].SourceType;
      this.bdmCode = this.commonDetails[0].BrokerCode;
      this.brokerCode = this.commonDetails[0].BrokerCode;
      this.brokerbranchCode =  this.commonDetails[0].BrokerBranchCode;
      this.customerCode = this.commonDetails[0].CustomerCode;
    }
    let insuranceForList = [];
    if (this.productItem.InsuranceForId != null) {
      insuranceForList = Object.keys(this.productItem.InsuranceForId);
    }
    let reqRefNo = null,refNo = sessionStorage.getItem('quoteReferenceNo')
    if (refNo!=undefined && refNo!="undefined") {
      reqRefNo = sessionStorage.getItem('quoteReferenceNo')
    }
    if (reqRefNo == 'undefined' || reqRefNo == undefined) reqRefNo = null;
  let ReqObj = {
    "AgencyCode": this.agencyCode,
    "ApplicationId": appId,
    "BdmCode": null,
    "BranchCode": this.branchCode,
    "BrokerBranchCode": this.brokerbranchCode,
    "BrokerCode": this.brokerCode,
    "BuidingAreaSqm": null,
    "BuildingBuildYear": this.productItem.BuildingBuildYear,
    "BuildingCondition": null,
    "BuildingFloors": "",
    "BuildingOwnerYn": this.productItem?.BuildingOwnerYn,
    "BuildingPurposeId": "3",
    "CreatedBy": createdBy,
    "SourceType": this.sourceType,
    "CustomerCode": this.customerCode,
    "InsuranceId": this.insuranceId,
    "InsuranceType": null,
    "RiskId": "1",
    "LoginId": this.loginId,
    "UserType": this.userType,
    "OutbuildConstructType": null,
    "ProductId": this.productId,
    "SectionId": "52",
    "SubUsertype": this.subuserType,
    "InsuranceForId": insuranceForList,
    "NatureOfTradeId": this.productItem.NatureOfTradeId,
    "WallType": this.productItem.WallType,
    "InternalWallType": this.productItem.InternalWallType,
    "CeilingType": this.productItem.CeilingType,
    "FirstLossPercentId": null,
    "StockInTradeSi": this.productItem.StockInTradeSi,
    "GoodsSi": this.productItem.GoodsSi,
    "FurnitureSi": this.productItem.FurnitureSi,
    "ApplianceSi": this.productItem.ApplianceSi,
    "CashValueablesSi": this.productItem.CashValueablesSi,
    "StockLossPercent": this.productItem.StockLossPercent,
    "GoodsLossPercent": this.productItem.GoodsLossPercent,
    "FurnitureLossPercent": this.productItem.FurnitureLossPercent,
    "ApplianceLossPercent": this.productItem.ApplianceLossPercent,
    "CashValueablesLossPercent": this.productItem.CashValueablesLossPercent,
    "Address": this.productItem.Address,
    "RegionCode": this.productItem.RegionCode,
    "DistrictCode": this.productItem.DistrictCode,
    "OccupiedYear": this.productItem.OccupiedYear,
    "WatchmanGuardHours": this.productItem.WatchmanGuardHours,
    "AccessibleWindows": this.productItem.AccessibleWindows,
    "ShowWindow": this.productItem.ShowWindow,
    "FrontDoors": this.productItem.FrontDoors,
    "BackDoors": this.productItem?.BackDoors,
    "TrapDoors": this.productItem?.TrapDoors,
    "WindowsMaterialId": this.productItem?.WindowsMaterialId,
    "DoorsMaterialId": this.productItem?.DoorsMaterialId,
    "NightLeftDoor": this.productItem?.NightLeftDoor,
    "BuildingOccupied": this.productItem?.BuildingOccupied,
    "RoofType": this.productItem?.RoofType,
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
    "PolicyNo": this.endorsePolicyNo,
    "Status": "Y"
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
  let urlLink = `${this.motorApiUrl}api/slide3/saveburglaryandhouse`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            if(data.Result.length!=0){
              this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
              this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
              if(type=='proceed' && this.productId!='19'){
              this.commonDetails[0]['SectionId'] = ['52'];
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
              }
               this.onCheckUWQuestionProceed(data.Result,type,formType);
            }
            
          }
      },
      (err) => { },
    );
}
onSaveElectronicEquipment(type,formType){
  console.log('RRRRRRRRRRRR',sessionStorage.getItem('quoteReferenceNo'));
  console.log('KKKKKKKKKKK',this.ProductCode);
  let ReqObj={
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo":sessionStorage.getItem('quoteReferenceNo'),
    "RiskId": "1",
    "SectionId": this.ProductCode,
    "ElecEquipSuminsured":this.productItem.ElectronicEquipSuminsured
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
  let urlLink = `${this.motorApiUrl}api/slide6/saveelectronicequip`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data?.Result) {
        this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
        this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
        if(type=='proceed'){
          if(this.productId!='25'){
            this.commonDetails[0]['SectionId'] = ['3'];
          }
          else if(this.productId=='25'){
            this.commonDetails[0]['SectionId'] = ['39'];
          }
        
        sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
        }
        console.log('RRRRRRRRRRR',data.Result);
         this.onCheckUWQuestionProceed(data.Result,type,formType);
      }
  },
  (err) => { },
);
}
onSaveBussinessrisk(type,formType){

 let productsi:any;
  if(this.productItem.EquipmentSi == '' || this.productItem.EquipmentSi ==null){
    productsi='0'
  }
  else{
    productsi=this.productItem.EquipmentSi;
  }
  console.log('RRRRRRRRRRRR',sessionStorage.getItem('quoteReferenceNo'));
  let ReqObj={
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo":sessionStorage.getItem('quoteReferenceNo'),
    "RiskId": "1",
    "SectionId":  "3",
    "EquipmentSi":productsi
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
  let urlLink = `${this.motorApiUrl}api/slide2/saveallriskdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data?.Result) {
        this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
        this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
        if(type=='proceed'){
        this.commonDetails[0]['SectionId'] = ['3'];
        sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
        }
        console.log('RRRRRRRRRRR',data.Result);
         this.onCheckUWQuestionProceed(data.Result,type,formType);
      }
  },
  (err) => { },
);
}
onSaveplantaLLrisk(type,formType){
  console.log('JJJJJJJJJJJJ',sessionStorage.getItem('quoteReferenceNo'));
  let ReqObj={
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo":sessionStorage.getItem('quoteReferenceNo'),
    "RiskId": "1",
    "SectionId":  "3",
    "MiningPlantSi": this.productItem?.MiningPlantSi,
    "NonminingPlantSi":this.productItem?.NonminingPlantSi,
    "GensetsSi":this.productItem?.GensetsSi,
  }
  let urlLink = `${this.motorApiUrl}api/slide2/saveallriskdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data?.Result) {
        this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
        this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
        if(type=='proceed'){
        this.commonDetails[0]['SectionId'] = ['3'];
        sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
        }
         this.onCheckUWQuestionProceed(data.Result,type,formType);
      }
  },
  (err) => { },
);

}
checkvalidations(){
  // let fireData = new Money();
  // let entry = [];
  // let checkYnHooks ={ onInit: (field: FormlyFieldConfig) => {
  //   field.formControl.valueChanges.subscribe(() => {
  //       this.checkMoneyYNChanges()
  //   });
  // }};
  // let groupList:any = fireData?.fields.fieldGroup[0].fieldGroup[0].fieldGroup[1].fieldGroup;
  // let i=0;
  //   for(let group of groupList){
  //      group.fieldGroup[0].hooks = checkYnHooks;
  //      i+=1;
  //      if(i==groupList.length){
  //       this.fields[0] = fireData?.fields;
  //     }
  //   }
  this.MoneyDirectorError = false;
  let i=0;
  if(this.productItem.MoneyInSafeBusinessSIYN && this.productItem?.MoneySafeLimit=='0'){i+=1;
   this.stlvalidation();
  }
  if(this.productItem.MoneyInPremisesSIYN && this.productItem?.MoneyDirectorResidence=='0'){i+=1;
    console.log('UUUUUUUUUUUU');
    this.stlvalidation();
  }
  if(this.productItem.CashInTransitSIYN && this.productItem?.MoneyMajorLoss=='0'){i+=1;
    this.stlvalidation();
  }
  if(this.productItem.CashInHandEmployeesSIYN && this.productItem?.MoneyCollector=='0'){i+=1;
    this.stlvalidation();
  }
  if(this.productItem.MoneyOutSafeBusinessSIYN && this.productItem?.MoneyOutofSafe=='0'){i+=1;
    this.stlvalidation();
  }
  if(this.productItem.MoneyAnnualcarrySuminsuredSIYN && this.productItem?.MoneyAnnualEstimate=='0'){i+=1;
    this.stlvalidation();
  }
 

  if(i==0){
    this.onSaveMoneyDetails('proceed','individual');
  }
}

stlvalidation(){
  Swal.fire({
    title: '<strong>Error</strong>',
    icon: 'info',
    html:
      `<ul class="list-group errorlist">
       <li>Please Enter Amount For Selected Items</li>
   </ul>`,
    showCloseButton: false,
   cancelButtonColor: '#d33',
   cancelButtonText: 'Ok',
  })
}
onSaveMoneyDetails(type,formType){
  let ReqObj = {
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  "42",
    "MoneySafeLimit": this.productItem?.MoneySafeLimit,
    "MoneyOutofSafe": this.productItem?.MoneyOutofSafe,
    "MoneyDirectorResidence": this.productItem?.MoneyDirectorResidence,
    "MoneyCollector": this.productItem?.MoneyCollector,
     "MoneyAnnualEstimate":this.productItem?.MoneyAnnualEstimate,
     "MoneyMajorLoss":this.productItem?.MoneyMajorLoss,
    // "CashInHandEmployees": this.productItem?.CashInHandEmployees,
    // "CashInSafe": this.productItem?.CashInSafe,
    // "CashInTransit": this.productItem?.CashInTransit,
    // "MoneyAnnualcarrySuminsured": this.productItem?.MoneyAnnualcarrySuminsured,
    // "MoneyInPremises": this.productItem?.MoneyInPremises,
    // "MoneyInSafeBusiness": this.productItem?.MoneyInSafeBusiness,
    // "MoneyOutSafeBusiness": this.productItem?.MoneyOutSafeBusiness,
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
  let urlLink = `${this.motorApiUrl}api/slide10/savemoneydetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
            if(type=='proceed'){
              this.commonDetails[0]['SectionId'] = ['42'];
              sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
            }
             this.onCheckUWQuestionProceed(data.Result,type,formType);
          }
      },
      (err) => { },
    );
}
onSavePersonalAccidentDetails(type,formType){
  this.subuserType = sessionStorage.getItem('typeValue');
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  let appId = "1",loginId="",brokerbranchCode="";
  let createdBy="";
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
      brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
        createdBy = this.commonDetails[0].CreatedBy;
    }
    else{
      createdBy = this.loginId;
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
      }
      else{
        appId = this.loginId;
        loginId = this.commonDetails[0].LoginId;
        loginId = this.updateComponent.brokerLoginId
        brokerbranchCode = this.commonDetails[0].BrokerBranchCode;
      }
    }
      let emp = [ {
        "InsuranceId": this.insuranceId,
      "CreatedBy": createdBy,
      "ProductId": this.productId,
      "RequestReferenceNo": this.requestReferenceNo,
      "RiskId": "1",
      "SectionId": "35",
       "OccupationType": this.productItem.OccupationType,
           "SumInsured": this.productItem.PersonalAccidentSuminsured,
        "TotalNoOfPersons": "1",
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
      
    } ]
    if (this.endorsementSection) {
      if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
        emp[0]['Status'] = 'E';
      }
      else {
        emp[0]['Status'] = this.productItem?.Status;
      }
      emp[0]['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      emp[0]['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide13/savepersonlaccident`;
    this.sharedService.onPostMethodSync(urlLink, emp).subscribe(
      (data: any) => {
        if (data?.Result) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){
            this.commonDetails[0]['SectionId'] = ['35'];
            sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails))
          }
           this.onCheckUWQuestionProceed(data.Result,type,formType);
        }
    },
    (err) => { },
  );

}
onSavePersonalLiability(type,formType){
  let emp = {};
  emp['CreatedBy'] = this.loginId;
  emp['InsuranceId'] = this.insuranceId;
  emp['ProductId'] = this.productId;
  emp['RequestReferenceNo'] = this.requestReferenceNo;
  emp['RiskId'] = "1";
  emp['EndorsementDate'] = this.endorsementDate;
  emp['EndorsementEffectiveDate'] = this.endorsementEffectiveDate;
  emp['EndorsementRemarks'] = this.endorsementRemarks;
  emp['EndorsementType'] = this.endorsementType;
  emp['EndorsementTypeDesc'] = this.endorsementTypeDesc;
  emp['EndtCategoryDesc'] = this.endtCategoryDesc;
  emp['EndtCount'] = this.endtCount;
  emp['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
  emp['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
  emp['EndtStatus'] = this.endtStatus;
  emp['IsFinanceEndt'] = this.isFinanceEndt;
  emp['TotalNoOfEmployees'] = '1';
  emp['OrginalPolicyNo'] = this.orginalPolicyNo;
  emp['LiabilityOccupationId'] = this.productItem.LiabilityOccupationId;
  emp['EmpLiabilitySi'] = this.productItem.EmpLiabilitySi;
  emp['SectionId'] = "36";
  if (this.endorsementSection) {
    if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
      emp['Status'] = 'E';
    }
    else {
      emp['Status'] = this.productItem?.Status;
    }
    emp['PolicyNo'] = this.endorsePolicyNo
  }
  else {
    emp['Status'] = 'Y';
  }
  let urlLink = `${this.motorApiUrl}api/slide7/saveempliablity`;
  this.sharedService.onPostMethodSync(urlLink, [emp]).subscribe(
      (data: any) => {
        if (data?.Result.length!=0) {
          this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
          this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
          sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
          if(type=='proceed'){ 
          this.commonDetails[0]['SectionId'] = ['36'];
          console.log("Final Common Details", this.commonDetails)
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
          this.onCheckUWQuestionProceed(data.Result,type,formType);
        }
    },
    (err) => { },
  );
} 
onSaveEmployeeDetails(type,formType){
    if(this.productItem.employeeList.length!=0){
      this.employeeError = false;
      let i=0;
      for(let emp of this.productItem.employeeList){
          emp['CreatedBy'] = this.loginId;
          emp['InsuranceId'] = this.insuranceId;
          emp['ProductId'] = this.productId;
          emp['RequestReferenceNo'] = this.requestReferenceNo;
          emp['RiskId'] = "1";
          emp['EndorsementDate'] = this.endorsementDate;
          emp['EndorsementEffectiveDate'] = this.endorsementEffectiveDate;
          emp['EndorsementRemarks'] = this.endorsementRemarks;
          emp['EndorsementType'] = this.endorsementType;
          emp['EndorsementTypeDesc'] = this.endorsementTypeDesc;
          emp['EndtCategoryDesc'] = this.endtCategoryDesc;
          emp['EndtCount'] = this.endtCount;
          emp['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
          emp['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
          emp['EndtStatus'] = this.endtStatus;
          emp['IsFinanceEndt'] = this.isFinanceEndt;
          emp['OrginalPolicyNo'] = this.orginalPolicyNo;
          if(this.productId=='14' || this.productId=='19') emp['SectionId'] = "45";
          else if(this.productId=='32') emp['SectionId'] = "43";
          i+=1;
          if(i==this.productItem.employeeList.length){
            let urlLink = `${this.motorApiUrl}api/slide7/saveempliablity`;
            this.sharedService.onPostMethodSync(urlLink, this.productItem.employeeList).subscribe(
              (data: any) => {
                if (data?.Result.length!=0) {
                  this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                  this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                  sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                  if(type=='proceed'){ 
                    if(this.productId=='14')  this.commonDetails[0]['SectionId'] = ['45'];
                    else if(this.productId=='32')  this.commonDetails[0]['SectionId'] = ['43'];
                  console.log("Final Common Details", this.commonDetails)
                  sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
                  this.onCheckUWQuestionProceed(data.Result,type,formType);
                }
            },
            (err) => { },
          );
          }
      }
    }
    else{
      this.employeeError = true;
    }
}
onSaveFidelityDetails(type,formType){
  if(this.productItem.fidelityList.length!=0){
    this.employeeError = false;
    let i=0;
    for(let emp of this.productItem.fidelityList){
        emp['CreatedBy'] = this.loginId;
        emp['InsuranceId'] = this.insuranceId;
        emp['ProductId'] = this.productId;
        emp['RequestReferenceNo'] = this.requestReferenceNo;
        emp['RiskId'] = "1";
        emp['EndorsementDate'] = this.endorsementDate;
        emp['EndorsementEffectiveDate'] = this.endorsementEffectiveDate;
        emp['EndorsementRemarks'] = this.endorsementRemarks;
        emp['EndorsementType'] = this.endorsementType;
        emp['EndorsementTypeDesc'] = this.endorsementTypeDesc;
        emp['EndtCategoryDesc'] = this.endtCategoryDesc;
        emp['EndtCount'] = this.endtCount;
        emp['EndtPrevPolicyNo'] = this.endtPrevPolicyNo;
        emp['EndtPrevQuoteNo'] = this.endtPrevQuoteNo;
        emp['EndtStatus'] = this.endtStatus;
        emp['IsFinanceEndt'] = this.isFinanceEndt;
        emp['OrginalPolicyNo'] = this.orginalPolicyNo;
        if (this.endorsementSection) {
          if (this.productItem?.Status == undefined || this.productItem?.Status == null || this.productItem?.Status == 'Y') {
            emp['Status'] = 'E';
          }
          else {
            emp['Status'] = this.productItem?.Status;
          }
          emp['PolicyNo'] = this.endorsePolicyNo
        }
        else {
          emp['Status'] = 'Y';
        }
        if(this.productId=='14') emp['SectionId'] = "45";
        else if(this.productId=='32' || this.productId=='19') emp['SectionId'] = "43";
        i+=1;
        if(i==this.productItem.fidelityList.length){
          let urlLink = `${this.motorApiUrl}api/slide8/savefidelityemp`;
          this.sharedService.onPostMethodSync(urlLink, this.productItem.fidelityList).subscribe(
            (data: any) => {
              if (data?.Result.length!=0) {
                this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
                this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
                if(type=='proceed'){  
                if(this.productId=='14')  this.commonDetails[0]['SectionId'] = ['45'];
                else if(this.productId=='32')  this.commonDetails[0]['SectionId'] = ['43'];
                console.log("Final Common Details", this.commonDetails)
                sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
                this.onCheckUWQuestionProceed(data.Result,type,formType);
              }
          },
          (err) => { },
        );
        }
    }
  }
  else{
    this.employeeError = true;
  }
}
onSaveContentRiskDetails(type,formType){
  let ReqObj = {
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId": "47",
     "ContentSuminsured": this.productItem?.ContentSuminsured,
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
    "PolicyNo": this.endorsePolicyNo,
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
  let urlLink = `${this.motorApiUrl}api/slide5/savecontent`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data?.Result) {
        this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
        this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
        if(type=='proceed'){ this.commonDetails[0]['SectionId'] = ['47'];
        console.log("Final Common Details", this.commonDetails)
        sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
        this.onCheckUWQuestionProceed(data.Result,type,formType);
      }
  },
  (err) => { },
);
}
onSaveAllRiskDetails(type,formType){
  let ReqObj = {
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "ProductId": this.productId,
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId": "3",
     "AllriskSumInsured": this.productItem?.AllriskSumInsured
  }
  let urlLink = `${this.motorApiUrl}api/slide2/saveallriskdetails`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data?.Result) {
        this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
        this.updateComponent.quoteRefNo = data?.Result[0]?.RequestReferenceNo;
        sessionStorage.setItem('quoteReferenceNo', this.requestReferenceNo);
        if(type=='proceed'){ this.commonDetails[0]['SectionId'] = ['3'];
        console.log("Final Common Details", this.commonDetails)
        sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails)) }
        this.onCheckUWQuestionProceed(data.Result,type,formType);
      }
    },
    (err) => { },
  );
}
checkDisable(fieldName) {
  console.log("Disable Check", fieldName);
  if (this.endorsementSection) {
    let entry = this.enableFieldsList.some(ele => ele == fieldName);
    return !entry;
  }
  else return false;

}
onCheckUWQuestionProceed(buildDetails,type,formType){
  if(buildDetails.length!=0){
    
    if (this.uwQuestionList.length != 0 ) {
      let createdBy = ""
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP') {
        createdBy = ""
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
      }
      else createdBy = this.loginId;
      this.requestReferenceNo = buildDetails[0]?.RequestReferenceNo;
      sessionStorage.setItem('quoteReferenceNo', buildDetails[0]?.RequestReferenceNo);
        let j=0;
        for(let build of buildDetails){
          let i = 0;
          let uwList: any[] = [];
          //let branchCode = '';
          for (let ques of this.uwQuestionList) {
              if(ques.Value!='' && ques.Value!=null){
                ques['BranchCode'] = this.branchCode;
       
                let status = null,loading = null,vehicleId=null;
                if(this.productId=='42' || this.productId=='43' || this.productId=='46') vehicleId = '1';
                else vehicleId = build.LocationId
                if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
                  let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
                  console.log("Found Obj",ques,obj)
                  if(obj){
                    loading = obj.LoadingPercent
                    if(obj.ReferralYn=='Y') status = 'R';
                    else status = 'Y';
                  }
                  else status = 'Y';
                }
                else status = ques.Status;
                let entry = {
                  "InsuranceId": this.insuranceId,
                  "ProductId": this.productId,
                  "UwQuestionId": ques.UwQuestionId,
                  "UwQuestionDesc": ques.UwQuestionDesc,
                  "QuestionType": ques.QuestionType,
                  "EffectiveDateStart": ques.EffectiveDateStart,
                  "Status": status,
                  "LoadingPercent": loading,
                  "MandatoryYn": ques.MandatoryYn,
                  "DataType": ques.DataType,
                  "CreatedBy": createdBy,
                  "UpdatedBy":  this.loginId,
                  "Value": ques.Value,
                  "BranchCode": this.branchCode,
                  "RequestReferenceNo": this.requestReferenceNo,
                  "VehicleId": vehicleId
                }
                uwList.push(entry);
              }
              
            // if (ques.QuestionType == '01') {
            //   ques['CreatedBy'] = createdBy;
            //   ques['RequestReferenceNo'] = this.requestReferenceNo;
            //   ques['UpdatedBy'] = this.loginId;
            //   if(this.productId=='42' || this.productId=='43') ques["VehicleId"] = '1';
            //   else ques["VehicleId"] = build.LocationId
            //   uwList.push(ques);
            // }
            // else if (ques.Value != "") {
            //   ques['CreatedBy'] = createdBy;
            //   ques['RequestReferenceNo'] = this.requestReferenceNo;
            //   ques['UpdatedBy'] = this.loginId;
            //   if(this.productId=='42' || this.productId=='43') ques["VehicleId"] = '1';
            //   else ques["VehicleId"] = build.LocationId
            //   uwList.push(ques);
            // }
            i += 1;
            if (i == this.uwQuestionList.length){ j+=1; 
              if(uwList.length!=0) this.onSaveUWQuestions(uwList,buildDetails,type,formType,j);
              else if(j==buildDetails.length) this.onCalculate(buildDetails,type,formType)
            }
          }
        }
    }
    else this.onCalculate(buildDetails,type,formType)
  }
}
onSaveUWQuestions(uwList,buildDetails,type,formType,index) {
  if (uwList.length != 0) {
    let urlLink = `${this.commonApiUrl}api/saveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
      (data: any) => {
        if (data.Result) {
            console.log("Final Index",index)
            if(index==buildDetails.length) this.onCalculate(buildDetails,type,formType)
        }
      },
      (err) => { },
    );
  }
}
onCalculate(buildDetails,type,formType) {
  console.log('Calculated',buildDetails);
  let createdBy = ""
  let quoteStatus = sessionStorage.getItem('QuoteStatus');
  if (quoteStatus == 'AdminRP') {
    createdBy = ""
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }
  else createdBy = this.loginId;
  if (buildDetails.length != 0) {
    this.requestReferenceNo = buildDetails[0]?.RequestReferenceNo;
    sessionStorage.setItem('quoteReferenceNo', buildDetails[0]?.RequestReferenceNo);
    let i = 0;
    for (let build of buildDetails) {
      let effectiveDate = null, coverModificationYN = 'N';
      
      if (this.endorsementSection) {
        effectiveDate = this.endorseEffectiveDate;
        // let entry = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId!=850);
        // if (entry || this.endorsementId == 846) coverModificationYN = 'Y';
        // else coverModificationYN = 'N';
        if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
      }
      else {
        effectiveDate = this.commonDetails[0].PolicyStartDate
      }
      if(this.productId=='46') build['RiskId'] = '1';
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "BranchCode": this.branchCode,
        "AgencyCode": this.agencyCode,
        "SectionId": build.SectionId,
        "ProductId": this.productId,
        "MSRefNo": build.MSRefNo,
        "VehicleId": build.RiskId,
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
            console.log("Indexxx", i, buildDetails.length,formType,type)
            if (i == buildDetails.length) {
              if(formType=='Group'){
                if(type=='save'){this.selectedIndex +=1;this.myStepper.next();}
                else{this.onFinalProceed();}
              }
              else if(type!='save'){ this.onFinalProceed();}
            }
          }
        },
        (err) => { },
      );
    }
  }
}
onPreviousStepper(){this.selectedIndex-=1;this.myStepper.previous();}
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
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode,
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
            let fields = this.fields[0].fieldGroup;
            for(let field of fields){
              if(field.props.label=='Building Risk'){
                  console.log("UsageFilter",field)
                  field.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.BuildingUsageList);
                //this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.BuildingUsageList);
              }
            }
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
        //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
        delete this.buglaryValue[i].CodeDesc;
        if (i == this.buglaryValue.length - 1) {
          defaultObj = [{ 'label': '-Select-', 'value': '' }];
          if(this.productId!='19'){
            let lossFieldsList = this.fields[0].fieldGroup[3].fieldGroup[0].fieldGroup[0].fieldGroup[1];
            for(let entry of lossFieldsList?.fieldGroup){
              entry.fieldGroup[2].templateOptions.options = defaultObj.concat(this.buglaryValue);
            }
          }
          else{
            let fields = this.fields[0].fieldGroup;
              for(let field of fields){
                if(field.props.label=='Burglary'){
                    let lossFieldsList =field.fieldGroup[0].fieldGroup[3].fieldGroup[0].fieldGroup[0].fieldGroup[1];
                    for(let entry of lossFieldsList?.fieldGroup){
                      entry.fieldGroup[2].templateOptions.options = defaultObj.concat(this.buglaryValue);
                    }
                }
              }
          }
          
          //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[5].props.options = defaultObj.concat(this.buglaryValue);
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
getOccupationList(sections) {
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
              if(this.productId=='19' || this.productId=='3'){
                    let fields = this.fields[0].fieldGroup;
                    for(let field of fields){
                          if(field.props.label=='Employers Liability' || field.props.label=='Fidelity'){
                            console.log("Final Field on Occupatiion",field,this.productItem)
                            let defaultObj = [{ 'label': '-Select-', 'value': null }]
                            field.fieldGroup[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                            this.sectionCount +=1;
                            if(sections.length==this.sectionCount){
                              this.formSection = true; this.viewSection = false;
                            }
                          }
                          else if(field.props.label=='Personal Liability' || field.props.label=='Personal Accident'){
                            console.log("Final Fields",field)
                            let defaultObj = [{ 'label': '-Select-', 'value': null }]
                            field.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                            this.sectionCount +=1;
                            if(sections.length==this.sectionCount){
                              this.formSection = true; this.viewSection = false;
                            }
                          }
                    }
              }
              if (this.productId != '19' && this.productId != '3' && this.productId!='6' && this.productId != '1' && this.productId != '32' && this.productId!='14' && this.productId!='16' && this.productId!='25' && this.productId!='26' && this.productId!='21' && this.productId!='27') this.fields[0].fieldGroup[0].fieldGroup[2].props.options = defaultObj.concat(this.occupationList);
              if(this.productId=='14' && this.insuranceId == '100002'){
                let fireData = new EmployersLiability();
                let entry = [];
                let fields:any = fireData?.fields;
                fields[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                this.fields = fields;
                let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                if (referenceNo) {
                  this.requestReferenceNo = referenceNo;
                  this.setCommonFormValues();
                  this.productItem = new ProductData();
                 
                }
                else {
                    this.productItem = new ProductData();
                    this.formSection = true; this.viewSection = false;
                }
              }
              if(this.productId=='14' && this.insuranceId == '100004'){
                let fireData = new EmployersLiabilitys();
                let entry = [];
                let fields:any = fireData?.fields;
                fields[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                this.fields = fields;
                let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                if (referenceNo) {
                  this.requestReferenceNo = referenceNo;
                  this.setCommonFormValues();
                  this.productItem = new ProductData();
                 
                }
                else {
                    this.productItem = new ProductData();
                    this.formSection = true; this.viewSection = false;
                }
              }
              if(this.productId=='32'){
                let fireData = new Fidelity();
                let entry = [];
                let fields:any = fireData?.fields;
                fields[0].fieldArray.fieldGroup[0].fieldGroup[0].props.options = defaultObj.concat(this.occupationList);
                this.fields = fields;
                let referenceNo = sessionStorage.getItem('quoteReferenceNo');
                if (referenceNo) {
                  this.requestReferenceNo = referenceNo;
                  this.productItem = new ProductData();
                  this.setCommonFormValues();
                 
                }
                else {
                    this.productItem = new ProductData();
                    this.formSection = true; this.viewSection = false;
                }
              }
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
             
              else if (this.productId == '6') this.setCommonFormValues();
              if (this.productId != '3' && this.productId != '6' && this.productId != '19' && this.productId!='14' && this.productId!='32') {

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
          if(this.productId!='14' && this.productId!='3'){
            let referenceNo = sessionStorage.getItem('quoteReferenceNo');
            if (referenceNo) {
              this.requestReferenceNo = referenceNo;
              if(this.productId == '3' ) this.checkDomesticForm('direct');
              else if (this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId == '1') this.setCommonFormValues();
              else this.setFormValues();
            }
            else if (this.productId != '19' && this.productId != '3') {
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
setCommonFormValues(){
  let refNo = sessionStorage.getItem('quoteReferenceNo');
  if(refNo==undefined) refNo = this.requestReferenceNo
  let ReqObj = {
    "RequestReferenceNo": this.requestReferenceNo,
    "RiskId": "1",
    "SectionId":  null
  }
  let urlLink = null;
  if(this.productId=='6'){ReqObj.SectionId='40';urlLink=`${this.motorApiUrl}api/slide4/getfireandperils`;}
  else if(this.productId=='39'){ReqObj.SectionId='41';urlLink=`${this.motorApiUrl}api/slide9/getmachinerybreakdown`;}
  else if(this.productId=='16'){ReqObj.SectionId='42';urlLink=`${this.motorApiUrl}api/slide10/getmoneydetails`;}
  else if(this.productId=='14'){ReqObj.SectionId='45';urlLink=`${this.motorApiUrl}api/slide7/getempliablity`;}
  else if(this.productId=='32'){ReqObj.SectionId='43';urlLink=`${this.motorApiUrl}api/slide8/getfidelityemp`;}
  else if(this.productId=='1'){ReqObj.SectionId='52';urlLink=`${this.motorApiUrl}api/slide3/getburglaryandhouse`;}
  else if(this.productId=='21'){ReqObj.SectionId='3';urlLink=`${this.motorApiUrl}api/slide2/getallriskdetails`;}
  else if(this.productId=='26'){ReqObj.SectionId='3';urlLink=`${this.motorApiUrl}api/slide2/getallriskdetails`;}
  else if(this.productId=='25'){ReqObj.SectionId='39';urlLink=`${this.motorApiUrl}api/slide6/getelectronicequip`;}
  else if(this.productId=='42'){urlLink=`${this.motorApiUrl}api/slide6/getelectronicequip`;}
  else if(this.productId=='43'){ReqObj.SectionId='70';urlLink=`${this.motorApiUrl}api/slide12/getpublicliability`;}
  else if(this.productId=='46'){ReqObj['Vehicleid']='1';urlLink=`${this.motorApiUrl}api/getmotordetails`;}
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if (data.Result) {
          let details = data?.Result;
          if(this.productId=='14'){
            if(data.Result.length!=0){
              let entry = data.Result[0];
              if(entry.EndorsementDate){
                  this.endorsementDate = entry?.EndorsementDate;
                  this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                  this.endorsementRemarks = entry?.EndorsementRemarks;
                  this.endorsementType = entry?.EndorsementType;
                  this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                  this.endtCategoryDesc = entry?.EndtCategoryDesc;
                  this.endtCount = entry?.EndtCount;
                  this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                  this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                  this.endtStatus = entry?.EndtStatus;
                  this.isFinanceEndt = entry?.IsFinanceEndt;
                  this.orginalPolicyNo = entry?.OrginalPolicyNo;
              }
              this.productItem.employeeList = data.Result;
              this.formSection = true; this.viewSection = false;
            }
            else{
              this.productItem.LiabilityOccupationId = '';
              this.productItem.employeeList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
              this.formSection = true; this.viewSection = false;
            }
          }
          else if(this.productId=='32'){
            if(data.Result.length!=0){
              let entry = data.Result[0];
              if(entry.EndorsementDate){
                this.endorsementDate = entry?.EndorsementDate;
                this.endorsementEffectiveDate = entry?.EndorsementEffectiveDate;
                this.endorsementRemarks = entry?.EndorsementRemarks;
                this.endorsementType = entry?.EndorsementType;
                this.endorsementTypeDesc = entry?.EndorsementTypeDesc;
                this.endtCategoryDesc = entry?.EndtCategoryDesc;
                this.endtCount = entry?.EndtCount;
                this.endtPrevPolicyNo = entry?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = entry?.EndtPrevQuoteNo;
                this.endtStatus = entry?.EndtStatus;
                this.isFinanceEndt = entry?.IsFinanceEndt;
                this.orginalPolicyNo = entry?.OrginalPolicyNo;
            }
              this.productItem.fidelityList = data.Result;
              this.formSection = true; this.viewSection = false;
            }
            else{
            this.productItem.OccupationType = '';
            this.productItem.fidelityList = [{"LiabilityOccupationId":null,"TotalNoOfEmployees":null,"EmpLiabilitySi":'0'}];
            this.formSection = true; this.viewSection = false;
            }
          }
          else if(this.productId=='16'){
            if(details?.EndorsementDate){
              this.endorsementDate = details?.EndorsementDate;
              this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
              this.endorsementRemarks = details?.EndorsementRemarks;
              this.endorsementType = details?.EndorsementType;
              this.endorsementTypeDesc = details?.EndorsementTypeDesc;
              this.endtCategoryDesc = details?.EndtCategoryDesc;
              this.endtCount = details?.EndtCount;
              this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
              this.endtStatus = details?.EndtStatus;
              this.isFinanceEndt = details?.IsFinanceEndt;
              this.orginalPolicyNo = details?.OrginalPolicyNo;
            }

            this.productItem.MoneySafeLimit=details?.MoneySafeLimit;
            this.productItem.MoneyOutofSafe=details?.MoneyOutofSafe;
            this.productItem.MoneyDirectorResidence=details?.MoneyDirectorResidence;
            this.productItem.MoneyCollector=details?.MoneyCollector;
            this.productItem.MoneyAnnualEstimate=details?.MoneyAnnualEstimate;
            this.productItem.MoneyMajorLoss=details?.MoneyMajorLoss;
            if(this.productItem.MoneySafeLimit!=null && this.productItem.MoneySafeLimit!='0' && this.productItem.MoneySafeLimit!='' && this.productItem.MoneySafeLimit!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
            if(this.productItem.MoneyOutofSafe!=null && this.productItem.MoneyOutofSafe!='0' && this.productItem.MoneyOutofSafe!='' && this.productItem.MoneyOutofSafe!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
            if(this.productItem.MoneyDirectorResidence!=null && this.productItem.MoneyDirectorResidence!='0' && this.productItem.MoneyDirectorResidence!='' && this.productItem.MoneyDirectorResidence!='0.0') this.productItem.MoneyInPremisesSIYN = true;
            if(this.productItem.MoneyCollector!=null && this.productItem.MoneyCollector!='0' && this.productItem.MoneyCollector!='' && this.productItem.MoneyCollector!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
            if(this.productItem.MoneyAnnualEstimate!=null && this.productItem.MoneyAnnualEstimate!='0' && this.productItem.MoneyAnnualEstimate!='' && this.productItem.MoneyAnnualEstimate!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
            if(this.productItem.MoneyMajorLoss!=null && this.productItem.MoneyMajorLoss!='0' && this.productItem.MoneyMajorLoss!='' && this.productItem.MoneyMajorLoss!='0.0') this.productItem.CashInTransitSIYN = true;
          
            // this.productItem.CashInHandEmployees = details?.CashInHandEmployees;
            // this.productItem.CashInSafe = details?.CashInSafe;
            // this.productItem.CashInTransit = details?.CashInTransit;
            // this.productItem.MoneyAnnualcarrySuminsured = details?.MoneyAnnualcarrySuminsured;
            // this.productItem.MoneyInPremises = details?.MoneyInPremises;
            // this.productItem.MoneyInSafeBusiness = details?.MoneyInSafeBusiness;
            // this.productItem.MoneyOutSafeBusiness = details?.MoneyOutSafeBusiness;
            // if(this.productItem.CashInHandEmployees!=null && this.productItem.CashInHandEmployees!='0' && this.productItem.CashInHandEmployees!='' && this.productItem.CashInHandEmployees!='0.0') this.productItem.CashInHandEmployeesSIYN = true;
            // if(this.productItem.CashInSafe!=null && this.productItem.CashInSafe!='0' && this.productItem.CashInSafe!='' && this.productItem.CashInSafe!='0.0') this.productItem.CashInSafeSIYN = true;
            // if(this.productItem.CashInTransit!=null && this.productItem.CashInTransit!='0' && this.productItem.CashInTransit!='' && this.productItem.CashInTransit!='0.0') this.productItem.CashInTransitSIYN = true;
            // if(this.productItem.MoneyAnnualcarrySuminsured!=null && this.productItem.MoneyAnnualcarrySuminsured!='0' && this.productItem.MoneyAnnualcarrySuminsured!='' && this.productItem.MoneyAnnualcarrySuminsured!='0.0') this.productItem.MoneyAnnualcarrySuminsuredSIYN = true;
            // if(this.productItem.MoneyInPremises!=null && this.productItem.MoneyInPremises!='0' && this.productItem.MoneyInPremises!='' && this.productItem.MoneyInPremises!='0.0') this.productItem.MoneyInPremisesSIYN = true;
            // if(this.productItem.MoneyInSafeBusiness!=null && this.productItem.MoneyInSafeBusiness!='0' && this.productItem.MoneyInSafeBusiness!='' && this.productItem.MoneyInSafeBusiness!='0.0') this.productItem.MoneyInSafeBusinessSIYN = true;
            // if(this.productItem.MoneyOutSafeBusiness!=null && this.productItem.MoneyOutSafeBusiness!='0' && this.productItem.MoneyOutSafeBusiness!='' && this.productItem.MoneyOutSafeBusiness!='0.0') this.productItem.MoneyOutSafeBusinessSIYN = true;
            this.checkMoneyYNChanges();
          }
          else if(this.productId=='39'){
              if(details?.EndorsementDate){
                this.endorsementDate = details?.EndorsementDate;
                this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
                this.endorsementRemarks = details?.EndorsementRemarks;
                this.endorsementType = details?.EndorsementType;
                this.endorsementTypeDesc = details?.EndorsementTypeDesc;
                this.endtCategoryDesc = details?.EndtCategoryDesc;
                this.endtCount = details?.EndtCount;
                this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
                this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
                this.endtStatus = details?.EndtStatus;
                this.isFinanceEndt = details?.IsFinanceEndt;
                this.orginalPolicyNo = details?.OrginalPolicyNo;
              }
              this.productItem.BoilerPlantsSi = details?.BoilerPlantsSi;
              this.productItem.ElecMachinesSi = details?.ElecMachinesSi;
              this.productItem.EquipmentSi = details?.EquipmentSi;
              this.productItem.GeneralMachineSi = details?.GeneralMachineSi;
              this.productItem.MachineEquipSi = details?.MachineEquipSi;
              this.productItem.ManuUnitsSi = details?.ManuUnitsSi;
              this.productItem.PowerPlantSi = details?.PowerPlantSi;
              if(this.productItem.BoilerPlantsSi!=null && this.productItem.BoilerPlantsSi!='0' && this.productItem.BoilerPlantsSi!='' && this.productItem.BoilerPlantsSi!='0.0') this.productItem.BoilerPlantsSIYN = true;
              if(this.productItem.ElecMachinesSi!=null && this.productItem.ElecMachinesSi!='0' && this.productItem.ElecMachinesSi!='' && this.productItem.ElecMachinesSi!='0.0') this.productItem.ElecMachinesSIYN = true;
              if(this.productItem.EquipmentSi!=null && this.productItem.EquipmentSi!='0' && this.productItem.EquipmentSi!='' && this.productItem.EquipmentSi!='0.0') this.productItem.EquipmentSIYN = true;
              if(this.productItem.GeneralMachineSi!=null && this.productItem.GeneralMachineSi!='0' && this.productItem.GeneralMachineSi!='' && this.productItem.GeneralMachineSi!='0.0') this.productItem.GeneralMachineSIYN = true;
              if(this.productItem.MachineEquipSi!=null && this.productItem.MachineEquipSi!='0' && this.productItem.MachineEquipSi!='' && this.productItem.MachineEquipSi!='0.0') this.productItem.MachineEquipSIYN = true;
              if(this.productItem.ManuUnitsSi!=null && this.productItem.ManuUnitsSi!='0' && this.productItem.ManuUnitsSi!='' && this.productItem.ManuUnitsSi!='0.0') this.productItem.ManuUnitsSIYN = true;
              if(this.productItem.PowerPlantSi!=null && this.productItem.PowerPlantSi!='0' && this.productItem.PowerPlantSi!='' && this.productItem.PowerPlantSi!='0.0') this.productItem.PowerPlantSIYN = true;
              this.checkMachineryYNChanges();
          }
          else if(this.productId =='21'){
            this.productItem.MiningPlantSi  = details?.MiningPlantSi;
            this.productItem.NonminingPlantSi = details?.NonminingPlantSi;
            this.productItem.GensetsSi = details?.GensetsSi;
          }
          else if(this.productId =='26'){
            this.ProductCode = details?.SectionId;
            this.productItem.EquipmentSi  = details?.EquipmentSi;
          }
          else if(this.productId =='25'){
            this.ProductCode = details?.SectionId;
            console.log('HHHHHHHHHHHHHHHHH',this.ProductCode);
            this.productItem.ElectronicEquipSuminsured  = details?.ElecEquipSuminsured;
          }
          else if(this.productId=='1'){
            if(details?.EndorsementDate){
              this.endorsementDate = details?.EndorsementDate;
              this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
              this.endorsementRemarks = details?.EndorsementRemarks;
              this.endorsementType = details?.EndorsementType;
              this.endorsementTypeDesc = details?.EndorsementTypeDesc;
              this.endtCategoryDesc = details?.EndtCategoryDesc;
              this.endtCount = details?.EndtCount;
              this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
              this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
              this.endtStatus = details?.EndtStatus;
              this.isFinanceEndt = details?.IsFinanceEndt;
              this.orginalPolicyNo = details?.OrginalPolicyNo;
            }
            this.productItem.AccessibleWindows = details?.AccessibleWindows;
            this.productItem.Address = details?.Address;
            this.productItem.BackDoors = details?.BackDoors;
            this.productItem.BuildingOccupied = details?.BuildingOccupied;
            this.productItem.CeilingType = details?.CeilingType;
             if(details?.RegionCode!=null && details?.RegionCode!=''){
              this.productItem.RegionCode = details?.RegionCode;
              this.ongetDistrictList('direct');
              this.productItem.DistrictCode = details?.DistrictCode
            }
            this.productItem.DoorsMaterialId = details?.DoorsMaterialId;
            this.productItem.WallType = details?.WallType;
            this.productItem.RoofType = details?.RoofType;
            this.productItem.BuildingOwnerYn = details?.BuildingOwnerYn;
            this.productItem.BuildingBuildYear = details?.BuildingBuildYear;
            this.productItem.FrontDoors = details?.FrontDoors;
            this.productItem.InternalWallType = details?.InternalWallType;
            this.productItem.NatureOfTradeId = details?.NatureOfTradeId;
            this.productItem.NightLeftDoor = details?.NightLeftDoor;
            this.productItem.OccupiedYear = details?.OccupiedYear;
            this.productItem.ShowWindow = details?.ShowWindow;
            this.productItem.TrapDoors = details?.TrapDoors;
            this.productItem.WatchmanGuardHours = details?.WatchmanGuardHours;
            this.productItem.WindowsMaterialId = details?.WindowsMaterialId;
            this.productItem.ApplianceSi = details?.ApplianceSi;
            this.productItem.GoodsSi = details?.GoodsSi;
            this.productItem.FurnitureSi = details?.FurnitureSi;
            this.productItem.CashValueablesSi = details?.CashValueablesSi;
            this.productItem.StockInTradeSi = details?.StockInTradeSi;
            if(details?.ApplianceLossPercent!='0' && details?.ApplianceLossPercent != null) this.productItem.ApplianceLossPercent = details?.ApplianceLossPercent;
            if(details?.CashValueablesLossPercent!='0' && details?.CashValueablesLossPercent != null) this.productItem.CashValueablesLossPercent = details?.CashValueablesLossPercent;
            if(details?.FurnitureLossPercent!='0' && details?.FurnitureLossPercent != null) this.productItem.FurnitureLossPercent = details?.FurnitureLossPercent;
            if(details?.GoodsLossPercent!='0' && details?.GoodsLossPercent != null) this.productItem.GoodsLossPercent = details?.GoodsLossPercent;
            if(details?.StockLossPercent!='0' && details?.StockLossPercent != null) this.productItem.StockLossPercent = details?.StockLossPercent;
            if (details?.InsuranceForId != null) {
              let value = {}, i = 0;
              for (let element of details?.InsuranceForId) {
                if (element != '0') {
                  value[element] = true;
                }
                i += 1;
                if (i == details?.InsuranceForId.length) this.productItem.InsuranceForId = value;
              }
            }
            
          }
          else if(this.productId == '42'){
            console.log('Product 42 Details',details);
            this.ProductCode = details?.SectionId;
            this.CyberCode=details?.OccupationType;
          }
          else if(this.productId=='43'){
            if(details.AggSumInsured!='' && details.AggSumInsured!=null) this.productItem.AggSumInsured = details.AggSumInsured;
              if(details.AooSumInsured!='' && details.AooSumInsured!=null){this.productItem.AooSumInsured = details.AooSumInsured; this.ongetAggSIList('direct')}
              this.productItem.Category = details.Category;
            // if(details.EndorsementDate !=undefined && details.EndorsementDate !=null){
            //   this.endorsementDate = details?.EndorsementDate;
            //   this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
            //   this.endorsementRemarks = details?.EndorsementRemarks;
            //   this.endorsementType = details?.EndorsementType;
            //   this.endorsementTypeDesc = details?.EndorsementTypeDesc;
            //   this.endtCategoryDesc = details?.EndtCategoryDesc;
            //   this.endtCount = details?.EndtCount;
            //   this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;
            //   this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
            //   this.endtStatus = details?.EndtStatus;
            //   this.isFinanceEndt = details?.IsFinanceEndt;
            //   this.orginalPolicyNo = details?.OrginalPolicyNo;
            // }
              
          }
          else if(this.productId=='46'){
            this.productItem = new ProductData();
            this.motorDetails = data.Result;
            this.vehicleDetails = data.Result;
            this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
            this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
            this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
            this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
            this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
            this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
            this.productItem.ChassisNo = this.vehicleDetails.Chassisnumber;
            this.productItem.RegistrationNo = this.vehicleDetails.Registrationnumber;
            this.productItem.ManufactureYear = data.Result.ManufactureYear;
            // this.productItem.EngineNo = 
            if(this.productItem.ChassisNo == this.productItem.RegistrationNo){this.productItem.RegistrationNo=null;}
            this.productItem.OwnerName = this.customerDetails.ClientName;
            this.productItem.SeatingCapacity = data.Result.SeatingCapacity;
            this.productItem.EngineNo = data.Result.EngineNumber;
            this.productItem.EngineCapacity = data.Result.ResEngineCapacity;
            this.productItem.ManufactureYear = data.Result.ManufactureYear;
              if(this.customerDetails?.PolicyHolderType){
                this.productItem.OwnerCategory = this.customerDetails.PolicyHolderType;
              } 
              this.getFuelTypeList();
              this.getYearList();
              this.getColorsList();
              this.getBodyTypeList();
              this.getUsageList();
              this.getMakeList();
          }
          else{
            if(this.productId=='6' && this.insuranceId == '100004'){
              //this.productItem.FireBuildingSi=details?.FireBuildingSi;
              this.productItem.BuildingSuminsured = details?.BuildingSuminsured;
              this.productItem.FireEquipSi=details?.FireEquipSi;
              this.productItem.FirePlantSi=details?.FirePlantSi;
              this.productItem.FireStockSi=details?.StockInTradeSi;
            }
            this.productItem.IndemityPeriod = details?.IndemityPeriod;
            if(details.MakutiYn==null || details.MakutiYn=="" || details.MakutiYn==undefined) this.productItem.MakutiYn='N';
            else this.productItem.MakutiYn=details?.MakutiYn;
            this.productItem.BuildingSuminsured = details?.BuildingSuminsured;
            this.formSection = true; this.viewSection = false;
          }
          if(this.productId!='46') {this.formSection = true; this.viewSection = false;}
      }
    },
    (err) => { },
  );
}
getVehicleInfo(){
  let ReqObj = {
    "ReqChassisNumber": this.productItem.ChassisNo,
    "ReqRegNumber": this.productItem.RegistrationNo
  }
  let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        this.motorDetails = data.Result;
        this.productItem.ManufactureYear = data.Result.ManufactureYear;
        // this.productItem.EngineNo = 
        if(this.productItem.ChassisNo == this.productItem.RegistrationNo){this.productItem.RegistrationNo=null;}
        this.productItem.OwnerName = this.customerDetails.ClientName;
        this.productItem.SeatingCapacity = data.Result.SeatingCapacity;
        this.productItem.EngineNo = data.Result.EngineNumber;
        this.productItem.EngineCapacity = data.Result.ResEngineCapacity;
        this.productItem.ManufactureYear = data.Result.ManufactureYear;
          if(this.customerDetails?.PolicyHolderType){
            this.productItem.OwnerCategory = this.customerDetails.PolicyHolderType;
          } 
          this.getFuelTypeList();
          this.getYearList();
          this.getColorsList();
          this.getBodyTypeList();
          this.getUsageList();
          this.getMakeList();
          
      }
      console.log("Final List ",this.productItem)
    });
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
        this.sectionList = sectionId;
        let contents = sectionId.some(ele => ele == '47');
        let building = sectionId.some(ele => ele == '1' || ele == '40');
        if (building && contents) this.coversRequired = 'BC';
        else if (building) this.coversRequired = 'B';
        else if (contents) this.coversRequired = 'C';
      }
      if (customerDatas?.BuildingSuminsured != null) {
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
      if (this.productId == '19' || this.productId=='3') this.onIndustryChange();
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

      //if (this.productId == '3') this.setDomesticForm('edit', type);
      if (this.productId == '19' || this.productId=='3') this.setSMEForm('edit', type)
      else {
        this.formSection = false; this.viewSection = true;
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
  if(this.productId=='45'){
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/life-cover-details']);
  }
  else if(this.productId=='46'){
    this.saveMotorRiskDetails();
  }
  else if(this.productId=='6'){
    this.onSaveFireAlliedDetails('proceed','individual');
  }
  else if(this.productId=='42'){this.onCyperSave('proceed','individual')}
  else if(this.productId=='39'){this.onSaveMachineryDetails('proceed','individual')}
  else if(this.productId=='16'){
    this.checkvalidations();
    //this.onSaveMoneyDetails('proceed','individual')
  }
  else if(this.productId=='14'){this.onSaveEmployeeDetails('proceed','individual')}
  else if(this.productId=='32'){this.onSaveFidelityDetails('proceed','individual')}
  else if(this.productId=='1'){this.onSaveBurglaryDetails('proceed','individual')}
  else if(this.productId=='21'){this.onSaveplantaLLrisk('proceed','individual')}
  else if(this.productId=='26'){this.onSaveBussinessrisk('proceed','individual')}
  else if(this.productId=='25'){this.onSaveElectronicEquipment('proceed','individual')}
 else if(this.productId=='43'){this.onSaveMedicalDetails('proceed','individual')}
  else {
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
              if(ques.Value!=null && ques.Value!=''){
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
              }
              i += 1;
              if (i == this.uwQuestionList.length)this.onSaveUWQues(uwList, entry);
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
  
}
onSMEFormSubmit() {

}
onCyperproceed(){

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
        // let entry = this.enableFieldsList.some(ele => ele == 'Covers' && this.endorsementId!=850);
        // if (entry || (this.endorsementId == 846 && veh.Status =='D')) coverModificationYN = 'Y';
        // else coverModificationYN = 'N';
        if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
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
  else{
    if (this.productId == '19' || this.productId == '3') {
      this.onFinalProceed();
    }
    else { this.getCalculationDetails(entry); }
  }
}
checkCoverValues() {
  if (this.productId == '19' || this.productId=='3') {
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
