import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import {PageEvent} from '@angular/material/paginator';
import {NgxPaginationModule} from 'ngx-pagination';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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
  CyperList:any[]=[];
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
  userDetails: any;risk:any[]=[];
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
  endorsementSection: boolean;BuildingSuminsured:any;
  orgPolicyNo: string;BuildingAddress:any;
  endorsementId: any;
  enableFieldsList: any[]=[];
  endorsePolicyNo: any;
  endorseCategory: any;
  endorsementName: any;
  contentRiskSection: boolean=false;
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
  buildingSIError: boolean=false;
  buildingLocationError: boolean=false;
  buildingAddressError: boolean=false;
  editBuildingSection: boolean=false;
  totalBuildSIError: boolean=false;
  currentContentIndex: number;
  MachineryIndex:number;
  editContentSection: boolean;
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
  DeviceType:any;
  editCyberSection: boolean;
  cyberSectionId: any;
  Cyberyear:any;
  CyberSNo:any;
  constructor(private router: Router,private datePipe:DatePipe,private modalService: NgbModal,
     private sharedService: SharedService,) {
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    console.log("item received", homeObj)
    if (homeObj && this.productId!='19') {
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
    if(this.productId=='5') this.buildingDetailsSection=false;
    else this.buildingDetailsSection = true;
    
   


    //this.Section=false;

  }
  ngOnInit(): void {
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
        let enableAllSection = this.enableFieldsList.some(ele=>ele=='domesticRiskDetails' || ele=='AddCovers');
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
    this.Electronic();
    let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if (homeObj) {
      
    }


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
            if(type=='building') return (!this.buildingSection && !this.enableAllSection);
            else if(type=='content') return (!this.contentRiskSection && !this.enableAllSection);
            else if(type=='personalAccident') return (!this.personalAccidentSection && !this.enableAllSection);
            else if(type == 'personalIndeminity') return (!this.personalIntermeditySection && !this.enableAllSection);
            else if(type=='allRisk') return (!this.allRiskSection && !this.enableAllSection);
            else if(type == 'electronic') return (!this.electronicEquipSection && !this.enableAllSection);
      }
      else return false;
  }
  setTabSections(){
    if(this.productId=='42')
    this.cyberSectionId=this.item[0];
    if(this.productId=='42'){
      this.ten=true;
      // this.CyberItem=[{'Make':'Honda','DeviceType':'1','Making':'2022','SerialNo':1,"DeviceTypeDesc":"Desktop","SumInsured":"123,45"}];
    }
    else{
      this.ten=false;
    }
    if(this.item){
      let items = this.item.find((Code) => Code == '1' || Code=='40');
      if (items) {
        this.sumInsured=true;
      }
      else {
        this.sumInsured =false;
      }
      if(this.productId!='19'){
        let first = this.item.find((Code) => Code == '47' || Code=='40');
        if (first && this.productId!='6') {
          this.first=true;
        }
        else {
          this.first =false;
        }
      }
      else{
        let first = this.item.find((Code) => Code == '47');
        if (first && this.productId!='6') {
          this.first=true;
        }
        else {
          this.first =false;
        }
      }
      const second = this.item.find((Code) => Code == '35');
      if (second) {
        this.second = true;
      }
      else {
        this.second = false;
      }

      const third = this.item.find((Code) => Code == '3');
      
      if (third && this.productId!='21') {
        this.third = true;
      }
      else {
        this.third = false;
      }
      const fifth = this.item.find((Code) => Code == '36');
      if (fifth) {
        this.fifth = true;
      }
      else {
        this.fifth = false;
      }
      const six = this.item.find((Code) => Code == '39');
      if (six && this.productId!='19') {
        this.six = true;
      }
      else {
        this.six = false;
      }
      const seven = this.item.find((Code) =>Code =='37' || Code == '38' || Code == '45');
      if(seven){
        this.seven = true;
        this.getEmployeeDetails();
        this.getOccupationList(seven)
       } 
       else this.seven = false;
       const eight = this.item.find((Code) => Code == '43');
      if(eight){
        this.eight = true;
        this.getFidelityDetails();
        this.getOccupationList(eight)
       } 
       else this.eight = false;
       const nine = this.item.find((Code) => Code == '41');
        if (nine && this.productId!='19' && this.productId!='16') {
          this.nine = true;
        }
        else {
          this.nine = false;
        }
    }
   

    
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
       "RiskId": "1",
       "SectionId": SectionId
    }
    let urlLink = `${this.motorApiUrl}api/getallproductemployees`;
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
    let urlLink = `${this.motorApiUrl}api/getallproductemployees`;
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
    if(this.endorsementSection){
      if(type=='building') return (!this.buildingSection && !this.enableAllSection) ;
      else if(type=='content') return (!this.contentRiskSection && !this.enableAllSection);
      else if(type=='personalAccident') return (!this.personalAccidentSection && !this.enableAllSection);
      else if(type == 'personalIndeminity') return (!this.personalIntermeditySection && !this.enableAllSection);
      else if(type=='allRisk') return (!this.allRiskSection && !this.enableAllSection);
      else if(type == 'electronic') return (!this.electronicEquipSection && !this.enableAllSection);
      //else if(type == 'Cyber') return (!this.electronicEquipSection && !this.enableAllSection);
    }
    else return false;
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
          console.log('SUMMMMMMMMMM',this.sumInsuredDetails);
          let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          if(this.item==undefined || this.item == null){
              this.item = this.sumInsuredDetails?.ProductSuminsuredDetails?.SectionId;
              this.setTabSections();
              
          }
          this.getContentList();
          if(this.productId=='21'){
            this.getallriskLists();
          }
          else if(this.productId=='26'){
            this.getallriskListsplant();
          }
          else if(this.productId=='39'){
            this.getallriskMachinery();
          }
          else if(this.productId=='42'){
            this.getcontenttype();
            this.getCyberDetails();
          }
          else{
            this.getallriskList();
          }
             
          if(this.sumInsuredDetails){
            // if(this.first) this.contentSumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.second) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.third) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            // if(this.fifth) this.pASumInsured = this.sumInsuredDetails.ProductSuminsuredDetails.ContentSuminsured;
            this.currencyValue = this.sumInsuredDetails.ProductSuminsuredDetails.CurrencyId;
            this.accidentOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationTypeDesc;
            this.accidentOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.OccupationType;
            this.liabilityOccupation = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationDesc;
            this.liabilityOccupationId = this.sumInsuredDetails.ProductSuminsuredDetails.LiabilityOccupationId
            let buildingSI = this.sumInsuredDetails.ProductSuminsuredDetails.BuildingSuminsured;
            if(buildingSI!='' && buildingSI!=null && buildingSI!=undefined){
              this.actualBuildingSI = buildingSI;
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
            }
            else this.actualAllRiskSI = 0;
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
            this.getbuilding();
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
    this.MachineryName = null;this.BrandName=null;this.serialNoDesc=null;this.SumInsured=null;
    this.currentMachineryIndex = null;
    this.enableMachineryEditSection = false;
  }
  onContentCancel(){
    if(!this.editContentSection) this.Cotentrisk.splice(this.currentContentIndex,1);
    this.LocationId = null;this.serialNoDesc = null;this.contentRiskDesc = null;
    this.contentSI = null;this.contentId = null;this.enableContentEditSection=false;
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

  onCyberSaves(){
    if(this.DeviceType!=null && this.DeviceType!=undefined && this.DeviceType!=null){
        //this.CyberItem[this.currentCyberIndex].ContentRiskDesc = this.BuildingSuminsured;
        this.CyberItem[this.currentCyberIndex].ContentRiskDesc = this.CyperList.find(ele=>ele.Code==this.DeviceType).CodeDesc;
        this.CyberItem[this.currentCyberIndex].SerialNoDesc = this.CyberSNo;
        this.CyberItem[this.currentCyberIndex].MakeAndModel = this.CyberMake;
        this.CyberItem[this.currentCyberIndex].ManufactureYear = this.Cyberyear;
        this.CyberItem[this.currentCyberIndex].ItemId = this.DeviceType;
        // if(this.DeviceType!=null){
        //   this.CyberItem[this.currentCyberIndex].ItemDesc = this.CyperList.find(ele=>ele.Code==this.DeviceType)?.CodeDesc;
        // }
        this.CyberItem[this.currentCyberIndex].RiskId = this.LocationId;
        this.CyberItem[this.currentCyberIndex].Name= this.CyperList.find(ele=>ele.Code==this.DeviceType).CodeDesc;
        this.CyberSNo=null;this.CyberMake=null;this.Cyberyear=null;this.DeviceType=null;this.LocationId=null;
        this.editCyberSection = false;
       this.enableCyberSection = false;
        // this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    }
  }
  
  onBuildingSave(){
    this.buildingSIError = false;this.buildingLocationError=false; this.buildingAddressError = false;this.totalBuildSIError = false;
    if(this.LocationName!=null && this.LocationName!=undefined && this.BuildingAddress!=null){
      if(!this.sumInsured){
        if(this.BuildingSuminsured==0 || this.BuildingSuminsured=='' || this.BuildingSuminsured==null || this.BuildingSuminsured==undefined) this.BuildingSuminsured = 0;  
        this.building[this.currentBuildingIndex].BuildingSuminsured = this.BuildingSuminsured;
        this.building[this.currentBuildingIndex].LocationName = this.LocationName;
        this.building[this.currentBuildingIndex].BuildingAddress = this.BuildingAddress;
        this.editBuildingSection = false;
        this.enableBuildingEditSection = false;
        this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
      }
      else if(this.BuildingSuminsured==0 || this.BuildingSuminsured=='' || this.BuildingSuminsured==null || this.BuildingSuminsured==undefined) this.buildingSIError = true;
      else if(this.totalBuildingSumInsured>this.actualBuildingSI){
        this.totalBuildSIError = true;
      }
      else{
        this.building[this.currentBuildingIndex]['LocationName'] = this.LocationName;
        this.building[this.currentBuildingIndex]['BuildingAddress'] = this.BuildingAddress;
        this.building[this.currentBuildingIndex]['BuildingSuminsured'] = this.BuildingSuminsured;
        this.editBuildingSection = false;
        this.enableBuildingEditSection = false;
        this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
      }
    }
    else if(this.LocationName==null || this.LocationName==undefined){this.buildingLocationError=true;}
    else if(this.BuildingAddress==null || this.BuildingAddress==undefined){this.buildingAddressError = true;}
    else{
      this.building[this.currentBuildingIndex]['LocationName'] = this.LocationName;
      this.building[this.currentBuildingIndex]['BuildingAddress'] = this.BuildingAddress;
      this.building[this.currentBuildingIndex]['BuildingSuminsured'] = 0;
      this.editBuildingSection = false;
      this.enableBuildingEditSection = false;
      this.LocationName = null; this.BuildingAddress = null; this.BuildingSuminsured = null;
    }
  
}
onMachinerySave(){
 
 
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
    if(this.MachineryLocation==null || this.MachineryLocation==undefined || this.MachineryLocation==''){ i+=1; this.locationIdError = true;}
    if(this.machineryItemId==null || this.machineryItemId==undefined || this.machineryItemId==''){ i+=1; this.contentIdError = true;}
    if(this.serialNoDesc==null || this.serialNoDesc==undefined || this.serialNoDesc==''){ i+=1; this.serialNoError = true;}
    if(this.MachineryName==null || this.MachineryName==undefined || this.MachineryName==''){ i+=1; this.contentDescError = true;}
    if(this.MiSumInsured==null || this.MiSumInsured==undefined || this.MiSumInsured=='' || this.MiSumInsured == '0'){ i+=1; this.contentSIError = true;}
    console.log('uuuuuuuuu',i)
    if(i==0){
      this.machineries[this.currentMachineryIndex]['SumInsured'] = this.MiSumInsured;
      this.machineries[this.currentMachineryIndex]['RiskId'] =this.MachineryLocation;
      this.machineries[this.currentMachineryIndex]['SerialNoDesc'] = this.serialNoDesc;
      this.machineries[this.currentMachineryIndex]['MachinaryDesc'] = this.MachineryName;
      this.machineries[this.currentMachineryIndex]['ItemId'] = this.machineryItemId;
      this.machineries[this.currentMachineryIndex]['Name'] = this.NameDesc;
      this.machineries[this.currentMachineryIndex]['Brand'] = this.BrandName;
      this.MachineryName = null;this.BrandName=null;this.serialNoDesc=null;this.SumInsured=null;
      this.currentMachineryIndex = null;
      this.enableMachineryEditSection = false;
      // this.machineries[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.LocationId).CodeDesc;
      // this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      // this.editContentSection = false;
      // this.enableContentEditSection = false;
    }

}
onFidelitySave(){
  this.employeeNameError = false;this.employeeOccupationError = false;this.employeeAddressError=false;
  this.employeeNationalityError = false;this.employeeDobError = false;this.employeeDojError = false;
  this.employeeSalaryError = false;this.employeeLocationError=false;let i=0;
  if(this.employeeName=='' || this.employeeName==null || this.employeeName == undefined){i+=1;this.employeeNameError=true};
  if(this.occupationType=='' || this.occupationType==null || this.occupationType == undefined){i+=1;this.employeeOccupationError=true};
  // if(this.empAddress=='' || this.empAddress==null || this.empAddress == undefined){i+=1;this.employeeAddressError=true};
  if(this.nationality=='' || this.nationality==null || this.nationality == undefined){i+=1;this.employeeNationalityError=true};
  if(this.empDob=='' || this.empDob==null || this.empDob == undefined){i+=1;this.employeeDobError=true};
  if(this.empJoiningDate=='' || this.empJoiningDate==null || this.empJoiningDate == undefined){i+=1;this.employeeDojError=true};
  if(this.empLocation=='' || this.empLocation==null || this.empLocation == undefined){i+=1;this.employeeLocationError=true};
  if(this.employeeSalary=='' || this.employeeSalary==null || this.employeeSalary == undefined){i+=1;this.employeeSalaryError=true};
  if(i==0){
    let SectionId = null;
    if(this.productId=='32') SectionId = '43';
    this.fidelityList[this.currentFidelityIndex]['RiskId'] = this.empLocation;
    this.fidelityList[this.currentFidelityIndex]['LocationId'] = this.empLocation;
    this.fidelityList[this.currentFidelityIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.empLocation).CodeDesc;
    this.fidelityList[this.currentFidelityIndex]['Createdby'] = this.loginId;
    this.fidelityList[this.currentFidelityIndex]['Address'] = this.empAddress;
    this.fidelityList[this.currentFidelityIndex]['EmployeeName'] = this.employeeName;
    this.fidelityList[this.currentFidelityIndex]['OccupationId'] = this.occupationType;
    this.fidelityList[this.currentFidelityIndex]['OccupationDesc'] = this.fidelityOccupationList.find(ele=>ele.Code==this.occupationType).CodeDesc;
    this.fidelityList[this.currentFidelityIndex]['DateOfBirth'] = this.datePipe.transform(this.empDob, "dd/MM/yyyy");
    this.fidelityList[this.currentFidelityIndex]['DateOfJoiningYear'] = this.empJoiningDate;
    this.fidelityList[this.currentFidelityIndex]['DateOfJoiningMonth'] = this.empJoiningMonth;
    this.fidelityList[this.currentFidelityIndex]['SectionId'] = SectionId;
    let salary = '';
    if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
    else salary = this.employeeSalary;
    this.fidelityList[this.currentFidelityIndex]['Salary'] = salary;
    this.fidelityList[this.currentFidelityIndex]['NationalityId'] = this.nationality;
    this.editFidelitySection = false;this.enableFidelityEditSection = false;this.currentFidelityIndex=null;
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;this.empLocation = null;
  }
}
  onEmployeeSave(){
    this.employeeNameError = false;this.employeeOccupationError = false;this.employeeAddressError=false;
    this.employeeNationalityError = false;this.employeeDobError = false;this.employeeDojError = false;
    this.employeeSalaryError = false;this.employeeLocationError=false;let i=0;
    if(this.employeeName=='' || this.employeeName==null || this.employeeName == undefined){i+=1;this.employeeNameError=true};
    if(this.occupationType=='' || this.occupationType==null || this.occupationType == undefined){i+=1;this.employeeOccupationError=true};
    // if(this.empAddress=='' || this.empAddress==null || this.empAddress == undefined){i+=1;this.employeeAddressError=true};
    if(this.nationality=='' || this.nationality==null || this.nationality == undefined){i+=1;this.employeeNationalityError=true};
    if(this.empDob=='' || this.empDob==null || this.empDob == undefined){i+=1;this.employeeDobError=true};
    if(this.empJoiningDate=='' || this.empJoiningDate==null || this.empJoiningDate == undefined){i+=1;this.employeeDojError=true};
    if(this.empLocation=='' || this.empLocation==null || this.empLocation == undefined){i+=1;this.employeeLocationError=true};
    if(this.employeeSalary=='' || this.employeeSalary==null || this.employeeSalary == undefined){i+=1;this.employeeSalaryError=true};
    if(i==0){
      this.employeeList[this.currentEmployeeIndex]['Address'] = this.empAddress;
      this.employeeList[this.currentEmployeeIndex]['Createdby'] = this.loginId;
      this.employeeList[this.currentEmployeeIndex]['RiskId'] = this.empLocation;
      this.employeeList[this.currentEmployeeIndex]['LocationId'] = this.empLocation;
      this.employeeList[this.currentEmployeeIndex]['EmployeeName'] = this.employeeName;
      this.employeeList[this.currentEmployeeIndex]['OccupationId'] = this.occupationType;
      this.employeeList[this.currentEmployeeIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.empLocation).CodeDesc;
      this.employeeList[this.currentEmployeeIndex]['OccupationDesc'] = this.employeeOccupationList.find(ele=>ele.Code==this.occupationType).CodeDesc;
      this.employeeList[this.currentEmployeeIndex]['DateOfBirth'] = this.datePipe.transform(this.empDob, "dd/MM/yyyy");
      this.employeeList[this.currentEmployeeIndex]['DateOfJoiningYear'] = this.empJoiningDate;
      this.employeeList[this.currentEmployeeIndex]['DateOfJoiningMonth'] = this.empJoiningMonth;
      let salary = '';
      if(this.employeeSalary.includes(',')){ salary = this.employeeSalary.replace(/,/g, '')}
      else salary = this.employeeSalary;
      this.employeeList[this.currentEmployeeIndex]['Salary'] = salary;
      this.employeeList[this.currentEmployeeIndex]['NationalityId'] = this.nationality;
      this.editEmployeeSection = false;this.enableEmployeeEditSection = false;this.currentEmployeeIndex=null;
      this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
      this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
    }
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
    if(this.fidelityList.length!=0){
        let empList = [],i=0;
        for(let emp of this.fidelityList){
          let entry = emp;
          if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
          entry['EmployeeId'] = String(i+1);
          empList.push(entry);
          i+=1;
          if(i==this.fidelityList.length){
            let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
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
                          if(index==res.ErrorMessage.length-1){
                            Swal.fire({
                              title: '<strong>MisMatch Error</strong>',
                              icon: 'info',
                              html:
                                `<ul class="list-group errorlist">
                                  ${ulList}
                                  <li>Do you want to continue?</li>
                             </ul>`,
                              showCloseButton: true,
                              //focusConfirm: false,
                              showCancelButton:true,
                  
                             //confirmButtonColor: '#3085d6',
                             cancelButtonColor: '#d33',
                             confirmButtonText: 'Yes,Proceed!',
                             cancelButtonText: 'Cancel',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                  this.onSaveFidelityDetails('alter');
                              }
                            });
                          }
                        }
                        
                      }
                  }
                }
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
    if(this.employeeList.length!=0){
        let empList = [],i=0;
        for(let emp of this.employeeList){
          let entry = emp;
          if(emp.LocationName==undefined) emp['LocationName'] = this.LocationList.find(ele=>ele.Code==emp['LocationId']).CodeDesc;
          entry['EmployeeId'] = String(i+1);
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
              "EmpcountSIvalidYN": validYN,
              "ExcelUploadYN": "N",
              "InsuranceId": this.insuranceId,
              "ProductEmployeeSaveReq": empList,
              "QuoteNo": this.quoteNo,
              "RequestReferenceNo": this.quoteRefNo
            }
            let urlLink = `${this.motorApiUrl}api/saveproductemployees`;
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
                        if(index==res.ErrorMessage.length-1){
                          Swal.fire({
                            title: '<strong>MisMatch Error</strong>',
                            icon: 'info',
                            html:
                              `<ul class="list-group errorlist">
                                ${ulList}
                               <li>Do you want to continue?</li>
                           </ul>`,
                            showCloseButton: true,
                            //focusConfirm: false,
                            showCancelButton:true,
                
                           //confirmButtonColor: '#3085d6',
                           cancelButtonColor: '#d33',
                           confirmButtonText: 'Yes,Proceed!',
                           cancelButtonText: 'Cancel',
                          }).then((result) => {
                            if (result.isConfirmed) {
                                this.onSaveEmployeeDetails('alter');
                            }
                          });
                        }
                      }
                      
                    }
                    
                }
              }
              else{
                if(this.productId=='19' && this.eight)  this.selectedTab +=1; 
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
    this.chassisNoError = false;this.accessoriesTypeError = false;this.serialNoError = false;this.sumInsuredError = false;
    this.totalAccSIError = false;let i =0;
    if(this.chassisNo==null || this.chassisNo==''){
      i+=1;
      this.chassisNoError = true;
    }
    if(this.accessoriesType==null || this.accessoriesType==''){
      i+=1;
      this.accessoriesTypeError = true;
    }
    if(this.serialNoDesc==null || this.serialNoDesc==''){
      i+=1;
      this.serialNoError = true;
    }
    if(this.SumInsured==null || this.SumInsured=='0' || this.SumInsured==''){
      i+=1;
      this.sumInsuredError = true;
    }
    else if(this.totalAccessoriesSI>this.actualAccessoriesSI){
      i+=1;
      this.totalAccSIError = true;
    }
    if(i==0){
      this.currentAccessoriesIndex = null;
      this.editAccessoriesSection = false;
      this.enableAccessoriesEditSection = false;
    }
      
  }
  onContentSubmit(){
    console.log('PPPPPPPPPPPP')
    this.locationIdError = false;this.contentIdError=false; this.serialNoError = false;this.contentDescError = false;this.contentSIError = false;
    let i=0;
    if(this.LocationId==null || this.LocationId==undefined || this.LocationId==''){ i+=1; this.locationIdError = true;}
    if(this.contentId==null || this.contentId==undefined || this.contentId==''){ i+=1; this.contentIdError = true;}
    if(this.serialNoDesc==null || this.serialNoDesc==undefined || this.serialNoDesc==''){ i+=1; this.serialNoError = true;}
    if(this.contentRiskDesc==null || this.contentRiskDesc==undefined || this.contentRiskDesc==''){ i+=1; this.contentDescError = true;}
    if(this.contentSI==null || this.contentSI==undefined || this.contentSI=='' || this.contentSI == '0'){ i+=1; this.contentSIError = true;}
    if(i==0){
      this.Cotentrisk[this.currentContentIndex]['SumInsured'] = this.contentSI;
      this.Cotentrisk[this.currentContentIndex]['RiskId'] = this.LocationId;
      this.Cotentrisk[this.currentContentIndex]['SerialNoDesc'] = this.serialNoDesc;
      this.Cotentrisk[this.currentContentIndex]['ContentRiskDesc'] = this.contentRiskDesc;
      this.Cotentrisk[this.currentContentIndex]['ItemId'] = this.contentId;
      this.Cotentrisk[this.currentContentIndex]['LocationName'] = this.LocationList.find(ele=>ele.Code==this.LocationId).CodeDesc;
      this.LocationId = null;this.currentContentIndex=null;this.contentSI=null;this.serialNoDesc=null;this.contentRiskDesc=null;this.contentId=null;
      this.editContentSection = false;
      this.enableContentEditSection = false;
    }
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
          }
          else if(this.productId=='32' || sectionId=='43'){
            this.fidelityOccupationList = data.Result;
          }
          else this.occupationList = data.Result;
          this.getdropList();
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
            this.dropList = data.Result;
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
            //this.getOccupationList();

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
            //this.getOccupationList();

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
          else if(build.BuildingSuminsured.includes(',')){ sumInsured = build.BuildingSuminsured.replace(/,/g, '') }
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
    }

    //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);

  }
  onSavePersonalAccident(){
    if (this.PersonalAssistantList.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.PersonalAssistantList){
        let salary;
        if(entry.Salary==undefined || entry.Salary==null) salary = null;
        else if(entry.Salary.includes(',')){ salary = entry.Salary.replace(/,/g, '') }
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
          else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
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
        else if(entry.Salary.includes(',')){ salary = entry.Salary.replace(/,/g, '') }
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
    if(type=='A' && this.productId=='39')
    {
      console.log('AAAAAAAAA')
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
    if(type=='E' && this.productId!='42')
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
            else{
              this.checkValidation();
            }
          }
          else if(type=='PI'){
            this.checkValidation();
          }
          else if(type='E'){
            this.checkValidation();
          }

      }

    },
    (err) => { },
  );
  }

  onSaveContentRisk(){
    if (this.Cotentrisk.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.Cotentrisk){
        let sumInsured;
        if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
        else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
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
        else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
        else sumInsured = entry.SumInsured;
          let data = {
              "ItemId":entry.ItemId,
              "RiskId":entry.RiskId,
              "ContentRiskDesc":entry.MachinaryDesc,
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
            this.finalSaveRiskDetails(reqList,'A');
          }
      }

    }
  }
  onSaveAllRisk(){
    if (this.risk.length != 0) {
      let i=0, reqList =[];
      for(let entry of this.risk){
          let obj = entry;
          let sumInsured;
          if(entry.SumInsured==undefined || entry.SumInsured==null) sumInsured = null;
          else if(entry.SumInsured.includes(',')){ sumInsured = entry.SumInsured.replace(/,/g, '') }
          else sumInsured = entry.SumInsured;
          obj['SumInsured'] = sumInsured
          reqList.push(obj)
          i+=1;
          if(i==this.risk.length)  this.finalSaveRiskDetails(reqList,'A');
        }
      }
  }

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
            this.buildingSection = !this.enableFieldsList.some(ele=>ele=='BuildingSuminsured');
          }
          else this.buildingSection = true;
          this.building = res.Result;
          let i=0;
          for(let entry of this.building){
            if (i == 0) {
              this.LocationList = [];
            }
            this.LocationList.push({ "Code": String(this.LocationList.length+1), "CodeDesc": entry.LocationName })
            i+=1;
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
    let entry = this.LocationList.find(ele=>ele.Code==Id);
    if(entry){
      return entry.CodeDesc;
    }
  }
  getContentName(rowData){
    let entry = this.dropList.find(ele=>ele.Code==rowData.ItemId);
    if(entry) return entry.CodeDesc;
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
        let entry = this.BuildingSuminsured;
        console.log("Entry Came")
          console.log("Entry Came 2")
          let value = entry.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.building[this.currentBuildingIndex]['BuildingSuminsured'] = value;
          this.BuildingSuminsured = value;
          this.getTotalSICost('building');
      }
      if(type=='content'){
        let entry = this.contentSI;
        if(this.contentSI){
          let value = this.contentSI.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.Cotentrisk[this.currentContentIndex]['SumInsured'] = value;
          this.contentSI = value;
          this.getTotalSICost('content');
        }
      }
      if(type=='employee'){
        let entry = this.employeeSalary;
        if(this.employeeSalary){
          if(this.employeeSalary.includes('.')) this.employeeSalary = this.employeeSalary.split('.')[0];
          let value = this.employeeSalary.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.employeeList[this.currentEmployeeIndex]['Salary'] = value.replace(/,/g, '');
          this.employeeSalary = value;
          this.getTotalSICost('Employee');
        }
      }
      if(type=='fidelity'){
        let entry = this.employeeSalary;
        if(this.employeeSalary){
          if(this.employeeSalary.includes('.')) this.employeeSalary = this.employeeSalary.split('.')[0];
          let value = this.employeeSalary.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.fidelityList[this.currentFidelityIndex]['Salary'] = value.replace(/,/g, '');
          this.employeeSalary = value;
          this.getTotalSICost('Fidelity');
        }
      }
      if(type=='machinery'){
        let entry = this.MiSumInsured;
        if(this.MiSumInsured){
          if(this.MiSumInsured.includes('.')) this.MiSumInsured = this.MiSumInsured.split('.')[0];
          let value = this.MiSumInsured.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.machineries[this.currentMachineryIndex]['SumInsured'] = value.replace(/,/g, '');
          this.MiSumInsured = value;
          this.getTotalSICost('Machinery');
        }
      }
      if(type=='accessories'){
        let entry = this.SumInsured;
        if(this.SumInsured){
          if(this.SumInsured.includes('.')) this.SumInsured = this.SumInsured.split('.')[0];
          let value = this.SumInsured.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.accessoriesList[this.currentAccessoriesIndex]['SumInsured'] = value.replace(/,/g, '');
          this.SumInsured = value;
          this.getTotalSICost('Accessories');
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
          else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
          else entry = SI
          this.totalBuildingSumInsured = Number(entry)+this.totalBuildingSumInsured
        }
      }
    }
    else if(type=='content'){
        this.totalContentSI = 0;
        if(this.Cotentrisk.length!=0){
          for(let content of this.Cotentrisk){
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalContentSI = Number(entry)+this.totalContentSI
          }
        }
    }
    else if(type=='AllRisk'){
      this.totalAllRiskSI = 0;
        if(this.risk.length!=0){
          for(let content of this.risk){
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalAllRiskSI = Number(entry)+this.totalAllRiskSI
          }
        }
    }
    else if(type=='personalInt'){
      this.totalPersIntSI = 0;
        if(this.Intermedity.length!=0){
          for(let content of this.Intermedity){
            let SI = content.Salary,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalPersIntSI = Number(entry)+this.totalPersIntSI
          }
        }
    }
    else if(type=='ElectricalEquipment'){
      this.totalElectrIntSI = 0;
        if(this.ElectronicItem.length!=0){
          for(let content of this.ElectronicItem){
            let SI = content.SumInsured,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalElectrIntSI = Number(entry)+this.totalElectrIntSI
          }
        }
    }
    else if(type=='PersonalAccident'){
      this.totalPASI = 0;
        if(this.PersonalAssistantList.length!=0){
          for(let content of this.PersonalAssistantList){
            let SI = content.Salary,entry=0;
            if(SI==undefined || SI=='' || SI ==null) SI = 0;
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
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
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
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
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalEmpIntSI = Number(entry)+this.totalEmpIntSI
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
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
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
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
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
            else if(SI.includes(',')){ entry = SI.replace(/,/g, '') }
            else entry = SI
            this.totalAccessoriesSI = Number(entry)+this.totalAccessoriesSI
          }
        }
    }
  }
  getContentDetails(){
    let urlLink = `${this.motorApiUrl}api/getallcontentrisk`;
    let ReqObj = {
      "QuoteNo": sessionStorage.getItem('quoteNo'),
      "SectionId": "47"
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
          this.getdropList();
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
  onUploadDocuments(target:any,fileType:any,type:any){
    console.log("Event ",target);
    this.imageUrl = null;this.uploadDocList=[];
    let event:any = target.target.files;

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
  onUploadEmployeeDetails(){
      if(this.uploadDocList.length!=0){
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
  onEditEmployeeError(rowData,modal){
    this.errorRowNum = rowData?.RowNum;
    this.employeeName = rowData?.EmployeeName;
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
          "RiskId": "1",
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
              if(this.endorsementSection){
                this.electronicEquipSection = !this.enableFieldsList.some(ele=>ele=='ElecEquipSuminsured');
              }
              else this.electronicEquipSection = true;
              this.ElectronicItem = res.Result.ContentRiskDetails;
              this.getTotalSICost('ElectricalEquipment');
            }
            else{
             this.ElectronicItem = [{
               "ItemId":null,
               "RiskId":null,
               "MakeAndModel":null,
               "ContentRiskDesc":null,
              "SerialNoDesc": null,
               "SerialNo":null,
               "ItemValue":null,
               "SumInsured":null,
             }]
            }
           }
           else {
             this.ElectronicItem = [{
               "ItemId":null,
               "RiskId":null,
               "MakeAndModel":null,
               "ContentRiskDesc":null,
              "SerialNoDesc": null,
               "SerialNo":null,
               "ItemValue":null,
               "SumInsured":null,
             }]
           }
    }

  else {
    this.ElectronicItem = [{
      "ItemId":null,
      "RiskId":null,
      "MakeAndModel":null,
      "ContentRiskDesc":null,
      "SerialNoDesc": null,
      "SerialNo":null,
      "ItemValue":null,
      "SumInsured":null,
    }]
    }
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
                this.personalAccidentSection = !this.enableFieldsList.some(ele=>ele=='PersonalAccidentSuminsured' || ele=='OccupationType');
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
                  this.CommaFormatted(i,'personalAccident');
                  i+=1;
                  if(i==personalList.length) console.log("Personal Acc",this.PersonalAssistantList);
              }
            }
           
          }
          else {
            this.PersonalAssistantList = [
              {
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
              }
            ]
          }
        }
        else {
          this.PersonalAssistantList = [
            {
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
            }
          ]
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
                  this.CommaFormatted(i,'personalIndemenity');
                i+=1;
                if(i==this.Intermedity.length) this.getTotalSICost('Intermedity');
              }
            }
            
          }
          else {
            this.Intermedity = [
              {
                "Dob": null,
                "Height": null,
                "OccupationId": this.liabilityOccupationId,
                "OccupationDesc": this.liabilityOccupation,
                "PersonName": null,
                "NationalityId": null,
                "Salary": null,
                "Weight": null,
                "RiskId": null,
                "SerialNo": null
              }
            ]
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
                this.risk=[
                  {
                "ItemId":null,
                "RiskId":null,
                "MakeAndModel":"TN123",
                "ContentRiskDesc":null,
                "SerialNoDesc": null,
                "SerialNo":"155685",
                "ItemValue":"26534556",
                "SumInsured":null,
                  }
                ]
               }
              }
              else {
                this.risk=[
                  {
                "ItemId":null,
                "RiskId":null,
                "MakeAndModel":"TN123",
                "ContentRiskDesc":null,
                "SerialNoDesc": null,
                "SerialNo":"155685",
                "ItemValue":"26534556",
                "SumInsured":null,
                  }
                ]
              }
            }
            else {
              this.risk=[
                {
              "ItemId":null,
              "RiskId":null,
              "MakeAndModel":"TN123",
              "ContentRiskDesc":null,
              "SerialNoDesc": null,
              "SerialNo":"155685",
              "ItemValue":"26534556",
              "SumInsured":null,
                }
              ]
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
    this.empAddress = null;this.employeeName = null;this.occupationType = null;this.empJoiningMonth = null;
    this.employeeSalary = null;this.nationality = null;this.empDob = null;this.empJoiningDate=null;
  }
  ContentAdd() {
    //this.Section=true;
    //this.Cotentrisk.push(rowss);
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
    this.LocationId = this.Cotentrisk[index].RiskId;
    this.serialNoDesc = this.Cotentrisk[index].SerialNoDesc;
    this.contentRiskDesc = this.Cotentrisk[index].ContentRiskDesc;
    this.contentSI = this.Cotentrisk[index].SumInsured;this.contentId = this.Cotentrisk[index].ItemId;
    this.individualCommaFormatted('content');
  }

  onEditMachinery(index){
    console.log('LLLL');
    this.currentMachineryIndex = index;
    this.enableMachineryEditSection = true;
    this.MachineryLocation = this.machineries[index].RiskId;
    this.serialNoDesc = this.machineries[index].SerialNoDesc;
    this.MachineryName = this.machineries[index].ContentRiskDesc;
    this.MiSumInsured = this.machineries[index].SumInsured;this.machineryItemId = this.machineries[index].ItemId;
    this.NameDesc=this.machineries[index].Name;
    this.BrandName=this.machineries[index].Brand;

    this.individualCommaFormatted('machinery');
  }

  onEditEmployee(index){
    this.currentEmployeeIndex = index;
    this.editEmployeeSection = true;
    this.enableEmployeeEditSection = true;
    this.empLocation = this.employeeList[index].RiskId;
    this.employeeName = this.employeeList[index].EmployeeName;
    this.empAddress = this.employeeList[index].Address;
    this.occupationType = this.employeeList[index].OccupationId;
    this.employeeSalary = this.employeeList[index].Salary;
    this.nationality = this.employeeList[index].NationalityId;
    var dateParts = this.employeeList[index].DateOfBirth.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    this.empDob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    this.empJoiningDate = this.employeeList[index].DateOfJoiningYear;
    this.empJoiningMonth = this.employeeList[index].DateOfJoiningMonth;
    this.individualCommaFormatted('employee');
  }
  onEditFidelity(index){
    this.currentFidelityIndex = index;
    this.editFidelitySection = true;
    this.enableFidelityEditSection = true;
    this.empLocation = this.fidelityList[index].RiskId;
    this.employeeName = this.fidelityList[index].EmployeeName;
    this.empAddress = this.fidelityList[index].Address;
    this.occupationType = this.fidelityList[index].OccupationId;
    this.employeeSalary = this.fidelityList[index].Salary;
    this.nationality = this.fidelityList[index].NationalityId;
    var dateParts = this.fidelityList[index].DateOfBirth.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    this.empDob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
    this.empJoiningDate = this.fidelityList[index].DateOfJoiningYear;
    this.empJoiningMonth = this.fidelityList[index].DateOfJoiningMonth;
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
          "RiskId": "1",
         "EmployeeId": rowData.EmployeeId,
         "SectionId": SectionId
      }
      let urlLink = `${this.motorApiUrl}api/deleteproductemployees`;
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
          "RiskId": rowData.RiskId,
         "EmployeeId": rowData.EmployeeId,
          "SectionId": SectionId
      }
      let urlLink = `${this.motorApiUrl}api/deleteproductemployees`;
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
    let entry = {
      "AccessoriesType": null,
      "ChassisNo": null,
      "SerialNo": null,
      "SumInsured": null,
      "RiskId": null,
      "SectionId": ""
    }
    this.currentAccessoriesIndex = this.machineries.length;
    this.editAccessoriesSection = false;
    this.enableAccessoriesEditSection = true;
    this.accessoriesList.push(entry);
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
  }
  onEditBuilding(index){
    this.currentBuildingIndex = index;
    this.editBuildingSection = true;
    this.enableBuildingEditSection = true;
    this.LocationName = this.building[index].LocationName;
    this.BuildingAddress = this.building[index].BuildingAddress;
    this.BuildingSuminsured = this.building[index].BuildingSuminsured;
    this.individualCommaFormatted('building');
  }

  onEditCyber(index){
    this.currentCyberIndex= index;
    this.editCyberSection = true;
    this.enableCyberSection= true;
    this.LocationId = this.CyberItem[index].RiskId;
    this.DeviceType = this.CyberItem[index].ItemId;
    this.Cyberyear= this.CyberItem[index].ManufactureYear;
    this.CyberMake = this.CyberItem[index].MakeAndModel;
    this.CyberSNo=this.CyberItem[index].SerialNoDesc;
    // this.individualCommaFormatted('Cyber');
  }

  PersonalAdd() {
    //this.Section=true;
    //this.PersonalAssistantList.push(rows);
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
    this.PersonalAssistantList = entry.concat(this.PersonalAssistantList);
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

  MachineryDelete(rows:any){
    const index = this.machineries.indexOf(rows);
    this.machineries.splice(index, 1);
    this.getTotalSICost('machinery');
  }
  AllAdd(){
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
    this.risk = entry.concat(this.risk);
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
    this.ElectronicItem.push(entry);
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
    this.Intermedity=entry.concat(this.Intermedity)
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
  getBack(){
    if(this.endorsementSection){
      if(this.endorseCategory=='Financial'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
      }
      else{
        this.router.navigate(['/Home/policies/Endorsements/endorsementTypes'])
      }
    }
    else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
  }
}
