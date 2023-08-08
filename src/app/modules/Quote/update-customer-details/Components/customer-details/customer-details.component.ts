import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../shared/shared.service';
declare var $:any;
//import { ClientComponent } from '../../../../client/client.component';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  searchList:any[]=[];searchBy:any="";customerHeader:any[]=[];customerData:any[]=[];
  addSection:boolean = false;customerData2:any[]=[];customerHeader2:any[]=[];
  title: any;clientName: any;dateOfBirth: any;productValue:any;
  emailId: any;mobileNo: any;idNumber: any;productList:any[]=[];
  searchValue: string= "";vehicleWishList:any[]=[];minDate:Date;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  vehicleDetails: any;searchSection:boolean = false;
  referenceNo: any=null;wishSection:boolean = false;
  quoteRefNo: any;customerHeader3:any[]=[];noOfDays:any;minCurrencyRate:any;maxCurrencyRate:any;
  currencyList:any[]=[];exchangeRate:any;productId:any;policyStartDate:any;executiveValue:any=null;
  emptySection: boolean = false;userDetails:any;currencyCode:any;policyEndDate:any;commissionValue:any=null;
  loginId:any;userType:any;agencyCode:any;branchCode:any;insuranceId:any;commissionTypeList:any[]=[];
  endMinDate: Date;adminSection:boolean = false;issuerSection:boolean=false;executiveList:any[]=[];
  maxDate: Date;Code:any;brokerList:any[]=[];subUsertype:any;executiveSection:boolean=false;
  customerDetails:any;statusValue:any;HavePromoCode:any="N";PromoCode:any;
  editSection:boolean=true;commonSection:boolean=false;travelStartDate:any;
  code:any;travelEndDate:any;clientType:any;
  travelDetails: any;InsuranceType:any[]=[];
  PackageYn: any;IndustryId:any='';
  premiumList: any[]=[];
  policyStartError: boolean=false;policyPassDate: boolean=false;
  policyEndError: boolean=false;currencyError: boolean=false;
  exchangeMaxError: boolean=false; exchangeMinError: boolean=false;
  promoYNError: boolean=false;promoError: boolean=false;
  brokerCode: any=null;
  branchList: any[]=[];
  sourceCodeError: boolean;
  brokerCodeError: boolean;
  branchValue: any=null;customerCode:any;
  branchValueError: boolean;customerList:any[]=[];
  brokerSubUserType: any;
  executiveError: boolean;
  commissionError: boolean;
  customerCodeError: boolean;
  brokerLoginId: any=null;
  applicationId: any=null;
  brokerBranchCode: any;brokerBranchList:any[]=[];
  travelStartError: boolean;
  travelEndError: boolean;
  customerName: any;endorsementSection:boolean=false;
  endorsementId: any;showCustomerList:boolean = false;
  enableFieldsList: any;
  enablePolicyStart: any;
  enablePolicyEnd: any;
  orgPolicyNo: string;
  endorsePolicyNo: any;
  endorseCategory: any;
  endorsementName: any;
  enableAddVehicle: any;
  endorseEffectiveDate: any;
  enableCurrency:boolean = false;
  quoteNo: any = null;
  brokerbranchCode: any;
  industryList: any[];
  buildingOwnerYN: any = 'N';
  endMaxDate: Date;
  brokerBranchCodeError: boolean;
  endorsementDetails: any;
  countryId: any;
  cyrrencylogin: string;
  currentStatus: any;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,
    private updateComponent:UpdateCustomerDetailsComponent) {
      

    sessionStorage.removeItem('vehicleDetails');
    sessionStorage.removeItem('editVehicleId');
    sessionStorage.removeItem('editVehicleDetails');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails",this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.PackageYn= this.userDetails.Result.PackageYn
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.updateComponent.showStepperSection = true;
    this.subUsertype = sessionStorage.getItem('typeValue');
    let quoteNo = sessionStorage.getItem('quoteNo');
    if(quoteNo!=undefined && quoteNo!='undefined') this.quoteNo = quoteNo;
    if(this.userType!='Broker' || this.userType== 'User'){
       if(this.subUsertype=='bank'){
         let bankCode = this.userDetails?.Result?.BankCode;
         //this.executiveSection = true;
         this.getExecutiveList(bankCode,this.agencyCode);
       }
    }
    this.getCurrencyList();
    if(this.searchValue='' && this.searchValue==undefined && this.searchValue==null){
        
    }

   }

  ngOnInit(): void {
    this.cyrrencylogin=sessionStorage.getItem('CurrencyidLogin');
    if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1' || this.productId=='21' || this.productId=='26' || this.productId == '25'){this.getIndustryList()}
    this.customerHeader =  [
      { key: 'Chassisnumber', display: 'Chassis Number' },
      { key: 'Registrationnumber', display: 'Registration No' },
      { key: 'OverallPremiumFc', display: 'Premium' },
      { key: 'Vehiclemake', display: 'Make' },
      { key: 'Vehcilemodel', display: 'Model' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },

    ];
    this.customerHeader2 =  [
      {
        key: 'actions',
        display: 'Select',
        config: {
          select: true,
        },
      },
      { key: 'ReqChassisNumber', display: 'Chassis Number' },
      { key: 'Registrationnumber', display: 'Registration No' },
      { key: 'Vehiclemake', display: 'Make' },
      { key: 'Vehcilemodel', display: 'Model' },
      { key: 'Status', display: 'Status' },


    ];
    this.customerHeader3 =  [
      { key: 'ReqChassisNumber', display: 'Chassis Number' },
      { key: 'Registrationnumber', display: 'Registration No' },
      { key: 'Vehiclemake', display: 'Make' },
      { key: 'Vehcilemodel', display: 'Model' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isRemove: true,
        },
      },

    ];
    this.subUsertype = sessionStorage.getItem('typeValue');
    if(this.loginId=='guest'){
      if(this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId=='14' || this.productId=='32'  || this.productId=='1'){
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
          this.quoteRefNo = referenceNo;
          this.getExistingBuildingList();
        }
        else{
          this.quoteRefNo=null;
          this.branchValue = this.userDetails.Result.BranchCode;
          this.updateComponent.branchValue = this.branchValue;
          this.onGetCustomerList('direct',this.customerCode);
          this.currencyCode = this.userDetails.Result.CurrencyId;
          this.onCurrencyChange();
          this.searchSection = true;
          this.commonSection = true;
        }
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          this.adminSection = true;this.issuerSection = false;
        }
        else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
        else this.issuerSection = false
      }
      else if(this.productId!='4'){
        let vehicleDetails:any;
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
          this.quoteRefNo = referenceNo;
        }
        if(this.productId=='5'){
          vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
          //this.getExistingVehiclesList();
          //this.setCommonValues('direct');
        }
        else if(this.productId!='5'){
          vehicleDetails = JSON.parse( sessionStorage.getItem('homeCommonDetails'));
        }
        if(vehicleDetails!=undefined){
          if(vehicleDetails.length!=0 && (sessionStorage.getItem('quoteReferenceNo')==undefined)){
            this.quoteRefNo = null;
            this.setExistingValues(vehicleDetails);
          }
          else{
            let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
            if(referenceNo){
              this.quoteRefNo = referenceNo;
             if(this.productId=='5') this.getExistingVehiclesList();
             if(this.productId!='5' && this.productId!='4') this.getExistingBuildingList();
            }
            else{
              
              this.quoteRefNo=null;
              this.currencyCode = this.userDetails.Result.CurrencyId;
              this.onCurrencyChange();
              this.searchSection = true;
              this.commonSection = true;
              
            }
          }
  
        }
        else{
          let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
          if(referenceNo){
            this.quoteRefNo = referenceNo;
           if(this.productId=='5') this.getExistingVehiclesList();
           if(this.productId!='5' && this.productId!='4') this.getExistingBuildingList();
          }
          else{
            this.quoteRefNo=null;
            this.branchValue = this.userDetails.Result.BranchCode;
            this.updateComponent.branchValue = this.branchValue;
            this.currencyCode = this.userDetails.Result.CurrencyId;
            this.onCurrencyChange();
            this.onGetCustomerList('direct',this.customerCode);
              var d= new Date();
              var year = d.getFullYear();
              var month = d.getMonth();
              var day = d.getDate();
              if(this.productId=='5'){ this.policyStartDate = new Date(year,month, day+1 ); this.onStartDateChange()}
              this.searchSection = true;
            this.commonSection = true;
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
              this.adminSection = true;this.issuerSection = false;
            }
            else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
            else this.issuerSection = false;
          }
        }
      }
      else if(this.productId=='4'){
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
          this.quoteRefNo = referenceNo;
          this.getExistingTravelDetails();
        }
        else{
          this.quoteRefNo=null;
          this.branchValue = this.userDetails.Result.BranchCode;
          this.updateComponent.branchValue = this.branchValue;
          this.updateComponent.HavePromoCode = this.HavePromoCode;
          this.updateComponent.PromoCode = this.PromoCode;
          this.currencyCode = this.userDetails.Result.CurrencyId;
          this.onCurrencyChange();
          this.onGetCustomerList('direct',this.customerCode);
          this.searchSection = true;
          this.commonSection = true;
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
            this.adminSection = true;this.issuerSection = false;
          }
          else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
          else this.issuerSection = false
        }
      }
     
    }
    else {
      let referenceNo =  sessionStorage.getItem('customerReferenceNo');
      if(referenceNo){
        this.getCustomerDetails(referenceNo);
        this.referenceNo = referenceNo;
      }
    }
    
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus == 'AdminRA'){
      if(quoteStatus=='AdminRP') this.statusValue ="RP";
      else if(quoteStatus =='AdminRA') this.statusValue ="RA";
        this.adminSection = true;
    }
    else{
      if(quoteStatus) this.statusValue = quoteStatus;
      this.adminSection = false;
    }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementDetails = endorseObj;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        if(this.endorsementId!=42){
            this.enablePolicyStart = this.enableFieldsList.some(ele=>ele=='policyStartDate' || ele=='PolicyStartDate');
            this.enablePolicyEnd = this.enableFieldsList.some(ele=>ele=='policyEndDate' || ele=='PolicyEndDate');
            this.enableCurrency = this.enableFieldsList.some(ele=>ele=='Currency');
        }
        else{
          this.enablePolicyStart = false;
          this.enablePolicyEnd = false;
          this.enableCurrency = false;
        } 
      }
    }
    else{
      this.enablePolicyStart = false;
      this.enablePolicyEnd = false;
      this.enableCurrency = false;
    } 
    //this.change(this.currencyCode);
    //this.code=this.currencyCode;
    $(document).ready(function () {

      $('#CustomerInput').focus(function(){
        $('input-group').css("color","red");
      })
      let lastClick = null;
      $('#CustomerInput').mousedown(function (e) {
        lastClick = e.target;
      }).focus(function (e) {
        if (e.target != lastClick) {
          $(this).dropdown("toggle");
        }
        lastClick = null;
      });

      $('#CustomerInput').on('keyup', function () {
        var value = $(this).val().toLowerCase();

        $('.CustomerInput li').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });


    });
    if(!this.endorsementSection){
      this.minDate = new Date();
      var d = this.minDate;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.maxDate = new Date(year, month, day+90);
    }
    else{
  
    }
    
    
  }
  getIndustryList(){
    this.industryList = [];
    let ReqObj = {
      "CategoryId": null,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/industry`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let defaultObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
        this.industryList = defaultObj.concat(data.Result);
  
  
      },
      (err) => { },
    );
  }
  change(currencyCode)
  {
    /*//code= this.currencyCode
    console.log('y',currencyCode);
    if(currencyCode == "Tanzania Shillings")
    {
      console.log('TTTTTTT',this.currencyCode);
      this.editSection=false;
    }
    else{
      this.editSection=true;
    }*/

  }
  editChange(){
    this.router.navigate(['/Home/customer/Client']);
  }
  onchange()
  {
    //this.clientComponent.customerDetails = this.customerDetails;
    //this.clientComponent.onUpdateDetails();
    //sessionStorage.getItem('customerReferenceNo');
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){

      this.router.navigate(['/Home/existingQuotes/customerSelection']);
    }
   console.log(referenceNo);
  }
  getCustomerDetails(referenceNo){
    let ReqObj = {
      "CustomerReferenceNo": referenceNo
    }
    let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
          this.setCustomerValues(customerDetails);
          this.clientName = customerDetails?.ClientName
          this.idNumber = customerDetails?.IdNumber;
        }
      },
      (err) => { },
    );
  }
  setCustomerValues(customerDetails){
    this.title = customerDetails?.TitleDesc;
    this.clientName = customerDetails?.ClientName;
    this.dateOfBirth = customerDetails?.DobOrRegDate;
    this.emailId = customerDetails?.Email1;
    this.mobileNo = customerDetails?.MobileNo1;
    this.idNumber = customerDetails?.IdNumber;
    this.clientType = customerDetails?.PolicyHolderType;
    if(this.productId == '6' || this.productId == '16' || this.productId == '39' || this.productId=='14' || this.productId=='32'  || this.productId=='1'){
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
        this.getExistingBuildingList();
      }
      else{
        this.quoteRefNo=null;
        this.branchValue = this.userDetails.Result.BranchCode;
        this.updateComponent.branchValue = this.branchValue;
        this.onGetCustomerList('direct',this.customerCode);
        this.currencyCode = this.userDetails.Result.CurrencyId;
        this.onCurrencyChange();
        this.searchSection = true;
        this.commonSection = true;
      }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        this.adminSection = true;this.issuerSection = false;
      }
      else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
      else this.issuerSection = false
    }
    else if(this.productId!='4'){
      let vehicleDetails:any;
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
      }
      if(this.productId=='5'){
        vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
        //this.getExistingVehiclesList();
        //this.setCommonValues('direct');
      }
      else if(this.productId!='5'){
        vehicleDetails = JSON.parse( sessionStorage.getItem('homeCommonDetails'));
      }
      if(vehicleDetails!=undefined){
        if(vehicleDetails.length!=0 && (sessionStorage.getItem('quoteReferenceNo')==undefined)){
          this.quoteRefNo = null;
          this.setExistingValues(vehicleDetails);
        }
        else{
          let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
          if(referenceNo){
            this.quoteRefNo = referenceNo;
           if(this.productId=='5') this.getExistingVehiclesList();
           if(this.productId!='5' && this.productId!='4') this.getExistingBuildingList();
          }
          else{
            this.quoteRefNo=null;
            this.currencyCode = this.userDetails.Result.CurrencyId;
            this.onCurrencyChange();
            this.searchSection = true;
            this.commonSection = true;
          }
        }

      }
      else{
        let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
        if(referenceNo){
          this.quoteRefNo = referenceNo;
         if(this.productId=='5') this.getExistingVehiclesList();
         if(this.productId!='5' && this.productId!='4') this.getExistingBuildingList();
        }
        else{
          this.quoteRefNo=null;
          this.branchValue = this.userDetails.Result.BranchCode;
          this.updateComponent.branchValue = this.branchValue;
          this.currencyCode = this.userDetails.Result.CurrencyId;
          this.onCurrencyChange();
          this.onGetCustomerList('direct',this.customerCode);
            var d= new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            if(this.productId=='5'){ this.policyStartDate = new Date(year,month, day+1 ); this.onStartDateChange()}
          this.searchSection = true;
          this.commonSection = true;
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
            this.adminSection = true;this.issuerSection = false;
          }
          else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
          else this.issuerSection = false;
        }
      }
    }
    else if(this.productId=='4'){
      let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
        this.getExistingTravelDetails();
      }
      else{
        this.quoteRefNo=null;
        this.branchValue = this.userDetails.Result.BranchCode;
        this.updateComponent.branchValue = this.branchValue;
        this.updateComponent.HavePromoCode = this.HavePromoCode;
        this.updateComponent.PromoCode = this.PromoCode;
        this.currencyCode = this.userDetails.Result.CurrencyId;
        this.onCurrencyChange();
        this.onGetCustomerList('direct',this.customerCode);
        this.searchSection = true;
        this.commonSection = true;
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
          this.adminSection = true;this.issuerSection = false;
        }
        else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
        else this.issuerSection = false
      }
    }
  }
  checkDisableField(){
    let status = sessionStorage.getItem('QuoteStatus');
    return (this.adminSection && (status=='AdminRP' || status=='AdminRA'))
  }
  getExistingBuildingList(){
    let urlLink:any;
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "RiskId":"1",
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId
    }
    if(this.productId=='3') urlLink = `${this.motorApiUrl}home/getbuildingdetails`;
    else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14'  || this.productId=='19' || this.productId=='32' || this.productId=='1' || this.productId=='26' || this.productId=='21' || this.productId == '25') urlLink = `${this.motorApiUrl}api/slide/getcommondetails`;
    else urlLink =  `${this.motorApiUrl}api/geteservicebyriskid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customerData = data.Result;
              let entry:any;
              if(this.productId=='3') entry = this.customerData[0];
              else entry = this.customerData
                if(entry?.EndorsementDate!=null){
                  this.endorsementDetails['EndorsementDate'] = entry?.EndorsementDate;
                  this.endorsementDetails['EndorsementEffectiveDate'] = entry?.EndorsementEffectiveDate;
                  this.endorsementDetails['EndorsementRemarks'] = entry?.EndorsementRemarks;
                  this.endorsementDetails['EndorsementType'] = entry?.EndorsementType;
                  this.endorsementDetails['EndorsementTypeDesc'] = entry?.EndorsementTypeDesc;
                  this.endorsementDetails['EndtCategoryDesc'] = entry?.EndtCategoryDesc;
                  this.endorsementDetails['EndtCount'] = entry?.EndtCount;
                  this.endorsementDetails['EndtPrevPolicyNo'] = entry?.EndtPrevPolicyNo;
                  this.endorsementDetails['EndtPrevQuoteNo'] = entry?.EndtPrevQuoteNo;
                  this.endorsementDetails['EndtStatus'] = entry?.EndtStatus;
                  this.endorsementDetails['IsFinanceEndt'] = entry?.IsFinanceEndt;
                  this.endorsementDetails['OrginalPolicyNo'] = entry?.OrginalPolicyNo;
                  sessionStorage.setItem('endorseTypeId',JSON.stringify(this.endorsementDetails));
                }
              this.applicationId = entry.ApplicationId;
              if(entry?.PolicyStartDate != null ){
                var dateParts = entry?.PolicyStartDate.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
                //this.policyStartDate = dateObject.toString()
              }
              if(entry?.PolicyEndDate != null ){
                var dateParts = entry?.PolicyEndDate.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
                this.onChangeEndDate();
              }
              //this.executiveValue = entry?.AcExecutiveId;
              this.currencyCode = entry?.Currency;
              this.exchangeRate = entry?.ExchangeRate;
              this.onCurrencyChange();
              this.IndustryId = entry?.IndustryId;
              this.executiveValue= entry?.AcExecutiveId;
              this.InsuranceType=entry?.SectionId;
              this.HavePromoCode=entry?.Havepromocode;
              if(entry.BuildingOwnerYn!=null && entry?.BuildingOwnerYn!='') this.buildingOwnerYN = entry?.BuildingOwnerYn;
              this.PromoCode=entry?.Promocode;
              this.Code = entry?.SourceType;
              this.updateComponent.sourceType = this.Code;
              this.branchValue = entry?.BranchCode;
              this.updateComponent.branchValue = this.branchValue;
              this.brokerBranchCode = entry?.BrokerBranchCode;
              this.customerCode = entry?.CustomerCode;
              this.brokerCode = entry?.BrokerCode;
              this.currentStatus = entry?.Status;
              this.onSourceTypeChange('direct');
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                this.adminSection = true;this.issuerSection = false;
              }
              else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
              else this.issuerSection = false
            }
            console.log(
              "Code",this.Code,this.branchValue,this.brokerBranchCode,this.customerCode,this.brokerCode
            )
            this.onGetCustomerList('direct',this.customerCode);
      },
      (err) => { },
    );
  }
  setExistingValues(vehicleList){
    console.log("Vehicles on Session",vehicleList)
    this.customerData = [];this.vehicleWishList=[];
      if(vehicleList.length!=0){
        let i=0;
        for(let vehicle of vehicleList){
          if(i==0){
            let entry = vehicle;

            if(entry?.PolicyStartDate != null ){
              var dateParts = entry?.PolicyStartDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              //this.policyStartDate = dateObject.toString()
            }
            if(entry?.PolicyEndDate != null ){
              var dateParts = entry?.PolicyEndDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              this.onChangeEndDate();
            }
            this.commissionValue = entry?.CommissionType;
            this.executiveValue = entry?.AcExecutive;
            this.Code = entry?.SourceType;
            this.updateComponent.sourceType = this.Code;
            this.brokerCode = entry.BrokerCode;
            this.branchValue = entry?.BranchCode;
            this.updateComponent.branchValue = this.branchValue;
            this.brokerBranchCode = entry?.BrokerBranchCode;
            this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            this.brokerLoginId = entry?.LoginId;
            this.customerCode = entry.CustomerCode;
            this.onSourceTypeChange('direct');
            
            this.currencyCode = entry?.Currency;
            this.exchangeRate = entry?.ExchangeRate;
            this.onCurrencyChange();
            this.HavePromoCode = entry.HavePromoCode;
            //this.updateComponent.HavePromoCode = entry.HavePromoCode;
            if(entry.Promocode){
              this.updateComponent.PromoCode = entry.Promocode;
              this.PromoCode = entry.Promocode;
            }
            else if(entry.PromoCode){ this.updateComponent.PromoCode = entry.PromoCode; this.PromoCode = entry.PromoCode; }
            this.InsuranceType=entry?.SectionId;
            this.onGetCustomerList('direct',this.customerCode);
            console.log("Currency",this.currencyCode,this.exchangeRate,this.HavePromoCode,entry,this.PromoCode)
          }
          if(this.currencyCode=="TZS"){ this.editSection=false; }
          else{ this.editSection=true; }
          if(vehicle.Active){  this.customerData.push(vehicle); }
          else{
            this.wishSection=true;
            this.searchSection = true;
            this.vehicleWishList.push(vehicle);
          }
          i+=1;
          if(i==vehicleList.length){
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
              this.adminSection = true;this.issuerSection = false;
            }
            else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
            else this.issuerSection = false
            this.updateComponent.vehicleWishList = this.vehicleWishList;
            this.updateComponent.customerData = this.customerData;
            console.log("Updated Wishlist ",this.updateComponent.vehicleWishList)
            this.commonSection = true;
          }
        }
      }
  }
  getSourceList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.productList = data.Result;
            this.premiunDropdown()
            //console.log(this.sourceCode)



        }
        /*if(this.sourceCode =='Broker')
        {
        this.getBrokersList();
        }
      else(this.sourceCode =='Agent')
      {
        //this.getBranchList()
      }*/

      },

      (err) => { },
    );
  }
  premiunDropdown(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":"3",
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.premiumList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getExecutiveList(branchCode,oaCode){
    let ReqObj = {
      "OaCode": oaCode,
      "BankCode": branchCode,
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId" : this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/acexecutive`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.executiveList = data.Result;
            this.getCommissionTypeList();
        }
      },

      (err) => { },
    );
  }
  getCommissionTypeList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "TableName": ""
    }
    let urlLink = `${this.CommonApiUrl}dropdown/commissiontype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.commissionTypeList = data.Result;
      },
      (err) => { },
    );
  }
  onSourceTypeChange(type){
    let ReqObj = {
      "SourceType": this.Code,
      "BranchCode":  this.branchValue,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}api/search/premiasourcecode`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          //this.branchList = data.Result;
          this.updateComponent.sourceType = this.Code;
          this.brokerList = data.Result;
          //if(this.Code=='Agent') this.executiveSection = true;
          if(type=='change'){
            this.brokerCode = null;
            this.brokerBranchCode = null;
          }
          else{
            //if(this.Code=='Broker' || this.Code=='Agent'){
              let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
              if(entry){
                this.brokerLoginId = entry.Name; 
                this.updateComponent.brokerLoginId = this.brokerLoginId;
                this.updateComponent.brokerCode = this.brokerCode;
              }
              this.getBrokerBranchList('direct');
            // }
            // else if(this.brokerCode){
            //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
            //  if(entry){
            //   this.brokerLoginId = entry.Name; 
            //   this.brokerBranchCode = null;
            //   this.updateComponent.brokerCode = this.brokerCode;
            //   this.updateComponent.brokerLoginId = this.brokerLoginId;
            //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
            //  }
             
            // }
          }
          
      },
      (err) => { },
    );
    
  }
  onBranchValueChange(){
    this.updateComponent.branchValue = this.branchValue;
  }
  onBrokerChange(){
    //if(this.Code=='Broker' || this.Code=='Agent'){
      let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
      if(entry){
        this.brokerLoginId = entry.Name; 
        this.updateComponent.brokerLoginId = this.brokerLoginId;
        this.updateComponent.brokerCode = this.brokerCode;
      }
      this.getBrokerBranchList('change');
    // }
    // else if(this.brokerCode){
    //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
    //  if(entry){
    //   this.brokerLoginId = entry.Name; 
    //   this.brokerBranchCode = null;
    //   this.updateComponent.brokerCode = this.brokerCode;
    //   this.updateComponent.brokerLoginId = this.brokerLoginId;
    //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
    //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
    //  }
     
    // }
  }
  onBrokerBranchChange(){
    this.updateComponent.brokerBranchCode = this.brokerBranchCode;
  }
  getBrokerBranchList(type){
    let urlLink = `${this.ApiUrl1}api/brokerbranches`;
    let ReqObj = {
      "BrokerCode": this.brokerCode,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
  }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.brokerBranchList = data?.Result;
            if(type=='change' && this.brokerBranchList.length==1){
              this.brokerBranchCode = this.brokerBranchList[0].Code;
              this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            }
          }
        },
        (err) => { },
      );
  }
  getBrokersList(){
    let urlLink = `${this.CommonApiUrl}admin/dropdown/brokerids`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.brokerList = data?.Result;
            
            /*if(this.brokerValue!=undefined && this.insuranceId!=undefined){
              let useObj = {"broker":this.brokerValue,"insuranceId":this.insuranceId};
              sessionStorage.setItem('adduserDetailsObj',JSON.stringify(useObj));
            }*/

            //this.getInsuranceList();

        }
      },
      (err) => { },
    );
  }
  onGetCustomerList(type,code){
    console.log("Code",code)
    if(code!='' && code!=null && code!=undefined){
      let ReqObj = {
        "SourceType": this.Code,
      "BranchCode":  this.branchValue,
      "InsuranceId": this.insuranceId,
      "SearchValue":code,
      "ProductId": this.productId
      }
      let urlLink = `${this.ApiUrl1}api/search/premiacustomercode`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
              this.customerList = data.Result;
              if(type=='change'){
                this.showCustomerList = true;
                this.customerName = null;
              }
              else{
                this.showCustomerList = false;
                let entry = this.customerList.find(ele=>ele.Code==this.customerCode);
                this.customerName = entry.Name;
                this.setCustomerValue(this.customerCode,this.customerName)
              }
              
        },
        (err) => { },
      );
    }
    else{
      this.customerList = [];
    }
  }
  setCustomerValue(code,name){
    this.showCustomerList = false;
      this.customerCode = code;
      this.customerName = name;
      this.updateComponent.CustomerCode = code;
  }
  setCommonValues(entry){
    console.log("Entry Values",entry);
    if(entry?.PolicyStartDate != null ){
      var dateParts = entry?.PolicyStartDate.split("/");
      // month is 0-based, that's why we need dataParts[1] - 1
      this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
      this.updateComponent.policyStartDate = this.policyStartDate;
      this.updateComponent.idNumber = this.idNumber
      //this.policyStartDate = dateObject.toString()
    }
    if(entry?.PolicyEndDate != null ){
      var dateParts = entry?.PolicyEndDate.split("/");
      // month is 0-based, that's why we need dataParts[1] - 1
      this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
      this.updateComponent.policyEndDate = this.policyEndDate;
      this.onChangeEndDate();
    }
    this.HavePromoCode = entry?.HavePromoCode;
    this.PromoCode = entry?.PromoCode;
    this.Code = entry?.SourceType;
    this.customerCode = entry?.CustomerCode;
    this.branchValue = entry.BranchCode;
    this.brokerCode = entry.BrokerCode;
    this.brokerBranchCode = entry.BrokerBranchCode;
    this.updateComponent.sourceType = this.Code;
    this.updateComponent.brokerCode = this.brokerCode;
    this.updateComponent.brokerBranchCode = this.brokerBranchCode;
    
    this.onSourceTypeChange('direct');
    this.executiveValue = entry?.AcExecutiveId;
    this.currencyCode = entry?.Currency;
    this.onCurrencyChange();
    this.updateComponent.exchangeRate = entry?.ExchangeRate;
    this.updateComponent.HavePromoCode = entry?.HavePromoCode;
    this.updateComponent.PromoCode = entry?.PromoCode;
    this.onGetCustomerList('direct',this.customerCode);
  }
  onExchangeRateChange(){
    this.updateComponent.exchangeRate = this.exchangeRate;
  }
  getExistingTravelDetails(){
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo,
      "TravelId": "1"
      }
    let urlLink = `${this.motorApiUrl}api/gettraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
            let customerDatas = data.Result;
            this.applicationId = customerDatas.ApplicationId;
            let quoteStatus = sessionStorage.getItem('QuoteStatus');
            if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
              this.adminSection = true;this.issuerSection = false;
            }
            else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
            else this.issuerSection = false
            this.travelDetails = customerDatas;
            this.Code= customerDatas.SourceType;
            this.updateComponent.sourceType = this.Code;
            this.branchValue = customerDatas.BranchCode;
            this.brokerBranchCode = customerDatas.BrokerBranchCode;
            this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            this.updateComponent.branchValue = customerDatas.BranchCode;
            this.brokerCode = customerDatas.BrokerCode;
            this.onSourceTypeChange('direct');
           this.updateComponent.brokerCode = customerDatas.BrokerCode;
            this.HavePromoCode = customerDatas.HavePromoCode;
            this.updateComponent.HavePromoCode = customerDatas.HavePromoCode;
            this.PromoCode = customerDatas.PromoCode;
            this.updateComponent.PromoCode = customerDatas.PromoCode;
            this.customerCode = customerDatas.CustomerCode;
            this.updateComponent.CustomerCode = customerDatas.CustomerCode;
            
            this.executiveValue = customerDatas?.AcExecutiveId;
            this.commissionValue = customerDatas?.CommissionType;
            if(customerDatas?.TravelStartDate != null ){
              var dateParts = customerDatas?.TravelStartDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.travelStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              this.updateComponent.travelStartDate = this.travelStartDate;
              //this.policyStartDate = dateObject.toString()
            }
            if(customerDatas?.TravelEndDate != null ){
              var dateParts = customerDatas?.TravelEndDate.split("/");
              // month is 0-based, that's why we need dataParts[1] - 1
              this.travelEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
              this.updateComponent.travelEndDate = this.travelEndDate;
              this.onChangeEndDate();
            }
          //  this.TravelForm.controls['travelStartDate'].setValue(customerDatas.TravelStartDate);
          //  this.TravelForm.controls['travelEndDate'].setValue(customerDatas.TravelEndDate);
           this.currencyCode = customerDatas.Currency;
           this.onCurrencyChange();
           //this.exchangeRate = customerDatas.ExchangeRate;
           this.commonSection = true;
           this.onGetCustomerList('direct',this.customerCode);
      },
      (err) => { },
    );
  }
  onCustomerChange(){
    this.updateComponent.CustomerCode = this.customerCode;
  }
  getExistingVehiclesList(){
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.customerData = data.Result;
            console.log("Edit Customer Final 1",this.customerData)
            if(this.customerData.length!=0){
              this.applicationId = this.customerData[0].ApplicationId;
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                this.adminSection = true;this.issuerSection = false;
              }
              else if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.adminSection=false; }
              else this.issuerSection = false
              let entry = this.customerData[0];
              this.commonSection = true;
             this.setCommonValues(entry);
            }
        }
      },
      (err) => { },
    );
  }
  getCurrencyList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productcurrency`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.currencyList = data.Result;
            if(this.currencyCode) this.onCurrencyChange();
            this.getSourceList();
        }

      },
      (err) => { },
    );
  }
  onCurrencyChange(){
    if(this.currencyCode!=null && this.currencyCode!=''){
      let currencyData = this.currencyList.find(ele=>ele.Code==this.currencyCode);
      this.exchangeRate = currencyData?.ExchangeRate;
      this.minCurrencyRate = currencyData?.MinRate;
      this.maxCurrencyRate = currencyData?.MaxRate;
      this.updateComponent.CurrencyCode = this.currencyCode;
      this.updateComponent.exchangeRate = this.exchangeRate;

    }
    console.log('CCCCCCCC',this.currencyCode)

    if(this.currencyCode=="TZS")
    {
      this.editSection=false;
    }
    else{
      this.editSection=true;
    }
  }
  onStartDateChange(){
    if(this.productId!='4'){
      var d = this.policyStartDate;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.endMinDate = new Date(this.policyStartDate);
      this.policyEndDate = new Date(year + 1, month, day-1);
      this.endMaxDate = new Date(year + 2, month, day-1);
      this.updateComponent.idNumber = this.idNumber
      this.updateComponent.policyStartDate = this.policyStartDate;
      //this.updateComponent.policyEndDate = this.policyEndDate;
      this.updateComponent.HavePromoCode = this.HavePromoCode;
      this.updateComponent.PromoCode = this.PromoCode;
      this.onChangeEndDate();
    }
    else{
      var d = this.travelStartDate;
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.endMinDate = new Date(this.travelStartDate);
      this.endMaxDate = new Date(year + 1, month, day-1);
       this.updateComponent.travelStartDate = this.travelStartDate;
      if(this.noOfDays!='' && this.noOfDays!=undefined && this.noOfDays!=null){
        this.travelEndDate = new Date(year, month, day+Number(this.noOfDays-1));
        //this.endMaxDate = new Date(year + 1, month, day-1);
        this.updateComponent.travelStartDate = this.travelStartDate;
        this.updateComponent.travelEndDate = this.travelEndDate;
      }
    }
  }
  onPromoYNChange(){
    let value = this.HavePromoCode;
    if(value=='N'){
      this.PromoCode=null;
    }
    this.updateComponent.HavePromoCode = this.HavePromoCode;
    this.updateComponent.PromoCode= this.PromoCode;
  }
  onPromoCodeChange(){
    this.updateComponent.PromoCode= this.PromoCode;
  }
  onChangeEndDate(){
    if(this.productId!='4'){
    const oneday = 24 * 60 * 60 * 1000;
    const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    const formattedDatecurrent = new Date(this.policyStartDate);
    console.log(formattedDate);
    this.updateComponent.policyStartDate = this.policyStartDate;
    this.updateComponent.policyEndDate = this.policyEndDate;
    this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    this.updateComponent.noOfDays = this.noOfDays;
    }
    else{
    const oneday = 24 * 60 * 60 * 1000;
    const momentDate = new Date(this.travelEndDate); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    const formattedDatecurrent = new Date(this.travelStartDate);
    console.log(formattedDate);
    this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
    this.updateComponent.travelStartDate = this.travelStartDate;
    this.updateComponent.travelEndDate = this.travelEndDate;
    this.updateComponent.noOfDays = this.noOfDays;
    }
  }
  onVehicleSubmit(){
    sessionStorage.setItem('vehicleType','edit');
    this.updateComponent.resetVehicleTab();
    this.vehicleDetails['Vehicleid'] = String(this.customerData.length+1)
    sessionStorage.setItem('vehicleDetails',JSON.stringify(this.vehicleDetails));
    console.log("On Final Vehicle List 8",this.vehicleDetails)
    if(this.endorsementSection && this.enableAddVehicle) sessionStorage.removeItem('editVehicleId')
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
  }
  onAddVehicleWishList(){
    this.wishSection = false;
    let list:any[] = this.vehicleWishList;
    let entry = this.vehicleWishList.find(ele=>ele.ReqChassisNumber == this.vehicleDetails.ReqChassisNumber);
    console.log(entry,this.vehicleDetails)
    if(entry == undefined){
      this.vehicleWishList = [];
      this.vehicleWishList = list.concat([this.vehicleDetails]);
      this.wishSection = true;
      this.vehicleDetails = null;
    }
    this.searchBy = ""; this.searchValue = "";
    this.customerData2 = [];
    console.log(entry,this.vehicleDetails,this.vehicleWishList)
  }
  onEditVehicle(rowData){
    if(this.statusValue=='RA'){
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
    }
    else{
      if(rowData.SavedFrom == 'Customer'){
        sessionStorage.setItem('vehicleType','new');
        this.updateComponent.resetVehicleTab();
        sessionStorage.setItem('editVehicleDetails',rowData.Chassisnumber)
        sessionStorage.setItem('editVehicleId',String(rowData.Vehicleid));
        if(this.endorsementSection && this.enableAddVehicle) sessionStorage.removeItem('editVehicleId')
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details'])
      }
      else{
        sessionStorage.setItem('vehicleType','edit');
        this.updateComponent.resetVehicleTab();
         sessionStorage.setItem('editVehicleId',String(rowData.Vehicleid));
         if(this.endorsementSection && this.enableAddVehicle) sessionStorage.removeItem('editVehicleId')
         this.setVehicleList(this.customerData,'direct',null);
       // this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
      }
    }

  }
  redirectCreateVehicle(event){
      this.vehicleWishList = event.vehicleWishList;
      this.customerData = event.customerData;
      console.log("Edit Customer Final 2",this.customerData)
      this.onCreateVehicle();
  }
  onCreateVehicle(){
    let validDetais = this.checkMandatories();
        if(validDetais){
          if(this.policyStartDate!='' && this.policyStartDate!=undefined && this.policyStartDate!=null){
            this.policyStartError = false;
            if(this.policyEndDate!='' && this.policyEndDate!=undefined && this.policyEndDate!=null){
             this.policyEndError = false;
              if(this.currencyCode!='' && this.currencyCode!=undefined && this.currencyCode!=null){
               this.currencyError = false;
                if(Number(this.exchangeRate) >= Number(this.minCurrencyRate) && Number(this.exchangeRate) <= Number(this.maxCurrencyRate)){
                  this.exchangeMaxError = false;this.exchangeMinError = false;
                  if(this.HavePromoCode!='' && this.HavePromoCode!=undefined && this.HavePromoCode!=null){
                    this.promoYNError = false;
                    if(this.HavePromoCode=='N'){
                      this.promoError = false;
                      if(this.vehicleWishList.length!=0 || this.customerData.length!=0){
                        this.PromoCode = null;
                        this.createVehicleProceed();
                      }
                      else{
                        this.PromoCode = null;
                        sessionStorage.removeItem('vehicleDetailsList');
                        sessionStorage.setItem('vehicleLength',String(1))
                        sessionStorage.setItem('vehicleType','new');
                        sessionStorage.removeItem('vehicleDetails');
                        this.updateComponent.resetVehicleTab();
                        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details'])
                      }
                    }
                    else if(this.PromoCode!='' && this.PromoCode!=undefined && this.PromoCode!=null){
                      this.promoError = false;
                      if(this.vehicleWishList.length!=0 || this.customerData.length!=0){
                        this.createVehicleProceed();
                      }
                      else{
                        sessionStorage.removeItem('vehicleDetailsList');
                        sessionStorage.setItem('vehicleLength',String(1))
                        sessionStorage.setItem('vehicleType','new');
                        sessionStorage.removeItem('vehicleDetails');
                        this.updateComponent.resetVehicleTab();
                        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details'])
                      }
                    }
                    else{
                      this.promoError = true;
                    }
                  }
                  else{
                    this.promoYNError = true;
                  }
                }
                else{
                  if(Number(this.exchangeRate) < Number(this.minCurrencyRate)){
                    this.exchangeMaxError = true;
                  }
                  if(Number(this.exchangeRate) > Number(this.maxCurrencyRate)){
                    this.exchangeMinError = true;
                  }
                }
              }
              else{
                this.currencyError = true;
              }
            }
            else{
              this.policyEndError = true;
            }
          }
          else{
            this.policyStartError = true;
          }
        }
        

  }
  redirectValidations(event){
    if(event=='customerCode') this.customerCodeError = true;
    else if(event=='branchValue') this.branchValueError = true;
    else if(event=='sourceType') this.sourceCodeError = true;
    else if(event=='brokerCode') this.brokerCodeError = true;
    else if(event=='travelStartDate') this.travelStartError = true;
    else if(event=='travelEndDate') this.travelEndError = true;
    else if(event=='currencyCode') this.currencyError = true;
    else if(event=='havePromoCode') this.promoYNError = true;
    else if(event=='promoCode') this.promoError = true;
    else if(event=='reset'){
      this.customerCodeError = false;this.branchValueError=false;
      this.sourceCodeError = false; this.brokerCodeError = false;
      this.travelStartError = false;this.travelEndError = false;
      this.currencyError = false;this.promoYNError = false;
      this.promoError = false;
    }
  }
  checkMandatories(){
    
    if(this.issuerSection){
      if(this.branchValue!='' && this.branchValue!=undefined && this.branchValue!=null){
        this.branchValueError = false;
          if(this.Code!='' && this.Code!=undefined && this.Code!=null){
            this.sourceCodeError = false;
            if(this.brokerCode!='' && this.brokerCode!=undefined && this.brokerCode!=null){
              this.brokerCodeError = false;
              if(this.brokerBranchCode!='' && this.brokerBranchCode!=undefined && this.brokerBranchCode!=null){
                this.brokerBranchCodeError = false;
                  if(this.customerName!='' && this.customerName!=undefined && this.customerName!=null){
                    this.customerCodeError = false;
                      if(this.executiveSection){
                        if(this.executiveValue!='' && this.executiveValue!=undefined && this.executiveValue!=null){
                            this.executiveError=false;
                            if(this.commissionValue!='' && this.commissionValue!=undefined && this.commissionValue!=null){
                              this.commissionError=false;
                              return true;
                            }
                            else{
                              this.commissionError=true;
                            }
                        }
                        else{
                          this.executiveError=true;
                        }
                      }
                      else{
                        this.executiveValue = null;
                        this.commissionValue = null;
                        return true;
                      }
                  }
                  else{
                      this.customerCodeError = true;
                  }
              }
              else this.brokerBranchCodeError = true;
            
            }
            else{
              this.brokerCodeError = true;
            }
            // else if(this.Code=='Broker'){
            //   this.brokerCodeError = true;
            // }
            // else if(this.Code=='Agent' || this.Code == 'Direct'){
            //   this.brokerCode=null;
            //   this.branchValue = null;
            //   this.brokerCodeError = false;
            //   return true;
            // }
          }
          else{
            this.sourceCodeError = true;
            return false;
          }
        }
        else{
          this.branchValueError = true;
        }
    }
    else{
      return true;
    }
  }
  createVehicleProceed(){
    let i=0,vehicleList:any[]=[],k=0;
    if(this.customerData.length!=0){
      for(let veh of this.customerData){
        veh['Active'] = true;
        vehicleList.push(veh);
        if(veh.Vehicleid>0 && veh.Vehicleid>k) k=veh.Vehicleid;
        i+=1;
        if(i==this.customerData.length){
          if(this.vehicleWishList.length!=0){
            let j=0;
            for(let vehicle of this.vehicleWishList){
              let m = k+1;
              if(this.endorsementSection && vehicle.EndorsementYn=='Y'){
                vehicle['PolicyStartDate'] = this.endorseEffectiveDate;
                const oneday = 24 * 60 * 60 * 1000;
                const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                const formattedDatecurrent = new Date(this.endorseEffectiveDate);
                console.log(formattedDate);
                vehicle['PolicyPeriod'] = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
                vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
              }
              else{
                vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
              }
              vehicle['Currency'] = this.currencyCode;
              vehicle['HavePromoCode'] = this.HavePromoCode;
              vehicle['PromoCode'] = this.PromoCode;
              vehicle['ExchangeRate'] = this.exchangeRate;
              vehicle['Vehicleid'] = String(m);
              vehicle['Active'] = false;
              vehicleList.push(vehicle);
              j+=1;
              if(j==this.vehicleWishList.length){
                sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                sessionStorage.setItem('vehicleLength',String(m+1))
                sessionStorage.setItem('vehicleType','new');
                sessionStorage.removeItem('vehicleDetails');
                this.updateComponent.resetVehicleTab();
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details'])
              }
            }
          }
          else{
                sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                sessionStorage.setItem('vehicleLength',String(this.customerData.length+1))
                sessionStorage.setItem('vehicleType','new');
                sessionStorage.removeItem('vehicleDetails');
                this.updateComponent.resetVehicleTab();
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details'])
          }
        }
      }
    }
    else{
      if(this.vehicleWishList.length!=0){
        let j=0;k=0;
        for(let vehicle of this.vehicleWishList){
          let m = k+1;
          if(this.endorsementSection && vehicle.EndorsementYn=='Y'){
            vehicle['PolicyStartDate'] = this.endorseEffectiveDate;
            const oneday = 24 * 60 * 60 * 1000;
            const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(this.endorseEffectiveDate);
            console.log(formattedDate);
            vehicle['PolicyPeriod'] = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
            vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
          else{
            vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
          vehicle['Currency'] = this.currencyCode;
          vehicle['HavePromoCode'] = this.HavePromoCode;
          vehicle['PromoCode'] = this.PromoCode;
          vehicle['ExchangeRate'] = this.exchangeRate;
          vehicle['Vehicleid'] = String(j+1);
          vehicle['Active'] = false;
          vehicleList.push(vehicle);
          
          j+=1;
          if(j==this.vehicleWishList.length){
            sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
            sessionStorage.setItem('vehicleLength',String(j+1))
            sessionStorage.setItem('vehicleType','new');
            sessionStorage.removeItem('vehicleDetails');
            this.updateComponent.resetVehicleTab();
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details'])
          }
        }
      }
    }
  }
  onDeleteVehicleWish(rowData){
    let vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
    if(vehicleDetails){
        vehicleDetails = vehicleDetails.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber);
        sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleDetails));
    }
    this.vehicleWishList = this.vehicleWishList.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber)
  }
  onWishListProceed(rowData){
    
    // if(this.productId=='13'){
    //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident'])
    // }
    // if(this.productId=='15'){
    //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/workmens-Compensation'])
    // }
    if(!this.endorsementSection){
      let validDetais = this.checkMandatories();
      if(validDetais){
        console.log("Form Validated")
        if(rowData.length==0){
          console.log("Form Validated 2")
          // let type: NbComponentStatus = 'danger';
          // const config = {status: type,destroyByClick: true,duration: 4000,
          //   hasIcon: true,position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,};
  
              if(this.policyStartDate!='' && this.policyStartDate!=undefined && this.policyStartDate!=null){
                this.policyStartError = false;
                
                if( (new Date(this.policyStartDate)).setHours(0,0,0,0) >= (new Date()).setHours(0,0,0,0) ){
                 
                  this.policyPassDate = false;
                  if(this.policyEndDate!='' && this.policyEndDate!=undefined && this.policyEndDate!=null){
                    this.policyEndError = false;
                    console.log("Form Validated 2")
                    if(this.currencyCode!='' && this.currencyCode!=undefined && this.currencyCode!=null){
                      this.currencyError = false;
                      console.log("Form Validated 22")
                      if(Number(this.exchangeRate) >= Number(this.minCurrencyRate) && Number(this.exchangeRate) <= Number(this.maxCurrencyRate)){
                        this.exchangeMaxError = false;this.exchangeMinError = false;
                        console.log("Form Validated 222")
                        if(this.HavePromoCode!='' && this.HavePromoCode!=undefined && this.HavePromoCode!=null){
                          this.promoYNError = false;
                          if(this.HavePromoCode=='N'){
                            console.log("Form Validated 2222")
                            this.PromoCode = null;
                            this.promoError = false;
                            this.setVehicleValue();
                            // if(this.executiveSection){
                            //   if(this.executiveValue!='' && this.executiveValue!=undefined && this.executiveValue!=null){
                            //     if(this.commissionValue!='' && this.commissionValue!=undefined && this.commissionValue!=null){
                                  
                            //     }
                            //     else{
                            //       //this.toastrService.show('Commission Type','Please Select Commission Type', config);
                            //     }
                            //   }
                            //   else{
                            //     //this.toastrService.show('Executive','Please Select AcExecutive', config);
                            //   }
                            // }
                            // else{
                            //     this.setVehicleValue();
                            // }
                          }
                          else if(this.PromoCode!='' && this.PromoCode!=undefined && this.PromoCode!=null){
                            this.promoError = false;
                            if(this.executiveSection){
                              if(this.executiveValue!='' && this.executiveValue!=undefined && this.executiveValue!=null){
                                if(this.commissionValue!='' && this.commissionValue!=undefined && this.commissionValue!=null){
                                  this.setVehicleValue();
                                }
                                else{
                                  //this.toastrService.show('Commission Type','Please Select Commission Type', config);
                                }
                              }
                              else{
                                //this.toastrService.show('Executive','Please Select AcExecutive', config);
                              }
                            }
                            else{
                                this.setVehicleValue();
                            }
                          }
                          else{
                            this.promoError = true;
                            //this.toastrService.show('Promo Code','Please Enter PromoCode', config);
                          }
                        }
                        else{
                          this.promoYNError = true;
                          //this.toastrService.show('PromoYN','Please Select PromoCode Available or Not', config);
                        }
                      }
                      else{
                        if(Number(this.exchangeRate) < Number(this.minCurrencyRate)){
                          this.exchangeMaxError = true;
                          //this.toastrService.show('Exchange Rate',`Please Enter Exchange Rate More than ${this.minCurrencyRate}`,config);
                        }
                        if(Number(this.exchangeRate) > Number(this.maxCurrencyRate)){
                          this.exchangeMinError = true;
                          //this.toastrService.show('Exchange Rate',`Please Enter Exchange Rate Less than ${this.maxCurrencyRate}`,config);
                        }
                      }
  
                    }
                    else{
                      this.currencyError = true;
                      //this.toastrService.show('Currency','Please Select Currency', config);
                    }
                  }
                  else{
                    this.policyEndError = true;
                    //this.toastrService.show('Policy End Date','Please Select Policy End Date', config);
                  }
                }
                else{
                  this.policyPassDate = true;
                  //this.toastrService.show('Policy Start Date','Policy Start Date Should Not be Pass Days', config);
                }
              }
              else{
                this.policyStartError = true;
                
                //this.toastrService.show('Policy Start Date','Please Select Policy Start Date', config);
              }
  
        }
        else{
          console.log("Form Validated 3")
          console.log("Entered Vehicle List",this.policyStartDate,this.policyEndDate,this.HavePromoCode,this.currencyCode)
            this.setVehicleList(rowData,'direct',null);
        }
      }
    }
    else{
      
      if(rowData.length==0){
         this.setVehicleValue();
      }
      else{console.log("Final List",rowData,this.updateComponent.vehicleWishList)   
        this.setVehicleList(rowData,'direct',null);
      }
    }
  }
  onHomeInsuranceSave(){
    if(!this.endorsementSection){
      let mandatory:boolean = this.checkMandatories();
      if(mandatory){
        let policyStartDate="";
        let policyEndDate="";
        // let type : NbComponentStatus = 'danger';
        //           const config = {
        //             status: type,
        //             destroyByClick :true,
        //             duration:4000,
        //             hasIcon:true,
        //             position:NbGlobalPhysicalPosition.TOP_RIGHT,
        //             preventDuplicates:false,
        //           };
                  let Details:any =[ {
                    "PolicyStartDate":"",
                    "PolicyEndDate":"",
                    "Currency":"",
                    "SectionId":'',
                    "AcexecutiveId":"",
                    "ExchangeRate":"",
                    "StateExtent":"",
                    "NoOfDays": "",
                    "HavePromoCode":'',
                    "Promocode":"",
                  }];
    
                  console.log('Detailsssss',Details,this.policyStartDate)
                  if(this.policyStartDate!='' && this.policyStartDate!=null && this.policyStartDate!=undefined){
                  policyStartDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                  console.log('PolicyDate',this.policyStartDate);
                  if( (new Date(this.policyStartDate)).setHours(0,0,0,0) >= (new Date()).setHours(0,0,0,0) ){
                    this.policyPassDate = false;
                    console.log("Policy Start Date Moved");
                    Details[0].PolicyStartDate = policyStartDate;
                    if(this.policyEndDate!='' && this.policyEndDate!=null && this.policyEndDate!=undefined){
                      console.log("Policy End Date Moved");
                      policyEndDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                      Details[0].NoOfDays = this.noOfDays;
                      Details[0].PolicyEndDate=policyEndDate;
                      console.log("Currency Code",this.currencyCode);
                      if(this.currencyCode!='' && this.currencyCode!=null && this.currencyCode!=undefined){
                        Details[0].Currency = this.currencyCode;
                        console.log('CurrencyCodessss',this.currencyCode);
                        if(this.exchangeRate!='' && this.exchangeRate!=null && this.exchangeRate!=undefined){
                          if(Number(this.exchangeRate) >= Number(this.minCurrencyRate) && Number(this.exchangeRate) <= Number(this.maxCurrencyRate)){
                              Details[0].ExchangeRate = this.exchangeRate;
                              Details[0].SectionId = this.InsuranceType;
                              if(this.HavePromoCode!='' && this.HavePromoCode!=null && this.HavePromoCode!=undefined){
                                Details[0].HavePromoCode = this. HavePromoCode;
                                Details[0].Promocode = this.PromoCode;
                                if(this.executiveSection){
                                  if(this.executiveValue!='' && this.executiveValue!=null && this.executiveValue!=undefined){
                                    Details[0].AcexecutiveId = this.executiveValue;
                                    if(this.issuerSection){
                                      Details[0]['SourceType'] = this.Code;
                                      Details[0]['BrokerCode'] = this.brokerCode;
                                      Details[0]['BranchCode'] = this.branchValue;
                                      Details[0]['BrokerBranchCode'] = this.brokerBranchCode;
                                      Details[0]['CustomerCode'] = this.customerCode;
                                      Details[0]['LoginId'] = this.brokerLoginId;
                                      if(this.IndustryId && this.industryList!=null)
                                      Details[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                                    }
                                    else{
                                      Details[0]['SourceType'] = 'Agent';
                                      Details[0]['BrokerCode'] = this.brokerCode;
                                      Details[0]['BranchCode'] = this.branchValue;
                                      Details[0]['BrokerBranchCode'] = this.brokerBranchCode;
                                      Details[0]['CustomerCode'] = this.customerCode;
                                      Details[0]['LoginId'] = this.loginId;
                                      if(this.IndustryId && this.industryList!=null)
                                      Details[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                                    }
                                    sessionStorage.setItem('homeCommonDetails',JSON.stringify(Details))
                                    console.log("On First Save",Details);
                                    if(this.productId=='19'){
                                      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
                                    }
                                    else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1') this.saveCommonDetails(Details); 
                                    else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                                  }
                                  else{
                                    //this.toastrService.show('AcexecutiveId',"Please Enter AcexecutiveId",config);
                                  }
                                }
                                else{
                                  if(this.issuerSection){
                                    Details[0]['SourceType'] = this.Code;
                                    Details[0]['BrokerCode'] = this.brokerCode;
                                    Details[0]['BranchCode'] = this.branchValue;
                                    Details[0]['BrokerBranchCode'] = this.brokerBranchCode;
                                    Details[0]['CustomerCode'] = this.customerCode;
                                    Details[0]['LoginId'] = this.brokerLoginId;
                                    if(this.IndustryId && this.industryList!=null)
                                      Details[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                                  }
                                  else{
                                    Details[0]['SourceType'] = 'Agent';
                                    Details[0]['BrokerCode'] = this.brokerCode;
                                    Details[0]['BranchCode'] = this.branchValue;
                                    Details[0]['BrokerBranchCode'] = this.brokerBranchCode;
                                    Details[0]['CustomerCode'] = this.customerCode;
                                    Details[0]['LoginId'] = this.loginId;
                                    if(this.IndustryId && this.industryList!=null)
                                      Details[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                                  }
                                  sessionStorage.setItem('homeCommonDetails',JSON.stringify(Details))
                                  if(this.productId=='19'){
                                    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
                                  }
                                  else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1' || this.productId=='26' || this.productId =='21') this.saveCommonDetails(Details); 
                                  else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                                }
                              }
                              else{
                                // this.toastrService.show('HavePromCode',"Please  PromCode",config)
                              }
                          }
                          else{
                            if(Number(this.exchangeRate) < Number(this.minCurrencyRate)){
                              //this.toastrService.show('Exchange Rate',`Please Enter Exchange Rate More than ${this.minCurrencyRate}`,config);
                            }
                            if(Number(this.exchangeRate) > Number(this.maxCurrencyRate)){
                              //this.toastrService.show('Exchange Rate',`Please Enter Exchange Rate Less than Or Equal to ${this.maxCurrencyRate}`,config);
                            }
                          }
                        }
                        else{
                          //this.toastrService.show('ExchangeRate',"Please Enter Exchange Rate",config);
                        }
    
                      }
                      else{
                        //this.toastrService.show('CurrencyCode',"Please select CurrencyCode",config);
                      }
                    }
                    else{
                      //this.toastrService.show('PolicyEndDate',"Please Select PolicyEndDate",config);
                    }
                  }
                  else{
                    this.policyPassDate = true;
                    //this.toastrService.show('Policy Start Date','Policy Start Date Should Not be Pass Days', config);
                  }
    
                  }
                  else{
                    this.policyStartError = true;
                    //this.toastrService.show('PolicyStartDate',"Please select PolicyStartDate",config);
                  }
      }
    }
    else{
      let policyStartDate="";
        let policyEndDate="";
        let Details:any =[ {
          "PolicyStartDate":"",
          "PolicyEndDate":"",
          "Currency":"",
          "SectionId":'',
          "AcexecutiveId":"",
          "ExchangeRate":"",
          "StateExtent":"",
          "NoOfDays": "",
          "HavePromoCode":'',
          "Promocode":"",
        }];
        Details[0].PolicyStartDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
        Details[0].NoOfDays = this.noOfDays;
        Details[0].PolicyEndDate=this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
        Details[0].Currency = this.currencyCode;
        Details[0].ExchangeRate = this.exchangeRate;
        Details[0].SectionId = this.InsuranceType;
        Details[0].AcexecutiveId = this.executiveValue;
        Details[0].HavePromoCode = this. HavePromoCode;
        Details[0].Promocode = this.PromoCode;
        if(this.issuerSection){
          Details[0]['SourceType'] = this.Code;
          Details[0]['BrokerCode'] = this.brokerCode;
          Details[0]['BranchCode'] = this.branchValue;
          Details[0]['BrokerBranchCode'] = this.brokerBranchCode;
          Details[0]['CustomerCode'] = this.customerCode;
          Details[0]['LoginId'] = this.brokerLoginId;
          if(this.IndustryId && this.industryList!=null)
          Details[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
        }
        else{
          Details[0]['SourceType'] = 'Agent';
          Details[0]['BrokerCode'] = this.brokerCode;
          Details[0]['BranchCode'] = this.branchValue;
          Details[0]['BrokerBranchCode'] = this.brokerBranchCode;
          Details[0]['CustomerCode'] = this.customerCode;
          Details[0]['LoginId'] = this.loginId;
          if(this.IndustryId && this.industryList!=null)
          Details[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
        }
        sessionStorage.setItem('homeCommonDetails',JSON.stringify(Details))
        if(this.productId=='19'){
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
        }
        else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1'|| this.productId=='21' || this.productId=='26' || this.productId =='25') this.saveCommonDetails(Details); 
        else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
    }
    
  }
  saveCommonDetails(commonDetails){
    let endorsementDate=null,EndorsementEffectiveDate=null,EndorsementRemarks=null,
    EndorsementType=null,EndorsementTypeDesc=null,EndtCategoryDesc=null,EndtCount=null,
    EndtPrevPolicyNo=null,EndtPrevQuoteNo=null,EndtStatus=null,IsFinanceEndt=null,OrginalPolicyNo=null;
    if(this.endorsementDetails){
      endorsementDate = this.endorsementDetails['EndorsementDate'];
      EndorsementEffectiveDate = this.endorsementDetails['EndorsementEffectiveDate'];
      EndorsementRemarks = this.endorsementDetails['EndorsementRemarks'];
      EndorsementType = this.endorsementDetails['EndorsementType'];
      EndorsementTypeDesc = this.endorsementDetails['EndorsementTypeDesc'];
      EndtCategoryDesc = this.endorsementDetails['EndtCategoryDesc'];
      EndtCount = this.endorsementDetails['EndtCount'];
      EndtPrevPolicyNo = this.endorsementDetails['EndtPrevPolicyNo'];
      EndtPrevQuoteNo = this.endorsementDetails['EndtPrevQuoteNo'];
      EndtStatus = this.endorsementDetails['EndtStatus'];
      IsFinanceEndt = this.endorsementDetails['IsFinanceEndt'];
      OrginalPolicyNo = this.endorsementDetails['OrginalPolicyNo'];
    }
    let promocode = null;
    let appId = "1", loginId = "", brokerbranchCode = "";let createdBy = "";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
      }
      else this.quoteRefNo = null;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      //createdBy = this.vehicleDetailsList[0].CreatedBy;
    }
    else {
      createdBy = this.loginId;
      if (this.userType != 'Issuer') {
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId = this.loginId;
      }
      else {
        appId = this.loginId;
        loginId = this.brokerLoginId
        brokerbranchCode = null;
      }
    }
    this.applicationId = appId;
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
      if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
      else { this.issuerSection = false; }
    }
    else if (this.userType != 'Broker' && this.userType != 'User') { 
      brokerbranchCode =  commonDetails[0]['BrokerBranchCode']
      this.issuerSection = true;
     }
    else{ this.issuerSection = false; brokerbranchCode = this.userDetails.Result.BrokerBranchCode; }
    if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
    }
    let section = [];
    if(this.productId=='6'){section.push('40');};
    if(this.productId=='39'){section.push('41'); };
    if(this.productId=='16'){section.push('42');};
    if(this.productId=='14'){section.push('45');};
    if(this.productId=='32'){section.push('43');};
    if(this.productId=='1'){section.push('52');};
    if(this.productId=='21'){section.push('3');};
    if(this.productId=='26'){section.push('3');};
    if(this.productId=='25'){section.push('3');};
    let ReqObj = { 
        "AcexecutiveId": "",
        "PolicyNo": "",
        "ProductId": this.productId,
        "ProductType": null,
        "TiraCoverNoteNo": null,
        "RequestReferenceNo": this.quoteRefNo,
        "AgencyCode": this.agencyCode,
        "ApplicationId": this.applicationId,
        "BdmCode": this.brokerCode,
        "BranchCode": this.branchCode,
        "BrokerBranchCode": brokerbranchCode,
        "BrokerCode": this.brokerCode,
        "BuildingOwnerYn": this.buildingOwnerYN,
        "Createdby": this.loginId,
        "SourceType": this.Code,
        "Currency": this.currencyCode,
        "CustomerReferenceNo": this.customerDetails?.CustomerReferenceNo,
        "CustomerCode": this.customerCode,
        "ExchangeRate": this.exchangeRate,
        "Havepromocode": this.HavePromoCode,
        "Promocode": this.PromoCode,
        "InsuranceId": this.insuranceId,
        "LoginId": loginId,
        "UserType": this.userType,
        "PolicyEndDate": this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy"),
        "PolicyStartDate": this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy"),
        "SectionIds": section,
        "SubUsertype": sessionStorage.getItem('typeValue'),
        "RiskId":"1",
        "IndustryId": this.IndustryId,
        "EndorsementDate": endorsementDate,
        "EndorsementEffectiveDate": EndorsementEffectiveDate,
        "EndorsementRemarks": EndorsementRemarks,
        "EndorsementType": EndorsementType,
        "EndorsementTypeDesc": EndorsementTypeDesc,
        "EndtCategoryDesc": EndtCategoryDesc,
        "EndtCount": EndtCount,
        "EndtPrevPolicyNo": EndtPrevPolicyNo,
        "EndtPrevQuoteNo": EndtPrevQuoteNo,
        "EndtStatus": EndtStatus,
        "IsFinanceEndt": IsFinanceEndt,
        "OrginalPolicyNo": OrginalPolicyNo,
        "Status": "Y"
    }
    if (this.endorsementSection) {
      if (this.currentStatus == undefined || this.currentStatus == null || this.currentStatus == 'Y') {
        ReqObj['Status'] = 'E';
      }
      else {
        ReqObj['Status'] = this.currentStatus;
      }
      ReqObj['PolicyNo'] = this.endorsePolicyNo
    }
    else {
      ReqObj['Status'] = 'Y';
    }
    let urlLink = `${this.motorApiUrl}api/slide/savecommondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
                let sections = data.Result?.SectionIds;
                let refNo = data.Result?.RequestReferenceNo;
                this.updateComponent.referenceNo = data.Result?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo',data.Result?.RequestReferenceNo);
                let homeDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
                if (homeDetails) {
                    if (homeDetails[0].SectionId == undefined || homeDetails[0].SectionId == "undefined") homeDetails[0]['SectionId'] = sections;
                    else homeDetails[0].SectionId = sections;
                    if(this.IndustryId && this.industryList!=null)
                    homeDetails[0]['IndustryName'] = this.industryList.find(ele=>ele.Code==this.IndustryId).CodeDesc;
                    sessionStorage.setItem('homeCommonDetails', JSON.stringify(homeDetails))
                    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
                }
        }
      },
      (err) => { },
    );
  }
  setVehicleValue(){
    if(this.productId=='5' || this.productId=='4' || this.productId=='3'){
      console.log("Entered Loop 1")
      this.vehicleWishList = this.updateComponent.vehicleWishList
      let i=0;
      for(let vehicle of this.vehicleWishList){
        if(this.executiveSection){
          vehicle['AcExecutiveId'] = this.executiveValue;
          vehicle['CommissionType'] = this.commissionValue;
        }
        else{
          vehicle['AcExecutiveId'] = null;
          vehicle['CommissionType'] = null;
        }
        if(this.issuerSection){
          vehicle['SourceType'] = this.Code;
          vehicle['BrokerCode'] = this.brokerCode;
          vehicle['BranchCode'] = this.branchValue;
          vehicle['BrokerBranchCode'] = this.brokerBranchCode;
          vehicle['CustomerCode'] = this.customerCode;
          vehicle['LoginId'] = this.brokerLoginId;
        }
        else{
          vehicle['SourceType'] = 'Agent';
          vehicle['BrokerCode'] = this.brokerCode;
          vehicle['BranchCode'] = this.branchValue;
          vehicle['BrokerBranchCode'] = this.brokerBranchCode;
          vehicle['CustomerCode'] = "99999";
          vehicle['LoginId'] = this.loginId;
        }
        if(this.endorsementSection && vehicle.EndorsementYn=='Y'){
          vehicle['PolicyStartDate'] = this.endorseEffectiveDate;
          const oneday = 24 * 60 * 60 * 1000;
          const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
          const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          const formattedDatecurrent = new Date(this.endorseEffectiveDate);
          console.log(formattedDate);
          vehicle['PolicyPeriod'] = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
          vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
        }
        else{
          vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
        }
        vehicle['Currency'] = this.currencyCode;
        vehicle['HavePromoCode'] = this.HavePromoCode;
        vehicle['PromoCode'] = this.PromoCode;
        vehicle['ExchangeRate'] = this.exchangeRate;
        vehicle['Vehicleid'] = String(i+1);
        vehicle['Active'] = false;
        i+=1;
        if(i==this.vehicleWishList.length){
          this.updateComponent.vehicleWishList = this.vehicleWishList;
          sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleWishList));
          sessionStorage.setItem('vehicleType','edit');
          this.updateComponent.resetVehicleTab();
          sessionStorage.removeItem('editVehicleId');
          sessionStorage.removeItem('vehicleDetails');
          console.log("On Final Vehicle List",this.vehicleWishList)
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
        }
      }
    }
    else{
      let vehicle = {};
      if(this.executiveSection){
        vehicle['AcExecutiveId'] = this.executiveValue;
        vehicle['CommissionType'] = this.commissionValue;
      }
      else{
        vehicle['AcExecutiveId'] = null;
        vehicle['CommissionType'] = null;
      }
      if(this.issuerSection){
        vehicle['SourceType'] = this.Code;
        vehicle['BrokerCode'] = this.brokerCode;
        vehicle['BranchCode'] = this.branchValue;
        vehicle['BrokerBranchCode'] = this.brokerBranchCode;
        vehicle['CustomerCode'] = this.customerCode;
        vehicle['LoginId'] = this.brokerLoginId;
      }
      else{
        vehicle['SourceType'] = 'Agent';
        vehicle['BrokerCode'] = this.brokerCode;
        vehicle['BranchCode'] = this.branchValue;
        vehicle['BrokerBranchCode'] = this.brokerBranchCode;
        vehicle['CustomerCode'] = this.customerCode;
        vehicle['LoginId'] = this.loginId;
      }
      vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
      vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      vehicle['PolicyPeriod'] = this.noOfDays;
      vehicle['Currency'] = this.currencyCode;
      vehicle['HavePromoCode'] = this.HavePromoCode;
      vehicle['PromoCode'] = this.PromoCode;
      vehicle['ExchangeRate'] = this.exchangeRate;
      vehicle['RiskId'] = String(1);
      vehicle['Active'] = false;
      sessionStorage.setItem('homeCommonDetails',JSON.stringify([vehicle]));
      if(this.productId=='19'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/risk-selection']);
      }
      else if(this.productId=='6' || this.productId=='16' || this.productId=='39' || this.productId=='14' || this.productId=='32' || this.productId=='1' || this.productId=='21'  || this.productId=='26' || this.productId == '25') this.saveCommonDetails([vehicle]); 
      else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/personal-accident']);
    }
  }
  setVehicleList(rowData,type,id){
    if(this.endorsementSection && this.enableAddVehicle) sessionStorage.removeItem('editVehicleId')
      if(type=='direct'){
        // let type : NbComponentStatus = 'danger';
        // const config = {
        //   status: type,
        //   destroyByClick :true,
        //   duration:4000,
        //   hasIcon:true,
        //   position:NbGlobalPhysicalPosition.TOP_RIGHT,
        //   preventDuplicates:false,
        // };
        let k = 0,i=0,vehicleList=[];
        console.log("Entered StartDate Check",this.exchangeRate,this.minCurrencyRate,this.maxCurrencyRate,this.customerData);
        if(!this.endorsementSection){
          
          if( (new Date(this.policyStartDate)).setHours(0,0,0,0) >= (new Date()).setHours(0,0,0,0) ){
            console.log("Entered StartDate",this.exchangeRate,this.minCurrencyRate,this.maxCurrencyRate);
            if(Number(this.exchangeRate) >= Number(this.minCurrencyRate) && Number(this.exchangeRate) <= Number(this.maxCurrencyRate)){
              console.log("Entered Exchange Rate",rowData);
              for(let veh of rowData){
                veh['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                veh['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                veh['Currency'] = this.currencyCode;
                veh['HavePromoCode'] = this.HavePromoCode;
                veh['PromoCode'] = this.PromoCode;
                veh['ExchangeRate'] = this.exchangeRate;
                veh['Active'] = true;
                vehicleList.push(veh);
                if(veh.Vehicleid>0) k=veh.Vehicleid;
                i+=1;
                if(i==rowData.length){
                  this.vehicleWishList = this.updateComponent.vehicleWishList;
                  if(this.vehicleWishList.length!=0){
                    let j=0;
                    for(let vehicle of this.vehicleWishList){
                      if(this.endorsementSection && vehicle.EndorsementYn=='Y'){
                        vehicle['PolicyStartDate'] = this.endorseEffectiveDate;
                        const oneday = 24 * 60 * 60 * 1000;
                        const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                        const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                        const formattedDatecurrent = new Date(this.endorseEffectiveDate);
                        console.log(formattedDate);
                        vehicle['PolicyPeriod'] = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
                        vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                      }
                      else{
                        vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                        vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                      }
                      vehicle['Currency'] = this.currencyCode;
                      vehicle['ExchangeRate'] = this.exchangeRate;
                      vehicle['Vehicleid'] = String(k+1);
                      vehicle['Active'] = false;
                      vehicleList.push(vehicle);
                      j+=1;
                      if(j==this.vehicleWishList.length){
                        sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                        sessionStorage.setItem('vehicleType','edit');
                        this.updateComponent.resetVehicleTab();
                        console.log("On Final Vehicle List 4",vehicleList)
                        sessionStorage.removeItem('vehicleDetails');
                        
                        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
                      }
                    }
                  }
                  else{
  
                    sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                      sessionStorage.setItem('vehicleType','edit');
                      this.updateComponent.resetVehicleTab();
                      sessionStorage.removeItem('vehicleDetails');
                      console.log("On Final Vehicle List 5",vehicleList)
                      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
                  }
                }
              }
            }
            else{
              if(Number(this.exchangeRate) < Number(this.minCurrencyRate)){
                //this.toastrService.show('Exchange Rate',`Please Enter Exchange Rate More than ${this.minCurrencyRate}`,config);
              }
              if(Number(this.exchangeRate) > Number(this.maxCurrencyRate)){
                //this.toastrService.show('Exchange Rate',`Please Enter Exchange Rate of Maximum Limit ${this.maxCurrencyRate}`,config);
              }
            }
  
          }
          else{
            this.policyPassDate = true;
            //this.toastrService.show('Policy Start Date','Policy Start Date Should Not be Pass Days', config);
          }
        }
        else{
          for(let veh of rowData){
            if(this.endorsementSection && veh.EndorsementYn=='Y' && this.enableAddVehicle){
              veh['PolicyStartDate'] = this.endorseEffectiveDate;
              let startDate = new Date(this.endorseEffectiveDate)
              const oneday = 24 * 60 * 60 * 1000;
              const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
              const formattedDate = moment(momentDate).format("YYYY-MM-DD");
              const formattedDatecurrent = new Date(this.endorseEffectiveDate);
              
              veh['PolicyPeriod'] = Math.round(Math.abs((Number(this.policyEndDate)  - Number(formattedDatecurrent) )/oneday)+1);
              veh['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            }
            else if(this.endorsementSection && this.enablePolicyStart){
              veh['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
              veh['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
            }
            veh['Currency'] = this.currencyCode;
            veh['HavePromoCode'] = this.HavePromoCode;
            veh['PromoCode'] = this.PromoCode;
            veh['ExchangeRate'] = this.exchangeRate;
            veh['Active'] = true;
            vehicleList.push(veh);
            console.log(veh);
            if(veh.Vehicleid>0) k=veh.Vehicleid;
            i+=1;
            if(i==rowData.length){
              
              this.vehicleWishList = this.updateComponent.vehicleWishList;
              if(this.vehicleWishList.length!=0){
                let j=0;
                for(let vehicle of this.vehicleWishList){
                  if(this.endorsementSection && vehicle.EndorsementYn=='Y'){
                      vehicle['PolicyStartDate'] = this.endorseEffectiveDate;
                    const oneday = 24 * 60 * 60 * 1000;
                    const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                    const formattedDatecurrent = new Date(this.endorseEffectiveDate);
                    console.log(formattedDate);
                    vehicle['PolicyPeriod'] = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
                    vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                  }
                  else{
                    vehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                    vehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
                  }
                  
                  vehicle['Currency'] = this.currencyCode;
                  vehicle['ExchangeRate'] = this.exchangeRate;
                  vehicle['Vehicleid'] = String(k+1);
                  k=k+1;
                  vehicle['Active'] = false;
                  vehicleList.push(vehicle);
                  j+=1;
                  if(j==this.vehicleWishList.length){
                    sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                    sessionStorage.setItem('vehicleType','edit');
                    this.updateComponent.resetVehicleTab();

                    sessionStorage.removeItem('vehicleDetails');
                    console.log("On Final Vehicle List 6",vehicleList)
                    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
                  }
                }
              }
              else{

                sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                  sessionStorage.setItem('vehicleType','edit');
                  this.updateComponent.resetVehicleTab();
                  sessionStorage.removeItem('vehicleDetails');
                  console.log("On Final Vehicle List 7",vehicleList)
                  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
              }
            }
          }
        }
        
      }
  }
  onSearchVehicle(){
    this.customerData2 = [];
    // let type: NbComponentStatus = 'danger';
    // const config = {status: type,destroyByClick: true,duration: 4000,
    //   hasIcon: true,position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //   preventDuplicates: false,};
    if(this.searchBy!='' && this.searchBy!=null && this.searchBy!=undefined){
      let chassisNo = "",regNo = "";
      if(this.searchBy=='01'){
        chassisNo = this.searchValue
      }
      else{
        regNo = this.searchValue;
      }

      if(this.searchValue=='' || this.searchValue==undefined || this.searchValue==null){
        if(this.searchBy=='01'){
        //this.toastrService.show('SearchValue','Please Enter ChassisNumber',config);
        }
        else if(this.searchBy=='02'){
          //this.toastrService.show('SearchValue','Please Enter RegistrationNumber',config);
          }
        //console.log('SearchValue','Please Select SearchValue')
      }
      else{
        let ReqObj = {
          "ReqChassisNumber": chassisNo,
          "ReqRegNumber": regNo
        }
        let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data.Result){
                this.customerData2 = [data?.Result];
                this.emptySection = false;
            }
            else if(data.ErrorMessage){
              if(data.ErrorMessage){
                this.emptySection = true;
                // for(let entry of data.ErrorMessage){
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
                console.log("Error Iterate",data.ErrorMessage)
                //this.loginService.errorService(data.ErrorMessage);
              }
          }
          },
          (err) => { },
        );
      }

    }
    else{
      //this.toastrService.show('SearchType','Please Select Search Type',config);
    }
  }
  onSelectVehicle(rowData){
    this.vehicleDetails = rowData;
  }
  ongetBack(){
    if(this.statusValue){
        if(this.adminSection){
          if(this.statusValue == 'RP')  this.router.navigate(['/Admin/referralPending']);
          if(this.statusValue == 'RR')  this.router.navigate(['/Admin/referralRejected']);
          if(this.statusValue == 'RA')  this.router.navigate(['/Admin/referralApproved']);
          if(this.statusValue == 'RE')  this.router.navigate(['/Admin/referralReQuote']);
        }
        else{
          if(this.statusValue == 'RP')  this.router.navigate(['/Home/referralPending']);
          if(this.statusValue == 'RA')  this.router.navigate(['/Home/referralApproved']);
          if(this.statusValue == 'RE')  this.router.navigate(['/Home/referralReQuote']);
        }
    }
    else if(this.endorsementSection){
      this.router.navigate(['/Home/policies/Endorsements/endorsementTypes']);
    }
    else{
      this.router.navigate(['/Home/existingQuotes']);
    }
    // if(this.customerData.length==0){
    //   this.router.navigate(['/Home/existingQuotes/customerSelection']);
    // }
    // else{

    // }
  }
}
