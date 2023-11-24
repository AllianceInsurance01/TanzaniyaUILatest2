import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-paymentfailed',
  templateUrl: './paymentfailed.component.html',
  styleUrls: ['./paymentfailed.component.scss']
})
export class PaymentFailedComponent implements OnInit {
    
    
    issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
    quoteno:any;
    startdate:Date;enddate:Date;
    insuranceId:any;userDetails:any;subUserType:any;
    pageCount: number;
    totalRecords: any;
    quotePageNo: any;
    startIndex: number;
    endIndex: number;searchedSection:boolean=false;
    totalQuoteRecords: any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    productId: string;show:boolean=false;productList:any[]=[];
    loginId: any;
    insuranceList: any[]=[];
      branchValue: any;
      branchList:any;
    constructor(private router:Router,private sharedService:SharedService,private modalService: NgbModal) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      let insurance = sessionStorage.getItem('issuerInsuranceId');
      if(insurance){
        this.insuranceId = insurance;
      }
      else{
        if(user.AttachedCompanies){
          if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
        }
      }
      // this.productId =  sessionStorage.getItem('companyProductId');
      this.subUserType = sessionStorage.getItem('typeValue');
    }
    ngOnInit(): void {
      this.getProductList('direct');
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
            if(this.insuranceId) this.getProductList('direct');
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
    getProductList(type){
  if(type=='change'){
    this.productId='';
  }
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
        let urlLink = `${this.CommonApiUrl}api/paymentfailedstatus`;
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
