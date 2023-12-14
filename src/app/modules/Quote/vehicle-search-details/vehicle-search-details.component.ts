import { Component } from '@angular/core';
import * as Mydatas from '../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-vehicle-search-details',
  templateUrl: './vehicle-search-details.component.html',
  styleUrls: ['./vehicle-search-details.component.css']
})
export class VehicleSearchDetailsComponent {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  userType: any=null;
  loginId: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  productId: any;
  insuranceId: any;issuerSection:boolean=false;
  brokerCode: any;policyPeriodExceed:boolean=false;
  motorDetails: any;ChassisNo:any='';Code:any;
  branchValue:any;branchList:any[]=[];productList:any[]=[];
  brokerList: any[]=[];
  customerCode: any=null;
  customerName: any=null;
  brokerBranchCode: any=null;
  brokerLoginId: any=null;
  brokerBranchList: any[]=[];
  customerList: any[];
  showCustomerList: boolean;
  branchValueError: boolean;
  sourceCodeError: boolean;
  customerCodeError: boolean;
  brokerCodeError: boolean;
  brokerBranchCodeError: boolean;
  sampleResponse: any;
  totalQuoteRecords: any;
  pageCount: number;
  quotePageNo: number;
  quoteData: any[]=[];
  startIndex: number;
  endIndex: number;
  limit: any='0';
  quoteHeader: any[]=[];
  sourceCodeDesc: null;
  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.branchValue = this.branchCode;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('updatebar');
    sessionStorage.removeItem('loadingType');
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('firstLoad');
    sessionStorage.removeItem('VechileDetails');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('quoteReferenceNo');
  }

  ngOnInit(): void {
    this.quoteHeader =  [
      { key: 'RegisterNumber', display: 'Registration No' },
      { key: 'RequestReferenceNo', display: 'Reference No' },
      { key: 'QuoteNo', display: 'Quote No' },
      { key: 'ClientName', display: 'Customer Name' },
      { key: 'PolicyStartDate', display: 'Start Date' },
      { key: 'PolicyEndDate', display: 'End Date' },
      { key: 'OverallPremiumLc', display: 'Premium' },
      {
        key: 'actions',
        display: 'Edit',
        config: {
          //isView:true,
          isEdit: true,
          // isReject: true,
        },
      },
      // {
      //   key: 'mail',
      //   display: 'Mail / Followup / Sms',
      //   config: {
      //     isMail:true,
      //     isFollowup: true,
      //     isSms: true,
      //   },
      // },

    ];
    if(this.userType!='Broker' && this.userType!='User'){ this.issuerSection = true;this.getSourceList()}
    else this.issuerSection = false
    
  }
  getSourceList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode
    }
    //let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
    let urlLink = `${this.CommonApiUrl}dropdown/getsourcetype`; 
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.productList = data.Result;
            //console.log(this.sourceCode)



        }
        /*if(this.sourceCode =='Broker')
        {
        this.getBrokersList();
        }
      else(this.sourceCode =='Agent')
      {
        //this.getBranchList()
      }*/

      },

      (err) => { },
    );
  }
  onSourceTypeChange(type){
    this.sourceCodeDesc = null;
    if(this.Code!=null && this.Code!='' && this.Code!=undefined){
      let entry = this.productList.find(ele=>ele.Code==this.Code);
      if(entry) this.sourceCodeDesc = entry?.CodeDesc;
    }
    let ReqObj = {
      "SourceType": this.sourceCodeDesc,
      "BranchCode":  this.branchValue,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}api/search/premiasourcecode`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          //this.branchList = data.Result;
          this.brokerList = data.Result;
          //if(this.Code=='Agent') this.executiveSection = true;
          if(type=='change'){
            this.customerCode = null;
            this.customerName=null;
            this.brokerCode = null;
            this.brokerBranchCode = null;
            this.brokerLoginId = null;
          }
          else{
            //if(this.Code=='Broker' || this.Code=='Agent'){
              let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
              if(entry){
                console.log("Found Entries",this.brokerCode,entry,this.Code)
                this.brokerLoginId = entry.Name; 
              }
              if(this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='agent' || this.sourceCodeDesc == 'bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc == 'Agent' || this.sourceCodeDesc =='Direct' || this.sourceCodeDesc == 'Bank' || this.sourceCodeDesc == 'whatsapp'){
                if(type=='change'){
                  
                }
                this.getBrokerBranchList('direct');
                
              }
              else this.onGetCustomerList('direct',this.customerCode);
            // }
            // else if(this.brokerCode){
            //   let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
            //  if(entry){
            //   this.brokerLoginId = entry.Name; 
            //   this.brokerBranchCode = null;
            //   this.updateComponent.brokerCode = this.brokerCode;
            //   this.updateComponent.brokerLoginId = this.brokerLoginId;
            //   this.updateComponent.brokerBranchCode = this.brokerBranchCode;
            //   console.log("Broker Code Rec",this.brokerCode,this.brokerLoginId,entry,this.brokerList)
            //  }
             
            // }
          }
          
      },
      (err) => { },
    );
    
  }
  getBrokerBranchList(type){
    let urlLink = `${this.ApiUrl1}api/brokerbranches`;
    let ReqObj = {
      "BrokerCode": this.brokerCode,
      "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "SearchValue": "",
      "ProductId": this.productId
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.brokerBranchList = data?.Result;
            if(this.brokerBranchList.length==1){
              this.brokerBranchCode = this.brokerBranchList[0].Code;
              if(type=='change'){
                
              }
            }
            
          }
        },
        (err) => { },
      );
  }
  onGetCustomerList(type,code){
    if(this.userType=='Issuer'){
      if(code!='' && code!=null && code!=undefined){
        let branch = null;
        if(this.userType=='issuer'){branch = this.brokerBranchCode;}
        else branch = this.branchValue
        let ReqObj = {
          "SourceType": this.sourceCodeDesc,
          "BranchCode":  branch,
          "InsuranceId": this.insuranceId,
          "SearchValue":code
        }
        let urlLink = `${this.ApiUrl1}api/search/premiabrokercustomercode`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
                this.customerList = data.Result;
                if(type=='change'){
                  this.showCustomerList = true;
                  this.customerName = null;
                }
                else{
                  this.showCustomerList = false;
                  let entry = this.customerList.find(ele=>ele.Code==this.customerCode);
                  this.customerName = entry.Name;
                  this.setCustomerValue(this.customerCode,this.customerName,'direct')
                }
                
          },
          (err) => { },
        );
      }
      else{
        this.customerList = [];
      }
    }
    else{
      this.customerCode = this.userDetails.Result.CustomerCode;
        this.customerName = this.userDetails.Result.UserName;
    }
    
  }
  onNextData(element){
    this.limit = String(Number(this.limit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.startIndex = element.startCount;
    this.endIndex = element.endCount
    this.getExistingQuoteList(this.ChassisNo,element,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getExistingQuoteList(this.ChassisNo,element,'direct');
  }
  onBrokerChange(){
    //if(this.Code=='Broker' || this.Code=='Agent'){
      let entry = this.brokerList.find(ele=>String(ele.Code)==this.brokerCode);
      if(entry){
        this.brokerLoginId = entry.Name; 
      }
      this.getBrokerBranchList('change');
    }
  setCustomerValue(code,name,type){
    this.showCustomerList = false;
      this.customerCode = code;
      this.customerName = name;
      if(this.issuerSection){
        this.brokerCode = null;
          this.brokerBranchCode = null;
          this.brokerLoginId = null;
      }
  }
  checkMandatories(value){
    if(this.issuerSection){
      let i=0;
          if(this.branchValue=='' || this.branchValue==null || this.branchValue==undefined){this.branchValueError=true;i+=1;}
          if(this.Code=='' || this.Code==null || this.Code==undefined){this.sourceCodeError=true;i+=1;}
          if(this.sourceCodeDesc=='Premia Agent' || this.sourceCodeDesc=='Premia Broker' || this.sourceCodeDesc=='Premia Direct'){
            if(this.customerCode=='' || this.customerCode==null || this.customerCode==undefined){alert('Error');this.customerCodeError=true;i+=1;}
          }
          else if(this.sourceCodeDesc=='agent' || this.sourceCodeDesc=='broker' || this.sourceCodeDesc=='direct' || this.sourceCodeDesc=='bank' || this.sourceCodeDesc=='Broker' || this.sourceCodeDesc=='whatsapp'){
            if(this.brokerCode=='' || this.brokerCode==null || this.brokerCode==undefined){this.brokerCodeError=true;i+=1;}
            if(this.brokerBranchCode=='' || this.brokerBranchCode==null || this.brokerBranchCode==undefined){this.brokerBranchCodeError=true;i+=1;}
          }
          if(i==0){ this.getExistingQuoteList(value,null,'change')}
    }
    else{ this.brokerBranchCode= this.brokerbranchCode;this.getExistingQuoteList(value,null,'change') }
  }
  getExistingQuoteList(value,element,entryType){
    this.policyPeriodExceed = false;
    let regNo = null,chassisNo = '';
     regNo=String(value).toUpperCase();
     let ReqObj = {
      "BranchCode":this.branchCode,
      "BrokerBranchCode":this.brokerBranchCode,
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "CreatedBy": this.loginId,
      "Limit":this.limit,
      "Offset":60,
      "RegisterNumber": regNo
    }
    let urlLink = `${this.CommonApiUrl}api/regnumberquotes`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
            if (data.Result?.RegisterNumberQuotes) {
              if (data.Result?.RegisterNumberQuotes.length != 0) {
                this.totalQuoteRecords = data.Result?.TotalCount;
                this.pageCount = 10;
                if (entryType == 'change') {
                  this.quotePageNo = 1;
                  let startCount = 1, endCount = this.pageCount;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.RegisterNumberQuotes;
                    this.quoteData = data.Result?.RegisterNumberQuotes;
                    if (quoteData.length <= this.pageCount) {
                      endCount = quoteData.length
                    }
                    else endCount = this.pageCount;
                  
                  this.startIndex = startCount; this.endIndex = endCount;
                  console.log("QuoteData",this.quoteData)
                }
                else {
  
                  let startCount = element.startCount, endCount = element.endCount;
                  this.pageCount = element.n;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.RegisterNumberQuotes;
                    this.quoteData = this.quoteData.concat(data.Result?.RegisterNumberQuotes);
                  if (this.totalQuoteRecords <= endCount + (element.n)) {
                    endCount = this.totalQuoteRecords
                  }
                  else endCount = endCount + (element.n);
                  this.startIndex = startCount; this.endIndex = endCount;
                }
              }
              else {
                this.quoteData = []; 
                this.getVehicleDetails(value);
              }
            }
    },
    (err) => { },
    );
  }
  getVehicleDetails(value){
    this.policyPeriodExceed = false;
    let regNo = null,chassisNo = '';
     regNo=String(value).toUpperCase();
     let ReqObj = {
      "ReqChassisNumber":chassisNo,
      "ReqRegNumber":regNo,
      "InsuranceId":this.insuranceId,
      "BranchCode": this.branchCode,
      "BrokerBranchCode": this.brokerBranchCode,
      "ProductId": this.productId,
      "CreatedBy": this.loginId,
      "SavedFrom": 'WEB'
    }
    let urlLink = `${this.motorApiUrl}regulatory/showvehicleinfo`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
      this.motorDetails = data.Result;
      if(this.motorDetails.ErrorMessage!=null){
        this.policyPeriodExceed = true;
        setTimeout(() => {this.policyPeriodExceed = false;},8000);
      }
      else if(this.motorDetails.PolicyHolderInfo){
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerBranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchValue;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        sessionStorage.setItem('customerReferenceNo',this.motorDetails.PolicyHolderInfo.CustomerReferenceNo);
        sessionStorage.setItem('firstLoad','yes');
        this.router.navigate(['/Home/customer/ClientDetails']);
      }
      else{
        this.motorDetails['SourceType'] = this.Code;
        this.motorDetails['CustomerCode'] = this.customerCode;
        this.motorDetails['CustomerName'] = this.customerName;
        this.motorDetails['BrokerBranchCode'] = this.brokerBranchCode;
        this.motorDetails['BrokerCode'] = this.brokerCode;
        this.motorDetails['BranchCode'] = this.branchValue;
        this.motorDetails['BrokerLoginId'] = this.brokerLoginId;
        sessionStorage.setItem('VechileDetails', JSON.stringify(this.motorDetails));
        this.getPolicyHolderDetails(ReqObj);
      }
      // sessionStorage.setItem('customerReferenceNo','Cust-00285');
      // sessionStorage.setItem('quoteReferenceNo','MOT-09677');
      //this.router.navigate(['/dashboardpage']);
      }
      },
      (err) => { },
    );
  }
  getPolicyHolderDetails(ReqObj){
    let urlLink = `${this.motorApiUrl}regulatory/showpolicyholder`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          if(data.Result.CustomerReferenceNo){
            sessionStorage.setItem('customerReferenceNo',data.Result.CustomerReferenceNo);
            sessionStorage.setItem('firstLoad','yes');
            this.router.navigate(['/Home/customer/ClientDetails']);
          }
          else{sessionStorage.setItem('firstLoad','yes'); this.router.navigate(['/Home/customer/ClientDetails']);}
        }
        else{sessionStorage.setItem('firstLoad','yes'); this.router.navigate(['/Home/customer/ClientDetails']);}
        },
        (err) => { },
      );
  }
  onEditQuotes(rowData){
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('homeCommonDetails');
    if(this.productId){
      
      if(rowData.QuoteNo!='' && rowData.QuoteNo!=undefined && rowData.QuoteNo!=null){
        this.checkStatus(rowData);
      }
      else{
        sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
        if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
        sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
        sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
        sessionStorage.removeItem('quoteNo');
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails']);
      }
      // if((rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) && date2>=date1){
      
      //     sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
      //     sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
      //     sessionStorage.setItem('quoteNo',rowData.QuoteNo);
      //     sessionStorage.setItem('updatebar',rowData.QuoteNo);
      //     this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
        

      // }
      // else{
      //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
      //   if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
      //   sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
      //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
      //   sessionStorage.removeItem('quoteNo');
      //   this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails']);
      // }
    }
    // if(this.productId=='4'){
    //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
    //   sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    //   this.router.navigate(['/Travel/customerDetails']);
    // }


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
          let date = rowData.PolicyStartDate;
          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          let date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
          let date2 = null;
          if(date!='' && date !=null){
            if(date.split('/').length>1){
              let dates = date.split('/')
              date2 = dates[2]+'-'+dates[1]+'-'+dates[0]
            }
          } 
          if((rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) && date2>=date1){
              sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
              sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
              sessionStorage.setItem('quoteNo',rowData.QuoteNo);
              sessionStorage.setItem('updatebar',rowData.QuoteNo);
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
          else{
            sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
            if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined) sessionStorage.setItem('quoteNo',rowData.QuoteNo);
            sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
            sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
            sessionStorage.removeItem('quoteNo');
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails']);
          }
        }
        else{
          sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
          sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
          sessionStorage.setItem('quoteNo',rowData.QuoteNo);
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
        }
      })

  }
}
