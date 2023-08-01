
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../Auth/auth.service';
import { LoginService } from '../login/login.service';
import * as Mydatas from '../../app-config.json';
import { HttpService } from 'src/app/shared/Services/http.service';
import { SharedService } from 'src/app/shared/Services/shared.service';
@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss'],
})
export class ProductSelectionComponent implements OnInit {
  public userDetails: any;productList:any[]=[];
  branchList:any[]=[];
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  currentTheme = 'default';loginId:any;branchValue:any;
  userPictureOnly: boolean = false;user: any;userResponse:any;
  title:string="Log out";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  private destroy$: Subject<void> = new Subject<void>();
  section=false;
  typeName: any;
  types:any;
  typeValue:any;
  userType: any;
  userTypes:any='B2';
  typeList:any;
  branchName: any;
  insuranceid: any;

  constructor(private router: Router,
    private authService: AuthService,
    private loginService:LoginService,
    private service: HttpService,private SharedService:SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log('UUUUUUUUUUU',this.userDetails);
    this.userResponse = this.userDetails?.Result;
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails.Result.UserType;
    //this.userTypes = this.userDetails.Result.BranchCode;
    this.userTypes= this.userDetails.Result.BrokerBranchName
    this.insuranceid = this.userDetails.Result.LoginBranchDetails[0].InsuranceId;
    console.log('IIIIIIIIII',this.insuranceid);
    this.productList = this.userDetails.Result.BrokerCompanyProducts;


    console.log('tttttttt',this.userTypes)


  }

  ngOnInit(): void {
    // this.userService.getUsers()
    // .pipe(takeUntil(this.destroy$))
    // .subscribe((users: any) => this.user = users.nick);

  // const { xl } = this.breakpointService.getBreakpointsMap();
  // this.themeService.onMediaQueryChange()
  //   .pipe(
  //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
  //     takeUntil(this.destroy$),
  //   )
  //   .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

  // this.themeService.onThemeChange()
  //   .pipe(
  //     map(({ name }) => name),
  //     takeUntil(this.destroy$),
  //   )
  //   .subscribe(themeName => this.currentTheme = themeName);

  //   this.menuService.onItemClick()
  //   .pipe(
  //     filter(({ tag }) => tag === 'my-context-menu'),
  //     map(({ item: { title } }) => title),
  //   )
  //   .subscribe((title: any) => {
  //     if (title === 'Log out') {
  //       sessionStorage.clear();
  //       this.authService.logout();

  //       this.router.navigate(['/login']);
  //     }
  //   });
  //this. getTypeList()
  //this.getBranchList()
  }

  /*finaliseTypeValue(types,changeType){

    this.typeValue = types.CodeDesc;
    this.typeName = types.DisplayName;
    console.log("Setted Type Value",this.typeValue);
    this.onTypeChange(changeType);
  }*/

  /*onTypeChange(changeType){
    let type = sessionStorage.getItem('typeValue');
    console.log("1",type)
    if(type!=undefined){
        sessionStorage.setItem('typeValue',this.typeValue);
        type = sessionStorage.getItem('typeValue');
        console.log("2",type)
        this.getMenuList(changeType);
    }
    else{
      sessionStorage.setItem('typeValues',this.typeValue);
        this.getMenuList(changeType);
    }
    if(changeType=='direct'){
      //this.getBranchList();
    }
    else{
      this.router.navigate(['/Home'])
    }
  }*/


  onSelectProduct(item: any) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    userDetails.Result['ProductId'] = item.ProductId;
    console.log('ppppppp',item.ProductId)
    userDetails.Result['ProductName'] = item.ProductName;
    console.log('PPPPPNNNNNNN',item.ProductName)

    userDetails.Result['PackageYn'] = item.PackageYn;
    sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
    console.log("Products",item,userDetails.Result)
     this.router.navigate(['/Home']);

    // else if(item.ProductId =='4') this.router.navigate(['/Travel']);
    // //else if(item.ProductId=='7') this.router.navigate(['/HomeIns']);
    // else if(item.ProductId=='3') this.router.navigate(['/HomeIns']);
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
        });

    }
  }



}
