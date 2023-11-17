import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referral-pending',
  templateUrl: './referral-pending.component.html',
  styleUrls: ['./referral-pending.component.scss']
})
export class ReferralPendingComponent implements OnInit {

  quoteHeader:any[]=[];
  quoteData:any[]=[];innerColumnHeader:any[]=[];
  innerTableData:any[]=[];userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  productId:any;insuranceId:any;userType:any;brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  referralData: any;
  section: any='quote';
  endorsementHeader: any;
  totalRecords: any;
  totalQuoteRecords: any;
  totalEndtRecords: any;
  quotePageNo: number;
  endtpageNo: number;
  limit: any='0';
  offset: any='60';
  startIndex: any;
  endIndex: any;
  pageCount: number;brokerCode:any='';
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
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
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
        {
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: true,
          },
        },
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
        {
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: true,
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
        { key: 'ReferalRemarks', display: 'ReferralRemarks' },
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
        { key: 'ReferalRemarks', display: 'ReferralRemarks' },
        {
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: true,
          },
        },
      ];
      this.endorsementHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'EndorsementTypeDesc', display: 'Endt Type'},
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        { key: 'ReferalRemarks', display: 'ReferralRemarks' },
        {
          key: 'actions',
          display: 'Action',
          config: {
            isEdit: true,
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
        { key: 'ReferalRemarks', display: 'ReferralRemarks' },
        { key: 'OverallPremiumFc', display: 'Premium' }
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
      loginId="";
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
  let urlLink = `${this.CommonApiUrl}api/referralpendingsdropdown`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change')
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change')
          }
      }
      
    },
    (err) => { },
  );

  }
  getExistingQuotes(element,entryType){
    if(element==null){ this.quoteData=[];this.referralData=[];}
    let appId = "1",loginId="",brokerbranchCode="",bdmCode=null;
    if(this.userType!='Issuer'){
      appId = "1"; loginId = this.brokerCode;
      brokerbranchCode = this.brokerbranchCode;
      bdmCode=this.agencyCode;
    }
    else{
      appId = this.loginId;
      loginId=this.brokerCode;
      brokerbranchCode = '';
    }
    let entry = this.brokerList.find(ele=>ele.Code==this.brokerCode);
    if(entry){
      console.log("Entry Received",entry) 
      if(entry.Type!='broker' && entry.Type!='Broker' && entry.Type!='Direct' && entry.Type!='direct' 
      && entry.Type!='Agent' && entry.Type!='agent' && entry.Type!='b2c' && entry.Type!='bank' && entry.Type!='whatsapp'){
        loginId='';
        bdmCode=this.brokerCode;
      }
      else{
        bdmCode=null;
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
            "BdmCode": bdmCode,
            "ProductId":this.productId,
            "Type":type,
            "Limit":this.limit,
            "Offset": this.offset
      }
      let urlLink = `${this.CommonApiUrl}api/referralpending`;
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
  setSection(val){this.section = val;this.getBrokerList()}
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
  onEditQuotes(rowData){
    if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined){
      this.checkStatus(rowData);
    } 
    else{
      sessionStorage.removeItem('endorsePolicyNo');
          sessionStorage.removeItem('endorseTypeId');
          sessionStorage.setItem('QuoteStatus','RP');
          sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
          sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
          sessionStorage.setItem('quoteNo',rowData.QuoteNo);
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }
    
  }
  checkStatus(rowData){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${rowData.QuoteNo}`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.result=='FAIL'){
          sessionStorage.removeItem('endorsePolicyNo');
          sessionStorage.removeItem('endorseTypeId');
          sessionStorage.setItem('QuoteStatus','RP');
          sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
          sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
          sessionStorage.setItem('quoteNo',rowData.QuoteNo);
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        }
        else{
          sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
          sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
          sessionStorage.setItem('quoteNo',rowData.QuoteNo);
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
        }
      });
  }
}
