import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-existing-quotes',
  templateUrl: './rejected-quotes.component.html',
  styleUrls: ['./rejected-quotes.component.scss']
})
export class RejectedQuotesComponent implements OnInit {

  quoteHeader:any[]=[];
  quoteData:any[]=[];innerColumnHeader:any[]=[];
  innerTableData:any[]=[];userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  productId:any;insuranceId:any;userType:any;brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  totalQuoteRecords: any;
  pageCount: number;
  quotePageNo: number;
  startIndex: number;
  endIndex: number;
  limit: any='0';
  constructor(private router:Router,private sharedService: SharedService) { 
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
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
        { key:'OverallPremiumLc',display: 'Premium'},
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
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'Count', display: 'Passengers' },
        { key: 'RejectReason', display: 'Rejected Reason' },
      ];
    }
    else if(this.productId=='3'){
      this.quoteHeader =  [
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'Count', display: 'No.Of.Risk' },
        { key: 'RejectReason', display: 'Rejected Reason' },
      ];
    }
  }

  ngOnInit(): void {
    this.getRejectedQuotes(null,'change');
  }
  getRejectedQuotes(element,entryType){
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
          "Limit":this.limit,
          "Offset":60
   }
    let urlLink = `http://192.168.1.8:8086/api/rejectedquotedetailsgrid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        sessionStorage.removeItem('loadingType');
        console.log(data);
        if(data.Result){
          if (data.Result?.Record) {
            if (data.Result?.Record.length != 0) {
              this.totalQuoteRecords = data.Result?.Count;
              this.pageCount = 10;
              if (entryType == 'change') {
                this.quotePageNo = 1;
                let startCount = 1, endCount = this.pageCount;
                startCount = endCount + 1;
                  let quoteData = data.Result?.Record;
                  this.quoteData = data.Result?.Record;
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
                  let quoteData = data.Result?.Record;
                  this.quoteData = this.quoteData.concat(data.Result?.Record);
                if (this.totalQuoteRecords <= endCount + (element.n)) {
                  endCount = this.totalQuoteRecords
                }
                else endCount = endCount + (element.n);
                this.startIndex = startCount; this.endIndex = endCount;
              }
            }
            else {
              alert("Entered")
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
    this.getRejectedQuotes(element,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getRejectedQuotes(element,'direct');
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
    this.router.navigate(['/Home/rejectedQuotes/customerSelection/customerDetails']);
  }
  
}
