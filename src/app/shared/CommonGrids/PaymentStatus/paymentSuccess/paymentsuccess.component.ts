import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
    
  issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
  quoteno:any;
  startdate:Date;enddate:Date;
  insuranceId:any;userDetails:any;subUserType:any;
  pageCount: number;
  totalRecords: any;
  quotePageNo: any;
  startIndex: number;
  endIndex: number;
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
    this.getProductList();
    this.issuerHeader = [
        { key: 'QuoteNo', display: 'QuoteNo'},
        { key: 'ClientName', display: 'Customer Name' },
        { key: 'PaymentId', display: 'PaymentId' },
        { key: 'PaymentTypedesc', display: 'Payment Description' },
        { key: 'PaymentStatus', display: 'PaymentStatus' },
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
    let ReqObj = {
        "LoginId":"",
    "ProductId":this.productId,
    "InsuranceId":this.insuranceId,
    "BranchCode":this.branchValue
      }
      let urlLink = `${this.CommonApiUrl}api/paymentsucessstatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result?.PaymentStausRes){
            this.issuerData=data.Result?.PaymentStausRes;
        }
      },
      (err) => { },
    
    );
  }
}
