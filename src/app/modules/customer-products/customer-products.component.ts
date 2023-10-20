import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import * as Mydatas from '../../app-config.json';
import { SharedService } from 'src/app/shared/Services/shared.service';
import { AuthService } from 'src/app/Auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent {

  isReadMore: boolean = true;
  isReadMoretravel: boolean = true;
  isReadMorecorporate: boolean = true;
  isReadMoremarine: boolean = true;
  userDetails: any; userResponse: any;loginId: any;
  userType: any;userTypes: any; productList: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginType: any;
  constructor(private router:Router,private SharedService: SharedService,private cookieService: CookieService, 
    private authService: AuthService,private loginService: LoginService,){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userResponse = this.userDetails?.Result;
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails.Result.UserType;
    //this.userTypes = this.userDetails.Result.BranchCode;
    this.userTypes= this.userDetails.Result.BrokerBranchName
    this.productList = this.userDetails.Result.BrokerCompanyProducts;  
    if(this.userDetails.Result.LoginType) this.loginType = this.userDetails.Result.LoginType;
  }
  onPress() {
        sessionStorage.clear();
        this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
        this.router.navigate(['./Home/login'])
  }
  onSelectProduct(item: any) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    userDetails.Result['ProductId'] = item.ProductId;
    console.log('ppppppp',item.ProductId)
    userDetails.Result['ProductName'] = item.ProductName;
    userDetails.Result['PackageYn'] = item.PackageYn;
    sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
    console.log("Products",item,userDetails.Result)
    sessionStorage.removeItem('customerReferenceNo');
    sessionStorage.removeItem('quoteReferenceNo');
    if(userDetails.Result.LoginType=='B2CFlow') this.router.navigate(['./Home/existingQuotes/customerSelection/customerDetails/customer-details']);
    else this.router.navigate(['./Home']);
    // else if(item.ProductId =='4') this.router.navigate(['/Travel']);
    // //else if(item.ProductId=='7') this.router.navigate(['/HomeIns']);
    // else if(item.ProductId=='3') this.router.navigate(['/HomeIns']);
  }
  tohome() {
    (document.getElementById("hero") as any).scrollIntoView();
  }
  toAbout() {
    (document.getElementById("about") as any).scrollIntoView();
  }
  toServices() {
    (document.getElementById("services") as any).scrollIntoView();
  }
  toProduct() {
    (document.getElementById("products") as any).scrollIntoView();
  }
  tocontact() {
    (document.getElementById("contact") as any).scrollIntoView();
  }
  scrollToTop() {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }
  readmore() {
    this.isReadMore = !this.isReadMore
  }
  readmoretravel() {
    this.isReadMoretravel = !this.isReadMoretravel
  }
  readmorecorporate() {
    this.isReadMorecorporate = !this.isReadMorecorporate
  }
  readmoremarine() {
    this.isReadMoremarine = !this.isReadMoremarine
  }
  onLog(title) {
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
          let res: any = data;
          console.log(data);
            sessionStorage.clear();
            this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
             this.authService.logout();
             this.router.navigate(['/login']);
            // if(this.typeValue=='b2c' || this.typeValue=='B2C' || this.loginType=='B2CFlow'){
            //   this.router.navigate(['/b2clogin']);
            // }
            // else 
          //
        },
        (err: any) => {
          sessionStorage.clear();
          this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
            this.authService.logout();
            this.router.navigate(['/login']);
          // console.log(err);
        },
        );

    }
  }
}
