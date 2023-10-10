import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import { formatDate } from '@angular/common';
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
  pageCount: number;
  totalRecords: any;
  quotePageNo: any;
  startIndex: number;
  endIndex: number;
  totalQuoteRecords: any;
  limit: any='0';
  brokerCode:any='';
  brokerList:any[]=[];
  constructor(private router:Router,private sharedService: SharedService, private modalService: NgbModal,) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('updatebar');
    sessionStorage.removeItem('loadingType');
    if(this.productId=='5' || this.productId=='46'){


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
            display: 'Edit',
            config: {
              //isView:true,
              isEdit: true,
              // isReject: true,
            },
          },
          {
            key: 'mail',
            display: 'Action',
            config: {
              ismailConfig: true,
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
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'Count', display: 'Passengers' },
        { key: 'OverallPremiumLc', display: 'Premium' },
        {
          key: 'actions',
          display: 'Edit',
          config: {
            //isView:true,
            isEdit: true,
            //isReject: true,
          },
        },
        {
          key: 'mail',
          display: 'Action',
          config: {
            ismailConfig: true,
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
        //},
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
    else if(this.productId!='5' && this.productId!='4'){
      this.quoteHeader =  [
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'OverallPremiumLc', display: 'Premium' },
        /*{ key: 'Count', display: 'No.Of.Locations' },*/
        {
          key: 'actions',
          display: 'Edit',
          config: {
            //isView:true,
            isEdit: true,
            //isReject: true,
          },
        },
        {
          key: 'mail',
          display: 'Action',
          config: {
            ismailConfig: true,
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
        { key: 'RequestReferenceNo', display: 'Reference No' },
        { key: 'QuoteNo', display: 'Quote No' },
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PolicyStartDate', display: 'Start Date' },
        { key: 'PolicyEndDate', display: 'End Date' },
        { key: 'Count', display: 'No.Of.Risk' },
        {
          key: 'actions',
          display: 'Edit',
          config: {
            //isView:true,
            isEdit: true,
            //isReject: true,
          },
        },
        {
          key: 'mail',
          display: 'Action',
          config: {
            ismailConfig: true,
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
      loginId="";
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
    let urlLink = `${this.CommonApiUrl}api/brokeruserdropdown`;
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
          "Offset":60
    }
    let urlLink = `${this.CommonApiUrl}api/existingquotedetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
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
  onEditQuotes(rowData){
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('homeCommonDetails');
    if(this.productId){
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
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${rowData.QuoteNo}`;
    
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            
        }
      })

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
    console.log('QQQQQQQQQQQQQQQQ',rowData);
    let quoteObj = {
     "RequestReferenceNo": rowData.RequestReferenceNo,
     "QuoteNo":rowData.QuoteNo,
     "CustomerName":rowData.ClientName,
     "ProductId":this.productId,
     "StartDate":rowData.PolicyStartDate,
     "EndDate":rowData.PolicyEndDate
     //"QuoteNo":rowData.QuoteNo
   }
   sessionStorage.setItem('FollowUpDetails',JSON.stringify(quoteObj));
   this.router.navigate(['/Home/Followup']);
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
      this.router.navigate(['/Home/MotorDocument']);
      let quoteObj = {
        "QuoteNo": rowData.QuoteNo,
        // "PolicyNo":null,
        // "from":'Existing',
        "CustomerReferenceNo": rowData.CustomerReferenceNo,
        "RequestReferenceNo": rowData.RequestReferenceNo,
        "CustomerName": rowData.ClientName,
        "ProductId":this.productId,
        "ProductName":rowData.ProductName,
        "pageFrom": 'Existing',
        "Currency":rowData.Currency
        //"QuoteNo":rowData.QuoteNo
      }
      //sessionStorage.setItem('FromDetails',JSON.stringify(quoteObj));
      sessionStorage.setItem('editCustomer',JSON.stringify(quoteObj));
    }


}

