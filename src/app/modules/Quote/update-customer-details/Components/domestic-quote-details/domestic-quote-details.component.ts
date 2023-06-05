import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; import { Router } from '@angular/router';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';


@Component({
  selector: 'app-domestic-quote-details',
  templateUrl: './domestic-quote-details.component.html',
  styleUrls: ['./domestic-quote-details.component.scss']
})
export class DomesticQuoteDetailsComponent implements OnInit {

  occupationTypeYN: any = 'Y'; maintenanceYN: any; constructionTypeYN: any; BuildingSuminsured: any;
  builtYear: any; builtArea: any; ContentSuminsured: any; quoteRefNo: any = null;
  public referenceNo: any = null;
  jsonList: any[] = []; occupationList: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; ageList: any[] = [];
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  minDate: Date; maxDate: Date; endMinDate: Date; customerDatas: any[] = []; customerData: any[] = [];
  public noOfDays: any; buildingForm: FormGroup; insuranceId: any;
  public clientName: any; idNumber: any; dateOfBirth: any; emailId: any; mobileNo: any; title: any; policyStartDate: string; policyEndDate: string; loginId: any;
  userDetails: any; userType: any; brokerbranchCode: any;
  productId: any; branchCode: any; agencyCode: any; adminSection: boolean; issuerSection: boolean;
  searchList: { Code: string; CodeDesc: string; }[]; executiveSection: boolean; currencyCode: any; exchangeRate: any; currencyList: any;
  commissionValue: any; executiveValue: any; BuildingType: any; locationId: any; brokerCode: any;
  brokerLoginId: string; applicationId: string; subUserType: any; premiumList: any; commonDetails: any[] = []; BuildingUsage: any;
  buildingUsageYn: any; BuildingCondition: any; OutbuildConstructType: any; BuildingOccupationType: any; BuildingBuildYear: any;
  BuidingAreaSqm: any; BuildingFloors: any; InbuildConstructType: any; HavePromoCode: any = 'N';
  BuildingUsageIdVelue: any; BuildingUsageList: any;
  totalValue = 0;
  LocationId: any;
  CdRefNo: any;
  MSRefNo: any;
  AsRefNo: any;
  VdRefNo: any;
  row: any; originatingWarehouse: any = 'originatingWarehouse';
  sumInsured: any;
  allRiskSection: boolean = false; buildingSection: boolean = false;
  personalAccidentSection: boolean = false; personalIntermeditySection: boolean = false;
  WorkmenCompensation:boolean =false;
  questionSection: boolean = true; uwQuestionList: any[] = [];
  requestReferenceNo: string;
  deletebutton: boolean=true;
  yearList:any[]=[];
  building: boolean;
  constructor(private sharedService: SharedService, private router: Router, private datePipe: DatePipe) {
    this.minDate = new Date();
    var d = this.minDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.maxDate = new Date(year, month, day + 90);
    this.searchList = [
      { "Code": "01", "CodeDesc": "Chassis Number" },
      { "Code": "02", "CodeDesc": "Register Number" },
    ];
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails", this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.locationId = this.userDetails.Result.LocationId;


    let details = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
    if (details) this.commonDetails = details;
    console.log("Reverse Edit", this.commonDetails);
    if (this.userType != 'Broker') {
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP') {
        this.adminSection = true; this.issuerSection = false;

      }
    }
    else {
      this.subUserType = sessionStorage.getItem('typeValue');
      if (this.subUserType == 'bank') {
        let bankCode = this.userDetails?.Result?.BankCode;
        this.executiveSection = true;

      }
      else {
        let referenceNo = sessionStorage.getItem('quoteReferenceNo');
        if (referenceNo) {
          this.quoteRefNo = referenceNo;
          this.getExistingBuildingList();
        }
        let customerId = sessionStorage.getItem('customerReferenceNo');
        if (customerId) {
          if (this.commonDetails.length != 0 && this.commonDetails != null) {
            console.log("Common Details are", this.commonDetails)
            let sectionList = this.commonDetails[0].SectionId;
            let allRisk = sectionList.find(ele => ele == '3');
            if (allRisk) this.allRiskSection = true;
            let building = sectionList.find(ele => ele == '1');
            if(building)this.buildingSection = true;
            let accidentRisk = sectionList.find(ele => ele == '35');
            if (accidentRisk) this.personalAccidentSection = true;
            let intermedity = sectionList.find(ele => ele == '36');
            if (intermedity) this.personalIntermeditySection = true;
            let workmen =sectionList.find(ele => ele == '48');
            if (workmen) this.WorkmenCompensation = true;
          }
        }
      }
    }
    this.createForm();
    this.getUWDetails();
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if (quoteRefNo) this.requestReferenceNo = quoteRefNo;
  }




  ngOnInit(): void {
    let referenceNo = sessionStorage.getItem('customerReferenceNo');
    if (referenceNo) {
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;

    }
    this.getCurrencyList();
    //  this.occupationList =[
    //   {Code:1,CodeDescription:'Doctor'},
    //   {Code:2,CodeDescription:'Engineer'},

    //  ]

    this.jsonList = [{
      "OccupationType": null,
      "Count": "",
      "SumInsuredTotal": "",
    }
    ]


  }
  getOccupationList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId":this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.occupationList = data.Result;
          this.premiunDropdown();
          this.getbuildingpurposeList();
        }
      },
      (err) => { },
    );
  }
  getTotalCost() {
    let totalValue = 0, i = 0;
    for (let entry of this.jsonList) {
      if (entry.SumInsuredTotal.includes(',')) { totalValue = totalValue + Number(entry.SumInsuredTotal.replace(/,/g, '')) }
      i += 1;
      if (i == this.jsonList.length) {
        this.totalValue = totalValue;
      }
    }
  }
  AddNew() {
    //this.jsonList.push();

    let entry = [{
      "OccupationType": null,
      "Count": "",
      "SumInsuredTotal": "",
    }]
    this.jsonList = this.jsonList.concat(entry);
    /*if(i==0){
      this.deletebutton=false;
    }*/

  }
  delete(row: any,i) {
    /*if(i==0){
      this.deletebutton=false;
    }
    else{
      this.deletebutton=true;
    }*/
    const index = this.jsonList.indexOf(row);
    this.jsonList.splice(index, 1);
    //this.Section=false;
  }

  clear(row,i){
    //this.jsonList.reload();
    console.log('RRRRRRR',row)
    /*row=[
      {
        "OccupationType": null,
      "Count":null,
      "SumInsuredTotal":null,
      }
    ]*/
    //row.clear();
    console.log('LLLLLLL',this.jsonList.length)
  row.OccupationType=null;
    row.Count=null;
    row.SumInsuredTotal=null;


  }

  onchange(value){
    if (this.buildingForm.controls['BuildingOwnerYn'].value=='Y'){
      this.buildingSection = true;

    }
    else if(this.buildingForm.controls['BuildingOwnerYn'].value=='N'){
      this.buildingSection = false;
     }


  }
  getCustomerDetails(referenceNo) {
    let ReqObj = {
      "CustomerReferenceNo": referenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data)
        if (data.Result) {
          let customerDetails: any = data.Result;
          this.setCustomerValues(customerDetails);
          this.clientName = customerDetails?.ClientName;
          this.idNumber = customerDetails?.IdNumber;
        }

      },
      (err) => { },
    );
  }
  setCustomerValues(customerDetails) {
    this.title = customerDetails?.TitleDesc;
    this.clientName = customerDetails?.ClientName;
    this.dateOfBirth = customerDetails?.DobOrRegDate;
    this.emailId = customerDetails?.Email1;
    this.mobileNo = customerDetails?.MobileNo1;
    this.idNumber = customerDetails?.IdNumber;

  }

  getCurrencyList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/currency`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.currencyList = data.Result;
          this.getOccupationList();
        }

      },
      (err) => { },
    );
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
          this.BuildingUsageList = res.Result;
        }
      },
      (err) => { },
    );
  }

  onStartDateChange() {
    console.log("Start Date", this.policyEndDate)
    var d = this.policyEndDate;
    // var year = d.getFullYear();
    // var month = d.getMonth();
    // var day = d.getDate();
    this.endMinDate = new Date(this.policyStartDate);
    // this.olicyEndDate = new Date(year + 1, month, day-1);
    // this.onChangeEndDate();

  }
  onOccupationChange(index) {
    let row = this.jsonList[index].OccupationType;
    if (this.jsonList.length != 0) {
      let i = 0;
      for (let entry of this.jsonList) {

      }
    }
  }
  onChangeEndDate() {
    const oneday = 24 * 60 * 60 * 1000;
    const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    const formattedDatecurrent = new Date(this.policyEndDate);
    console.log(formattedDate);

    console.log(formattedDatecurrent);

    this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
  }
  getExistingBuildingList() {
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data)
        let customerDatas = data.Result[0];
        this.buildingForm.controls['BuildingOwnerYn'].setValue(customerDatas.BuildingOwnerYn);
        this.buildingForm.controls['InbuildConstructType'].setValue(customerDatas.InbuildConstructType);
        this.buildingForm.controls['OccupationType'].setValue(customerDatas.OccupationType);
        this.buildingForm.controls['BuildingFloors'].setValue(customerDatas.BuildingFloors);
        this.buildingForm.controls['BuildingBuildYear'].setValue(customerDatas.BuildingBuildYear);
        this.buildingForm.controls['ExchangeRate'].setValue(customerDatas.ExchangeRate);
        this.buildingForm.controls['AcexecutiveId'].setValue(customerDatas.AcexecutiveId);
        this.buildingForm.controls['SectionId'].setValue(customerDatas.SectionId);
        this.buildingForm.controls['Currency'].setValue(customerDatas.Currency);
        this.buildingForm.controls['DomesticPackageYn'].setValue(customerDatas.DomesticPackageYn);
        this.jsonList = customerDatas.OccupationDetails;

        console.log('Jjjj', this.jsonList);
        //this.jsonList=customerDatas.OccupationDetails;
        /*this.['OccupationType'].setValue(customerDatas.OccupationDesc);
        this.jsonList['Count'].setValue(customerDatas.Count);
        this.jsonList['SumInsuredTotal'].setValue(customerDatas.AllriskSumInsured);*/
        /*if(this.buildingForm.controls['BuildingOwnerYn'].value=='Y'){
          this.buildingSection=true;
         }
         else if(this.buildingForm.controls['BuildingOwnerYn'].value=='N'){
           this.buildingSection=false;
         }*/
        if (customerDatas.AllriskSumInsured != null) {
          this.buildingForm.controls['AllriskSumInsured'].setValue(String(customerDatas.AllriskSumInsured));
          this.AllRiskSICommaFormatted();
        }
        if (customerDatas.ContentSuminsured != null) {
          this.buildingForm.controls['ContentSuminsured'].setValue(String(customerDatas.ContentSuminsured));
          this.ContentSICommaFormatted();
        }
        // if(customerDatas.PersonalAccidentSuminsured!=null){
        //   this.buildingForm.controls['PersonalAccidentSuminsured'].setValue(String(customerDatas.PersonalAccidentSuminsured));
        //   this.PersonalAccidentSICommaFormatted();
        // }
        if (customerDatas.PersonalIntermediarySuminsured != null) {
          this.buildingForm.controls['PersonalIntermediarySuminsured'].setValue(String(customerDatas.PersonalIntermediarySuminsured));
          this.PersonalIntermediaryCommaFormatted();
        }
        if (customerDatas.PersonalAccSuminsured != null) {
          this.buildingForm.controls['PersonalAccidentSuminsured'].setValue(String(customerDatas.PersonalAccSuminsured));
          this.PersonalAccidentCommaFormatted();
        }
        if (customerDatas.WorkmenCompSuminsured != null) {
          this.buildingForm.controls['WorkmenCompensationSuminsured'].setValue(String(customerDatas.WorkmenCompSuminsured));
          //console.log('wwwwwwwwww',this.buildingForm.controls['WorkmenCompensationSuminsured'].value)
          this.WorkmenCommaFormatted();
        }

        if (customerDatas.BuildingSuminsured != null) {
          this.buildingForm.controls['BuildingSuminsured'].setValue(String(customerDatas.BuildingSuminsured));
          this.CommaFormatted();
        }
        if (customerDatas.PaDeathSuminsured != null) {
          this.buildingForm.controls['DeathSuminsured'].setValue(String(customerDatas.PaDeathSuminsured));
          this.DeathSICommaFormatted();
        }
        if (customerDatas.PaMedicalSuminsured != null) {
          this.buildingForm.controls['MedicalSuminsured'].setValue(String(customerDatas.PaMedicalSuminsured));
          this.MedicalSICommaFormatted();
        }
        if (customerDatas.PaTotaldisabilitySumInsured != null) {
          this.buildingForm.controls['TotalDisableSuminsured'].setValue(String(customerDatas.PaTotaldisabilitySumInsured));
          this.TotalSICommaFormatted();
        }
        if (customerDatas.PaPermanentdisablementSuminsured != null) {
          this.buildingForm.controls['PartialDisableSuminsured'].setValue(String(customerDatas.PaPermanentdisablementSuminsured));
          this.PartialDisableSICommaFormatted();
        }
        this.buildingForm.controls['PolicyStartDate'].setValue(customerDatas.PolicyStartDate);
        this.buildingForm.controls['PolicyEndDate'].setValue(customerDatas.PolicyEndDate);
        const oneday = 24 * 60 * 60 * 1000;
        const momentDate = new Date(customerDatas.PolicyEndDate); // Replace event.value with your date value
        const formattedDate = moment(momentDate).format("YYYY-MM-DD");
        const formattedDatecurrent = new Date(customerDatas.PolicyStartDate);
        this.noOfDays = Math.round(Math.abs((Number(momentDate) - Number(formattedDatecurrent)) / oneday) + 1);
        this.buildingForm.controls['HavePromoCode'].setValue(customerDatas.Havepromocode);
        this.buildingForm.controls['Promocode'].setValue(customerDatas.Promocode);
        this.buildingForm.controls['BuildingUsageId'].setValue(customerDatas.BuildingUsageId);
        this.buildingForm.controls['InsuranceType'].setValue(customerDatas.InsuranceType);
        let insuranceType = customerDatas.InsuranceType
        this.buildingForm.controls['OutbuildConstructType'].setValue(customerDatas.OutbuildConstructType);
        if (this.commonDetails.length == 0 || this.commonDetails == null) {
          this.commonDetails = [{
            "PolicyStartDate": customerDatas.PolicyStartDate,
            "PolicyEndDate": customerDatas.PolicyEndDate,
            "Currency": customerDatas.Currency,
            "SectionId": customerDatas.SectionId,
            "AcexecutiveId": "",
            "ExchangeRate": customerDatas.ExchangeRate,
            "StateExtent": "",
            "NoOfDays": this.noOfDays,
            "HavePromoCode": customerDatas.Havepromocode,
            "Promocode": customerDatas.Promocode,
          }]
          sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails));
          let sectionList = this.commonDetails[0].SectionId;
          let allRisk = sectionList.find(ele => ele == '3');
          if (allRisk) this.allRiskSection = true;

          let building = sectionList.find(ele => ele == '1');
          if(building) this.buildingSection = true;
          /*if(building ||this.buildingForm.controls['BuildingOwnerYn'].value=='Y')
          {
            this.buildingSection = true;
          }
          else {
            delete this.commonDetails[0].SectionId
          }*/


           //if(building)this.buildingSection = true;
            //this.onchange( this.buildingForm.controls['BuildingOwnerYn'].value)

          /*if(this.buildingForm.controls['BuildingOwnerYn'].value=='Y'){
            this.buildingSection = true;
          }
          else if(this.buildingForm.controls['BuildingOwnerYn'].value=='N'){
            this.buildingSection = false;
          }*/

          let accidentRisk = sectionList.find(ele => ele == '35');
          if (accidentRisk) this.personalAccidentSection = true;
          let intermedity = sectionList.find(ele => ele == '36');
          if (intermedity) this.personalIntermeditySection = true;
          let workmen =sectionList.find(ele => ele == '48');
          if (workmen) this.WorkmenCompensation = true;

        }
      }

    );
  }
  createForm() {
    this.buildingForm = new FormGroup({
      BuildingOwnerYn: new FormControl(''),
      BuildingCondition: new FormControl(''),
      BuildingSuminsured: new FormControl('0', Validators.required),
      InbuildConstructType: new FormControl(''),
      BuildingFloors: new FormControl('',),
      BuildingBuildYear: new FormControl('',),
      BuidingAreaSqm: new FormControl(''),
      ExchangeRate: new FormControl('', Validators.required),
      AcexecutiveId: new FormControl(''),
      PersonalAccidentSuminsured: new FormControl('0'),
      BuildingUsageId: new FormControl(''),
      DomesticPackageYn: new FormControl(''),
      DeathSuminsured: new FormControl('0'),
      ContentSuminsured: new FormControl('0', Validators.required),
      InsuranceType: new FormControl(''),
      MedicalSuminsured: new FormControl('0'),
      Promocode: new FormControl(''),
      PartialDisableSuminsured: new FormControl('0'),
      PersonalIntermediarySuminsured: new FormControl('0'),
      WorkmenCompensationSuminsured:new FormControl('0'),
      OutbuildConstructType: new FormControl(''),
      OccupationType: new FormControl(''),
      HavePromoCode: new FormControl('N'),
      AllriskSumInsured: new FormControl('0'),
      SectionId: new FormControl('', Validators.required),
      Currency: new FormControl('', Validators.required),
      PolicyEndDate: new FormControl('', Validators.required),
      PolicyStartDate: new FormControl('', Validators.required),
      TotalDisableSuminsured: new FormControl('0'),

    });

  }


  onSave() {
    console.log("Final CommonDetails",this.commonDetails)
    let app
   let c
    let createdBy = "";
    createdBy = this.loginId;
    this.brokerCode = this.agencyCode;
    this.brokerLoginId = createdBy;;
    this.applicationId = "1";


    let appId = "1", loginId = "", brokerbranchCode = "";
    if (this.userType != 'Issuer') {
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;

    }
    else {
      appId = this.loginId;
      brokerbranchCode = null;
    }
    let startDate = "", endDate = "", medicalSI = "", deathSI = "", totalDisableSI = "", partialDisableSI = "", buildingSI = "", contentSI = "", allriskSI = "", personalIntSI = "", personalAccSI = "",
    workmenSI = "";
    /*if(this.buildingForm.controls['BuildingOwnerYn'].value=='Y'){
      if (this.buildingForm.controls['BuildingSuminsured'].value == undefined) buildingSI = null;
      else if (this.buildingForm.controls['BuildingSuminsured'].value.includes(',')) { buildingSI = this.buildingForm.controls['BuildingSuminsured'].value.replace(/,/g, '') }
      else buildingSI = this.buildingForm.controls['BuildingSuminsured'].value;
       c=this.commonDetails[0].SectionId
    }
    else{
      if (this.buildingForm.controls['BuildingSuminsured'].value == undefined) buildingSI = null;
      else if (this.buildingForm.controls['BuildingSuminsured'].value.includes(',')) { buildingSI = this.buildingForm.controls['BuildingSuminsured'].value.replace(/,/g, '') }
      else buildingSI = '0';



   let d= this.commonDetails[0].SectionId
       let a=d.filter(ele => ele == '1');
      c=this.commonDetails[0].SectionId.splice(a);
      //c=d.splice(this.commonDetails[0].SectionId =='1');
      console.log ('VVVVV',c)
      if (this.wsrccForm.controls['ModeOfTransportId'].value) {
        var countryId = this.transportList.filter((val) => {
          if (val.Code == this.wsrccForm.controls['ModeOfTransportId'].value) {
            return val
          }
        })
        console.log(countryId[0].Code);
      } else {
        countryId = [""];
      }
    let v=sessionStorage.setItem('homeCommonDetails', JSON.stringify(this.commonDetails));
        console.log('ttttttttt',this.commonDetails)
       let s= this.commonDetails[0].find((SectionId)=>{
      if(SectionId=='1') this.commonDetails[0].splice(SectionId,1)
  });




      //this.names.splice(i, 1);
      //delete this.commonDetails[0].SectionId;
      //this.commonDetails[0].SectionId=[]
    }*/
    if (this.buildingForm.controls['BuildingSuminsured'].value == undefined) buildingSI = null;
    else if (this.buildingForm.controls['BuildingSuminsured'].value.includes(',')) { buildingSI = this.buildingForm.controls['BuildingSuminsured'].value.replace(/,/g, '') }
    else buildingSI = this.buildingForm.controls['BuildingSuminsured'].value;
    if (this.buildingForm.controls['ContentSuminsured'].value == undefined) contentSI = null;
    else if (this.buildingForm.controls['ContentSuminsured'].value.includes(',')) { contentSI = this.buildingForm.controls['ContentSuminsured'].value.replace(/,/g, '') }
    else contentSI = this.buildingForm.controls['ContentSuminsured'].value;
    if (this.buildingForm.controls['AllriskSumInsured'].value == undefined) allriskSI = null;
    else if (this.buildingForm.controls['AllriskSumInsured'].value.includes(',')) { allriskSI = this.buildingForm.controls['AllriskSumInsured'].value.replace(/,/g, '') }
    else allriskSI = this.buildingForm.controls['AllriskSumInsured'].value;
    if (this.buildingForm.controls['PersonalIntermediarySuminsured'].value == undefined) personalIntSI = null;
    else if (this.buildingForm.controls['PersonalIntermediarySuminsured'].value.includes(',')) { personalIntSI = this.buildingForm.controls['PersonalIntermediarySuminsured'].value.replace(/,/g, '') }
    else personalIntSI = this.buildingForm.controls['PersonalIntermediarySuminsured'].value;

    if (this.buildingForm.controls['WorkmenCompensationSuminsured'].value == undefined) workmenSI = null;
    else if (this.buildingForm.controls['WorkmenCompensationSuminsured'].value.includes(',')) { workmenSI  = this.buildingForm.controls['WorkmenCompensationSuminsured'].value.replace(/,/g, '') }
    else workmenSI  = this.buildingForm.controls['WorkmenCompensationSuminsured'].value;


    if (this.buildingForm.controls['PersonalAccidentSuminsured'].value == undefined) personalAccSI = null;
    else if (this.buildingForm.controls['PersonalAccidentSuminsured'].value.includes(',')) { personalAccSI = this.buildingForm.controls['PersonalAccidentSuminsured'].value.replace(/,/g, '') }
    else personalAccSI = this.buildingForm.controls['PersonalAccidentSuminsured'].value;
    if (this.buildingForm.controls['MedicalSuminsured'].value == undefined) medicalSI = null;
    else if (this.buildingForm.controls['MedicalSuminsured'].value.includes(',')) { medicalSI = this.buildingForm.controls['MedicalSuminsured'].value.replace(/,/g, '') }
    else medicalSI = this.buildingForm.controls['MedicalSuminsured'].value;
    if (this.buildingForm.controls['PartialDisableSuminsured'].value == undefined) partialDisableSI = null;
    else if (this.buildingForm.controls['PartialDisableSuminsured'].value.includes(',')) { partialDisableSI = this.buildingForm.controls['PartialDisableSuminsured'].value.replace(/,/g, '') }
    else partialDisableSI = this.buildingForm.controls['PartialDisableSuminsured'].value;
    if (this.buildingForm.controls['TotalDisableSuminsured'].value == undefined) totalDisableSI = null;
    else if (this.buildingForm.controls['TotalDisableSuminsured'].value.includes(',')) { totalDisableSI = this.buildingForm.controls['TotalDisableSuminsured'].value.replace(/,/g, '') }
    else totalDisableSI = this.buildingForm.controls['TotalDisableSuminsured'].value;
    if (this.buildingForm.controls['DeathSuminsured'].value == undefined) deathSI = null;
    else if (this.buildingForm.controls['DeathSuminsured'].value.includes(',')) { deathSI = this.buildingForm.controls['DeathSuminsured'].value.replace(/,/g, '') }
    else deathSI = this.buildingForm.controls['DeathSuminsured'].value;
    let ReqObj = {
      "AcexecutiveId": this.commonDetails[0].AcexecutiveId,
      "AgencyCode": this.agencyCode,
      "AllriskSumInsured": allriskSI,
      "BdmCode": "",
      "ApplicationId": this.applicationId,
      "BranchCode": this.branchCode,
      "BrokerCode": this.brokerCode,
      "BrokerBranchCode": this.brokerbranchCode,
      "InsuranceType": this.buildingForm.controls['InsuranceType'].value,
      "OccupationType": this.buildingForm.controls['OccupationType'].value,
      "PersonalAccSuminsured": personalAccSI,
      "PersonalIntermediarySuminsured": personalIntSI,
      "WorkmenCompSuminsured":workmenSI,
      // "PaDeathSuminsured": deathSI,
      //"PaTotaldisabilitySumInsured": totalDisableSI,
      //"PaPermanentdisablementSuminsured": partialDisableSI,
      //"PaMedicalSuminsured": medicalSI,
      "BuildingUsageId": this.buildingForm.controls['BuildingUsageId'].value,
      "Promocode": this.commonDetails[0].Promocode,
      "Havepromocode": this.commonDetails[0].HavePromoCode,
      "BuildingBuildYear": this.buildingForm.controls['BuildingBuildYear'].value,
      "BuildingFloors": this.buildingForm.controls['BuildingFloors'].value,
      "BuildingOwnerYn": this.buildingForm.controls['BuildingOwnerYn'].value,
      "BuildingSuminsured": buildingSI,
      "OutbuildConstructType": this.buildingForm.controls['OutbuildConstructType'].value,
      "ConsecutiveDays": this.commonDetails[0].NoOfDays,
      "ContentSuminsured": contentSI,
      "Createdby": this.loginId,
      "UserType": this.userType,
      "DomesticPackageYn": this.commonDetails[0].DomesticPackageYn,
      "Currency": this.commonDetails[0].Currency,
      "CustomerReferenceNo": this.referenceNo,
      "ExchangeRate": this.commonDetails[0].ExchangeRate,
      "InbuildConstructType": this.buildingForm.controls['InbuildConstructType'].value,
      "InsuranceId": this.insuranceId,
      "LocationId": '1',
      "LoginId": this.loginId,
      "OccupationDetails": [],
      "PolicyEndDate": this.commonDetails[0].PolicyEndDate,
      "PolicyStartDate": this.commonDetails[0].PolicyStartDate,
      "ProductId": this.productId,
      "RequestReferenceNo": this.quoteRefNo,
      "SectionId": this.commonDetails[0].SectionId,
      "SubUsertype": this.subUserType,
      //this.commonDetails[0].SectionId
    }
    this.onformSubmit(ReqObj);
    // let occupationList = [];

    // if (this.personalAccidentSection) {
    //   let i = 0;
    //   for (let entry of this.jsonList) {
    //     if (entry.SumInsuredTotal.includes(',')) { entry.SumInsuredTotal = entry.SumInsuredTotal.replace(/,/g, '') }
    //     occupationList.push(entry);
    //     i += 1;
    //     if (i == this.jsonList.length) {
    //       ReqObj['OccupationDetails'] = occupationList;
          
    //     }
    //   }
    // }
    // else {
    //   ReqObj['OccupationDetails'] = occupationList;
    //   this.onformSubmit(ReqObj);
    // }

    // ReqObj['PolicyStartDate'] = this.datePipe.transform(this.commonDetails[0].PolicyStartDate, "dd/MM/yyyy");
    // ReqObj['PolicyEndDate'] = this.datePipe.transform(this.commonDetails[0].PolicyEndDate, "dd/MM/yyyy");

  }
  onformSubmit(ReqObj) {
    let urlLink = `${this.motorApiUrl}home/savebuildingdetails`;
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
          /*let type: NbComponentStatus = 'success';
              const config = {
                status: type,
                destroyByClick: true,
                duration: 4000,
                hasIcon: true,
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                preventDuplicates: false,
              };
              this.toastrService.show(
                'Building Details',
                'Building Details Inserted/Updated Successfully',
                config)*/

          if (data.Result) {
            this.requestReferenceNo = data?.Result[0]?.RequestReferenceNo;
            sessionStorage.setItem('quoteReferenceNo', this.referenceNo);
            this.onCalculate(data.Result);

          }
          // this.LocationId = data.Result.LocationId;
          // this.CdRefNo = data.Result.CdRefNo;
          // this.AsRefNo = data.Result.AsRefNo;
          // this.MSRefNo = data.Result.MSRefNo;
          // this.VdRefNo = data.Result.VdRefNo
          // let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
          // if(homeObj){
          //   homeObj[0]['LocationId'] = data.Result.LocationId;
          //   homeObj[0]['VdRefNo'] = data.Result.VdRefNo;
          //   homeObj[0]['CdRefNo'] = data.Result.CdRefNo;
          //   homeObj[0]['AsRefNo'] = data.Result.AsRefNo;
          //   homeObj[0]['MSRefNo'] = data.Result.MSRefNo;
          //   console.log("On Second Save",homeObj);

          //   sessionStorage.setItem('homeCommonDetails',JSON.stringify(homeObj));
          // }
          //this.getUWDetails();
        }

      },
      (err) => { },
    );
  }
  onCalculate(buildDetails) {
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if (quoteStatus == 'AdminRP') {
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }
    if (buildDetails.length != 0) {
      this.requestReferenceNo = buildDetails[0].RequestReferenceNo;
      sessionStorage.setItem('quoteReferenceNo', buildDetails[0].RequestReferenceNo);
      let i = 0;
      for (let build of buildDetails) {
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
          "RequestReferenceNo": sessionStorage.getItem('quoteReferenceNo')
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data) {
              i += 1;
              console.log("Indexxx", i, buildDetails.length)
              if (i == buildDetails.length) {
                this.onFinalProceed();
              }
            }
          },
          (err) => { },
        );
      }

    }
  }
  /*getUWDetails(){
    let ReqObj = {
    "Limit":"0",
    "Offset":"100",
    "ProductId": this.productId,
    "LoginId": this.loginId,
    "InsuranceId": this.insuranceId,
    "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        let res:any = data;
        this.uwQuestionList = res?.Result;
        if(this.uwQuestionList.length!=0){
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/underwriter-details'])

        }
        else{
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
          //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/domestic-risk-details'])

        }
      },
      (err) => { },
    );
  }*/



  // getCalculate(){
  //   let createdBy="";
  //   let homeObj = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
  //   let quoteStatus = sessionStorage.getItem('QuoteStatus');
  //   if(quoteStatus=='AdminRP'){
  //       createdBy = homeObj.CreatedBy;
  //       this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  //   }
  //   else{
  //     createdBy = this.loginId;
  //   }
  //   let ReqObj = {
  //     "InsuranceId": this.insuranceId,
  //     "BranchCode": this.branchCode,
  //     "AgencyCode": this.agencyCode,
  //     "SectionId": this.commonDetails[0].SectionId,
  //     "ProductId": this.productId,
  //     "MSRefNo": this.MSRefNo,
  //     "VehicleId": this.LocationId,
  //     "CdRefNo": this.CdRefNo,
  //     "VdRefNo": this.VdRefNo,
  //     "CreatedBy": createdBy,
  //     "productId": this.productId,
  //     "RequestReferenceNo": sessionStorage.getItem('RequestReferenceNo')
  //   }
  //   let urlLink = `${this.CommonApiUrl}calculator/calc`;
  //   this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
  //     (data: any) => {
  //       let res:any = data;
  //       homeObj[0]['CoverList'] = res?.CoverList;
  //       console.log("Final Obj",homeObj)
  //       sessionStorage.setItem('homeCommonDetails',JSON.stringify(homeObj));
  //       this.router.navigate(['/HomeIns/existingQuotes/customerSelection/recustomerDetails/excess-discount']);
  //     },
  //     (err) => { },
  //   );
  // }
  premiunDropdown() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.premiumList = data.Result;
          this.getYearList();
        }

      },
      (err) => { },
    );
  }
  getYearList(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    const currentYear = new Date().getFullYear()-40, years = [];
    while ( year >= currentYear ) {
      let yearEntry = year--
      years.push({"label":String(yearEntry),"value":String(yearEntry)});
      if(year==currentYear){
        let defaultObj = [{'label':'-Select-','value':''}]
        this.yearList = defaultObj.concat(years);

      }

    }
  }
  onSIValueChange(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {

    // format number
    if (this.buildingForm.controls['BuildingSuminsured'].value) {

      let value = this.buildingForm.controls['BuildingSuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['BuildingSuminsured'].setValue(value)
    }
  }
  ContentSICommaFormatted() {
    if (this.buildingForm.controls['ContentSuminsured'].value) {

      let value = this.buildingForm.controls['ContentSuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['ContentSuminsured'].setValue(value)
    }
  }
  AllRiskSICommaFormatted() {
    if (this.buildingForm.controls['AllriskSumInsured'].value) {

      let value = this.buildingForm.controls['AllriskSumInsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['AllriskSumInsured'].setValue(value)
    }
  }
  PersonalIntermediaryCommaFormatted() {
    if (this.buildingForm.controls['PersonalIntermediarySuminsured'].value) {

      let value = this.buildingForm.controls['PersonalIntermediarySuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['PersonalIntermediarySuminsured'].setValue(value)
    }
  }
  PersonalAccidentCommaFormatted(){
    if (this.buildingForm.controls['PersonalAccidentSuminsured'].value) {

      let value = this.buildingForm.controls['PersonalAccidentSuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['PersonalAccidentSuminsured'].setValue(value)
    }
  }
  WorkmenCommaFormatted() {
    if (this.buildingForm.controls['WorkmenCompensationSuminsured'].value) {
      let cost = this.buildingForm.controls['WorkmenCompensationSuminsured'].value;
      let value = cost.split('.')[0].replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['WorkmenCompensationSuminsured'].setValue(value)
    }
  }
  PartialDisableSICommaFormatted() {
    if (this.buildingForm.controls['PartialDisableSuminsured'].value) {
      let value = this.buildingForm.controls['PartialDisableSuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['PartialDisableSuminsured'].setValue(value)
    }
  }
  MedicalSICommaFormatted() {
    if (this.buildingForm.controls['MedicalSuminsured'].value) {

      let value = this.buildingForm.controls['MedicalSuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['MedicalSuminsured'].setValue(value)
    }
  }
  TotalSICommaFormatted() {
    if (this.buildingForm.controls['TotalDisableSuminsured'].value) {
      let value = this.buildingForm.controls['TotalDisableSuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['TotalDisableSuminsured'].setValue(value)
    }
  }
  TotalRowSIChange(index) {
    let value = this.jsonList[index].SumInsuredTotal;
    if (value) {
      let siVal = value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.jsonList[index].SumInsuredTotal = siVal;
      this.getTotalCost();
    }
  }

  DeathSICommaFormatted() {
    if (this.buildingForm.controls['DeathSuminsured'].value) {

      let value = this.buildingForm.controls['DeathSuminsured'].value.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.buildingForm.controls['DeathSuminsured'].setValue(value)
    }
  }
  onDeathSIChange() {
    let deathValue = this.buildingForm.controls['DeathSuminsured'].value;
    if (deathValue) {
      this.buildingForm.controls['MedicalSuminsured'].setValue(deathValue);
      this.buildingForm.controls['TotalDisableSuminsured'].setValue(deathValue);
      this.buildingForm.controls['PartialDisableSuminsured'].setValue(deathValue);
    }
  }



  getUWDetails() {
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
          this.getEditUwQuestions();
        }
        else {
          //this.getCurrencyList();
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
            console.log("Founded Question",entry)
            if (entry) { entry.Value = ques.Value };
            i += 1;
            if (i == uwList.length) {
              this.uwQuestionList.forEach(x => {
                x.Value = x.Value !='Y' ? 'N' : 'Y'
              });
              this.questionSection = true; console.log("Final UW 1 List", this.uwQuestionList); this.getCurrencyList();
            }
          }
        }
        else {
          this.uwQuestionList.forEach(x => {
            x.Value = x.Value !='Y' ? 'N' : 'Y'
          });
          this.questionSection = true;
          console.log("Final UW 2 List", this.uwQuestionList);
          this.getCurrencyList();
        }
      },
      (err) => { },
    );
  }


  onSaveUWQues(uwList) {
    if (uwList.length != 0) {
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if (data.Result) {
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
        },
        (err) => { },
      );
    }
  }

  checkUWValue(rowData, value) {
    return rowData.Value == value;
  }
  onSelectUW(rowData, value) {
    rowData.Value = value;
    console.log("Final Ques",rowData)
  }
  onFinalProceed() {
    /*let i=0,j=0;
    for(let veh of this.vehicleDetails){
      let refNo = veh?.MSRefNo;
      if(refNo == undefined){
        i+=1;
      }
      j+=1;
      if(j==this.vehicleDetails.length){
        console.log("Final I",i)
        if(i==0){
          sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetails));
          if(this.uwQuestionList.length!=0){
            let i = 0;
            let uwList:any[]=[];
            for(let ques of this.uwQuestionList){
              ques['BranchCode'] = this.branchCode;
              let createdBy="";
                let quoteStatus = sessionStorage.getItem('QuoteStatus');
                if(quoteStatus=='AdminRP'){
                    createdBy = this.vehicleDetails[0].CreatedBy;
                }
                else{
                  createdBy = this.loginId;
                }
              if(ques.QuestionType == '01'){

                ques['CreatedBy'] = createdBy;
                ques['RequestReferenceNo'] = this.requestReferenceNo;
                ques['UpdatedBy'] = this.loginId;
                //ques["VehicleId"] = this.vehicleId
                uwList.push(ques);
              }
              else if(ques.Value!=""){
                ques['CreatedBy'] = createdBy;
                ques['RequestReferenceNo'] = this.requestReferenceNo;
                ques['UpdatedBy'] = this.loginId;
                //ques["VehicleId"] = this.vehicleId
                uwList.push(ques);
              }
              i+=1;
              if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList);
            }
          }
          else{
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }

        }
        else{
          console.log("Redirecting to Save Data");
          //this.saveExistData();
        }
      }
    }*/
    console.log("UW List on Save", this.uwQuestionList);
    if (this.uwQuestionList.length != 0) {
      let i = 0;
      let uwList: any[] = [];
      for (let ques of this.uwQuestionList) {
        ques['BranchCode'] = this.branchCode;
        let createdBy = "";
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP') {
          //createdBy = this.vehicleDetails[0].CreatedBy;
        }
        else {
          createdBy = this.loginId;
        }
        if (ques.QuestionType == '01') {
          if (ques.Value == null || ques.Value == '') ques.Value = 'N';
          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = "1";
          //"BuildingUsageId":this.buildingForm.controls['BuildingUsageId'].value,
          uwList.push(ques);
        }
        else if (ques.Value != "") {
          if (ques.Value == null || ques.Value == '') ques.Value = 'N';
          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = "1"
          uwList.push(ques);
        }
        i += 1;
        if (i == this.uwQuestionList.length) {
          this.onSaveUWQues(uwList);
        }
      }
    }
    else {
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }

  }
}
