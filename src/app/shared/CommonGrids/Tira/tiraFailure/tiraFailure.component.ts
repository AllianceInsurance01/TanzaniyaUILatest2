import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tiraFailure',
  templateUrl: './tiraFailure.component.html',
  styleUrls: ['./tiraFailure.component.scss']
})
export class TiraFailureComponent implements OnInit {
    
  issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
  quoteno:any;
  startdate:Date;enddate:Date;
  insuranceId:any;userDetails:any;subUserType:any;
  pageCount: number;
  totalRecords: any;
  quotePageNo: any;
  startIndex: number =0;
  endIndex: number;
  totalQuoteRecords: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  productId: string;show:boolean=false;productList:any[]=[];
  loginId: any;
  insuranceList: any[]=[];
  limit: any='0';
    branchValue: any;
    branchList:any;
  loginType: any;
  countryId: any;
  brokerbranchCode: any;
  agencyCode: any;
  branchCode: any;
  userType: any;
  startDate: any;
  EndDate:any;innerdata:any[]=[];innerTableData:any[]=[];
  StartDate:any;tiraHeader:any[]=[];innergrid:any[]=[];outergrid:any[]=[];
  endDate: any;closeResult: string;tiradetails:any[]=[];innerColumnHeader:any[]=[];
  constructor(private datePipe:DatePipe,private router:Router,private sharedService:SharedService,private modalService: NgbModal) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails",this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.countryId = this.userDetails.Result.CountryId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.loginType = this.userDetails.Result.LoginType;
    var d= new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.StartDate = new Date(year,month-11, day);
    this.EndDate = new Date(year,month, day);
  }
  ngOnInit(): void {
    //this.getProductList();
    // this.issuerHeader = [
    //     { key: 'QuoteNo', display: 'QuoteNo'},
    //     { key: 'ClientName', display: 'Customer Name' },
    //     { key: 'OverallPremiumLc', display: 'Premium' },
    //     { key: 'ResponseStatusCode', display: 'Response StatusCode' },
    //     { key: 'ResponseStatusDesc', display: 'Response Status' },
    //     { key: 'TiraRequestId', display: 'Request Id' },
    //     { key: 'TiraResponseId', display: 'TiraResponseId' },
    //   ];

    this.tiraHeader = [
          { key: 'RequestId', display: 'Request Id' },
          { key: 'ResponseId', display: 'Response Id' },
          { key: 'StatusCode', display: 'TIRA Code'},
          { key: 'TiraTrackingId', display: 'Tracking Id' },
          { key: 'HitCount', display: 'Hit Count' },
          { key: 'StatusDesc', display: 'Status' },
          { key: 'EntryDate', display: 'Entry Date' },
          { key: 'MethodName', display: 'Method Name' },
          { key: 'RequestFilePath', display: 'Request',
            config: {
              isReqPathDownload:true,
            },
          },
          { key: 'ResponseFilePath', display: 'Response',
            config: {
              isResPathDownload:true,
            },
          },
          {
            key: 'edit',
            display: 'Acknowledge Details',
            sticky: false,
            config: {
              isCollapse: true,
              isCollapseName:'Details'
            },
          },
          
        ];
    this.issuerHeader = [
      { key: 'QuoteNo', display: 'QuoteNo'},
      { key: 'ClientName', display: 'Customer Name' },
      { key: 'PolicyNo', display: 'Policy No' },
      { key: 'ResponseStatusDesc', display: 'Response Status' },
      { key: 'ResponseStatusCode', display: 'Response StatusCode' },
      { key: 'LoginId', display: 'Login Id' },
      { key: 'TiraRequestId', display: 'Tira RequestId' },
      { key: 'TiraResponseId', display: 'Tira ResponseId' },
      {
        key: 'Hit',
        display: 'ReHit',
        config: {
          ishit:true,
        },
      },
      {
        key: 'actions',
        display: 'View',
        config: {
          isViews:true,
        },
      },
      
    ];
    this.innerColumnHeader = [
      { key: 'RequestId', display: 'Request Id' },
      { key: 'ResponseId', display: 'Response Id' },
      { key: 'StatusCode', display: 'TIRA Code'},
      { key: 'TiraTrackingId', display: 'Tracking Id' },
      { key: 'HitCount', display: 'Hit Count' },
      { key: 'StatusDesc', display: 'Status' },
      { key: 'EntryDate', display: 'Entry Date' },
      { key: 'MethodName', display: 'Method Name' },
      { key: 'RequestFilePath', display: 'Request',
        config: {
          isReqPathDownload:true,
        },
      },
      { key: 'ResponseFilePath', display: 'Response',
        config: {
          isResPathDownload:true,
        },
      },
      
    ];
    this.getalldetails();
  }

  getCompanyList(){
    let ReqObj = {
      "BrokerCompanyYn":"",
      "LoginId": this.loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let defaultObj = []
          this.insuranceList = defaultObj.concat(data.Result);
          if(this.insuranceId) this.getProductList();
        }
  
      },
      (err) => { },
    );
  }
  getBranchList(type){
    if(type=='change'){
        this.branchValue = null;
      }
     
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        // if(!this.branchValue){ this.branchValue = "99999";}
        // else{}
      }
    },
    (err) => { },
  
  );
  }
  onHit(event,modal){
    let ReqObj={
      "QuoteNo":event.QuoteNo,
    }
    let urlLink = `${this.CommonApiUrl}payment/pushtira`;
   this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data?.Result){
          if(data?.Result?.Response=='Success'){
         this.onViews(event,modal)
          }
      } 
    },
    (err) => { },
    );
  }
  getProductList(){

    console.log('KKKKKKKKKKKK',this.insuranceId);
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.productList = data.Result;
          this.getBranchList('direct');
        }
      },
      (err) => { },
    );
  
  }
  getalldetails(){
    this.startDate = this.datePipe.transform(this.StartDate, "dd/MM/yyyy");
    this.endDate=this.datePipe.transform(this.EndDate, "dd/MM/yyyy");
    let ReqObj = {
        "ProductId":this.productId,
        "InsuranceId":this.insuranceId,
        "StartDate":this.startDate,
        "EndDate":this.endDate,
        "BranchCode":this.branchCode
      }
      let urlLink = `${this.CommonApiUrl}api/tirafailure`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.issuerData=data.Result;
        }
      },
      (err) => { },
    
    );
  }
  search(){
    this.EndDate="";
  }
