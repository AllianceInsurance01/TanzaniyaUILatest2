//import { SharedService } from './../../../shared/shared.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../Auth/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../modules/login/login.service';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/Services/shared.service';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userDetails: any;
  public userResponse: any;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  branchValue:any;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';
  typeList:any[]=[];typeValue:any="";branchList:any[]=[];
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  public AppConfig: any = (Mydatas as any).default;userType:any;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;
  constructor(
    private authService: AuthService,
    private loginService:LoginService,
    private router: Router,
    private SharedService:SharedService
    ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userResponse = this.userDetails?.Result;
    this.userType = this.userResponse.UserType;
    this.loginId = this.userDetails.Result.LoginId;
    this.typeList = [
      { "Code":"01","CodeDesc":"Quotation"},
      { "Code":"02","CodeDesc":"Approver" },
      { "Code":"03","CodeDesc":"Both" },
    ];
  }

  ngOnInit() {
    //this.currentTheme = this.themeService.currentTheme;

    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

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
    //       //sessionStorage.clear();
    //       //this.authService.logout();

    //       //this.router.navigate(['/login']);
    //       let Req = {
    //         "LoginId": this.loginId,
    //         "Token": this.loginService.getToken()
    //       };
    //       const urlLink = `${this.CommonApiUrl}authentication/logout`;
    //       this.SharedService.onPostMethodSync(urlLink, Req).subscribe(
    //         (data: any) => {
    //           let res:any = data;
    //           console.log(data);
    //           if (data.Result) {
    //             sessionStorage.clear();
    //             this.authService.logout();
    //             this.router.navigate(['/login']);

    //             console.log('You are logged out');

    //           }
    //             //
    //         });

    //     }
    //   });

      this.getTypeList();

  }
  onBranchChange(){
    if(this.branchValue!='' && this.branchValue!=undefined){
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(this.userType=='Issuer'){
        userDetails.Result['BranchCode'] = this.branchValue;
        let branchData:any = this.branchList.find(ele=>ele.BranchCode == this.branchValue);
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }
      else{
        userDetails.Result['BrokerBranchCode'] = this.branchValue;
        let branchData:any = this.branchList.find(ele=>ele.BrokerBranchCode == this.branchValue);
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }


      this.router.navigate(['/product']);
    }
  }
  getTypeList(){
    let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      let ReqObj = {
        "InsuranceId": userDetails?.Result?.InsuranceId,
        //"LoginId": userDetails?.Result?.LoginId,
        "BranchCode":userDetails?.Result?.BranchCode,
        "UserType": userDetails?.Result?.UserType
      }
      this.loginService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.typeList = data?.Result;
            this.typeValue = sessionStorage.getItem('typeValue');
            if(!this.typeValue){
              this.typeValue = this.typeList[0].CodeDesc;
              
              //this.getMenuList(); 
            }
            this.onTypeChange('direct');
          }
        },
        (err: any) => { console.log(err); },
      );
    }
  }
  onTypeChange(changeType){
    let type = sessionStorage.getItem('typeValue');
    console.log("1",type)
    if(type!=undefined){
      if(type!= this.typeValue){
        sessionStorage.setItem('typeValue',this.typeValue);
        type = sessionStorage.getItem('typeValue');
        console.log("2",type)
        this.getMenuList(changeType);
      }
    }
    else{
      sessionStorage.setItem('typeValue',this.typeValue);
      console.log("3",type)
        this.getMenuList(changeType);
    }
    this.getBranchList();
  }
  getMenuList(changeType){
    let urlLink = `${this.CommonApiUrl}admin/getmenulist`
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let ReqObj = {
      "LoginId":"Issuer3",
      "UserType":"Issuer",
      "SubUserType":this.typeValue
    }
    this.loginService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.loginService.menuList = data?.Result;
          let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
          if(userDetails){
            userDetails.Result['menuList'] = data.Result;
            sessionStorage.setItem('Userdetails',JSON.stringify(userDetails));
            //if(changeType=='change')
            window.location.reload();
          }
        }
      },
  
      (err: any) => { console.log(err); },
    );
  }
  getBranchList(){
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let branchList:any[] = userDetails.Result.LoginBranchDetails;
    if(this.userType=='Issuer'){
      this.branchValue = userDetails?.Result?.BranchCode;
    }
    else{
      this.branchValue = userDetails?.Result?.BrokerBranchCode;
    }
    this.branchList = branchList;

  }
  onRoute() {
    this.router.navigate(['/product']);
    // this.router.navigate(['/Admin/productList']);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    //this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    //this.sidebarService.toggle(true, 'menu-sidebar');
    //this.layoutService.changeLayoutSize();
     console.log(1);
    return false;
  }

  navigateHome() {
    this.router.navigate(['/product'])
  }
}
