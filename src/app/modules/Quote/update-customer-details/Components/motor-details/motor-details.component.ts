import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-motor-details',
  templateUrl: './motor-details.component.html',
  styleUrls: ['./motor-details.component.scss']
})
export class MotorDetailsComponent implements OnInit {

  drivenBy:any="D";gpsYn:any="Y";windYN:any="Y";minDate:Date;
  productList:any[]=[];productValue:any="";motorYN:any="Y";
  claimsYN:any="Y";playerType:any="R";collateralYN:any="N";
  borrowerList:any[]=[];borrowerValue:any="";fleetYN:any="N";
  collateralValue:boolean = false;fleetValue:boolean=false;
  ownerList:any[]=[];makeList:any[]=[];fuelTypeList:any[]=[];colorList:any[]=[];
  bodyTypeList:any[]=[];usageList:any[]=[];motorCategoryList:any[]=[];
  makeValue:any="";modelValue:any="";ownerName:any="";ownerCategory:any="";
  grossWeight:any="";tareWeight:any="";noOfAxels:any="";axelDistance:any="";
  chassisNo:any="";regNo:any="";engineNo:any="";engineCapacity:any="";manufactureYear:any="";
  fuelType:any="";colorValue:any="";motorCategory:any="";usageValue:any="";bodyTypeValue:any="";
  seatingCapacity:any="";

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public commonApiUrl:any = this.AppConfig.CommonApiUrl;
  modelList: any[]=[];
  customerDetails: any;
  loginId: any;agencyCode: any;
  userDetails: any; branchCode: any;
  productId: any;insuranceId: any;
  title: any;clientName: any;
  dateOfBirth: any;emailId: any;
  mobileNo: any;idNumber: any;
  clientType: string;
  editSection: boolean;
  years: any[]=[];
  currencyCode: any;
  exchangeRate: any;
  policyStartDate: any;
  policyEndDate: any;
  HavePromoCode: any;
  PromoCode: any;
  acExecutiveId: any;
  commissionType: any;
  referenceNo: string;
  bodyTypeId: any=null;modelDesc:any='';
  validSection: boolean=false;
  vehicleDetails: any;
  subuserType: string;
  userType: any;
  brokerbranchCode: any;
  branchList: any;
  brokerCode: any;
  sourceType: any;
  bdmCode: any;
  customerCode: any;
  customerName: any;
  endorsementSection: boolean=false;
  quoteRefNo: any;
  vehicleDetailsList: any[]=[];
  duplicateSection: boolean=false;
  constructor(private sharedService: SharedService,private datePipe:DatePipe,
    private router:Router, private updateComponent:UpdateCustomerDetailsComponent,) {
      this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
      this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.insuranceId = this.userDetails.Result.InsuranceId;
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.insuranceId = this.userDetails.Result.InsuranceId;
      let vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if(vehicleDetails) this.vehicleDetailsList = vehicleDetails;
      console.log("Vehicle Details List",vehicleDetails);
      this.getOwnerCategoryList();
   }

