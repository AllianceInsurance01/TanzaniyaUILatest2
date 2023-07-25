declare var $:any;
import { Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from './_nav';
import { navSubItem } from './_nav_oc';
import { navQuoteSubMenu } from './_nav_oc_quote';
import { LoginService } from '../../../modules/login/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/Services/http.service';
import * as Mydatas from '../../../app-config.json';
import { AuthService } from 'src/app/Auth/auth.service';
import { SharedService } from 'src/app/shared/Services/shared.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay, filter } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public collapsed: boolean = true;
  public expanded: boolean = false;
  public multiple: boolean = false;
  public productId: any; branchValue: any;
  public menu: any[] = []; branchList: any[] = [];
  productName: any; userDetails: any;submenuList:any[]=[];
  productname: any; currentIndex: any = null;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  config = {
    classname: 'my-custom-class',
    listBackgroundColor: `#fff`,
    fontColor: `black`,
    backgroundColor: `#fff`,
    selectedListFontColor: `darkblue`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    fontfamily: `'League Spartan', sans-serif !important`
  };
  loginId: any; userType: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  typeList: any[] = []; typeValue: any;parentSection:boolean = true;
  branchName: any; menuSection: boolean = true;
  typeName: any;openSideNav:boolean=false;
  constructor(
    private authService: AuthService,
    private service: HttpService,
    private loginService: LoginService,private observer: BreakpointObserver,
    private router: Router, private SharedService: SharedService
  ) {
    //this.menu = navItems;
    this.productName = sessionStorage.getItem('productName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.typeValue = sessionStorage.getItem('typeValue');
    this.loginId = this.userDetails.Result.LoginId;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails.Result.UserType;
    this.productname = this.userDetails.Result.ProductName;
    //this.setMenuSection();
  }

  ngOnInit(): void {
    this.getTypeList();
    $("#dropdownMenuLink").on('click', function (evt) {  
      console.log("evt***",evt);
      $('.subusermenu').toggle();
      evt.stopPropagation();
    });
    // $(window).on('click',function(){
    //   $('.subusermenu').hide();
    //  });
      $("#dropdownMenuLink1").on('click', function (evt) {  
        console.log("evt***",evt);
        $('.branchsubName').toggle();
      });
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  home() {
    if(this.typeValue=='B2C' && this.loginId=='guest'){
      this.router.navigate(['/customerProducts']);
    }
    else this.router.navigate(['/product']);
  }
  navexpand(i: any) {
    
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('customerReferenceNo')
    sessionStorage.removeItem('quoteReferenceNo');
    sessionStorage.removeItem('homeCommonDetails');
    sessionStorage.removeItem('HomeInsQuoteRefNo')
    sessionStorage.removeItem('TravelQuoteRefNo')
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('updatebar');
    sessionStorage.removeItem('endorseTypeId')
    if (this.expanded === false) {
      this.currentIndex = i;
      this.expanded = true;
    }
    else {
      this.currentIndex = null;
      this.expanded = false;
    }
    let children:any[] = this.menu[i].items;
    if(children.length!=0){
        this.submenuList = children;
        console.log("Received Sublist",this.submenuList)
        this.parentSection = false;
    }
  }
  clearSubSelection(){
    this.parentSection = true;
    this.expanded = false;
    this.currentIndex = null;
    this.submenuList = [];
  }
  // subusertypedropdown(){
  //   $("#dropdownMenuLink").click(function(){
  //     $('.subusermenu').toggle();
  //   });
  // }
  // branchNamedropdown(){
  //   $(".branchName").click(function(){
  //     $('.branchsubName').toggle();
  //   });
  // }
  onBranchChange(type) {
    if (this.branchValue != '' && this.branchValue != undefined) {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if (this.userType == 'Issuer') {
        userDetails.Result['BranchCode'] = this.branchValue;
        let branchData: any = this.branchList.find(ele => ele.BranchCode == this.branchValue);
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }
      else {
       
        userDetails.Result['BrokerBranchCode'] = this.branchValue;
        let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
        userDetails.Result['BranchCode'] = branchData?.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }

      if (type == null){this.router.navigate(['/product']);}
    }
  }
  getTypeList() {
    let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      let ReqObj = {
        "InsuranceId": userDetails?.Result?.InsuranceId,
        "LoginId": userDetails?.Result?.LoginId,
        "BranchCode": userDetails?.Result?.BranchCode,
        "UserType": userDetails?.Result?.UserType
      }
      this.loginService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.typeList = data?.Result;
            
            if (this.typeValue == undefined || this.typeValue == 'undefined') {
              this.typeValue = this.typeList[0].CodeDesc;
              //this.getMenuList();
            }
            let types = this.typeList.filter(ele => ele.CodeDesc == this.typeValue);
            if (types) this.finaliseTypeValue(types[0], 'direct');
          }
        },
        (err: any) => { console.log(err); },
      );
    }
  }
  onTypeChange(changeType) {
    let type = sessionStorage.getItem('typeValue');
    console.log("1", type)
    if (type != undefined) {
      sessionStorage.setItem('typeValue', this.typeValue);
      type = sessionStorage.getItem('typeValue');
      console.log("2", type)
      this.getMenuList(changeType);
    }
    else {
      sessionStorage.setItem('typeValue', this.typeValue);
      this.getMenuList(changeType);
    }
    if (changeType == 'direct') {
      this.getBranchList();
    }
    else {
      this.router.navigate(['/Home'])
    }
  }
  getMenuList(changeType) {
    let urlLink = `${this.CommonApiUrl}admin/getmenulist`
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let ReqObj = {
      "LoginId": this.loginId,
      "UserType": this.userType,
      "SubUserType": this.typeValue
    }
    this.loginService.onPostMethodBearerSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.loginService.menuList = data?.Result;
          let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
          if (userDetails) {
            userDetails.Result['menuList'] = data.Result;
            sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
            this.setMenuSection(data.Result);
          }
        }
      },

      (err: any) => { console.log(err); },
    );
  }
  getBranchList() {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let branchList: any[] = userDetails.Result.LoginBranchDetails;
    if (this.userType == 'Issuer') {
      this.branchValue = userDetails?.Result?.BranchCode;
    }
    else {
      this.branchValue = userDetails?.Result?.BrokerBranchCode;
    }
    this.branchList = branchList;
    if (this.userType == 'Issuer') {
      let branch = this.branchList.filter(ele => ele.BranchCode == this.branchValue);
      if (branch) this.finaliseBranchValue(branch[0], 'direct');
    }
    else {
      let branch = this.branchList.filter(ele => ele.BrokerBranchCode == this.branchValue);
      if (branch) this.finaliseBranchValue(branch[0], 'direct');
    }
  }
  onRoute() {
    this.router.navigate(['/product']);
    // this.router.navigate(['/Admin/productList']);
  }
  setMenuSection(menuList) {
    if (menuList.length != 0) {
      let menus = [], i = 0;
      for (let menu of menuList) {
        let entry: any;
        entry = {
          "label": menu.title,
          "faIcon": menu.icon
        }
        if (menu.children) {
          entry['items'] = [];
          let j = 0;
          for (let child of menu.children) {
            let subEntry = {
              "label": child.title,
              "faIcon": child.icon,
              "link": child.link
            }
            entry.items.push(subEntry);
            j += 1;
            console.log("Entry,", j)
            if (j == menu.children.length) {
              console.log("Entry in Child", menu)
              menus.push(entry);
              i += 1;
              if (i == menuList.length) {
                this.menu = menus;
                this.menuSection = true;
                this.parentSection = true;
                this.submenuList = [];
                console.log("Menusaaassss 3", this.menu)
                console.log("Menusaaassss 2", this.menu)
              }
            }
          }
        }
        else {
          entry['link'] = menu.link;
          menus.push(entry);
          i += 1;
          if (i == menuList.length) {
            this.menuSection = true;
            this.menu = menus;
            this.parentSection = true;
            this.submenuList = [];
            console.log("Menusaaassss", this.menu)
          }
        }
      }
      console.log("Final ", this.menu)
    }
    //this.menu = userDetails?.Result?.menuList;
    //}
    else {
      console.log("Final 2", this.menu)
      this.menuSection = false;
      this.menu = [];
      this.parentSection = true;
      this.submenuList = [];
    }
    //}
    //}

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
          if (data.Result) {
            sessionStorage.clear();
             this.authService.logout();
            this.router.navigate(['/login']);

          }
          //
        });

    }
  }
  finaliseBranchValue(branch, type) {
    if (this.userType == 'Issuer') {
      this.branchValue = branch.BranchCode;
      this.branchName = branch.BranchName;
      this.onBranchChange(type);
    }
    else {
      this.branchValue = branch.BrokerBranchCode;
      this.branchName = branch.BrokerBranchName;
      this.onBranchChange(type);
    }
  }
  finaliseTypeValue(types, changeType) {

    this.typeValue = types.CodeDesc;
    this.typeName = types.DisplayName;
    console.log("Setted Type Value", this.typeValue);
    $("#subUserTypes").hide();
    this.onTypeChange(changeType);
  }
  selectedItem(rowData) {
    this.openSideNav = false;
    console.log("rowData", rowData);
    sessionStorage.removeItem('vehicleDetailsList');
    sessionStorage.removeItem('customerReferenceNo')
    sessionStorage.removeItem('quoteReferenceNo');
    sessionStorage.removeItem('homeCommonDetails');
    sessionStorage.removeItem('HomeInsQuoteRefNo')
    sessionStorage.removeItem('TravelQuoteRefNo')
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('endorsePolicyNo');
    sessionStorage.removeItem('endorseTypeId');
    sessionStorage.removeItem('quoteNo');
    sessionStorage.removeItem('updatebar');
    sessionStorage.removeItem('endorseTypeId')
    // if(rowData.label=='New Quote'){

    // }
    // console.log("Product Id",this.router.url,rowData);
    // if(this.productId=='4'){
    //   if(rowData.label=='New Quote'){

    //     this.router.navigate(['Travel/existingQuotes/customerSelection'])
    //   }
    //   else if(rowData.label=='Existing Quote'){
    //     this.router.navigate(['Travel/existingQuotes']);
    //   }
    //   if(this.router.url==rowData.link) window.location.reload();
    // }
    // else if(this.productId=='7'){
    //   if(rowData.label=='New Quote'){
    //     this.router.navigate(['HomeIns/existingQuotes/customerSelection'])
    //   }
    //   else if(rowData.label=='Existing Quote'){
    //     this.router.navigate(['HomeIns/existingQuotes']);
    //   }
    //   else if(rowData.label=='Customer'){
    //     this.router.navigate(['HomeIns/customer']);
    //   }
    // }
    // else if(this.productId=='3'){
    //   if(rowData.label=='New Quote'){

    //     this.router.navigate(['HomeIns/existingQuotes/customerSelection'])
    //   }
    //   else if(rowData.label=='Existing Quote'){
    //     this.router.navigate(['HomeIns/existingQuotes']);
    //   }
    //   else if(rowData.label=='Customer'){
    //     this.router.navigate(['HomeIns/customer']);
    //   }
    //   if(this.router.url==rowData.link) window.location.reload();
    // }
  }
  onLogout() {
    sessionStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  toggle() {
    //Menu toggle
    this.openSideNav = !this.openSideNav;
    let toggle:any = document.querySelector('.navigation');
    let navigation:any = document.querySelector('.navigation');
    let main:any= document.querySelector('.main');
    let breadcrumb:any = document.querySelector('.bread_crumb');
    toggle.click();{
      navigation.classList.toggle('active');
      main.classList.toggle('active');
      breadcrumb.classList.toggle('active');
    }
    // if(!this.openSideNav){
    //   navigation.classList.remove('active');
    //   main.classList.remove('active');
    //   breadcrumb.classList.remove('active');
    // }
    // var $: any;
    // let toggle: HTMLElement = document.getElementsByClassName('toggle')[0] as HTMLElement;
    // let navigation = document.querySelector('.navigation');
    // let main = document.querySelector('.main');
    // let breadcrumb = document.querySelector('.bread_crumb');


    // toggle.click(); {
    //   navigation.classList.toggle('active');
    //   main.classList.toggle('active');
    //   breadcrumb.classList.toggle('.active');
    // }


    let list = document.querySelectorAll('.navigation li');
    function activeLink() {
      list.forEach((item) =>
        item.classList.remove('hovered'));
      this.classList.add('hovered');
    }
    list.forEach((item) =>
      item.addEventListener('mouseover', activeLink));
  }
}