// onViews(event,modal,entryType){
//   this.open(modal);
//     let ReqObj={
//       "QuoteNo":event?.QuoteNo,
//     }
//     let urlLink = `${this.CommonApiUrl}api/tiraview`;
//     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
//       (data: any) => {
//         console.log(data);
//         if(data?.Result){
//             this.tiradetails=data?.Result;
//             if (data.Result) {
//               if (data.Result?.length != 0) {
//                 this.totalQuoteRecords = data.Result?.TotalCount;
//                 this.pageCount = 10;
//                 if (entryType == 'change') {
//                   this.quotePageNo = 1;
//                   let startCount = 1, endCount = this.pageCount;
//                   startCount = endCount + 1;
//                     let quoteData = data.Result;
//                     let outergrid
//                     for(let i=0;i<=quoteData.length;i++){
//                       this.innergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/acknowledge')
//                        outergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/request')
//                                    }
                    
//                     this.outergrid = outergrid;
//                     if (quoteData.length <= this.pageCount) {
//                       endCount = quoteData.length
//                     }
//                     else endCount = this.pageCount;
                  
//                   this.startIndex = startCount; this.endIndex = endCount;
//                 }
//                 else {
          
//                   let startCount = event.startCount, endCount = event.endCount;
//                   this.pageCount = event.n;
//                   startCount = endCount + 1;
//                     let quoteData = data.Result;
//                     let outergrid
//                     for(let i=0;i<=quoteData.length;i++){
//                       this.innergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/acknowledge')
//                        outergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/request')
//                                    }
//                     this.outergrid= this.outergrid.concat(outergrid);
//                   if (this.totalQuoteRecords <= endCount + (event.n)) {
//                     endCount = this.totalQuoteRecords
//                   }
//                   else endCount = endCount + (event.n);
//                   this.startIndex = startCount; this.endIndex = endCount;
//                 }
//               }
//               else {
//                 this.outergrid = []; 
//               }
//             }
//         }
//       },
//       (err) => { },
//     );
  
