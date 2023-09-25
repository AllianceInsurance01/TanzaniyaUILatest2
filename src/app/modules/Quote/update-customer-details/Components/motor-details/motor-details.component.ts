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
  constructor(private sharedService: SharedService,private datePipe:DatePipe,
    private router:Router, private updateComponent:UpdateCustomerDetailsComponent,) {
      this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.agencyCode = this.userDetails.Result.OaCode;
      this.branchCode = this.userDetails.Result.BranchCode;
      this.productId = this.userDetails.Result.ProductId;
      this.insuranceId = this.userDetails.Result.InsuranceId;
      let vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
      if(vehicleDetails)
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
            this.getMakeList();
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
            this.getFuelTypeList();
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
              this.getVehicleDetails(chassisNo,'edit');
            }
            else{ this.editSection = false}
        }

      },
      (err) => { },
    );
  }
  onMakeChange(){
    console.log("on make change",this.makeValue);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
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
    let ReqObj = {
      "AxelDistance": this.axelDistance,
      "Chassisnumber": this.chassisNo,
      "Color": this.colorValue,
      "CreatedBy": "broker7",
      "EngineNumber": this.engineNo,
      "FuelType": this.fuelType,
      "Grossweight": this.grossWeight,
      "ManufactureYear": this.manufactureYear,
      "MotorCategory": this.motorCategory,
      "Motorusage": this.usageValue,
      "NumberOfAxels": this.noOfAxels,
      "OwnerCategory": this.ownerCategory,
      "Registrationnumber": this.regNo,
      "ResEngineCapacity": this.engineCapacity,
      "ResOwnerName": this.ownerName,
      "ResStatusCode": "Y",
      "ResStatusDesc": "None",
      "SeatingCapacity": this.seatingCapacity,
      "Tareweight": this.tareWeight,
      "Vehcilemodel": this.modelValue,
      "VehicleType": this.bodyTypeValue,
      "Vehiclemake": make
    }
    let urlLink = `${this.motorApiUrl}regulatory/savevehicleinfo`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
              this.getVehicleDetails(this.chassisNo,'save');

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
  getVehicleDetails(chassisNo,type){
    let ReqObj = {
      "ReqChassisNumber": chassisNo,
      "ReqRegNumber": null
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
        if(data.Result){
          let vehicleDetails:any = data?.Result;
          vehicleDetails['Vehicleid'] = sessionStorage.getItem('vehicleLength');
          vehicleDetails['Active'] = false;
          sessionStorage.removeItem('vehicleLength')
          let vehicles = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));

          console.log('VECHHHH',vehicles);
          console.log('Vechile Details', vehicleDetails)
          //console.log('update',this.updateComponent.CurrencyCode);
          //console.log('updateaa',this.updateComponent.HavePromoCode);

          if(vehicles){
            vehicles.push(vehicleDetails);
            sessionStorage.setItem('vehicleDetailsList',JSON.stringify(vehicles));
            //console.log('VECHHHHCCCCC',vehicles);
         }
          else{ 
            console.log("vehicle details",vehicleDetails)
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
    this.bodyTypeValue = vehDetails?.VehicleType;
    if(vehDetails?.Vehiclemake!=null && vehDetails?.Vehiclemake!=''){
      let entry = this.makeList.find(ele=>ele.CodeDesc==vehDetails?.Vehiclemake);
      this.makeValue = entry.Code;
      this.onMakeChange();
      this.modelValue = this.modelValue = vehDetails?.Vehcilemodel;
    }
  }
}
