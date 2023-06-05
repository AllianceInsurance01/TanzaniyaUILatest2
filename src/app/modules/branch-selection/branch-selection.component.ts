import { SharedService } from './../../shared/Services/shared.service';
import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AuthService } from '../../Auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as Mydatas from '../../app-config.json';
import { HttpService } from 'src/app/shared/Services/http.service';

@Component({
  selector: 'app-branch-selection',
  templateUrl: './branch-selection.component.html',
  styleUrls: ['./branch-selection.component.scss']
})
export class BranchSelectionComponent implements OnInit {

  title:any="Log out";
  branchValue:any;
  loginSection:boolean = false;
  userType:any;
  statusValue:any= "YES";branchList:any[]=[];
  public loginForm!: FormGroup;
  Proceed =false;
  submitted: boolean;userDetails:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;


  constructor(private _formBuilder: FormBuilder,private service: HttpService,
    private SharedService:SharedService,private loginService:LoginService,private authService: AuthService,public dialog: MatDialog,
    private router: Router) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.loginId = this.userDetails.Result.LoginId;
      this.userType = this.userDetails?.Result?.UserType;
      console.log("User Details Received",this.userDetails,this.userType);
    this.service.ocQuoteMenu = false;
    this.service.navMenu = false;
    this.service.openCoverMenu = false; {
      /*this.branchList=[{
        "Code":"1","CodeDesc":"Mapma"
      }]*/
    }
    }


  ngOnInit(): void {
    this.onCreateFormControl()
    this.branchList = this.userDetails?.Result?.LoginBranchDetails;
    console.log("Branch Details Received",this.userDetails,this.branchList);
    //this.onLogin();

  }
  onCreateFormControl() {
    this.loginForm = this._formBuilder.group({

      region: ['', Validators.required],
      branch: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLog(title)
  {
    if (title === 'Log out') {
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

  /*onLogin() {
    this.submitted = true;
    const urlLink = `${this.CommonApiUrl}authentication/login`;
    const formData = this.loginForm.value;

    const reqData = {
      "LoginId": formData.username,
      "Password": formData.password,
      "ReLoginKey": "Y"
    };

    this.loginService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res:any = data;
        console.log(data);
        if (data.Result) {
          const Token = data?.Result?.Token;
          this.authService.login(data);
          this.authService.UserToken(Token);
          sessionStorage.setItem('Userdetails', JSON.stringify(data));
          sessionStorage.setItem('UserToken', Token);
          sessionStorage.setItem('menuSection', 'navMenu');
          this.userType = data.Result.UserType;
          if(data.Result.UserType=='Issuer' || data.Result.UserType=='Broker'){
            let branchList:any[] = data?.Result?.LoginBranchDetails;
            if(branchList.length!=0 && branchList.length>1){
              console.log("Entered Branch",branchList)
            this.loginSection = true;
            this.branchList = branchList;
            }
            else{
              this.branchList = branchList;
              if(this.userType == 'Issuer'){
                this.branchValue = branchList[0].BranchCode;
                this.onBranchProceed();
              }
              else{
                this.branchValue = branchList[0].BrokerBranchCode;
                this.onBranchProceed();
              }

            }
            //this.router.navigate(['/product']);
          }
          //this.router.navigate(['/Admin']);
        }
        else{
          // if(res.ErrorMessage){
          //   for(let entry of res.ErrorMessage){
          //     let type: NbComponentStatus = 'danger';
          //     const config = {
          //       status: type,
          //       destroyByClick: true,
          //       duration: 2000,
          //       hasIcon: true,
          //       position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //       preventDuplicates: false,
          //     };
          //     this.toastrService.show(
          //       entry.Field,
          //       entry.Message,
          //       config);
          //   }
            // console.log("Error Iterate",data.ErrorMessage)
            // this.loginService.errorService(data.ErrorMessage);
          //}
        }
      },

      (err: any) => { console.log(err); },
    );
    //this.router.navigate(['/Admin']);
  }*/
  onBranchProceed(){
    this.Proceed = true;
    if(this.branchValue!='' && this.branchValue!=undefined){
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(this.userType =='Issuer'){
        let branchData:any = this.branchList.find(ele=>ele.BranchCode == this.branchValue);
        userDetails.Result['BrokerBranchCode'] = null;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['CustomerCode'] = branchData?.CustomerCode;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        userDetails.Result['BrokerBranchName'] = branchData?.BrokerBranchName;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        this.router.navigate(['/product']);
      }
      else{

        let branchData:any = this.branchList.find(ele=>ele.BrokerBranchCode == this.branchValue);
        console.log("Branch Value",this.branchValue,branchData)
        userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        this.router.navigate(['/product']);
      }

    }
  }
  onCancel(){
    //sessionStorage.clear();
    //ocation.reload();
    this.router.navigate(['/login']);
  }
}
