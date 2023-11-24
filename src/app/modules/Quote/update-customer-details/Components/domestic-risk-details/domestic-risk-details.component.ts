import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import {PageEvent} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Medical } from '../models/additionalDetails/medical';
import { ProductData } from '../models/product';
import { FormlyFieldConfig } from "@ngx-formly/core";
import { HttpClient } from '@angular/common/http';
import { LocationDetails } from '../models/additionalDetails/locationdetails';

import { ContentRisk } from '../models/additionalDetails/contentRisk';
import { PersonalAccident } from '../models/additionalDetails/perosonalaccident';
import { PersonalIndemenitys } from '../models/additionalDetails/personalIndemenity';
import { DeviceDetails } from '../models/additionalDetails/Devicedetails';
import { AllRisks } from '../models/additionalDetails/AllRisk';
import { Machineryss } from '../models/additionalDetails/Machinery';
import { EmployeeLiablityss } from '../models/additionalDetails/Employeeliability';
import { Fedilitis } from '../models/additionalDetails/Fedilitiys';
import { ElectronicEquip } from '../models/additionalDetails/Electronicequip';
import { Accessories } from '../models/additionalDetails/Accsessories';
import { Accessorieswh } from '../models/additionalDetails/Accsessorieswh';
// import * as fs from 'file-system';
import { ConstantPool } from '@angular/compiler';
import { retry } from 'rxjs';


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
declare var $:any;




@Component({
  selector: 'app-domestic-risk-details',
  templateUrl: './domestic-risk-details.component.html',
  styleUrls: ['./domestic-risk-details.component.scss']
})
export class DomesticRiskDetailsComponent implements OnInit {
  @ViewChild('myModalClose') modalClose;
  quoteDetails: any;
  quoteNo: any;
  customerDetails:any;
  Riskdetails: any[] = [];
  CoverList: any[]=[];

  HavePromoCode: any;
  value = 'N';
  ElectronicList:any[]=[];
  dob: Date;
  BuildingUsageYn: any = 'N';
  BuildingUsageList: any[] = [];
  building: any[] = [];
  Section = false;
  buildingSection: boolean = false;
  personalIntermeditySection: boolean = false;
  personalAccidentSection: boolean = false;
  allRiskSection: boolean = false;
  quoteRefNo: any = null;
  jsonList: any[] = [];
  PersonalAssistantList: any[] = [];
  LocationList: any[] = [];
  ChassisList: any[]=[];
  CyperList:any[]=[];
  AccLists:any[]=[];
  Cotentrisk: any[] = [];
  MachineryContentrisk:any[]=[];
  policyEndDate: any;
  row: any;contentList:any[]=[];
  rows: any;Intermedity:any[]=[];
  ElectronicItem:any[]=[];
  CyberItem:any[]=[];
  Addrow: any;sumInsuredDetails:any;
  rowss: any;
  item: any;
  items: any[] = [];
  ContentList:any[]=[];
  first: any;fifth:boolean=false;
  sixth:any;
  second: any;
  third: any;
  occupationList: any[] = [];
  userDetails: any;
  risk:any []=[];
  allriskList:any[]=[];actualAccessoriesSI:any='0';
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public UploadUrl: any = this.AppConfig.ExcelUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; ageList: any[] = [];
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  newname: any;totalBuildingSumInsured:any=0;
  loginId: any;enableMachineryEditSection:boolean = false;
  insuranceId: any;
  SectionId: any;
  quote: any; selectedTab: any = 0;
  fourth: boolean = false;
  branchCode: any;
  userType: any;
  minDate: Date;maxDate:Date;
  dropList:any[]=[];
  contentSumInsured: any;
  pASumInsured: any;productId:any;
  actualBuildingSI: any;
  actualContentSI: any;
  actualAllRiskSI: any;
  actualPersonalIntSI: any;
  actualElectronicIntSI:any;
  totalContentSI: any=0;totalAllRiskSI:any=0;
  totalPersIntSI: number;monthList:any[]=[];
  totalElectrIntSI:number;
  InbuildConstructType: void;
  sumInsured: boolean;six: boolean;
  ten:boolean;
  newten:boolean;
  actualPersonalAccSI: any;machineries:any[]=[];
  length = 50;MachineryName:any=null;BrandName:any=null;
  MachineryLocation:any=null;NameDesc:any=null;
  pageSize = 10;SumInsured:any=null;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  p: Number = 1;j: Number= 1;
  count: Number = 20;
  s: Number = 1;
  pa:Number=1;
  ar:Number=1;
  pi:Number=1;emp:Number=1;
  E:Number=1;LocationName:any;
  fd:Number=1;
  ma:Number=1;
  accs:Number=1;
  endorsementSection: boolean;BuildingSuminsured:any;
  orgPolicyNo: string;BuildingAddress:any;
  endorsementId: any;
  enableFieldsList: any[]=[];
  endorsePolicyNo: any;
  endorseCategory: any;
  endorsementName: any;
  contentRiskSection: boolean=false;
  accessoriesSection:boolean =false;
  electronicEquipSection: boolean=false;
  currencyValue: any;
  accidentOccupation: any;
  accidentOccupationId: any;
  liabilityOccupation: any;
  liabilityOccupationId: any;
  totalPASI: number=0;
  currentBuildingIndex: number;
  currentCyberIndex:number;
  enableBuildingEditSection: boolean = false;enableContentEditSection:boolean = false;
  enablePersonalAccEditSection:boolean=false;
  enablePersonalIndEditSection:boolean = false;
  enableElectronicEquipmentSection:boolean = false;
  buildingSIError: boolean=false;
  buildingLocationError: boolean=false;
  buildingAddressError: boolean=false;
  editBuildingSection: boolean=false;
  totalBuildSIError: boolean=false;
  currentContentIndex: number;
  currentPersonalAccidentIndex: number;
  currentPersonalIndIndex: number;
  currentRiskIndex: number;
  MachineryIndex:number;
  editContentSection: boolean;
  editPersonalAccidentSection  : boolean;
  LocationId: any;
  serialNoDesc: any;
  contentRiskDesc: any='';
  contentSI: any='0';
  contentId: null;
  locationIdError: boolean;
  contentIdError: boolean;
  serialNoError: boolean;
  contentDescError: boolean;
  contentSIError: boolean;
  seven: boolean=false;eight:boolean = false;
  employeeList:any[]=[];
  currentEmployeeIndex: number;
  editEmployeeSection: boolean=false;
  enableEmployeeEditSection: boolean=false;enableFidelityEditSection:boolean=false;
  empAddress: any=null;employeeName: any=null;nationalityList:any[]=[];
  occupationType: any;employeeSalary: any;nationality: any;
  totalEmpIntSI: number;
  actualEmployeeSI: any;
  empDob: any;
  empJoiningDate: any;
  employeeNameError: boolean;
  employeeOccupationError: boolean;
  employeeAddressError: boolean;
  employeeNationalityError: boolean;
  employeeDobError: boolean;
  employeeDojError: boolean;
  employeeSalaryError: boolean;
  enableEmployeeUploadSection: boolean=false;
  enableAllriskEditSection:boolean=false;
  imageUrl: any=null;
  uploadDocList: any[]=[];
  uploadFedDocList:any[]=[];
  employeeUploadRecords: any[]=[];
  FedUploadRecords:any[]=[];
  showEmpRecordsSection: boolean;
  errorRecords: any[]=[];
  uploadStatus: any;
  closeResult: string;
  errorRowNum: any;accessoriesList:any[]=[];
  employeeErrorList: any[]=[];
  empJoiningMonth: any;
  originalEmployeeList: any[]=[];
  editFidelitySection: boolean=false;fidelityList: any[]=[];
  currentFidelityIndex: number;
  enableFidelityUploadSection: boolean=false;
  showFidelityRecordsSection: boolean=false;
  editRiskSection:boolean;
  editElectronicSection:boolean;
  originalFidelityList: any;
  totalFidelityIntSI: number;
  empLocation: any;
  employeeLocationError: boolean;
  employeeOccupationList: any[]=[];
  fidelityOccupationList: any[]=[];
  actualFidelitySI: any="0";
  nine: boolean=false;
  currentMachineryIndex: number;
  editMachinerySection: boolean;
  totalMachinerySI: number;
  buildingDetailsSection: boolean;
  currentAccessoriesIndex: number;
  currentElectronicIndex:number;
  editAccessoriesSection: boolean;
  enableAccessoriesEditSection: boolean;
  totalAccessoriesSI: any;
  chassisNo: null;
  accessoriesType: null;
  chassisNoError: boolean;
  accessoriesTypeError: boolean;
  sumInsuredError: boolean;
  totalAccSIError: boolean;
  enableAllSection: boolean = false;
  EquipmentSi: any;
  machineryItemId: any;
  MiSumInsured: any;
  actualMachinerySI: any;
  enableCyberSection: boolean = false;
  CyberMake:any;
  DeviceType:any;navItems:any;
  editCyberSection: boolean;
  cyberSectionId: any;
  Cyberyear:any;
  CyberSNo:any;
  fields: any[] = [];
  field:any[]=[];
  fireData:any;
  fieldsContent:any []= [];
  PAFields:any[]=[];
  fieldss:any[]=[];
  Accfieldss:any[]=[];
  fieldsPersonalAccident:any[]=[];
  fieldsPersonalInd:any[]=[];
  fieldsDevice:any[]=[];
  fieldsRisk:any[]=[];
  fieldsMachinery:any[]=[];
  fieldsEmpFields:any[]=[];
  fieldFEFields:any[]=[];
  fieldsElectronic:any[]=[];
  fileText: string;fileContent: any= '';

  formSection: boolean = false; viewSection: boolean = false;
  form = new FormGroup({});

  model = {};
  editPersonalIndSection: boolean;
  enableType: any;
  actualAssSI: any;
  newacc: boolean;
  sectionDetails: any;


