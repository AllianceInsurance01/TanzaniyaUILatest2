import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-Integration',
  templateUrl: './Integration.component.html',
  styleUrls: ['./Integration.component.scss']
})
export class TiraIntegrationComponent implements OnInit {
    
  
    issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
    quoteno:any;
    startdate:Date;enddate:Date;
    insuranceId:any;userDetails:any;subUserType:any;
    pageCount: number;
    totalRecords: any;
    quotePageNo: any;
    startIndex: number;
    endIndex: number;
    closeResult: string;
    totalQuoteRecords: any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    productId: string;show:boolean=false;productList:any[]=[];
    loginId: any;
    insuranceList: any[]=[];
      branchValue: any;
      branchList:any;
    loginType: any;
    countryId: any;
    brokerbranchCode: any;
    agencyCode: any;
    branchCode: any;
    userType: any;
      startDate: any;
      EndDate:any;
      StartDate:any;
      endDate: any;tiradetails:any[]=[];
    reqstring: any;tiraHeader:any[]=[];
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
   
    }
    ngOnInit(): void {
     //this.getalldetails();
      this.issuerHeader = [
          { key: 'QuoteNo', display: 'Quote No'},
          { key: 'ChassisNumber', display: 'Chassis Number'},
          { key: 'AcknowledgementId', display: 'Acknowledgement Id' },
          { key: 'RequestId', display: 'RequestId' },
          { key: 'ResponseId', display: 'ResponseId' },
          { key: 'Status', display: 'Status' },
          { key: 'EntryDate', display: 'Entry Date' },
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
          // {
          //   key: 'edit',
          //   display: 'Request Download',
          //   config: {
          //      isRequestdown:true,
          //   },
          // },
          // {
          //   key: 'mail',
          //   display: 'Response Download',
          //   config: {
          //     isResponsedown:true,
          //   },
          // },
          {
            key: 'actions',
            display: 'View',
            config: {
              isViews:true,
            },
          },
          
        ];
        this.tiraHeader = [
          { key: 'StatusCode', display: 'TIRA Code'},
          { key: 'TiraTrackingId', display: 'Tracking Id' },
          { key: 'HitCount', display: 'Hit Count' },
          { key: 'StatusDesc', display: 'Status' },
          { key: 'RequestFilePath', display: 'Request',
            config: {
              isReqPathDownload:true,
            },
          },
          { key: 'ResponseFilePath', display: 'Response',
            config: {
              isResPathDownload:true,
            },
          }
          
        ];
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
          "Limit":"0",
          "Offset":"100",
          "InsuranceId":this.insuranceId,
          "StartDate":this.startDate,
          "EndDate":this.endDate
        }
        let urlLink = `${this.ApiUrl1}reports/getalltiraintegpusheddetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result?.TiraHistory){
              this.issuerData=data?.Result?.TiraHistory;
          }
        },
        (err) => { },
      
      );
    }
    search(){
      this.EndDate="";
    }
    onViews(event,modal){
      this.open(modal);
      let ReqObj={
        "QuoteNo":event?.QuoteNo,
      }
      let urlLink = `${this.ApiUrl1}reports/gettiraintegpusheddetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data?.Result){
              this.tiradetails=data?.Result;
              console.log('tiradetails',this.tiradetails);
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
    onDownload(type){
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href',type);
      link.setAttribute('download','Request');
      document.body.appendChild(link);
      link.click();
      link.remove();
     }

     onResponsedown(event){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href',event?.ResponseFilePath);
        link.setAttribute('download','Request');
        document.body.appendChild(link);
        link.click();
        link.remove();
     }
     onRequestdown(event){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href',event?.RequestFilePath);
        link.setAttribute('download','Request');
        document.body.appendChild(link);
        link.click();
        link.remove();
     }
    onReqPathDownload(rowData){
      let urlLink = `${this.CommonApiUrl}document/downloadbase64`;
      this.sharedService.onPostFilePathDocumentMethodSync(urlLink, rowData.RequestFilePath).subscribe(
        (data: any) => {
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href',data?.Result?.ImgUrl);
            link.setAttribute('download','Request');
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        (err) => { },
      );
    }
    onResPathDownload(rowData){
      let urlLink = `${this.CommonApiUrl}document/downloadbase64`;
      this.sharedService.onPostFilePathDocumentMethodSync(urlLink, rowData.ResponseFilePath).subscribe(
        (data: any) => {
            const link = document.createElement('a');
            link.setAttribute('target', '_blank');
            link.setAttribute('href',data?.Result.ImgUrl);
            link.setAttribute('download','Response');
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        (err) => { },
      );
      
    }
  }
  