  ngOnInit(): void {  
    let referenceNo =  sessionStorage.getItem('customerReferenceNo');
    if(referenceNo){
      this.getCustomerDetails(referenceNo);
      this.referenceNo = referenceNo;
    }  
    
    // const max = new Date().getUTCFullYear();
    // const min = max - 60;
    // const yearRange = _.range(min, max + 1);

    // console.log(yearRange);
    this.years = this.getYearList();
  

  console.log("Year Drop down", this.years);
 

  }
  getCustomerDetails(refNo){
    let ReqObj = {
      "CustomerReferenceNo": refNo
    }
    let urlLink = `${this.commonApiUrl}api/getcustomerdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let customerDetails:any = data.Result;
          this.customerDetails = customerDetails;
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
    const currentYear = new Date().getFullYear()-20, years = [];
    while ( year >= currentYear ) {
      let yearEntry = year--
      years.push({"Code":String(yearEntry),"CodeDesc":String(yearEntry)});
    }   
    return years;
}
omit_special_char(event)
{
   var k;
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}

  getOwnerCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/ownercategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ownerList = data.Result;
            this.getFuelTypeList();
        }
      },
      (err) => { },
    );
  }
  getCurrentYear() {
    const date =  new Date();
    return date.getFullYear();
  }
  getYears(from) {
      const years = [];
      const currentYear = this.getCurrentYear();
      for (let index = 0; index <= currentYear - from; index++) {
          years.push(from + index);
      }

      return {years, currentYear};
  }
  onBodyTypeChange(type){
    if(this.bodyTypeValue!=null && this.bodyTypeValue!=''){
      this.bodyTypeId = this.bodyTypeList.find(ele=>ele.CodeDesc==this.bodyTypeValue)?.Code;
      if(type=='change'){this.makeValue=null;this.modelValue=null;}
      if(this.bodyTypeId) this.getMakeList();
    }
  }
  getMakeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/motormake`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.makeList = data.Result;
            
        }

      },
      (err) => { },
    );
  }
  getFuelTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/fueltype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.fuelTypeList = data.Result;
            this.getColorsList();
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
            this.getBodyTypeList();
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
            this.getUsageList();
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
            this.getMotorCategoryList();
        }

      },
      (err) => { },
    );
  }
  getMotorCategoryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.commonApiUrl}dropdown/motorcategory`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorCategoryList = data.Result;
            let chassisNo = sessionStorage.getItem('editVehicleDetails');
            if(chassisNo){
              this.editSection = true;
              this.getVehicleDetails('',chassisNo,'edit');
            }
            else{ this.editSection = false}
        }

      },
      (err) => { },
    );
  }
  onRegistrationSearch(){
      this.duplicateSection=false;this.editSection=false;this.validSection=false;
        if(this.regNo!=null && this.regNo!='' && this.regNo!=undefined){
          this.regNo = this.regNo.toUpperCase();
          this.editSection = true;
          sessionStorage.setItem('loadingType','motorSearch');
          let ReqObj = {
            "ReqChassisNumber": '',
            "ReqRegNumber": this.regNo,
            "InsuranceId": this.insuranceId,
            "BranchCode": this.branchCode,
            "BrokerBranchCode": this.branchCode,
            "ProductId": this.productId,
            "CreatedBy": this.loginId,
            "SavedFrom": 'API'
          }
          let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
              if(data.Result){
                let vehicleDetails:any = data?.Result;
                this.vehicleDetails = data?.Result;
                this.vehicleDetails.PolicyStartDate = this.datePipe.transform(this.updateComponent.policyStartDate, "dd/MM/yyyy");
                this.vehicleDetails.PolicyEndDate = this.datePipe.transform(this.updateComponent.policyEndDate, "dd/MM/yyyy");
                sessionStorage.removeItem('loadingType');
                if(this.vehicleDetailsList.length!=0){
                    let entry = this.vehicleDetailsList.some(ele=>ele.Registrationnumber==this.regNo);
                    if(entry){
                        this.duplicateSection = true;
                        this.validSection = false;
                    }
                    else this.onSaveSearchVehicles();
                }
                else this.onSaveSearchVehicles();
              }
              else if(data.ErrorMessage!=null){
                if(data.ErrorMessage.length!=0){
                  sessionStorage.removeItem('loadingType');
                  this.duplicateSection = false;
                  this.editSection = false;
                  this.validSection = true;
                }
              }
            },
            (err) => {
              
             },
            );
        }
  }
  onSaveSearchVehicles(){
    sessionStorage.removeItem('loadingType');
    this.duplicateSection = false;
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
          brokerbranchCode = this.brokerbranchCode;
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
      this.vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength');
      this.vehicleDetails['Active'] = false;
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
      if(this.endorsementSection){
        // let entry = this.customerData.filter(ele=>ele?.EndorsementDate!=undefined)
        // if(entry){
        //   let details = entry[0];
        //   console.log("Filtered Endorsement Set",entry)
        //   this.endorsementDate = details?.EndorsementDate;
        //   this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
        //   this.endorsementRemarks = details?.EndorsementRemarks;
        //   this.endorsementType = details?.EndorsementType;
        //   this.endorsementTypeDesc = details?.EndorsementTypeDesc;
        //   this.endtCategoryDesc = details?.EndtCategoryDesc;
        //   this.endtCount = details?.EndtCount;
        //   this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
        //   this.endtStatus = details?.EndtStatus;this.orginalPolicyNo = details?.OrginalPolicyNo;
        //   this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;this.isFinanceEndt = details?.IsFinanceEndt;
        // }
      }
      let sumInsured = null;
      if(this.vehicleDetails?.SUM_INSURED) sumInsured = this.vehicleDetails?.SUM_INSURED;
      let quoteReferenceNo = null;
      if(sessionStorage.getItem('quoteReferenceNo')) quoteReferenceNo = sessionStorage.getItem('quoteReferenceNo');
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
      "RequestReferenceNo": quoteReferenceNo,
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
      "EngineNumber": this.vehicleDetails?.EngineNumber?.toUpperCase(),
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
      "periodOfInsurance": null,
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
      "SavedFrom": this.vehicleDetails?.SavedFrom,
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
        ReqObj['PolicyNo'] = null
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
              sessionStorage.setItem('vehicleExist','true');
              sessionStorage.removeItem('vehicleDetailsList');
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])

          }
        },
        (err) => { },
      );
  }
  onModelChange(type){
    if(this.modelValue!=null && this.modelValue!=''){
      if(this.modelValue!='99999'){
        this.modelDesc = this.bodyTypeList.find(ele=>ele.CodeDesc==this.modelValue)?.CodeDesc;
      }
      
      else if(type=='change'){this.modelDesc = null}
    }
  }
  onMakeChange(){
    console.log("on make change",this.makeValue);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BodyId": this.bodyTypeId,
      "MakeId": this.makeValue
    }
    let urlLink = `${this.commonApiUrl}master/dropdown/motormakemodel`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.modelList = data.Result;
        }
      },
      (err) => { },
    );
  }
  onFormSubmit(){
    console.log('update',this.updateComponent.CurrencyCode);
    console.log('updateaa',this.updateComponent.HavePromoCode);
    let make = "";
    if(this.makeValue!='' && this.makeValue!=undefined && this.makeValue!=null){
      let entry = this.makeList.find(ele=>ele.Code==this.makeValue);
      make = entry.CodeDesc;
    }
    let modelDesc = null;
    if(this.bodyTypeId=='1' || this.bodyTypeId=='2' || this.bodyTypeId=='3' || this.bodyTypeId=='4' || this.bodyTypeId=='5'){
      if(this.modelValue=='99999'){
          modelDesc = this.modelDesc;
      }
      else if(this.modelValue!='' && this.modelValue!=null){
        modelDesc = this.modelList.find(ele=>ele.Code==this.modelValue)?.CodeDesc
      }
    }
    else modelDesc = this.modelDesc;
    let ReqObj = {
      "Insuranceid": this.insuranceId,
      "BranchCode": this.branchCode,
      "AxelDistance": this.axelDistance,
      "Chassisnumber": this.chassisNo?.toUpperCase(),
      "Color": this.colorValue,
      "CreatedBy": this.loginId,
      "EngineNumber": this.engineNo?.toUpperCase(),
      "FuelType": this.fuelType,
      "Grossweight": this.grossWeight,
      "ManufactureYear": this.manufactureYear,
      "MotorCategory": this.motorCategory,
      "Motorusage": this.usageValue,
      "NumberOfAxels": this.noOfAxels,
      "OwnerCategory": this.ownerCategory,
      "Registrationnumber": this.regNo?.toUpperCase(),
      "ResEngineCapacity": this.engineCapacity,
      "ResOwnerName": this.ownerName,
      "ResStatusCode": "Y",
      "ResStatusDesc": "None",
      "SeatingCapacity": this.seatingCapacity,
      "Tareweight": this.tareWeight,
      "Vehcilemodel": modelDesc,
      "VehicleType": this.bodyTypeValue,
      "Vehiclemake": make
    }
    let urlLink = `${this.motorApiUrl}regulatory/savevehicleinfo`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
              this.getVehicleDetails(this.regNo,this.chassisNo,'save');

        }
        else  if(data.ErrorMessage.length!=0){
          if(data.ErrorMessage){
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
          }
        }
      },
      (err) => { },
    );
  }
  getVehicleDetails(regNo,chassisNo,type){
    let ReqObj = {
      "ReqChassisNumber": chassisNo,
      "ReqRegNumber": regNo,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": this.branchCode,
      "ProductId": this.productId,
      "CreatedBy": this.loginId,
      "SavedFrom": 'WEB'
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
        if(data.Result){
          let vehicleDetails:any = data?.Result;
          vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength');
          vehicleDetails['Active'] = false;
          sessionStorage.removeItem('vehicleLength')
          let vehicles = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
          if(vehicles){
            vehicleDetails['Currency'] = this.updateComponent.CurrencyCode;
            vehicleDetails['ExchangeRate'] = this.updateComponent.exchangeRate;
            if(this.updateComponent.policyStartDate){
              vehicleDetails['PolicyStartDate'] =this.datePipe.transform(this.updateComponent.policyStartDate, "dd/MM/yyyy");
              vehicleDetails['PolicyEndDate'] = this.datePipe.transform(this.updateComponent.policyEndDate, "dd/MM/yyyy");
            }
            vehicleDetails['modifiedYN'] = 'Y';
            vehicleDetails['SourceType'] = this.updateComponent.sourceType;
            vehicleDetails['BrokerCode'] = this.updateComponent.brokerCode;
            vehicleDetails['BranchCode'] = this.updateComponent.branchValue;
            vehicleDetails['BrokerBranchCode'] = this.updateComponent.brokerBranchCode;
            vehicleDetails['CustomerCode'] = this.updateComponent.CustomerCode;
            vehicleDetails['CustomerName'] = this.updateComponent.CustomerName;
            vehicleDetails['HavePromoCode'] = this.updateComponent.HavePromoCode;
            vehicleDetails['PromoCode'] = this.updateComponent.PromoCode;
            vehicles.push(vehicleDetails);
            sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicles));
         }
          else{ 
            vehicleDetails['Currency'] = this.updateComponent.CurrencyCode;
            vehicleDetails['ExchangeRate'] = this.updateComponent.exchangeRate;
            if(this.updateComponent.policyStartDate){
              vehicleDetails['PolicyStartDate'] =this.datePipe.transform(this.updateComponent.policyStartDate, "dd/MM/yyyy");
              vehicleDetails['PolicyEndDate'] = this.datePipe.transform(this.updateComponent.policyEndDate, "dd/MM/yyyy");
            }
            vehicleDetails['modifiedYN'] = 'Y';
            vehicleDetails['SourceType'] = this.updateComponent.sourceType;
            vehicleDetails['BrokerCode'] = this.updateComponent.brokerCode;
            vehicleDetails['BranchCode'] = this.updateComponent.branchValue;
            vehicleDetails['BrokerBranchCode'] = this.updateComponent.brokerBranchCode;
            vehicleDetails['CustomerCode'] = this.updateComponent.CustomerCode;
            vehicleDetails['CustomerName'] = this.updateComponent.CustomerName;
            vehicleDetails['HavePromoCode'] = this.updateComponent.HavePromoCode;
            vehicleDetails['PromoCode'] = this.updateComponent.PromoCode;

            sessionStorage.setItem('vehicleDetailsList',JSON.stringify([vehicleDetails]));

          //this.updateComponent.CurrencyCode = this.updateComponent.vehicleWishList[0].Currency;
            /*this.currencyCode = this.updateComponent.CurrencyCode;
          this.exchangeRate = this.updateComponent.exchangeRate;
          this.policyStartDate = this.updateComponent.policyStartDate;
          this.policyEndDate = this.updateComponent.policyEndDate;
          this.HavePromoCode = this.updateComponent.HavePromoCode;
          this.PromoCode = this.updateComponent.PromoCode;
          console.log('update',this.updateComponent.CurrencyCode);
          //this.acExecutiveId = this.updateComponent.AcExecutiveId;
          //this.commissionType = this.updateComponent.vehicleWishList[0].CommissionType;
          /*this.updateComponent.CurrencyCode = this.updateComponent.customerData[0].Currency;
          this.currencyCode = this.updateComponent.customerData[0].Currency;
          this.exchangeRate = this.updateComponent.customerData[0].ExchangeRate;
          this.policyStartDate = this.updateComponent.customerData[0].PolicyStartDate;
          this.policyEndDate = this.updateComponent.customerData[0].PolicyEndDate;
          this.HavePromoCode = this.updateComponent.customerData[0].HavePromoCode;
          this.PromoCode = this.updateComponent.customerData[0].PromoCode;
          this.acExecutiveId = this.updateComponent.customerData[0].AcExecutiveId;
          this.commissionType = this.updateComponent.customerData[0].CommissionType;*/

          }


          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
          // if(type=='save'){
          //   if(this.editSection){
          //     sessionStorage.removeItem('vehicleDetails')
          //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
          //   }
          //   else{
          //   sessionStorage.removeItem('editVehicleId');
          //   vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength')
          //   sessionStorage.setItem('vehicleDetails',JSON.stringify(vehicleDetails));
          //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/vehicle-details'])
          //   }
          // }
          // else{
          //   this.setVehiclValues(vehicleDetails);
          // }
        }
      },
      (err) => { },
    );
  }
  
  //  changeYear(){
  //   const now = new Date().getUTCFullYear();
  // return Array(now - (now - 20)).fill('').map((v, idx) => now - idx) as Array<number>;
  // }
  setVehiclValues(vehDetails){
    this.axelDistance = vehDetails?.AxelDistance;
    this.chassisNo = vehDetails?.Chassisnumber;
    this.colorValue = vehDetails?.Color;
    this.engineNo = vehDetails?.EngineNumber;
    this.fuelType = vehDetails?.FuelType;
    this.grossWeight = vehDetails?.Grossweight;
    this.manufactureYear = vehDetails?.ManufactureYear;
    this.motorCategory = vehDetails?.MotorCategory;
    this.usageValue = vehDetails?.Motorusage;
    this.noOfAxels = vehDetails?.NumberOfAxels;
    this.ownerCategory = vehDetails?.OwnerCategory;
    this.regNo = vehDetails?.Registrationnumber;
    this.engineCapacity = vehDetails?.ResEngineCapacity;
    this.ownerName = vehDetails?.ResOwnerName;
    this.seatingCapacity = vehDetails?.SeatingCapacity;
    this.tareWeight = vehDetails?.Tareweight;
    if(vehDetails?.VehicleType!=null && vehDetails?.VehicleType!=''){
    this.bodyTypeValue = vehDetails?.VehicleType;
    this.onBodyTypeChange('direct');
    }
    if(vehDetails?.Vehiclemake!=null && vehDetails?.Vehiclemake!=''){
      let entry = this.makeList.find(ele=>ele.CodeDesc==vehDetails?.Vehiclemake);
      this.makeValue = entry.Code;
      this.onMakeChange();
      this.modelValue = this.modelValue = vehDetails?.Vehcilemodel;
    }
  }
  getBack(){
    sessionStorage.removeItem('vehicleDetailsList');
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details'])
  }
}
