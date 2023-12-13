import { SharedService } from './../../shared/Services/shared.service';
import { Component, OnInit, OnChanges, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as Mydatas from '../../app-config.json';
import { AuthService } from '../../Auth/auth.service';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/shared/Services/http.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-b2c-login',
  templateUrl: './b2c-login.component.html',
  styleUrls: ['./b2c-login.component.scss']
})
export class B2cLoginComponent {

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
  mobileCodeList: { Code: string; CodeDesc: string; }[];
  insuranceId: any;
  OtpBtnTime: any=null;
  OtpBtnEnable: boolean;
  otpSection: boolean;
  otpGenerated: null;
  otpId: any;
  otpValue: any=null;
  agencyCode: any;
  mobileCodeDesc: any=null;
  ipAddress: any=null;
  constructor(private _formBuilder: FormBuilder, private service: HttpService,
    private loginService: LoginService, private SharedService: SharedService, private authService: AuthService,
    private router: Router,) {
   // this.onLoginTap();
    sessionStorage.clear();
    this.service.ocQuoteMenu = false;
    this.service.navMenu = false;
    this.service.openCoverMenu = false;
    
    //this.getRegionList();
  }
  getGuestLogin(){
    const urlLink = `${this.CommonApiUrl}authentication/byipaddress`;
    const reqData = {
      "UserType": "B2C",
      "IpAddress": this.ipAddress
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
                this.agencyCode = data.Result.OaCode
                userDetails.Result['BranchCode'] = branchData.BranchCode;
                userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
                userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
                this.insuranceId = branchData?.InsuranceId
                sessionStorage.setItem('typeValue','B2C');
                sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
                sessionStorage.removeItem('customerReferenceNo');
                //this.router.navigate(['/Home/customer/Client/client-details']);
                this.getMobileCodeList();
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
  getMobileCodeList() {
		let ReqObj = { "InsuranceId": this.insuranceId }
		let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
		this.SharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {

					let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
					this.mobileCodeList = obj.concat(data.Result);
					

				}
			},
			(err) => { },
		);
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
  cancelOtp(value_cancel) {
      this.loginfirst = false;
  }
  cancel(value_cancel) {
    this.value_cancel = value_cancel;
    if (value_cancel === 'Cancel') {
      this.resetForm();
      this.otpSection = false;
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
    this.loginService.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress = res?.ip;
      this.getGuestLogin()
    });
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
      mobileCode: ['-Select-', Validators.required],
      MobileNo: ['', Validators.required]
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
      this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
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


  onLogin() {

    this.submitted = true;
    let searchValue = "";
		let mobileCode = ""; let mobileNumber = "";
		let token = sessionStorage.getItem('UserToken');
    const formData = this.loginForm.value;
    // if(formData.mobileCode !=null){
    //   this.mobileCodeDesc = this.mobileCodeList.find(ele=>ele.Code==formData?.mobileCode).CodeDesc;
    // }
		let reqObj = {
			"CompanyId":this.insuranceId,
			"ProductId": '5',
			"LoginId": 'guest',
			"TemplateName":null,
			"OtpUser": {
				"UserMailId": null,
				"UserMobileNo":formData.MobileNo,
				"UserMobileCode": formData.mobileCode,
				"UserWhatsappNo": formData.MobileNo,
				"UserWhatsappCode": formData.mobileCode,
				"CustomerName": null
			}
		}
		let url = `${this.CommonApiUrl}otp/generate`;
		try {
	
		  this.SharedService.onPostMethodSync(url, reqObj).subscribe((data: any) => {
			console.log("Otp Generate Res", data);
			if (data.Errors) {
			  this.otpSection = false;
			  this.otpGenerated = null;
			  let element = '';
			  for (let i = 0; i < data.Errors.length; i++) {
				  element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data.Errors[i].Message + "</div>";
			  }
	
			  Swal.fire(
				'Please Fill Valid Value',
				`${element}`,
				'error',
			  )
			}
			else {
        
			   this.otpId = data.OtpToken;
			   this.otpGenerated = data.OTP;
         this.loginfirst = true;
			  this.otpSection = true;
			  this.OtpBtnEnable = true;
			  this.setTimeInterval();
			}
		  }, (err) => {
			console.log(err);
		  })
		 } catch (error) {
		}
  }
  setTimeInterval() {

    var count = 15,
      timer = setInterval(() => {
        var seconds = (count--) - 1;
        var percent_complete = (seconds / 60) * 100;
        percent_complete = Math.floor(percent_complete);

        this.OtpBtnTime = count;
        if (seconds == 0) {
          clearInterval(timer);
          this.OtpBtnEnable = false;
          this.OtpBtnTime = '';
        }
      }, 1000);
  	}
    onOtpValidate() {

      if (this.otpValue == "" || this.otpValue == undefined || this.otpValue == null) {
        let element = '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>Please Enter OTP</div>';
        Swal.fire(
        'Please Fill Valid Value',
        `${element}`,
        'error',
        )
      }
      else {
        this.otpValue = this.otpValue.replace(/\D/g, '');
        let reqObj = {
        "CompanyId": this.insuranceId,
        "ProductId": '5',
        "AgencyCode": this.agencyCode,
        "OtpToken": this.otpId,
        "UserOTP": this.otpValue,
        "CreateUser": false,
        "CustomerId": null,
        "ReferenceNo": sessionStorage.getItem('quoteReferenceNo') 
        }
        let url = `${this.CommonApiUrl}otp/validate`;
        try {
        this.SharedService.onPostMethodSync(url, reqObj).subscribe((data: any) => {
          console.log("Otp Generate", data);
          if (data) {
          if (data.Errors.length!=0) {
            let element = '';
            for (let i = 0; i < data.Errors.length; i++) {
            element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data.Errors[i].Message + "</div>";
            }
    
            Swal.fire(
            'Please Fill Valid Value',
            `${element}`,
            'error',
            )
          }
          else {
    
    
            this.otpId = "";
            this.otpValue = "";
            this.onGuestLogin()
           
          }
          }
        }, (err) => {
        })
        } catch (error) {
        }
      }
    }
    onGuestLogin(){
      const urlLink = `${this.CommonApiUrl}authentication/login`;
      const formData = this.loginForm.value;
      let loginId=formData.mobileCode+formData.MobileNo
      const reqData = {
      "LoginId": loginId,
      "Password": 'Admin@01',
      "ReLoginKey": 'Y'
      };
    
        this.SharedService.onPostMethodSync(urlLink, reqData).subscribe(
          (data: any) => {
            let res: any = data;
            console.log(data);
              if (data.Result) {
                // Swal.fire(
                //   'Success',
                //   `Otp Validated Successfully`,
                //   'success',
                //   )
                const Token = data?.Result?.Token;
              this.authService.login(data);
              this.authService.UserToken(Token);
              sessionStorage.setItem('Userdetails', JSON.stringify(data));
              sessionStorage.setItem('UserToken', Token);
              sessionStorage.setItem('menuSection', 'navMenu');
              this.userType = data.Result.UserType;
              if ((data.Result.UserType == 'Issuer' || data.Result.UserType == 'Broker' || data.Result.UserType == 'User') && data.Result.SubUserType!='SuperAdmin') {

                let currencyId=data?.Result?.CurrencyId;
                console.log('IIIIIIIIIIIIIIII',currencyId);
                sessionStorage.setItem('CurrencyidLogin',currencyId);

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
        userDetails.Result['LoginType'] = 'B2CFlow2';
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        this.router.navigate(['/customerProducts']);
      }
      else {

        let branchData: any = this.branchList.find(ele => ele.BrokerBranchCode == this.branchValue);
        console.log("Branch Value", this.branchValue, branchData)
        userDetails.Result['BrokerBranchCode'] = branchData.BrokerBranchCode;
        userDetails.Result['BranchCode'] = branchData.BranchCode;
        userDetails.Result['CurrencyId'] = branchData?.CurrencyId;
        userDetails.Result['InsuranceId'] = branchData?.InsuranceId;
        userDetails.Result['LoginType'] = 'B2CFlow2';
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
        this.router.navigate(['/customerProducts']);
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
