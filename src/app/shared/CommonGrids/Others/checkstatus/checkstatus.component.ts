import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-checkstatus',
  templateUrl: './checkstatus.component.html',
  styleUrls: ['./checkstatus.component.scss']
})
export class CheckStatusComponent implements OnInit {
    
    
    issuerHeader:any[]=[];issuerData:any;companyList:any[]=[];
    quoteno:any;
    startdate:Date;enddate:Date;
    insuranceId:any;userDetails:any;subUserType:any;
    pageCount: number;
    totalRecords: any;
    quotePageNo: any;
    startIndex: number;
    endIndex: number;showgrid:any=false;
    totalQuoteRecords: any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    productId: string;show:boolean=false;productList:any[]=[];
    loginId: any;
    insuranceList: any[]=[];
      branchValue: any;
      branchList:any;
    cashpayment: any;
    chequepayment: any;
  userType: any;
  agencyCode: any;
  branchCode: any;
  countryId: any;
  brokerbranchCode: any;
  loginType: any;
  ConvertedPolicy: any;
  CreditPayment: any;
  EndrosmentPolicy: any;
  OnlinePayment: any;
  RefundPayment: any;
  SentMail: any;
  Sms: any;
  Searchedvehicle: any;
  noti: boolean=false;
  policy: boolean=false;nextbtn:any=false;
  vech: boolean=false;
    constructor(private router:Router,private sharedService:SharedService,private modalService: NgbModal) {
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
      this.redirect('payment');
    this.getCheckStatus();
    }

    getCheckStatus(){
        let ReqObj = {
        "InsuranceId":this.insuranceId,
          }
          let urlLink = `${this.ApiUrl1}reports/transactioncheckstatus`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data.Result){
                this.issuerData=data.Result;
                this.cashpayment=this.issuerData?.LatestCashPayment;
                this.chequepayment=this.issuerData?.LatestChequePayment;
                this.ConvertedPolicy=this.issuerData?.LatestConvertedPolicy;
                this.CreditPayment=this.issuerData?.LatestCreditPayment;
                this.EndrosmentPolicy=this.issuerData?.LatestEndrosmentPolicy;
                this.OnlinePayment=this.issuerData?.LatestOnlinePayment;
                this.RefundPayment=this.issuerData?.LatestRefundPayment;
                this.SentMail=this.issuerData?.LatestSentMail;
                this.Sms=this.issuerData?.LatestSentSms;
                this.Searchedvehicle=this.issuerData?.LatestTiraSearchedVehicle;
                console.log('HHHHHHHHHHHHHHH',this.issuerData);
            }
          },
          (err) => { },
        
        );
    }

    redirect(type){
      if(type=='payment'){
        this.show=true;
        this.noti=false;
        this.policy=false;
        this.vech=false;
      }
      if(type=='notifications'){
        this.show=false;
        this.noti=true;
        this.policy=false;
        this.vech=false;
      }
      if(type=='policy'){
        this.show=false;
        this.noti=false;
        this.policy=true;
        this.vech=false;
      }
      if(type=='Searchvech'){
        this.show=false;
        this.noti=false;
        this.policy=false;
        this.vech=true;
      }

    }
    backs(){
      this.nextbtn=false;
    }
    next(){
      this.nextbtn=true;
    }
}
