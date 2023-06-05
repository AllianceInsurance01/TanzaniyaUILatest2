import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
declare var $:any;

@Component({
  selector: 'app-existing-quotes',
  templateUrl: './existing-quotes.component.html',
  styleUrls: ['./existing-quotes.component.scss']
})
export class ExistingQuotesComponent implements OnInit {

  quoteHeader:any[]=[];
  SList:any[]=[];
  MailHeader:any[]=[];
  SMSHeader:any[]=[];
  RejectdList:any[]=[];
  closeResult: string;
  Remarks:any;
  popupopen:boolean=false;
  RejectList:any[]=[];

  quoteData:any[]=[];innerColumnHeader:any[]=[];
  innerTableData:any[]=[];userDetails:any;loginId:any;agencyCode:any;branchCode:any;
  productId:any;insuranceId:any;userType:any;brokerbranchCode:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  SmsViewList: any;
  EntryDate: Date;
  quote: any;
  Reference: any;
  quotes: boolean;


  constructor(private router:Router,private sharedService: SharedService, private modalService: NgbModal,) {
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
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    if(this.productId=='5'){


        this.quoteHeader =  [
          { key: 'QuoteNo', display: 'Quote No' },
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
            display: 'View / Edit / Reject',
            config: {
              isView:true,
              isEdit: true,
              isReject: true,
            },
          },
          {
            key: 'mail',
            display: 'Mail / Followup / Sms',
            config: {
              isMail:true,
              isFollowup: true,
              isSms: true,
            },
          },

        ];


        this.innerColumnHeader =  [
          { key: 'Vehicleid', display: 'VehicleID' },
          { key: 'Registrationnumber', display: 'Registration No' },
          { key: 'Chassisnumber', display: 'Chassis No' },
          { key: 'PolicyTypeDesc', display: 'Policy Type' },
          { key: 'Vehiclemake', display: 'Make' },
          { key: 'Vehcilemodel', display: 'Model' },
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
    else if(this.productId=='4'){
      this.quoteHeader =  [
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        { key: 'Count', display: 'Passengers' },
        {
          key: 'actions',
          display: 'View / Edit / Reject',
          config: {
            isView:true,
            isEdit: true,
            isReject: true,
          },
        },
        {
          key: 'mail',
          display: 'Mail / Followup / Sms',
          config: {
            isMail:true,
            isFollowup: true,
            isSms: true,
          },
        },
      ];
      this.innerColumnHeader =  [
        { key: 'Vehicleid', display: 'VehicleID' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'Chassisnumber', display: 'Chassis No' },
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
        { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
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
    else if(this.productId=='3'){
      this.quoteHeader =  [
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        /*{ key: 'Count', display: 'No.Of.Locations' },*/
        {
          key: 'actions',
          display: 'View / Edit / Reject',
          config: {
            isView:true,
            isEdit: true,
            isReject: true,
          },
        },
        {
          key: 'mail',
          display: 'Mail / Followup / Sms',
          config: {
            isMail:true,
            isFollowup: true,
            isSms: true,
          },
        },
      ];
      this.innerColumnHeader =  [
        { key: 'Vehicleid', display: 'VehicleID' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'Chassisnumber', display: 'Chassis No' },
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
        { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
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
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Policy Start Date' },
        { key: 'PolicyEndDate', display: 'Policy End Date' },
        { key: 'Count', display: 'No.Of.Risk' },
        {
          key: 'actions',
          display: 'View / Edit / Reject',
          config: {
            isView:true,
            isEdit: true,
            isReject: true,
          },
        },
        {
          key: 'mail',
          display: 'Mail / Followup / Sms',
          config: {
            isMail:true,
            isFollowup: true,
            isSms: true,
          },
        },
      ];
      this.innerColumnHeader =  [
        { key: 'Vehicleid', display: 'VehicleID' },
        { key: 'Registrationnumber', display: 'Registration No' },
        { key: 'Chassisnumber', display: 'Chassis No' },
        { key: 'PolicyTypeDesc', display: 'Policy Type' },
        { key: 'Vehiclemake', display: 'Make' },
        { key: 'Vehcilemodel', display: 'Model' },
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
    let urlLink = `${this.CommonApiUrl}api/existingquotedetails`;
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
                rowData.MotorList = data.Result;
            }
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
      if(rowData.QuoteNo!=null && rowData.QuoteNo!='' && rowData.QuoteNo!=undefined){
        sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
        sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
        sessionStorage.setItem('quoteNo',rowData.QuoteNo);
        sessionStorage.setItem('updatebar',rowData.QuoteNo);
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);

      }
      else{
        sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
        sessionStorage.setItem('quoteReferenceNo',rowData.RequestReferenceNo);
        sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
        sessionStorage.removeItem('quoteNo');
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails']);
      }
    }
    // if(this.productId=='4'){
    //   sessionStorage.setItem('customerReferenceNo',rowData.CustomerReferenceNo);
    //   sessionStorage.setItem('TravelQuoteRefNo',rowData.RequestReferenceNo);
    //   sessionStorage.setItem('quoteNo',rowData.QuoteNo);
    //   this.router.navigate(['/Travel/customerDetails']);
    // }


  }
  onCreateQuote(){
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('quoteReferenceNo');
    sessionStorage.removeItem('TravelQuoteRefNo')
    sessionStorage.removeItem('endorsePolicyNo');
      this.router.navigate(['/Home/existingQuotes/customerSelection']);
  }
  onRejects(rowData,modal){
    this.open(modal);
   console.log('rrrrrrrrr',rowData)

   this.RejectList=rowData;
    
   this.quote=rowData.QuoteNo;

   if(this.quote){
    this.quotes=true;
   }
   else{
    this.quotes=false
   }

   console.log('hhhhh',this.quote)
   this.Reference=rowData.RequestReferenceNo



   this.Remarks=rowData.RejectReason
   //this.RejectQuote(this.Remarks,rowData)
  }
  onSms(rowData,modal){
    // this.open(modal);
    // this.smss=false;
    // console.log('SSSSSSS',rowData)
    // this.smsRequestno=rowData.RequestReferenceNo;

    // this.smsList();
    // this.SmsDrop();
    this.router.navigate(['/Home/Sms']);
   let quoteObj = {
    "RequestReferenceNo": rowData.RequestReferenceNo,
    "open":"false"
    //"QuoteNo":rowData.QuoteNo
  }
  sessionStorage.setItem('Details',JSON.stringify(quoteObj));

  }

  onFollowup(rowData){
    this.router.navigate(['/Home/Followup']);
    let quoteObj = {
     "RequestReferenceNo": rowData.RequestReferenceNo,
     "open":"false"
     //"QuoteNo":rowData.QuoteNo
   }
   sessionStorage.setItem('Details',JSON.stringify(quoteObj));
  }



  onMail(rowData,modal){
  //   this.open(modal);
  //  console.log('rrrrrrrrr',rowData)
  //   this.opens=false;
  //  this.onNotifi();
  //  this.drop();

  //  this.mailRequestno=rowData.RequestReferenceNo;

  //  this.RejectList=rowData;

  //  this.Remarks=rowData.RejectReason
   //this.RejectQuote(this.Remarks,rowData)


   this.router.navigate(['/Home/Mail']);
   let quoteObj = {
    "RequestReferenceNo": rowData.RequestReferenceNo,
    "open":"false"
    //"QuoteNo":rowData.QuoteNo
  }
  sessionStorage.setItem('Details',JSON.stringify(quoteObj));
  }
  Mail(){
    //this.opens=true;
  }

  RejectQuote(Remarks,rowData,modal){
    let ReqObj = {
      "RequestReferenceNo": rowData.RequestReferenceNo,
      "LoginId":this.loginId,
      "ProductId":this.productId,
      "Status":"R",
      "RejectReason":Remarks

    }
    let urlLink = `${this.CommonApiUrl}quote/updatestatus`;
    
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this. RejectdList = data.Result;
          console.log('RRRR',this. RejectList);
          modal.dismiss('Cross click');
          $("#mymodal").hide();

          this.router.navigate(['/Home/rejectedQuotes'])
        }
      },
      (err) => { },
    );
  }







  openRejectpopup(modal){
    this.open(modal);
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  submitForm(Remarks){
    console.log('REEEEEEE',Remarks)
    }

    onViews(rowData)
    {
      this.router.navigate(['/Home/viewQuotes']);
      let quoteObj = {
        "QuoteNo": rowData.QuoteNo,
        "PolicyNo":null,
        "from":'Existing',
        "CustomerReferenceNo": rowData.CustomerReferenceNo,
        "RequestReferenceNo": rowData.RequestReferenceNo,
        //"QuoteNo":rowData.QuoteNo
      }
      sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
    }


}

