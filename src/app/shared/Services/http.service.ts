import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchFilterPipe } from '../pipes/search-filter/search-filter.pipe';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient,private router:Router) { }
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  public loginData;
  public defaultValue;
  public productId;
  public openCover;
  public UserType;
  public userToken="";
  public productDetails;
  public loginId;public countryId;public agencyCode;
  public brokerCode;
  searchFilter:SearchFilterPipe;
  openCoverMenu = false;
  ocQuoteMenu = false;
  navMenu = false;
  httpOptions = {
    headers: new HttpHeaders({
     'Access-Control-Allow-Origin': '*',
     'Content-Type':  'application/json',
       'Accept' : 'application/json'
   })
 };
 public restoreToken(){
   let loginReq = JSON.parse(sessionStorage.getItem('loginReq'));
   console.log("Received Login Req",loginReq);
   if( loginReq != null){
     console.log("Received Login Data",loginReq);
     this.getBrokerLogin(loginReq).subscribe(
      data => {
        sessionStorage.setItem('userToken',data.token);
      },
      error => { console.log('Error: ', error.message);});
   }
 }
 public setMenuSection(){
   let menuSection = sessionStorage.getItem('menuSection');
    return menuSection;
 }
 public setOcMenuSection(){
  let openCoverData = sessionStorage.getItem('openCover');
   return openCoverData;
}
 //http://3.133.109.171:8080/AlRajhi/
 public vesselUrl = "http://192.168.1.91:6060/AlRajhiIHSApi/ship/";
 //public baseUrl = "http://192.168.1.99:1010/";
 public baseUrl = "http://192.168.1.9:2121/";
 public ocBaseUrl = "http://192.168.1.99:8074/"
 //public baseUrl = "http://192.168.1.91:1010/AlRajhi/";
 login(brokerLogin:any){
  let url=this.baseUrl +"login/Logincheck";
  return this.http.post<any>(url,JSON.stringify(brokerLogin),this.httpOptions);
  }
  public getCountrydetUpdate(country){
    let url=this.baseUrl+"master/insertupdate/country";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    })
    return this.http.post<any>(url,JSON.stringify(country),{headers:headers});
   }
  public getAdminBasedMenuList(menuRequest){
    let url=this.baseUrl+"api/getAdminBasedMenuList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(menuRequest),{headers:headers});
  }
  public getOcEditWarrantyList(menuRequest){
    let url=this.baseUrl+"OpenCover/warranty/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(menuRequest),{headers:headers});
  }
  public getOcCustomerInfo(menuRequest){
    let url=this.baseUrl+"api/opencover/customerinfo";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(menuRequest),{headers:headers});
  }
  public getOcEditExclusionList(menuRequest){
    let url=this.baseUrl+"OpenCover/exclusion/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(menuRequest),{headers:headers});
  }
  public getOcEditWarList(warReq){
    let url=this.baseUrl+"OpenCover/war/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(warReq),{headers:headers});
  }
  saveOcPremiumInfo(proceedReq){
    let url=this.baseUrl+"OpenCover/policy/generated";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proceedReq),{headers:headers});
  }
  public getOcEditSaleTermList(termReq){
    let url=this.baseUrl+"OpenCover/saleterm/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(termReq),{headers:headers});
  }
  
  public getOcEditToleranceList(termReq){
    let url=this.baseUrl+"OpenCover/tolerance/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(termReq),{headers:headers});
  }
  public getOcSaveTolerance(termReq){
    let url=this.baseUrl+"OpenCover/tolerance/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(termReq),{headers:headers});
  }
  public getOcSaveSaleTerm(termReq){
    let url=this.baseUrl+"OpenCover/saleterm/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(termReq),{headers:headers});
  }
  public getOcEditOptClauseList(optClauseReq){
    let url=this.baseUrl+"OpenCover/optionalcondition/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(optClauseReq),{headers:headers});
  }
  public saveOcWarrantiesList(warrantyReq){
    let url=this.baseUrl+"OpenCover/warranty/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(warrantyReq),{headers:headers});
  }
  public saveOcExclusionList(warrantyReq){
    let url=this.baseUrl+"OpenCover/exclusion/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(warrantyReq),{headers:headers});
  }
  public saveOcWarsList(warReq){
    let url=this.baseUrl+"OpenCover/war/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(warReq),{headers:headers});
  }
  public saveOcOptClauseList(optClauseReq){
    let url=this.baseUrl+"OpenCover/optionalcondition/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(optClauseReq),{headers:headers});
  }
  public getOcModeEditList(modeReq){
    let url=this.baseUrl+"OpenCover/modeoftransport/edit/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(modeReq),{headers:headers});
  }
  public getOcCityEditList(){
    let url=this.baseUrl+"opencover/dropdown/city";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.get<any>(url,{headers:headers});
  }
  public saveOcWarRateList(warReq){
    let url=this.baseUrl+"OpenCover/warrate/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(warReq),{headers:headers});
  }
  public getOcSharedPercentList(percentReq){
    let url=this.baseUrl+"opencover/dropdown/insurancecompany";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(percentReq),{headers:headers});
  }
  public saveOcSharedPercentList(percentReq){
    let url=this.baseUrl+"OpenCover/sharepercentage/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(percentReq),{headers:headers});
  }
  public getWareRateList(warRateReq){
    let url=this.baseUrl+"OpenCover/warrate/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(warRateReq),{headers:headers});
  }
  public ocClausePageProceed(proceedReq){
    let url=this.baseUrl+"OpenCover/fourpage";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proceedReq),{headers:headers});
  }
  public getchangePasswrdLogin(loginReq){
    let url=this.baseUrl+"login/CheckChangePassword";
    return this.http.post<any>(url,JSON.stringify(loginReq),this.httpOptions);
   }
  public getSubmitchangePasswrdLogin(passReq){
    let url=this.baseUrl+"login/LoginChangePassword";
    return this.http.post<any>(url,JSON.stringify(passReq),this.httpOptions);
  }
  public getForgetPasswrdAction(passReq){
    let url=this.baseUrl+"login/getForgotPassword";
    return this.http.post<any>(url,JSON.stringify(passReq),this.httpOptions);
  }
  public doLoginUser(tokens: any) {
    console.log("After Login",tokens);
    this.storeTokens(tokens);
  }
  private storeTokens(tokens: any) {
    sessionStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    sessionStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }
  
  public headers;
  public storedNames;
  setSession(){
    if(this.UserType != null && this.userToken!=null){
      sessionStorage.setItem(this.UserType, JSON.stringify(this.userToken));
      this.storedNames = JSON.parse(sessionStorage.getItem(this.UserType));
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storedNames}`
      })
    }
  }
  public IssuerLoginBranchList(branchReq){
    let url=this.baseUrl+"login/getBranchDetail";
    console.log("Branch Req",branchReq);
    return this.http.post<any>(url,JSON.stringify(branchReq),this.httpOptions);
   }
  public IssuerLoginRegionList(){
    let url=this.baseUrl+"admin/region/list";
    return this.http.get<any>(url,this.httpOptions);
   }
  public getBrokerLogin(brokerLogin:any){
    let url=this.baseUrl+"login/Logincheck";
    console.log(JSON.stringify(brokerLogin));
    return this.http.post<any>(url,JSON.stringify(brokerLogin),this.httpOptions);
   }
   public getPolicyVerify(policyReq:any){
    let url=this.baseUrl+"login/verify/policy";
    return this.http.post<any>(url,JSON.stringify(policyReq),this.httpOptions);
   }
   public getAdminBrokerList(brokers){
    //let url=this.baseUrl+"api/getLoginBrokerList";
    let url=this.baseUrl+"api/login/brokerlist";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    console.log("headers",headers);
    return this.http.post<any>(url,JSON.stringify(brokers),{headers:headers});
   }
  
   public getOpenCoversList(openCover,subUrl){
    //let url=this.baseUrl+"api/getOpenCoverSearchList";
    let url=this.baseUrl+subUrl;
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   
   public getOcQuoteBrokerDrpDown(openCover){
    let url=this.baseUrl+"opencover/dropdown/brokerdetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
  public getOcCoverTypeList(coverReq){
    let url=this.baseUrl+"OpenCover/covertype/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(coverReq),{headers:headers});
   }
  public getOcExistingBrokerDrpDown(openCover){
    let url=this.baseUrl+"opencover/dropdown/existing/brokerList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
  }
  public getOcPortfolioBrokerDrpDownList(openCover){
    let url=this.baseUrl+"opencover/dropdown/portfolio/brokerList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
  }
  public getOcCountryList(){
   let url=this.baseUrl+"opencover/dropdown/country";
   let token = sessionStorage.getItem('userToken');
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   })
   return this.http.get<any>(url,{headers:headers});
  }
   public getOcOrgEditCountry(proposalReq){
    let url=this.baseUrl+"OpenCover/originationcountry/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proposalReq),{headers:headers});
   }
  public getOcDestEditCountry(proposalReq){
    let url=this.baseUrl+"OpenCover/destinationcountry/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proposalReq),{headers:headers});
   }
  public getOcQuoteCustomerEdit(customerReq){
    let url=this.baseUrl+"OpenCover/customer/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(customerReq),{headers:headers});
   }
   public getOcQuoteCustomerDetailsSave(customerReq){
    let url=this.baseUrl+"OpenCover/customer/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(customerReq),{headers:headers});
   }
   public getOcQuoteCustomerSave(customerReq){
    let url=this.baseUrl+"OpenCover/insured/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(customerReq),{headers:headers});
   }
   public getOcQuoteCustomerEditList(customerReq){
    let url=this.baseUrl+"OpenCover/insured/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(customerReq),{headers:headers});
   }
  public getOcCommodityList(customerReq){
    let url=this.baseUrl+"opencover/dropdown/commodity";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(customerReq),{headers:headers});
   }
  public setOcCommodityList(customerReq){
    let url=this.baseUrl+"OpenCover/commodity/edit/info";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(customerReq),{headers:headers});
   }
  public setOcCommodityGridList(commodityReq){
    let url=this.baseUrl+"OpenCover/premium/commodity/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(commodityReq),{headers:headers});
   }
  public setOcClausesList(commodityReq){
    let url=this.baseUrl+"OpenCover/transport/cover/clauses";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(commodityReq),{headers:headers});
  }
  public getOcEditClauseList(clauseReq){
    let url=this.baseUrl+"OpenCover/clauses/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(clauseReq),{headers:headers});
  }
  public saveOcClausesList(clauseReq){
    let url=this.baseUrl+"OpenCover/clauses/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(clauseReq),{headers:headers});
  }
  public saveOcCommodityGridList(commodityReq){
    let url=this.baseUrl+"OpenCover/commodity/ratesetup/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(commodityReq),{headers:headers});
  }
  public getOcDepositInfo(depositReq){
    let url=this.baseUrl+"opencover/report/depositinfo";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(depositReq),{headers:headers});
  }
  public getOcConveyanceList(policyReq){
    let url=this.baseUrl+"opencover/report/conveyance";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(policyReq),{headers:headers});
  }
  public getOcPolicyGenerate(policyReq){
    let url=this.baseUrl+"opencover/report/policygeninfo";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(policyReq),{headers:headers});
  }
  public getOcType(typeReq){
    let url=this.baseUrl+"OpenCover/type";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(typeReq),{headers:headers});
  }
  public getOcMopPremimu(premiumReq){
    let url=this.baseUrl+"OpenCover/openpolicy/moppremium";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(premiumReq),{headers:headers});
   }
   public getOcMopPremimumCalc(premiumReq){
    let url=this.baseUrl+"OpenCover/premiumcalc/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(premiumReq),{headers:headers});
   }
  public getOcSaleTermList(saleTermReq){
    let url=this.baseUrl+"opencover/dropdown/saleterm";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(saleTermReq),{headers:headers});
   }
  public getOcMopCalculate(calculateReq){
    let url=this.baseUrl+"OpenCover/premiumcalc";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    console.log("Requwsssssss");
    return this.http.post<any>(url,JSON.stringify(calculateReq),{headers:headers});
  }
  public getOcToleranceList(toleranceReq){
    let url=this.baseUrl+"opencover/dropdown/tolerance";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(toleranceReq),{headers:headers});
   }
   public getOcMopProceed(proceedReq){
    let url=this.baseUrl+"OpenCover/premiumcalc/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proceedReq),{headers:headers});
   }
   public getOcSecondPageProceed(proceedReq){
    let url=this.baseUrl+"OpenCover/secondpage";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proceedReq),{headers:headers});
   }
  public getOcPortfolioBrokerDrpDown(brokerReq){
    let url=this.baseUrl+"opencover/report/policyregister";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
  public getOcTransportList(transportReq){
    let url=this.baseUrl+"OpenCover/transport/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(transportReq),{headers:headers});
   }
  public getOcCurrencyList(currencyReq){
    let url=this.baseUrl+"opencover/dropdown/currency";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(currencyReq),{headers:headers});
  }
  public getOcTransportSave(proceedReq){
    let url=this.baseUrl+"OpenCover/transport/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proceedReq),{headers:headers});
  }
  public getOcCommoditySave(customerReq){
    let url=this.baseUrl+"OpenCover/commodity/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(customerReq),{headers:headers});
   }
  public getOcOrgSaveCountry(proposalReq){
    let url=this.baseUrl+"OpenCover/originationcountry/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proposalReq),{headers:headers});
   }
   public getOcDestSaveCountry(proposalReq){
    let url=this.baseUrl+"OpenCover/destinationcountry/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(proposalReq),{headers:headers});
   }
   public getOcConstantCountryList(constantReq){
    let url=this.baseUrl+"opencover/dropdown/constant";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(constantReq),{headers:headers});
   }
   public getOcQuoteBrokerDetails(openCover){
    let url=this.baseUrl+"opencover/dropdown/brokerdetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   public getOcQuoteExecutiveDetails(executiveReq){
    let url=this.baseUrl+"opencover/dropdown/excutivedetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(executiveReq),{headers:headers});
   }
   public getOcQuoteCurrencyList(currencyReq){
    let url=this.baseUrl+"opencover/dropdown/currency";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(currencyReq),{headers:headers});
   }
   public getOcQuoteCustomerInfo(currencyReq){
    let url=this.baseUrl+"opencover/dropdown/customerlist";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(currencyReq),{headers:headers});
   }
   public getOcQuoteBusinessType(businessReq){
    let url=this.baseUrl+"opencover/dropdown/businesstype";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(businessReq),{headers:headers});
   }
   public getOcQuoteOCType(businessReq){
    let url=this.baseUrl+"opencover/dropdown/covertypeinfo";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(businessReq),{headers:headers});
   }
   public getOcQuoteRegister(openCover){
    let url=this.baseUrl+"opencover/report/quoteregister";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   public getOcPendingQuote(openCover){
    let url=this.baseUrl+"OpenCover/pendingtoapproved";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   public getOcQuoteLapsed(openCover){
    let url=this.baseUrl+"OpenCover/portfolio/lapsed";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   public getOcRenewalPending(openCover){
    let url=this.baseUrl+"opencover/report/renewal/policy";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   public getOcPolicyRegister(openCover){
    let url=this.baseUrl+"opencover/report/policyregister";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   public getOcExpiredPolicy(openCover){
    let url=this.baseUrl+"OpenCover/expired";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   public getOcEndorseEdit(endorseReq){
    let url=this.baseUrl+"OpenCover/endorsement/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(endorseReq),{headers:headers});
   }
   public getOcEndorseTypeList(endorseReq){
    let url=this.baseUrl+"OpenCover/endorsement/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(endorseReq),{headers:headers});
   }
   public getOcEndorseUpdate(endorseReq){
    let url=this.baseUrl+"OpenCover/endorsement/update";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(endorseReq),{headers:headers});
   }
   public getOcQuoteInsert(formValue){
    let url=this.baseUrl+"OpenCover/quote/save";
    console.log("OC Quote Save");
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    });
    return this.http.post<any>(url,JSON.stringify(formValue),{headers:headers});
   }
   public setProductId(productId){
    //let url=this.baseUrl+"api/ChooseProductDetail";
    let url=this.baseUrl+"api/product/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    });
    return this.http.post<any>(url,JSON.stringify(productId),{headers:headers});
   }
   public getOpenCoverCustomerList(openCover){
    let token=sessionStorage.getItem('userToken');
    console.log("certificate Token",token);
    //let url=this.baseUrl+"api/getOpenCoverCustList";
    let url=this.baseUrl+"api/customer/information";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    return this.http.post<any>(url,JSON.stringify(openCover),{headers:headers});
   }
   /******New Quote Page*****/
   public getCurrencyData(currencyCode){
    //let url =this.baseUrl+"dropdown/currency" 
    let url =this.baseUrl+"quote/dropdown/currency" 
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(currencyCode),{headers:headers});
  }
  public getTitleData(titleData){
    //let url =this.baseUrl+"dropdown/title";
    let url =this.baseUrl+"quote/dropdown/title";
    let token = sessionStorage.getItem('userToken');
    console.log("Title Tokennnnnn",token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(titleData),{headers:headers});
  }
  public getLcBankData(lcBankData){
    //let url =this.baseUrl+"dropdown/lcbank";
    let url =this.baseUrl+"quote/dropdown/lcbank";
    let token = sessionStorage.getItem('userToken');
    console.log("Lc Tokennnnnn",token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(lcBankData),{headers:headers});
  }
  public getModeOfTransfer(modeOfTransfer){
    //let url =this.baseUrl+"dropdown/modeoftransport";
    let url =this.baseUrl+"quote/dropdown/modeoftransport";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(modeOfTransfer),{headers:headers});
  }
  public getOriginatingCountry(originalCountry){
    //let url =this.baseUrl+"dropdown/originationcountry";
    let url =this.baseUrl+"quote/dropdown/originationcountry";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   })
    return this.http.post<any>(url,JSON.stringify(originalCountry),{headers:headers});
   }
   public getDestCountry(destCountry){
    //let url =this.baseUrl+"dropdown/destinationcountry";
    let url =this.baseUrl+"quote/dropdown/destinationcountry";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("Dest Req",destCountry)
    console.log("Dest Token",token)
    return this.http.post<any>(url,JSON.stringify(destCountry),{headers:headers});
  }
  public getSaleTerm(saleTerm){
    //let url =this.baseUrl+"dropdown/incoterm";
    let url =this.baseUrl+"quote/dropdown/incoterm";
    let token = sessionStorage.getItem('userToken');
    console.log("IncoTerm Tokennnnnn",token);
    console.log(saleTerm)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(saleTerm),{headers:headers});
  }
  public getGoodsCategory(goods){
    //let url =this.baseUrl+"dropdown/goodscategory";
    let url =this.baseUrl+"quote/dropdown/goodscategory";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(goods),{headers:headers});
  }
  public getProducersList(producers){
    let url =this.baseUrl+"dropdown/producerlist";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(producers),{headers:headers});
  }
  public getBrokersList(brokers){
    //let url =this.baseUrl+"dropdown/broker";
    let url =this.baseUrl+"quote/dropdown/broker";
    let token = sessionStorage.getItem('userToken');
    console.log(brokers)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("Broker Req",brokers)
    return this.http.post<any>(url,JSON.stringify(brokers),{headers:headers});
  }
  public getCashList(cashList){
    let url =this.baseUrl+"dropdown/cash";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(cashList),{headers:headers});
  }
  public getTolerance(tolerance){
    //let url =this.baseUrl+"dropdown/tolerance";
    let url =this.baseUrl+"quote/dropdown/tolerance";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url,JSON.stringify(tolerance),{headers:headers});
  }
  public getCity(city){
    //let url =this.baseUrl+"dropdown/city";
    let url =this.baseUrl+"quote/dropdown/city";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(city),{headers:headers});
  }
  public getCustomerName(customerName){
    let url=this.baseUrl+"api/customer/information";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("customer Req",customerName)
    return this.http.post<any>(url,JSON.stringify(customerName),{headers:headers});
   }
   public getVesselName(vesselName){
    let url=this.baseUrl+"menu/dropdown/getSearchData";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userToken}`
    })
    console.log("Vesssel Req",vesselName)
    return this.http.post<any>(url,JSON.stringify(vesselName),{headers:headers});
   }
    public vesselByIMO(searchReq){
      let url="http://192.168.1.99:9030/ship/getbyIHSLRorIMO";
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic dGF3dW5peWE6dGF3dW5peWFAMTIzIw==`,
        'Access-Control-Allow-Origin': '*'
      })
      console.log("Vesssel Req",searchReq)
      return this.http.post<any>(url,JSON.stringify(searchReq),{headers:headers});
    }
    public vesselByName(searchReq){
      let url=this.vesselUrl+"getByName";
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic dGF3dW5peWE6dGF3dW5peWFAMTIzIw==`
      })
      console.log("Vesssel Req",searchReq)
      return this.http.post<any>(url,JSON.stringify(searchReq),{headers:headers});
    }
    public vesselByExName(searchReq){
      let url=this.vesselUrl+"getByExName";
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic dGF3dW5peWE6dGF3dW5peWFAMTIzIw==`
      })
      console.log("Vesssel Req",searchReq)
      return this.http.post<any>(url,JSON.stringify(searchReq),{headers:headers});
    }
   public submitData(userData:any){
        let url=this.baseUrl+"quote/save";
        let token = sessionStorage.getItem('userToken');
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    return this.http.post<any>(url,JSON.stringify(userData),{headers:headers});
  }
  public getResponseContent(reference){
    let token = sessionStorage.getItem('userToken');
    //let url=this.baseUrl+"api/getQuote";
    let url=this.baseUrl+"quote/premiumcalc";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(reference),{headers:headers});
   }
   public getModeCarriage(modeCarriage){
    //let url =this.baseUrl+"dropdown/modeofcarriage";
    let url =this.baseUrl+"quote/dropdown/modeofcarriage";
    let token = sessionStorage.getItem('userToken');
    console.log("Mode",modeCarriage)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(modeCarriage),{headers:headers});
  }
  public getExecutive(executive){
    //let url =this.baseUrl+"dropdown/executive";
    let url =this.baseUrl+"quote/dropdown/executive";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(executive),{headers:headers});
  }
  public getCover(coverData){
    //let url =this.baseUrl+"dropdown/cover";
    let url =this.baseUrl+"quote/dropdown/cover";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(coverData),{headers:headers});
  }
  public getPackage(packages){
    //let url =this.baseUrl+"dropdown/package";
    let url =this.baseUrl+"quote/dropdown/package";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("Package Req",packages);
    return this.http.post<any>(url,JSON.stringify(packages),{headers:headers});
  }
  public getSaleTermPercent(saleTerm){
    //let url =this.baseUrl+"dropdown/incotermpercentage";
    let url =this.baseUrl+"quote/dropdown/incotermpercentage";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(saleTerm),{headers:headers});
  }
  public getDestinationCity(destinationCity){
    //let url =this.baseUrl+"dropdown/destinationcity";
    let url =this.baseUrl+"quote/dropdown/destinationcity";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   })
    return this.http.post<any>(url,JSON.stringify(destinationCity),{headers:headers});
   }

  public getOriginalCity(originalCity){
    //let url =this.baseUrl+"dropdown/originationcity";
    let url =this.baseUrl+"quote/dropdown/originationcity";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   })
    return this.http.post<any>(url,JSON.stringify(originalCity),{headers:headers});
   }
   public getSaleAgentData(saleAgentData){
    //let url =this.baseUrl+"dropdown/settlingagent";
    let url =this.baseUrl+"quote/dropdown/settlingagent";
    let token = sessionStorage.getItem('userToken');
    console.log("Setling Agent Request",saleAgentData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(saleAgentData),{headers:headers});
  }
  /****************/
  public getExistingQuote(existingData){
    //let url=this.baseUrl+"menu/dropdown/getQuoteRegister";
    let url=this.baseUrl+"menu/existing/quote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    console.log(existingData);
    return this.http.post<any>(url,JSON.stringify(existingData),{headers:headers});
   }
   public getLapsedQuote(existingData){
    //let url=this.baseUrl+"menu/dropdown/getQuoteRegister";
    let url=this.baseUrl+"menu/lapsed/quote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    console.log(existingData);
    return this.http.post<any>(url,JSON.stringify(existingData),{headers:headers});
   }
   public getRejectedQuote(existingData){
    //let url=this.baseUrl+"menu/dropdown/getQuoteRegister";
    let url=this.baseUrl+"menu/rejected/quote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    console.log(existingData);
    return this.http.post<any>(url,JSON.stringify(existingData),{headers:headers});
   }
   public getCustomerList(customerData){
    let url=this.baseUrl+"menu/customerlist";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer `+token
    })
    console.log(customerData);
    return this.http.post<any>(url,JSON.stringify(customerData),{headers:headers});
   }
   public getEditContent(reference){
    let url=this.baseUrl+"quote/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(reference),{headers:headers});
   }
   public getPrintExistData(rejectExist){
    let url=this.baseUrl+"pdf/certificate";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(rejectExist);
    return this.http.post<any>(url,JSON.stringify(rejectExist),{headers:headers});
   }
   public getScheduleData(rejectExist,suburl){
    let url=this.baseUrl+suburl;
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(rejectExist);
    return this.http.post<any>(url,JSON.stringify(rejectExist),{headers:headers});
   }
   public getRejectReasonList(rejectExist){
    //let url=this.baseUrl+"menu/dropdown/getQuoteInfo";
    let url=this.baseUrl+"menu/rejectedreasons";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(rejectExist);
    return this.http.post<any>(url,JSON.stringify(rejectExist),{headers:headers});
   }
   public getRejectExistData(rejectExist){
    //let url=this.baseUrl+"menu/dropdown/getQuoteInfo";
    let url=this.baseUrl+"menu/lapsed/quoteinfo";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(rejectExist);
    return this.http.post<any>(url,JSON.stringify(rejectExist),{headers:headers});
   }
   public getRejectExistUpdate(rejectUpdate){
    //let url=this.baseUrl+"menu/dropdown/updatedQuoteStaus";
    let url=this.baseUrl+"menu/update/rejectquotestaus";
    console.log(JSON.stringify(rejectUpdate));
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(rejectUpdate),{headers:headers});
   }
   /* *GetQuote**/
   public getEditClauseListUpdate(editClause){
    //let url=this.baseUrl+"api/getUpdateClausesList";
    let url=this.baseUrl+"quote/conditions/modify";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(editClause),{headers:headers});
   }
   public addClauseListUpdate(editClause){
    //let url=this.baseUrl+"api/getUpdateClausesList";
    let url=this.baseUrl+"quote/conditions/add";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(editClause),{headers:headers});
   }
   public getFinalizeUpdate(finalizeReq){
    let url=this.baseUrl+"api/finalize/update";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(finalizeReq),{headers:headers});
   }
   public getCalculatePremium(calculateData:any){
    let url=this.baseUrl+"quote/premium/calculate";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(token)
    return this.http.post<any>(url,JSON.stringify(calculateData),{headers:headers});
   }
   public getProceedPremium(submittedData:any){
    let url=this.baseUrl+"quote/premium/update";
    let token = sessionStorage.getItem('userToken');
    console.log(JSON.stringify(submittedData));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("Get Proceed Token",this.userToken);
    return this.http.post<any>(url,JSON.stringify(submittedData),{headers:headers});
   }
   public getEditClauseList(addClause,urlData){
    let url=this.baseUrl+urlData;
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("Add Clause Req",addClause)
    return this.http.post<any>(url,JSON.stringify(addClause),{headers:headers});
   } 
   public getViewClauseList(clauseList){
    //let url=this.baseUrl+"api/getviewclauselist";
    let url=this.baseUrl+"quote/conditions/view";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("View Clause Req",clauseList)
    return this.http.post<any>(url,JSON.stringify(clauseList),{headers:headers});
   }  
   /* Copy Quote*/
   public getSearchQuote(searchData){
    //let url=this.baseUrl+"menu/dropdown/search/quote";
    let url=this.baseUrl+"menu/search/quote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(searchData);
    return this.http.post<any>(url,JSON.stringify(searchData),{headers:headers});
   }
   public getSearchPolicy(searchData){
    //let url=this.baseUrl+"menu/dropdown/search/policy";
    let url=this.baseUrl+"menu/search/policy";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(searchData);
    return this.http.post<any>(url,JSON.stringify(searchData),{headers:headers});
   }
   public getSearchCustomer(searchData){
    //let url=this.baseUrl+"menu/dropdown/search/customer";
    let url=this.baseUrl+"menu/search/customer";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(searchData);
    return this.http.post<any>(url,JSON.stringify(searchData),{headers:headers});
   }
   public getCopyQuote(copyData){
    //let url=this.baseUrl+"menu/dropdown/copyquote";
    let url=this.baseUrl+"menu/copyquote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(copyData),{headers:headers});
   }
   /* Policies */
   public getPortfolio(portfolio){
    //let url=this.baseUrl+"menu/dropdown/getPortfolio";
    let url=this.baseUrl+"menu/portfolio/policy";
    let token = sessionStorage.getItem('userToken');
    console.log("Policy Token",token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(portfolio)
    return this.http.post<any>(url,JSON.stringify(portfolio),{headers:headers});
   }
   public getPolicyReport(reportReq){
    let url=this.baseUrl+"menu/policyreport";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(reportReq)
    return this.http.post<any>(url,JSON.stringify(reportReq),{headers:headers});
   }
   public getBulkReport(reportReq){
    let url=this.baseUrl+"menu/dropdown/getBulkReport";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(reportReq)
    return this.http.post<any>(url,JSON.stringify(reportReq),{headers:headers});
   }
  public getOpenCoverReportList(reportReq){
    let url=this.baseUrl+"admin/getOpenCoverReportList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(reportReq),{headers:headers});
   }
   public getEndorsement(endorsement){
    //let url=this.baseUrl+"menu/dropdown/getEndorsements";
    let url=this.baseUrl+"menu/endorsement/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url,JSON.stringify(endorsement),{headers:headers});
   }
   public getPolicyEndorsement(endorsement){
    //let url=this.baseUrl+"menu/dropdown/getEndorsements";
    let url=this.baseUrl+"menu/policy/endorsement";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url,JSON.stringify(endorsement),{headers:headers});
   }
   public getEndorseHeaders(endorsementReq){
    let url=this.baseUrl+"api/endorsement/headerdetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url,JSON.stringify(endorsementReq),{headers:headers});
   }
   /* Policy Endorsement */
   public getEndorsementList(endorsement){
    //let url=this.baseUrl+"menu/dropdown/getEndorsementList";
    let url=this.baseUrl+"menu/endorsementtype/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(endorsement),{headers:headers});
   }
    public getCancelEndorse(endorsement){
    let url=this.baseUrl+"api/getPolicyResponse";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(endorsement),{headers:headers});
   }
   /* Get OpenCover Broker Info */
   public getOCBrokerInfo(openCoverNo){
    //let url=this.baseUrl+"api/getBrokerInformation";
    let url=this.baseUrl+"api/broker/information";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(openCoverNo),{headers:headers});
   }
   public getOCNumberUpdate(openCoverNo){
    //let url=this.baseUrl+"api/getBrokerInformation";
    let url=this.baseUrl+"api/opencover/headerdetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(openCoverNo),{headers:headers});
   }
   /**Referral Approved */
   public getReferralList(referralList){
    //let url=this.baseUrl+"menu/dropdown/getBrokerList";
    let url=this.baseUrl+"menu/referral/dropdownlist";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(referralList)
    return this.http.post<any>(url,JSON.stringify(referralList),{headers:headers});
   }
   public getReferalQuote(refferalData,urlData){
    let url=this.baseUrl+urlData;
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log(refferalData)
    return this.http.post<any>(url,JSON.stringify(refferalData),{headers:headers});
   }
   /** Masters **/

   public getModeTransportMaster(modeTransport){
    let url=this.baseUrl+"master/modeOfTransportMaster/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(modeTransport),{headers:headers});
   }
   public getModeMasterUpdate(modeTransport){
    let url=this.baseUrl+"master/modeOfTransportMaster/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(modeTransport),{headers:headers});
   }
   public getMasterEdit(modeTransport,subUrl){
    let url=this.baseUrl+subUrl;
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(modeTransport),{headers:headers});
   }
   /**  Masters Insert Creation **/
   public getCountryMaster(){
    let url=this.baseUrl+"master/country/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(url,{headers:headers});
   }

   public getCountryMasterUpdate(countrymaster){
    let url=this.baseUrl+"master/country/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(countrymaster),{headers:headers});
   }
   public getCountryNameDropdown(branchcode){
    let url=this.baseUrl+"dropdown/countryname";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchcode),{headers:headers});
   }
   public getCoverNameDropdown(branchcode){
    let token = sessionStorage.getItem('userToken');
    let url=this.baseUrl+"master/covername";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchcode),{headers:headers});
   }
   public getBankMaster(){
    let url=this.baseUrl+"master/bank/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(url,{headers:headers});
   }
   
   public getBranchMaster(){
    let url=this.baseUrl+"master/branch/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(url,{headers:headers});
   }
   public getCityMaster(){
    let url=this.baseUrl+"master/city/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(url,{headers:headers});
   }
   public getBankCountryNameDropdown(branchcode){
    let url=this.baseUrl+"dropdown/bankcountryname";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchcode),{headers:headers});
   }
   public getBankMasterUpdate(bankmaster){
    let url=this.baseUrl+"master/bank/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(bankmaster),{headers:headers});
   }
   public getBranchMasterUpdate(branchmaster){
    let url=this.baseUrl+"master/branch/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchmaster),{headers:headers});
   }
   public getModeofTransportDropdown(branchcode){
    let url=this.baseUrl+"quote/dropdown/modeoftransport";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchcode),{headers:headers});
   }
   public getCommodityExcessMasterUpdate(commodityexcess){
    let url=this.baseUrl+"master/commodityexcess/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(commodityexcess),{headers:headers});
   }
   public getConstantMaster(constantmaster){
    let url=this.baseUrl+"master/constant/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(constantmaster),{headers:headers});
   }
   public getConstantDetailMaster(constantdetail){
    let url=this.baseUrl+"master/insertupdate/constantdetail";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(constantdetail),{headers:headers});
   }
   public getConveyanceMasterUpdate(conveyancemaster){
    let url=this.baseUrl+"master/conveyance/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(conveyancemaster),{headers:headers});
   }
   public getCoverMaster(covermaster){
    let url=this.baseUrl+"master/insertupdate/covermaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(covermaster),{headers:headers});
   }
   public getCurrencyMaster(currencymaster){
    let url=this.baseUrl+"master/currency/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(currencymaster),{headers:headers});
   }
   public getExclusionMaster(exclusionmaster){
    let url=this.baseUrl+"master/exclusion/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(exclusionmaster),{headers:headers});
   }
   public getExtracoverMaster(extracover){
    let url=this.baseUrl+"master/extracover/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(extracover),{headers:headers});
   }
   public getPackageMaster(packagemaster){
    let url=this.baseUrl+"master/package/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(packagemaster),{headers:headers});
   }
   public getExecutiveMasterUpdate(executivemaster){
    let url=this.baseUrl+"master/insertupdate/executivemaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(executivemaster),{headers:headers});
   }
   public getSaleTermMasterUpdate(saletermmaster){
    let url=this.baseUrl+"master/saleTermMaster/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(saletermmaster),{headers:headers});
   }
   public getSettlingAgentMaster(settlingagentmaster){
    let url=this.baseUrl+"master/insertupdate/settlingagentmaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(settlingagentmaster),{headers:headers});
   }
   public getToleranceMasterUpdate(tolerancemmaster){
    let url=this.baseUrl+"master/tolerance/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(tolerancemmaster),{headers:headers});
   }
   public getVesselType(branchcode){
    let url=this.baseUrl+"dropdown/vesseltype";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchcode),{headers:headers});
   }
   public getManufactureYear(branchcode){
    let url=this.baseUrl+"dropdown/manufactureyear";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchcode),{headers:headers});
   }
   public getVesselMaster(vesselmaster){
    let url=this.baseUrl+"master/insertupdate/vesselmaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(vesselmaster),{headers:headers});
   }
   public getWarRateMasterUpdate(warratemaster){
    let url=this.baseUrl+"master/warrate/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(warratemaster),{headers:headers});
   }
   public getWarrantyMaster(warrantymaster){
    let url=this.baseUrl+"master/warranty/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(warrantymaster),{headers:headers});
   }
   public getWSRCCMasterUpdate(WSRCCMaster){
    let url=this.baseUrl+"master/insertupdate/WSRCCMaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(WSRCCMaster),{headers:headers});
   }
   public getClausesIdMasterUpdate(clausesmaster){
    let url=this.baseUrl+"master/insertupdate/clausesmaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(clausesmaster),{headers:headers});
   }
   public getCityMasterUpdate(citymaster){
    let url=this.baseUrl+"master/insertupdate/citymaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(citymaster),{headers:headers});
   }
   public getMaterialMasterUpdate(materialmaster){
    let url=this.baseUrl+"master/material/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(materialmaster),{headers:headers});
   }
   public getMasterGridList(gridRequet){
    let url=this.baseUrl+"master/getMasterDetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(gridRequet),{headers:headers});
   }
   public getCountryCoverMasterList(gridRequet){
    let url=this.baseUrl+"master/countrycover/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(gridRequet),{headers:headers});
   }
   public getCommodityList(gridRequet){
    let url=this.baseUrl+"master/commodity/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(gridRequet),{headers:headers});
   }
   public getConveyanceMasterList(gridRequet){
    let url=this.baseUrl+"master/conveyance/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(gridRequet),{headers:headers});
   }
   public getCommodityMasterUpdate(commoditymaster){
    let url=this.baseUrl+"master/insertupdate/commoditymaster";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(commoditymaster),{headers:headers});
   }

   public getCommodityMasterEdit(editblock){
    let url=this.baseUrl+"master/commodity/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(editblock),{headers:headers});
   }
   public getCommodityEditPopUp(editPopUP){
    let url=this.baseUrl+"master/commoditymaster/popupblock";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(editPopUP),{headers:headers});
   }
   /*****/
   public getBackPremium(getPremium){
    let url=this.baseUrl+"quote/premium/response";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(getPremium),{headers:headers});
   }
   /*****/
   public getAdminReferralDropdown(dropdownReq){
    //let url=this.baseUrl+"OpenCover/DropDown/getOCReferralQuoteProduct";
    let url=this.baseUrl+"opencover/dropdown/referral/quoteproduct";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(dropdownReq),{headers:headers});
   }
   public getPendingRefferals(pendingReferrals){
    //let url=this.baseUrl+"OpenCover/Menu/getReferralQuote";
    let url=this.baseUrl+"opencover/report/pending/referralquote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(pendingReferrals),{headers:headers});
   }
   public getApprovedRefferals(approvedReferrals){
    //let url=this.baseUrl+"OpenCover/Menu/getReferralQuote";
    let url=this.baseUrl+"opencover/report/approved/referralquote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(approvedReferrals),{headers:headers});
   }
   public getRejectedRefferals(rejectedReferrals){
    //let url=this.baseUrl+"OpenCover/Menu/getReferralQuote";
    let url=this.baseUrl+"opencover/report/rejected/referralquote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(rejectedReferrals),{headers:headers});
   }
    public getSearchRefferals(searchReq){
    //let url=this.baseUrl+"OpenCover/Menu/referral/search";
    let url=this.baseUrl+"opencover/report/search/referralquote";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(searchReq),{headers:headers});
   }

   public getBrokerManagementList(brokerReq){
    let url=this.baseUrl+"admin/getAdminBrokerList";
    let token = sessionStorage.getItem('userToken'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("Broker Token",token);
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   public getAdminManagementList(brokerReq){
    let url=this.baseUrl+"admin/getAdminList";
    let token = sessionStorage.getItem('userToken'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   public getAdminEditList(adminReq){
    let url=this.baseUrl+"admin/getAdminEditList";
    let token = sessionStorage.getItem('userToken');
    console.log("Edit Admin Mgm Req",adminReq);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(adminReq),{headers:headers});
   }
   
   public getViewBrokerInfoMgm(brokerReq){
    let url=this.baseUrl+"admin/getBrokerInformation";
    let token = sessionStorage.getItem('userToken');
    console.log("View Broker Mgm Req",brokerReq);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   /***/
   public getBrokerMgmExecutive(){
    let url=this.baseUrl+"admin/getBrokerMangDropDown";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(url,{headers:headers});
   }
   public getInsertBrokerMgm(useProfileForm){
    let url=this.baseUrl+"admin/AdminNewBrokerInsert";
    let token = sessionStorage.getItem('userToken');
    console.log("Entered For calling Broker INsert");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(useProfileForm),{headers:headers});
   }
   public getIssuerManagementList(issuerReq){
    let url=this.baseUrl+"admin/getAdminIssuerList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(issuerReq),{headers:headers});
   }
   public getPortfolioRegionList(regionReq){
    let url=this.baseUrl+"admin/getPortFolioRegionList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(regionReq),{headers:headers});
   } 
   public getSearchRegionList(searchReq,subUrl){
    let url=this.baseUrl+subUrl;
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(searchReq),{headers:headers});
   }
   public getUserMgtOCCertificate(userReq){
    let url=this.baseUrl+"admin/getUserMgtOCCertificate";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(userReq),{headers:headers});
   }
   public getOpenCoverEndorseSearch(issuerReq){
    let url=this.baseUrl+"api/opencover/endorsement";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(issuerReq),{headers:headers});
   }
    public getEditUserManagement(issuerReq){
    let url=this.baseUrl+"admin/getUserMgtEditList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(issuerReq),{headers:headers});
   }
    public getEditIssuerManagement(issuerReq){
    let url=this.baseUrl+"admin/getIssuerInformation";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(issuerReq),{headers:headers});
   }
   public getIssuerProductDetails(productReq){
    let url=this.baseUrl+"admin/IssuerProductDetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(productReq),{headers:headers});
   }
   public getIssuerBranchDetails(branchReq){
    let url=this.baseUrl+"admin/getIssuerBranchDetail";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchReq),{headers:headers}); 
   }
   public getIncludedBrokersList(brokerReq){
    let url=this.baseUrl+"admin/IssuerIncludedBroker";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   public getIncludedBrokersInsert(brokerReq){
    let url=this.baseUrl+"admin/IssuerIncludedInsert";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   public getExcludedBrokersList(brokerReq){
    let url=this.baseUrl+"admin/IssuerExcludedBroker";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   public getExcludedBrokersDelete(brokerReq){
    let url=this.baseUrl+"admin/included/delete";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   public  getAdminUserTypeList(userRequest){
    let url=this.baseUrl+"admin/getAdminUserTypeList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(userRequest),{headers:headers}); 
   }
   public getUnderWriterGradeList(){
    let url=this.baseUrl+"admin/getUnderWriterGradeList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(url,{headers:headers}); 
   }
  public getReportUWList(uwReq){
    let url=this.baseUrl+"admin/getReportUWList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(uwReq),{headers:headers}); 
   }
   public getAdminMenuList(menuRequest){
    let url=this.baseUrl+"admin/getAdminMenuList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(menuRequest),{headers:headers});
   }
   public getReportsBrokerSearchList(brokerRequest,subUrl){
    let url=this.baseUrl+subUrl;
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerRequest),{headers:headers});
   }
   public getBranchReportsSearchList(branchReq){
    let url=this.baseUrl+"admin/getBranchReportList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchReq),{headers:headers});
   }
   public getOpenCoverPolicyList(opencoverReq){
    let url=this.baseUrl+"admin/getOpenCoverCertificateList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(opencoverReq),{headers:headers});
   }
   public getBranchReportDropdown(branchReq){
    let url=this.baseUrl+"admin/getReportBranchDropDownList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchReq),{headers:headers});
   }
   public getBranchReportSearchList(branchReq){
    let url=this.baseUrl+"admin/getBranchReportList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(branchReq),{headers:headers});
   }
   public getAdminMgmBrokerList(brokerRequest){
    let url=this.baseUrl+"admin/getAdminBrokerList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerRequest),{headers:headers});
   }
   public getNewAdminInsert(submitForm){
    let url=this.baseUrl+"admin/NewAdminInsert";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(submitForm),{headers:headers});
   }
   public getNewUserInsert(submitForm){
    let url=this.baseUrl+"admin/UserMgtInsertOrUpdate";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(submitForm),{headers:headers});
   }
   public getUserProductInsert(submitForm){
    let url=this.baseUrl+"admin/UserMgtProductInsert";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(submitForm),{headers:headers});
   }
   public getNewIssuerInsert(submitForm){
    let url=this.baseUrl+"admin/AdminNewIssuerInsert";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(submitForm),{headers:headers});
   }
    public getBrokerMgmProductList(productReq){
    let url=this.baseUrl+"admin/IssuerProductDetails";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(productReq),{headers:headers});
   }
    public getBrokerProductDelete(productReq){
    let url=this.baseUrl+"admin/getBrokerProductDelete";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    console.log("Sent Token",token);
    return this.http.post<any>(url,JSON.stringify(productReq),{headers:headers});
   }
    public getInsertProductBrokerMgm(productReq){
    let url=this.baseUrl+"admin/BrokerProductInsert";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(productReq),{headers:headers});
   }
   public getIssuerChangePassword(submitForm){
    let url=this.baseUrl+"admin/IssuerChangePassword";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(submitForm),{headers:headers});
   }
   public getBrokerMgmChangePass(submitForm){
    let url=this.baseUrl+"admin/getBrokerPasswordChange";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(submitForm),{headers:headers});
   }
   public getUserManagementList(userRequest){
    let url=this.baseUrl+"admin/getUserMgtList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(userRequest),{headers:headers});
   }
    public getUserProductList(userRequest){
    let url=this.baseUrl+"admin/user/product/edit";
    let token = sessionStorage.getItem('userToken');
    console.log("Product Token",token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(userRequest),{headers:headers});
   }
    public getUserMgmDropDown(userRequest){
    let url=this.baseUrl+"admin/getUserMgtDropDown";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(userRequest),{headers:headers});
   }
   public getFileUpload(fileRequest,quoteno){
     console.log("File Upload Request",fileRequest);
    let url=this.baseUrl+"file/upload";
    let token = sessionStorage.getItem('userToken');
   // let params = new HttpParams();
   // params.append('file',fileRequest);
   // params.append('docType',fileRequest[0].docs);
   // params.append('remarks',fileRequest[0].description);
   // params.append('productid',this.productId);
   // params.append('quoteno',quoteno);
    let formData:FormData = new FormData();
    let description:any[]=[];
    let docs:any[]=[];
    let files:any[]=[];
    if(fileRequest.length){
      for(let i=0 ; i < fileRequest.length ; i++){
        let index = i.toString();
          description.push(fileRequest[i].description);
          docs.push(fileRequest[i].docs);
          let fileArray:File[] = fileRequest[i].files;
          //fileArray.forEach(file => formData.append('files', file));
          files.push(fileRequest[i].files[0]);
      }
      console.log("File Json",files);
   }
    let fileRequests ={
        'docs':docs,
        'remarks': description,
        'file': files,
        'quoeno':quoteno,
        'productid':this.productId
    }
    console.log("Files Stored",fileRequest.files);
    formData.forEach((value, key) => object[key] = value);
    formData.append('files',<any>fileRequest.files[0])
    console.log("All Data File",formData.getAll('files'));
    formData.append("remarks",fileRequest.description);
    formData.append("docType",fileRequest.docs);
    formData.append("productid",sessionStorage.getItem('productId'));
    formData.append("loginid",sessionStorage.getItem('loginId'));
    formData.append("quoteno",quoteno);
    var object = {};
    formData.forEach((value,key) => {
      console.log(key+" "+value)
    })
    //formData.forEach((value, key) => object[key] = value);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,formData,{headers:headers});
   }
   public getUploadedFileList(fileReq){
    let url=this.baseUrl+"file/upload/list";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(fileReq),{headers:headers});
   }
   public getFileDownload(fileReq){
    let url=this.baseUrl+"file/download";
    let token = sessionStorage.getItem('userToken');
    const httpOptions = {
      responseType: 'blob' as 'json',
       headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      })
    }
    return this.http.post<any>(url,JSON.stringify(fileReq),httpOptions);
   }
   public getFileDelete(fileReq){
    let url=this.baseUrl+"file/delete";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(fileReq),{headers:headers});
   }
   public getPolicyGenerated(policyRequest){
    let url=this.baseUrl+"quote/policy/generate";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(policyRequest),{headers:headers});
   }
   public getBrokerMgmEdit(){
    let agencyCode:String;
    if(sessionStorage.getItem("brokerMgmAgencyCode") != null){
      agencyCode = sessionStorage.getItem('brokerMgmAgencyCode');
    }
    let brokerReq = {
      "AgencyCode": agencyCode,
      "BranchCode":"01"
    }
     console.log("Broker Edit Request",brokerReq);
      if(sessionStorage.getItem("brokerMgmEdit") != null){
        sessionStorage.removeItem('brokerMgmEdit');
      }
      let url=this.baseUrl+"admin/getBrokerEdit";
      let token = sessionStorage.getItem('userToken');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers})
      .subscribe(data=>{
        this.userToken = data.DefaultValue.Token;
        sessionStorage.setItem('userToken',data.DefaultValue.Token)
          console.log("Broker Edit Data",data);
          sessionStorage.setItem('brokerMgmEdit',JSON.stringify(data));
          this.router.navigate(['/newBrokerMgm']);
      });
   }
   public getLapsedActive(lapsedActive){
    let url=this.baseUrl+"menu/dropdown/updatedQuoteStaus";
    let token = sessionStorage.getItem('userToken');
    console.log(JSON.stringify(lapsedActive));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(lapsedActive),{headers:headers});
   }

   public getEndorsentTypeSubmit(policyReq){
    //let url=this.baseUrl+"api/insertEndorsement";
    let url=this.baseUrl+"api/endorsement/save";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(policyReq),{headers:headers});
   }
   public getPolicyBrokerList(policyReq){
    //let url=this.baseUrl+"menu/dropdown/getPFDropDownList";
    let url=this.baseUrl+"menu/portfolio/dropdownlist";
    let token = sessionStorage.getItem('userToken');
    console.log("Broker Token",token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(policyReq),{headers:headers});
   }
   public getEndorsementType(endorseReq){
    let url=this.baseUrl+"menu/dropdown/getEndorsementList";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(endorseReq),{headers:headers});
   }
   public getExistingQuoteBrokers(brokerReq){
    //let url=this.baseUrl+"menu/dropdown/getquoteregister/dropdownlist";
    let url=this.baseUrl+"menu/quoteregister/dropdownlist";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(brokerReq),{headers:headers});
   }
   public getExistingQuoteEmail(emailReq){
    let url=this.baseUrl+"mail/send";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(emailReq),{headers:headers});
   }
   public getEndorseField(endorseReq){
    //let url=this.baseUrl+"menu/dropdown/getendtfield";
    let url=this.baseUrl+"menu/endorsement/field";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(endorseReq),{headers:headers});
   }
   public getEndorsePremiumCompare(endorseReq){
    let url=this.baseUrl+"api/getPolicyComparision";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(endorseReq),{headers:headers});
   }
   public  getEndorsementEdit(endorseReq){
    //let url=this.baseUrl+"menu/dropdown/geteditendtfiled";
    let url=this.baseUrl+"menu/endorsement/edit";
    let token = sessionStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(url,JSON.stringify(endorseReq),{headers:headers});
   }
   public getExcelDownload(){
    let url=this.baseUrl+"pdf/excel/download";
    let token = sessionStorage.getItem('userToken');
    console.log("Tokennnnnnnn",token);
    const httpOptions = {
      responseType: 'blob' as 'json',
       headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
      })
    }
    return this.http.get<any>(url,httpOptions);
   }
   public getOcQuoteEdit(brokerReq){
    let url=this.baseUrl+"OpenCover/quote/edit";
    let token = sessionStorage.getItem('userToken');
    console.log("Recieved Token",token);
    const httpOptions = {
       headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('userToken')}`
      })
    }
    return this.http.post<any>(url,brokerReq,httpOptions);
   }
}
