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
  PolicyNo: any;
  show: boolean = false;
  OthersList:any[]=[];
  searchValue:any[]=[];
  constructor(private router:Router,private sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    console.log('JJJJJJJJJJJJJJJJJJ',this.userType);
    this.insuranceId = this.userDetails.Result.InsuranceId;
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
    this.getExistingQuotes();
    // if(this.userType == 'Issuer'){
    //   let s=sessionStorage.getItem('PolicyNos')
    //   if(s){
    //     this.show = true;
    //     this.eventothers(s);
    //   }
    //   else{
    //     this.show = false;
    //     this.getExistingQuotes();
    //   }
    // }
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
    let urlLink = `${this.CommonApiUrl}api/portfolio/active`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let i=0;
            this.quoteData = data?.Result;
            if(this.quoteData){
              for (let v of this.quoteData){
                this.PolicyNo= v.PolicyNo;
              }
              i++;
            }
            sessionStorage.setItem('PolicyNo',this.PolicyNo);
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
              rowData.MotorList = data.Result;
          }
        },
        (err) => { },
      );
  }

  eventothers(searchvalues){
    console.log('MMMMMMMMM',searchvalues);
    let searchvalue:any=searchvalues;
    this.searchValue=searchvalues
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
           this.OthersList = data.Result?.PortFolioList;
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
    sessionStorage.setItem('PolicyNo','NonSelectedEndorsement');
    this.router.navigate(['Home/policies/Endorsements']);
  }

  onViews(rowData){
    let ReqObj={
      "Search":"",
      "SearchValue":rowData.QuoteNo,
      "QuoteNo":rowData.QuoteNo,
      "RequestReferenceNo":rowData.RequestReferenceNo,
      "ProductId":this.productId,
      "pageFrom": 'policy'
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

  onCheckEndorseSelect(){
    // let s=sessionStorage.getItem('PolicyNos')
    // if(s){
    //   return this.show=true;
    // }
    // else{
    //   return this.show=false;
    // }
      //return this.show=true;
  }
  onSelectCustomer(event){
console.log('Eventsss',event);

if(event){
this.show= true;
}
else{
  this.show=false;
}
  }

  onendrosements(rowData){
    sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
    sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    sessionStorage.setItem('endorsePolicyNo',rowData.OriginalPolicyNo);
    sessionStorage.setItem('PolicyNo','Selectedendorese');
    this.router.navigate(['Home/policies/Endorsements']);
  }
}
