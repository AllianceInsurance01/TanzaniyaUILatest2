import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import * as Mydatas from '../../../app-config.json';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-existing-customers',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  public quoteData:any []=[];innerColumnHeader:any []=[];customerData:any[]=[];
  userDetails:any;loginId:any;agencyCode:any;brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  branchCode:any;productId:any;userType:any;insuranceId:any;quoteHeader:any[]=[];
  quoteHeaders:any[]=[];
  PolicyNo: any;
  pageCount: number;
  totalQuoteRecords: any;
  quotePageNo: any;
  startIndex: number;
  endIndex: number;
  limit: any='0';
  show: boolean = false;
  OthersList:any[]=[];
  searchValue:any[]=[];brokerCode:any='';brokerList:any[]=[];
  customersearch:any;
  subuserType: string;
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
    sessionStorage.removeItem('loadingType');
    sessionStorage.removeItem('firstLoad');
    sessionStorage.removeItem('VechileDetails');
   }

  ngOnInit(): void {
    
    if(this.userType!='Issuer'){
      console.log('User Types',this.userType);
      if(this.productId=='5' || this.productId=='46'){
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
            key: 'actions',
            display: 'Action',
            config: {
              isPolicyConfig: true,
            },
          },
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
  
        let endorsement =  sessionStorage.getItem('otherpolicysearch');
        let policyno =  sessionStorage.getItem('otherpolicy');
  
        if(endorsement == 'otherpolicysearch'){
          console.log('NNNNNNNNNNNN',policyno);
          this.customersearch =true;
          this.show=true;
          this.eventothers('direct',policyno,'change');
          sessionStorage.removeItem('otherpolicy');
          sessionStorage.removeItem('otherpolicysearch')
        }
        else{
          this.show=false;
          this.customersearch=false;
          sessionStorage.removeItem('otherpolicy');
          sessionStorage.removeItem('otherpolicysearch');
        }
  
       
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
          {
            key: 'actions',
            display: 'Action',
            config: {
              isPolicyConfig: true,
            },
          },
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
    }
    if(this.userType =='Issuer'){
      console.log('User Types',this.userType);
      if(this.productId=='5' || this.productId=='46'){
        this.quoteHeader =  [
          { key: 'PolicyNo', display: 'Policy No' },
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
            key: 'actions',
            display: 'Action',
            config: {
              isPolicyConfig: true,
            },
          },
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
  
        let endorsement =  sessionStorage.getItem('otherpolicysearch');
        let policyno =  sessionStorage.getItem('otherpolicy');
  
        if(endorsement == 'otherpolicysearch'){
          console.log('NNNNNNNNNNNN',policyno);
          this.customersearch =true;
          this.show=true;
          this.eventothers('direct',policyno,'change');
          sessionStorage.removeItem('otherpolicy');
          sessionStorage.removeItem('otherpolicysearch')
        }
        else{
          this.show=false;
          this.customersearch=false;
          sessionStorage.removeItem('otherpolicy');
          sessionStorage.removeItem('otherpolicysearch');
        }
  
       
      }
      else{
        this.quoteHeader =  [
          { key: 'PolicyNo', display: 'Policy No' },
          { key: 'QuoteNo', display: 'Quote No' },
          { key: 'RequestReferenceNo', display: 'Reference No' },
          { key: 'ClientName', display: 'Insured Name' },
          { key: 'PolicyStartDate', display: 'Policy Start Date' },
          { key: 'PolicyEndDate', display: 'Policy End Date' },
  
          // { key: 'CreditNo', display: 'Credit Note No' },
          // { key: 'DebitNoteNo', display: 'Debit Note No' },
          {
            key: 'actions',
            display: 'Action',
            config: {
              isPolicyConfig: true,
            },
          },
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
    }
   
    //if(this.userType=='Issuer'){
      this.getBrokerList();
    // }
    // else{
    //   this.getExistingQuotes(null,'change');
    // }
  }
  onPayssEmi(element:any){
    console.log('NNNNNNNN',element)
            sessionStorage.setItem('quoteReferenceNo',element.RequestReferenceNo);
           sessionStorage.setItem('quoteNo',element.QuoteNo);
           sessionStorage.setItem('Makepaymentid','Ids');
           let ReqObj={
           TitleDesc:"",
           ClientName:element.ClientName,
           DobOrRegDate:"",
           Email1:"",
           MobileNo1:element.MobileNo,
           IdNumber:element.IdNumber,
           PolicyHolderType:"",
           ProductName:element.ProductName
           }
          sessionStorage.setItem('customerDetails',JSON.stringify(ReqObj));
          this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/Emi-Details']);
           //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
      // if(this.subuserType==null){
      //   this.subuserType = this.userDetails.Result.SubUserType;
      //   sessionStorage.setItem('typeValue',this.subuserType)
      // }
      // this.subuserType = sessionStorage.getItem('typeValue');
      // let amount = null;
      // let ReqObj = {
      //   "CreatedBy": this.loginId,
      //   "EmiYn": element.EmiYn,
      //   "InstallmentMonth":element.NoOfInstallment,
      //   "InstallmentPeriod":element.InstallmentPeriod,
      //   "InsuranceId": this.insuranceId,
      //   "Premium": element.OverallPremiumLc,
      //   "QuoteNo": element.QuoteNo,
      //   "Remarks": "None",
      //   "SubUserType": this.subuserType,
      //   "UserType": this.userType
      // }
      // let urlLink = `${this.CommonApiUrl}payment/makepayment`;
      // this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      //   (data: any) => {
      //     console.log(data);
      //     if(data.Result){
      //       if((this.productId=='5' || this.productId=='46')){
      //         sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
      //         console.log('NNNNNNNN',element)
      //         sessionStorage.setItem('quoteReferenceNo',element.RequestReferenceNo);
      //        sessionStorage.setItem('quoteNo',element.QuoteNo);
      //        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
      //       }
      //     }
      //   },
      //   (err) => { },
      // );
    
    
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
      "BranchCode": this.branchCode,
      "Status": "Y",
    }
    let urlLink = `${this.CommonApiUrl}api/portfoliobrokerdropdown`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.brokerList = defaultObj.concat(data.Result);
          let brokercode=sessionStorage.getItem('brokercodeendorsement');
          if(this.brokerList.length==0){this.brokerCode = ''; this.brokerList = []}
          else if(brokercode!="" && brokercode!=null){
              this.brokerCode=brokercode;
              console.log('HHHHHHHHHH',this.brokerCode)
          }
          else this.brokerCode = this.loginId;
          if(this.brokerCode!=null && this.brokerCode!=''){
            if(!this.brokerList.some(ele=>ele.Code==this.brokerCode)) this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change');
            sessionStorage.removeItem('brokercodeendorsement');
          }
          else{
            this.brokerCode = this.brokerList[0].Code;
            this.getExistingQuotes(null,'change');
            sessionStorage.removeItem('brokercodeendorsement');
          }
        }
        
      },
      (err) => { },
    );

  }
  onCreditdownload(rowData){
    console.log('KKKKKKKKKKK',rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','Creditpdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }

  onDebitdownload(rowData){
    console.log('KKKKKKKKKKK',rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','DebitPdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onGetSchedule(rowData){
    let ReqObj = {
      "QuoteNo":rowData.QuoteNo
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFile(data.Result.PdfOutFile);
        }
        else{
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      },
      (err) => { },
    );
  }
  downloadMyFile(data) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download', 'Schedule');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  getExistingQuotes(element,entryType){
    if(element==null) this.quoteData=[];
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
            "Limit":this.limit,
            "Offset": 60
      }
      let urlLink = `${this.CommonApiUrl}api/portfolio/active`;
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
  }
  onNextData(element){
    this.limit = String(Number(this.limit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.startIndex = element.startCount;
    this.endIndex = element.endCount
    this.getExistingQuotes(element,'direct');
  }
  onNextInnerData(element,searchvalue){
    this.limit = String(Number(this.limit)+1);
    this.quotePageNo = this.quotePageNo+1;
    this.startIndex = element.startCount;
    this.endIndex = element.endCount;
    this.eventothers(element,searchvalue,'direct');
  }
  onPreviousData(element){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
    this.getExistingQuotes(element,'direct');
  }
  onPreviousDataInnergrid(element,searchvalue){
    this.limit = String(Number(this.limit)-1);
      this.quotePageNo = this.quotePageNo-1;
      this.eventothers(element,searchvalue,'direct');
    //this.getExistingQuotes(element,'direct');
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
  onGetEndorsements(rowData){
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    sessionStorage.setItem('endorsePolicyNo',rowData.OriginalPolicyNo);
    sessionStorage.setItem('Pagefrom','endorsement');
    sessionStorage.setItem('brokercodeendorsement',this.brokerCode);
    this.router.navigate(['Home/policies/Endorsements']);
  }
ongetEndorsement(rowData){
  sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
  sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
  sessionStorage.setItem('quoteNo',rowData.QuoteNo);
  sessionStorage.setItem('endorsePolicyNo',rowData.OriginalPolicyNo);
  sessionStorage.setItem('Pagefrom','Otherendorsement');
  this.router.navigate(['Home/policies/Endorsements']);
}
  ongetBacks(){
    this.show=false;
    this.onSelectCustomer(false);
    this.searchValue=[];
    this.customersearch=false;
  }

  onViews(rowData){
    let ReqObj={
      "Search":"",
      "SearchValue":rowData.QuoteNo,
      "QuoteNo":rowData.QuoteNo,
      "RequestReferenceNo":rowData.RequestReferenceNo,
      "ProductId":this.productId,
      "pageFrom": 'policy',
      "CustomerName": rowData.ClientName,
      "ProductName":rowData.ProductName,
      "PolicyNo":rowData.PolicyNo,
      "Currency":rowData.Currency
    }
    sessionStorage.setItem('editCustomer',JSON.stringify(ReqObj));
 this.router.navigate(['/Home/MotorDocument']);
  }
  // onViews(rowData){
  //   this.router.navigate(['/Home/viewQuotes']);
  //   let quote=
  //     {
  //       "QuoteNo": rowData.QuoteNo,
  //       "PolicyNo":this.PolicyNo,
  //       "from":'Policy',
  //       "CustomerReferenceNo": rowData.CustomerReferenceNo,
  //       "RequestReferenceNo": rowData.RequestReferenceNo,
  //     }
  //     //{ key: 'QuoteNo', display: 'Quote No' },
  //     //{ key: 'Registrationnumber', display: 'Registration No' },
  //    //sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
  //   sessionStorage.setItem('FromDetails', JSON.stringify(quote));
  // }

  onSelectCustomer(event){
    console.log('Eventsss',event);
    
    if(event){
    this.show= true;
    this.customersearch=true;
    }
    else{
      this.show=false;
      this.customersearch=false;
    }
      }
      eventothers(element,searchvalues,entryType){
        console.log('MMMMMMMMM',searchvalues);
        let searchvalue:any=searchvalues;
        this.searchValue=searchvalues;
        sessionStorage.setItem('PolicyNos',searchvalue)
        let ReqObj = {
          "PolicyNo":searchvalues,//this.searchValue,
       "BranchCode":this.branchCode,
       "InsuraceId":this.insuranceId,
       "ProductId":this.productId,
       "Limit":"0",
       "Offset":"10"
        }
        let urlLink = `${this.CommonApiUrl}api/searchbrokerpolicies`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            if(data.Result.PortFolioList){
              element=data.Result.PortFolioList;
               //this.OthersList = data.Result?.PortFolioList;
               if (data.Result?.PortFolioList.length != 0) {
                this.totalQuoteRecords = data.Result?.Count;
                this.pageCount = 10;
                if (entryType == 'change') {
                  this.quotePageNo = 1;
                  let startCount = 1, endCount = this.pageCount;
                  startCount = endCount + 1;
                    let quoteData = data.Result?.PortFolioList;
                    this.OthersList = data.Result?.PortFolioList;
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
                    this.OthersList = this.quoteData.concat(data.Result?.PortfolioList);
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
          },
          (err) => { },
        );
      }
    
}
