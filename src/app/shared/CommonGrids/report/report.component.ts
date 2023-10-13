import { Component, OnInit } from '@angular/core';
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
      { key: 'PaymentType', display: 'Payment Type' },
      { key: 'Premium', display: 'Premium' },
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
        let obj = [{Code:"",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
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
    "StartDate": startdate
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
  let startdate=this.datePipe.transform(this.startdate, "dd/MM/yyyy");
  let enddate=this.datePipe.transform(this.enddate, "dd/MM/yyyy");
  let ReqObj = {
    "BranchCode": this.branchValue,
    "EndDate": enddate,
    "LoginId": this.loginId,
    "StartDate": startdate,
    "ProductId": this.productId,
  }
  let urlLink = `${this.CommonApiUrl}pdf/getPremiumReportDetails`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      this.customerData=data.Result
    }
  },
  (err) => { },
);
} 
}
