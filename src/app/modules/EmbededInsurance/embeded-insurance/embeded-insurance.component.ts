import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { LoginService } from '../../login/login.service';
import { HttpService } from 'src/app/shared/Services/http.service';
import { SharedService } from 'src/app/shared/Services/shared.service';
import * as Mydatas from '../../../app-config.json';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-embeded-insurance',
  templateUrl: './embeded-insurance.component.html',
  styleUrls: ['./embeded-insurance.component.scss']
})
export class EmbededInsuranceComponent {
  userDetails: any;loginId: any;
  agencyCode: any;brokerbranchCode: any;
  branchCode: any;productId: any;
  userType: any;insuranceId: any;
  brokerCode: any;brokerCode1: any;
  brokerCode2: any;brokerCode3: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  typeValue: any;filterValue:any=null;
  planRecordsList: any[]=[];planTypeHeader:any[]=[];
  searchSection: boolean=false;searchValue='';
  maxDate:Date;policyStartDate:any=null;
  policyEndDate: Date;searchList:any[]=[];
  searchBy:any='';
  searchBySection: boolean;
  searchedList: any[]=[];
  searchedDataSection: boolean = false;
  searchedHeader: any[]=[];
  OverAllPremium: any=null;
  currencyCode: any=null;
  totalPolicy: any=null;
  expiryCount: any=null;
  expiryPremium: any=null;
  activePremium: any=null;
  activeCount: any=null;
  countBasedRecords: any[]=[];
  countHeader: any[]=[];
  searchByError: boolean=false;
  searchValueError: boolean=false;
  constructor(private router: Router,
    private authService: AuthService,
    private loginService:LoginService,private datePipe:DatePipe,
    private service: HttpService,private SharedService:SharedService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.currencyCode = this.userDetails.Result.CurrencyId;
    this.maxDate = new Date();
    if(this.userType!='Issuer')this.brokerCode = this.loginId;
    if(this.userType!='Issuer')this.brokerCode1 = this.loginId;
    if(this.userType!='Issuer')this.brokerCode2 = this.loginId;
    if(this.userType!='Issuer')this.brokerCode3 = this.loginId;
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
  }
  ngOnInit(){
    var d= new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.policyStartDate = new Date(year,month-1, day );
    this.policyEndDate = new Date();
    this.getSearchByList();
    this.getProductDashboard();
      this.searchList = [
        {"Code":"","CodeDesc":"--Select--"},
        {"Code":"01","CodeDesc":"MobileNo"},
        {"Code":"02","CodeDesc":"User Name"},
        {"Code":"03","CodeDesc":"Email Id"},
        {"Code":"04","CodeDesc":"Plan Type"},
      ];
      this.planTypeHeader = [
        { key: 'PlanType', display: 'Plan Name' },
        { key: 'LoginId', display: 'UserName' },
        { key: 'TotalPolicy', display: 'Total Policy' },
        { key: 'OverAllComiPremium', display: 'Comission Premium' },
        { key: 'Premium', display: 'Embedded Premium' },
      ];
      this.searchedHeader = [
        { key: 'PlanName', display: 'Plan Name' },
        { key: 'LoginId', display: 'UserName' },
        { key: 'OverAllPremium', display: 'Total' },
        { key: 'CommissionAmt', display: 'Commission' },
        { key: 'TaxPremium', display: 'Tax' },
        { key: 'AmountPaid', display: 'Amount Paid' },
        {
          key: 'actions',
          display: 'Schedule',
          config: {
            isDownload: true,
          },
        },
      ]
  }
  getSearchByList(){
    let urlLink = `${this.ApiUrl1}eway/embedded/getSearchType`;
    this.SharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        if (data.Result) {
          let defaultObj = [{"Code":"","Description":"--Select--"}]
            this.searchList = defaultObj.concat(data.Result);
        }
      },
      (err) => {}
    );
  }
  getProductDashboard(){
    this.planRecordsList=[];this.countBasedRecords=[];this.searchSection=false;
    let startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
    let endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "StartDate": startDate,
      "EndDate": endDate,
      "ProductId": this.productId
    }
    let urlLink = `${this.ApiUrl1}eway/embedded/getProductDashBoard`;
    this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          if(data.Result.OverAllPremium!='' && data.Result.OverAllPremium!=null) this.OverAllPremium = data.Result.OverAllPremium;
          else this.OverAllPremium = null;
          if(data.Result.TotalPolicy!='' && data.Result.TotalPolicy!=null) this.totalPolicy = data.Result.TotalPolicy;
          else this.totalPolicy = null;
          if(data.Result.ExpiryPolicyCount!='' && data.Result.ExpiryPolicyCount!=null) this.expiryCount = data.Result.ExpiryPolicyCount;
          else this.expiryCount = null;
          if(data.Result.ExpiryPolicyPremium!='' && data.Result.ExpiryPolicyPremium!=null) this.expiryPremium = data.Result.ExpiryPolicyPremium;
          else this.expiryPremium = null;
          if(data.Result.ActivePremium!='' && data.Result.ActivePremium!=null) this.activePremium = data.Result.ActivePremium;
          else this.activePremium = null;
          if(data.Result.ActivePolicyCount!='' && data.Result.ActivePolicyCount!=null) this.activeCount = data.Result.ActivePolicyCount;
          else this.activeCount = null
        }
      },
      (err) => {}
    );
  }
  onShowPlanTypeDetails(type){
    this.planRecordsList=[];this.countBasedRecords=[];
   
    this.typeValue = type;
    let startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
    let endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "PreimumType": this.typeValue,
      "EndDate": endDate,
      "ProductId": this.productId,
      "StartDate": startDate
    }
    let urlLink = `${this.ApiUrl1}eway/embedded/getProductPlanTypeDashBoard`;
    this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
            this.searchSection = true;
            this.searchBySection = false;
            this.planRecordsList = data.Result;
        }
      },
      (err) => {}
    );
  }
  getCountBasedPolicyList(rowData){
    let startDate = this.datePipe.transform(this.policyStartDate,'dd/MM/yyyy');
    let endDate = this.datePipe.transform(this.policyEndDate,'dd/MM/yyyy');
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "EndDate": endDate,
      "ProductId": this.productId,
      "StartDate": startDate,
      "PlanId": rowData.PlanId,
      "LoginId": rowData.LoginId
    }
    let urlLink = null;
    if(this.typeValue=='OVERALL') urlLink=`${this.ApiUrl1}eway/embedded/getAllPolicy`;
    if(this.typeValue=='ACTIVE') urlLink=`${this.ApiUrl1}eway/embedded/getActivePolicy`;
    if(this.typeValue=='EXPIRED') urlLink=`${this.ApiUrl1}eway/embedded/getExpiredPolicy`;
    this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
            this.countBasedRecords = data.Result;
            this.countHeader = [
              { key: 'customerName', display: 'Customer Name' },
              { key: 'loginId', display: 'UserName' },
              { key: 'amountPaid', display: 'Amount Paid' },
              { key: 'commissionAmount', display: 'Comission' },
              { key: 'premium', display: 'Embedded Premium' },
              { key: 'taxPremium', display: 'Tax' },
              { key: 'overAllPremium', display: 'Embedded Premium Included' },
              {
                key: 'actions',
                display: 'Schedule',
                config: {
                  isDownload: true,
                },
              },
            ]
        }
      },
      (err) => {}
    );
  }
  omit_special_char(event){   
		var k;  
		k = event.charCode;  //         k = event.keyCode;  (Both can be used)
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
		}
  onSearchPolicy(){
    this.searchSection = false;
    this.searchBySection = true;
    var d= new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.policyStartDate = new Date(year,month-1, day );
    this.policyEndDate = new Date();
  }
  onCancelSearch(){
    this.searchBySection = false;this.searchSection=false;
  }
  onSearchPolicyData(){
    let i=0;
      if(this.searchBy=='' || this.searchBy==null || this.searchBy==undefined){i+=1;this.searchByError = true;}
      else this.searchByError = false;
      if(this.searchValue=='' || this.searchValue==null || this.searchValue==undefined){i+=1;this.searchValueError = true;}
      else this.searchValueError = false;
    if(i==0){
      let ReqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": this.productId,
        "SearchType": this.searchBy,
        "SearchValue": this.searchValue,
        "LoginId": ""

      }
      let urlLink = `${this.ApiUrl1}eway/embedded/getEmbeddedDetails`;
      this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data.Result) {

          }
        },
        (err) => {}
      );
    }
    // this.searchSection = false;
    // this.searchBySection = true;
    // this.searchedDataSection = true;
    // this.searchedList = [
    //   {
    //     "CompanyId": "100015",
    //     "ProductId": "13",
    //     "TransactionNo": "RXRVG10001002",
    //     "NidaNo": "",
    //     "LoginId": "Inalipa",
    //     "CustomerName": "Shanish Kumar",
    //     "MobileNo": "25402000",
    //     "PolicyNo": "P11/2023/100/1002/10/01677",
    //     "RequestReferenceNo": "INALIPA-1690799238137",
    //     "PolicyStartDate": "06/09/2023",
    //     "PolicyEndDate": "18/11/2023",
    //     "Premium": "2000.00000",
    //     "OverAllPremium": "2100.00000",
    //     "TaxPremium": "100.00000",
    //     "AmountPaid": "6000.00000",
    //     "PlanType": "7 Days",
    //     "FilePath": "www.maansarovor.com",
    //     "ResponsePeriod": "2023-07-31 15:57:18.137",
    //     "CommissionPercentage": "17.50",
    //     "CommissionAmt": "350.00000",
    //     "TaxPercentage": "5.00",
    //     "MobileCode": "255"
    //   }
    // ]
  }
  onLog(title)
  {
    if (title === 'Log out') {
      //sessionStorage.clear();
      //this.authService.logout();

      //this.router.navigate(['/login']);
      let Req = {
        "LoginId": this.loginId,
        "Token": this.loginService.getToken()
      };
      const urlLink = `${this.CommonApiUrl}authentication/logout`;
      this.SharedService.onPostMethodSync(urlLink, Req).subscribe(
        (data: any) => {
          let res:any = data;
          console.log(data);
          if (data.Result) {
            sessionStorage.clear();
            this.authService.logout();
            this.router.navigate(['/login']);
          }
            //
        },
        
        (err: any) => {
          sessionStorage.clear();
            this.authService.logout();
            this.router.navigate(['/login']);
          // console.log(err);
        },
        );

    }
  }
}
