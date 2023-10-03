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
  section: any='quote';
  limit: any='0';
  quotePageNo: any;
  endtpageNo: any;
  totalRecords: any;
  totalQuoteRecords: any;
  startIndex: number;
  endIndex: number;
  totalEndtRecords: any;
  pageCount: any;brokerCode:any='';
  brokerList:any[]=[];
  constructor(private router:Router,private sharedService: SharedService) { 
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerCode = this.loginId;
    this.brokerList = []
    sessionStorage.removeItem('customerReferenceNo')
    sessionStorage.removeItem('loadingType');
    if(this.productId=='5' || this.productId=='46'){
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
    //if(this.userType=='Issuer'){
      this.getBrokerList();
    // }
    // else{
    //   this.getExistingQuotes(null,'change');
    // }
  }
  getBrokerList(){
    let type=null;
    if(this.section=='quote'){type='Q'}
    else type='E';
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
      "BranchCode": this.branchCode,
      "Type": type
  }
    let urlLink = `${this.CommonApiUrl}api/referralrejectdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = [{Code:'',CodeDesc:'--Select--'}]}
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.CodeDesc==this.brokerCode)) this.brokerCode = this.brokerList[0].CodeDesc;
            this.getExistingQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );
  
  }
  getExistingQuotes(element,entryType){
    if(element==null) this.quoteData=[];
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = null;
    }
    let type=null;
      if(this.section=='quote'){type='Q'}
      else type='E';
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
           "Type":type,
          "Limit":this.limit,
          "Offset":60
   }
    let urlLink = `${this.CommonApiUrl}api/referralrejected`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if(data.Result?.CustomerDetailsRes){
            if(data.Result?.CustomerDetailsRes.length!=0){
              this.totalRecords = data.Result?.TotalCount;
              this.totalQuoteRecords = data.Result?.TotalCount;
              this.pageCount = 10;
              if(entryType=='change'){
                this.quotePageNo = 1;
                this.endtpageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount+1;
                if(this.section=='quote'){
                  let quoteData = data.Result?.CustomerDetailsRes;
                  this.quoteData = data.Result?.CustomerDetailsRes;
                  if(quoteData.length<=this.pageCount){
                    endCount = quoteData.length
                  }
                  else endCount = this.pageCount;
                }
                else{
                  this.referralData = data.Result?.CustomerDetailsRes;
                  let referralData = data.Result?.CustomerDetailsRes;
                  if(referralData.length<=this.pageCount){
                    endCount = referralData.length
                  }
                  else endCount =this.pageCount;
                }
                this.startIndex = startCount;this.endIndex=endCount;
                console.log("Final Data",this.referralData,this.quoteData,this.section)
              }
              else{
                
                let startCount = element.startCount, endCount = element.endCount;
                this.pageCount = element.n;
                startCount = endCount+1;
                if(this.section=='quote'){
                  let quoteData = data.Result?.CustomerDetailsRes;
                  this.quoteData = this.quoteData.concat(data.Result?.CustomerDetailsRes);
                }
                else{
                  this.referralData = this.referralData.concat(data.Result?.CustomerDetailsRes);
                  let referralData = data.Result?.CustomerDetailsRes;
                }
                  if(this.totalQuoteRecords<=endCount+(element.n)){
                    endCount = this.totalQuoteRecords
                  }
                  else endCount = endCount+(element.n);
                this.startIndex = startCount;this.endIndex=endCount;
                console.log("Final Received Data",this.quoteData,this.referralData,this.startIndex,this.endIndex)
              }
              
              let datas = data.Result?.CustomerDetailsRes;
            }
            else{
              this.quoteData=[];this.referralData=[]}
            }
            //this.quoteData = data?.Result;
        }
        else this.section = 'quote';
      },
      (err) => { },
    );
  }
  onNextData(element){
    this.limit = String(Number(this.limit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.endtpageNo = this.endtpageNo+1;
    this.startIndex = element.startCount;
    this.endIndex = element.endCount
    this.getExistingQuotes(element,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
    if(this.section=='quote'){
      this.quotePageNo = this.quotePageNo-1;
    }
    else{
      this.endtpageNo = this.endtpageNo-1;
    }
    this.getExistingQuotes(element,'direct');
  }
  setSection(val){this.section = val;this.getExistingQuotes(null,'change')}
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
}
