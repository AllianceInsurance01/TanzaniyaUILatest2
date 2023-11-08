import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { LoginService } from '../../login/login.service';
import { HttpService } from 'src/app/shared/Services/http.service';
import { SharedService } from 'src/app/shared/Services/shared.service';
import * as Mydatas from '../../../app-config.json';
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
  searchBy:any=null;
  constructor(private router: Router,
    private authService: AuthService,
    private loginService:LoginService,
    private service: HttpService,private SharedService:SharedService){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
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
      this.searchList = [
        {"Code":"","CodeDesc":"--Select--"},
        {"Code":"01","CodeDesc":"MobileNo"},
        {"Code":"02","CodeDesc":"User Name"},
        {"Code":"03","CodeDesc":"Email Id"},
        {"Code":"04","CodeDesc":"Plan Type"},
      ]
  }
  onShowPlanTypeDetails(type){
    this.searchSection = true;
    this.typeValue = type;
    this.policyEndDate = new Date();
    this.policyStartDate = new Date();
    this.planTypeHeader = [
      { key: 'PlanName', display: 'Plan Name' },
      { key: 'LoginId', display: 'UserName' },
      { key: 'TotalPolicy', display: 'Total Policy' },
      { key: 'OverAllPremium', display: 'OverAll Premium' },
      { key: 'OverAllComiPremium', display: 'Comission Premium' },
      { key: 'ActivePremium', display: 'Active Premium' },
      {
        key: 'actions',
        display: 'Schedule',
        config: {
          isDownload: true,
        },
      },
    ]
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
