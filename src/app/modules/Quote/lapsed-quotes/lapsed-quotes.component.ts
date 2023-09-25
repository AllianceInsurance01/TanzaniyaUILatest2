import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-existing-quotes',
  templateUrl: './lapsed-quotes.component.html',
  styleUrls: ['./lapsed-quotes.component.scss']
})
export class LapsedQuotesComponent implements OnInit {

  quoteHeader:any[]=[];
  LapsedList:any[]=[];
  quoteData:any[]=[];innerColumnHeader:any[]=[];
  innerTableData:any[]=[];userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  productId:any;insuranceId:any;userType:any;brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  totalQuoteRecords: any;
  pageCount: number;
  quotePageNo: any;
  startIndex: number;
  endIndex: number;
  limit: any='0';brokerCode:any='';
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
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('loadingType');
    if(this.productId=='5'){
      this.quoteHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'OverallPremiumLc', display: 'Premium' },
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
          display: 'Active',
          config: {
            isActive: true,
          },
        },
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
    else if(this.productId=='4'){
      this.quoteHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'OverallPremiumLc', display: 'Premium' },
        { key: 'Count', display: 'Passengers' },
        {
          key: 'actions',
          display: 'Active',
          config: {
            isActive: true,
          },
        },
      ];
    }
    else{
      this.quoteHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'OverallPremiumLc', display: 'Premium' },
        { key: 'Count', display: 'No.Of.Risk' },
        {
          key: 'actions',
          display: 'Active',
          config: {
            isActive: true,
          },
        },
      ];
    }
  }

  ngOnInit(): void {
    //if(this.userType=='Issuer'){
      this.getBrokerList();
    // }
    // else{
    //   this.getLapsedQuotes(null,'change');
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
      "ProductId": this.productId,
      "InsuranceId": this.insuranceId,
      "LoginId": loginId,
      "ApplicationId":appId,
      "UserType":this.userType,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdownlapsed`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = [{Code:'',CodeDesc:'--Select--'}]}
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.CodeDesc==this.brokerCode)) this.brokerCode = this.brokerList[0].CodeDesc;
            this.getLapsedQuotes(null,'change')
          }
        }
        
      },
      (err) => { },
    );

  }
  getLapsedQuotes(element,entryType){
    if(element==null) this.quoteData=[];
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
          "Limit":this.limit,
          "Offset":60
   }
    let urlLink = `${this.CommonApiUrl}api/lapsedquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        sessionStorage.removeItem('loadingType');
        if(data.Result){
          if (data.Result?.CustomerDetails) {
            if (data.Result?.CustomerDetails.length != 0) {
              this.totalQuoteRecords = data.Result?.TotalCount;
              this.pageCount = 10;
              if (entryType == 'change') {
                this.quotePageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.CustomerDetails;
                  this.quoteData = data.Result?.CustomerDetails;
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
                  let quoteData = data.Result?.CustomerDetails;
                  this.quoteData = this.quoteData.concat(data.Result?.CustomerDetails);
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
    this.getLapsedQuotes(element,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getLapsedQuotes(element,'direct');
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
  onEditQuotes(rowData){
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    this.router.navigate(['/Home/lapsedQuotes/customerSelection/customerDetails']);
  }
  onActiveDetals(rowData){
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "LoginId":this.loginId,
      "ProductId":this.productId,
      "Status":"Y",
      "RejectReason":"None"

    }
    let urlLink = `${this.CommonApiUrl}quote/updatestatus`;
    //http://192.168.1.18:8086/quote/updatestatus
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.LapsedList = data.Result;
          console.log('LLLLL',this.LapsedList);
        }
      },
      (err) => { },
    );
  }

}
