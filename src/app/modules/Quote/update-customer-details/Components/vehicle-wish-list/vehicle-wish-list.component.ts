import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import Swal from 'sweetalert2';
import moment from 'moment';

@Component({
  selector: 'app-vehicle-wish-list',
  templateUrl: './vehicle-wish-list.component.html',
  styleUrls: ['./vehicle-wish-list.component.scss']
})
export class VehicleWishListComponent implements OnInit {

  @Input('quoteRefNo') quoteRefNo: any;
  @Output('getBack') getBack = new EventEmitter();
  @Output('onWishListProceed') onWishListProceed = new EventEmitter();
  @Output('redirectCreateVehicle') redirectCreateVehicle = new EventEmitter();
  searchList:any[]=[];searchBy:any="";customerHeader:any[]=[];customerData:any[]=[];
  addSection:boolean = false;customerData2:any[]=[];customerHeader2:any[]=[];
  title: any;clientName: any;dateOfBirth: any;productValue:any;j:any=1;
  emailId: any;mobileNo: any;idNumber: any;productList:any[]=[];
  searchValue: string= "";vehicleWishList:any[]=[];minDate:Date;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public UploadUrl: any = this.AppConfig.ExcelUrl;
  vehicleDetails: any;searchSection:boolean = false;
  referenceNo: any=null;wishSection:boolean = false;
  customerHeader3:any[]=[];noOfDays:any;minCurrencyRate:any;maxCurrencyRate:any;
  currencyList:any[]=[];exchangeRate:any;productId:any;policyStartDate:any;executiveValue:any;
  emptySection: boolean = false;userDetails:any;currencyCode:any;policyEndDate:any;commissionValue:any;
  loginId:any;userType:any;agencyCode:any;branchCode:any;insuranceId:any;commissionTypeList:any[]=[];
  endMinDate: Date;adminSection:boolean = false;issuerSection:false;executiveList:any[]=[];
  maxDate: Date;Code:any;brokerList:any[]=[];subUsertype:any;executiveSection:boolean=false;
  customerDetails:any;statusValue:any;HavePromoCode:any="N";PromoCode:any;
  editSection:boolean=true;uploadStatus:any;
  code:any;
  acExecutiveId: any;
  commissionType: any;endorsementSection:boolean=false;
  endorseCategory: any=null;
  endorsementName: any=null;
  endorsementId: any=null;
  endorsePolicyNo: any=null;
  enableFieldsList: any[]=[];
  enableAddVehicle: boolean=false;
  enableRemoveVehicle: boolean;
  endorseEffectiveDate: any;
  wishDuplicateError: boolean=false;
  uploadSection: boolean = false;
  imageUrl: any;
  uploadDocList: any[]=[];
  customerCode: any;
  sourceType: any=null;
  brokerCode: any=null;
  brokerBranchCode: any=null;
  policyStartError: boolean;
  policyEndError: boolean;
  currencyCodeError: boolean;
  sourceTypeError: boolean;
  brokerCodeError: boolean;
  brokerBranchCodeError: boolean;
  errorSection: boolean;
  promoCodeError: boolean;
  customerCodeError: boolean;
  errorRecords: any[]=[];quoteNo:any=null;
  employeeUploadRecords: any[]=[];
  showEmpRecordsSection: boolean;
  bdmCode: any;
  subuserType: string;
  loginType: any=null;
  customerName: any;
  customerTitleError: boolean;
  customerNameError: boolean;
  customerMobileCodeError: boolean;
  customerMobileNoError: boolean;
  customerIdNumberError: boolean;
  customerPolicyTypeError: boolean;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,
    private updateComponent:UpdateCustomerDetailsComponent) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails",this.userDetails);
    if(this.userDetails.Result.LoginType) this.loginType = this.userDetails.Result.LoginType;
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.brokerBranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
      let quoteNo = sessionStorage.getItem('quoteNo');
      if(quoteNo!=undefined && quoteNo!='undefined') this.quoteNo = quoteNo;
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRE'){
        if(quoteStatus=='AdminRP') this.statusValue ="RP";
        else if(quoteStatus =='AdminRA') this.statusValue ="RA";
        else if(quoteStatus =='AdminRE') this.statusValue ="RE";
          this.adminSection = true;
      }
      else{
        if(quoteStatus) this.statusValue = quoteStatus;
        this.adminSection = false;
      }
      if(this.adminSection && (quoteStatus=='AdminRP' || quoteStatus == 'AdminRA')){
        this.customerHeader =  [
          { key: 'Chassisnumber', display: 'Chassis Number' },
          { key: 'PolicyTypeDesc', display: 'Policy Type' },
          { key: 'PolicyStartDate', display: 'Start Date'},
          { key: 'PolicyEndDate', display: 'End Date'},
          { key: 'OverallPremiumFc', display: 'Premium' },
          { key: 'Vehiclemake', display: 'Make' },
          { key: 'Vehcilemodel', display: 'Model' },
          { key: 'Status', display: 'Status' },
          {
            key: 'actions',
            display: 'Action',
            config: {
              isEdit: true
            },
          },
        ];
      }
      else {
        this.customerHeader =  [
          { key: 'Chassisnumber', display: 'Chassis Number' },
          { key: 'PolicyTypeDesc', display: 'Policy Type' },
          { key: 'PolicyStartDate', display: 'Start Date'},
          { key: 'PolicyEndDate', display: 'End Date'},
          { key: 'OverallPremiumFc', display: 'Premium' },
          { key: 'Vehiclemake', display: 'Make' },
          { key: 'Vehcilemodel', display: 'Model' },
          { key: 'Status', display: 'Status' },
          {
            key: 'actions',
            display: 'Action',
            config: {
              isEdit: true,
              isRemove: true,
            },
          },
        ];
      }
      
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
        { key: 'PolicyStartDate', display: 'Start Date'},
        { key: 'PolicyEndDate', display: 'End Date'},
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
      this.searchList = [
        { "Code":"","CodeDesc":"---Select---"},
        { "Code":"02","CodeDesc":"Register Number"},
        { "Code":"01","CodeDesc":"Chassis Number"},
      ];
     }

  ngOnInit(): void {
    let referenceNo =  sessionStorage.getItem('quoteReferenceNo');
      if(referenceNo){
        this.quoteRefNo = referenceNo;
      }
    if(this.quoteRefNo){
      console.log("Quote Exist Section",this.quoteRefNo)
      this.wishSection = true;
      this.getExistingVehiclesList();
    }
    else{
      if(this.updateComponent.vehicleWishList.length!=0){
        this.updateComponent.CurrencyCode = this.updateComponent.vehicleWishList[0].Currency;
        this.currencyCode = this.updateComponent.vehicleWishList[0].Currency;
        this.exchangeRate = this.updateComponent.vehicleWishList[0].ExchangeRate;
        this.policyStartDate = this.updateComponent.vehicleWishList[0].PolicyStartDate;
        this.policyEndDate = this.updateComponent.vehicleWishList[0].PolicyEndDate;
        this.HavePromoCode = this.updateComponent.vehicleWishList[0].HavePromoCode;
        this.PromoCode = this.updateComponent.vehicleWishList[0].PromoCode;
        this.acExecutiveId = this.updateComponent.vehicleWishList[0].AcExecutiveId;
        this.commissionType = this.updateComponent.vehicleWishList[0].CommissionType;
      }
      this.vehicleWishList = this.updateComponent.vehicleWishList;
      console.log("Vehicle Wishes",this.vehicleWishList,this.updateComponent.policyStartDate,this.updateComponent.policyEndDate,
      this.updateComponent.HavePromoCode,this.updateComponent.PromoCode)
       this.searchSection = true;
        this.wishSection = true;
    }
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        console.log("Enable Obj",this.enableFieldsList)
        if(this.endorsementId!=42){
            this.enableAddVehicle = this.enableFieldsList.some(ele=>ele=='addVehicle');
            this.enableRemoveVehicle = this.enableFieldsList.some(ele=>ele=='removeVehicle');
        }
        else{
          this.enableAddVehicle = false;
        } 
      }
    }
    if(this.endorsementSection && this.enableRemoveVehicle){
      this.customerHeader =  [
        { key: 'Chassisnumber', display: 'Chassis Number' },
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
        
        { key: 'OverallPremiumFc', display: 'Premium' },
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
    }
  }
  onDelete(rowData){
      console.log("On Delete Vehicle",rowData);
      if(rowData.Active){
        Swal.fire({
            title: '<strong> &nbsp;Delete Vehicle!</strong>',
            iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              Are You Sure Want to Delete this Vehicle Details?
          </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete!',
        })
        .then((result) => {
          if (result.isConfirmed) {
                this.proceedDeleteVehicle(rowData);
          }
        });
      }
  }
  proceedDeleteVehicle(rowData){
    let endtType = null;
    if(this.endorsementSection){
      endtType = this.endorsementId
    }
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "Vehicleid": rowData.Vehicleid,
      "EndtType": endtType
    }
    let urlLink = `${this.motorApiUrl}api/deletemotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
             if(this.endorsementSection){
              Swal.fire({
                title: '<strong> &nbsp;Delete Vehicle!</strong>',
                iconHtml: '<i class="fa-solid fa-trash fa-fade"></i>',
                icon: 'success',
                html:
                  `<ul class="list-group errorlist">
                      Your Vehicle Delete Entry Stored Successfully,Proceed Further to Confirm
                  </ul>`,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton:false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Okay',
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    this.getExistingVehiclesList();
                  }
                });
             }
             else{
              this.getExistingVehiclesList();
             }
        }
      },
      (err) => { },
    );
  }
  getExistingVehiclesList(){
    this.customerData = [];
    let ReqObj = {
      "RequestReferenceNo": this.quoteRefNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.uploadSection = false;
            this.customerData = data.Result;
            if(this.customerData.length!=0){
              this.updateComponent.CurrencyCode = this.customerData[0].Currency;
              this.currencyCode = this.customerData[0].Currency;
              this.exchangeRate = this.customerData[0].ExchangeRate;
              this.policyStartDate = this.customerData[0].PolicyStartDate;
              this.policyEndDate = this.customerData[0].PolicyEndDate;
              this.HavePromoCode = this.customerData[0].HavePromoCode;
              this.PromoCode = this.customerData[0].PromoCode;
              this.acExecutiveId = this.customerData[0].AcExecutiveId;
              this.commissionType = this.customerData[0].CommissionType;
              this.updateComponent.setCommonValues(this.customerData[0]);
              for(let veh of this.customerData){
                veh['Active'] = true;
              }
            }
            else{
              this.searchSection = true;
            }
        }
      },
      (err) => { },
    );
  }
  onAddVehicleWishList(){
    this.wishSection = false;
    // let type: NbComponentStatus = 'danger';
    // const config = {
    //   status: type,
    //   destroyByClick: true,
    //   duration: 4000,
    //   hasIcon: true,
    //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //   preventDuplicates: false,
    // };
    let list:any[] = this.vehicleWishList;
    let entry = this.vehicleWishList.find(ele=>ele.ReqChassisNumber == this.vehicleDetails.ReqChassisNumber);
    console.log(entry,this.vehicleDetails)
    if(entry == undefined){
      let existEntry = this.customerData.find(ele=>ele.Chassisnumber == this.vehicleDetails.ReqChassisNumber);
      if(existEntry==undefined){
        this.vehicleWishList = [];
        if(this.endorsementSection && this.enableAddVehicle){
          this.vehicleDetails['EndorsementYn'] = 'Y';
        }
        else{
          this.vehicleDetails['EndorsementYn'] = 'N';
        }
        console.log("Details",this.vehicleDetails,this.updateComponent.policyStartDate,this.updateComponent.policyEndDate)
        if(this.vehicleDetails?.PolicyStartDate==null || this.vehicleDetails?.PolicyStartDate==undefined){
          if(this.endorsementSection && this.enableAddVehicle){
            this.vehicleDetails.PolicyStartDate = this.endorseEffectiveDate;
            this.vehicleDetails.PolicyEndDate = this.datePipe.transform(this.updateComponent.policyEndDate, "dd/MM/yyyy");
          }
          else{
            this.vehicleDetails.PolicyStartDate = this.datePipe.transform(this.updateComponent.policyStartDate, "dd/MM/yyyy");
            this.vehicleDetails.PolicyEndDate = this.datePipe.transform(this.updateComponent.policyEndDate, "dd/MM/yyyy");
          }
          
        }
        this.onSaveSearchVehicles();
        // this.vehicleWishList = list.concat([this.vehicleDetails]);
        // this.updateComponent.vehicleWishList = this.vehicleWishList;
        // this.wishSection = true;
        // this.vehicleDetails = null;
      }
      else{
        this.vehicleDetails = null;
        this.wishSection = true;
        this.wishDuplicateError = true;
        setTimeout(() => {this.wishDuplicateError = false;},3000);
        // this.toastrService.show(
        //   'Chassis Number / Registration Number Already Available',
        //   'Duplicate Entry',
        //   config);
      }
    }
    else{
      this.vehicleDetails = null;
      this.wishSection = true;
      this.wishDuplicateError = true;
      setTimeout(() => {this.wishDuplicateError = false;},3000);
      // this.toastrService.show(
      //   'Chassis Number / Registration Number Already Available',
      //   'Duplicate Entry',
      //   config);
    }
    
  }
  onSaveSearchVehicles(){
    console.log("Save Vehicle Details",this.vehicleDetails);
    this.subuserType = sessionStorage.getItem('typeValue');
    let appId = "1",loginId="",brokerbranchCode="",createdBy="";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.vehicleDetails.BrokerBranchCode;
          createdBy = this.vehicleDetails.CreatedBy;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; loginId=this.loginId;
          brokerbranchCode = this.brokerBranchCode;
        }
        else{
          appId = this.loginId;
          loginId = this.vehicleDetails.LoginId;
          loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.updateComponent.brokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        this.sourceType = this.updateComponent.sourceType;
        this.bdmCode = this.updateComponent.brokerCode;
        this.brokerCode = this.updateComponent.brokerCode;
        brokerbranchCode =  this.updateComponent.brokerBranchCode;
        this.customerCode = this.updateComponent.CustomerCode;
        this.customerName = this.updateComponent.CustomerName;
        }
        else {
          this.sourceType = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
        }
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      this.vehicleDetails['Vehicleid'] = String(this.customerData.length+1)
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": null,
      "CommissionType": null,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "BdmCode": this.customerCode,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": refNo,
      "RequestReferenceNo": this.quoteRefNo,
      "Idnumber": IdNo,
      "VehicleId": this.vehicleDetails.Vehicleid,
      "AcccessoriesSumInsured": null,
      "AccessoriesInformation": null,
      "AdditionalCircumstances": null,
      "AxelDistance": this.vehicleDetails?.AxelDistance,
      "Chassisnumber": this.vehicleDetails?.Chassisnumber,
      "Color": this.vehicleDetails?.Color,
      "CityLimit": null,
      "CoverNoteNo": null,
      "OwnerCategory": this.vehicleDetails?.OwnerCategory,
      "CubicCapacity": this.vehicleDetails?.Grossweight,
      "CreatedBy": createdBy,
      "DrivenByDesc": 'D',
      "EngineNumber": this.vehicleDetails?.EngineNumber,
      "FuelType": this.vehicleDetails?.FuelType,
      "Gpstrackinginstalled": null,
      "Grossweight": this.vehicleDetails?.Grossweight,
      "HoldInsurancePolicy": "N",
      "Insurancetype": null,
      "InsuranceId": this.insuranceId,
      "InsuranceClass": null,
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear": this.vehicleDetails?.ManufactureYear,
      "ModelNumber": null,
      "MotorCategory": this.vehicleDetails?.MotorCategory,
      "Motorusage": null,
      "NcdYn": null,
      "NoOfClaims": null,
      "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": null,
      "PolicyType": null,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": regYear,
      "Registrationnumber": this.vehicleDetails?.Registrationnumber,
      "RoofRack": null,
      "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
      "SourceType": this.sourceType,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": null,
      "Tareweight": this.vehicleDetails?.Tareweight,
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": null,
      "TrailerDetails": null,
      "Vehcilemodel":  this.vehicleDetails?.Vehcilemodel,
      "VehicleType": null,
      "Vehiclemake": this.vehicleDetails?.Vehiclemake,
      "WindScreenSumInsured": null,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": this.noOfDays,
      "PolicyStartDate": this.vehicleDetails.PolicyStartDate,
      "PolicyEndDate": this.vehicleDetails.PolicyEndDate,
      "Currency": this.updateComponent.CurrencyCode,
      "ExchangeRate": this.updateComponent.exchangeRate,
      "HavePromoCode": this.updateComponent.HavePromoCode,
      "PromoCode": this.updateComponent.PromoCode,
      "CollateralYn": null,
      "CollateralName": null,
      "FirstLossPayee": null,
      "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
      "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
      "NoOfComprehensives": null,
      "ClaimRatio": null,
      "SavedFrom": "Customer",
      "UserType": this.userType,
      "TiraCoverNoteNo": this.vehicleDetails?.TiraCoverNoteNo,
      "EndorsementYn": this.vehicleDetails.EndorsementYn,
      "SaveOrSubmit": "Save",
      "EndorsementDate": null,
      "EndorsementEffectiveDate": null,
      "EndorsementRemarks": null,
      "EndorsementType": null,
      "EndorsementTypeDesc": null,
      "EndtCategoryDesc": null,
      "EndtCount": null,
      "EndtPrevPolicyNo": null,
      "EndtPrevQuoteNo": null,
      "EndtStatus": null,
      "IsFinanceEndt": null,
      "OrginalPolicyNo": null,
      "Scenarios": {
          "ExchangeRateScenario": {
              "OldAcccessoriesSumInsured": null,
              "OldCurrency": this.currencyCode,
              "OldExchangeRate": this.exchangeRate,
              "OldSumInsured": null,
              "OldTppdIncreaeLimit": null,
              "OldWindScreenSumInsured": null
          }
      },
      "Status": "Y"
    }
    ReqObj['FleetOwnerYn'] = "N";
      if(this.endorsementSection){
        if(this.vehicleDetails?.Status == undefined || this.vehicleDetails?.Status == null || this.vehicleDetails?.Status == 'Y'){
          ReqObj['Status'] = 'E';
        }
        else{
          ReqObj['Status'] = this.vehicleDetails?.Status;
        }
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
          }
          else{
            this.quoteRefNo = data?.Result?.RequestReferenceNo;
              sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
              this.vehicleDetails = null;
              this.searchSection = false;
              this.searchBy = ""; this.searchValue = "";
              this.customerData2 = [];
              this.getExistingVehiclesList();
          }
        },
        (err) => { },
      );
  }
  onEnableUploadSection(){
    let loginType = this.userDetails.Result.LoginType;
    let i=0;
    if(loginType){
      if(loginType=='B2CFlow'){
        this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;
        this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
          if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
          if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
          if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
          if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
          if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
          if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
          if(i>0) this.errorSection = true;
        }
    }
        if(i==0){
          let customerObj = {
            "Title":this.updateComponent.Title,
            "ClientName":this.updateComponent.UserName,
            "MobileCode":this.updateComponent.MobileCode,
            "MobileNo":this.updateComponent.MobileNo,
            "IdNumber":this.updateComponent.IdNumber,
            "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
            "EmailId":this.updateComponent.EmailId,
          }
          sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj))
            this.uploadStatus = null;
            this.errorSection = false;
            this.policyStartDate = this.updateComponent?.policyStartDate;
            this.policyEndDate = this.updateComponent?.policyEndDate;
            this.currencyCode = this.updateComponent?.CurrencyCode;
            this.customerCode = this.updateComponent?.CustomerCode;
            this.customerName = this.updateComponent?.CustomerName
            this.exchangeRate = this.updateComponent?.exchangeRate;
            this.HavePromoCode = this.updateComponent?.HavePromoCode;
            this.PromoCode = this.updateComponent?.PromoCode;
            this.sourceType = this.updateComponent?.sourceType;
            this.brokerCode = this.updateComponent?.brokerCode;
            this.brokerBranchCode = this.updateComponent?.brokerBranchCode;
            if(this.policyStartDate!=null && this.policyStartDate!='' && this.policyStartDate!=undefined){
              this.policyStartError = false;
              if(this.policyEndDate!=null && this.policyEndDate!='' && this.policyEndDate!=undefined){
                this.policyEndError = false;
                if(this.currencyCode!=null && this.currencyCode!='' && this.currencyCode!=undefined){
                  this.currencyCodeError = false;
                  if(this.userType!='Broker' && this.userType!='User'){
                        if(this.sourceType!='' && this.sourceType!=undefined && this.sourceType!=null){
                          this.sourceTypeError = false;
                          if(this.sourceType=='Premia Agent' || this.sourceType=='Premia Broker' || this.sourceType=='Premia Direct'){
                              if(this.customerName!='' && this.customerName!=undefined && this.customerName!=null){
                                this.brokerCode = null;
                              this.brokerBranchCode = null;
                              this.updateComponent.brokerCode = null;
                              this.updateComponent.brokerBranchCode = null;
                              this.updateComponent.brokerLoginId = null;
                                this.customerCodeError = false;
                                if(this.HavePromoCode=='Y'){
                                  if(this.PromoCode!=null && this.PromoCode!='' && this.PromoCode!=undefined){
                                    this.promoCodeError = false;
                                    this.searchSection = false;
                                    this.uploadSection = true;
                                    this.vehicleWishList = [];
                                    this.showEmpRecordsSection = false;
                                    this.uploadDocList = [];
                                    this.employeeUploadRecords = [];
                                  }
                                  else{ this.errorSection=true;this.promoCodeError = true;}
                                }
                                else{
                                  this.searchSection = false;
                                  this.uploadSection = true;
                                  this.vehicleWishList = [];
                                  this.showEmpRecordsSection = false;
                                  this.uploadDocList = [];
                                  this.employeeUploadRecords = [];
                                }
                              }
                              else{
                                  this.customerCodeError = true;
                              }
                          }
                          else{
                            if(this.brokerCode!='' && this.brokerCode!=undefined && this.brokerCode!=null){
                              this.brokerCodeError = false;
                              if(this.brokerBranchCode!='' && this.brokerBranchCode!=undefined && this.brokerBranchCode!=null){
                                this.brokerBranchCodeError = false;
                                if(this.HavePromoCode=='Y'){
                                  if(this.PromoCode!=null && this.PromoCode!='' && this.PromoCode!=undefined){
                                    this.promoCodeError = false;
                                    this.searchSection = false;
                                    this.uploadSection = true;
                                    this.vehicleWishList = [];
                                    this.showEmpRecordsSection = false;
                                    this.uploadDocList = [];
                                    this.employeeUploadRecords = [];
                                  }
                                  else{ this.errorSection=true;this.promoCodeError = true;}
                                }
                                else{
                                  this.searchSection = false;
                                  this.uploadSection = true;
                                  this.vehicleWishList = [];
                                  this.showEmpRecordsSection = false;
                                  this.uploadDocList = [];
                                  this.employeeUploadRecords = [];
                                }
                              }
                              else this.brokerBranchCodeError = true;
                            }
                            else{
                              this.brokerCodeError = true;
                            }
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
                          this.sourceTypeError = true;
                          return false;
                        }
                  }
                  else{
                    if(this.HavePromoCode=='Y'){
                      if(this.PromoCode!=null && this.PromoCode!='' && this.PromoCode!=undefined){
                        this.promoCodeError = false;
                        this.searchSection = false;
                        this.uploadSection = true;
                        this.vehicleWishList = [];
                        this.showEmpRecordsSection = false;
                        this.uploadDocList = [];
                        this.employeeUploadRecords = [];
                      }
                      else{ this.errorSection=true;this.promoCodeError = true;}
                    }
                    else{
                      this.searchSection = false;
                      this.uploadSection = true;
                      this.vehicleWishList = [];
                      this.showEmpRecordsSection = false;
                      this.uploadDocList = [];
                      this.employeeUploadRecords = [];
                    }
                  }
                }
                else{
                  this.currencyCodeError = true;this.errorSection = true;}
              }
              else{
                this.policyEndError = true;this.errorSection = true;}
            }
            else{this.policyStartError = true;this.errorSection = true;}
          }
    
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
  onUploadVehicleData(){
      if(this.customerData.length!=0){
        Swal.fire({
          title: '<strong>Merge / Replace Records</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
             <li>Some Vehicle Details You Already Stored</li>
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
                this.uploadProceed('Merge')
          }
          else{
            this.uploadProceed('Add')
          }
        })
      }
      else this.uploadProceed('Add');
  }
  uploadProceed(type){
    let createdBy="";
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    this.subUsertype = sessionStorage.getItem('typeValue');
      console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.brokerCode,this.customerCode);
      
      let appId = "1",loginId="",brokerbranchCode="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.updateComponent.brokerBranchCode;
          createdBy = this.updateComponent.brokerLoginId;
      }
      else{
        createdBy = this.loginId;
        if(this.userType!='Issuer'){
          this.brokerCode = this.agencyCode;
          appId = "1"; loginId=this.loginId;
          brokerbranchCode = this.brokerBranchCode;
        }
        else{
          appId = this.loginId;
          loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.updateComponent.brokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        this.sourceType = this.updateComponent.sourceType;
        this.bdmCode = this.updateComponent.brokerCode;
        this.brokerCode = this.updateComponent.brokerCode;
        this.customerCode = this.updateComponent.CustomerCode;
        this.customerName = this.updateComponent.CustomerName;
      }
  
    console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
  
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
      "RequestReferenceNo": this.quoteRefNo,
      "TypeId":"101",
      "BrokerBranchCode":brokerbranchCode,
      "BdmCode": this.customerCode,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "SourceType": this.sourceType,
      "CustomerRefNo": sessionStorage.getItem('customerReferenceNo'),
      "AcExecutiveId":null,
      "BrokerCode": this.brokerCode,
      "LoginId": this.loginId,
      "SubUserType": this.subUsertype,
      "ApplicationId":appId,
      "EndorsementYn":"N",
      "EndorsementDate":"",
      "EndorsementEffectiveDate":"",
      "EndorsementRemarks":"",
      "EndorsementType":"",
      "EndorsementTypeDesc":"",
      "EndtCategoryDesc":"",
      "EndtCount":"",
      "EndtPrevPolicyNo":"",
      "EndtPrevQuoteNo":"",
      "EndtStatus":"",
      "IsFinanceEndt":"",
      "OrginalPolicyNo":"",
      "PolicyStartDate": this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy"),
      "PolicyEndDate": this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy"),
      "Currency": this.currencyCode,
      "ExchangeRate": this.exchangeRate,
      "HavePromoCode": this.HavePromoCode,
      "PromoCode": this.PromoCode,
      "NoOfVehicles":"",
      "BranchCode": this.branchCode,
      "AgencyCode":this.userDetails.Result.OaCode,
      "Idnumber": this.updateComponent.idNumber,
      "UserType": this.userType,
      "UploadType": type,
      "NcdYn":"N"
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/batch/upload`;
    this.sharedService.onPostExcelDocumentMethodSync(urlLink, ReqObj,this.uploadDocList[0].url).subscribe(
      (data: any) => {
          if(data){
            let res = data;
            if(res?.ProgressStatus=='P'){
              if(res?.RequestReferenceNo){
                this.referenceNo = res?.RequestReferenceNo;
                this.quoteRefNo = res?.RequestReferenceNo;
                sessionStorage.setItem('quoteReferenceNo',this.referenceNo);
                this.checkUploadStatus();
              }
              
            }
          }
      },  
      (err) => { },
    );
  }
  onCancelDocUpload(){
    if(this.customerData.length!=0){
      this.searchSection=false;
    }
    else this.searchSection = true;
    this.uploadSection=false;this.uploadDocList=[]
  }
  employeedownload(){
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": this.productId,
    }
    let urlLink = `${this.ApiUrl1}eway/vehicle/sample/download/`
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.Base64);
        link.setAttribute('download',data?.Result.FileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  checkUploadStatus(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.referenceNo
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/get/transaction/status`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res.Status=='S'){
                  this.uploadStatus = null;
                  this.uploadDocList = [];
                      this.getValidRecordDetails();
                }
                else if(res.Status=='E'){
                  this.uploadStatus = 'Upload Failed..Please Try Again...'
                  setTimeout(() => 
                  {
                    this.uploadDocList = [];
                    this.uploadStatus = null;
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
  getValidRecordDetails(){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RequestRefNo":this.referenceNo
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/getUploadTransaction`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(res){
                  this.employeeUploadRecords = [res];
                  this.showEmpRecordsSection = true;
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
      "RequestRefNo":this.referenceNo,
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
                }
              }
          },
          (err) => { },
          ); 
  }
  onDeleteErrorRow(rowData){
    let ReqObj={
      "CompanyId":this.insuranceId,
      "ProductId":this.productId,
      "RowNum": rowData.RowNum
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/delete/records`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data){
            let res = data?.Result;
            if(data?.Message=='SUCCESS'){
                this.getValidRecordDetails();
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
      "RequestRefNo":this.referenceNo,
      "QuoteNo": this.quoteNo,
      "RiskId": "1",
      "Status": "Y"
    }
    let urlLink = `${this.UploadUrl}eway/vehicle/insert/records`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data){
                let res = data?.Result;
                if(data?.Message=='SUCCESS'){
                  this.errorRecords = [];this.uploadStatus=null;
                  this.employeeUploadRecords = [];
                  this.vehicleWishList=[];
                  this.getExistingVehiclesList();
                  
                  //this.getEmployeeDetails();
                }
              }
          },  
          (err) => { },
        );
  }
  checkDisableField(){
    let status = sessionStorage.getItem('QuoteStatus');
    return (this.adminSection && (status=='AdminRP' || status=='AdminRA'))
  }
  onEditVehicle(rowData){
    if(this.statusValue=='RA'){
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount'])
    }
    else{
      // if(rowData.SavedFrom == 'Customer'){
      //   sessionStorage.setItem('vehicleType','new');
      //   this.updateComponent.resetVehicleTab();
      //   sessionStorage.setItem('editVehicleDetails',rowData.Chassisnumber)
      //   sessionStorage.setItem('editVehicleId',String(rowData.Vehicleid));
      //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details'])
      // }
      // else{
        sessionStorage.setItem('vehicleType','edit');
        this.updateComponent.resetVehicleTab();
         sessionStorage.setItem('editVehicleId',String(rowData.Vehicleid));
         console.log("Final Filters 1",this.vehicleDetails,this.vehicleWishList,this.customerData)
         this.onWishListProceed.emit(this.customerData);
        //  this.setVehicleList('direct',null);
        //  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
      //}
    }

  }
  onCreateVehicle(){
    // let type: NbComponentStatus = 'danger';
    //   const config = {status: type,destroyByClick: true,duration: 4000,
    //     hasIcon: true,position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //     preventDuplicates: false,};
    let loginType = this.userDetails.Result.LoginType;
    let i=0;
    if(loginType){
      if(loginType=='B2CFlow'){
        this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;
        this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
          if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
          if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
          if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
          if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
          if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
          if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
          if(i>0) this.errorSection = true;
        }
      
    }
    
        if(i==0){
          let customerObj = {
            "Title":this.updateComponent.Title,
            "ClientName":this.updateComponent.UserName,
            "MobileCode":this.updateComponent.MobileCode,
            "MobileNo":this.updateComponent.MobileNo,
            "IdNumber":this.updateComponent.IdNumber,
            "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
            "EmailId":this.updateComponent.EmailId,
          }
          sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj))
          this.policyStartDate = this.updateComponent.policyStartDate;
          this.policyEndDate = this.updateComponent.policyEndDate;
          this.currencyCode = this.updateComponent.CurrencyCode;
          this.exchangeRate = this.updateComponent.exchangeRate;
          this.HavePromoCode = this.updateComponent.HavePromoCode;
          this.PromoCode = this.updateComponent.PromoCode;
            let vehicleData = {
              "vehicleWishList":this.vehicleWishList,
              "customerData": this.customerData
            }
            this.redirectCreateVehicle.emit(vehicleData);
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
                sessionStorage.setItem('vehicleLength',String(vehicleList.length))
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
    }
  }
  onDeleteVehicleWish(rowData){
    let vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
    if(vehicleDetails){
        vehicleDetails = vehicleDetails.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber);
        sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleDetails));
    }
    this.vehicleWishList = this.vehicleWishList.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber)
    if(this.vehicleWishList.length==0){
      this.searchSection = true;
    }
  }
  setVehicleList(type,id){
    if(type=='direct'){
      let k = 0,i=0,vehicleList=[];
      for(let veh of this.customerData){
        //veh['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
        //veh['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
        veh['PolicyStartDate']=this.policyStartDate;
        veh['PolicyEndDate']=this.policyEndDate;
        veh['Currency'] = this.currencyCode;
        veh['HavePromoCode'] = this.HavePromoCode;
        veh['PromoCode'] = this.PromoCode;
        veh['ExchangeRate'] = this.exchangeRate;
        veh['Active'] = true;
        vehicleList.push(veh);
        if(veh.Vehicleid>0) k=veh.Vehicleid;
        i+=1;
        if(i==this.customerData.length){
          if(this.endorsementSection && this.enableAddVehicle) sessionStorage.removeItem('editVehicleId')
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
                sessionStorage.removeItem('vehicleDetails');
                console.log("On Final Vehicle List 3",vehicleList)
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
              }
            }
          }
          else{

                sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleList));
                sessionStorage.setItem('vehicleType','edit');
                this.updateComponent.resetVehicleTab();
                sessionStorage.removeItem('vehicleDetails');
                console.log("On Final Vehicle List 2",vehicleList)
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
          }
        }
      }
    }
  }
  onSearchVehicle(){
    let loginType = this.userDetails.Result.LoginType;
    let i=0;
    if(loginType){
      if(loginType=='B2CFlow'){
        this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;
        this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
          if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
          if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
          if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
          if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
          if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
          if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
          if(i>0) this.errorSection = true;
        }
    }
        if(i==0){
          let customerObj = {
            "Title":this.updateComponent.Title,
            "ClientName":this.updateComponent.UserName,
            "MobileCode":this.updateComponent.MobileCode,
            "MobileNo":this.updateComponent.MobileNo,
            "IdNumber":this.updateComponent.IdNumber,
            "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
            "EmailId":this.updateComponent.EmailId,
          }
          sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj))
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
                        console.log("Error Iterate",data.ErrorMessage)
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
  }
  onSelectVehicle(rowData){
    this.vehicleDetails = rowData;
  }
  ongetBack(){
    this.getBack.emit();
  }
  WishListProceed(){
    console.log("Final Filters 2",this.vehicleDetails,this.vehicleWishList,this.customerData)
      this.updateComponent.vehicleWishList=this.vehicleWishList;
      this.onWishListProceed.emit(this.customerData);
  }
}