  constructor(private router: Router,private datePipe:DatePipe,private modalService: NgbModal,
     private sharedService: SharedService,private formlyJsonschema: FormlyJsonschema,public http: HttpClient) {
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    console.log("item received", homeObj)
    if (homeObj && this.productId!='19' && this.productId!='3') {
      this.item = homeObj[0].SectionId;
      this.InbuildConstructType=homeObj[0].InbuildConstructType
      if(this.item) this.setTabSections();
    }
    else{
      let referenceNo = sessionStorage.getItem('quoteReferenceNo');
      if (referenceNo) {
        this.quoteRefNo = referenceNo;
        this.Section = false;
        //this.getEditQuoteDetails();
      }
    }
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(this.productId=='5' || this.productId=='29'){
      this.buildingDetailsSection=false;
    }
    else if(this.productId!='43'){
      this.buildingDetailsSection=true;
    
      console.log('BBBBBBBBBBBBBBBBBBBB',this.buildingDetailsSection);
      // let items = this.item?.find((Code) => Code == '1' || Code=='40');
      // console.log('JJJJJJJJJJJJJJJJJJ',items);
    }
    if(this.productId=='43'){
      this.newten = true;
      let fireData = new Medical();
      let entry = [];
      this.fields = fireData?.fields;
      this.getMedicalDetails();
      
    }
    
   


    //this.Section=false;

  }
  public productItem: ProductData;
  ngOnInit(): void {

    if(this.productId!='14' && this.productId!='32') this.getOccupationList(null);
    this.getEditQuoteDetails();
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
    this.minDate = new Date(year-18,month,day-1);
    this.maxDate = new Date();
    let referenceNo = sessionStorage.getItem('quoteReferenceNo');
    //this.fourth=false;
    if (referenceNo) {
      this.quoteRefNo = referenceNo;
      this.Section = false;
    }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        console.log('Enables fields Section',this.enableFieldsList);
        let enableAllSection = this.enableFieldsList.some(ele=>ele=='domesticRiskDetails' || ele=='AddCovers');
        console.log('Enables Add Section',enableAllSection);
        if(enableAllSection) this.enableAllSection=true;
        else this.enableAllSection = false;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        console.log("Enable Obj in Vehicle",this.enableFieldsList,this.endorsementId)
        // if(this.endorsementId!=42 && this.endorsementId!=842){
        //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
        // }
      }
    }
    this.getSumInsuredDetails();

    /*this.jsonList = [
      {
        "ApartmentOrBorder": "Y",
      "BuidingAreaSqm": "2000",
      "BuildingBuildYear": "2005",
      "BuildingCondition": "Good",
      "BuildingFloors":"",
      "BuildingUsageYn":"",
      "BuildingUsageId":"",
      "BuildingOccupationType":"",
      "BuildingAddress":"",
      "InbuildConstructType":"",
      "WithoutInhabitantDays":"",


      }
    ]*/
  /*this.ElectronicItem = [
      {
        "ItemId": "",
        "ItemValue": "",
      "MakeAndModel": "",
      "PurchaseMonth": "",
      "PurchaseYear": "",
      "RiskId": "",
      "SerialNo": "",
      "SumInsured": ""
      }
    ]*/

  }
  /*changed(value) {
    this.row.LocationName = value;
  }*/
  checkEndorseDisable(type){
      if(this.endorsementSection){
        console.log('Enbales Endorsement Sections',type,this.buildingSection,this.enableAllSection);

        if(this.enableAllSection){
            return true;
        }
        else {
          return false;
        }
            // if(type =='building') return (!this.buildingSection && !this.enableAllSection);           
            // else if(type=='content') return (!this.contentRiskSection && !this.enableAllSection);
            // else if(type=='personalAccident') return (!this.personalAccidentSection && !this.enableAllSection);
            // else if(type == 'personalIndeminity') return (!this.personalIntermeditySection && !this.enableAllSection);
            // else if(type=='allRisk') return (!this.allRiskSection && !this.enableAllSection);
            // else if(type == 'electronic') return (!this.electronicEquipSection && !this.enableAllSection);
            // else if(type == 'accessories' && this.enableAllSection || this.accessoriesSection) {
            //   return true;
            // }
            // else if(type == 'accessories' && !this.enableAllSection || !this.accessoriesSection) {
            //     return (!this.accessoriesSection && !this.enableAllSection);}
            //else if(type == 'accessories') return (!this.accessoriesSection && !this.enableAllSection);
      }
      else return true;
  }
  setTabSections(){
    
    if(this.productId=='42'){
      this.cyberSectionId=this.item[0];

      this.ten=true;
      let fireData = new DeviceDetails();
      let entry = [];
      this.fieldsDevice = fireData?.fields;
      this.form = new FormGroup({});
      this.productItem = new ProductData();
      console.log('ten',this.fieldsDevice);  
      // this.CyberItem=[{'Make':'Honda','DeviceType':'1','Making':'2022','SerialNo':1,"DeviceTypeDesc":"Desktop","SumInsured":"123,45"}];
    }
    if(this.productId=='19' || this.productId=='3'){
      if(this.sectionDetails.length!=0){
        let items = this.sectionDetails.find((ele) => ele.SectionId == 1 || (this.productId=='19' && ele.SectionId==40));
        if(items){
          if(items?.AddDetailYn=='Y'){
            this.sumInsured=true;
            let fireData = new LocationDetails();
            let entry = [];
            this.field = [
              {
                    fieldGroupClassName: 'row buildingsuminsureds',
                    fieldGroup: [
                          {
                            type: 'commaSeparator',
                            key: 'BuildingSumInsureds',
                            className: 'col-sm-5 offset-lg-1 offset-md-1',
                            props: {
                              label: `Sum Insured`,
                            },
                            validators: {
                              validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            },
                            hooks: {
                              onInit: (field: FormlyFieldConfig) => {
                                field.formControl.valueChanges.subscribe(() => {
                                  this.individualCommaFormatted('building');
                                });
                              },
                            },
                            expressions: {
                            },
                          },
                      
                    ]
              }
            ];
            this.fieldss = fireData?.fields.concat(this.field);  
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
          }
          else{
            this.sumInsured =false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            console.log('dddddddddddddddddd')
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
          }
        }
        else{
            this.sumInsured =false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
        }
        let first = this.sectionDetails.find((ele) => ( ele.SectionId == 47));
        if(first){
          if(first?.AddDetailYn=='Y'){
            this.first=true;
            let fireData = new ContentRisk();
            let entry = [];
            this.fieldsContent = fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('content')
              });
            } }
            this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
          }
          else {
            this.first =false;
          }
        }
        else {
          this.first =false;
        }
        const second = this.sectionDetails.find((ele) => ele.SectionId == 35);
        if (second){
          if(second?.AddDetailYn=='Y'){
            this.second = true;
            let fireData = new PersonalAccident();
            let entry = [];
            this.fieldsPersonalAccident = fireData?.fields;
    
            console.log('Second',this.fieldsPersonalAccident);
    
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('PersonalAccident');
              });
            } }
            this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
          }
          else{
            this.second = false;
          }
        }
        else this.second = false;
        const third = this.sectionDetails.find((ele) => ele.SectionId == 3);
        if (third){
          if(third?.AddDetailYn=='Y'){
            this.third = true;
            let fireData = new AllRisks();
            let entry = [];
            this.fieldsRisk = fireData?.fields;
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('AllRisk');
              });
            } }
            this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
            this.getallriskList();
          }
          else this.third = false;
        }
        else this.third = false;
        const fifth = this.sectionDetails.find((ele) => ele.SectionId== 36);
        if(fifth){
            if(fifth?.AddDetailYn=='Y'){
              this.fifth = true;
              let fireData = new PersonalIndemenitys();
              let entry = [];
              this.fieldsPersonalInd = fireData?.fields;
              this.form = new FormGroup({});
              this.productItem = new ProductData();
              console.log('fifth',this.fieldsPersonalInd);
  
              let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
                field.formControl.valueChanges.subscribe(() => {
                  this.individualCommaFormatted('PersonalInd');
                });
              } }
              this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
            }
            else this.fifth = false;
        }
        else this.fifth = false; 
        const six = this.sectionDetails.find((ele) => ele.SectionId== 39); 
        if(six){
          if(six?.AddDetailYn=='Y'){
            this.six = true;
            let fireData = new ElectronicEquip();
            let entry = [];
            this.fieldsElectronic = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
            console.log('sssssssssiiiiiiiiiixxxxxxxx',this.fieldsElectronic);
    
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('Electronicequip');
              });
            } }
            this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].hooks = regionHooks;
            this.monthList = [
              {"Code":"01","CodeDesc":"January"},
              {"Code":"02","CodeDesc":"February"},
              {"Code":"03","CodeDesc":"March"},
              {"Code":"04","CodeDesc":"April"},
              {"Code":"05","CodeDesc":"May"},
              {"Code":"06","CodeDesc":"June"},
              {"Code":"07","CodeDesc":"July"},
              {"Code":"08","CodeDesc":"August"},
              {"Code":"09","CodeDesc":"September"},
              {"Code":"10","CodeDesc":"October"},
              {"Code":"11","CodeDesc":"November"},
              {"Code":"12","CodeDesc":"December"},
            ]
              for (let i = 0; i < this.monthList.length; i++) {
                this.monthList[i].label = this.monthList[i]['CodeDesc'];
                this.monthList[i].value = this.monthList[i]['Code'];
                delete this.monthList[i].CodeDesc;
                if (i == this.monthList.length - 1) {
                  this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options= this.monthList;
                }
              }
          }
          else this.six = false;
        }
        else this.six = false;
        const seven = this.sectionDetails.find((ele) => ele.SectionId== 37 || ele.SectionId == 38 || ele.SectionId == 45);
        if(seven){
          if(seven?.AddDetailYn=='Y'){
            this.seven = true;
            this.getEmployeeDetails();
            this.getOccupationList(seven.SectionId);
    
            let fireData = new EmployeeLiablityss();
            let entry = [];
            this.fieldsEmpFields = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
            console.log('Seven',this.fieldsEmpFields);
    
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('employee');
              });
            } }
            this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
            this.monthList = [
              {"Code":"01","CodeDesc":"January"},
              {"Code":"02","CodeDesc":"February"},
              {"Code":"03","CodeDesc":"March"},
              {"Code":"04","CodeDesc":"April"},
              {"Code":"05","CodeDesc":"May"},
              {"Code":"06","CodeDesc":"June"},
              {"Code":"07","CodeDesc":"July"},
              {"Code":"08","CodeDesc":"August"},
              {"Code":"09","CodeDesc":"September"},
              {"Code":"10","CodeDesc":"October"},
              {"Code":"11","CodeDesc":"November"},
              {"Code":"12","CodeDesc":"December"},
            ]
              for (let i = 0; i < this.monthList.length; i++) {
                this.monthList[i].label = this.monthList[i]['CodeDesc'];
                this.monthList[i].value = this.monthList[i]['Code'];
                delete this.monthList[i].CodeDesc;
                if (i == this.monthList.length - 1) {
                  this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
                }
              }
          }
          else this.seven = false;
        }
        else this.seven = false;
        const eight = this.sectionDetails.find((ele) => ele.SectionId == 43);
        if(eight){
          if(eight?.AddDetailYn=='Y'){
            this.eight = true;
          this.getFidelityDetails();
          this.getOccupationList(eight.SectionId);
          let fireData = new Fedilitis();
          let entry = [];
          this.fieldFEFields = fireData?.fields;
          this.form = new FormGroup({});
          this.productItem = new ProductData();
          console.log('eight',this.fieldFEFields);
  
          let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.individualCommaFormatted('fidelity');
            });
          } }
          this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
          this.monthList = [
            {"Code":"01","CodeDesc":"January"},
            {"Code":"02","CodeDesc":"February"},
            {"Code":"03","CodeDesc":"March"},
            {"Code":"04","CodeDesc":"April"},
            {"Code":"05","CodeDesc":"May"},
            {"Code":"06","CodeDesc":"June"},
            {"Code":"07","CodeDesc":"July"},
            {"Code":"08","CodeDesc":"August"},
            {"Code":"09","CodeDesc":"September"},
            {"Code":"10","CodeDesc":"October"},
            {"Code":"11","CodeDesc":"November"},
            {"Code":"12","CodeDesc":"December"},
          ]
            for (let i = 0; i < this.monthList.length; i++) {
              this.monthList[i].label = this.monthList[i]['CodeDesc'];
              this.monthList[i].value = this.monthList[i]['Code'];
              delete this.monthList[i].CodeDesc;
              if (i == this.monthList.length - 1) {
                this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
              }
            }
          }
          else this.eight = false;
        }
        else this.eight = false;
        const nine = this.sectionDetails.find((ele) => ele.SectionId == 41);
        if (nine) {
          if(nine?.AddDetailYn=='Y'){
            this.nine = true;
            let fireData = new Machineryss();
            let entry = [];
            this.fieldsMachinery = fireData?.fields;
            this.form = new FormGroup({});
            this.productItem = new ProductData();
            console.log('nine',this.fieldsMachinery);
  
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('machinery');
              });
            } }
            this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].hooks = regionHooks;
            this.getallriskMachinery();
            this.getMachineryRisk();
          }
          else this.nine = false;
        }
        else this.nine = false;
      }
      else{
            this.sumInsured =false;
            let fireData = new LocationDetails();
            this.fieldss = fireData?.fields;  
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
      }
    }
    else if(this.item){
        let items = this.item.find((Code) => Code == '1' || Code=='40');
        if (items) {
          this.sumInsured=true;
          let fireData = new LocationDetails();
          let entry = [];
          this.field = [
            {
                  fieldGroupClassName: 'row buildingsuminsureds',
                  fieldGroup: [
                        {
                          type: 'commaSeparator',
                          key: 'BuildingSumInsureds',
                          className: 'col-sm-5 offset-lg-1 offset-md-1',
                          props: {
                            label: `Sum Insured`,
                          },
                          validators: {
                            validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                          },
                          hooks: {
                            onInit: (field: FormlyFieldConfig) => {
                              field.formControl.valueChanges.subscribe(() => {
                                this.individualCommaFormatted('building');
                              });
                            },
                          },
                          expressions: {
                          },
                        },
                    
                  ]
            }
          ];
          this.fieldss = fireData?.fields.concat(this.field);  
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;
          console.log('GGGGGGGGGGGGGGGG')    
        }
        else {
          this.sumInsured =false;
          let fireData = new LocationDetails();
          this.fieldss = fireData?.fields;  
          console.log('dddddddddddddddddd')
          this.productItem = new ProductData();
          this.formSection = true; this.viewSection = false;      
        }
        let first = this.item.find((Code) => Code == '47' || Code=='40');
        if (first && this.productId!='6' && this.productId!='19') {
          this.first=true;
          let fireData = new ContentRisk();
          let entry = [];
          this.fieldsContent = fireData?.fields;
          let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.individualCommaFormatted('content')
            });
          } }
          //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
          this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
          // this.getMedicalDetails();
        }
        else {
          this.first =false;
        }
      const second = this.item.find((Code) => Code == '35');
      if (second && this.productId!='19') {
        this.second = true;
        let fireData = new PersonalAccident();
        let entry = [];
        this.fieldsPersonalAccident = fireData?.fields;

        console.log('Second',this.fieldsPersonalAccident);

        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.individualCommaFormatted('PersonalAccident');
          });
        } }
        this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
        // this.productItem.AccOccupation = this.accidentOccupation;
      }
      else {
        this.second = false;
      }
      const third = this.item.find((Code) => Code == '3');
      if (third && this.productId!='21' && this.productId!='19') {
        this.third = true;
        let fireData = new AllRisks();
        let entry = [];
        this.fieldsRisk = fireData?.fields;

        console.log('third',this.fieldsRisk);

        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.individualCommaFormatted('AllRisk');
          });
        } }
        this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[4].hooks = regionHooks;
        this.getallriskList();
      }
      else {
        this.third = false;
      }
      const fifth = this.item.find((Code) => Code == '36');
      if (fifth && this.productId!='19') {

        this.fifth = true;


        let fireData = new PersonalIndemenitys();
        let entry = [];
        this.fieldsPersonalInd = fireData?.fields;
        this.form = new FormGroup({});
        this.productItem = new ProductData();
        console.log('fifth',this.fieldsPersonalInd);

        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.individualCommaFormatted('PersonalInd');
          });
        } }
        this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
      }
      else {
        this.fifth = false;
      }
      const six = this.item.find((Code) => Code == '39');
      if (six && this.productId!='19') {
        this.six = true;
        let fireData = new ElectronicEquip();
        let entry = [];
        this.fieldsElectronic = fireData?.fields;
        this.form = new FormGroup({});
        this.productItem = new ProductData();
        console.log('sssssssssiiiiiiiiiixxxxxxxx',this.fieldsElectronic);

        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.individualCommaFormatted('Electronicequip');
          });
        } }
        this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].hooks = regionHooks;
        this.monthList = [
          {"Code":"01","CodeDesc":"January"},
          {"Code":"02","CodeDesc":"February"},
          {"Code":"03","CodeDesc":"March"},
          {"Code":"04","CodeDesc":"April"},
          {"Code":"05","CodeDesc":"May"},
          {"Code":"06","CodeDesc":"June"},
          {"Code":"07","CodeDesc":"July"},
          {"Code":"08","CodeDesc":"August"},
          {"Code":"09","CodeDesc":"September"},
          {"Code":"10","CodeDesc":"October"},
          {"Code":"11","CodeDesc":"November"},
          {"Code":"12","CodeDesc":"December"},
        ]
          for (let i = 0; i < this.monthList.length; i++) {
            this.monthList[i].label = this.monthList[i]['CodeDesc'];
            this.monthList[i].value = this.monthList[i]['Code'];
            delete this.monthList[i].CodeDesc;
            if (i == this.monthList.length - 1) {
              this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options= this.monthList;
            }
          }
      }
      else {
        this.six = false;
      }
      const seven = this.item.find((Code) =>Code =='37' || Code == '38' || Code == '45');
      if(seven && this.productId!='19'){
        this.seven = true;
        this.getEmployeeDetails();
        this.getOccupationList(seven);

        let fireData = new EmployeeLiablityss();
        let entry = [];
        this.fieldsEmpFields = fireData?.fields;
        this.form = new FormGroup({});
        this.productItem = new ProductData();
        console.log('Seven',this.fieldsEmpFields);

        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.individualCommaFormatted('employee');
          });
        } }
        this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
        this.monthList = [
          {"Code":"01","CodeDesc":"January"},
          {"Code":"02","CodeDesc":"February"},
          {"Code":"03","CodeDesc":"March"},
          {"Code":"04","CodeDesc":"April"},
          {"Code":"05","CodeDesc":"May"},
          {"Code":"06","CodeDesc":"June"},
          {"Code":"07","CodeDesc":"July"},
          {"Code":"08","CodeDesc":"August"},
          {"Code":"09","CodeDesc":"September"},
          {"Code":"10","CodeDesc":"October"},
          {"Code":"11","CodeDesc":"November"},
          {"Code":"12","CodeDesc":"December"},
        ]
          for (let i = 0; i < this.monthList.length; i++) {
            this.monthList[i].label = this.monthList[i]['CodeDesc'];
            this.monthList[i].value = this.monthList[i]['Code'];
            delete this.monthList[i].CodeDesc;
            if (i == this.monthList.length - 1) {
              this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
            }
          }
       } 
       else this.seven = false;
       const eight = this.item.find((Code) => Code == '43');
        if(eight && this.productId!='19'){
        this.eight = true;
        this.getFidelityDetails();
        this.getOccupationList(eight);
        let fireData = new Fedilitis();
        let entry = [];
        this.fieldFEFields = fireData?.fields;
        this.form = new FormGroup({});
        this.productItem = new ProductData();
        console.log('eight',this.fieldFEFields);

        let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
          field.formControl.valueChanges.subscribe(() => {
            this.individualCommaFormatted('fidelity');
          });
        } }
        this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[8].hooks = regionHooks;
        this.monthList = [
          {"Code":"01","CodeDesc":"January"},
          {"Code":"02","CodeDesc":"February"},
          {"Code":"03","CodeDesc":"March"},
          {"Code":"04","CodeDesc":"April"},
          {"Code":"05","CodeDesc":"May"},
          {"Code":"06","CodeDesc":"June"},
          {"Code":"07","CodeDesc":"July"},
          {"Code":"08","CodeDesc":"August"},
          {"Code":"09","CodeDesc":"September"},
          {"Code":"10","CodeDesc":"October"},
          {"Code":"11","CodeDesc":"November"},
          {"Code":"12","CodeDesc":"December"},
        ]
          for (let i = 0; i < this.monthList.length; i++) {
            this.monthList[i].label = this.monthList[i]['CodeDesc'];
            this.monthList[i].value = this.monthList[i]['Code'];
            delete this.monthList[i].CodeDesc;
            if (i == this.monthList.length - 1) {
              this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[5].props.options = this.monthList;
            }
          }
        } 
        else this.eight = false;
       const nine = this.item.find((Code) => Code == '41');
        if (nine && this.productId!='16' && this.productId!='19') {
          this.nine = true;
          let fireData = new Machineryss();
          let entry = [];
          this.fieldsMachinery = fireData?.fields;
          this.form = new FormGroup({});
          this.productItem = new ProductData();
          console.log('nine',this.fieldsMachinery);
  
          let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
            field.formControl.valueChanges.subscribe(() => {
              this.individualCommaFormatted('machinery');
            });
          } }
          this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[6].hooks = regionHooks;
          this.getallriskMachinery();
          this.getMachineryRisk();
        }
        else {
          this.nine = false;
        }
    }
   

    
  }
  newjsonfile(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
    "ProductId": this.productId,
    "OptedSectionIds":this.item
    }
    let urlLink = `${this.CommonApiUrl}master/getoptedsectionadditionalinfo`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){ 
              this.sectionDetails = data.Result;
              this.setTabSections();
              this.getbuilding();
          //,{ responseType: 'text' as 'json'}
          //   this.http.get(`${file}`,{ responseType: 'text' as 'json'}).subscribe(data => {
          //     console.log(data);
          // })
          // const fileContents = fs.readFileSync(data.Result.JsonPath,'utf8');
          // console.log('Testsss',fileContents);
          // const file = new File([fileContents], img);
          // const formData: any = new FormData();
          // formData.append("file", file);     
        }
           
      },
      (err) => { },
    );
  }
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.quoteRefNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          console.log("Data**",data?.Result);
          this.quoteDetails = data?.Result?.QuoteDetails;
          this.Riskdetails = data?.Result?.RiskDetails;
          this.customerDetails=data?.Result?.CustomerDetails;
          if(this.Riskdetails[0].AcccessoriesSumInsured!=null)
          this.actualAccessoriesSI = String(this.Riskdetails[0].AcccessoriesSumInsured);
          
          if(this.Riskdetails.length==1){
            this.newacc=true;
            let fireData = new Accessorieswh();
            let entry = [];
            this.Accfieldss = fireData?.fields;
      
            console.log('TTTTTTTTTTTT',this.fieldsContent);
      
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('accessories')
              });
            } }
            //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
            this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].hooks = regionHooks;
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
            console.log('KKKKKKKKKKK',this.productItem.AccessoriesChassisNo);
          }
          else{
            let fireData = new Accessories();
            this.newacc=false;
            let entry = [];
            this.Accfieldss = fireData?.fields;
      
            console.log('TTTTTTTTTTTT',this.fieldsContent);
      
            let regionHooks ={ onInit: (field: FormlyFieldConfig) => {
              field.formControl.valueChanges.subscribe(() => {
                this.individualCommaFormatted('accessories')
              });
            } }
            //this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].hooks = regionHooks;
            this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].hooks = regionHooks;
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
          }
          for (let cover of this.Riskdetails) {
            let j = 0;
            for (let section of cover?.SectionDetails) {
              let CoverData = section.Covers;
              for (let subsectioncover of section?.Covers) {
                if (cover?.totalPremium) {
                  cover['totalLcPremium'] = cover['totalLcPremium'] + subsectioncover?.PremiumIncludedTaxLC;
                  cover['totalPremium'] = cover['totalPremium'] + subsectioncover?.PremiumIncludedTax;
                }
                else {
                  cover['totalLcPremium'] = subsectioncover?.PremiumIncludedTaxLC;
                  cover['totalPremium'] = subsectioncover?.PremiumIncludedTax;

                }
                let baseCovers = [], otherCovers = [];
                baseCovers = CoverData.filter(ele => ele.CoverageType == 'B');
                otherCovers = CoverData.filter(ele => ele.CoverageType != 'B');
                section.Covers = baseCovers.concat(otherCovers);
                this.CoverList.push(cover);
                if (j == cover?.SectionDetails) {
                  this.CoverList.push(cover);
                  console.log("vehicleList", this.CoverList);
                }
                else j += 1;
              }
            }
          }
        }
      },
      (err) => { },
    );
  }
  getEmployeeDetails(){
    let SectionId = null;
    if(this.productId=='14' || this.productId=='19') SectionId = '45';
    if(this.productId=='32') SectionId = '43';
    let ReqObj = {
      "QuoteNo": this.quoteNo,
       //"RiskId": "1",
       "SectionId": SectionId
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;
    //let urlLink = `${this.motorApiUrl}api/getallproductemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
          if(this.productId!=='32'){
            this.employeeList = data?.Result;
            console.log('OOOOO',this.employeeList);
          }
          else if(this.productId=='32'){
            this.fidelityList =data?.Result;
            console.log('Ferdility Lists',this.fidelityList);
          }
            this.originalEmployeeList = new Array().concat(data?.Result);
            if(this.employeeList.length!=0 && this.productId!=='32'){
              this.getTotalSICost('Employee');
            }
            else if(this.productId=='32' && this.fidelityList.length!=0 ){
              this.getTotalSICost('Fidelity');
            }
        }
      });
  }
  newFidelity(){
    this.enableFidelityEditSection=true;
    this.errorRecords=[];
  }
  getFidelityDetails(){
    let SectionId = null;
    if(this.productId=='32'  || this.productId=='19') SectionId = '43';
    let ReqObj = {
      "QuoteNo": this.quoteNo,
       "RiskId": "1",
       "SectionId": SectionId
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;//api/getallproductemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
            this.fidelityList = data?.Result;
            this.originalFidelityList = new Array().concat(data?.Result);
            if(this.fidelityList.length!=0){
              this.getTotalSICost('Fidelity');
            }
        }
      });
  }
  enableAddNewBtn(type){
    //console.log('YYYYYYYYYY',this.buildingSection,this.enableAllSection);
    if(this.endorsementSection){
      if(this.enableAllSection){
        return true;
      }
      else{
        return false;
      }
    //   if(type=='building'){ 
    //   if(type=='building' && this.enableAllSection){
    //     return true;
    //   }
    //   else{
    //     return (!this.buildingSection && !this.enableAllSection) ;
    //   }
    // } 
    //   else if(type=='content') return (!this.contentRiskSection && !this.enableAllSection);
    //   else if(type=='personalAccident') return (!this.personalAccidentSection && !this.enableAllSection);
    //   else if(type == 'personalIndeminity') return (!this.personalIntermeditySection && !this.enableAllSection);
    //   else if(type=='allRisk') return (!this.allRiskSection && !this.enableAllSection);
    //   else if(type == 'electronic') return (!this.electronicEquipSection && !this.enableAllSection);
    //   else if(type == 'Cyber') return (!this.enableCyberSection && !this.enableAllSection);
    //   else if(type == 'accessories' && this.enableAllSection || this.accessoriesSection) {
    //     return true;
    //   }
    //   else if(type == 'accessories' && !this.enableAllSection || !this.accessoriesSection) {
    //       return (!this.accessoriesSection && !this.enableAllSection);}
    }
    else return true;
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  getSumInsuredDetails(){
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}quote/productsuminsureddetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.sumInsuredDetails = data.Result;
          this.item = this.sumInsuredDetails?.ProductSuminsuredDetails?.SectionId;
          if(this.productId!='19' && this.productId!='3'){
            this.setTabSections();
            this.getContentList();
          }
          else{
            this.newjsonfile();
            //this.setTabSections();
          }
         
          if(this.six){
            this.Electronic();
          }
          if(this.productId=='21' || this.productId=='26'){
            this.getallriskLists();
          }
          if(this.productId=='5' || this.productId=='29'){
            this.getAccesroies();
            this.getchassisAcc();
          }
          // else if(this.productId=='26'){
          //   this.getallriskListsplant();
          // }
          else if(this.productId=='39'){
            this.getallriskMachinery();
          }
          else if(this.productId=='42'){
            this.getcontenttype();
            this.getCyberDetails();
          }
          else {
            //this.getallriskList();
          }
             
          if(this.sumInsuredDetails){
            // if(this.first) this.contentSumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.second) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.third) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.fifth) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            this.currencyValue = this.sumInsuredDetails.ProductSuminsuredDetails.CurrencyId;
            if(this.productId=='5' || this.productId=='29'){
              this.currencyValue = this.sumInsuredDetails.ProductSuminsuredDetails.Currency;
            }
            this.accidentOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationTypeDesc;
            this.accidentOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationType;
            this.liabilityOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationDesc;
            this.liabilityOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationId
            let buildingSI = this.sumInsuredDetails.ProductSuminsuredDetails.BuildingSuminsured;
            if(buildingSI!='' && buildingSI!=null && buildingSI!=undefined){
              this.actualBuildingSI = buildingSI;
              console.log('LLLLLLLLLL',this.actualBuildingSI);
            }
            else this.actualBuildingSI = 0;
            let contentSI = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            if(contentSI!='' && contentSI!=null && contentSI!=undefined){
              this.actualContentSI = contentSI;
            }
            else this.actualContentSI = 0;
            let allRiskSI = this.sumInsuredDetails.ProductSuminsuredDetails.AllriskSumInsured;
            if(allRiskSI!='' && allRiskSI!=null && allRiskSI!=undefined){
              this.actualAllRiskSI = allRiskSI;
              console.log('KKKKKKKKKKK',this.actualAllRiskSI);
            }
            else this.actualAllRiskSI = 0;

            let AccSI = this.sumInsuredDetails.ProductSuminsuredDetails.AccessoriesSuminsured;
            if(AccSI!='' && AccSI!=null && AccSI!=undefined){
              this.actualAssSI = AccSI;
            }
            else this.actualAssSI  = 0;

            let EquipmentSi = this.sumInsuredDetails.ProductSuminsuredDetails.EquipmentSi;
            if(EquipmentSi!='' && EquipmentSi!=null && EquipmentSi!=undefined){
              this.EquipmentSi = EquipmentSi;
            }
            else this.EquipmentSi = 0;
            let pAccSI = this.sumInsuredDetails.ProductSuminsuredDetails.PersonalAccSuminsured;
            if(pAccSI!='' && pAccSI!=null && pAccSI!=undefined){
              this.actualPersonalAccSI = pAccSI;
            }
            else this.actualPersonalAccSI = 0;
            let pASI = this.sumInsuredDetails.ProductSuminsuredDetails.PersonalIntermediarySuminsured;
            if(pASI!='' && pASI!=null && pASI!=undefined){
              this.actualPersonalIntSI = pASI;
            }
            else this.actualPersonalIntSI = 0;
            let electr =this.sumInsuredDetails.ProductSuminsuredDetails.ElecEquipSuminsured;
            if(electr!='' && electr!=null && electr!=undefined){
              this.actualElectronicIntSI = electr;
            }
            else this.actualElectronicIntSI=0;
            let empSI = this.sumInsuredDetails.ProductSuminsuredDetails.EmpLiabilitySi;
            if(empSI!='' && empSI!=null && empSI!=undefined){
              this.actualEmployeeSI = empSI;
            }
            else this.actualEmployeeSI=0;
            let MachinerySI = this.sumInsuredDetails.ProductSuminsuredDetails.MachinerySi;
            if(MachinerySI!='' && MachinerySI!=null && MachinerySI!=undefined){
              this.actualMachinerySI = MachinerySI;
            }
            else this.actualMachinerySI=0;
            let FidEmpSi = this.sumInsuredDetails.ProductSuminsuredDetails.FidEmpSi;
            if(FidEmpSi!='' && FidEmpSi!=null && FidEmpSi!=undefined){
              this.actualFidelitySI = FidEmpSi;
            }
            else this.actualFidelitySI=0;
            console.log("SI Rec",this.sumInsuredDetails);
          }
          if(this.productId!='19') {
            this.getbuilding();
          } 
          if(this.productId=='5' || this.productId=='29'){
            this.getAccessories();
          }
        }
      },
      (err) => { },
    );
  }
  getCyberDetails(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": this.item[0]
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
           if(res.Result.ContentRiskDetails.length!=0){
              this.CyberItem = res.Result.ContentRiskDetails;
           }
          }
        }
      })
  }
  onBuildingCancel(){
    if(!this.editBuildingSection)  this.building.splice(this.currentBuildingIndex,1);
    this.LocationName = null; this.BuildingAddress=null;this.BuildingSuminsured=null;
    this.currentBuildingIndex = null;
    this.enableBuildingEditSection = false;
  }
  onCyberCancel(){
    if(!this.editCyberSection)  this.CyberItem.splice(this.currentCyberIndex,1);
    this.DeviceType = null; this.CyberMake=null;this.BuildingSuminsured=null;
    this.currentCyberIndex = null;
    this.enableCyberSection = false;
  }
  onMachineryCancel(){
    if(!this.editMachinerySection)  this.machineries.splice(this.currentMachineryIndex,1);
  this.productItem.MBrand =null; this.productItem.MContentType=null; this.productItem.MLocation=null;
  this.productItem.MName =null; this.productItem.MSI=null;
  this.productItem.MSerialNo=null;
    // this.MachineryName = null;this.BrandName=null;this.serialNoDesc=null;this.SumInsured=null;
    // this.currentMachineryIndex = null;
    this.enableMachineryEditSection = false;
  }
  onContentCancel(){
    if(!this.editContentSection) this.Cotentrisk.splice(this.currentContentIndex,1);
    this.LocationId = null;this.serialNoDesc = null;this.contentRiskDesc = null;
    this.contentSI = null;this.contentId = null;this.enableContentEditSection=false;
  }
  onPeronalAccidentCancel(){
    if(!this.editPersonalAccidentSection) this.PersonalAssistantList.splice(this.currentPersonalAccidentIndex,1);
   this.productItem.AccDob=null; this.productItem.AccName=null; this.productItem.AccNationID = null;
   this.productItem.AccSI=null; this.productItem.AccName =null; this.productItem.AccOccupation = null;
   this.enablePersonalAccEditSection = false;
  }
  onAllRiskCancel(){
    if(!this.editRiskSection) this.risk.splice(this.currentPersonalAccidentIndex,1);
   this.productItem.RiskContentType=null; this.productItem.RiskDescription=null; this.productItem.RiskLocation= null;
   this.productItem.RiskSerialNo=null; this.productItem.RiskSI =null;
   this.enableAllriskEditSection=false;
  }

  onPeronalIndCancel(){
    if(!this.editPersonalIndSection) this.Intermedity.splice(this.currentPersonalIndIndex,1);
   this.productItem.IndDob=null; this.productItem.IndName=null; this.productItem.IndNationID = null;
   this.productItem.IndSI=null; this.productItem.IndName =null; this.productItem.IndOccupation = null;
   this.enablePersonalIndEditSection = false;
  }

  onElectronicCancel(){
      if(!this.editElectronicSection) this.ElectronicItem.splice(this.currentElectronicIndex,1);
    this.productItem = new ProductData();
   this.enableElectronicEquipmentSection= false;
  }

  onAccessoriesCancel(){
    if(!this.editAccessoriesSection) this.accessoriesList.splice(this.currentAccessoriesIndex,1);
    this.chassisNo = null;this.accessoriesType=null;this.serialNoDesc=null;this.SumInsured=null;
    this.currentAccessoriesIndex = null;
    this.enableAccessoriesEditSection=false;
  }
  onEmplyeeCancel(){
    if(!this.editEmployeeSection) this.employeeList.splice(this.currentEmployeeIndex,1);
    this.currentEmployeeIndex = null;this.enableEmployeeEditSection = false;
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empLocation = null;
      this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
  }
  onFidelityCancel(){
    if(!this.editFidelitySection) this.fidelityList.splice(this.currentFidelityIndex,1);
    this.currentFidelityIndex = null;this.enableFidelityEditSection = false;
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empLocation = null;
      this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
  }
  onMedicalSave(){
    let date = null;
    console.log("Final Product Value",this.productItem)
    let ReqObj = {
      "Createdby": this.loginId,
      "SectionId": "70",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "ProductEmployeeSaveReq": [
          {
              "RiskId": 1,
              "LocationId": 1,
              "EmployeeId": "1",
              "EmployeeName": this.productItem.EmployeeName,
              "OccupationId":null,
              "OccupationDesc": null,
              "Salary": null,
              "ProductId": this.productId,
              "ProductDesc": "Medical",
              "Address": null,
              "NationalityId": null,
              "DateOfJoiningYear": this.productItem.DateOfJoiningYear,
              "DateOfJoiningMonth": null,
              "DateOfBirth": null,
              "SectionId": "70",
              "Rate": null,
              "PremiumFc": "",
              "PremiumLc": "",
              "LocationName": "",
              "HighestQualificationHeld": this.productItem.HighestQualificationHeld,
              "IssuingAuthority": this.productItem.IssuingAuthority
  
          }
      ],
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.motorApiUrl}api/saveemployees`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {
          }
        }
          else  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
      },
      (err) => { },
    );

  }
  onCyberSaves(){
        //this.CyberItem[this.currentCyberIndex].ContentRiskDesc = this.BuildingSuminsured;
        console.log('UUUUUUUUUUUUUUUUUU',this.CyperList);
        this.CyberItem[this.currentCyberIndex].ContentRiskDesc = this.CyperList.find(ele=>ele.Code==this.productItem.DeviceType).label;
        this.CyberItem[this.currentCyberIndex].SerialNoDesc = this.productItem.DeviceSNo;
        this.CyberItem[this.currentCyberIndex].MakeAndModel = this.productItem.DeviceMake;
        this.CyberItem[this.currentCyberIndex].ManufactureYear = this.productItem.DeviceYear;
        this.CyberItem[this.currentCyberIndex].ItemId = this.productItem.DeviceType;
        // if(this.DeviceType!=null){
        //   this.CyberItem[this.currentCyberIndex].ItemDesc = this.CyperList.find(ele=>ele.Code==this.DeviceType)?.CodeDesc;
        // }
        this.CyberItem[this.currentCyberIndex].RiskId = this.productItem.DeviceLocation;
        this.CyberItem[this.currentCyberIndex].Name= this.CyperList.find(ele=>ele.Code==this.productItem.DeviceType).label;
        this.CyberSNo=null;this.CyberMake=null;this.Cyberyear=null;this.DeviceType=null;this.LocationId=null;

        this.productItem=new ProductData();
        this.editCyberSection = false;
       this.enableCyberSection = false;
        // this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
  }
  
  onBuildingSave(){
    // this.buildingSIError = false;this.buildingLocationError=false; this.buildingAddressError = false;this.totalBuildSIError = false;
    // if(this.LocationName!=null && this.LocationName!=undefined && this.BuildingAddress!=null){
    //   if(!this.sumInsured){
    //     if(this.BuildingSuminsured==0 || this.BuildingSuminsured=='' || this.BuildingSuminsured==null || this.BuildingSuminsured==undefined) this.BuildingSuminsured = 0;  
    //     this.building[this.currentBuildingIndex].BuildingSuminsured = this.BuildingSuminsured;
    //     this.building[this.currentBuildingIndex].LocationName = this.LocationName;
    //     this.building[this.currentBuildingIndex].BuildingAddress = this.BuildingAddress;
    //     this.editBuildingSection = false;
    //     this.enableBuildingEditSection = false;
    //     this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    //   }
    //   else if(this.BuildingSuminsured==0 || this.BuildingSuminsured=='' || this.BuildingSuminsured==null || this.BuildingSuminsured==undefined) this.buildingSIError = true;
    //   else if(this.totalBuildingSumInsured>this.actualBuildingSI){
    //     this.totalBuildSIError = true;
    //   }
    //   else{
    //     this.building[this.currentBuildingIndex]['LocationName'] = this.LocationName;
    //     this.building[this.currentBuildingIndex]['BuildingAddress'] = this.BuildingAddress;
    //     this.building[this.currentBuildingIndex]['BuildingSuminsured'] = this.BuildingSuminsured;
    //     this.editBuildingSection = false;
    //     this.enableBuildingEditSection = false;
    //     this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    //   }
    // }
    // else if(this.LocationName==null || this.LocationName==undefined){this.buildingLocationError=true;}
    // else if(this.BuildingAddress==null || this.BuildingAddress==undefined){this.buildingAddressError = true;}
    console.log("Final Additional Info",this.form,this.productItem)
    let i=0;
    if(this.productItem.LocationAddress=='' || this.productItem.LocationAddress==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.LocationNameBuilding=='' || this.productItem.LocationNameBuilding==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(i==0){
      this.building[this.currentBuildingIndex]['LocationName'] =  this.productItem.LocationNameBuilding;
      this.building[this.currentBuildingIndex]['BuildingAddress'] = this.productItem.LocationAddress;
      this.building[this.currentBuildingIndex]['BuildingSuminsured'] = this.productItem.BuildingSumInsureds;
         this.editBuildingSection = false;
      this.enableBuildingEditSection = false;
      this.productItem.BuildingSumInsureds=null; this.productItem.LocationAddress=null;
      this.productItem.LocationNameBuilding=null;
    }
   
      // this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    
  
}
checkMandatories(){
  return this.form.errors!=null;
}
onMachinerySave(){
 
 
    // this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    // let i=0;
    // if(this.MachineryLocation==null || this.MachineryLocation==undefined || this.MachineryLocation==''){ i+=1; this.locationIdError = true;}
    // if(this.machineryItemId==null || this.machineryItemId==undefined || this.machineryItemId==''){ i+=1; this.contentIdError = true;}
    // if(this.serialNoDesc==null || this.serialNoDesc==undefined || this.serialNoDesc==''){ i+=1; this.serialNoError = true;}
    // if(this.MachineryName==null || this.MachineryName==undefined || this.MachineryName==''){ i+=1; this.contentDescError = true;}
    // if(this.MiSumInsured==null || this.MiSumInsured==undefined || this.MiSumInsured=='' || this.MiSumInsured == '0'){ i+=1; this.contentSIError = true;}
    // console.log('uuuuuuuuu',i)
    // if(i==0){
      this.machineries[this.currentMachineryIndex]['SumInsured'] = this.productItem.MSI;//this.MiSumInsured;
      this.machineries[this.currentMachineryIndex]['RiskId'] = this.productItem.MLocation;
      this.machineries[this.currentMachineryIndex]['SerialNoDesc'] = this.productItem.MSerialNo; //this.serialNoDesc;
      this.machineries[this.currentMachineryIndex]['ContentRiskDesc'] = this.productItem.MDescription; //this.MachineryName;
      this.machineries[this.currentMachineryIndex]['ItemId'] = this.productItem.MContentType; //this.machineryItemId;
      this.machineries[this.currentMachineryIndex]['Name'] = this.productItem.MName;//this.NameDesc;
      this.machineries[this.currentMachineryIndex]['Brand'] = this.productItem.MBrand;//this.BrandName;
      this.productItem = new ProductData();
      // this.MachineryName = null;this.BrandName=null;this.serialNoDesc=null;this.SumInsured=null;
      this.currentMachineryIndex = null;
      this.enableMachineryEditSection = false;
      // this.machineries[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.LocationId).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      // this.editContentSection = false;
      // this.enableContentEditSection = false;
    //}

}
onFidelitySave(){
  // this.employeeNameError = false;this.employeeOccupationError = false;this.employeeAddressError=false;
  // this.employeeNationalityError = false;this.employeeDobError = false;this.employeeDojError = false;
  // this.employeeSalaryError = false;this.employeeLocationError=false;let i=0;
  // if(this.employeeName=='' || this.employeeName==null || this.employeeName == undefined){i+=1;this.employeeNameError=true};
  // if(this.occupationType=='' || this.occupationType==null || this.occupationType == undefined){i+=1;this.employeeOccupationError=true};
  // // if(this.empAddress=='' || this.empAddress==null || this.empAddress == undefined){i+=1;this.employeeAddressError=true};
  // if(this.nationality=='' || this.nationality==null || this.nationality == undefined){i+=1;this.employeeNationalityError=true};
  // if(this.empDob=='' || this.empDob==null || this.empDob == undefined){i+=1;this.employeeDobError=true};
  // if(this.empJoiningDate=='' || this.empJoiningDate==null || this.empJoiningDate == undefined){i+=1;this.employeeDojError=true};
  // if(this.empLocation=='' || this.empLocation==null || this.empLocation == undefined){i+=1;this.employeeLocationError=true};
  // if(this.employeeSalary=='' || this.employeeSalary==null || this.employeeSalary == undefined){i+=1;this.employeeSalaryError=true};
  // if(i==0){
    let SectionId = null;
    if(this.productId=='32') SectionId = '43';
    this.fidelityList[this.currentFidelityIndex]['RiskId'] = this.productItem.fdLocation;//this.empLocation;
    this.fidelityList[this.currentFidelityIndex]['LocationId'] = this.productItem.fdLocation;//this.empLocation;
    this.fidelityList[this.currentFidelityIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.fdLocation).label;
    this.fidelityList[this.currentFidelityIndex]['Createdby'] = this.loginId;
    this.fidelityList[this.currentFidelityIndex]['Address'] =  this.productItem.fdAddress;//this.empAddress;
    this.fidelityList[this.currentFidelityIndex]['EmployeeName'] = this.productItem.fdName;
    this.fidelityList[this.currentFidelityIndex]['OccupationId'] = this.productItem.fdOccupation//this.occupationType;
    this.fidelityList[this.currentFidelityIndex]['OccupationDesc'] = this.fidelityOccupationList.find(ele=>ele.Code==this.productItem.fdOccupation).label;
    this.fidelityList[this.currentFidelityIndex]['DateOfBirth'] = this.datePipe.transform(this.productItem.fdDob, "dd/MM/yyyy");
    this.fidelityList[this.currentFidelityIndex]['DateOfJoiningYear'] = this.productItem.fdPeriod;//this.empJoiningDate;
    this.fidelityList[this.currentFidelityIndex]['DateOfJoiningMonth'] = this.productItem.fdJoin;//this.empJoiningMonth;
    this.fidelityList[this.currentFidelityIndex]['SectionId'] = SectionId;
    // let salary = '';
    // if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
    // else salary = this.employeeSalary;
    this.fidelityList[this.currentFidelityIndex]['Salary'] = this.productItem.fdSI;
    this.fidelityList[this.currentFidelityIndex]['NationalityId'] = this.productItem.fdNationality;//this.nationality;
    this.editFidelitySection = false;this.enableFidelityEditSection = false;this.currentFidelityIndex=null;
    this.productItem = new ProductData();
    // this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    // this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;this.empLocation = null;
  //}
}
  onEmployeeSave(){
    let i =0; this.employeeSalaryError=false;
    if(this.productItem.EmpsSI =='' || this.productItem.EmpsSI==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsLocation=='' || this.productItem.EmpsLocation==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsName =='' || this.productItem.EmpsName==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsOccupation=='' || this.productItem.EmpsOccupation==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsPeriod=='' || this.productItem.EmpsPeriod==null){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.EmpsJoin=='' || this.productItem.EmpsJoin==null){
      i+=1;
      this.form.markAllAsTouched();
    }
   
   
    if(i==0){
      this.employeeList[this.currentEmployeeIndex]['Address'] = this.productItem.EmpsAddress;//this.empAddress;
      this.employeeList[this.currentEmployeeIndex]['Createdby'] = this.loginId;
      this.employeeList[this.currentEmployeeIndex]['RiskId'] = this.productItem.EmpsLocation;//this.empLocation;
      this.employeeList[this.currentEmployeeIndex]['LocationId'] = this.productItem.EmpsLocation; //this.empLocation;
      this.employeeList[this.currentEmployeeIndex]['EmployeeName'] = this.productItem.EmpsName;//this.employeeName;
      this.employeeList[this.currentEmployeeIndex]['OccupationId'] = this.productItem.EmpsOccupation;//this.occupationType;
      this.employeeList[this.currentEmployeeIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.EmpsLocation).label;//.CodeDesc;
      this.employeeList[this.currentEmployeeIndex]['OccupationDesc'] = this.employeeOccupationList.find(ele=>ele.Code==this.productItem.EmpsOccupation).label//this.occupationType).CodeDesc;
      if(this.productItem.EmpsDob!=null && this.productItem.EmpsDob!='') this.employeeList[this.currentEmployeeIndex]['DateOfBirth'] = this.datePipe.transform(this.productItem.EmpsDob, "dd/MM/yyyy");
      this.employeeList[this.currentEmployeeIndex]['DateOfJoiningYear'] =this.productItem.EmpsPeriod; //this.empJoiningDate;
      this.employeeList[this.currentEmployeeIndex]['DateOfJoiningMonth'] = this.productItem.EmpsJoin;//this.empJoiningMonth;
      let salary = '';
      // if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
      // else salary = this.employeeSalary;
      this.employeeList[this.currentEmployeeIndex]['Salary'] = this.productItem.EmpsSI;//salary;
      this.employeeList[this.currentEmployeeIndex]['NationalityId'] = this.productItem.EmpsNationality; //this.nationality;
      this.getTotalSICost('Employee');
      this.onsubmitemployee();
     
      // this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
      // this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
    }
  }
  isValid(field: FormlyFieldConfig): boolean {
    
    if (field.key) {
      return field.formControl.value!='';
    }
    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
  employeedownload(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/sample/download`
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.Base64);
        link.setAttribute('download', data?.Result.FileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onSaveFidelityDetails(type){
    let urlLink = null;
    if(type=='save') urlLink = `${this.motorApiUrl}api/saveemployees`;
    else urlLink = `${this.motorApiUrl}api/proceedemployees`;
    if(this.fidelityList.length!=0){
        let empList = [],i=0;
        for(let emp of this.fidelityList){
          let entry = emp;
          if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
          if(entry['EmployeeId']==null || entry['EmployeeId']==undefined || entry['EmployeeId']=='') entry['EmployeeId'] = null;
          else entry['EmployeeId'] = String(entry.EmployeeId);
          empList.push(entry);
          i+=1;
          if(i==this.fidelityList.length){
            //let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
            let SectionId = null;
            let validYN='N';
            if(type=='alter') validYN = 'Y';
            if(this.productId=='32' || this.productId=='19') SectionId = '43';
            let ReqObj = {
              "Createdby": this.loginId,
              "SectionId": SectionId,
              "ProductId": this.productId,
              "EmpcountSIvalidYN": validYN,
              "ExcelUploadYN": "N",
              "InsuranceId": this.insuranceId,
              "ProductEmployeeSaveReq": empList,
              "QuoteNo": this.quoteNo,
              "RequestReferenceNo": this.quoteRefNo
            }
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                let res: any = data;
                if (data.ErrorMessage.length != 0) {
                  if (res.ErrorMessage) {
                      console.log("Error Message",res)   
                      let entry = res.ErrorMessage.some(ele=>ele.Code=='333' || ele.Code=='111' || ele.Code=='222');
                      if(entry){
                        let ulList = '';
                        for (let index = 0; index < res.ErrorMessage.length; index++) {
                          const element = res.ErrorMessage[index];
                  
                           ulList +=`<li class="list-group-login-field">
                            <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                            <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                          </li>`
                          // if(index==res.ErrorMessage.length-1){
                          //   Swal.fire({
                          //     title: '<strong>MisMatch Error</strong>',
                          //     icon: 'info',
                          //     html:
                          //       `<ul class="list-group errorlist">
                          //         ${ulList}
                          //         <li>Do you want to continue?</li>
                          //    </ul>`,
                          //     showCloseButton: true,
                          //     //focusConfirm: false,
                          //     showCancelButton:true,
                  
                          //    //confirmButtonColor: '#3085d6',
                          //    cancelButtonColor: '#d33',
                          //    confirmButtonText: 'Yes,Proceed!',
                          //    cancelButtonText: 'Cancel',
                          //   }).then((result) => {
                          //     if (result.isConfirmed) {
                          //         this.onSaveFidelityDetails('alter');
                          //     }
                          //   });
                          // }
                        }
                        
                      }
                  }
                }
                else if(this.productId=='19' && this.nine)this.selectedTab +=1; 
                else{
                 this.checkValidation();
                }
            },
            (err) => { },
            );
          }
        }
    }
    else{alert("No Fidelity Details Found")}
  }
  onSaveEmployeeDetails(type){
    
    let urlLink = null;
    if(type=='save') urlLink = `${this.motorApiUrl}api/saveemployees`;
    else urlLink = `${this.motorApiUrl}api/proceedemployees`;
    if(this.employeeList.length!=0){
        let empList = [],i=0;
        for(let emp of this.employeeList){
          let entry = emp;
           if(entry.DateOfBirth!=null){
              if(!entry.DateOfBirth.includes('/')) entry['DateOfBirth']= this.datePipe.transform(entry.DateOfBirth, "dd/MM/yyyy");
          }
          if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
          if(entry['EmployeeId']==null || entry['EmployeeId']==undefined || entry['EmployeeId']=='') entry['EmployeeId'] = null;
          else entry['EmployeeId'] = String(entry.EmployeeId);
          empList.push(entry);
          i+=1;
          if(i==this.employeeList.length){
            let SectionId = null;
            if(this.productId=='14' || this.productId=='19') SectionId = '45';
            let validYN='N';
            if(type=='alter') validYN = 'Y';
            let ReqObj = {
              "Createdby": this.loginId,
              "SectionId": SectionId,
              "ProductId": this.productId,
              "InsuranceId": this.insuranceId,
              "ProductEmployeeSaveReq": empList,
              "QuoteNo": this.quoteNo,
               // "EmpcountSIvalidYN": validYN,
              // "ExcelUploadYN": "N",
              // "RequestReferenceNo": this.quoteRefNo
            }
            //let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
            this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
              (data: any) => {
                console.log(data);
                let res: any = data;
                if (data.ErrorMessage.length != 0) {
                  if (res.ErrorMessage) {
                    let entry = res.ErrorMessage.some(ele=>ele.Code=='333' || ele.Code=='111' || ele.Code=='222');
                    if(entry){
                      let ulList = '';
                      for (let index = 0; index < res.ErrorMessage.length; index++) {
                        const element = res.ErrorMessage[index];
                
                         ulList +=`<li class="list-group-login-field">
                          <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                          <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                        </li>`
                        
                      }
                      
                    }
                    
                }
              }
              else{
                if(this.productId=='19' && this.eight)  this.selectedTab +=1; 
                else if(this.productId=='19' && this.nine)this.selectedTab +=1; 
                else this.checkValidation();
              }
        
            },
            (err) => { },
            );
          }
        }
    }
    else{alert("No Employees Found")}
  }
  onAccessoriesSubmit(){
    // this.chassisNoError = false;this.accessoriesTypeError = false;this.serialNoError = false;this.sumInsuredError = false;
    // this.totalAccSIError = false;
    // if(i==0){
    //   this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
    //   this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
    //   this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
    //   this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
    //   this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
    //   this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
    //   this.productItem.ContentSI=null; this.productItem.ContentLocation=null;this.productItem.ContentSerialNo=null;
    //   this.productItem.ContentDesc=null;this.productItem.ContentType=null;this.currentContentIndex=null;
    //   this.editContentSection = false;
    //   this.enableContentEditSection = false;
    // } 
    if(this.Riskdetails.length==1){
      this.productItem.AccessoriesChassisNo = 1;
    }
    console.log('yyyyyyyyyyyy',this.productItem.AccessoriesChassisNo);
    let i =0;
    if(this.productItem.AccessoriesChassisNo==null || this.productItem.AccessoriesChassisNo==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.AccessoriesType==null || this.productItem.AccessoriesType==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.AccessoriesSerialNo==null || this.productItem.AccessoriesSerialNo==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    if(this.productItem.AccessoriesSI==null || this.productItem.AccessoriesSI=='0' || this.productItem.AccessoriesSI==''){
      i+=1;
      this.form.markAllAsTouched();
    }
    else if(this.totalAccessoriesSI > this.actualAssSI){
      i+=1;
      this.totalAccSIError = true;
      this.onsubmitAccessories()
    }
    if(i==0){
      console.log('JJJJJJJJJ',this.productItem.AccessoriesChassisNo);
      // this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
      // this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
      // this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
      // this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
      // this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
      // this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = this.productItem.AccessoriesSI//this.contentSI;
      this.accessoriesList[this.currentAccessoriesIndex]['RiskId'] = this.productItem.AccessoriesChassisNo;
      this.accessoriesList[this.currentAccessoriesIndex]['SerialNoDesc'] = this.productItem.AccessoriesSerialNo;//this.serialNoDesc
      this.accessoriesList[this.currentAccessoriesIndex]['ItemId'] = this.productItem.AccessoriesType//this.contentId;
      this.accessoriesList[this.currentAccessoriesIndex]['LocationId'] = this.productItem.AccessoriesChassisNo;
      this.accessoriesList[this.currentAccessoriesIndex]['ContentRiskDesc'] =this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
      //this.AccLists.find(ele=>ele.Code==this.productItem.AccessoriesType).label;
      this.currentAccessoriesIndex = null;
      this.editAccessoriesSection = false;
      this.enableAccessoriesEditSection = false;
      this.productItem = new ProductData();
    }
      
  }
  onContentSubmit(){
    console.log('PPPPPPPPPPPP')
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
    // if(this.LocationId==null || this.LocationId==undefined || this.LocationId==''){ i+=1; this.locationIdError = true;}
    // if(this.contentId==null || this.contentId==undefined || this.contentId==''){ i+=1; this.contentIdError = true;}
    // if(this.serialNoDesc==null || this.serialNoDesc==undefined || this.serialNoDesc==''){ i+=1; this.serialNoError = true;}
    // if(this.contentRiskDesc==null || this.contentRiskDesc==undefined || this.contentRiskDesc==''){ i+=1; this.contentDescError = true;}
    // if(this.contentSI==null || this.contentSI==undefined || this.contentSI=='' || this.contentSI == '0'){ i+=1; this.contentSIError = true;}
    if(this.productItem.ContentSI==null || this.productItem.ContentSI==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ContentLocation==null || this.productItem.ContentLocation==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ContentSerialNo==null || this.productItem.ContentSerialNo==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ContentType==null || this.productItem.ContentType==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ContentDesc==null || this.productItem.ContentDesc==''){i+=1;this.form.markAllAsTouched();}
    if(i==0){
      this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.productItem.ContentSI//this.contentSI;
      this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.productItem.ContentLocation;
      this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.productItem.ContentSerialNo;//this.serialNoDesc
      this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] =this.productItem.ContentDesc; //this.contentRiskDesc;
      this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.productItem.ContentType//this.contentId;
      this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      this.productItem.ContentSI=null; this.productItem.ContentLocation=null;this.productItem.ContentSerialNo=null;
      this.productItem.ContentDesc=null;this.productItem.ContentType=null;this.currentContentIndex=null;
      this.editContentSection = false;
      this.enableContentEditSection = false;
    }   
  }
  onAllRiskSubmit(){
    
    this.risk[this.currentRiskIndex]['SumInsured'] = this.productItem.RiskSI;
    this.risk[this.currentRiskIndex]['ContentRiskDesc'] = this.productItem.RiskDescription;
    this.risk[this.currentRiskIndex]['SerialNoDesc'] = this.productItem.RiskSerialNo,
    this.risk[this.currentRiskIndex]['RiskId'] = this.productItem.RiskLocation;//this.serialNoDesc
    this.risk[this.currentRiskIndex]['ItemId'] =this.productItem.RiskContentType; 
    this.productItem=new ProductData();//this.contentRiskDesc;
    this.editRiskSection= false;
    this.enableAllriskEditSection=false;
  }

  onElectronicSubmit(){
    console.log('PPPPPPPPPPPP')
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
    if(this.productItem.ElqJoin==null || this.productItem.ElqJoin==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqList==null || this.productItem.ElqList==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqLocation==null || this.productItem.ElqLocation==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqPeriod==null || this.productItem.ElqPeriod==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.Elqmake==null || this.productItem.Elqmake==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.ElqSI==null || this.productItem.ElqSI==''){i+=1;this.form.markAllAsTouched();}
    if(i==0){
      this.ElectronicItem[this.currentElectronicIndex]['SumInsured'] = this.productItem.ElqSI;//this.contentSI;
      this.ElectronicItem[this.currentElectronicIndex]['ContentRiskDesc'] = this.ElectronicList.find(ele=>ele.Code==this.productItem.ElqList).label;
      this.ElectronicItem[this.currentElectronicIndex]['PurchaseMonth'] = this.productItem.ElqJoin;//this.serialNoDesc
      this.ElectronicItem[this.currentElectronicIndex]['PurchaseYear'] =this.productItem.ElqPeriod; //this.contentRiskDesc;
      this.ElectronicItem[this.currentElectronicIndex]['ItemId'] = this.productItem.ElqList//this.contentId;
      this.ElectronicItem[this.currentElectronicIndex]['MakeAndModel'] = this.productItem.Elqmake;
      this.ElectronicItem[this.currentElectronicIndex]['RiskId'] = this.productItem.ElqLocation;
      //this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
    this.productItem = new ProductData();
      this.editElectronicSection = false;
      this.enableElectronicEquipmentSection = false;
    }   
  }

  onAccidentSubmit(){
    console.log('PPPPPPPPPPPP')
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
    if(this.productItem.AccSI==null || this.productItem.AccSI==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccidentLocation==null || this.productItem.AccidentLocation==''){i+=1;this.form.markAllAsTouched();}
    if(this.accidentOccupationId==null || this.accidentOccupationId==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccName==null || this.productItem.AccName==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccNationID==null || this.productItem.AccNationID==''){i+=1;this.form.markAllAsTouched();}
    if(this.productItem.AccDob==null || this.productItem.AccDob==''){i+=1;this.form.markAllAsTouched();}
    if(i==0){
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = this.productItem.AccSI;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['RiskId'] = this.productItem.AccidentLocation;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['OccupationId'] = this.accidentOccupationId,
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['OccupationDesc'] = this.accidentOccupation;//this.serialNoDesc
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['PersonName'] =this.productItem.AccName; //this.contentRiskDesc;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Dob'] = this.productItem.AccDob;
      this.PersonalAssistantList[this.currentPersonalAccidentIndex]['NationalityId'] = this.productItem.AccNationID;
      //this.contentId;
      //this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      this.productItem.AccSI=null;this.productItem.AccidentLocation=null;this.productItem.AccName=null;this.productItem.AccDob=null;
      this.productItem.AccNationID =null;
      this.currentPersonalAccidentIndex=null;
      this.editPersonalAccidentSection= false;
      this.enablePersonalAccEditSection =false;
    }
  }

  onIndSubmit(){
    console.log('PPPPPPPPPPPP')
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
      this.Intermedity[this.currentPersonalIndIndex]['Salary'] = this.productItem.IndSI;
      this.Intermedity[this.currentPersonalIndIndex]['RiskId'] = this.productItem.IndLocation;
      this.Intermedity[this.currentPersonalIndIndex]['OccupationId'] = this.liabilityOccupationId;
      this.Intermedity[this.currentPersonalIndIndex]['OccupationDesc'] = this.liabilityOccupation;//this.serialNoDesc
      this.Intermedity[this.currentPersonalIndIndex]['PersonName'] =this.productItem.IndName; //this.contentRiskDesc;
      this.Intermedity[this.currentPersonalIndIndex]['Dob'] = this.productItem.IndDob;
      this.Intermedity[this.currentPersonalIndIndex]['NationalityId'] = this.productItem.IndNationID;
      //this.contentId;
      //this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.productItem.ContentLocation).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      this.productItem.IndSI=null;this.productItem.IndLocation=null;this.productItem.IndName=null;this.productItem.IndDob=null;
      this.productItem.IndNationID =null;
      this.currentPersonalIndIndex=null;
      this.editPersonalIndSection= false;
      this.enablePersonalIndEditSection =false;
    
  }

  valuechange(row) {
    this.newname = row.LocationName;
  }
  checkValidation(){
    let ReqObj = {
      "QuoteNo": this.quoteNo
    }
    let urlLink = `${this.motorApiUrl}api/additionalinfovali`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data?.Message=='Success') {
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details']);
            }
          },
          (err) => { },
        ); 
  }
  onValueChange(event) {
    console.log("SumInsured", event);
    this.newname = event;
  }
  /*otheros=(event)=>{
    if(event.target.value === 'otheros'){
    $('#osother').show();
    }else{
    $('#osother').hide();}}*/
  getMedicalDetails(){
    let ReqObj = {
      "QuoteNo": this.quoteNo,
      "SectionId": "70"
    }
    let urlLink = `${this.motorApiUrl}api/getallactiveemployees`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           if(data.Result?.length!=0){
            this.productItem = new ProductData();
            this.formSection = true; this.viewSection = false;
            this.productItem.EmployeeName = data.Result[0]?.EmployeeName;
            this.productItem.DateOfJoiningYear = data.Result[0]?.DateOfJoiningYear;
            this.productItem.HighestQualificationHeld = data.Result[0]?.HighestQualificationHeld;
            this.productItem.IssuingAuthority = data.Result[0]?.IssuingAuthority;
           }
           else{
              this.productItem = new ProductData();
              this.formSection = true; this.viewSection = false;
           }
        }
      },
      (err) => { },
    );
  }
  getContentList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/contentrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.contentList = data.Result;

            
        }
      },
      (err) => { },
    );
  }
  getOccupationList(sectionId){
    let ReqObj = {},urlLink:any='';
    if(this.productId!='14' && this.productId!='32' && this.productId!='19'){
      ReqObj = {
        "InsuranceId":this.insuranceId,
        "BranchCode": this.branchCode,
        "ProductId":this.productId
      }
      urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    }
    else{
      ReqObj = {
        "SectionId": sectionId,
        "ProductId": this.productId,
        "QuoteNo": this.quoteNo
      }
      urlLink = `${this.CommonApiUrl}dropdown/occupations`;
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.productId=='14' || sectionId=='45'){
                  this.employeeOccupationList = data.Result;
                  for (let i = 0; i < this.employeeOccupationList.length; i++) {
                    this.employeeOccupationList[i].label = this.employeeOccupationList[i]['CodeDesc'];
                    this.employeeOccupationList[i].value = this.employeeOccupationList[i]['Code'];
                    delete this.employeeOccupationList[i].CodeDesc;
                    if (i == this.employeeOccupationList.length - 1) {
                      this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.employeeOccupationList;
                    }
                  }
          }
          else if(this.productId=='32' || sectionId=='43'){
            this.fidelityOccupationList = data.Result;
            for (let i = 0; i < this.fidelityOccupationList.length; i++) {
              this.fidelityOccupationList[i].label = this.fidelityOccupationList[i]['CodeDesc'];
              this.fidelityOccupationList[i].value = this.fidelityOccupationList[i]['Code'];
              delete this.fidelityOccupationList[i].CodeDesc;
              if (i == this.fidelityOccupationList.length - 1) {
                this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.fidelityOccupationList;
              }
              // console.log('JJJJJJJJJJJJJJJJJJJ',this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options)
            }
          }
          else 
          {
            this.occupationList = data.Result;
            for (let i = 0; i < this.occupationList.length; i++) {
              this.occupationList[i].label = this.occupationList[i]['CodeDesc'];
              this.occupationList[i].value = this.occupationList[i]['Code'];
              delete this.occupationList[i].CodeDesc;
              if (i == this.occupationList.length - 1) {
                if(this.eight){
                  this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.occupationList;
                }
                if(this.seven){
                  this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.occupationList;
                }
                // console.log('JJJJJJJJJJJJJJJJJJJ',this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options);
                //this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.employeeOccupationList;
              }
            }
          }
          
        }
      },
      (err) => { },
    );
  }
  getdropList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/content`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let defaultObj = [{ 'label': '-Select-', 'value': null }]
          this.dropList = data.Result;
          for (let i = 0; i < this.dropList.length; i++) {
            this.dropList[i].label = this.dropList[i]['CodeDesc'];
            this.dropList[i].value = this.dropList[i]['Code'];
            delete this.dropList[i].CodeDesc;
            if (i == this.dropList.length - 1) {
              this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = defaultObj.concat(this.dropList);
            }
          }
            

            //this.getOccupationList();
        }
      },
      (err) => { },
    );
  }
  getallriskListsplant(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/plantallrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result;
         
            //this.getOccupationList();

        }
      },
      (err) => { },
    );
  }
  getallriskLists(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/businessallrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.allriskList;
              }
            }
            //this.getOccupationList();

        }
      },
      (err) => { },
    );
  }
getchassisAcc(){
//   if(this.productId=='5' && !this.buildingSection){
//     let i=0; this.ChassisList=[];
//     for (let cover of this.Riskdetails) {
//       //this.ChassisList=cover.Chassisnumber;
//       this.ChassisList.push({ "Code": String(i + 1), "CodeDesc": cover.Chassisnumber})
//       i+=1;
//     }
//     console.log('Chasssis list',this.ChassisList)
//     if(this.ChassisList.length!=0){
//       for (let i = 0; i < this.ChassisList.length; i++) {
//         this.ChassisList[i].label = this.ChassisList[i]['CodeDesc'];
//         this.ChassisList[i].value = this.ChassisList[i]['Code'];
//         delete this.ChassisList[i].CodeDesc;
//         if (i == this.ChassisList.length - 1) {
//           this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.ChassisList;
//         }
//       }
//       console.log('Risk List',this.ChassisList);
//     }
// }
let ReqObj = {
  "QuoteNo":sessionStorage.getItem('quoteNo')
}
let urlLink = `${this.CommonApiUrl}dropdown/motorWithaccessories`;
this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    if(data.Result){   
      this.ChassisList = data.Result;
        for (let i = 0; i < this.ChassisList.length; i++) {
          this.ChassisList[i].label = this.ChassisList[i]['CodeDesc'];
          this.ChassisList[i].value = this.ChassisList[i]['Code'];
          delete this.ChassisList[i].CodeDesc;
          if (i == this.ChassisList.length - 1 && !this.newacc) {
            this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.ChassisList;
          }
        }
        console.log('Risk List',this.ChassisList);
    }
  },
  (err) => { },
); 
}
  getAccesroies(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/motorcontent`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){   
          this.AccLists = data.Result;
          for (let i = 0; i < this.AccLists.length; i++) {
            this.AccLists[i].label = this.AccLists[i]['CodeDesc'];
            this.AccLists[i].value = this.AccLists[i]['Code'];
            delete this.AccLists[i].CodeDesc;
            if (i == this.AccLists.length - 1 && !this.newacc) {
              this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.AccLists;
            }
            else if(i == this.AccLists.length - 1 && this.newacc){
              this.Accfieldss[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.AccLists;
            }
          }
          console.log('Accessories List',this.AccLists);
        }
      },
      (err) => { },
    ); 
  }
  getcontenttype(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/cybercontents`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.CyperList = data.Result;
            for (let i = 0; i < this.CyperList.length; i++) {
              this.CyperList[i].label = this.CyperList[i]['CodeDesc'];
              this.CyperList[i].value = this.CyperList[i]['Code'];
              delete this.CyperList[i].CodeDesc;
              if (i == this.CyperList.length - 1) {
                this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.CyperList;
              }
            }
            console.log('CyberContent List',this.CyperList);
        }
      },
      (err) => { },
    );
  }
  getallriskList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/allrisk`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                if(this.third)
                this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.allriskList;
              }
            }

        }
      },
      (err) => { },
    );
  }
  getallriskMachinery(){
    console.log('QQQQQQQQQQ333333333',this.quoteNo);
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}dropdown/machinerycontent`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.allriskList = data.Result.ContentTypeRes;
            for (let i = 0; i < this.allriskList.length; i++) {
              this.allriskList[i].label = this.allriskList[i]['CodeDesc'];
              this.allriskList[i].value = this.allriskList[i]['Code'];
              delete this.allriskList[i].CodeDesc;
              if (i == this.allriskList.length - 1) {
                this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = this.allriskList;
              }
            }
            //this.getOccupationList()
        }
      },
      (err) => { },
    );
  }
  onSave(type) {
    if (this.building.length != 0) {
      console.log("Building Details",this.building);
      let i = 0, buildReqList: any[] = [];
      for (let build of this.building) {
        if (i == 0) {
          this.LocationList = [];
        }
        let sumInsured = null;
        if(this.sumInsured == true){
           if(build.BuildingSuminsured==undefined || build.BuildingSuminsured==null) sumInsured = null;
          // else if(build.BuildingSuminsured.includes(',')){ sumInsured = build.BuildingSuminsured.replace(/,/g, '') }
          else sumInsured = build.BuildingSuminsured;
        }
        else{
          sumInsured = 0;
        }

        this.LocationList.push({ "Code": String(i + 1), "CodeDesc": build.LocationName })
       
        let ReqObj = {

          "BuildingSuminsured":sumInsured,
          "BuildingAddress": build.BuildingAddress,
          "Createdby": this.loginId,
          "InbuildConstructType":"W",
          "QuoteNo":sessionStorage.getItem('quoteNo'),
          "RequestReferenceNo":this.quoteRefNo,
          "SectionId": build.SectionId,
          "LocationName":build.LocationName,

          /*"ApartmentOrBorder": null,
          "BuildingAreaSqm": null,
          "BuildingBuildYear": build.BuildingBuildYear,
          "BuildingCondition": null,
          "BuildingFloors": build.BuildingFloors,
          "BuildingOccupationType": null,
          "BuildingType": null,
          "BuildingUsageId": null,
          "BuildingUsageYn": null,
          "BuildingSuminsured": sumInsured,
          "BuildingAddress": build.BuildingAddress,
          "Createdby": this.loginId,
          "CustomerId": null,
          "InbuildConstructType": build.InbuildConstructType,
          "QuoteNo": sessionStorage.getItem('quoteNo'),
          "RequestReferenceNo": this.quoteRefNo,
          "RiskId": null,
          "SectionId": build.SectionId,
          "UpdatedDate": null,
          "Updatedby": this.loginId,
          "WithoutInhabitantDays": null,
          "LocationName":build.LocationName,*/


        }
        buildReqList.push(ReqObj);
        i += 1;
        if (i == this.building.length) {
          this.saveBuildingDetails(buildReqList,type);
        }
      }
      console.log('TTTTTTTTTTTTTTTT',this.LocationList)
      if(this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six){
        if(this.LocationList.length !=0){
          for (let j = 0; j < this.LocationList.length; j++) {
            this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
            this.LocationList[j].value = this.LocationList[j]['Code'];
            delete this.LocationList[j].CodeDesc;
            if (j == this.LocationList.length - 1) {
              if(this.first){
                this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
              }
              if(this.second){
                this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
              }
             if(this.fifth){
              this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
             }
             if(this.six){
              this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
             if(this.ten){
              this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
             }
             if(this.third){
              this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
            if(this.nine){
              this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
            }
            if(this.seven){
              this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
            }
            if(this.eight){
              this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
            }
            }
          }
        }
      }
    }

    //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);

  }
  onSavePersonalAccident(){
    if (this.PersonalAssistantList.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.PersonalAssistantList){
        let salary;
        if(entry.Salary==undefined || entry.Salary==null) salary = null;
        // else if(entry.Salary.includes(',')){ salary = entry.Salary.replace(/,/g, '') }
        else salary = entry.Salary;
          let data = {
            "Dob": entry.Dob,
              "Height": null,
              "OccupationId": entry.OccupationId,
              "PersonName": entry.PersonName,
              "NationalityId": entry.NationalityId,
              "Salary": salary,
              "Weight": null,
              "RiskId": entry.RiskId,
              "SerialNo": entry.SerialNo
          }
          if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }
          reqList.push(data);
          i+=1;
          if(i==this.PersonalAssistantList.length){
            this.finalSaveRiskDetails(reqList,'PA');
          }
      }

    }
  }

  onSaveElectronic(){
  console.log('SSSSSSSSSSSS');
  console.log('tttttttt',this.ElectronicItem)
  if (this.ElectronicItem.length != 0){

      let i=0, reqList =[];
      for(let entry of this.ElectronicItem){
          /*let data = {
            "ItemId": entry.ItemId,
            "ItemValue": entry.SumInsured,
          "MakeAndModel": entry.MakeAndModel,
          "PurchaseMonth": entry.PurchaseMonth,
          "PurchaseYear": entry.PurchaseYear,
          "RiskId": entry.RiskId,
          "SerialNo": entry.SerialNo,
          "SumInsured":entry.SumInsured
          }*/
          let sumInsured;
          if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
          // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
          else sumInsured = entry.SumInsured;
          /*obj['SumInsured'] = sumInsured
          obj['ItemValue'] = sumInsured
          obj['RiskId'] = "1"
          obj['SerialNo']="856757"*/
          let data = {
            "ItemId": entry.ItemId,
            "ItemValue": sumInsured,
          "MakeAndModel": entry.MakeAndModel,
          "PurchaseMonth": entry.PurchaseMonth,
          "PurchaseYear": entry.PurchaseYear,
          "RiskId": entry.RiskId,
          "ContentRiskDesc":entry.ContentRiskDesc,
          "SerialNoDesc": entry.SerialNoDesc,
          "SerialNo":"856757",
          "SumInsured":sumInsured
        }
          reqList.push(data)
          i+=1;
          if(i==this.ElectronicItem.length){
            this.finalSaveRiskDetails(reqList,'E');
          }
      }
    }
  }

  onCyberSave(){
    console.log('PPPPPPPPPPPP',this.CyberItem)
    if (this.CyberItem.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.CyberItem){
          let data = {
            "ItemId": entry.ItemId,
            "RiskId": entry.RiskId,
            "ContentRiskDesc":entry.ContentRiskDesc,
            "SerialNoDesc":entry.SerialNoDesc,
            "MakeAndModel":entry.MakeAndModel,
            "ItemValue":entry.ContentRiskDesc,
            "Name":entry.ContentRiskDesc,
            "ManufactureYear": entry.ManufactureYear
          }
          reqList.push(data);
          i+=1;
          if(i==this.CyberItem.length){
            this.finalSaveRiskDetails(reqList,'E');
          }
      }

    }
  }
  onSavePersonalIntermedity()
  {
    if (this.Intermedity.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.Intermedity){
        let salary;
        if(entry.Salary==undefined || entry.Salary==null) salary = null;
        // else if(entry.Salary.includes(',')){ salary = entry.Salary.replace(/,/g, '') }
        else salary = entry.Salary;
          let data = {
              "Dob": entry.Dob,
              "Height": entry.Height,
              "OccupationId": entry.OccupationId,
              "PersonName": entry.PersonName,
              "NationalityId": entry.NationalityId,
              "Salary": salary,
              "Weight": entry.Weight,
              "RiskId": entry.RiskId,
              "SerialNo": entry.SerialNo
          }
          if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }
          reqList.push(data);
          i+=1;
          if(i==this.Intermedity.length){
            this.finalSaveRiskDetails(reqList,'PI');
          }
      }

    }
  }
  finalSaveRiskDetails(reqList,type){
 let ReqObj;let urlLink;
    let sectionId=null;
    if(type=='MA'){sectionId='41';}
    if(type=='C')
    {
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "47",
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='A' && this.productId!='39')
    {
      console.log('AAAAAAAAA')
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "3",
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='MA'){
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "41",
       "Type":'MB',
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='EA' && (this.productId=='5' || this.productId=='29'))
    {
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "99999",
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='E' && this.productId!='42' && this.productId!='25')
    {
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId": "41",
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='E' && this.productId=='42')
    {
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId":this.cyberSectionId,
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='E' && this.productId=='25')
    {
      ReqObj = {
        "CreatedBy": this.loginId,
      "QuoteNo":sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo":this.quoteRefNo,
      "SectionId":'39',
       "Type":type,
       "ContentRiskDetails":reqList
      }
      urlLink = `${this.motorApiUrl}api/savecontentrisk`;
    }
    if(type=='PI')
    {
      ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": "36",
        "Description": "Accident Details",
         "Type":type,
         "PersonalDetails":reqList

      }
      urlLink = `${this.motorApiUrl}api/savepersonalaccident`;
    }

    if(type=='PA')
    {
      ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "RequestReferenceNo": this.quoteRefNo,
        "SectionId": "35",
        "Description": "Accident Details",
         "Type":type,
         "PersonalDetails":reqList

      }
      urlLink = `${this.motorApiUrl}api/savepersonalaccident`;
    }


  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res: any = data;
      if (data.ErrorMessage.length != 0) {
        if (res.ErrorMessage) {
          // for(let entry of res.ErrorMessage){
          //   let type: NbComponentStatus = 'danger';
          //   const config = {
          //     status: type,
          //     destroyByClick: true,
          //     duration: 4000,
          //     hasIcon: true,
          //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //     preventDuplicates: false,
          //   };
          //   this.toastrService.show(
          //     entry.Field,
          //     entry.Message,
          //     config);
          // }
        }
      }
      else {
        console.log('First Fields');
          // this.toastrService.show(
          //   'Building Details',
          //   'Building Details Inserted/Updated Successfully',
          //   config)
          if(type=='C'){
            if (this.second || this.third || this.fifth || this.six || this.nine) {
              this.fourth = true;
              this.selectedTab = this.selectedTab+1;
              if(this.third){
                this.getallriskDetails();
              }
              console.log('Second Fields');
            
            }
            else{
              if(this.productId=='19' && this.seven){
                this.fourth = true;
                this.selectedTab = this.selectedTab+1;
              }
              else this.checkValidation();
            }
          }
          else if(type=='PA'){
            if (this.third || this.fifth || this.six) {
              this.fourth = true;
              this.selectedTab = this.selectedTab+1;
            }
            else{
              this.checkValidation();
            }
          }
          else if(type=='A'){
            if (this.fifth) {
              this.fourth = true;
              this.selectedTab = this.selectedTab+1;
            }
            else if(this.nine){
              this.selectedTab = this.selectedTab+1;
            }
            else{
              this.checkValidation();
            }
          }
          else if(type=='MA' || type=='PI' || type=='E' || type=='EA') this.checkValidation();

      }

    },
    (err) => { },
  );
  }
  onSaveAllRisk(){
    if (this.risk.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.risk){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.ItemId,
              "RiskId":entry.RiskId,
              "ContentRiskDesc":entry.ContentRiskDesc,
              "SerialNoDesc": entry.SerialNoDesc,
              "MakeAndModel":"TN123",
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":sumInsured
          }
          /*if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }*/
          reqList.push(data)
          i+=1;
          if(i==this.risk.length)  this.finalSaveRiskDetails(reqList,'A');
          // reqList.push(data);
          // i+=1;
          // if(i==this.Cotentrisk.length){
          //   this.finalSaveRiskDetails(reqList,'C');
          // }
      }

    }
  }
  onSaveAccessories(){
    if (this.accessoriesList.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.accessoriesList){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
            "ItemId":entry.ItemId,
            "RiskId":entry.RiskId,
            "ContentRiskDesc":entry.ContentRiskDesc,
            "SerialNoDesc": entry.SerialNoDesc,
            "MakeAndModel":"TN123",
            "SerialNo":"155685",
            "ItemValue":"26534556",
            "SumInsured":sumInsured
          }
          reqList.push(data);
          i+=1;
          if(i==this.accessoriesList.length){
            this.finalSaveRiskDetails(reqList,'EA');
          }
      }

    }
  }

  onSaveContentRisk(){
    if (this.Cotentrisk.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.Cotentrisk){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.ItemId,
              "RiskId":entry.RiskId,
              "ContentRiskDesc":entry.ContentRiskDesc,
              "SerialNoDesc": entry.SerialNoDesc,
              "MakeAndModel":"TN123",
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":sumInsured
          }
          /*if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }*/
          reqList.push(data);
          i+=1;
          if(i==this.Cotentrisk.length){
            this.finalSaveRiskDetails(reqList,'C');
          }
      }

    }
  }
  onSaveMachineryRisk(){
    if (this.machineries.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.machineries){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.ItemId,
              "RiskId":entry.RiskId,
              "ContentRiskDesc":entry.ContentRiskDesc,
              "SerialNoDesc": entry.SerialNoDesc,
              "MakeAndModel":"TN123",
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":sumInsured,
              "Name":entry.Name,
              "Brand":entry.Brand
          }
          /*if(data.Dob!=null){
              data.Dob = this.datePipe.transform(data.Dob, "dd/MM/yyyy")
          }*/
          reqList.push(data);
          i+=1;
          if(i==this.machineries.length){
            this.finalSaveRiskDetails(reqList,'MA');
          }
      }

    }
  }
  // onSaveAllRisk(){
  //   if (this.risk.length != 0) {
  //     let i=0, reqList =[];
  //     for(let entry of this.risk){
  //         let obj = entry;
  //         let sumInsured;
  //         if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
  //         // else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
  //         else sumInsured = entry.SumInsured;
  //         obj['SumInsured'] = sumInsured
  //         reqList.push(obj)
  //         i+=1;
  //         if(i==this.risk.length)  this.finalSaveRiskDetails(reqList,'A');
  //       }
  //     }
  // }

  finalSavecontentDetails(reqList,type){
    let ReqObj = {
      "CreatedBy": this.loginId,
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "RequestReferenceNo": this.quoteRefNo,
      "SectionId": "36",
      "Description": "Accident Details",
       "Type":type,
       "PersonalDetails":reqList

    }
    let urlLink = `${this.motorApiUrl}api/savecontentrisk`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res: any = data;
      if (data.ErrorMessage.length != 0) {
        if (res.ErrorMessage) {

        }
      }
      else {
        // let type: NbComponentStatus = 'success';
        // const config = {
        //   status: type,
        //   destroyByClick: true,
        //   duration: 4000,
        //   hasIcon: true,
        //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
        //   preventDuplicates: false,
        // };
          if (this.third) {
            this.fourth = true;
            this.selectedTab = 2;
          }
      }

    },
    (err) => { },
  );
  }
  saveBuildingDetails(ReqObj,type) {
    let urlLink = `${this.motorApiUrl}api/buildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {

          }
        }
        else {
          // let type: NbComponentStatus = 'success';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };


          if (data.Result) {
            console.log('PPPPPPPPP',data.Result);
            console.log('SSSSSSSSSSSS',type);
            //this.first=true;
            if(type=='Content Risk'){
              this.fourth = true;
              this.getContentDetails();
              this.selectedTab = 1;
            }
            else if(type=='Personal Accident'){
              this.fourth = true;
              this.getPersonalAccidentDetails();
            }
            else if(type=='All Risk'){
              this.fourth = true;this.getallriskDetails();
            }
            else if(type=='Personal Indemenity'){
              this.fourth = true;this.getPersonalIntermediaryDetails();
            }
            else if(type=='ElectricalEquipment'){
              this.fourth = true;this.getElectronicEquipment();
            }
            else if(type== 'Machinery Breakdown'){
              this.nine =true;
              this.getMachineryRisk();
              }
            else if (this.first||this.second || this.third || this.fifth || this.six || this.seven || this.eight || this.nine) {
              this.fourth = true;
              if(this.first){
                this.getContentDetails();
              }
              else if(this.second){
                this.getPersonalAccidentDetails();
              }
              else if(this.third){
                this.getallriskDetails();
              }
              else if(this.fifth){
                this.getPersonalIntermediaryDetails();
              }
              else if(this.six){
                this.getElectronicEquipment();
                }
                else if(this.nine){
                  this.getMachineryRisk();
                  }
              this.selectedTab = 1;
            }
            else if(this.productId=='42') this.selectedTab = 1;
            else{
              this.checkValidation();
            }
          }
        }

      },
      (err) => { },
    );
  }
  onAccsSave(){

  }
  onContentSave() {
    {
      let ReqObj = {
        "CreatedBy": this.loginId,
        "QuoteNo": "12345",
        "RequestReferenceNo": this.quoteRefNo,
        "RiskId": "1",
        "SectionId": this.SectionId,
        "Type": "C",
        "ContentRiskDetails": this.Cotentrisk
      }

      let urlLink = `${this.motorApiUrl}api/savecontentrisk`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          let res: any = data;
          if (data.ErrorMessage.length != 0) {
            if (res.ErrorMessage) {

            }
          }
          else {
            // let type: NbComponentStatus = 'success';
            // const config = {
            //   status: type,
            //   destroyByClick: true,
            //   duration: 4000,
            //   hasIcon: true,
            //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //   preventDuplicates: false,
            // };
            // this.toastrService.show(
            //   'Content Details',
            //   'Content Details Inserted/Updated Successfully',
            //   config)

            if (data.Result) {
              this.quote = data.Result.RequestReferenceNo;
            }

            this.checkValidation();
            

          }

        },
        (err) => { },
      );
    }
  }
  getbuilding() {
    let urlLink = `${this.motorApiUrl}api/getallbuildingdetails`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
    }
    console.log('SSSSSSSSSS', this.quote)
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (res.Result.length != 0) {
          if(this.endorsementSection){
            console.log('Enable Building Suminsureds',this.enableFieldsList);
            //this.buildingSection = !this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
            this.buildingSection = this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
          }
          else this.buildingSection = false;
          //else this.buildingSection = false;
          this.building = res.Result;
          let i=0;
          for(let entry of this.building){
            if (i == 0) {
              this.LocationList = [];
            }
            this.LocationList.push({ "Code": String(this.LocationList.length+1), "CodeDesc": entry.LocationName })
            i+=1;
          }

          if(this.first || this.second || this.fifth || this.ten || this.third || this.nine || this.seven || this.eight || this.six){
            if(this.LocationList.length !=0){
              for (let j = 0; j < this.LocationList.length; j++) {
                this.LocationList[j].label = this.LocationList[j]['CodeDesc'];
                this.LocationList[j].value = this.LocationList[j]['Code'];
                delete this.LocationList[j].CodeDesc;
                if (j == this.LocationList.length - 1) {
                  if(this.first){
                    this.fieldsContent[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.six){
                    this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.second){
                    this.fieldsPersonalAccident[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.fifth){
                    this.fieldsPersonalInd[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.ten){
                    this.fieldsDevice[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.third){
                    this.fieldsRisk[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.nine){
                    this.fieldsMachinery[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.LocationList;
                  }
                  if(this.seven){
                    this.fieldsEmpFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                  }
                  if(this.eight){
                    this.fieldFEFields[0].fieldGroup[0].fieldGroup[0].fieldGroup[7].props.options = this.LocationList;
                  }
                }
              }
            }
          }
   
       
          this.fourth = true;
          this.getTotalSICost('building');
        }
        else {
          // this.building = [
          //   {
          //     "BuildingAddress": null,
          //     "BuildingBuildYear": null,
          //     "BuildingFloors": null,
          //     "InbuildConstructType": null,
          //     "BuildingSuminsured": null,
          //     "RiskId": null,
          //     SectionId: "1"
          //   }
          // ]
        }
        if(this.first){
          this.getdropList();
          this.getContentDetails();
        }
        else if(this.second){
          this.getPersonalAccidentDetails();
        }
        else if(this.third){
          this.getallriskDetails();
        }
        else if(this.fifth){
          this.getPersonalIntermediaryDetails();
        }
        else if(this.six){
          this.getElectronicEquipment();
          }
          else if(this.nine){
            this.getMachineryRisk();
            }
      })
  }
  onSIValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  onSerialNoChange(type){
    if(type=='content' || type=='machinery' || type=='accessories'){
      if(this.serialNoDesc){
        let value = this.serialNoDesc.replace(/[^a-z0-9_/-]/gi, "");
        this.serialNoDesc = value;
      }
    }
    // if(type=='allRisk'){
    //   let entry = this.risk[index];
    //   if(entry.SerialNoDesc){
    //     let value = entry.SerialNoDesc.replace(/[^a-z0-9_/-]/gi, "");
    //     this.risk[index]['SerialNoDesc'] = value;
    //   }
    // }
  }
  onContentRiskDescChange(type){
    if(type=='content'){
      let entry = this.contentRiskDesc;
      if(this.contentRiskDesc){
        let value = this.contentRiskDesc.replace(/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/gi, "");
        this.contentRiskDesc = value;
      }
    }
    // if(type=='allRisk'){
    //   let entry = this.risk[index];
    //   if(entry.ContentRiskDesc){
    //     let value = entry.ContentRiskDesc.replace(/[^a-z0-9_/-]/gi, "");
    //     this.risk[index]['ContentRiskDesc'] = value;
    //   }
    // }
  }
  getLocationName(Id){
    // console.log('IIIIIIIIIII',Id)
    // console.log('NNNNNNNNNN',this.LocationList)
    let entry = this.LocationList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
      //return entry.CodeDesc;
    }
  }

  getElectronicName(Id){
    // console.log('IIIIIIIIIII',Id)
    // console.log('NNNNNNNNNN',this.LocationList)
    let entry = this.ElectronicList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
      //return entry.CodeDesc;
    }
  }

  getAssName(Id){
    let entry = this.ChassisList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
    }
  }
  getDeviceName(Id){
    let entry = this.CyperList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.label;
      //return entry.CodeDesc;
    }
  }
  getContentName(rowData){
    let entry = this.dropList.find(ele=>ele.Code==rowData.ItemId);
    if(entry) return entry.label;
    else return '';
  }
  getContentssName(ItemId){
    let entry = this.allriskList.find(ele=>ele.Code==ItemId);
    if(entry) return entry.label;
    else return '';
  }
  getAssCont(ItemId){
    let entry = this.AccLists.find(ele=>ele.Code==ItemId);
    if(entry) return entry.label;
    else return '';
  }


  getContentsName(rowData){
    let entry = this.allriskList.find(ele=>ele.Code==rowData.ItemId);
    if(entry) return entry.CodeDesc;
    else return '';
  }
  CommaFormatted(index,type) {
    if(type=='building'){
          let entry = this.building[index];
          console.log("Entry Came")
          if(entry.BuildingSuminsured){
            console.log("Entry Came 2")
            let value = entry.BuildingSuminsured.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.building[index]['BuildingSuminsured'] = value;
            this.getTotalSICost('building');
          }
    }
    if(type=='content'){
      let entry = this.Cotentrisk[index];
      if(entry.SumInsured){
        let value = entry.SumInsured.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.Cotentrisk[index]['SumInsured'] = value;
        this.getTotalSICost('content');
      }
    }
    if(type=='allRisk'){
      let entry = this.risk[index];
      if(entry.SumInsured){
        let value = entry.SumInsured.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.risk[index]['SumInsured'] = value;
        this.getTotalSICost('AllRisk');
      }
    }
    if(type=='personalInt'){
      let entry = this.Intermedity[index];
      if(entry.Salary){
        let value = entry.Salary.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.Intermedity[index]['Salary'] = value;
        this.getTotalSICost('personalInt');
      }
    }
    if(type=='ElectricalEquipment'){
      let entry = this.ElectronicItem[index];
      if(entry.SumInsured){
        let value = entry.SumInsured.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.ElectronicItem[index]['SumInsured'] = value;
        this.getTotalSICost('ElectricalEquipment');
      }
    }
    if(type=='personalAccident'){
      let entry = this.PersonalAssistantList[index];
      console.log("Entry Received",entry)
      if(entry.Salary){
        let value = entry.Salary.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.PersonalAssistantList[index]['Salary'] = value;
        this.getTotalSICost('PersonalAccident');
      }
    }
    if(type=='personalIndemenity'){
      let entry = this.Intermedity[index];
      if(entry.Salary){
        let value = entry.Salary.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.Intermedity[index]['Salary'] = value;
        this.getTotalSICost('PersonalIndemenity');
      }
    }
  }
  individualCommaFormatted(type){
      if(type=='building'){
        let entry = this.productItem.BuildingSumInsureds;
        console.log("Entry Came",entry)
          this.building[this.currentBuildingIndex]['BuildingSuminsured'] = entry;
          this.productItem.BuildingSumInsureds= entry;
          console.log("Entry Came 2",this.productItem.BuildingSumInsureds);
          this.getTotalSICost('building');
      }
      if(type=='content'){
        let entry = this.productItem.ContentSI
        if(this.productItem.ContentSI){
          // let value = this.contentSI.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.Cotentrisk[this.currentContentIndex]['SumInsured'] = entry;
          this.productItem.ContentSI = entry;
          this.getTotalSICost('content');
        }
      }

      if(type=='PersonalAccident'){
        let entry = this.productItem.AccSI;
        console.log("Entry Came Personal Accident",entry)
          // let value = entry.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = entry;
          this.productItem.AccSI= entry;
          console.log("Entry Came 2",this.productItem.AccSI);
          this.getTotalSICost('PersonalAccident');
        // let entry = this.productItem.AccSI
        // if(entry){
        //   this.PersonalAssistantList[this.currentPersonalAccidentIndex]['Salary'] = entry;
        //   this.productItem.AccSI = entry;
        //   console.log('jjjjjjjjjjjj',this.productItem.AccSI);
        //   this.getTotalSICost('PersonalAccident');
        // }
      }
      if(type=='PersonalInd'){
        let entry = this.productItem.IndSI
        if(entry){
          // let value = this.contentSI.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.Intermedity[this.currentPersonalIndIndex]['Salary'] = entry;
          this.productItem.IndSI = entry;
          this.getTotalSICost('PersonalIndemenity');
        }
      }
      
      
      if(type=='employee'){
        let entry = this.productItem.EmpsSI;
        console.log("Entry Came",entry)
        this.employeeList[this.currentEmployeeIndex]['Salary'] = entry;
          this.productItem.EmpsSI= entry;
          console.log("Entry Came 2",this.productItem.EmpsSI);
          this.getTotalSICost('Employee');
        // let entry = this.productItem.EmpsSI;
        // if(entry){
        //   this.employeeList[this.currentEmployeeIndex]['SumInsured'] = entry;
        //   this.productItem.EmpsSI = entry;
        //   this.getTotalSICost('Employee');
        // }
        // if(this.employeeSalary){
        //   if(this.employeeSalary.includes('.')) this.employeeSalary = this.employeeSalary.split('.')[0];
        //   let value = this.employeeSalary.replace(/\D/g, "")
        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //   this.employeeList[this.currentEmployeeIndex]['Salary'] = value.replace(/,/g, '');
        //   this.employeeSalary = value;
        //   this.getTotalSICost('Employee');
        // }
      }
      if(type=='fidelity'){
        let entry = this.productItem.fdSI;
        if(entry){
          this.fidelityList[this.currentFidelityIndex]['Salary'] = entry;
          this.productItem.fdSI = entry;
          this.getTotalSICost('Fidelity');
        }
        // let entry = this.employeeSalary;
        // if(this.employeeSalary){
        //   if(this.employeeSalary.includes('.')) this.employeeSalary = this.employeeSalary.split('.')[0];
        //   let value = this.employeeSalary.replace(/\D/g, "")
        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //   this.fidelityList[this.currentFidelityIndex]['Salary'] = value.replace(/,/g, '');
        //   this.employeeSalary = value;
        //   this.getTotalSICost('Fidelity');
        // }
      }
      if(type=='machinery'){
        let entry = this.productItem.MSI;//this.MiSumInsured;
        if(entry){
          this.machineries[this.currentMachineryIndex]['SumInsured'] = entry;
          this.productItem.MSI = entry;
          this.getTotalSICost('Machinery');
          // if(this.MiSumInsured.includes('.')) this.MiSumInsured = this.MiSumInsured.split('.')[0];
          // let value = this.MiSumInsured.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          // this.machineries[this.currentMachineryIndex]['SumInsured'] = value.replace(/,/g, '');
          // this.MiSumInsured = value;
        }
      }
      if(type=='accessories'){
        let entry = this.productItem.AccessoriesSI;
        if(entry){
          //if(this.SumInsured.includes('.')) this.SumInsured = this.SumInsured.split('.')[0];
          // let value = this.SumInsured.replace(/\D/g, "")
          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = entry;
          this.productItem.AccessoriesSI= entry;
          this.getTotalSICost('Accessories');
        }
      }
      if(type=='AllRisk'){
        let entry = this.productItem.RiskSI;
        if(entry){
            // let value = this.contentSI.replace(/\D/g, "")
            // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.risk[this.currentRiskIndex]['SumInsured'] = entry;
            this.productItem.RiskSI = entry;
            this.getTotalSICost('AllRisk');
          
        }
      }
      if(type=='Electronicequip'){
        let entry = this.productItem.ElqSI;
        if(entry){
            // let value = this.contentSI.replace(/\D/g, "")
            // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.ElectronicItem[this.currentElectronicIndex]['SumInsured'] = entry;
            this.productItem.ElqSI = entry;
            this.getTotalSICost('ElectricalEquipment');
          
        }
      }
  }
  getTotalSICost(type){
    if(type=='building'){
      this.totalBuildingSumInsured = 0;
      if(this.building.length!=0){
        for(let build of this.building){
          let SI = build.BuildingSuminsured,entry=0;
          if(SI==undefined || SI=='' || SI ==null) SI = 0;
          // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
          else entry = SI
          this.totalBuildingSumInsured = Number(entry)+this.totalBuildingSumInsured
        }
      }
    }
    else if(type=='content'){
        this.totalContentSI = 0;
        if(this.Cotentrisk.length!=0){
          for(let content of this.Cotentrisk){
            console.log('Contentsss SumInsured',content.SumInsured);
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            //else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalContentSI = Number(entry)+this.totalContentSI
            console.log('PPPPPPPPPP',this.totalContentSI);

          }
        }
    }
    else if(type=='AllRisk'){
      this.totalAllRiskSI = 0;
        if(this.risk.length!=0){
          for(let content of this.risk){
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalAllRiskSI = Number(entry)+this.totalAllRiskSI
          }
        }
    }
    // else if(type=='personalInt'){
    //   this.totalPersIntSI = 0;
    //     if(this.Intermedity.length!=0){
    //       for(let content of this.Intermedity){
    //         let SI = content.Salary,entry=0;
    //         if(SI==undefined || SI=='' || SI ==null) SI = 0;
    //         //else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
    //         else entry = SI
    //         this.totalPersIntSI = Number(entry)+this.totalPersIntSI
    //       }
    //     }
    // }
    else if(type=='ElectricalEquipment'){
      this.totalElectrIntSI = 0;
        if(this.ElectronicItem.length!=0){
          for(let content of this.ElectronicItem){
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalElectrIntSI = Number(entry)+this.totalElectrIntSI
          }
        }
    }
    else if(type=='PersonalAccident'){
      this.totalPASI = 0;
        if(this.PersonalAssistantList.length!=0){
          for(let content of this.PersonalAssistantList){
            console.log('IIIIIIII',content.Salary);
            let SI = content.Salary,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalPASI = Number(entry)+this.totalPASI
          }
        }
    }
    else if(type=='PersonalIndemenity'){
      this.totalPersIntSI = 0;
        if(this.Intermedity.length!=0){
          for(let content of this.Intermedity){
            let SI = content.Salary,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalPersIntSI = Number(entry)+this.totalPersIntSI
          }
        }
    }
    else if(type=='Employee'){
      this.totalEmpIntSI = 0;
        if(this.employeeList.length!=0){
          for(let emp of this.employeeList){
            let SI = emp.Salary,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalEmpIntSI = Number(entry)+this.totalEmpIntSI;
            if(this.totalEmpIntSI > this.actualEmployeeSI){
              
            }
          }
        }
    }
    else if(type=='Fidelity'){
      this.totalFidelityIntSI = 0;
        if(this.fidelityList.length!=0){
          for(let emp of this.fidelityList){
            let SI = emp.Salary,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalFidelityIntSI = Number(entry)+this.totalFidelityIntSI
          }
        }
    }
    else if(type=='Machinery'){
      this.totalMachinerySI = 0;
        if(this.machineries.length!=0){
          for(let emp of this.machineries){
            let SI = emp.SumInsured,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalMachinerySI = Number(entry)+this.totalMachinerySI
          }
        }
    }
    else if(type=='Accessories'){
      this.totalAccessoriesSI = 0;
        if(this.accessoriesList.length!=0){
          for(let emp of this.accessoriesList){
            let SI = emp.SumInsured,entry=0;
            //if(emp?.EmployeeId) delete emp['EmployeeId'];
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            // else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalAccessoriesSI = Number(entry)+this.totalAccessoriesSI
          }
        }
    }
  }

  getAccessories(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": "99999"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
           if(res.Result.ContentRiskDetails.length!=0){
            if(this.endorsementSection){
              console.log('Acessories Section',this.enableFieldsList)
              this.accessoriesSection = !this.enableFieldsList.some(ele=>ele=='AccessoriesSuminsured');
            }
            //else this.contentRiskSection = true;
            else this.accessoriesSection = true;
             this.accessoriesList= res.Result.ContentRiskDetails;
             console.log('Get details of Accessories', this.accessoriesList);
             this.getTotalSICost('Accessories');
           }
           else{
        
           }
          }
       
        }
      })
  }
  getContentDetails(){
    let sectionId=null;
    if(this.productId=='19') sectionId = '47';
    else sectionId = '47';
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": sectionId
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
           if(res.Result.ContentRiskDetails.length!=0){
            if(this.endorsementSection){
              this.contentRiskSection = !this.enableFieldsList.some(ele=>ele=='ContentSuminsured');
            }
            else this.contentRiskSection = true;
             this.Cotentrisk = res.Result.ContentRiskDetails;
             console.log('Get details',this.Cotentrisk);
             this.getTotalSICost('content');
           }
           else{
            // this.Cotentrisk = [{
            //   "ItemId":null,
            //   "RiskId":null,
            //   "MakeAndModel":null,
            //   "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //   "SerialNo":null,
            //   "ItemValue":null,
            //   "SumInsured":null,
            // }]
           }
          }
          else {
            // this.Cotentrisk = [{
            //   "ItemId":null,
            //   "RiskId":null,
            //   "MakeAndModel":null,
            //   "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //   "SerialNo":null,
            //   "ItemValue":null,
            //   "SumInsured":null,
            // }]
          }
        }
        else {
          // this.Cotentrisk = [{
          //   "ItemId":null,
          //   "RiskId":null,
          //   "MakeAndModel":null,
          //   "ContentRiskDesc":null,
          //   "SerialNoDesc": null,
          //   "SerialNo":null,
          //   "ItemValue":null,
          //   "SumInsured":null,
          // }]
        }
        if(this.second){
          this.getPersonalAccidentDetails();
          
        }
        else if(this.third){
          this.getallriskDetails();
        }
        else if(this.fifth){
          this.getPersonalIntermediaryDetails();
        }
        else if(this.six){
          this.getElectronicEquipment();
        }
        // else if(this.nine){
        //   this.getMachineryRisk();
        // }

      })
  }
  onUploadEmployeeSection(){
    this.currentEmployeeIndex = null;this.enableEmployeeEditSection = false;
    this.enableEmployeeUploadSection = true;
    this.showEmpRecordsSection = false;
    this.uploadDocList=[];
    this.employeeUploadRecords = [];
    this.uploadStatus = null;
  }
  onUploadFidelitySection(){
    this.currentFidelityIndex = null;this.enableFidelityEditSection = false;
    this.enableFidelityUploadSection = true;
    this.showFidelityRecordsSection = false;
    this.uploadDocList=[];
    this.employeeUploadRecords = [];
    this.uploadStatus = null;
  }
  onUploadDocuments(target:any,fileType:any,type:any,uploadType:any){
    console.log("Event ",target);
    this.imageUrl = null;this.uploadDocList=[];
    let event:any = null;
    if(uploadType=='drag') event = target
    else event = target.target.files;

    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': element,'DocTypeId':'','filename':element.name, 'JsonString': {} });

        }

    }
    console.log("Final File List",this.uploadDocList)
  }


  onsubmitemployee(){
    if(this.totalEmpIntSI > this.actualEmployeeSI){
      Swal.fire({
        title: '<strong>Error</strong>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           <li>Entered Salary Amount Greater than Actual Total Salary</li>
       </ul>`,
        showCloseButton: false,
        //focusConfirm: false,
        // showCancelButton:true,

       //confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'Ok',
      })
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //         this.onProceedUpload('Merge')
      //   }
      //   else{
      //     this.onProceedUpload('Add')
      //   }
      // })
    }
    else{
      this.editEmployeeSection = false;this.enableEmployeeEditSection = false;this.currentEmployeeIndex=null;
      this.productItem=new ProductData();
    }
  }
  onsubmitAccessories(){
    if(this.totalAccessoriesSI > this.actualAssSI){
      Swal.fire({
        title: '<strong>Error</strong>',
        icon: 'info',
        html:
          `<ul class="list-group errorlist">
           <li>Entered SumInsured Amount Greater than Actual Total SumInsured</li>
       </ul>`,
        showCloseButton: false,
        //focusConfirm: false,
        // showCancelButton:true,

       //confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'Ok',
      })
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //         this.onProceedUpload('Merge')
      //   }
      //   else{
      //     this.onProceedUpload('Add')
      //   }
      // })
    }
    // else{
    //   this.editEmployeeSection = false;this.enableEmployeeEditSection = false;this.currentEmployeeIndex=null;
    //   this.productItem=new ProductData();
    // }
  }
  
  onUploadEmployeeDetails(){
      if(this.uploadDocList.length!=0 && this.employeeList.length!=0 || this.fidelityList.length!=0){
        Swal.fire({
          title: '<strong>Merge / Replace Records</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
             <li>Some Employee Details You Already Stored</li>
             <li>Do You Want to Clear Old Records?</li>
         </ul>`,
          showCloseButton: false,
          //focusConfirm: false,
          showCancelButton:true,

         //confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Merge With Old Records',
         cancelButtonText: 'Clear Old Records',
        }).then((result) => {
          if (result.isConfirmed) {
                this.onProceedUpload('Merge')
          }
          else{
            this.onProceedUpload('Add')
          }
        })
      }
      else{
        this.onProceedUpload('Add');
      }
  }
  onProceedUpload(type){
    let typeId=null;
    if(this.productId=='32') typeId = '104';
    else if(this.productId=='14') typeId='102';
    else if(this.productId=='15') typeId='103';
    let SectionId = null;
    if(this.productId=='14' || this.productId=='19') SectionId = '45';
    if(this.productId=='32') SectionId = '43';
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "QuoteNo":this.quoteNo,
      "RiskId":"1",
      "RequestReferenceNo":this.quoteRefNo,
      "TypeId":typeId,
      "LoginId":this.loginId,
      "SectionId":SectionId,
      "UploadType": type,
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/batch/upload`;
        this.sharedService.onPostExcelDocumentMethodSync(urlLink, ReqObj,this.uploadDocList[0].url).subscribe(
          (data: any) => {
              if(data){
                let res = data;
                if(res?.ProgressStatus=='P'){
                  this.checkUploadStatus();
                }
              }
          },  
          (err) => { },
        );
  }
  checkUploadStatus(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/get/transaction/status`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res.Status=='S'){
                      this.getValidRecordDetails();
                }
                else if(res.Status=='E'){
                  this.uploadStatus = 'Upload Failed..Please Try Again...'
                  setTimeout(() => 
                  {
                    this.uploadDocList = [];
                    if(this.productId!='32'){
                      this.enableEmployeeUploadSection = true;
                      this.uploadStatus = null;
                      this.enableEmployeeEditSection = false;
                    }
                    else if(this.productId == '32'){
                      this.enableFidelityUploadSection = true;
                      this.uploadStatus =null;
                      this.enableFidelityEditSection = false;
                    }
                  
                }, (4*1000));
                }
                else{
                  this.uploadStatus = res?.StatusDesc;
                  setTimeout(() => this.checkUploadStatus(), (2*1000));
                }
              }
            },  
            (err) => { },
          );
  }
  updateEmployeeRecordsTable(){
    let ReqObj = {
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo,
      "QuoteNo": this.quoteNo,
      "RiskId": "1",
      "Status": "Y"
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/insert/records`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                  if(this.productId!='32'){
                    this.enableEmployeeUploadSection = false;
                    this.enableEmployeeEditSection = false;
                  }
                  else if(this.productId=='32'){
                    this.enableFidelityEditSection = false;
                    this.enableFidelityUploadSection = false;
                  }
             
                  this.errorRecords = [];this.uploadStatus=null;
                  this.getEmployeeDetails();
                }
              }
          },  
          (err) => { },
        );
  }
  getValidRecordDetails(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/getUploadTransaction`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                  if(this.productId!=32){
                    this.employeeUploadRecords = [res];
                    this.showEmpRecordsSection = true;
                  }
                  else if(this.productId == 32){
                    this.employeeUploadRecords = [res];
                    this.showFidelityRecordsSection=true;
                  }
               
                  if(res?.ErrorRecords!=null && res?.ErrorRecords!='0') this.getErrorRecords();
                  else this.errorRecords = [];
                }
              }
            },  
            (err) => { },
          );
  }
  getErrorRecords(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.quoteRefNo,
      "QuoteNo":this.quoteNo,
      "RiskId":"1",
      "Status": 'E'
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/get/recordsByStatus`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                    this.errorRecords = data.Result;
                    console.log('OOOOOOOO',this.errorRecords);
                }
              }
          },
          (err) => { },
          ); 
  }
  onEditEmployeeError(rowData,modal,type){
    this.enableType= type;
    console.log('OOOOOOOOOOOO',rowData);
    this.errorRowNum = rowData?.RowNum;
    this.empLocation = rowData?.RiskId;
    this.employeeName = rowData?.EmployeeName;
    console.log('SSSSSSSSSS',rowData?.EmployeeName);
    this.occupationType = rowData?.OccupationId;
    this.nationality = rowData?.NationalityId;
    if(rowData.DateOfBirth){
      var dateParts = rowData.DateOfBirth.split("/");
      // month is 0-based, that's why we need dataParts[1] - 1
      this.empDob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0]; 
    }
    else this.empDob = null;
    this.empJoiningDate = rowData.DateOfJoiningYear;
    this.empJoiningMonth = rowData.DateOfJoiningMonth;
    this.employeeSalary = rowData.Salary;
      this.open(modal);
  }
  onSaveErrorRecordDetails(modal){
    this.employeeErrorList = [];
    this.employeeNameError = false;this.employeeOccupationError = false;this.employeeAddressError=false;
    this.employeeNationalityError = false;this.employeeDobError = false;this.employeeDojError = false;
    this.employeeSalaryError = false;let i=0;
    if(this.employeeName=='' || this.employeeName==null || this.employeeName == undefined){i+=1;this.employeeNameError=true};
    if(this.occupationType=='' || this.occupationType==null || this.occupationType == undefined){i+=1;this.employeeOccupationError=true};
    if(this.nationality=='' || this.nationality==null || this.nationality == undefined){i+=1;this.employeeNationalityError=true};
    if(this.empDob=='' || this.empDob==null || this.empDob == undefined){i+=1;this.employeeDobError=true};
    if(this.empJoiningDate=='' || this.empJoiningDate==null || this.empJoiningDate == undefined){i+=1;this.employeeDojError=true};
    if(this.employeeSalary=='' || this.employeeSalary==null || this.employeeSalary == undefined){i+=1;this.employeeSalaryError=true};
    if(i==0){
      let salary = '';
      if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
      else salary = this.employeeSalary;
      let ReqObj = {
        
          "ProductId": this.productId,
          "RequestRefNo": this.quoteRefNo,
          "QuoteNo": this.quoteNo,
          "CompanyId": this.insuranceId,
          "RiskId": this.empLocation,
          "Salary": salary,
          "DateOfBirth": this.datePipe.transform(this.empDob, "dd/MM/yyyy"),
          "NationalityId": this.nationality,
          "EmployeeName": this.employeeName,
          "DateOfJoiningYear": this.empJoiningDate,
          "DateOfJoiningMonth": this.empJoiningMonth,
          "OccupationDesc": this.occupationList.find(ele=>ele.Code==this.occupationType).CodeDesc,
          "OccupationId": this.occupationType,
          "RowNum": this.errorRowNum
      }
      let urlLink = `${this.UploadUrl}eway/vehicle/update/records`
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data){
              let res = data?.Result;
              if(data?.Message=='SUCCESS'){
                this.employeeErrorList =[];
                modal.dismiss('Cross click');
                //this.modalClose.nativeElement.click();
                this.getValidRecordDetails();
              }
              else{
                if(res.length!=0){this.employeeErrorList = res;}
              }
            }
        },
        (err) => { },
        ); 
    }
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getMachineryRisk(){
    
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":"41"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
            if(res.Result.ContentRiskDetails.length!=0){
              // if(this.endorsementSection){
              //   this.electronicEquipSection = !this.enableFieldsList.some(ele=>ele=='MachineryBreakDown');
              // }
              // else 
              //this.enableMachineryEditSection= true;
              this.machineries = res.Result.ContentRiskDetails;
              console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPP',this.machineries);
              this.getTotalSICost('Machinery');
            }
            else{
            //  this.machineries = [{
            //    "ItemId":null,
            //    "RiskId":null,
            //    "MakeAndModel":null,
            //   //  "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //    "SerialNo":null,
            //    "ItemValue":null,
            //    "SumInsured":null,
            //  }]
            }
           }
         
    }

  else {
    this.machineries= [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      // "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    }
      })
  }
  getElectronicEquipment(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let sectionid:any;
    if(this.productId=='25'){
    sectionid ='39'
    }
    else{
      sectionid = '41'
    }
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":sectionid
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){
          if (res.Result.ContentRiskDetails) {
            if(res.Result.ContentRiskDetails.length!=0){
              if(this.endorsementSection){
                this.electronicEquipSection = !this.enableFieldsList.some(ele=>ele=='ElecEquipSuminsured');
              }
              else this.electronicEquipSection = true;
              this.ElectronicItem = res.Result.ContentRiskDetails;
              this.getTotalSICost('ElectricalEquipment');
            }
            // else{
            //  this.ElectronicItem = [{
            //    "ItemId":null,
            //    "RiskId":null,
            //    "MakeAndModel":null,
            //    "ContentRiskDesc":null,
            //   "SerialNoDesc": null,
            //    "SerialNo":null,
            //    "ItemValue":null,
            //    "SumInsured":null,
            //  }]
            // }
           }
          //  else {
          //    this.ElectronicItem = [{
          //      "ItemId":null,
          //      "RiskId":null,
          //      "MakeAndModel":null,
          //      "ContentRiskDesc":null,
          //     "SerialNoDesc": null,
          //      "SerialNo":null,
          //      "ItemValue":null,
          //      "SumInsured":null,
          //    }]
          //  }
    }

  // else {
  //   this.ElectronicItem = [{
  //     "ItemId":null,
  //     "RiskId":null,
  //     "MakeAndModel":null,
  //     "ContentRiskDesc":null,
  //     "SerialNoDesc": null,
  //     "SerialNo":null,
  //     "ItemValue":null,
  //     "SumInsured":null,
  //   }]
  //   }
      })
  }
  getPersonalAccidentDetails() {
    let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":"35"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){

          if (res.Result.PersonalDetails) {
            let i = 0;this.PersonalAssistantList = [];
            let personalList = res.Result.PersonalDetails;
            if(personalList.length!=0){
              if(this.endorsementSection){
                this.personalAccidentSection = this.enableFieldsList.some(ele=>ele=='PersonalAccidentSuminsured' || ele=='OccupationType');
              }
              else this.personalAccidentSection = true;
              let i=0;
              for(let entry of personalList){
                if(entry.Dob!=null){
                  entry['OccupationId'] = this.accidentOccupationId;
                  entry['OccupationDesc'] = this.accidentOccupation;
                  entry.Dob =  this.onDateFormatInEdit(entry.Dob);
                  
                }
                this.PersonalAssistantList.push(entry);
                this.getTotalSICost('PersonalAccident');
                  //this.CommaFormatted(i,'personalAccident');
                  i+=1;
                  if(i==personalList.length) console.log("Personal Acc",this.PersonalAssistantList);
              }
            }
           
          }
          else {
            // this.PersonalAssistantList = [
            //   {
            //     "Dob": null,
            //     "Height": null,
            //     "OccupationId": this.accidentOccupationId,
            //     "OccupationDesc": this.accidentOccupation,
            //     "NationalityId": null,
            //     "PersonName": null,
            //     "Salary": null,
            //     "Weight": null,
            //     "RiskId": null,
            //     "SerialNo": null
            //   }
            // ]
          }
        }
        else {
          // this.PersonalAssistantList = [
          //   {
          //     "Dob": null,
          //     "Height": null,
          //     "OccupationId": this.accidentOccupationId,
          //     "OccupationDesc": this.accidentOccupation,
          //     "NationalityId": null,
          //     "PersonName": null,
          //     "Salary": null,
          //     "Weight": null,
          //     "RiskId": null,
          //     "SerialNo": null
          //   }
          // ]
        }
        if(this.third){
          this.getallriskDetails();
        }
        else if(this.fifth){
          this.getPersonalIntermediaryDetails();
        }
      })
  }
  getPersonalIntermediaryDetails(){
    let urlLink = `${this.motorApiUrl}api/getallpersonalaccident`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId":"36"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if(res.Result){

          if (res.Result.PersonalDetails) {
            let i = 0;this.Intermedity = [];
            let personalList = res.Result.PersonalDetails;
            if(personalList.length!=0){
              if(this.endorsementSection){
                this.personalIntermeditySection = !this.enableFieldsList.some(ele=>ele=='PersonalIntermediarySuminsured' || ele=='OccupationType');
              }
              else this.personalIntermeditySection = true;
              for(let entry of personalList){
                if(entry.Dob!=null){
                  entry['OccupationDesc'] = this.liabilityOccupation;
                  entry.Dob =  this.onDateFormatInEdit(entry.Dob);
                }
                this.Intermedity.push(entry);
                this.getTotalSICost('PersonalIndemenity');
                  //this.CommaFormatted(i,'personalIndemenity');
                i+=1;
                if(i==this.Intermedity.length) this.getTotalSICost('Intermedity');
              }
            }
            
          }
          else {
            // this.Intermedity = [
            //   {
            //     "Dob": null,
            //     "Height": null,
            //     "OccupationId": this.liabilityOccupationId,
            //     "OccupationDesc": this.liabilityOccupation,
            //     "PersonName": null,
            //     "NationalityId": null,
            //     "Salary": null,
            //     "Weight": null,
            //     "RiskId": null,
            //     "SerialNo": null
            //   }
            // ]
          }
        }
        else {
          this.Intermedity = [
            {
              "Dob": null,
              "Height": null,
              "OccupationId": this.liabilityOccupationId,
              "OccupationDesc": this.liabilityOccupation,
              "NationalityId": null,
              "PersonName": null,
              "Salary": null,
              "Weight": null,
              "RiskId": null,
              "SerialNo": null
            }
          ]
        }
      })
  }
  getallriskDetails(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
        "QuoteNo": sessionStorage.getItem('quoteNo'),
        "SectionId":"3"
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
            let res: any = data;
            if(res.Result){
              if (res.Result.ContentRiskDetails) {
               if(res.Result.ContentRiskDetails.length!=0){
                if(this.endorsementSection){
                  this.allRiskSection = !this.enableFieldsList.some(ele=>ele=='AllriskSumInsured');
                }
                else this.allRiskSection = true;
                 this.risk = res.Result.ContentRiskDetails;
                 console.log('Get pre risk Details',this.risk);
                 this.getTotalSICost('AllRisk');
               }
               else{
                // this.risk=[
                //   {
                // "ItemId":null,
                // "RiskId":null,
                // "MakeAndModel":"TN123",
                // "ContentRiskDesc":null,
                // "SerialNoDesc": null,
                // "SerialNo":"155685",
                // "ItemValue":"26534556",
                // "SumInsured":null,
                //   }
                // ]
               }
              }
              else {
                // this.risk=[
                //   {
                // "ItemId":null,
                // "RiskId":null,
                // "MakeAndModel":"TN123",
                // "ContentRiskDesc":null,
                // "SerialNoDesc": null,
                // "SerialNo":"155685",
                // "ItemValue":"26534556",
                // "SumInsured":null,
                //   }
                // ]
              }
            }
            else {
              // this.risk=[
              //   {
              // "ItemId":null,
              // "RiskId":null,
              // "MakeAndModel":"TN123",
              // "ContentRiskDesc":null,
              // "SerialNoDesc": null,
              // "SerialNo":"155685",
              // "ItemValue":"26534556",
              // "SumInsured":null,
              //   }
              // ]
            }
            if(this.fifth){
              this.getPersonalIntermediaryDetails();
            }
        })
  }

  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }
  getUWDetails() {

  }
  onCalculate() {

  }
  FidelityAdd(){
    let entry = 
      {
        "Address": null,
        "Createdby": this.loginId,
        "EmployeeName": null,
        "EmployeeId":null,
        "InsuranceId": this.insuranceId,
        "OccupationDesc": null,
        "OccupationId": null,
        "DateOfBirth": null,
        "DateOfJoiningYear": null,
        "DateOfJoiningMonth": null,
        "ProductId": this.productId,
        "QuoteNo": this.quoteNo,
        "RequestReferenceNo": this.quoteRefNo,
        "RiskId": "1",
        "Salary": null,
        "NationalityId":null
      }
    this.currentFidelityIndex = this.fidelityList.length;
    this.fidelityList.push(entry);
    this.editFidelitySection = false;this.enableFidelityEditSection = true;
    this.productItem = new ProductData();
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
}
  EmployeeAdd(){
      let entry = 
        {
          "Address": null,
          "Createdby": this.loginId,
          "EmployeeName": null,
          "EmployeeId":null,
          "InsuranceId": this.insuranceId,
          "OccupationDesc": null,
          "OccupationId": null,
          "DateOfBirth": null,
          "DateOfJoiningYear": null,
          "DateOfJoiningMonth": null,
          "ProductId": this.productId,
          "QuoteNo": this.quoteNo,
          "RequestReferenceNo": this.quoteRefNo,
          "RiskId": "1",
          "Salary": null,
          "NationalityId":null
        }
      this.currentEmployeeIndex = this.employeeList.length;
    this.employeeList.push(entry);
    this.editEmployeeSection = false;this.enableEmployeeEditSection = true;
    this.productItem = new ProductData();
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
  }
  ContentAdd() {
    //this.Section=true;
    //this.Cotentrisk.push(rowss);
    this.productItem.ContentDesc=null;
    this.productItem.ContentLocation =null;this.productItem.ContentSI=null;
    this.productItem.ContentSerialNo =null;this.productItem.ContentSuminsured=null;
    this.productItem.ContentType =null;
    let entry = [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    this.currentContentIndex = this.Cotentrisk.length;
    this.Cotentrisk.push(entry);
    this.editContentSection = false;this.enableContentEditSection = true;
    this.LocationId = null;this.serialNoDesc = null;this.contentRiskDesc = null;
    this.contentSI = null;this.contentId = null;
  }
  onEditContent(index){
    this.currentContentIndex = index;
    this.editContentSection = true;
    this.enableContentEditSection = true;
    this.productItem.ContentLocation = this.Cotentrisk[index].RiskId;
    this.productItem.ContentSerialNo = this.Cotentrisk[index].SerialNoDesc;
    this.productItem.ContentDesc = this.Cotentrisk[index].ContentRiskDesc;
    this.productItem.ContentSI = this.Cotentrisk[index].SumInsured;
    this.productItem.ContentType = this.Cotentrisk[index].ItemId;

    // this.LocationId = this.Cotentrisk[index].RiskId;
    // this.serialNoDesc = this.Cotentrisk[index].SerialNoDesc;
    // this.contentRiskDesc = this.Cotentrisk[index].ContentRiskDesc;
    // this.contentSI = this.Cotentrisk[index].SumInsured;this.contentId = this.Cotentrisk[index].ItemId;
    this.individualCommaFormatted('content');
  }
  onEditPersonalAccident(index,rowdata){
    //this.currentPersonalAccidentIndex= index;
    let edit = this.PersonalAssistantList.findIndex(ele=>ele.NationalityId == rowdata.NationalityId && ele.PersonName == rowdata.PersonName);
    this.currentPersonalAccidentIndex= edit;
    this.editPersonalAccidentSection= true;
    this.enablePersonalAccEditSection= true;
    this.productItem.AccidentLocation = rowdata.RiskId;
    this.productItem.AccName = rowdata.PersonName;
    this.productItem.AccOccupation = rowdata.OccupationDesc;
    this.productItem.AccNationID = rowdata.NationalityId;
    this.productItem.AccDob = rowdata.Dob;
    this.productItem.AccSI = rowdata.Salary;
    console.log('NNNNNNN',rowdata.Salary);
    this.individualCommaFormatted('PersonalAccident');
   
  }

  onEditPersonalInd(index,rowdata){
    let edit = this.Intermedity.findIndex(ele=>ele.NationalityId == rowdata.NationalityId && ele.PersonName == rowdata.PersonName);
    this.currentPersonalIndIndex= edit;
    this.editPersonalIndSection= true;
    this.enablePersonalIndEditSection= true;
    this.productItem.IndLocation = rowdata.RiskId;
    this.productItem.IndName = rowdata.PersonName;
    this.productItem.IndOccupation = rowdata.OccupationDesc;
    this.productItem.IndNationID = rowdata.NationalityId;
    this.productItem.IndDob = rowdata.Dob;
    this.individualCommaFormatted('PersonalInd');
    this.productItem.IndSI = rowdata.Salary;
  }

  onElectroncequipment(index,rowdata){
    let edit = this.ElectronicItem.findIndex(ele=>ele.MakeAndModel == rowdata.MakeAndModel);
    this.currentElectronicIndex = edit;
   this.enableElectronicEquipmentSection=true;
    this.editElectronicSection=true;
    this.productItem.ElqLocation = rowdata.RiskId;
   this.productItem.ElqJoin = rowdata.PurchaseMonth;
    this.productItem.ElqPeriod = rowdata.PurchaseYear;
    this.productItem.ElqList = rowdata.ItemId;
    this.productItem.ElqSI = rowdata.SumInsured;
    this.productItem.Elqmake = rowdata.MakeAndModel;
    //this.individualCommaFormatted('PersonalInd');
    //this.productItem.IndSI = rowdata.Salary;
  }
  onEditAllRisk(index){
    this.currentRiskIndex= index;
    this.editRiskSection= true;
    this.enableAllriskEditSection= true;
    this.productItem.RiskLocation = this.risk[index].RiskId;
    this.productItem.RiskSerialNo = this.risk[index].SerialNoDesc;
    this.productItem.RiskDescription = this.risk[index].ContentRiskDesc;
    this.productItem.RiskContentType = this.risk[index].ItemId;
    this.productItem.RiskSI = this.risk[index].SumInsured;
    this.individualCommaFormatted('AllRisk');
  }

  onEditMachinery(index,rowdata){
    let edit = this.machineries.findIndex(ele=>ele.SerialNoDesc == rowdata.SerialNoDesc && ele.Brand == rowdata.Brand);
    console.log('LLLL');
    this.currentMachineryIndex = edit;
    this.enableMachineryEditSection = true;
    this.editMachinerySection=true;
    //this.MachineryLocation 
    this.productItem.MLocation= rowdata.RiskId;
     this.productItem.MSerialNo = rowdata.SerialNoDesc;//this.serialNoDesc
     this.productItem.MDescription = rowdata.ContentRiskDesc; //this.MachineryName // this.MiSumInsured
    this.productItem.MSI = rowdata.SumInsured;//this.machineryItemId = this.machineries[index].ItemId;
    this.productItem.MName = rowdata.Name;//this.NameDesc; //this.BrandName
    this.productItem.MBrand = rowdata.Brand;
    this.productItem.MContentType = rowdata.ItemId;
    this.individualCommaFormatted('machinery');
  }
  onEditAccessories(index,rowdata){
    let edit = this.accessoriesList.findIndex(ele=>ele.SerialNoDesc == rowdata.SerialNoDesc);
    console.log('LLLL',rowdata.ItemId);
    this.currentAccessoriesIndex = edit;
    this.enableAccessoriesEditSection = true;
    this.editAccessoriesSection=true;

    this.productItem.AccessoriesType= rowdata.ItemId;
     this.productItem.AccessoriesSerialNo = rowdata.SerialNoDesc;//this.serialNoDesc
     this.productItem.AccessoriesChassisNo = rowdata.RiskId; //this.MachineryName // this.MiSumInsured
    this.productItem.AccessoriesSI= rowdata.SumInsured;
 //this.machineryItemId = this.machineries[index].ItemId;
    this.individualCommaFormatted('accessories');
  }

  onEditEmployee(index,rowdata){
    //this.currentEmployeeIndex = index;
    let edit = this.employeeList.findIndex(ele=>ele.NationalityId == rowdata.NationalityId && ele.EmployeeName == rowdata.EmployeeName);
    this.currentEmployeeIndex = edit;
    console.log('SSSSSSSSSSSSSSSS',edit);
    this.editEmployeeSection = true;
    this.enableEmployeeEditSection = true;
    console.log('PPPPPPPPP',rowdata);
    this.productItem.EmpsLocation= String(rowdata.RiskId);
    console.log('UUUUUUUU',rowdata.RiskId)//this.employeeList[index] this.empLocation 
    this.productItem.EmpsName=rowdata.EmployeeName;// this.employeeName this.employeeList[index].
    this.productItem.EmpsAddress = rowdata.Address;//this.empAddress 
    this.productItem.EmpsOccupation = rowdata.OccupationId;//this.occupationType 
    this.productItem.EmpsSI= rowdata.Salary;//this.employeeSalary
    this.productItem.EmpsNationality = rowdata.NationalityId;//this.nationality
    var dateParts = rowdata.DateOfBirth.split("/");
    // this.productItem.EmpsDob = this.employeeList[index].DateOfBirth;
    // console.log('NNNNNNNNNNNNN',this.productItem.EmpsDob);
    // month is 0-based, that's why we need dataParts[1] - 1
    this.productItem.EmpsDob  = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
     this.productItem.EmpsPeriod= rowdata.DateOfJoiningYear;//this.empJoiningDate
   this.productItem.EmpsJoin= rowdata.DateOfJoiningMonth;// this.empJoiningMonth 
    this.individualCommaFormatted('employee');
  }
  onEditFidelity(index,rowdata){
    //this.currentFidelityIndex = index;
    let edit = this.fidelityList.findIndex(ele=>ele.NationalityId == rowdata.NationalityId && ele.EmployeeName == rowdata.EmployeeName);
    this.editFidelitySection = true;
    this.enableFidelityEditSection = true;
    this.currentFidelityIndex = edit;

   this.productItem.fdLocation= String(rowdata.RiskId);// this.empLocation 
   this.productItem.fdName= rowdata.EmployeeName;//this.employeeName
   this.productItem.fdAddress= rowdata.Address;//this.empAddress 
   this.productItem.fdOccupation = rowdata.OccupationId;
   this.productItem.fdSI = rowdata.Salary;
   this.productItem.fdNationality= rowdata.NationalityId;
    var dateParts = rowdata.DateOfBirth.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
   this.productItem.fdDob= dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    this.productItem.fdPeriod= rowdata.DateOfJoiningYear;
    this.productItem.fdJoin =rowdata.DateOfJoiningMonth;
    //this.productItem.fdJoin = String(0)+join;
    console.log('MMMMMMMMMMMM', this.monthList);
    console.log('KKKKKKKKKKKKKKKKK', this.productItem.fdJoin);
    this.individualCommaFormatted('fidelity');
  }
  FidelityDelete(rowData,index){
    if(rowData?.EmployeeId==null){
          this.fidelityList.splice(index,1);
          if(this.fidelityList.length!=0){
            this.getTotalSICost('Fidelity');
          }
    }
    else{
      let entry = this.originalFidelityList.some(ele=>ele.EmployeeId==rowData.EmployeeId);
      if(entry){
        let SectionId = null;
        if(this.productId=='32' || this.productId=='19') SectionId = '43';
        let ReqObj = {
          "QuoteNo": this.quoteNo,
          "RiskId": rowData.RiskId,
         "EmployeeId": rowData.EmployeeId,
         "SectionId": SectionId
      }
      let urlLink = `${this.motorApiUrl}api/deleteemployeebyid`;
        this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data.Result){
                this.fidelityList = [];
                this.getFidelityDetails();
            }
          },
          (err) => { },
        );
      }
      else{
        this.fidelityList.splice(index,1);
          if(this.fidelityList.length!=0){
            this.getTotalSICost('Fidelity');
          }
      }
    }
   
  }
  EmployeeDelete(rowData,index){
    if(rowData?.EmployeeId==null){
          this.employeeList.splice(index,1);
          if(this.employeeList.length!=0){
            this.getTotalSICost('Employee');
          }
    }
    else{
      let entry = this.originalEmployeeList.some(ele=>ele.EmployeeId==rowData.EmployeeId);
      if(entry){
        let SectionId = null;
        if(this.productId=='14'  || this.productId=='19') SectionId = '45';
        let ReqObj = {
          "QuoteNo": this.quoteNo,
        //   "RiskId": rowData.RiskId,
        "EmployeeId": rowData.EmployeeId,
          "SectionId": SectionId
      }
      let urlLink = `${this.motorApiUrl}api/deleteemployeebyid`;
      //let urlLink = `${this.motorApiUrl}api/deleteproductemployees`;
        this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data.Result){
                this.employeeList = [];
                this.getEmployeeDetails();
            }
          },
          (err) => { },
        );
      }
      else{
        this.employeeList.splice(index,1);
          if(this.employeeList.length!=0){
            this.getTotalSICost('Employee');
          }
      }
    }
   
  }
  AddNew() {
    //this.value;
    //this.Section=true;
    //this.jsonList.push(row);
    this.productItem.LocationAddress=null;
    this.productItem.LocationNameBuilding=null;
    this.productItem.BuildingSumInsureds=null;
    let entry = {
      "BuildingAddress": null,
      "BuildingBuildYear": null,
      "BuildingFloors": null,
      "InbuildConstructType": null,
      "BuildingSuminsured": null,
      "RiskId": null,
      "SectionId": "1"
    }
    this.currentBuildingIndex = this.building.length;
    this.editBuildingSection = false;
    this.enableBuildingEditSection = true;
    this.building.push(entry);
  }
  AddNewAccessories(){
    // let entry = {
    //   "AccessoriesType": null,
    //   "ChassisNo": null,
    //   "SerialNo": null,
    //   "SumInsured": null,
    //   "RiskId": null,
    //   "SectionId": ""
    // }
    let entry = [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    this.currentAccessoriesIndex = this.accessoriesList.length;
    this.editAccessoriesSection = false;
    this.enableAccessoriesEditSection = true;
    this.accessoriesList.push(entry);
    this.productItem = new ProductData();
  }
  AddNewMachinery(){
    let entry = {
      "ConttentRiskDesc": null,
      "Brand": null,
      "SerialNo": null,
      "SumInsured": null,
      "RiskId": null,
      "SectionId": "41",
      "Name":null,
    }
    this.currentMachineryIndex = this.machineries.length;
    this.editMachinerySection = false;
    this.enableMachineryEditSection = true;
    this.machineries.push(entry);
    this.productItem = new ProductData();
  }
  onEditBuilding(index){
    this.currentBuildingIndex = index;
    this.editBuildingSection = true;
    this.enableBuildingEditSection = true;
    this.productItem.LocationAddress = this.building[index].BuildingAddress;
    this.productItem.LocationNameBuilding = this.building[index].LocationName;
    this.productItem.BuildingSumInsureds = this.building[index].BuildingSuminsured;
    // this.LocationName = this.building[index].LocationName;
    // this.BuildingAddress = this.building[index].BuildingAddress;
    // this.BuildingSuminsured = this.building[index].BuildingSuminsured;
    this.individualCommaFormatted('building');
  }

  onEditCyber(index){
    this.currentCyberIndex= index;
    this.editCyberSection = true;
    this.enableCyberSection= true;
    this.productItem.DeviceLocation = this.CyberItem[index].RiskId;
    this.productItem.DeviceType = this.CyberItem[index].ItemId;
    this.productItem.DeviceSNo = this.CyberItem[index].SerialNoDesc;
    this.productItem.DeviceMake = this.CyberItem[index].MakeAndModel;
    this.productItem.DeviceYear = this.CyberItem[index].ManufactureYear;
    // this.LocationId = this.CyberItem[index].RiskId;
    // this.DeviceType = this.CyberItem[index].ItemId;
    // this.Cyberyear= this.CyberItem[index].ManufactureYear;
    // this.CyberMake = this.CyberItem[index].MakeAndModel;
    // this.CyberSNo=this.CyberItem[index].SerialNoDesc;
    // this.individualCommaFormatted('Cyber');
  }

  PersonalAdd() {
    //this.Section=true;
    //this.PersonalAssistantList.push(rows);
    this.productItem.AccOccupation = this.accidentOccupation;
    this.productItem.AccidentLocation = null;
    this.productItem.AccDob =null;
    this.productItem.AccName =null;
    this.productItem.AccNationID =null;
    this.productItem.AccSI=null;
    let entry = [{
      "Dob": null,
      "Height": null,
      "OccupationId": this.accidentOccupationId,
      "OccupationDesc": this.accidentOccupation,
      "NationalityId": null,
      "PersonName": null,
      "Salary": null,
      "Weight": null,
      "RiskId": null,
      "SerialNo": null
    }]
    this.currentPersonalAccidentIndex = this.PersonalAssistantList.length;
    this.PersonalAssistantList.push(entry);
    //this.editContentSection = false;
    this.editPersonalAccidentSection = false;
    this.enablePersonalAccEditSection = true;
    //this.PersonalAssistantList = entry.concat(this.PersonalAssistantList);
  }

  delete(row: any) {
    const index = this.building.indexOf(row);

    this.building.splice(index, 1);
    this.LocationList.splice(index,1);
    this.getTotalSICost('building');
    console.log("Locations",this.LocationList);
    //this.Section=false;
  }
  deletePersonal(rows: any) {
    const index = this.PersonalAssistantList.indexOf(rows);
    this.PersonalAssistantList.splice(index, 1);
    this.getTotalSICost('PersonalAccident');
    //this.getTotalSICost('personalInt');
  }
  ContentDelete(rowss: any) {
    const index = this.Cotentrisk.indexOf(rowss);
    this.Cotentrisk.splice(index, 1);
    this.getTotalSICost('content');
  }
  PersonalAccidentDelete(rowss: any) {
    const index = this.PersonalAssistantList.indexOf(rowss);
   this.PersonalAssistantList.splice(index,1);
    this.getTotalSICost('PersonalAccident');
  }
  AllRiskDelete(rowss: any) {
    const index = this.risk.indexOf(rowss);
   this.risk.splice(index,1);
    this.getTotalSICost('AllRisk');
  }
  PersonalIndDelete(rowss: any) {
    const index = this.Intermedity.indexOf(rowss);
   this.Intermedity.splice(index,1);
    this.getTotalSICost('PersonalIndemenity');
  }
  ElectronicDelete(rowss: any) {
    const index = this.ElectronicItem.indexOf(rowss);
   this.ElectronicItem.splice(index,1);
    this.getTotalSICost('ElectricalEquipment');
  }
  MachineryDelete(rows:any){
    const index = this.machineries.indexOf(rows);
    this.machineries.splice(index, 1);
    this.getTotalSICost('machinery');
  }
  AccessoriesDelete(rows:any){
    const index = this.accessoriesList.indexOf(rows);
    this.accessoriesList.splice(index, 1);
    this.getTotalSICost('Accessories');
  }
  AllAdd(){
    console.log('IIIIIIIII',this.risk);
    let entry = [{
      "ItemId":"",
      "RiskId":"",
      "MakeAndModel":"TN123",
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":"155685",
      "ItemValue":"26534556",
      "SumInsured":"",
    }]
    this.currentRiskIndex = this.risk.length;
    console.log('NNNNNNNN',this.currentRiskIndex);
    this.risk.push(entry);
    this.enableAllriskEditSection = true;
   
    this.editRiskSection= false; 
    this.form = new FormGroup({});
    this.productItem = new ProductData();
   
    //this.risk = entry.concat(this.risk);
  
  }

  AllAdds(){
    let entry = [{
      "ItemId": "",
      "ItemValue": "10000",
    "MakeAndModel": "",
    "ContentRiskDesc":null,
    "SerialNoDesc": null,
    "PurchaseMonth": "",
    "PurchaseYear": "",
    "RiskId": "1",
    "SerialNo": "1",
    "SumInsured": ""
    }]
    this.currentElectronicIndex = this.ElectronicItem.length;
    console.log('NNNNNNNN',this.currentElectronicIndex);
    this.ElectronicItem.push(entry);
    this.enableElectronicEquipmentSection= true;  
    this.editElectronicSection= false; 
    this.form = new FormGroup({});
    this.productItem = new ProductData();
    //this.ElectronicItem.push(entry);
  }
  AllCyber(){

    let entry = {
      "ItemId":"",
      "ItemDesc":"",
      "RiskId": null,
      "ContentRiskDesc":"",
      "SerialNoDesc":"",
      "MakeAndModel":"",
      "ItemValue":"",
      "Name":"",
      "ManufactureYear": ""
    }
    this.CyberSNo=null;this.CyberMake=null;
    this.Cyberyear=null;this.LocationId=null;
    this.DeviceType = null;
    this.enableCyberSection = true;
    this.editCyberSection = false;
    this.currentCyberIndex= this.CyberItem.length;
    this.CyberItem.push(entry);
    this.productItem = new ProductData();
  }
  AllDelete(row:any){
    const index = this.risk.indexOf(row);
    this.risk.splice(index, 1);
    this.getTotalSICost('AllRisk');
  }
  AllDeleteElect(row:any){
    const index = this.ElectronicItem.indexOf(row);
    this.ElectronicItem.splice(index, 1);
    this.getTotalSICost('ElectricalEquipment');
  }
  IntermedityAdd(){
  
    let entry = [{
      "Dob": null,
      "Height": null,
      "OccupationId": this.liabilityOccupationId,
      "OccupationDesc": this.liabilityOccupation,
      "NationalityId": null,
      "PersonName": null,
      "Salary": null,
      "Weight": null,
      "RiskId": null,
      "SerialNo": null
    }]
    this.currentPersonalIndIndex = this.Intermedity.length;
    this.Intermedity.push(entry);
    this.editPersonalIndSection= false;
    this.enablePersonalIndEditSection = true;
    this.form = new FormGroup({});
    this.productItem = new ProductData();
    this.productItem.IndOccupation = this.liabilityOccupation;
    // this.productItem.IndLocation = "";
    // this.productItem.IndDob = "";
    // this.productItem.IndName ="";
    // this.productItem.IndNationID ="";
    // this.productItem.IndSI="";
    // this.productItem = new ProductData();
    //this.Intermedity=entry.concat(this.Intermedity)
  }
  deleteCyber(index){
      this.CyberItem.splice(index,1);
  }
  IntermedityDelete(row:any){
    const index = this.Intermedity.indexOf(row);
    this.Intermedity.splice(index, 1);
    this.getTotalSICost('personalInt');
  }
  Electronic(){
    let ReqObj = {
      "BranchCode":this.branchCode,
      "InsuranceId":this.insuranceId,
        }
      let urlLink = `${this.CommonApiUrl}dropdown/electronicitems`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.ElectronicList = data?.Result;
            console.log('RRRRRRRRRRRRRRRRRRR',this.ElectronicList);
            for (let j = 0; j < this.ElectronicList.length; j++) {
              this.ElectronicList[j].label = this.ElectronicList[j]['CodeDesc'];
              this.ElectronicList[j].value = this.ElectronicList[j]['Code'];
              delete this.ElectronicList[j].CodeDesc;
              if (j == this.ElectronicList.length - 1) {
                console.log('LLLLLLLLLLLLLLLLLL',this.ElectronicList);
                this.fieldsElectronic[0].fieldGroup[0].fieldGroup[0].fieldGroup[1].props.options = this.ElectronicList;
              }
            }
          }
        },
        (err) => { },
      );
  }

  tabClick(event){
    console.log("Source Event",event,event.tab.textLabel);
    if(event.index!=0){
    if(this.productId!='19' && this.selectedTab!=1 && this.LocationList.length==0) this.onSave(event.tab.textLabel)
    }
  }
  getBack(type){
    if(this.endorsementSection){
      if(type=='Building'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
      else if(type=='Content Risk'){
        this.fourth = true;
        this.getContentDetails();
        this.selectedTab -=1; 
        
      }
      else if(type=='Personal Accident'){
        this.fourth = true;
        this.getPersonalAccidentDetails();
        this.selectedTab -=1; 
      }
      else if(type=='All Risk'){
        this.fourth = true;this.getallriskDetails();
        this.selectedTab -=1; 
      }
      else if(type=='Personal Indemenity'){
        this.fourth = true;this.getPersonalIntermediaryDetails();
        this.selectedTab -=1; 
      }
      else if(type=='ElectricalEquipment'){
        this.fourth = true;this.getElectronicEquipment();
        this.selectedTab -=1; 
      }
      else if(type== 'Machinery Breakdown'){
        this.nine =true;
        this.getMachineryRisk();
        this.selectedTab -=1; 
        }
        else if(type== 'employers'){
          this.selectedTab -=1; 
          }
          else if(type== 'Fedility'){
            this.selectedTab -=1; 
            }
            else if(type== 'Accessories'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
              }
              else if(type== 'Device Details'){
                this.selectedTab -=1; 
                }
    }
    else if(!this.endorsementSection){
      if(type=='Building'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
      if(type=='Content Risk'){
        this.fourth = true;
        this.getContentDetails();
        this.selectedTab -=1; 
        
      }
      else if(type=='Personal Accident'){
        this.fourth = true;
        this.getPersonalAccidentDetails();
        this.selectedTab -=1; 
      }
      else if(type=='All Risk'){
        this.fourth = true;this.getallriskDetails();
        this.selectedTab -=1; 
      }
      else if(type=='Personal Indemenity'){
        this.fourth = true;this.getPersonalIntermediaryDetails();
        this.selectedTab -=1; 
      }
      else if(type=='ElectricalEquipment'){
        this.fourth = true;this.getElectronicEquipment();
        this.selectedTab -=1; 
      }
      else if(type== 'Machinery Breakdown'){
        this.nine =true;
        this.getMachineryRisk();
        this.selectedTab -=1; 
        }
        else if(type== 'employers'){
          this.selectedTab -=1; 
          }
          else if(type== 'Fedility'){
            this.selectedTab -=1; 
            }
            else if(type== 'Accessories'){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
              }
              else if(type== 'Device Details'){
                this.selectedTab -=1; 
                }
                else if(type=='Medical'){
                  this.selectedTab-=1;
                }
     
      // else if(this.buildingDetailsSection){
      //   console.log('Buildingss else block',this.buildingDetailsSection)
      //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      // }
    }

    
  }
}
