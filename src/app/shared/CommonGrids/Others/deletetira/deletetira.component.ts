import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deletetira',
  templateUrl: './deletetira.component.html',
  styleUrls: ['./deletetira.component.scss']
})
export class DeleteTiraComponent implements OnInit {
    
  regno:any;
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
    reqstring: any;
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
          { key: 'Chassisnumber', display: 'Chassis Number'},
          { key: 'RegistrationNumber', display: 'Registration Number' },
          { key: 'ReqHeaders', display: 'Request Header' },
          { key: 'ResponseStatusDesc', display: 'Response Status' },
          { key: 'EntryDate', display: 'Entry Date' },
          {
            key: 'actions',
            display: 'View',
            config: {
              isViews:true,
            },
          },
          
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
        let urlLink = `${this.ApiUrl1}reports/alltirrahistory`;
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
       this.reqstring=event.ReqString;
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
  }
  