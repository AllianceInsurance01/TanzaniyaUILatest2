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
    this.getProductDashboard();
      this.searchList = [
        {"Code":"","CodeDesc":"--Select--"},
        {"Code":"01","CodeDesc":"MobileNo"},
        {"Code":"02","CodeDesc":"User Name"},
        {"Code":"03","CodeDesc":"Email Id"},
        {"Code":"04","CodeDesc":"Plan Type"},
      ];
      this.planTypeHeader = [
        { key: 'PlanName', display: 'Plan Name' },
        { key: 'LoginId', display: 'UserName' },
        { key: 'TotalPolicy', display: 'Total Policy' },
        { key: 'OverAllPremium', display: 'OverAll Premium' },
        { key: 'OverAllComiPremium', display: 'Comission Premium' },
        { key: 'ActivePremium', display: 'Active Premium' },
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
  getProductDashboard(){
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
          if(data.Result.TotalPolicy!='' && data.Result.TotalPolicy!=null) this.totalPolicy = data.Result.TotalPolicy;
          if(data.Result.ExpiryPolicyCount!='' && data.Result.ExpiryPolicyCount!=null) this.expiryCount = data.Result.ExpiryPolicyCount;
          if(data.Result.ExpiryPolicyPremium!='' && data.Result.ExpiryPolicyPremium!=null) this.expiryPremium = data.Result.ExpiryPolicyPremium;
          if(data.Result.ActivePremium!='' && data.Result.ActivePremium!=null) this.activePremium = data.Result.ActivePremium;
          if(data.Result.ActivePolicyCount!='' && data.Result.ActivePolicyCount!=null) this.activeCount = data.Result.ActivePolicyCount;
        }
      },
      (err) => {}
    );
  }
  onShowPlanTypeDetails(type){
    this.searchSection = true;
    this.searchBySection = false;
    this.typeValue = type;
    
    
    this.planRecordsList = [
      {
        "LoginId": "Inalipa",
        "CompanyId": "100015",
        "ProductId": "13",
        "TotalPolicy": "10",
        "OverAllPremium": "6825.00000",
        "OverAllTaxPremium": "325.00000",
        "OverAllComiPremium": "1137.50000",
        "ActivePremium": "2625.00000",
        "PlanName": "7 Days",
        "PlanOpted": "97"
      },
      {
        "LoginId": "Inalipa",
        "CompanyId": "100015",
        "ProductId": "13",
        "TotalPolicy": "8",
        "OverAllPremium": "4200.00000",
        "OverAllTaxPremium": "200.00000",
        "OverAllComiPremium": "700.00000",
        "ActivePremium": "525.00000",
        "PlanName": "14 Days",
        "PlanOpted": "98"
      },
      {
        "LoginId": "Inalipa",
        "CompanyId": "100015",
        "ProductId": "13",
        "TotalPolicy": "5",
        "OverAllPremium": "2600.00000",
        "OverAllTaxPremium": "100.00000",
        "OverAllComiPremium": "437.50000",
        "ActivePremium": null,
        "PlanName": "30 Days",
        "PlanOpted": "99"
      }
    ]
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
    this.searchBySection = false;this.searchSection=true;
  }
  onSearchPolicyData(){
    this.searchSection = false;
    this.searchBySection = true;
    this.searchedDataSection = true;
    this.searchedList = [
      {
        "CompanyId": "100015",
        "ProductId": "13",
        "TransactionNo": "RXRVG10001002",
        "NidaNo": "",
        "LoginId": "Inalipa",
        "CustomerName": "Shanish Kumar",
        "MobileNo": "25402000",
        "PolicyNo": "P11/2023/100/1002/10/01677",
        "RequestReferenceNo": "INALIPA-1690799238137",
        "PolicyStartDate": "06/09/2023",
        "PolicyEndDate": "18/11/2023",
        "Premium": "2000.00000",
        "OverAllPremium": "2100.00000",
        "TaxPremium": "100.00000",
        "AmountPaid": "6000.00000",
        "PlanType": "7 Days",
        "FilePath": "www.maansarovor.com",
        "ResponsePeriod": "2023-07-31 15:57:18.137",
        "CommissionPercentage": "17.50",
        "CommissionAmt": "350.00000",
        "TaxPercentage": "5.00",
        "MobileCode": "255"
      }
    ]
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

            console.log('You are logged out');

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
