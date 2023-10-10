import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { threadId } from 'worker_threads';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { elementAt } from 'rxjs/operators';
import { SharedService } from '../../../../../shared/shared.service';
declare var $:any;

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  drivenBy:any="D";gpsYn:any="N";windYN:any="Y";
  productList:any[]=[];productValue:any="";motorYN:any="Y";
  claimsYN:any="N";playerType:any="R";collateralYN:any="N";
  borrowerList:any[]=[];borrowerValue:any;fleetYN:any="N";
  collateralValue:boolean = false;fleetValue:boolean=false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  typeList: any[]=[];cityList:any[]=[];addSection:boolean = false;
  classList: any[]=[];cityValue:any;currencyValue:any;
  typeValue:any;classValue:any;bodyTypeValue:any;policyEndDate:any;
  exchangeRate:any="0";vehicleSI:any;accessoriesSI:any;
  windShieldSI:any;tppdSI:any;policyStartDate:any;minDate:Date;
  motorTypeList: any[]=[];currencyList:any[]=[];noOfDays:any;
  customerDetails: any;havePromoCodeYN:any;
  vehicleDetails: any;vehicleId: any;userDetails: any;
  loginId: any;agencyCode:any;branchCode:any;productId:any;
  insuranceId: any;requestReferenceNo:any=null;
  motorUsageValue: any;promoCode:any;
  motorUsageList: any[]=[];
  endMinDate: Date;
  title: any;clientName: any;dateOfBirth: any;
  emailId: any;mobileNo: any;idNumber: any;
  collateralName: any="";questionSection:boolean=false;
  firstLossPayee: any="";
  noOfVehicles: any="";noOfCompPolicy:any="";
  claimRatio: any="";customerHeader2:any[]=[];
  bankList: any[]=[];motorDetails:any;commissionType:any;
  clientType: string;customerData2:any[]=[];searchBy:any;
  branchList: any[]=[];executiveList:any[]=[];uwQuestionList:any[]=[];
  userType: any;acExecutiveId:any="";searchValue:any;brokerbranchCode:any;
  brokerCode: any="";brokerLoginId: any="";subuserType: any="";applicationId: any="";
  currentIndex: number;totalCount: any;vehicleDetailsList: any[]=[];
  finalSection: boolean;customerHeader:any[]=[];searchList:any[]=[];
  selectedVehicle: any;adminSection:boolean = false;issuerSection:boolean = false;
  customerCode: any;
  bdmCode: any;
  sourceType: any;endorsementSection:boolean=false;
  endorsementId: any;
  enableFieldsList: any;
  enableInsuranceType: boolean=false;
  enableVehicleSI: boolean=false;
  enableAccessoriesSI: boolean=false;
  enableWindshieldSI: boolean=false;
  enableTppdSI: boolean=false;
  enableBodyType: boolean=false;
  enableInsuranceClass: boolean=false;
  enableMotorUsage: boolean=false;
  enableClaimsYN: boolean=false;
  enableGpsYN: boolean=false;
  endorsementDate: any;
  endorsementEffectiveDate: any;
  endorsementRemarks: any;
  endorsementType: any;
  endorsementTypeDesc: any;
  endtCategoryDesc: any;
  endtCount: any;
  endtPrevPolicyNo: any;
  endtPrevQuoteNo: any;
  endtStatus: any;
  isFinanceEndt: any;
  orginalPolicyNo: any;
  endorsePolicyNo: any;
  endorsementName: any;
  endorseCategory: any;
  orgPolicyNo: string;
  endorseEffectiveDate: any;
  enableAddVehicle: boolean=false;
  enableFieldsSection: boolean = false;
  endorsementYn: any;tiraCoverNoteNo:any=null;
  endorseSIModification: boolean=false;
  OldExchangeRate: any;
  OldAcccessoriesSumInsured: any;
  OldCurrency: any;
  OldSumInsured: any;
  OldTppdIncreaeLimit: any;
  OldWindScreenSumInsured: any;
  changeUwSection: boolean;
  enableCollateralDetails: boolean=false;
  endorseCoverModification: any=null;
  customerName: any;
  constructor(private router:Router,private sharedService: SharedService,
    private updateComponent:UpdateCustomerDetailsComponent,
   private datePipe:DatePipe) {
    this.minDate = new Date();
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));

    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.requestReferenceNo = quoteRefNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Broker'){
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA'){
        this.adminSection = true;this.issuerSection = false;
      }
    }
    this.getInsuranceTypeList();
    
    this.getBorrowerList();
    this.getBankList();
    this.getUWDetails();
    this.getCityLimitList();
   }

  ngOnInit(): void {
    if(sessionStorage.getItem('endorsePolicyNo')){
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.endorseCoverModification = endorseObj?.CoverModificationYn
        console.log("Enable Obj in Vehicle",this.enableFieldsList,this.endorsementId)
        if(this.endorsementId!=42 && this.endorsementId!=842){
            this.enableInsuranceType = this.enableFieldsList.some(ele=>ele=='InsuranceType');
            this.enableInsuranceClass = this.enableFieldsList.some(ele=>ele=='InsuranceClass');
            this.enableBodyType = this.enableFieldsList.some(ele=>ele=='BodyType');
            this.enableMotorUsage = this.enableFieldsList.some(ele=>ele=='MotorUsage');
            this.endorseSIModification = this.enableFieldsList.some(ele=>ele=='Covers' && (this.endorsementId==850));
            this.enableClaimsYN = this.enableFieldsList.some(ele=>ele=='ClaimsYN');
            this.enableGpsYN = this.enableFieldsList.some(ele=>ele=='GpsYN');
            this.enableVehicleSI = this.enableFieldsList.some(ele=>ele=='VehicleSI');
            this.enableAccessoriesSI = this.enableFieldsList.some(ele=>ele=='AccessoriesSI');
            this.enableWindshieldSI = this.enableFieldsList.some(ele=>ele=='WindshieldSI');
            this.enableTppdSI = this.enableFieldsList.some(ele=>ele=='TppdSI');
            this.enableAddVehicle = this.enableFieldsList.some(ele=>ele=='addVehicle');
            this.enableCollateralDetails = this.enableFieldsList.some(ele=>ele=='CollateralDetails');
            console.log("Final Endorse",this.enableVehicleSI,this.enableAccessoriesSI)
        }
        else{
          this.enableInsuranceType = false;
          this.enableVehicleSI = false;
          this.enableAccessoriesSI = false;
          this.enableWindshieldSI = false;
          this.enableTppdSI = false;
          this.enableCollateralDetails = false;
        } 
      }
    }
    else{
      this.enableInsuranceType = false;
    }
    this.searchList = [
      { "Code":"","CodeDesc":"---Select---"},
      { "Code":"02","CodeDesc":"Register Number"},
      { "Code":"01","CodeDesc":"Chassis Number"},

    ];
    if(!this.endorsementSection){
      this.customerHeader =  [
        { key: 'Chassisnumber', display: 'Chassis Number' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'PolicyStartDate', display: 'Start Date'},
        { key: 'PolicyEndDate', display: 'End Date'},
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
       { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
        { key: 'OverallPremiumFc', display: 'Premium' },
        {
          key: 'actions',
          display: 'Action',
          config: {
            isEdit : true,
            isRemove: true,
          },
        }
      ];
    }
    else{
      this.customerHeader =  [
        { key: 'Chassisnumber', display: 'Chassis Number' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'PolicyStartDate', display: 'Start Date'},
        { key: 'PolicyEndDate', display: 'End Date'},
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
       { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
        { key: 'OverallPremiumFc', display: 'Premium' }
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
      { key: 'PolicyStartDate', display: 'Start Date'},
      { key: 'PolicyEndDate', display: 'End Date'},
      { key: 'Vehiclemake', display: 'Make' },
      { key: 'Vehcilemodel', display: 'Model' },
      { key: 'Status', display: 'Status' },


    ];
    
  }
  onChangeEndDate(){
    const oneday = 24 * 60 * 60 * 1000;
    const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    const formattedDatecurrent = new Date(this.policyStartDate);
    console.log(formattedDate);

  console.log(formattedDatecurrent);

  this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
  }
  getInsuranceTypeList(){
    let ReqObj = {
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.typeList = data.Result;
            
        }

      },
      (err) => { },
    );
  }
  getInsuranceClassList(){
    let loginId = null;
    if(this.userType!='Issuer'){
      this.subuserType = sessionStorage.getItem('typeValue');
      if(this.subuserType=='B2C') loginId = 'guest';
      else{
      loginId=this.loginId;
      }
    }
    else{
        loginId = this.vehicleDetailsList[0].LoginId;
        if(this.updateComponent.brokerLoginId) loginId = this.updateComponent.brokerLoginId
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode,
      "LoginId":loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/policytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.classList = data.Result;
            
        }
      },
      (err) => { },
    );
  }
  getBorrowerList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/borrowertype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.borrowerList = data.Result;
           
        }

      },
      (err) => { },
    );
  }
  getBankList(){
    let branchCode = '';
    if(this.adminSection || (this.userType!='Broker' && this.userType!='User')){
      branchCode = this.branchCode
    }
    else{
      branchCode = this.brokerbranchCode
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.bankList = data.Result;
           
        }

      },
      (err) => { },
    );
  }
  checkDisableField(){
    let status = sessionStorage.getItem('QuoteStatus');
    return (this.adminSection && (status=='AdminRP' || status=='AdminRA'))
  }
  onChangeBodyType(){
    if(this.bodyTypeValue=='7') this.cityValue='';
  }
  onEditVehicle(rowData){
    sessionStorage.setItem('editVehicleId',String(rowData.Vehicleid));
    window.location.reload();
  }
  getMotorTypeList(type,motorValue,vehicleUsage){
    let ReqObj = {
      "SectionId": this.typeValue,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bodytype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(type=='change') this.cityValue = null;
            this.motorTypeList = data.Result;
            this.bodyTypeValue = motorValue;
            // if(this.motorDetails){
            //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.VehicleType);
            //   if(value){ this.bodyTypeValue = value.Code}
            // }

            this.getMotorUsageList(vehicleUsage);
        }

      },
      (err) => { },
    );
  }
  getCurrencyList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/currency`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.currencyList = data.Result;
            
        }

      },
      (err) => { },
    );
  }
  getMotorUsageList(vehicleValue){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "SectionId": this.typeValue,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/dropdown/vehicleusage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.motorUsageList = data.Result;
            this.motorUsageValue = vehicleValue;
            // if(this.motorDetails){
            //   let value = this.motorTypeList.find(ele=>ele.CodeDesc == this.motorDetails?.Motorusage);
            //   if(value){ this.motorUsageValue = value.Code}
            // }

            //this.getMotorUsageList();
        }

      },
      (err) => { },
    );
  }
  getCityLimitList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/citylimit`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.cityList = data.Result;
            if(this.customerDetails){
              this.title = this.customerDetails?.TitleDesc;
              this.clientName = this.customerDetails?.ClientName;
              this.dateOfBirth = this.customerDetails?.DobOrRegDate;
              if(this.customerDetails?.PolicyHolderType == '1') this.clientType = "Individual";
              if(this.customerDetails?.PolicyHolderType == '2') this.clientType = "Corporate";
              this.emailId = this.customerDetails?.Email1;
              this.mobileNo = this.customerDetails?.MobileNo1;
              this.idNumber = this.customerDetails?.IdNumber;
            }
            let vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
            if(vehicleDetails){
              if(vehicleDetails.length!=0){
                let i=0;
                for(let vehicle of vehicleDetails){
                  if(vehicle.Active){
                      if(vehicle.RiskDetails){
                          vehicle['Chassisnumber'] = vehicle.RiskDetails.Chassisnumber;
                          vehicle['Registrationnumber'] = vehicle.RiskDetails.Registrationnumber;
                          vehicle['Vehiclemake'] = vehicle.RiskDetails.Vehiclemake;
                          vehicle['Vehcilemodel'] = vehicle.RiskDetails.Vehcilemodel;
                      }
                  }
                  i+=1;
                  if(i==vehicleDetails.length){
                    this.currencyValue = vehicleDetails[0].Currency;
                    this.exchangeRate = vehicleDetails[0].ExchangeRate;
                    console.log("Exchange Rate At 2",this.exchangeRate)
                    this.vehicleDetailsList = vehicleDetails;
                    this.acExecutiveId = vehicleDetails[0].AcExecutiveId;
                    this.commissionType = vehicleDetails[0].CommissionType;
                    this.havePromoCodeYN = vehicleDetails[0].HavePromoCode;
                    this.getInsuranceClassList();
                    if(this.policyStartDate==null || this.policyStartDate == '' || this.policyStartDate == undefined){
                      console.log("Vehicle Details on First Edit",this.policyStartDate,vehicleDetails[0])
                      if(vehicleDetails[0].PolicyStartDate != null ){
                        var dateParts = vehicleDetails[0].PolicyStartDate.split("/");
                        // month is 0-based, that's why we need dataParts[1] - 1
                        this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
                        console.log("Policy Start",this.policyStartDate)
                        //this.policyStartDate = dateObject.toString()
                      }
                      if(vehicleDetails[0].PolicyEndDate != null ){
                        var dateParts = vehicleDetails[0].PolicyEndDate.split("/");
                        // month is 0-based, that's why we need dataParts[1] - 1
                        this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
                        this.onChangeEndDate();
                      }
                    }
                    this.promoCode = vehicleDetails[0].PromoCode;
                    let vehicleId = sessionStorage.getItem('editVehicleId');
                    console.log("Vehicle Id on Edit",this.vehicleDetailsList);
                    //this.updateComponent.vehicleDetails = vehicleDetails;
                    // if(this.endorsementSection && this.enableAddVehicle){
                    //   index = this.vehicleDetailsList.findIndex(ele=>ele.EndorsementYn=='Y');
                    //   if(index>=0){
                    //     this.vehicleDetails = vehicleDetails[index];
                    //     this.vehicleId = String(vehicleDetails[index].Vehicleid);
                    //     this.motorDetails = vehicleDetails[index];
                    //     this.currentIndex = index+1;
                    //     this.totalCount = vehicleDetails.length;
                    //     console.log("Motor Details",this.motorDetails);
                    //     this.setVehicleValues('direct');
                    //   }
                    //   else{
                    //     this.vehicleDetails = vehicleDetails[index];
                    //     this.vehicleId = String(vehicleDetails[index].Vehicleid);
                    //     this.motorDetails = vehicleDetails[index];
                    //     this.currentIndex = index+1;
                    //     this.totalCount = vehicleDetails.length;
                    //     console.log("Motor Details",this.motorDetails);
                    //     this.setVehicleValues('direct');
                    //   }
                    // }
                    if(this.endorsementSection && this.enableAddVehicle){
                          
                      let index = this.vehicleDetailsList.findIndex(ele=>ele.EndorsementYn=='Y');
                      
                      if(index>=0){
                        if(index!=null && index!=undefined && index>=0){
                          this.enableFieldsSection = true;
                          }
                          if(vehicleDetails[index]?.Active==true){
                            this.vehicleId = String(vehicleDetails[index].Vehicleid);
                            this.getEditVehicleDetails(this.vehicleId,'direct');
                            this.currentIndex = index+1;
                            this.totalCount = vehicleDetails.length;
                          }
                          else{
                            this.vehicleDetails = vehicleDetails[index];
                            this.motorDetails = vehicleDetails[index];
                            this.currentIndex = index+1;
                            this.totalCount = vehicleDetails.length;
                            console.log("Motor Details",this.motorDetails);
                            this.setVehicleValues('direct');
                          }
                        }
                        else{
                          this.vehicleId = String(vehicleDetails[0].Vehicleid);
                          this.getEditVehicleDetails(this.vehicleId,'direct');
                          this.currentIndex = 1;
                          this.totalCount = vehicleDetails.length;
                        }
                    }
                    else if(vehicleId){
                      let index = this.vehicleDetailsList.findIndex(ele=>ele.Vehicleid==vehicleId);
                      if(vehicleDetails[index]?.Active==true){
                        this.vehicleId = String(vehicleDetails[index].Vehicleid);
                        this.getEditVehicleDetails(this.vehicleId,'direct');
                        this.currentIndex = index+1;
                        this.totalCount = vehicleDetails.length;
                      }
                      else{
                          //this.currencyValue = this.motorDetails.Currency;
                       
                      }
                    }
                    else if(this.endorsementSection && this.enableAddVehicle){
                          
                      let index = this.vehicleDetailsList.findIndex(ele=>ele.EndorsementYn=='Y');
                      if(index>=0){
                        if(index!=null && index!=undefined && index>=0){
                          this.enableFieldsSection = true;
                          }
                          if(vehicleDetails[index]?.Active==true){
                            this.vehicleId = String(vehicleDetails[index].Vehicleid);
                            this.getEditVehicleDetails(this.vehicleId,'direct');
                            this.currentIndex = 1;
                            this.totalCount = vehicleDetails.length;
                          }
                          else{
                            this.vehicleDetails = vehicleDetails[index];
                            this.motorDetails = vehicleDetails[index];
                            this.currentIndex = index+1;
                            this.totalCount = vehicleDetails.length;
                            console.log("Motor Details",this.motorDetails);
                            this.setVehicleValues('direct');
                          }
                        }
                        else{
                          this.vehicleId = String(vehicleDetails[0].Vehicleid);
                          this.getEditVehicleDetails(this.vehicleId,'direct');
                          this.currentIndex = 1;
                          this.totalCount = vehicleDetails.length;
                        }
                    }
                    else if(vehicleDetails[0]?.Active==true){
                        this.vehicleId = String(vehicleDetails[0].Vehicleid);
                        this.getEditVehicleDetails(this.vehicleId,'direct');
                        this.currentIndex = 1;
                        this.totalCount = vehicleDetails.length;
                    }
                    else{
                      this.vehicleDetails = vehicleDetails[0];
                      this.motorDetails = vehicleDetails[0];
                      this.currentIndex = 1;
                      this.totalCount = vehicleDetails.length;
                      console.log("Motor Details",this.motorDetails);
                      this.setVehicleValues('direct');
                      //this.currencyValue = this.motorDetails.Currency;
                      this.onCurrencyChange();
                    }
                  }
                }
                
  
  
              }
              else{
                let vehicleId = sessionStorage.getItem('editVehicleId');
                if(vehicleId){
                  this.getEditVehicleDetails(vehicleId,'direct');
                }
                else{
                  this.addSection = true;
                }
              }
            }
            else{
              
              if(sessionStorage.getItem('quoteReferenceNo')){
                this.requestReferenceNo = sessionStorage.getItem('quoteReferenceNo');
                this.getExistingVehiclesList();
              }
              
            }
            
        }

      },
      (err) => { },
    );
  }
  getExistingVehiclesList(){
    this.vehicleDetailsList = [];
    let ReqObj = {
      "RequestReferenceNo": this.requestReferenceNo
    }
    let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.vehicleDetailsList = data.Result;
            if(this.vehicleDetailsList.length!=0){
              this.updateComponent.CurrencyCode = this.vehicleDetailsList[0].Currency;
              this.currencyValue = this.vehicleDetailsList[0].Currency;
              this.exchangeRate = this.vehicleDetailsList[0].ExchangeRate;
              this.policyStartDate = this.vehicleDetailsList[0].PolicyStartDate;
              this.policyEndDate = this.vehicleDetailsList[0].PolicyEndDate;
              this.havePromoCodeYN = this.vehicleDetailsList[0].HavePromoCode;
              this.promoCode = this.vehicleDetailsList[0].PromoCode;
              this.acExecutiveId = this.vehicleDetailsList[0].AcExecutiveId;
              this.commissionType = this.vehicleDetailsList[0].CommissionType;
              this.updateComponent.setCommonValues(this.vehicleDetailsList[0]);
              for(let veh of this.vehicleDetailsList){
                veh['Active'] = true;
              }
              this.getInsuranceClassList();
              if(this.vehicleId==null || this.vehicleId==undefined || this.vehicleId=='') this.vehicleId = this.vehicleDetailsList[0].Vehicleid;
              this.getEditVehicleDetails(this.vehicleId,'direct')
              this.currentIndex = 1;
              this.totalCount = this.vehicleDetailsList.length;
            }
        }
      },
      (err) => { },
    );
  }
  onChangeClassType(){
    this.vehicleSI ="0";this.accessoriesSI="0",this.windShieldSI="0";this.tppdSI = "0";
  }
  getEditVehicleDetails(vehicleId,type){
    let ReqObj =  {
      "RequestReferenceNo": this.requestReferenceNo,
       "Idnumber": this.customerDetails?.IdNumber,
      "Vehicleid": vehicleId
     }
     let urlLink = `${this.motorApiUrl}api/getmotordetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.vehicleDetails = data.Result;
          this.vehicleDetails['OldExchangeRate'] = data?.Result.ExchangeRate;
          this.vehicleDetails['OldAcccessoriesSumInsured'] = data?.Result.AcccessoriesSumInsured;
          this.vehicleDetails['OldCurrency'] = data?.Result.Currency;
          this.vehicleDetails['OldSumInsured'] = data?.Result.SumInsured;
          this.vehicleDetails['OldTppdIncreaeLimit'] = data?.Result.TppdIncreaeLimit;
          this.vehicleDetails['OldWindScreenSumInsured'] = data?.Result.WindScreenSumInsured;
          //this.updateComponent.vehicleDetails = this.vehicleDetails;
          if(type!='save'){
            this.setVehicleValues('edit');
          }
          else{
            this.onFormSubmit('save');
          }
        }
      },
      (err) => { },
    );
  }
  setVehicleValues(type){
    console.log("Vehicle Details",this.vehicleDetails);
    this.vehicleId = String(this.vehicleDetails?.Vehicleid);
    console.log("Vehicle Id Setted",this.vehicleId);
    this.endorsementYn = this.vehicleDetails?.EndorsementYn;
    this.typeValue = this.vehicleDetails?.Insurancetype;
    this.classValue = this.vehicleDetails?.InsuranceClass;
    if(this.endorsementSection){
      if(this.vehicleDetails?.EndorsementDate){
        this.endorsementDate = this.vehicleDetails?.EndorsementDate;
        this.endorsementEffectiveDate = this.vehicleDetails?.EndorsementEffectiveDate;
        this.endorsementRemarks = this.vehicleDetails?.EndorsementRemarks;
        this.endorsementType = this.vehicleDetails?.EndorsementType;
        this.endorsementTypeDesc = this.vehicleDetails?.EndorsementTypeDesc;
        this.endtCategoryDesc = this.vehicleDetails?.EndtCategoryDesc;
        this.endtCount = this.vehicleDetails?.EndtCount;
        this.endtPrevQuoteNo = this.vehicleDetails?.EndtPrevQuoteNo;
        this.endtStatus = this.vehicleDetails?.EndtStatus;
        this.endtPrevPolicyNo = this.vehicleDetails?.EndtPrevPolicyNo;
        this.isFinanceEndt = this.vehicleDetails?.IsFinanceEndt;
        this.orginalPolicyNo = this.vehicleDetails?.OrginalPolicyNo;
      }
      else{
        let entry = this.vehicleDetailsList.filter(ele=>ele?.EndorsementDate!=undefined)
        if(entry){
          let details = entry[0];
          console.log("Filtered Endorsement Set",entry)
          this.endorsementDate = details?.EndorsementDate;
          this.endorsementEffectiveDate = details?.EndorsementEffectiveDate;
          this.endorsementRemarks = details?.EndorsementRemarks;
          this.endorsementType = details?.EndorsementType;
          this.endorsementTypeDesc = details?.EndorsementTypeDesc;
          this.endtCategoryDesc = details?.EndtCategoryDesc;
          this.endtCount = details?.EndtCount;
          this.endtPrevQuoteNo = details?.EndtPrevQuoteNo;
          this.endtStatus = details?.EndtStatus;this.orginalPolicyNo = details?.OrginalPolicyNo;
          this.endtPrevPolicyNo = details?.EndtPrevPolicyNo;this.isFinanceEndt = details?.IsFinanceEndt;
        }
        
      }
    }
    else{
      this.endorsementDate = null;
      this.endorsementEffectiveDate = null;
      this.endorsementRemarks = null;
      this.endorsementType = null;
      this.endorsementTypeDesc = null;
      this.endtCategoryDesc = null;
      this.endtCount = null;
      this.endtPrevQuoteNo = null;
      this.endtStatus = null;this.orginalPolicyNo = null;
      this.endtPrevPolicyNo = null;this.isFinanceEndt = null;
    }
    if(type=='edit'){
      this.getMotorTypeList('direct',this.vehicleDetails?.VehicleType,this.vehicleDetails?.Motorusage)
      this.bodyTypeValue = this.vehicleDetails?.VehicleType;
      this.tiraCoverNoteNo = this.vehicleDetails?.TiraCoverNoteNo;
      this.motorUsageValue = this.vehicleDetails?.Motorusage;
      this.collateralYN = this.vehicleDetails?.CollateralYn;
      if(this.collateralYN=='Y'){
        this.collateralValue = true;
        this.collateralName = this.vehicleDetails?.CollateralName;
        this.firstLossPayee = this.vehicleDetails?.FirstLossPayee;
        this.borrowerValue = this.vehicleDetails?.BorrowerType;
      }
      if(this.vehicleDetails?.FleetOwnerYn){
        if(this.fleetYN!='')
        this.fleetYN = this.vehicleDetails?.FleetOwnerYn;
        if(this.fleetYN=='Y'){
          this.fleetValue = true;
          this.noOfVehicles = this.vehicleDetails?.NoOfVehicles;
          this.noOfCompPolicy = this.vehicleDetails?.NoOfComprehensives;
          this.claimRatio = this.vehicleDetails?.ClaimRatio
        }
      }
    }
    else{

    }
    this.cityValue = this.vehicleDetails?.CityLimit;
    if(this.policyStartDate==null || this.policyStartDate == '' || this.policyStartDate == undefined){
      console.log("Vehicle Details on Edit",this.policyStartDate,this.vehicleDetails)
      if(this.vehicleDetails?.PolicyStartDate != null ){
        var dateParts = this.vehicleDetails?.PolicyStartDate.split("/");
  
        // month is 0-based, that's why we need dataParts[1] - 1
        this.policyStartDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        console.log("Policy Start",this.policyStartDate)
        //this.policyStartDate = dateObject.toString()
      }
      if(this.vehicleDetails?.PolicyEndDate != null ){
        var dateParts = this.vehicleDetails?.PolicyEndDate.split("/");
  
  // month is 0-based, that's why we need dataParts[1] - 1
        this.policyEndDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
        this.onChangeEndDate();
      }
    }
   
    if(type=='edit'){
      if(this.vehicleDetails?.NcdYn) this.claimsYN = this.vehicleDetails?.NcdYn;
      else this.claimsYN = 'N';
      if(this.vehicleDetails?.Gpstrackinginstalled) this.gpsYn = this.vehicleDetails?.Gpstrackinginstalled;
      else this.gpsYn = 'N';
      this.vehicleSI = String(this.vehicleDetails?.SumInsured);
      this.CommaFormatted();
      this.windShieldSI = String(this.vehicleDetails?.WindScreenSumInsured);
      this.WindSICommaFormatted();
      this.tppdSI = String(this.vehicleDetails?.TppdIncreaeLimit);
      this.TppdCommaFormatted();
      this.accessoriesSI = String(this.vehicleDetails?.AcccessoriesSumInsured);
      this.accessoriesCommaFormatted();
      this.getVehicleDetails(this.vehicleDetails?.Chassisnumber);
    }
    

  }
  onSearchVehicle(){
    this.customerData2 = [];
    if(this.searchBy!='' && this.searchBy!=null){
      let chassisNo = "",regNo = "";
      if(this.searchBy=='01'){
        chassisNo = this.searchValue
      }
      else{
        regNo = this.searchValue;
      }
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
        }
        else if(data.ErrorMessage){
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
            console.log("Error Iterate",data.ErrorMessage)
            //this.loginService.errorService(data.ErrorMessage);
          }
      }
      },
      (err) => { },
    );
    }
  }
  getVehicleDetails(chassisNo){
    let ReqObj = {
      "ReqChassisNumber": chassisNo,
      "ReqRegNumber": null
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
      this.updateComponent.vehicleDetails = data.Result;
      this.motorDetails = data.Result;
      console.log("Motor Details",this.motorDetails);
      }
      },
      (err) => { },
    );
  }
  onCurrencyChange(){
    if(this.currencyValue!=null && this.currencyValue!=''){
      let currencyData = this.currencyList.find(ele=>ele.Code==this.currencyValue);
      // this.exchangeRate = currencyData?.ExchangeRate;
      // console.log("Exchange Rate At 1",this.exchangeRate)
    }
  }
  onNextVehicle(){

  }
  onPreviousVehicle(){
    this.finalSection = false;
    this.currentIndex = this.currentIndex-1;
    if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
      this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
      if(this.endorsementSection && this.enableAddVehicle){
        if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
          if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
          else{ this.enableFieldsSection = false; }
        }
        else this.enableFieldsSection = false;
      } 
      this.getEditVehicleDetails(this.vehicleId,'direct');
    }
    else{

      this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
      this.motorDetails = this.vehicleDetailsList[this.currentIndex-1];
      this.totalCount = this.vehicleDetailsList.length;
      console.log("Motor Details",this.motorDetails);
      this.setVehicleValues('direct');
    }
    //this.currencyValue = this.motorDetails.Currency;
    //this.onCurrencyChange();
    $('#slider_0').removeClass('active w3-animate-left');
    $('#slider_0').removeClass('active w3-animate-right');
    $('#slider_0').addClass('active w3-animate-left');
  }
  onFormSubmit(type){
    sessionStorage.removeItem('loadingType');
    if(this.checkDisableField()){
      if(this.currentIndex<this.totalCount){
        this.collateralYN = "N";
        this.currentIndex = this.currentIndex+1;
          this.finalSection = false;
          if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
            if(this.endorsementSection && this.enableAddVehicle){
              if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
                if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                else{ this.enableFieldsSection = false; }
              }
              else this.enableFieldsSection = false;
            } 
            this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
            this.getEditVehicleDetails(this.vehicleId,'direct');
            this.totalCount = this.vehicleDetailsList.length;
            $('#slider_0').removeClass('active w3-animate-left');
            $('#slider_0').removeClass('active w3-animate-right');
            $('#slider_0').addClass('active w3-animate-right');
          }
          else{
              
            this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
            if(this.endorsementSection && this.enableAddVehicle){
              if(this.vehicleDetails?.EndorsementYn){
                if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                else this.enableFieldsSection = false;
              }
            } 
            this.motorDetails = this.vehicleDetailsList[this.currentIndex-1];
            this.totalCount = this.vehicleDetailsList.length;
            console.log("Motor Details",this.motorDetails);
            this.setVehicleValues('direct');
            $('#slider_0').removeClass('active w3-animate-left');
            $('#slider_0').removeClass('active w3-animate-right');
            $('#slider_0').addClass('active w3-animate-right');
          }
      }
    }
    else{
      let createdBy="";
      let startDate = "",endDate = "",vehicleSI="",accSI="",windSI="",tppSI="";
      if(this.vehicleSI==undefined) vehicleSI = null;
      else if(this.vehicleSI.includes(',')){ vehicleSI = this.vehicleSI.replace(/,/g, '') }
      else vehicleSI = this.vehicleSI;
      if(this.accessoriesSI==undefined) accSI = null;
      else if(this.accessoriesSI.includes(',')){ accSI = this.accessoriesSI.replace(/,/g, '') }
      else accSI = this.accessoriesSI
      if(this.windShieldSI==undefined) windSI = null;
      else if(this.windShieldSI.includes(',')){ windSI = this.windShieldSI.replace(/,/g, '') }
      else windSI = this.windShieldSI
      if(this.tppdSI==undefined) tppSI = null;
      else if(this.tppdSI.includes(',')){ tppSI = this.tppdSI.replace(/,/g, '') }
      else tppSI = this.tppdSI
      if(this.policyStartDate){
        if(this.endorsementSection && (this.enableAddVehicle && this.endorsementYn=='Y')){
           startDate = this.endorseEffectiveDate;
           const oneday = 24 * 60 * 60 * 1000;
            const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
            const formattedDate = moment(momentDate).format("YYYY-MM-DD");
            const formattedDatecurrent = new Date(startDate);
            console.log(formattedDate);
  
          console.log(formattedDatecurrent);
  
          this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
        }
        else if(this.endorsementSection && this.vehicleDetails?.Status=='D'){
          startDate = this.vehicleDetails?.PolicyStartDate;
          const oneday = 24 * 60 * 60 * 1000;
          const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
          const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          const formattedDatecurrent = new Date(this.vehicleDetails?.PolicyStartDate);
          console.log(formattedDate);
          this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
        }
        else{
          startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          const oneday = 24 * 60 * 60 * 1000;
          const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
          const formattedDate = moment(momentDate).format("YYYY-MM-DD");
          const formattedDatecurrent = new Date(this.policyStartDate);
          console.log(formattedDate);
          this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
        }
      }
      if(this.policyEndDate){
        if(this.endorsementSection && this.vehicleDetails.Status=='D'){
          endDate = this.endorseEffectiveDate;
        }
        else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
      }
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      this.subuserType = sessionStorage.getItem('typeValue');
      console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
      
      let appId = "1",loginId="",brokerbranchCode="";
      if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
          createdBy = this.vehicleDetailsList[0].CreatedBy;
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
          loginId = this.vehicleDetailsList[0].LoginId;
          loginId = this.updateComponent.brokerLoginId
          brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
        }
      }
      if(this.userType!='Broker' && this.userType!='User'){
        console.log("Vehicle Details",this.vehicleDetails,this.updateComponent.sourceType)
        if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
          this.sourceType = this.vehicleDetails.SourceType;
          this.bdmCode = this.vehicleDetails.BrokerCode;
          this.brokerCode = this.vehicleDetails.BrokerCode;
          brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
          this.customerCode = this.vehicleDetails.CustomerCode;
          this.customerName = this.vehicleDetails.CustomerName;
        }
        else{
          this.sourceType = this.updateComponent.sourceType;
          this.bdmCode = this.updateComponent.brokerCode;
          this.brokerCode = this.updateComponent.brokerCode;
          brokerbranchCode =  this.updateComponent.brokerBranchCode;
          this.customerCode = this.updateComponent.CustomerCode;
          this.customerName = this.updateComponent.CustomerName;
        }
        }
        else {
          this.sourceType = this.subuserType;
          this.customerCode = this.userDetails?.Result.CustomerCode;
        }
        if(this.customerName ==undefined) this.customerName = null;
      let refNo = "99999",regYear="99999",IdType="99999",IdNo="99999";
      if(this.customerDetails){refNo = this.customerDetails?.CustomerReferenceNo;
        IdNo = this.customerDetails?.IdNumber;
        regYear=this.customerDetails?.DobOrRegDate;IdType=this.customerDetails?.PolicyHolderType;};
    console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
    let ReqObj = {
      "BrokerBranchCode": brokerbranchCode,
      "AcExecutiveId": this.acExecutiveId,
      "CommissionType": this.commissionType,
      "CustomerCode": this.customerCode,
      "CustomerName": this.customerName,
      "BdmCode": this.customerCode,
      "BrokerCode": this.brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "ApplicationId": appId,
      "CustomerReferenceNo": refNo,
      "RequestReferenceNo": this.requestReferenceNo,
      "Idnumber": IdNo,
      "VehicleId": this.vehicleId ,
      "AcccessoriesSumInsured": accSI,
      "AccessoriesInformation": "",
      "AdditionalCircumstances": "",
      "AxelDistance": this.vehicleDetails?.AxelDistance,
      "Chassisnumber": this.vehicleDetails?.Chassisnumber,
      "Color": this.vehicleDetails?.Color,
      "CityLimit": this.cityValue,
      "CoverNoteNo": null,
      "OwnerCategory": this.vehicleDetails?.OwnerCategory,
      "CubicCapacity": this.vehicleDetails?.Grossweight,
      "CreatedBy": createdBy,
      "DrivenByDesc": this.drivenBy,
      "EngineNumber": this.vehicleDetails?.EngineNumber,
      "FuelType": this.vehicleDetails?.FuelType,
      "Gpstrackinginstalled": this.gpsYn,
      "Grossweight": this.vehicleDetails?.Grossweight,
      "HoldInsurancePolicy": "N",
      "Insurancetype": this.typeValue,
      "InsuranceId": this.insuranceId,
      "InsuranceClass": this.classValue,
      "InsurerSettlement": "",
      "InterestedCompanyDetails": "",
      "ManufactureYear": this.vehicleDetails?.ManufactureYear,
      "ModelNumber": null,
      "MotorCategory": this.vehicleDetails?.MotorCategory,
      "Motorusage": this.motorUsageValue,
      "NcdYn": this.claimsYN,
      "NoOfClaims": null,
      "NumberOfAxels": this.vehicleDetails?.NumberOfAxels,
      "BranchCode": this.branchCode,
      "AgencyCode": this.agencyCode,
      "ProductId": this.productId,
      "SectionId": this.typeValue,
      "PolicyType": IdType,
      "RadioOrCasseteplayer": null,
      "RegistrationYear": regYear,
      "Registrationnumber": this.vehicleDetails?.Registrationnumber,
      "RoofRack": null,
      "SeatingCapacity": this.vehicleDetails?.SeatingCapacity,
      "SourceType":this.sourceType,
      "SpotFogLamp": null,
      "Stickerno": null,
      "SumInsured": vehicleSI,
      "Tareweight": this.vehicleDetails?.Tareweight,
      "TppdFreeLimit": null,
      "TppdIncreaeLimit": tppSI,
      "TrailerDetails": null,
      "Vehcilemodel": this.vehicleDetails?.Vehcilemodel,
      "VehicleType": this.bodyTypeValue,
      "Vehiclemake": this.vehicleDetails?.Vehiclemake,
      "WindScreenSumInsured": windSI,
      "Windscreencoverrequired": null,
      "accident": null,
      "periodOfInsurance": this.noOfDays,
      "PolicyStartDate": startDate,
      "PolicyEndDate": endDate,
      "Currency" : this.currencyValue,
      "ExchangeRate": this.exchangeRate,
      "HavePromoCode": this.havePromoCodeYN,
      "PromoCode" : this.promoCode,
      "CollateralYn": this.collateralYN,
      "BorrowerType": this.borrowerValue,
      "CollateralName": this.collateralName,
      "FirstLossPayee": this.firstLossPayee,
      "FleetOwnerYn": this.vehicleDetails?.FleetOwnerYn,
      "NoOfVehicles": this.vehicleDetails?.NoOfVehicles,
      "NoOfComprehensives": this.noOfCompPolicy,
      "ClaimRatio": this.claimRatio,
      "SavedFrom": this.motorDetails?.SavedFrom,
      "UserType": this.userType,
      "TiraCoverNoteNo": this.tiraCoverNoteNo,
      "EndorsementYn": this.endorsementYn,
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
          "OldAcccessoriesSumInsured": this.vehicleDetails.OldAcccessoriesSumInsured,
          "OldCurrency": this.vehicleDetails.OldCurrency,
          "OldExchangeRate": this.vehicleDetails.OldExchangeRate,
          "OldSumInsured": this.vehicleDetails.OldSumInsured,
          "OldTppdIncreaeLimit": this.vehicleDetails.OldTppdIncreaeLimit,
          "OldWindScreenSumInsured": this.vehicleDetails.OldWindScreenSumInsured
        }
      }
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
            if(res.ErrorMessage){
            }
          }
          else{
            
            if(this.currentIndex<this.totalCount){
              this.collateralYN = "N";
              sessionStorage.setItem('loadingType','load');
              this.currentIndex = this.currentIndex+1;
                this.finalSection = false;
                if(this.vehicleDetailsList[this.currentIndex-1]?.Active==true){
                  if(this.endorsementSection && this.enableAddVehicle){
                    if(this.vehicleDetailsList[this.currentIndex-1]?.EndorsementYn){
                      if(this.vehicleDetailsList[this.currentIndex-1].EndorsementYn=='Y'){ this.enableFieldsSection = true;}
                      else{ this.enableFieldsSection = false; }
                    }
                    else this.enableFieldsSection = false;
                  } 
                  this.vehicleId = String(this.vehicleDetailsList[this.currentIndex-1].Vehicleid);
                  this.getEditVehicleDetails(this.vehicleId,'direct');
                  this.totalCount = this.vehicleDetailsList.length;
                  $('#slider_0').removeClass('active w3-animate-left');
                  $('#slider_0').removeClass('active w3-animate-right');
                  $('#slider_0').addClass('active w3-animate-right');
                }
                else{
                    
                  this.vehicleDetails = this.vehicleDetailsList[this.currentIndex-1];
                  if(this.endorsementSection && this.enableAddVehicle){
                    if(this.vehicleDetails?.EndorsementYn){
                      if(this.vehicleDetails.EndorsementYn=='Y') this.enableFieldsSection = true;
                      else this.enableFieldsSection = false;
                    }
                  } 
                  this.motorDetails = this.vehicleDetailsList[this.currentIndex-1];
                  this.totalCount = this.vehicleDetailsList.length;
                  console.log("Motor Details",this.motorDetails);
                  this.setVehicleValues('direct');
                  //this.currencyValue = this.vehicleDetailsList[this.currentIndex-1].Currency;
                  //this.onCurrencyChange();
                  $('#slider_0').removeClass('active w3-animate-left');
                  $('#slider_0').removeClass('active w3-animate-right');
                  $('#slider_0').addClass('active w3-animate-right');
                }
            }
            else{
                this.finalSection = true; 
                if(this.currentIndex-1==this.vehicleDetailsList.length) this.onFinalProceed();
            }
            this.requestReferenceNo = data?.Result?.RequestReferenceNo;
             sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
            let entry = this.vehicleDetailsList[this.currentIndex-1];
            entry['PolicyEndDate'] = endDate;
            entry['PolicyStartDate'] = startDate;
  
            entry['InsuranceType'] = data?.Result?.SectionId;
            entry['MSRefNo'] = data?.Result?.MSRefNo;
            entry['VdRefNo'] = data?.Result?.VdRefNo;
            entry['CdRefNo'] = data?.Result?.CdRefNo;
            entry['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
            entry['Active'] = true;
            entry['VehicleId'] = data.Result?.VehicleId;
            if(type=='proceedSave'){
              if(this.uwQuestionList.length!=0 && this.changeUwSection){
                let j = 0;
                let uwList:any[]=new Array();
                for(let ques of this.uwQuestionList){
                  ques['BranchCode'] = this.branchCode;
                  let createdBy="";
                    let quoteStatus = sessionStorage.getItem('QuoteStatus');
                    if(quoteStatus=='AdminRP'){
                        createdBy = this.vehicleDetailsList[0].CreatedBy;
                    }
                    else{
                      createdBy = this.loginId;
                    }
                    let status = null,loading = null;
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
                      "VehicleId": this.vehicleId
                    }
                    uwList.push(entry);
                  j+=1;
                  if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,entry,type,this.currentIndex-1);
                }
              }
              else{
                
                this.getCalculationDetails(entry,type,this.currentIndex-1,'proceedSave');
              }
            }
            else this.getCalculationDetails(entry,type,null,'proceedSave');
            
          }
        },
        (err) => { },
      );
    }
    
  }
  onSelectVehicle(rowData){
    this.selectedVehicle = rowData;
    this.selectedVehicle['Active']=false;
    let k=0;
    if(this.vehicleDetailsList.length!=0){
      let i=0;
      for(let veh of this.vehicleDetailsList){
        if(i==0){
          this.selectedVehicle['PolicyStartDate'] = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
          this.selectedVehicle['PolicyEndDate'] = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          this.selectedVehicle['Currency'] = this.currencyValue;
          this.selectedVehicle['ExchangeRate'] = this.exchangeRate;
          this.selectedVehicle['HavePromoCode'] = this.havePromoCodeYN;
          this.selectedVehicle['PromoCode'] = this.promoCode;
        }
        if(Number(veh.Vehicleid)>k) k=Number(veh?.Vehicleid);
        i+=1;
        if(i==this.vehicleDetailsList.length){
          this.selectedVehicle['Vehicleid'] = String(k+1);
        }
      }
    }
    else{
      this.selectedVehicle['Vehicleid'] = String(k+1);
    }
  }
  onDeleteVehicleWish(rowData){
    if(rowData.Active==false){
      let vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if(vehicleDetails){
          vehicleDetails = vehicleDetails.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber);
          console.log("Filtered Vehicle",vehicleDetails);
         
          if(vehicleDetails.length==0){
            sessionStorage.removeItem('vehicleDetailsList');
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
          }
          else{
            sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicleDetails));
          }
      }
      if(this.vehicleId==rowData.Vehicleid){
        this.currentIndex = 1;
      }
      this.vehicleDetailsList = this.vehicleDetailsList.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber);

      this.totalCount = this.vehicleDetailsList.length;
      if(this.vehicleDetailsList.length==0){
        sessionStorage.removeItem('vehicleDetailsList');
        window.location.reload();
      }
    }
    else{
      let vehicleId = rowData.Vehicleid;
      let ReqObj = {
        "RequestReferenceNo": this.requestReferenceNo,
        "Vehicleid": vehicleId
      }
      let urlLink = `${this.motorApiUrl}api/deletemotordetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          let res:any = data;
          if(res?.Result){
            // let type: NbComponentStatus = 'success';
            //   const config = {
            //     status: type,
            //     destroyByClick: true,
            //     duration: 4000,
            //     hasIcon: true,
            //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //     preventDuplicates: false,
            //   };
              this.vehicleDetailsList = this.vehicleDetailsList.filter(ele=>ele.ReqChassisNumber!=rowData.ReqChassisNumber);
              // this.toastrService.show(
              //   'Vehicle Details',
              //   'Vehicle Details Removed Successfully',
              //   config);
                this.totalCount = this.vehicleDetailsList.length;
                if(this.vehicleDetailsList.length==0){
                  sessionStorage.removeItem('vehicleDetailsList');
                  this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
                }
                else{
                  this.vehicleDetailsList = this.vehicleDetailsList.filter(ele=>ele.Vehicleid!=rowData.Vehicleid);
                  sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetailsList));

                  window.location.reload();
                }

          }
        },
        (err) => { },
      );


    }
  }
  onAddVehicleWishList(){
    let list:any[] = this.vehicleDetailsList;
    let entry = this.vehicleDetailsList.find(ele=>ele.Chassisnumber == this.selectedVehicle.Chassisnumber);
    // let type: NbComponentStatus = 'danger';
    // const config = {
    //   status: type,
    //   destroyByClick: true,
    //   duration: 4000,
    //   hasIcon: true,
    //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
    //   preventDuplicates: false,
    // };
    if(entry == undefined){

      this.vehicleDetailsList = [];
      this.vehicleDetailsList = list.concat([this.selectedVehicle]);
      this.vehicleDetails = null;
      sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetailsList))
      window.location.reload();
      console.log("Final List",this.vehicleDetailsList,this.totalCount,this.currentIndex)
    }
    else{
      // this.toastrService.show(
      //   'Chassis Number / Registration Number Already Available',
      //   'Duplicate Entry',
        
      //   config);
    }
    this.searchBy = ""; this.searchValue = null;this.selectedVehicle=null;
    this.customerData2 = [];
  }
  onVehicleValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {

    // format number
    if (this.vehicleSI) {
      this.vehicleSI = this.vehicleSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }}
    TppdCommaFormatted() {

      // format number
      if (this.tppdSI) {
       this.tppdSI = this.tppdSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }}
    accessoriesCommaFormatted() {

      // format number
      if (this.accessoriesSI) {
       this.accessoriesSI = this.accessoriesSI.replace(/[^0-9.]|(?<=\..*)/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
    WindSICommaFormatted() {
      // format number
      if (this.windShieldSI) {
       this.windShieldSI = this.windShieldSI.replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  onWindSIValueChange(event){
    this.windShieldSI = event;
  }
  getCalculationDetails(vehicleDetails,type,index,returnType){
    let createdBy="";
          let coverModificationYN = 'N';
          if(this.endorsementSection){
            // let entry = this.enableFieldsList.some(ele=>ele=='Covers');
            // if(entry && !this.endorseSIModification) coverModificationYN = 'Y';
            // else coverModificationYN = 'N';
            if(this.endorseCoverModification) coverModificationYN = this.endorseCoverModification
          }
          let quoteStatus = sessionStorage.getItem('QuoteStatus');
          if(quoteStatus=='AdminRP'){
              createdBy = this.vehicleDetailsList[0].CreatedBy;
          }
          else{
            createdBy = this.loginId;
          }
          let endDate:any = null;
          if(this.policyEndDate){
            if(this.endorsementSection && vehicleDetails.Status=='D'){
              coverModificationYN = 'Y';
              endDate = this.endorseEffectiveDate;
            }
            else endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
          }
          let effectiveDate=null;
          if(this.endorsementSection){
              effectiveDate = this.endorseEffectiveDate;
          }
          else {
            if(this.policyStartDate){
              effectiveDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
            }
          }
          
          
          let ReqObj = {
              "InsuranceId": this.insuranceId,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "SectionId": vehicleDetails?.InsuranceType,
              "ProductId": this.productId,
              "MSRefNo": vehicleDetails?.MSRefNo,
              "VehicleId": vehicleDetails?.VehicleId,
              "CdRefNo": vehicleDetails?.CdRefNo,
              "VdRefNo": vehicleDetails?.VdRefNo,
              "CreatedBy": createdBy,
              "productId": this.productId,
              "sectionId": this.typeValue,
              "RequestReferenceNo": this.requestReferenceNo,
              "EffectiveDate": effectiveDate,
              "PolicyEndDate": endDate,
              "CoverModification": coverModificationYN
          }
          let urlLink = `${this.CommonApiUrl}calculator/calc`;
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              let res:any = data;
              if(type=='save'){

              }
              else if(type=='proceedSave'){
                
                this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              }
              else if(type=='finalProceed'){
                if(index==this.vehicleDetailsList.length) this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              }
              else{
                if(type==null){
                  this.finalSection = true; 
                  if(index==this.vehicleDetailsList.length) this.onFinalProceed();
                }
                
                
              }
              // sessionStorage.setItem('coverObject',JSON.stringify(data?.CoverList));
              // this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              // console.log("Res",data);
            },
            (err) => { },
          );
  }
  onChangeUWValue(rowData,index,optionList){
    this.changeUwSection = true;
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
  onStartDateChange(){
    console.log("Start Date",this.policyStartDate)
    var d = this.policyStartDate;
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.endMinDate = new Date(this.policyStartDate);
    this.policyEndDate = new Date(year + 1, month, day-1);
    this.onChangeEndDate();
  }
  onCollateralChange(){
    console.log("final collateral",this.collateralYN);
    if(this.collateralValue) this.collateralYN = "Y";
    else this.collateralYN = "N";
  }
  onFleetChange(){
    this.noOfVehicles = null;this.noOfCompPolicy=null;this.claimRatio = null;
    if(this.fleetValue)this.fleetYN = "Y";
    else this.fleetYN = "N";
  }
  onGetBack(){
    if(this.productId=='5') sessionStorage.setItem('vehicleDetails',JSON.stringify(this.vehicleDetailsList));
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
    //sessionStorage.removeItem('vehicleDetailsList');
    // let value = sessionStorage.getItem('vehicleType');
    //   if(value=='edit'){

    //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/customer-details']);
    //   }
    //   if(value=='new'){
    //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/motor-details']);
    //   }
  }
  checkActiveVehicles(){
    if(this.vehicleDetailsList.length==0) return false;
    else if(this.vehicleDetailsList.length==1) return true;
    else {
      var exist=this.vehicleDetailsList.some(ele=>ele.Active==false);
      return !exist;
    }

  }
  onProceed(){
    if(this.checkDisableField()){
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }
    else if(this.vehicleDetailsList.length!=0){
      if(this.vehicleDetailsList.length==1){
        this.onFormSubmit('proceedSave');
      }
      else{
        this.onFinalProceed();
      }
    }
  }
  onFinalProceed(){
    let i=0,j=0;
    for(let veh of this.vehicleDetailsList){
      let refNo = veh?.MSRefNo;
      if(refNo==undefined && (veh?.modifiedYN=='Y' || this.requestReferenceNo==null || this.requestReferenceNo==undefined || this.endorsementSection || this.changeUwSection || (this.endorsementSection && (this.enableAddVehicle && this.endorsementYn=='Y')))){
        i+=1;
      }
      j+=1;
      if(j==this.vehicleDetailsList.length){
        console.log("Final I",i)
        if(i==0){
          sessionStorage.setItem('vehicleDetailsList',JSON.stringify(this.vehicleDetailsList));
          // if(this.uwQuestionList.length!=0){
          //   let i = 0;
          //   let uwList:any[]=new Array();
          //   for(let ques of this.uwQuestionList){
          //     ques['BranchCode'] = this.branchCode;
          //     let createdBy="";
          //       let quoteStatus = sessionStorage.getItem('QuoteStatus');
          //       if(quoteStatus=='AdminRP'){
          //           createdBy = this.vehicleDetailsList[0].CreatedBy;
          //       }
          //       else{
          //         createdBy = this.loginId;
          //       }
          //       let status = null,loading = null;
          //       if(ques.QuestionType == '01' && ques.Value!=null && ques.Value!='' && ques.Options!=null){
          //         let obj = ques.Options.find(ele=>ele.UwQuesOptionDesc==ques.Value);
          //         console.log("Found Obj",ques,obj)
          //         if(obj){
          //           loading = obj.LoadingPercent
          //           if(obj.ReferralYn=='Y') status = 'R';
          //           else status = 'Y';
          //         }
          //         else status = 'Y';
          //       }
          //       else status = ques.Status;
          //       let entry = {
          //         "InsuranceId": this.insuranceId,
          //         "ProductId": this.productId,
          //         "UwQuestionId": ques.UwQuestionId,
          //         "UwQuestionDesc": ques.UwQuestionDesc,
          //         "QuestionType": ques.QuestionType,
          //         "EffectiveDateStart": ques.EffectiveDateStart,
          //         "Status": status,
          //         "LoadingPercent": loading,
          //         "MandatoryYn": ques.MandatoryYn,
          //         "DataType": ques.DataType,
          //         "CreatedBy": createdBy,
          //         "UpdatedBy":  this.loginId,
          //         "Value": ques.Value,
          //         "BranchCode": this.branchCode,
          //         "RequestReferenceNo": this.requestReferenceNo,
          //         "VehicleId": this.vehicleId
          //       }
          //       uwList.push(entry);
          //     i+=1;
          //     if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList);
          //   }
          // }
          // else{
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          //}
          
        }
        else{
          
          this.saveExistData();
        }
      }
    }
  }
  onSaveUWQues(uwList,veh,type,i){
    if(uwList.length!=0){ 
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if(data.Result){
            this.getCalculationDetails(veh,type,i,'uwQues');
              // this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
        },
        (err) => { },
      );
    }
  }
  saveExistData(){
    let i = 0;
    for(let veh of this.vehicleDetailsList){
      let refNo = veh?.MSRefNo;
      if(refNo==undefined && (veh?.modifiedYN=='Y' || this.requestReferenceNo==null || this.requestReferenceNo==undefined || this.endorsementSection || this.changeUwSection)){
        let reqRefNo = veh?.RequestReferenceNo;
        if(reqRefNo == undefined){
          reqRefNo = null;
        }
        this.vehicleId = String(veh.Vehicleid);
        let ReqObj =  {
          "RequestReferenceNo": veh.RequestReferenceNo,
           "Idnumber": this.customerDetails?.IdNumber,
          "Vehicleid": veh.Vehicleid
         }
         let urlLink = `${this.motorApiUrl}api/getmotordetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data.Result){
              let vehicleDetails:any = data.Result;
              
              let startDate = "",endDate = ""
              //this.updateComponent.vehicleDetails = this.vehicleDetails;
              if(this.endorsementSection && this.enableAddVehicle && vehicleDetails.EndorsementYn=='Y'){
                startDate = this.endorseEffectiveDate;
                const oneday = 24 * 60 * 60 * 1000;
                 const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                 const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                 const formattedDatecurrent = new Date(startDate);
                this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
             }
             else if(this.policyStartDate){
              if(this.endorsementSection && veh.Status=='D'){
                startDate = veh.PolicyStartDate;
                const oneday = 24 * 60 * 60 * 1000;
                const momentDate = new Date(this.endorseEffectiveDate); // Replace event.value with your date value
                const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                const formattedDatecurrent = new Date(veh.PolicyStartDate);
                console.log(formattedDate);
                this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
              }
              else{
                startDate = this.datePipe.transform(this.policyStartDate, "dd/MM/yyyy");
                const oneday = 24 * 60 * 60 * 1000;
                const momentDate = new Date(this.policyEndDate); // Replace event.value with your date value
                const formattedDate = moment(momentDate).format("YYYY-MM-DD");
                const formattedDatecurrent = new Date(this.policyStartDate);
                console.log(formattedDate);
                this.noOfDays = Math.round(Math.abs((Number(momentDate)  - Number(formattedDatecurrent) )/oneday)+1);
              }
                
                
              }
              if(this.endorsementSection && veh.Status=='D'){
                endDate = this.endorseEffectiveDate;
              }
              else if(this.policyEndDate){
                
                 endDate = this.datePipe.transform(this.policyEndDate, "dd/MM/yyyy");
              }
             
              let createdBy="";
              let quoteStatus = sessionStorage.getItem('QuoteStatus');
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                  createdBy = this.vehicleDetailsList[0].CreatedBy;
              }
              else{
                createdBy = this.loginId;
              }
              if(this.userType=='Broker'){
                this.brokerCode = this.agencyCode;
                createdBy = this.loginId;
                
                this.applicationId = "01";
              }
              this.subuserType = sessionStorage.getItem('typeValue');
              console.log("AcExecutive",this.acExecutiveId);
              if(vehicleDetails?.FleetOwnerYn==null) vehicleDetails.FleetOwnerYn = 'N';
              let appId = "1",loginId="",brokerbranchCode="";
              brokerbranchCode = this.brokerbranchCode;
              console.log("Quote Status Received",quoteStatus)
              if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
                brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
                  createdBy = this.vehicleDetailsList[0].CreatedBy;
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
                  loginId = this.vehicleDetailsList[0].LoginId;
                  loginId = this.updateComponent.brokerLoginId
                  brokerbranchCode = this.vehicleDetailsList[0].BrokerBranchCode;
                }
              }
              if(this.userType!='Broker' && this.userType!='User'){
                console.log("Vehicle Details",this.vehicleDetails,this.updateComponent.sourceType)
                if(this.updateComponent.sourceType==null || this.updateComponent.sourceType==undefined){
                  
                  this.sourceType = this.vehicleDetails.SourceType;
                  this.bdmCode = this.vehicleDetails.BrokerCode;
                  this.brokerCode = this.vehicleDetails.BrokerCode;
                  brokerbranchCode =  this.vehicleDetails.BrokerBranchCode;
                  this.customerCode = this.vehicleDetails.CustomerCode;
                  this.customerName = this.vehicleDetails.CustomerName;
                }
                else{
                  this.sourceType = this.updateComponent.sourceType;
                  this.bdmCode = this.updateComponent.brokerCode;
                  this.brokerCode = this.updateComponent.brokerCode;
                  brokerbranchCode =  this.updateComponent.brokerBranchCode;
                  this.customerCode = this.updateComponent.CustomerCode;
                  this.customerName = this.updateComponent.CustomerName;
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
                console.log("AcExecutive",this.acExecutiveId,this.vehicleDetails,this.sourceType,this.bdmCode,this.brokerCode,this.customerCode);
              console.log("AcExecutive",this.acExecutiveId);
              let ReqObj = {
                "BrokerBranchCode": brokerbranchCode,
                "AcExecutiveId": this.acExecutiveId,
                "CommissionType": this.commissionType,
                "CustomerCode": this.customerCode,
                "CustomerName": this.customerName,
                "BdmCode": this.customerCode,
                "BrokerCode": this.brokerCode,
                "LoginId": loginId,
              "SourceType":this.sourceType,
              "SubUserType": this.subuserType,
              "ApplicationId": appId,
              "CustomerReferenceNo": refNo,
              "RequestReferenceNo": veh.RequestReferenceNo,
              "Idnumber": IdNo,
              "EndorsementYn": veh.EndorsementYn,
              "VehicleId": veh.Vehicleid,
              "AcccessoriesSumInsured": vehicleDetails?.AcccessoriesSumInsured,
              "AccessoriesInformation": "",
              "AdditionalCircumstances": "",
              "AxelDistance": vehicleDetails?.AxelDistance,
              "Chassisnumber": vehicleDetails?.Chassisnumber,
              "Color": vehicleDetails?.Color,
              "CityLimit": vehicleDetails?.CityLimit,
              "CoverNoteNo": null,
              "OwnerCategory": vehicleDetails?.OwnerCategory,
              "CubicCapacity": vehicleDetails?.Grossweight,
              "CreatedBy": createdBy,
              "DrivenByDesc": this.drivenBy,
              "EngineNumber": vehicleDetails?.EngineNumber,
              "FuelType": vehicleDetails?.FuelType,
              "Gpstrackinginstalled": this.gpsYn,
              "Grossweight": vehicleDetails?.Grossweight,
              "HoldInsurancePolicy": "N",
              "Insurancetype": vehicleDetails?.Insurancetype,
              "InsuranceId": this.insuranceId,
              "InsuranceClass": vehicleDetails?.InsuranceClass,
              "InsurerSettlement": "",
              "InterestedCompanyDetails": "",
              "ManufactureYear": vehicleDetails?.ManufactureYear,
              "ModelNumber": null,
              "MotorCategory": vehicleDetails?.MotorCategory,
              "Motorusage": vehicleDetails?.Motorusage,
              "NcdYn": vehicleDetails?.NcdYn,
              "NoOfClaims": null,
              "NumberOfAxels": vehicleDetails?.NumberOfAxels,
              "BranchCode": this.branchCode,
              "AgencyCode": this.agencyCode,
              "ProductId": this.productId,
              "SectionId": vehicleDetails?.Insurancetype,
              "PolicyType": IdType,
              "RadioOrCasseteplayer": null,
              "RegistrationYear": regYear,
              "Registrationnumber": vehicleDetails?.Registrationnumber,
              "RoofRack": null,
              "SeatingCapacity": vehicleDetails?.SeatingCapacity,
              "SpotFogLamp": null,
              "Stickerno": null,
              "SumInsured": vehicleDetails?.SumInsured,
              "Tareweight": vehicleDetails?.Tareweight,
              "TppdFreeLimit": null,
              "TppdIncreaeLimit": vehicleDetails?.TppdIncreaeLimit,
              "TrailerDetails": null,
              "Vehcilemodel": vehicleDetails?.Vehcilemodel,
              "VehicleType": vehicleDetails?.VehicleType,
              "Vehiclemake": vehicleDetails?.Vehiclemake,
              "WindScreenSumInsured": vehicleDetails?.WindScreenSumInsured,
              "Windscreencoverrequired": null,
              "accident": null,
              "periodOfInsurance": this.noOfDays,
              "PolicyStartDate": startDate,
              "PolicyEndDate": endDate,
              "Currency" : this.currencyValue,
              "ExchangeRate": this.exchangeRate,
              "HavePromoCode": this.havePromoCodeYN,
              "PromoCode" : this.promoCode,
              "CollateralYn": vehicleDetails?.CollateralYn,
              "BorrowerType": vehicleDetails?.BorrowerType,
              "CollateralName": vehicleDetails?.CollateralName,
              "FirstLossPayee": vehicleDetails?.FirstLossPayee,
              "FleetOwnerYn": vehicleDetails?.FleetOwnerYn,
              "NoOfVehicles": vehicleDetails?.NoOfVehicles,
              "NoOfComprehensives": vehicleDetails?.NoOfComprehensives,
              "ClaimRatio": vehicleDetails?.ClaimRatio,
              "SavedFrom": vehicleDetails?.SavedFrom,
              "UserType": this.userType,
              "TiraCoverNoteNo": vehicleDetails?.TiraCoverNoteNo,
              "EndorsementDate":vehicleDetails?.EndorsementDate,
              "EndorsementEffectiveDate": vehicleDetails?.EndorsementEffectiveDate,
              "EndorsementRemarks": vehicleDetails?.EndorsementRemarks,
              "EndorsementType": vehicleDetails?.EndorsementType,
              "EndorsementTypeDesc": vehicleDetails?.EndorsementTypeDesc,
              "EndtCategoryDesc": vehicleDetails?.EndtCategoryDesc,
              "EndtCount":vehicleDetails?.EndtCount,
              "EndtPrevPolicyNo":vehicleDetails?.EndtPrevPolicyNo,
              "EndtPrevQuoteNo": vehicleDetails?.EndtPrevQuoteNo,
              "EndtStatus": vehicleDetails?.EndtStatus,
              "IsFinanceEndt": vehicleDetails?.IsFinanceEndt,
              "OrginalPolicyNo": vehicleDetails?.OrginalPolicyNo,
              "Scenarios": {
                  "ExchangeRateScenario": {
                    "OldAcccessoriesSumInsured": vehicleDetails.AcccessoriesSumInsured,
                    "OldCurrency": vehicleDetails.Currency,
                    "OldExchangeRate": vehicleDetails.ExchangeRate,
                    "OldSumInsured": vehicleDetails.SumInsured,
                    "OldTppdIncreaeLimit": vehicleDetails.TppdIncreaeLimit,
                    "OldWindScreenSumInsured": vehicleDetails.WindScreenSumInsured
                  }
                }
              }
              if(this.endorsementSection){
                if(vehicleDetails?.Status == undefined || vehicleDetails?.Status == null || vehicleDetails?.Status == 'Y'){
                  ReqObj['Status'] = 'E';
                }
                else{
                  ReqObj['Status'] = vehicleDetails?.Status;
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
                    if(res.ErrorMessage){
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
                  else{
                    this.requestReferenceNo = data?.Result?.RequestReferenceNo;
                     sessionStorage.setItem('quoteReferenceNo',data?.Result?.RequestReferenceNo);
                     veh['InsuranceType'] = data?.Result?.SectionId;
                    veh['MSRefNo'] = data?.Result?.MSRefNo;
                    veh['VdRefNo'] = data?.Result?.VdRefNo;
                    veh['CdRefNo'] = data?.Result?.CdRefNo;
                    veh['RequestReferenceNo'] = data?.Result?.RequestReferenceNo;
                    this.updateComponent.quoteRefNo = data?.Result?.RequestReferenceNo;
                    veh['VehicleId'] = veh.Vehicleid
                    veh['Active'] = true;
                    console.log("Save Iterate",veh)
                    i+=1;
                    if(this.uwQuestionList.length!=0){
                      let j = 0;
                      let uwList:any[]=new Array();
                      for(let ques of this.uwQuestionList){
                        ques['BranchCode'] = this.branchCode;
                        let createdBy="";
                          let quoteStatus = sessionStorage.getItem('QuoteStatus');
                          if(quoteStatus=='AdminRP'){
                              createdBy = this.vehicleDetailsList[0].CreatedBy;
                          }
                          else{
                            createdBy = this.loginId;
                          }
                          let status = null,loading = null;
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
                            "VehicleId": veh.Vehicleid
                          }
                          uwList.push(entry);
                        // if(ques.QuestionType == '01'){
                        //   ques['CreatedBy'] = createdBy;
                        //   ques['RequestReferenceNo'] = this.requestReferenceNo;
                        //   ques['UpdatedBy'] = this.loginId;
                        //   ques["VehicleId"] = this.vehicleId
                        //   let entry = new Object();
                        //   entry = ques;
                        //   delete entry['Options'];
                        //   uwList.push(entry);
                        // } 
                        // else if(ques.Value!=""){
                        //   ques['CreatedBy'] = createdBy;
                        //   ques['RequestReferenceNo'] = this.requestReferenceNo;
                        //   ques['UpdatedBy'] = this.loginId;
                        //   ques["VehicleId"] = this.vehicleId
                        //   let entry = new Object();
                        //   entry = ques;
                        //   delete entry['Options'];
                        //   uwList.push(entry);
                        // } 
                        j+=1;
                        if(j==this.uwQuestionList.length) this.onSaveUWQues(uwList,veh,null,i);
                      }
                    }
                    else{
                      this.getCalculationDetails(veh,null,i,'finalProceed');
                    }
                    
                    // sessionStorage.setItem('editVehicleId',this.vehicleId);
                    // sessionStorage.removeItem('vehicleDetails');
                    // sessionStorage.setItem('vehChassisNo',this.vehicleDetails?.Chassisnumber);

                    // this.getCalculationDetails(data?.Result);
                  }
                },
                (err) => { },
              );
            }
          },
          (err) => { },
        );
      }
      else{
        i+=1;
        this.getCalculationDetails(veh,null,i,'finalProceed');
        // i+=1;
        // if(i==this.vehicleDetailsList.length) this.onFinalProceed();
      }
    }
  }
}
