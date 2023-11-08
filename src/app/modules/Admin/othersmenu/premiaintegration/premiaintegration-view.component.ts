import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { start } from 'repl';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-premiaintegration-view',
  templateUrl: './premiaintegration-view.component.html',
  styleUrls: ['./premiaintegration-view.component.scss']
})
export class PremiaIntegrationViewComponent implements OnInit {

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
  constructor(private router:Router,private sharedService:SharedService,private datePipe:DatePipe) {
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
    this.getCompanyList();
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
  onCustomerSearch(){
    let startdate=this.datePipe.transform(this.startdate, "dd/MM/yyyy");
    let enddate=this.datePipe.transform(this.enddate, "dd/MM/yyyy");
    let ReqsObj={
        StartDate:this.startdate,
        EndDate:this.enddate,
        ProductId:this.productId
    }
    sessionStorage.setItem('customersearch', JSON.stringify(ReqsObj));
    console.log('Eventsss');
    this.show=true;
    let ReqObj = {
      "StartDate":startdate,
      "EndDate":enddate,
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId
        }
        let urlLink = `${this.CommonApiUrl}integration/getallpolicydetails`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if(data.Result?.PortfolioList){
              this.issuerHeader = [
                { key: 'OriginalPolicyNo', display: 'Policy No' },
                { key: 'QuoteNo', display: 'QuoteNo'},
                { key: 'ClientName', display: 'Customer Name' },
                { key: 'RequestReferenceNo', display: 'ReferenceNo' },
                { key: 'PolicyStartDate', display: 'StartDate' },
                { key: 'PolicyEndDate', display: 'EndDate' },
                { key: 'OverallPremiumLc', display: 'Premium' },
                // { key: 'CreatedBy', display: 'Created By' },
                {
                  key: 'actions',
                  display: 'Action',
                  config: {
                    isViews: true,
                  },
                },
            
              ];
              this.issuerData = data.Result.PortfolioList;
              console.log('Issuer datas',this.issuerData);
            }
          },
          (err) => { },
        );
  }
 
  getProductList(){
    let s= JSON.parse(sessionStorage.getItem('customersearch'));
    if(s){
      this.startdate=s.StartDate;
      this.enddate=s.EndDate;
      this.productId=s.ProductId;
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
          if(s){
            this.onCustomerSearch();
          }
         
        }
      },
      (err) => { },
    );
  
  }
  onViews(rowdata){
    console.log('Rowss',rowdata);
    sessionStorage.setItem('QuoteRow',rowdata.QuoteNo)
    this.router.navigate(['/Admin/premiaintegrationgrid/Premiadetails']);
  }


}
