import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import * as Mydatas from '../../../app-config.json';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-existing-customers',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  startdate:any;branchValue:any;
  public quoteData:any []=[];innerColumnHeader:any []=[];customerData:any[]=[];
  userDetails: any;
  loginId: any;
  userType: any;
  agencyCode: any;
  countryId: any;
  brokerbranchCode: any;
  productId: any;
  PackageYn: any;
  insuranceId: any;
  branchList: any;
  updateComponent: any;
  loginType: any;
  enddate:any;
  showgrid:any=false;

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  Currency:any;brokerList:any[]=[];
  brokerCode: any;
  // @Output('Currency') Currency:any='TZS';

  constructor(private router:Router,private sharedService: SharedService,private datePipe:DatePipe) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails",this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    //this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.PackageYn= this.userDetails.Result.PackageYn
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
   }

  ngOnInit(): void {

    if(this.insuranceId!=null){
      this.getBranchList();
      
    }
    this.quoteData =  [
      { key: 'PolicyNo', display: 'Policy No' },
      { key: 'QuoteNo', display: 'Quote No' },
      { key: 'CustomerName', display: 'Customer Name' },
      { key: 'StartDate', display: 'Start Date' },
      { key: 'EndDate', display: 'End Date' },
      { key: 'SumInured', display: 'Sum Inured' },
      { key: 'PolicyDesc', display: 'Policy Desc' },
      { key: 'CommisionAmt', display: 'Commision Amt' },
      { key: 'Premium', display: 'Premium' },
      { key: 'Currency', display: 'Currency' },
      { key: 'PaymentType', display: 'Payment Type' },
     
     
      // {
      //   key: 'edit',
      //   display: 'Vehicle Details',
      //   sticky: false,
      //   config: {
      //     isCollapse: true,
      //     isCollapseName:'Vehicles'
      //   },
      // },
      // {
      //   key: 'actions',
      //   display: 'Action',
      //   config: {
      //     isEdit: true,
      //   },
      // },
    ];
    this.innerColumnHeader =  [
      { key: 'Vehicleid', display: 'VehicleID' },
      { key: 'Registrationnumber', display: 'Registration No' },
      { key: 'Chassisnumber', display: 'Chassis No' },
      { key: 'Vehiclemake', display: 'Make' },
      { key: 'Vehcilemodel', display: 'Model' },
      // {
      //   key: 'actions',
      //   display: 'Action',
      //   config: {
      //     isEdit: true,
      //   },
      // },
      
    ];
  }
  
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        //let obj = [{Code:"",CodeDesc:"ALL"}];
        this.branchList = data?.Result;
        if(!this.branchValue){ this.branchValue = "";
         }

      }
    },
    (err) => { },
  );
} 

onCommonDocumentDownload(){
  let startdate=this.datePipe.transform(this.startdate, "dd/MM/yyyy");
  let enddate=this.datePipe.transform(this.enddate, "dd/MM/yyyy");
  let ReqObj = {
    "BranchCode": this.branchValue,
    "EndDate": enddate,
    "LoginId": this.loginId,
    "StartDate": startdate,
    "ProductId": this.productId,
  }
  let urlLink = `${this.CommonApiUrl}pdf/premium/report`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', data?.Result?.Base64);
      link.setAttribute('download', data?.Result?.FileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
  },
    (err) => { },
  );
}

getsearchs(){
  this.showgrid=false;
}

getsearch(){
  this.showgrid=true;
  this.getQuotes();
}
 
getQuotes(){
  let brokertype;let brokertypes;let brokerCode;
  if(this.brokerCode){
    if(this.brokerCode =='99999'){
      brokertype = "99999";
      brokerCode = "";
    }
    else{
      brokertypes=this.brokerList.filter(ele => ele.Code == this.brokerCode)
      if(brokertypes){
      brokertype = brokertypes[0].Type;
      console.log('brokerrs',brokertypes,brokertype)
    }
    brokerCode=this.brokerCode;
    }
  }
  
  
  this.customerData=[];
  let startdate=this.datePipe.transform(this.startdate, "dd/MM/yyyy");
  let enddate=this.datePipe.transform(this.enddate, "dd/MM/yyyy");
  let ReqObj = {
    "BranchCode": this.branchValue,
    "EndDate": enddate,
    "LoginId": this.loginId,
    "StartDate": startdate,
    "ProductId": this.productId,
    "Code":brokerCode,
    "UserType":brokertype
  }
  let urlLink = `${this.CommonApiUrl}pdf/getPremiumReportDetails`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      this.customerData=data.Result;
      this.Currency=this.customerData[0].Currency
    }
  },
  (err) => { },
);
}
getBrokerList(){
  let appId = "1",loginId="",brokerbranchCode="";
  if(this.userType!='Issuer'){
    appId = "1"; loginId = this.brokerCode;
    brokerbranchCode = this.brokerbranchCode;
  }
  else{
    appId = this.loginId;
    loginId=this.brokerCode;
    brokerbranchCode = '';
  }
  let ReqObj = {
    "ProductId": this.productId,
    "InsuranceId": this.insuranceId,
    "LoginId": loginId,
    "ApplicationId":appId,
    "UserType":this.userType,
    "BranchCode": this.branchValue,
    "Status": "Y",
  }
  let urlLink = `${this.CommonApiUrl}api/portfoliobrokerdropdown`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let defaultObj = [{"Code":"99999",CodeDesc:"ALL",Type:"99999"}];
        this.brokerList = defaultObj.concat(data.Result);
        if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
        else this.brokerCode = this.loginId;
        if(this.brokerCode!=null && this.brokerCode!=''){
          if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
          this.getQuotes();
        }
        else{
          this.brokerCode = this.brokerList[0].Code;
          this.getQuotes();
        }
      }
      
    },
    (err) => { },
  );

} 
}
