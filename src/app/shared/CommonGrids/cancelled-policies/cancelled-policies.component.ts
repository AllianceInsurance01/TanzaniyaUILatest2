import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import * as Mydatas from '../../../app-config.json';


@Component({
  selector: 'app-existing-customers',
  templateUrl: './cancelled-policies.component.html',
  styleUrls: ['./cancelled-policies.component.scss']
})
export class CancelledPoliciesComponent implements OnInit {

  public quoteData:any []=[];innerColumnHeader:any []=[];customerData:any[]=[];
  userDetails:any;loginId:any;agencyCode:any;brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchCode:any;productId:any;userType:any;insuranceId:any;quoteHeader:any[]=[];
  totalQuoteRecords: any;
  pageCount: number;
  quotePageNo: any;
  startIndex: number;
  endIndex: number;
  limit: any='0';brokerCode:any='';brokerList:any[]=[];
  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerList = [{Code:'',CodeDesc:'ALL'}]
    this.brokerCode = this.loginId;
    sessionStorage.removeItem('loadingType');
   }

  ngOnInit(): void {
    if(this.productId=='5'){
      this.quoteHeader =  [
        { key: 'OriginalPolicyNo', display: 'Policy No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'ClientName', display: 'Customer Name' },
        // { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'Currency', display: 'Currency' },
        { key: 'OverallPremiumLc', display: 'Premium' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        
        //{ key: 'ClientName', display: 'Customer Name' },
        // { key: 'CreditNo', display: 'Credit Note No' },
        // { key: 'DebitNoteNo', display: 'Debit Note No' },
        
        {
          key: 'edit',
          display: 'Vehicle Details',
          sticky: false,
          config: {
            isCollapse: true,
            isCollapseName:'Vehicles'
          },
        },

      ];
      this.innerColumnHeader =  [
        { key: 'Vehicleid', display: 'VehicleID' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'Chassisnumber', display: 'Chassis No' },
        { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
        { key: 'OverallPremiumFc', display: 'Premium' },

        // {
        //   key: 'actions',
        //   display: 'Schedule',
        //   config: {
        //     isSchedule: true,
        //   },
        // },

      ];
    }
    else{
      this.quoteHeader =  [
        { key: 'OriginalPolicyNo', display: 'Policy No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Insured Name' },
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },

        // { key: 'CreditNo', display: 'Credit Note No' },
        // { key: 'DebitNoteNo', display: 'Debit Note No' },
        
        // {
        //   key: 'edit',
        //   display: 'Vehicle Details',
        //   sticky: false,
        //   config: {
        //     isCollapse: true,
        //     isCollapseName:'Vehicles'
        //   },
        // },

      ];
    }
    //if(this.userType=='Issuer'){
      this.getBrokerList();
    // }
    // else{
    //   this.getExistingQuotes(null,'change');
    // }
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
      "ApplicationId":appId,
      "UserType":this.userType,
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "Status": "Y",
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/cancelpolicyportfoliodropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = [{Code:'',CodeDesc:'ALL'}]
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerCode!=null){
            if(!this.brokerList.some(ele=>ele.CodeDesc==this.brokerCode)) this.brokerCode = this.brokerList[0].CodeDesc;
            this.getExistingQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );

  }
  getExistingQuotes(element,entryType){
    if(element==null) this.quoteData = [];
    let appId = "1",loginId="",brokerbranchCode="";
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.loginId;
      brokerbranchCode = this.brokerbranchCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
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
          "Limit": this.limit,
          "Offset":60
   }
    let urlLink = `${this.CommonApiUrl}api/portfolio/cancelled`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.PortfolioList) {
            if (data.Result?.PortfolioList.length != 0) {
              this.totalQuoteRecords = data.Result?.Count;
              this.pageCount = 10;
              if (entryType == 'change') {
                this.quotePageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.quoteData = data.Result?.PortfolioList;
                  if (quoteData.length <= this.pageCount) {
                    endCount = quoteData.length
                  }
                  else endCount = this.pageCount;
                
                this.startIndex = startCount; this.endIndex = endCount;
              }
              else {

                let startCount = element.startCount, endCount = element.endCount;
                this.pageCount = element.n;
                startCount = endCount + 1;
                  let quoteData = data.Result?.PortfolioList;
                  this.quoteData = this.quoteData.concat(data.Result?.PortfolioList);
                if (this.totalQuoteRecords <= endCount + (element.n)) {
                  endCount = this.totalQuoteRecords
                }
                else endCount = endCount + (element.n);
                this.startIndex = startCount; this.endIndex = endCount;
              }
            }
            else {
              this.quoteData = []; 
            }
          }
        }
      },
      (err) => { },
    );
  }
  onNextData(element){
    this.limit = String(Number(this.limit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.startIndex = element.startCount;
    this.endIndex = element.endCount
    this.getExistingQuotes(element,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getExistingQuotes(element,'direct');
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
              rowData.MotorList = data.Result;
          }
        },
        (err) => { },
      );
  }  
  
  
     
 
}
