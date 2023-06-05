import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import { ClientComponent } from '../../client.component';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-type',
  templateUrl: './client-type.component.html',
  styleUrls: ['./client-type.component.css']
})
export class ClientTypeComponent implements OnInit {

  countryList:any[]=[];genderList:any[]=[];
  occupationList:any[]=[];businessTypeList:any[]=[];
  countryValue:any="";genderValue:any="";occupationValue:any="";
  customerDetails:any;policyType:any;dob:any="";
  minDate:Date;
  regDate:Date;businessValue:any="";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;currentDate:Date;
  placeOfBirth: any="";Vrngst:any="";maxDate:Date;
  maxiDate:Date; userDetails:any;
  loginId:any;userType:any;insuranceId:any;productId:any;branchCode:any;
  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe,
    private clientComponent:ClientComponent) {
      this.currentDate = new Date();
      var d = new Date();
      let minDate = new Date();
      let regDate = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();

      this.maxiDate = new Date(year - 18 ,month,day);
      this.maxDate = new Date(year ,month, day-1);
      this.minDate = new Date(year - 100,month, day );
      this.regDate = new Date(year - 50,month, day );

    this.customerDetails = this.clientComponent.customerDetails;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails",this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.productId = this.userDetails.Result.ProductId;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    console.log("Child Details",this.customerDetails)
    if(this.customerDetails?.PolicyHolderType){
      this.policyType = this.customerDetails?.PolicyHolderType;
    }
    this.getCountryList();
  }

  ngOnInit(): void {
  }
  getCountryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.countryList = data.Result;
           this.getGenderList();
        }
      },
      (err) => { },
    );
  }
  getGenderList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/policyholdergender`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.genderList = data.Result;
           this.getOccupationList();
        }
      },
      (err) => { },
    );
  }
  getOccupationList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId":this.productId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.occupationList = data.Result;
           this.getBusinessTypeList();
        }
      },
      (err) => { },
    );
  }
  getBusinessTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/businesstype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
           this.businessTypeList = data.Result;
           this.setCustomerValues();
        }
      },
      (err) => { },
    );
  }
  setCustomerValues(){
    this.countryValue = this.customerDetails?.Nationality;
    this.genderValue = this.customerDetails?.Gender;
    /*if(this.customerDetails?.DobOrRegDate != null ){
      var dateParts = this.customerDetails?.DobOrRegDate.split("/");
      // month is 0-based, that's why we need dataParts[1] - 1
      this.dob = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
      //this.policyStartDate = dateObject.toString()
    }*/
    this.placeOfBirth = this.customerDetails?.Placeofbirth;
    this.occupationValue = this.customerDetails?.Occupation;
    this.Vrngst = this.customerDetails?.VrTinNo;
    this.businessValue = this.customerDetails?.BusinessType
  }
  onProceed(submitType){
    //let dob="";
    console.log("DOB Recieced",this.dob)
    /*if(this.dob!= undefined && this.dob!=null && this.dob!=''){
      dob = this.datePipe.transform(this.dob, "dd/MM/yyyy");
    }*/
    this.customerDetails['Nationality'] = this.countryValue;
    this.customerDetails['Gender'] = this.genderValue;
    /*this.customerDetails['DobOrRegDate'] = dob;
    console.log("DOBBBB",this.dob)*/
    this.customerDetails['Placeofbirth'] = this.placeOfBirth;
    this.customerDetails['Occupation'] = this.occupationValue;
    this.customerDetails['VrTinNo'] = this.Vrngst;
    this.customerDetails['BusinessType'] = this.businessValue;
    this.clientComponent.customerDetails = this.customerDetails;
    if(submitType == 'save'){
      this.clientComponent.onUpdateDetails('save');
     }
     else{
      this.router.navigate(['/Home/customer/Client/client-address'])
     }
 }
}
