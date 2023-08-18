import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referral-rejected',
  templateUrl: './referral-rejected.component.html',
  styleUrls: ['./referral-rejected.component.scss']
})
export class ReferralRejectedComponent implements OnInit {

  quoteHeader:any[]=[];
  quoteData:any[]=[];innerColumnHeader:any[]=[];
  innerTableData:any[]=[];userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  productId:any;insuranceId:any;userType:any;brokerbranchCode:any;endorsementHeader:any[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  referralData: any[]=[];
  section: any=null;
  constructor(private router:Router,private sharedService: SharedService) { 
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    sessionStorage.removeItem('customerReferenceNo')

    if(this.productId=='5'){
    this.quoteHeader =  [
      { key: 'RequestReferenceNo', display: 'Reference No' },
      { key: 'ClientName', display: 'Customer Name' },
      { key: 'PolicyStartDate', display: 'Policy Start Date' },
      { key: 'PolicyEndDate', display: 'Policy End Date' },
      
      {
        key: 'edit',
        display: 'Vehicle Details',
        sticky: false,
        config: {
          isCollapse: true,
          isCollapseName:'Vehicles'
        },
      },
      
      { key: 'RejectReason', display: 'Rejected Reason' },
      // {
      //   key: 'actions',
      //   display: 'Action',
      //   config: {
      //     isEdit: true,
      //   },
      // },
    ];
    this.endorsementHeader =  [
      { key: 'RequestReferenceNo', display: 'Reference No' },
      { key: 'ClientName', display: 'Customer Name' },
      { key: 'EndorsementTypeDesc', display: 'Endt Type'},
      { key: 'PolicyStartDate', display: 'Policy Start Date' },
      { key: 'PolicyEndDate', display: 'Policy End Date' },
      
      {
        key: 'edit',
        display: 'Vehicle Details',
        sticky: false,
        config: {
          isCollapse: true,
          isCollapseName:'Vehicles'
        },
      },
      
      { key: 'RejectReason', display: 'Rejected Reason' },
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
      { key: 'PolicyTypeDesc', display: 'Policy Type' },
      { key: 'ReferalRemarks', display: 'ReferralRemarks' },
      { key: 'AdminRemarks', display: 'AdminRemarks' },
      { key: 'OverallPremiumFc', display: 'Premium' },
      // {
      //   key: 'actions',
      //   display: 'Action',
      //   config: {
      //     isEdit: true,
      //   },
      // },
      
    ];
  }
    else{
      this.quoteHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        
        { key: 'RejectReason', display: 'Rejected Reason' },
        // {
        //   key: 'actions',
        //   display: 'Action',
        //   config: {
        //     isEdit: true,
        //   },
        // },
        /*{
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: false,
          },
        },*/
      ];
      this.endorsementHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'EndorsementTypeDesc', display: 'Endt Type'},
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        
        { key: 'RejectReason', display: 'Rejected Reason' },
        // {
        //   key: 'actions',
        //   display: 'Action',
        //   config: {
        //     isEdit: true,
        //   },
        // },
        /*{
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: false,
          },
        },*/
      ];
      this.innerColumnHeader =  [
        { key: 'Vehicleid', display: 'VehicleID' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'Chassisnumber', display: 'Chassis No' },
        { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
        { key: 'OverallPremiumFc', display: 'Premium' },
        { key: 'ReferalRemarks', display: 'ReferralRemarks' },
        { key: 'AdminRemarks', display: 'AdminRemarks' },
        // {
        //   key: 'actions',
        //   display: 'Action',
        //   config: {
        //     isEdit: true,
        //   },
        // },
      ];
    }
  }

  ngOnInit(): void {
    this.getExistingQuotes();
  }
  getExistingQuotes(){
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      brokerbranchCode = null;
    }
    let ReqObj = {
        "BrokerBranchCode": brokerbranchCode,
          "BranchCode":this.branchCode,
          "InsuranceId": this.insuranceId,
          "LoginId":loginId,
          "ApplicationId":appId,
          "UserType":this.userType,
          "SubUserType":sessionStorage.getItem('typeValue'),
          "SourceType":"",
          "BdmCode": this.agencyCode,
           "ProductId":this.productId,
          "Limit":"0",
          "Offset":"1000"
   }
    let urlLink = `${this.CommonApiUrl}api/referralrejected`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.quoteData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  onInnerData(rowData){
    let ReqObj = {
        "RequestReferenceNo": rowData.RequestReferenceNo
      }
      let urlLink = `${this.motorApiUrl}api/getallmotordetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            if(data.Result.length!=0){
              this.referralData = data.Result.filter(ele=>ele.EndorsementDate!=null);
              this.quoteData = data.Result.filter(ele=>ele.EndorsementDate==null);
              this.section = 'quote';
            }
            else this.section = 'quote';
          }
        },
        (err) => { },
      );
  }
  setSection(val){this.section = val;}
}
