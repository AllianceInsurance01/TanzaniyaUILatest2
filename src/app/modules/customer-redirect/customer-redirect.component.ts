import { Component } from '@angular/core';
import * as Mydatas from '../../app-config.json';
import { SharedService } from './../../shared/Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-customer-redirect',
  templateUrl: './customer-redirect.component.html',
  styleUrls: ['./customer-redirect.component.css']
})
export class CustomerRedirectComponent {

  encryptedValue:any='';errorSection:boolean=false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CustomCommonApiUrl: any = this.AppConfig.CustomCommonApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  errorList: any[]=[];otpSection:boolean=false;
  branchselection: boolean;codeList:any[]=[];
  branchList: any[]=[];
  branchValue: any;
  constructor(private sharedService: SharedService,private authService: AuthService,private loginService: LoginService,
    private route:ActivatedRoute,private router:Router) { 


    //this.encryptedValue='6ckJBvpT74QFCOcGkqLQ698Alvb//kIdnF2RdtqqDBXhctAunW/wWX91XwUqUVMcw5lZd1Vo4kzDuNIswfxjLCs04K9e8PiByLcEE5sv+LwIcw0N1L2T4wjg6lmidWj/S+tGgpGWkz2B236U8aqEz0tfjeT0oysAW7Zf57u6tH6OaiCJrDsiuDDkax/dy/vonf9S9oiWoCAkEVY9pMet6S0Dk2GTJW3/57i9uD6zjh3B287hJG6OrC2oM3wvSnt4+CqW3azzkkZRBO47O6JAYe+yYYeL3zUXstxrxsqlSvOeSpwwe+t5phJ+STm/YjCBHLvHhA7TlcwqoHI1oc41UpYP2Z9xBbWUSp/Tnt78fL0='; 

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.encryptedValue = encodeURIComponent(params.params.e);
      console.log("Encrypted Value",this.encryptedValue);
      if(this.encryptedValue!=undefined && this.encryptedValue!='undefined' && this.encryptedValue!=null){
        //this.encryptedValue = decodeURI(this.encryptedValue);
        this.encryptedValue = this.encryptedValue.split(" ").join("")
        this.encryptedValue = this.encryptedValue.split("%20").join("+")
        this.encryptedValue = this.encryptedValue.split("%2F").join("/")
        this.encryptedValue = this.encryptedValue.split("%3D").join("=")
        this.getDecryptData();
      }
      else{
        this.getGuestLogin()
      }
    });
       
  }
  getGuestLogin(){
    const urlLink = `${this.CommonApiUrl}authentication/login`;
    const reqData = {
      "LoginId": 'Guest',
      "Password": 'Admin@01',
      "ReLoginKey": 'Y'
    };

    this.loginService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res: any = data;
        console.log(data);
          if (data.Result) {
            const Token = data?.Result?.Token;
            this.authService.login(data);
            this.authService.UserToken(Token);
            sessionStorage.setItem('Userdetails', JSON.stringify(data));
            sessionStorage.setItem('UserToken', Token);
            sessionStorage.setItem('menuSection', 'navMenu');
            if ((data.Result.UserType == 'Issuer' || data.Result.UserType == 'Broker' || data.Result.UserType == 'User') && data.Result.SubUserType!='SuperAdmin') {
              let branchList: any[] = data?.Result?.LoginBranchDetails;
              if (branchList.length != 0 && branchList.length > 1) {
                console.log("Entered Branch", branchList)
                // this.router.navigate(['/branch']);
                this.branchselection=true;
                this.branchList = branchList;
              }
              else if (branchList.length != 0){
                this.branchList = branchList;
                this.branchValue = branchList[0].BrokerBranchCode;
                let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
                let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
                userDetails.Result['ProductId'] = data.Result.BrokerCompanyProducts[0].ProductId;
                userDetails.Result['ProductName'] = data.Result.BrokerCompanyProducts[0].ProductName;
                userDetails.Result['BrokerBranchCode'] = this.branchValue;
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
                sessionStorage.removeItem('customerReferenceNo');
                //this.router.navigate(['/Home/customer/Client/client-details']);
                this.router.navigate(['/customerProducts']);
              }
            }
            else{
              this.router.navigate(['/Admin']);
            }
          }
        },
        (err: any) => {
          alert("Error")
          // console.log(err);
        },
      );
  }
  async getDecryptData(){
      let urlLink = `${this.CustomCommonApiUrl}authentication/doauth`
      let ReqObj = {
          "e":this.encryptedValue
      };
      (await this.sharedService.onPostMethodUnAuthAsync(urlLink, ReqObj)).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.Result) {
            this.errorSection = false;
            if(data.AdditionalInfo){
              let details = data.AdditionalInfo;
              if(details.QuoteNo!='null' && details.QuoteNo!=null){
                  sessionStorage.setItem('quoteNo',details?.QuoteNo)
              }
              let custRefNo = details?.CustomerRefNo;
              if(custRefNo!='' && custRefNo!='null' && custRefNo!=null && custRefNo!=undefined){
                sessionStorage.setItem('customerReferenceNo',custRefNo);
              }
              let refNo = details?.RefNo;
              if(refNo!='' && refNo!='null' && refNo!=null && refNo!=undefined){
                sessionStorage.setItem('quoteReferenceNo',refNo);
              }
              
              let result = data.Result;
              let insuranceId = details?.InsuranceId;
              if(insuranceId!='' && insuranceId!='null' && insuranceId!=null && insuranceId!=undefined){
                result['InsuranceId'] = insuranceId;
              }
              let productId = details?.ProductId;
              if(productId!='' && productId!='null' && productId!=null && productId!=undefined){
                result['ProductId'] = productId;
              }
              let branchCode = details?.BranchCode;
              if(branchCode!='' && branchCode!='null' && branchCode!=null && branchCode!=undefined){
                result['BranchCode'] = branchCode;
              }
             const Token = data?.Result?.Token;
              this.authService.login(data);
              this.authService.UserToken(Token);
              sessionStorage.setItem('UserToken',Token);
              sessionStorage.setItem('Userdetails',JSON.stringify(data));
              if(details?.PageType){
                if(details.PageType=='RP') sessionStorage.setItem('QuoteStatus','AdminRP');
                this.router.navigate([details?.RouterLink]);
              }
              
            }
          }
          else if(data.ErrorMessage){
              if(data.ErrorMessage.length!=0){
                this.errorSection = true;
                this.errorList = data.ErrorMessage;
              }
          }
        },
        (err: any) => {
          alert("Error")
          // console.log(err);
        },
      );
  }
  onProceedLogin(){
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }
}