// }
  
  onViews(event,modal){
    this.open(modal);
    this.outergrid=[];this.innergrid=[];
    let ReqObj={
      "QuoteNo":event?.QuoteNo,
    }
    let urlLink = `${this.CommonApiUrl}api/tiraview`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result){
            this.tiradetails=data?.Result;
            this.outergrid=[];this.innergrid=[];

            for(let i=0;i<=this.tiradetails.length;i++){
                 this.innergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/acknowledge')
                 this.outergrid=this.tiradetails.filter(ele => ele.MethodName == '/covernote/non-life/motor/v2/request')
            }
            this.pageCount=10
            this.startIndex = 1; this.endIndex = 10;

            // if(this.outergrid.length!=0){
            //   console.log('tiradetails',this.innergrid);
            //   console.log('tiradetails22',this.outergrid);
            //   this.tiraHeader = [
            //     { key: 'RequestId', display: 'Request Id' },
            //     { key: 'ResponseId', display: 'Response Id' },
            //     { key: 'StatusCode', display: 'TIRA Code'},
            //     { key: 'TiraTrackingId', display: 'Tracking Id' },
            //     { key: 'HitCount', display: 'Hit Count' },
            //     { key: 'StatusDesc', display: 'Status' },
            //     { key: 'EntryDate', display: 'Entry Date' },
            //     { key: 'MethodName', display: 'Method Name' },
            //     { key: 'RequestFilePath', display: 'Request',
            //       config: {
            //         isReqPathDownload:true,
            //       },
            //     },
            //     { key: 'ResponseFilePath', display: 'Response',
            //       config: {
            //         isResPathDownload:true,
            //       },
            //     },
            //     {
            //       key: 'edit',
            //       display: 'Acknowledge Details',
            //       sticky: false,
            //       config: {
            //         isCollapse: true,
            //         isCollapseName:'Vehicles'
            //       },
            //     },
                
            //   ];
            // }
           
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
  onReqPathDownload(rowData){
    let urlLink = `${this.CommonApiUrl}document/download2`;
    this.sharedService.onPostFilePathDocumentMethodSync(urlLink, rowData.RequestFilePath).subscribe(
      (data: any) => {
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href',data);
          link.setAttribute('download','Request');
          document.body.appendChild(link);
          link.click();
          link.remove();
      },
      (err) => { },
    );
    // let  a = document.createElement("a");
    // document.body.appendChild(a);
    // let data  = rowData.RequestFilePath;
    // let file = new Blob(data, {type:'text/plain'});
    //   let fileURL = window.URL.createObjectURL(file);
    //   a.href = fileURL;
    //   a.download = 'log';
    //   a.click();
    //   const data = 'some text';
    // const blob = new Blob([rowData.RequestFilePath], { type: 'application/octet-stream' });

    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
  onResPathDownload(rowData){
    let urlLink = `${this.CommonApiUrl}document/download2`;
    this.sharedService.onPostFilePathDocumentMethodSync(urlLink, rowData.ResponseFilePath).subscribe(
      (data: any) => {
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href',data);
          link.setAttribute('download','Response');
          document.body.appendChild(link);
          link.click();
          link.remove();
      },
      (err) => { },
    );
    
  }
  onDownload(type){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href',type);
    link.setAttribute('download','Request');
    document.body.appendChild(link);
    link.click();
    link.remove();
   }

   onInnerData(rowData){
    this.innerdata=this.innergrid.filter(ele => ele.RequestId == rowData.RequestId && ele.AcknowledgementId== rowData.AcknowledgementId)
    console.log('Inner grid datas',this.innerdata);
    rowData.MotorList=this.innerdata

}


onNextData(element,modal){
  this.limit = String(Number(this.limit)+1);
  this.quotePageNo = this.quotePageNo+1;
  this.startIndex = 0;
  this.endIndex = element.endCount
  this.onViews(element,modal);
}
onPreviousData(element,modal){
  this.limit = String(Number(this.limit)-1);
    this.quotePageNo = this.quotePageNo-1;
    this.onViews(element,modal);
}
}
