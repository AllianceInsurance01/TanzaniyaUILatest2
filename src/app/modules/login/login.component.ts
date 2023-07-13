
import { SharedService } from './../../shared/Services/shared.service';
import { Component, OnInit, OnChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as Mydatas from '../../app-config.json';
import { LoginService } from './login.service';
import { AuthService } from '../../Auth/auth.service';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/shared/Services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  @HostListener('window:scroll', ['$event'])
  public menuActive: any = 'login';
  branchselection:boolean=false;
  isReadMore: boolean = true;
  isReadMoretravel: boolean = true;
  isReadMorecorporate: boolean = true;
  isReadMoremarine: boolean = true;
  brokerLogin = true;
  value: string = "Change Password"
  value_cancel: string = "Cancel"
  issuerLogin = false;
  brokerName = null;
  brokerPassword = null;
  loginfirst:any=false;
  issuerName = null;
  pass:any;
  issuerPassword = null; branchList: any[] = [];
  invalidBroker = false;
  invalidIssuer = false; branchValue: any;
  issuerLogins = false; loginSection: boolean = false;
  brokerLogins = false; public submitted = false; public Proceed = false;
  public issuerBranch; public issuerRegion;
  public branches;
  public errorsList = new Array(); public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public loginForm!: FormGroup; changeForm: FormGroup; ForgetForm : FormGroup
  regionList: any; userType: any;
  forget: boolean=false;
  temps:boolean=false;
  pa:any;
  changePasswordSection: boolean;
  passExpiredError: boolean;
  constructor(private _formBuilder: FormBuilder, private service: HttpService,
    private loginService: LoginService, private SharedService: SharedService, private authService: AuthService,
    private router: Router,) {
    this.onLoginTap();
    sessionStorage.clear();
    this.service.ocQuoteMenu = false;
    this.service.navMenu = false;
    this.service.openCoverMenu = false;
    //this.getRegionList();
  }
  change(value) {
    this.value = value;
    if (value === "Change Password") {
      this.resetForm();
      this.loginSection = true;
      this.loginfirst = true;
      this.changePasswordSection = true;
      this.forget = false;
    }
  }
  cancel(value_cancel) {
    this.value_cancel = value_cancel;
    if (value_cancel === 'Cancel') {
      this.resetForm();
      this.loginSection = false;
      this.loginfirst = false;
      this.changePasswordSection = false;
      this.forget = false;
    }
  }

  onLoginTap() {
    this.router.navigate([this.menuActive]);
  }
  ngOnInit(): void {
    this.onCreateFormControl();
    //AOS.init();

  }

  changepass(type){

    console.log(type)
    this.pa=type;
    if(type=='ChangePassword'){
      this.pass=true;
    }
    else{
    this.pass=false;
    }

  }
  onCreateFormControl() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      region: ['', Validators.required],
      branch: ['', Validators.required],
    });
    this.changeForm = this._formBuilder.group({
      LoginId: ['', Validators.required],
      NewPassword: ['', Validators.required],
      OldPassword: ['', Validators.required]
    });
    this.ForgetForm = this._formBuilder.group({
      LoginId: ['', Validators.required],
     Email: ['', Validators.required],

    });
  }

  Forget(type,change){

    console.log(change)
    this.pa=change
      if(type=='change') {this.changePasswordSection = true;this.forget=false;this.loginfirst=true}
      else  {this.changePasswordSection = false;this.forget=true;this.loginfirst=false}

      if(change=='ChangePassword'){
        this.pass=true;
      }
      else if(change=='ForgotPassword'){
        this.pass=false;
      }
  }

  reset() {
    sessionStorage.clear();
    this.authService.logout;
  }
  resetForm() {
    this.changeForm.controls['LoginId'].setValue('');
    this.changeForm.controls['NewPassword'].setValue('');
    this.changeForm.controls['OldPassword'].setValue('');
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.ForgetForm.controls['LoginId'].setValue('');
    //this.ForgetForm.controls['Email'].setValue('');
  }

  forgetSubmit(){
    const urlLink = `${this.CommonApiUrl}basicauth/forgotpassword`;
    const formData = this.ForgetForm.value;

    const reqData = {
   LoginId: formData.LoginId
    };

    this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res: any = data;
        console.log(data);
        if (data.Result) {
          Swal.fire({
            title: '<strong>Forget Password </strong>',
            icon: 'info',
            html:
              `Temporary Password Notification Sent to Email`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
          this.ForgetForm.reset();
          //this.loginForm.reset();
          //this.loginSection = false;
         this.changePasswordSection = true;
         this.forget = false;
         this.loginfirst = true;
          this.temps=true;
        }


      },
      (err: any) => {
        alert("Error")
        // console.log(err);
      },
    );

  }

  submit() {

    let p=this.pa
    const formData = this.changeForm.value;
    if(formData.NewPassword!=formData.OldPassword){
      const urlLink = `${this.CommonApiUrl}basicauth/changepassword`;
      const reqData = {
        "LoginId": formData.LoginId,
        "NewPassword": formData.NewPassword,
        "OldPassword": formData.OldPassword,
        "Type":this.pa
      };
      this.SharedService.onPostMethodBasicSync(urlLink, reqData).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.Result) {
            Swal.fire({
              title: '<strong>Change Password </strong>',
              icon: 'info',
              html:
                `Password Updated Successfully`,
              //showCloseButton: true,
              //focusConfirm: false,
              showCancelButton: false,

              //confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancel',
            })
            this.changeForm.reset();
            this.loginForm.reset();
            this.loginSection = false;
            this.loginfirst = false;
            this.forget = false;
            this.changePasswordSection = false;
          }
          else  if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
            const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
            let ulList:any='';
             let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
             console.log("checked entry",entry);
                for (let index = 0; index < errorList.length; index++) {
  
                  const element = errorList[index];
                   ulList +=`<li class="list-group-login-field">
                     <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                     <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                   </li>`
                }
               if(entry.length==0){
                  Swal.fire({
                   title: '<strong>Form Validation</strong>',
                   icon: 'info',
                   html:
                     `<ul class="list-group errorlist">
                      ${ulList}
                   </ul>`,
                   showCloseButton: true,
                   focusConfirm: false,
                   confirmButtonText:
                     '<i class="fa fa-thumbs-down"></i> Errors!',
                   confirmButtonAriaLabel: 'Thumbs down, Errors!',
                 })
               }
          }
        });
    }
    else{
      console.log('pppppp',p)
      if(p){
        if( p =='ChangePassword' && formData.OldPassword=='' || formData.OldPassword==null || formData.OldPassword == undefined){
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Old Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Old Password</div>
             </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-down"></i> Errors!',
            confirmButtonAriaLabel: 'Thumbs down, Errors!',
          })
        }
        else if(p =='ForgotPassword' && formData.OldPassword=='' || formData.OldPassword==null || formData.OldPassword == undefined){
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Temporary Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Temporary Password</div>
             </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-down"></i> Errors!',
            confirmButtonAriaLabel: 'Thumbs down, Errors!',
          })
        }
        if( p =='ChangePassword' && formData.OldPassword == formData.NewPassword){
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html:
              `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Password Details</div>
                <div style="color: red;">Message<span class="mx-2">:</span>New Password cannot Be same as Old Password</div>
             </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText:
              '<i class="fa fa-thumbs-down"></i> Errors!',
            confirmButtonAriaLabel: 'Thumbs down, Errors!',
          })
        }
      }

      else if(formData.NewPassword=='' || formData.NewPassword==null || formData.NewPassword == undefined){
        Swal.fire({
          title: '<strong>Form Validation</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Field<span class="mx-2">:</span>New Password</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Please Enter New Password</div>
           </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Errors!',
          confirmButtonAriaLabel: 'Thumbs down, Errors!',
        })
      }
      else{
        Swal.fire({
          title: '<strong>Form Validation</strong>',
          icon: 'info',
          html:
            `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Field<span class="mx-2">:</span>Mismatch Password</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Old Password Cannot Be New Password</div>
           </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:
            '<i class="fa fa-thumbs-down"></i> Errors!',
          confirmButtonAriaLabel: 'Thumbs down, Errors!',
        })
      }

    }

  }
  get f() {
    return this.loginForm.controls;

  }


  onLogin(req:any,key) {

    this.submitted = true;
    const urlLink = `${this.CommonApiUrl}authentication/login`;
    const formData = this.loginForm.value;

    const reqData = {
      "LoginId": formData.username,
      "Password": formData.password,
      "ReLoginKey": key
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
          this.userType = data.Result.UserType;
          if ((data.Result.UserType == 'Issuer' || data.Result.UserType == 'Broker' || data.Result.UserType == 'User') && data.Result.SubUserType!='SuperAdmin') {
            let branchList: any[] = data?.Result?.LoginBranchDetails;
            if (branchList.length != 0 && branchList.length > 1) {
              console.log("Entered Branch", branchList)
              // this.router.navigate(['/branch']);
              this.loginSection=false;
              this.branchselection=true;
              this.branchList = branchList;
            }
            else {
              this.branchList = branchList;
              if (this.userType == 'Issuer') {
                this.branchValue = branchList[0].BranchCode;
                this.onBranchProceed();
              }
              else {
                this.branchValue = branchList[0].BrokerBranchCode;
                this.onBranchProceed();
              }

            }
          }
          else{
            this.router.navigate(['/Admin']);
          }
        }
        else  if (res?.ErrorMessage && res?.ErrorMessage.length > 0 || res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0) {
          const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
          let ulList:any='';
           let entry:any[] =  errorList.filter(ele=>ele.Field=='SessionError')
           console.log("checked entry",entry);
            if(res.ChangePasswordYn=='Y'){
              console.log('UUUUU',res.ChangePasswordYn);
              //this.Forget('change','ChangePassword');
              this.loginfirst=true;
              this.changePasswordSection = true;
              this.forget = false;
              //this.loginSection=false;
              this.pass = true;
              this.pa='ChangePassword';
              this.passExpiredError = true;
              setTimeout(() => 
              {
                this.passExpiredError = false;
            }, (2*1000));
            this.changeForm.controls['LoginId'].setValue(formData.username);
            }
            else{
              for (let index = 0; index < errorList.length; index++) {

                const element = errorList[index];
                 ulList +=`<li class="list-group-login-field">
                   <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                   <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
                 </li>`
              }
             if(entry.length==0){
                Swal.fire({
                 title: '<strong>Form Validation</strong>',
                 icon: 'info',
                 html:
                   `<ul class="list-group errorlist">
                    ${ulList}
                 </ul>`,
                 showCloseButton: true,
                 focusConfirm: false,
                 confirmButtonText:
                   '<i class="fa fa-thumbs-down"></i> Errors!',
                 confirmButtonAriaLabel: 'Thumbs down, Errors!',
               })
             }
             else {
               console.log("entered multiiiiiiiiiiiiiiiiiiii");
               Swal.fire({
                  title: '<strong>Session Error</strong>',
                  icon: 'info',
                  html:
                    `<ul class="list-group errorlist">
                     ${ulList}
                 </ul>`,
                  showCloseButton: true,
                  focusConfirm: false,
                  showCancelButton:true,
   
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Proceed Login!',
                 cancelButtonText: 'Cancel',
               })
               .then((result) => {
                 if (result.isConfirmed) {
                 // this.loginSection=false;
                 this.onLogin(reqData,'Y')
               }
   
               });
   
             }
            }
          
         }
      },
      (err: any) => {
        alert("Error")
        // console.log(err);
      },
    );
  }


  onCancel() {
    sessionStorage.clear();
    location.reload();
  }
  onCancelbranch(){
    this.router.navigate(['/login']);
  }
  onBranchProceed() {
    this.Proceed = true;
    if (this.branchValue != '' && this.branchValue != undefined) {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
      if (this.userType == 'Issuer') {
        let branchData: any = this.branchList.find(ele => ele.BranchCode == this.branchValue);
        userDetails.Result['BrokerBranchCode'] = null;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        this.router.navigate(['/product']);
      }
      else {

        let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
        console.log("Branch Value", this.branchValue, branchData)
        userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        this.router.navigate(['/product']);
      }

    }
  }




  getRegionList() {
    this.service.IssuerLoginRegionList().subscribe(
      data => {
        sessionStorage.clear();
        this.regionList = data;
        console.log('Region', data);
      },
      error => { console.log('Error: ', error.message); });
  }
  getBranchList() {
    const branchReq = {
      'RegionCode': this.issuerRegion,
    };
    this.service.IssuerLoginBranchList(branchReq).subscribe(
      data => {
        this.branches = data;
        console.log('BranchList', data);
      },
      error => { console.log('Error: ', error.message); });
  }
  brokersLogin() {
    this.router.navigate(['/Admin/dashboard']);
  }
  issuersLogin() {
    this.errorsList = [];
    console.log('Uname', this.issuerName);
    console.log('Password', this.issuerPassword);
    const uname = this.issuerName;
    const password = this.issuerPassword;
    this.invalidIssuer = false;
    const loginData = {
      UserId: uname,
      Password: password,
      LoginType: 'Admin',
      RegionCode: this.issuerRegion,
      BranchCode: this.issuerBranch,
    };
    this.service.getBrokerLogin(loginData).subscribe(
      data => {
        console.log('LoginResponse', data);
        if (data.Errors) {
          for (const err of data.Errors) {
            let count = 0;
            if (Array.isArray(this.errorsList)) {
              for (const list of this.errorsList) {
                if (list.message == err.message) {
                  count += 1;
                } else {
                  count = 0;
                }
              }
            }
            if (count == 0 && err.message) {
              this.errorsList.push(err.message);
            }
          }
          for (const err of data.Errors) {
            let count = 0;
            if (Array.isArray(this.errorsList)) {
              for (const list of this.errorsList) {
                if (list.message == err.Message) {
                  count += 1;
                } else {
                  count = 0;
                }
              }
            }
            if (count == 0 && err.Message) {
              this.errorsList.push(err.Message);
            }
          }
          this.invalidIssuer = true;
        } else {
          this.errorsList = [];
          const loginData = data.LoginResponse;
          if (loginData.Status != 'ChangePassword') {
            sessionStorage.setItem('loginReq', JSON.stringify(loginData));
            sessionStorage.setItem('userToken', loginData.Token);
            this.service.loginData = loginData;
            this.service.defaultValue = loginData;
            this.service.userToken = loginData.Token;
            this.invalidIssuer = false;
            const userType = loginData.UserType;
            if (userType == 'admin') {
              const menuSection = 'openCoverMenu'
              sessionStorage.setItem('menuSection', 'openCoverMenu');
              sessionStorage.setItem('productData', JSON.stringify(loginData));
              this.router.navigate(['auth/products']);
              console.log('Usetypeeeeee', userType);
            }
            if (userType != 'admin') {
              sessionStorage.setItem('productData', JSON.stringify(loginData));
              sessionStorage.setItem('menuSection', 'navMenu');
              this.router.navigate(['auth/products']);
            }
          } else {
            sessionStorage.setItem('passChangeLogin', uname as any);
            this.router.navigate(['/changePasswordAction']);
          }
        }
      },
      error => {
        console.log('Error: ', error.message);
      });
  }
  brokerType() {
    this.brokerLogin = true;
    this.issuerLogin = false;
    this.brokerName = null;
    this.brokerPassword = null;
    this.invalidBroker = false;
    this.invalidIssuer = false;
  }
  issuerType() {
    this.brokerLogin = false;
    this.issuerLogin = true;
    this.invalidBroker = false;
    this.invalidIssuer = false;
  }
  open(errorList: any[]) {
    // console.log("Error List",errorList)
    // const dialogRef = this.dialog.open(ErrorModalComponent,
    //   {
    //     data: errorList
    //   },
    // );
  }
  onPress() {
    this.loginSection = !this.loginSection;
    this.branchselection = false;
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
}
