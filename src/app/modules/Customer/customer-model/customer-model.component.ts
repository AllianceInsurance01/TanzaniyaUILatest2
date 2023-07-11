import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { DatePipe } from '@angular/common';
import { ProductData } from '../models/product';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';
import { UpdateCustomerDetailsComponent } from '../../Quote/update-customer-details/update-customer-details.component';
@Component({
  selector: 'app-customer-model',
  templateUrl: './customer-model.component.html',
  styleUrls: ['./customer-model.component.css']
})
export class CustomerModelComponent {

  titleList:any[]=[];
  productItem:any;
  maxDobDate: Date;userDetails: any;
  maxDate: Date;loginId: any;otpValue:any=null;
  agencyCode: any;branchCode: any;countryList:any[]=[];
  productId: any;userType: any;taxExcemptedList:any[]=[];
  insuranceId: any;brokerbranchCode: any;policyHolderList:any[]=[];
  notificationList: any[]=[];typeValue: any;
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;policyHolderTypeList:any[]=[];
  dob: string;customerReferenceNo:any=null;mobileCodeList:any[]=[];
  genderList: any[]=[];
  otpSection: boolean=false;
	checkEmailYN: any=null;
	emailError: boolean=false;
	otpGenerated: null;
	OtpBtnTime: any=null;
	otpId: any;
	OtpBtnEnable: boolean=false;
	showEmailSection: boolean=false;
	quoteNo: any;
	localPremiumCost: any=null;
	Riskdetails: any;
  constructor(
    private product: SharedService,private authService: AuthService, private datePipe: DatePipe,private router:Router){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
		this.maxDate = new Date();
		var d= new Date();
		var year = d.getFullYear();
		var month = d.getMonth();
		var day = d.getDate();
     	this.maxDobDate = new Date(year - 18,month, day );
		this.loginId = this.userDetails.Result.LoginId;
		this.agencyCode = this.userDetails.Result.OaCode;
		this.branchCode = this.userDetails.Result.BranchCode;
		this.productId = this.userDetails.Result.ProductId;
		this.insuranceId = this.userDetails.Result.InsuranceId;
		this.userType = this.userDetails.Result.UserType;
		this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue')
		this.notificationList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'SMS', Code: 'Sms' },
			{ CodeDesc: 'Mail', Code: 'Mail' },
			{ CodeDesc: 'Whatsapp', Code: 'Whatsapp' }
		];
		this.taxExcemptedList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'Yes', Code: 'Y' },
			{ CodeDesc: 'No', Code: 'N' }
		];
    let refNo = sessionStorage.getItem('customerReferenceNo');
		if (refNo) {
			this.productItem = new ProductData();
			this.customerReferenceNo = refNo;
			this.productItem.IdType = '1'
		}
		else {
			this.customerReferenceNo = null;
      		this.productItem = new ProductData()
      		this.productItem.IdType = '1'
			this.showEmailSection = true;
		}
		this.getTitleList();
		if(this.loginId=='guest') this.getTitleList();
		else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
  }
  omit_special_char(event){   
		var k;  
		k = event.charCode;  //         k = event.keyCode;  (Both can be used)
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
		}
	getTitleList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode
		}
		let urlLink = `${this.CommonApiUrl}dropdown/title`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				if (data.Result) {
					let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
					this.titleList = obj.concat(data.Result);
          			this.getPolicyIdTypeList(null);
					// for (let i = 0; i < this.titleList.length; i++) {
					// 	this.titleList[i].label = this.titleList[i]['CodeDesc'];
					// 	this.titleList[i].value = this.titleList[i]['Code'];
					// 	if (i == this.titleList.length - 1) {
					// 		this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.titleList;
					// 		this.getPolicyHolderList();
					// 	}
					// }
				}
			},
			(err) => { },
		);
	}
	getPolicyHolderList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode
		}

		let urlLink = `${this.CommonApiUrl}dropdown/policyholdertype`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.policyHolderList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
							this.policyHolderList = defaultRow.concat(this.policyHolderList);
							//this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[3].props.options = defaultRow.concat(this.policyHolderList);
							this.getCountryList();

					//this.getPolicyIdTypeList();
				}
			},
			(err) => { },
		);
	}
	getCountryList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.countryList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
							this.countryList = defaultRow.concat(this.countryList);
							//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[6].props.options = defaultRow.concat(this.countryList);
							
					//this.getGenderList();
				}
			},
			(err) => { },
		);
	}
  getGenderList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
		}
		let urlLink = `${this.CommonApiUrl}dropdown/policyholdergender`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.genderList = data.Result;
					let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
					this.genderList = defaultRow.concat(this.genderList)
					//this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[2].props.options = defaultRow.concat(this.genderList);
					this.getMobileCodeList()
				}
			},
			(err) => { },
		);
	}
	getMobileCodeList() {
		let ReqObj = { "InsuranceId": this.insuranceId }
		let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {

					let obj = [{ "Code": '', "CodeDesc": "-Select-" }]
					this.mobileCodeList = obj.concat(data.Result);
					//this. = data.Result;
							//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[1].props.options = this.mobileCodeList;
							if (this.customerReferenceNo) {
								this.setValues();
							}
							else {
								this.productItem = new ProductData();
								this.productItem.Clientstatus = 'P';
								this.productItem.Gender = '';
								this.productItem.PolicyHolderTypeid = '';
								this.productItem.IdType = '';
								this.productItem.PreferredNotification = '';
								this.productItem.MobileCode = '';
								this.productItem.Country = '';
								this.productItem.state = '';
								this.productItem.CityName = '';
								this.productItem.Occupation = '';
								this.productItem.BusinessType='';
								this.productItem.Title='';
							}
							// this.getGenderList();
					/*let brokerId = sessionStorage.getItem('editBroker');
					if(brokerId){
					  this.getEditBrokerDetails(brokerId);
					  this.editSection = true;
					}
					else{
					  this.getInsuranceList('change',this.insuranceId);
					  this.getBankList();
					  this.editSection = false;
					}*/

				}
			},
			(err) => { },
		);
	}
	setValues() {
		let ReqObj = {
			"CustomerReferenceNo": this.customerReferenceNo
		}
		let urlLink = `${this.CommonApiUrl}api/getcustomerdetails`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					let customerDetails = data.Result;
					this.productItem = new ProductData();
					this.productItem.ClientName = customerDetails.ClientName;
					// if(customerDetails.AppointmentDate!=null && customerDetails.AppointmentDate!=undefined){
					// 	var dateParts = customerDetails.AppointmentDate.split("/");
					// 	 this.productItem.AppointmentDate = dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];
					// }
					this.productItem.Address1 = customerDetails.Address1;
					this.productItem.Address2 = customerDetails.Address2;
					this.productItem.BusinessType = customerDetails.BusinessType;
					this.productItem.CityName = customerDetails.CityCode;
					this.productItem.Clientstatus = customerDetails.Clientstatus;
					this.productItem.EmailId = customerDetails.Email1;
					this.checkEmailYN='Y';
					this.showEmailSection = true;
					this.productItem.Country = customerDetails.Nationality;
					this.productItem.PinCode = customerDetails.PinCode;
					this.productItem.Gender = customerDetails.Gender;
					this.productItem.IdNumber = customerDetails.IdNumber;
					this.productItem.IdType = customerDetails.PolicyHolderType;
					//this.getPolicyIdTypeList(null);
					this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
					if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
					this.productItem.MobileNo = customerDetails.MobileNo1;
					this.productItem.MobileCode = customerDetails.MobileCode1;
					this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;

					this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					this.productItem.PreferredNotification = customerDetails.PreferredNotification;
					this.productItem.state = customerDetails.StateCode;
					if (customerDetails.DobOrRegDate != null && customerDetails.DobOrRegDate != undefined) {
						var dateParts = customerDetails.DobOrRegDate.split("/");
						this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
					}
					this.productItem.Street = customerDetails.Street;
					this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
					this.productItem.Occupation = customerDetails.Occupation;
					this.productItem.Title = customerDetails.Title;
					this.productItem.vrngst = customerDetails.VrTinNo;
				}
			},
			(err) => { },
		);
	}
  onTitleChange(){
		let title = this.productItem.Title;
		if(title!='' && title!=null && title!=undefined){
				// if(title=='2') this.productItem.IdType = '2';
				// else this.productItem.IdType = '1';
				
		}
		else{
			
		}
	}
  getPolicyIdTypeList(type) {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
			"PolicyTypeId": this.productItem.IdType
		}
		let urlLink = `${this.CommonApiUrl}dropdown/policyholderidtype`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					//this.holderTypeValue = null;
					this.policyHolderTypeList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
							this.policyHolderTypeList = defaultRow.concat(this.policyHolderTypeList)
							//this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options = defaultRow.concat(this.policyHolderTypeList);
							if (type == 'change') this.dob = "";
              this.getGenderList();
				}
			},
			(err) => { },
		);
	}
  onClose(){
    this.otpSection = !this.otpSection
  }
  public async onSubmit(data) {
		this.emailError = false;
		if(this.checkEmailYN=='Y' && (data.EmailId==null || data.EmailId=='')){
			this.emailError = true;
		}
		else{
			console.log("Total Data", data);
			
			let appointmentDate = "", dobOrRegDate = "", taxExemptedId = null,cityName=null, stateName=null,businessType = null;
			//  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
			// 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
			//  }
			// if(data.CityName!=null && data.CityName!='') cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
			// if(data.state!=null && data.state!='') stateName = this.regionList.find(ele=>ele.Code==data.state)?.CodeDesc;
			if (data.dobOrRegDate != undefined && data.dobOrRegDate != null && data.dobOrRegDate != '') {
				dobOrRegDate = this.datePipe.transform(data.dobOrRegDate, "dd/MM/yyyy");
			}
			if (this.productItem.isTaxExempted == 'Y') taxExemptedId = this.productItem.TaxExemptedId;
			if (this.productItem.IdType == '2') businessType = this.productItem.BusinessType;
			console.log("Appointment Date", appointmentDate);
			console.log('mobile code', this.productItem.MobileCode)

			let codes = this.productItem.MobileCode


			if (this.productItem.MobileCode != undefined && this.productItem.MobileCode != null && this.productItem.MobileCode != '') {
				//let code = this.productItem
				let code = this.mobileCodeList.find(ele => ele.Code == codes)
				console.log('codes', code)
				this.productItem.MobileCodeDesc = code.CodeDesc

				//this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
			}
			if(data.vrngst=='' || data.vrngst== undefined || data.vrngst==null){data.vrngst=null};
			if(this.typeValue=='B2C' && this.loginId=='guest') data.Clientstatus = 'Y';
			let ReqObj = {
				"BrokerBranchCode": this.brokerbranchCode,
				"CustomerReferenceNo": this.customerReferenceNo,
				"InsuranceId": this.insuranceId,
				"BranchCode": this.branchCode,
				"ProductId": "5",
				"AppointmentDate": appointmentDate,
				"Address1": data?.Address1,
				"Address2": data?.Address2,
				"BusinessType": businessType,
				"CityCode": data?.CityName,
				"CityName": cityName,
				"ClientName": data?.ClientName,
				"Clientstatus": data?.Clientstatus,
				"CreatedBy": this.loginId,
				"DobOrRegDate": dobOrRegDate,
				"Email1": data?.EmailId,
				"Email2": null,
				"Email3": null,
				"Fax": null,
				"Gender": data?.Gender,
				"IdNumber": data?.IdNumber,
				"IdType": data.IdType,
				"IsTaxExempted": data.isTaxExempted,
				"Language": "1",
				"MobileNo1": data.MobileNo,
				"MobileNo2": null,
				"MobileNo3": null,
				"Nationality": data.Country,
				"Occupation": data?.Occupation,
				"Placeofbirth": "Chennai",
				"PolicyHolderType": data.IdType,
				"PolicyHolderTypeid": data?.PolicyHolderTypeid,
				"PreferredNotification": data?.PreferredNotification,
				"RegionCode": "01",
				"MobileCode1": data?.MobileCode,
				"WhatsappCode": data?.MobileCode,
				"MobileCodeDesc1": "1",
				"WhatsappDesc": "1",
				"WhatsappNo": data.MobileNo,
				"StateCode": data?.state,
				"StateName": stateName,
				"Status": data?.Clientstatus,
				"Street": data?.Street,
				"TaxExemptedId": taxExemptedId,
				"TelephoneNo1": data?.TelephoneNo,
				"PinCode": data?.PinCode,
				"TelephoneNo2": null,
				"TelephoneNo3": null,
				"Title": data.Title,
				"VrTinNo": data.vrngst,
				"SaveOrSubmit": 'Submit'
			}
			let urlLink = `${this.CommonApiUrl}api/customer`;
			this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
				(data: any) => {
					let res: any = data;
					console.log(data);
					if (data.ErrorMessage.length != 0) {
						if (res.ErrorMessage) {
							const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
								let ulList:any='';
								for (let index = 0; index < errorList.length; index++) {
				
								const element = errorList[index];
								ulList +=`<li class="list-group-login-field">
									<div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
									<div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
								</li>`
								}
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
					else {
						sessionStorage.setItem('customerReferenceNo',data?.Result?.SuccessId)
						this.customerReferenceNo = data?.Result?.SuccessId;
						this.otpSection = true;
						this.otpGenerated = null;
						this.OtpBtnTime = '';
						this.generateOtp();
					}
				},

				(err: any) => { console.log(err); },
			);
		}
	}
	generateOtp() {
		let searchValue = "";
		let mobileCode = ""; let mobileNumber = "";
		let token = sessionStorage.getItem('UserToken');
		let reqObj = {
			"CompanyId":this.insuranceId,
			"ProductId": this.productId,
			"LoginId": this.loginId,
			"TemplateName":null,
			"OtpUser": {
				"UserMailId": this.productItem.Email1,
				"UserMobileNo":this.productItem?.MobileNo,
				"UserMobileCode": this.productItem?.MobileCodeDesc,
				"UserWhatsappNo": this.productItem?.MobileNo,
				"UserWhatsappCode": this.productItem?.MobileCodeDesc,
				"CustomerName": this.productItem?.ClientName
			}
		}
		let url = `${this.CommonApiUrl}otp/generate`;
		try {
	
		  this.product.onPostMethodSync(url, reqObj).subscribe((data: any) => {
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
	regenerateOtp() {
		if (this.otpId != "" || this.otpId != undefined || this.otpId != null) {
		  let searchValue = "";
		  let mobileCode = ""; let mobileNumber = "";
		 
		  let token = sessionStorage.getItem('UserToken');
		  let reqObj = {
			"Code": mobileCode,
			"Emailid": "",
			"InsuranceId": this.insuranceId,
			"Mobileno": mobileNumber,
			"Referenceno": searchValue,
			"Otpid": this.otpId,
			"Whatsappno": ""
		  }
		  let url = `${this.CommonApiUrl}post/notification/getotp`;
		  try {
			// this.product.onPostMethodSync(url, reqObj).subscribe((data: any) => {
			//   if (data?.Errors) {
			// 	let element = '';
			// 	for (let i = 0; i < data.Errors.length; i++) {
			// 	  element += '<div class="my-1"><i class="far fa-dot-circle text-danger p-1"></i>' + data.Errors[i].Message + "</div>";
			// 	}
	
			// 	Swal.fire(
			// 	  'Please Fill Valid Value',
			// 	  `${element}`,
			// 	  'error',
			// 	)
			//   }
			//   else {
	
			// 	console.log("Otp Generate Success", data);
			// 	this.otpId = data.OTPValidationStatus;
			// 	this.otpGenerated = data.OTP;
				this.OtpBtnEnable = true;
				this.setTimeInterval();
			//   }
			// }, (err) => {
			// //   this.handleError(err);
			// })
		  } catch (error) {
	
		  }
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
			"ProductId": this.productId,
			"AgencyCode": this.agencyCode,
			"OtpToken": this.otpId,
			"UserOTP": this.otpValue,
			"CreateUser": true,
			"CustomerId": this.customerReferenceNo,
			"ReferenceNo": sessionStorage.getItem('quoteReferenceNo') 
		  }
		  let url = `${this.CommonApiUrl}otp/validate`;
		  try {
			this.product.onPostMethodSync(url, reqObj).subscribe((data: any) => {
			  console.log("Otp Generate", data);
			  if (data) {
				if (data.Errors) {
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
				  Swal.fire(
					'Success',
					`Otp Validated Successfully`,
					'success',
				  )
				}
			  }
			}, (err) => {
			})
		  } catch (error) {
		  }
		}
	  }
	onSelectEmail(event){
		if(event) this.checkEmailYN = 'Y';
		else this.checkEmailYN = 'N';
		this.productItem.EmailId = null;
	}
	onCheckEmailNotification(){
		return (this.productItem.EmailId!='' && this.productItem.EmailId!=null && this.productItem.EmailId!=undefined)
	}
	onGuestLogin(){
		
	const urlLink = `${this.CommonApiUrl}authentication/login`;
	let loginId=this.productItem.MobileCodeDesc+this.productItem.MobileNo
	const reqData = {
	"LoginId": loginId,
	"Password": 'Admin@01',
	"ReLoginKey": 'Y'
	};

    this.product.onPostMethodSync(urlLink, reqData).subscribe(
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
            let userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
			userDetails.Result['ProductId'] = this.productId;
			userDetails.Result['ProductName'] = this.userDetails.Result.ProductName;
			userDetails.Result['BrokerBranchCode'] = this.brokerbranchCode;
			userDetails.Result['BranchCode'] = this.branchCode;
			userDetails.Result['CurrencyId'] = this.userDetails.Result.CurrencyId;
			userDetails.Result['InsuranceId'] = this.insuranceId;
			sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
			this.buyPolicyDetails()
          }
        },
        (err: any) => {
          alert("Error")
          // console.log(err);
        },
      );
	}
	buyPolicyDetails(){
		let req = JSON.parse(sessionStorage.getItem('buyPolicyDetails'));
		if(req){
			let urlLink = `${this.CommonApiUrl}quote/buypolicy`;
			this.product.onPostMethodSync(urlLink, req).subscribe(
				(data: any) => {
					if(data.Result){
					if(data?.Result.QuoteNo){
						this.quoteNo = data.Result?.QuoteNo;
						sessionStorage.setItem('quoteNo',data.Result?.QuoteNo);
						sessionStorage.setItem('quoteReferenceNo',data.Result?.RequestReferenceNo);
						this.viewQuoteDetails();
						let clausesList: any[] = [],
						exclusionList: any[] = [],
						warrantiesList: any[] = [];
					//console.log("Cccccccc", this.CoversList);
					//console.log("VVVVVVVV", this.vehicleDetailsList);
					let vechileId: any;
					let sectionId: any;
					let i = 0;
					}
				}
			},
			(err) => {
			  this.product.fnToastMoveHover("Quote Moved to Referral Pending");
			 },
		  );
		}
	}
	viewQuoteDetails(){
		let ReqObj = {
			"QuoteNo":this.quoteNo
		  }
		  let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
		  this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				if(data?.Result){
				  this.Riskdetails = data?.Result?.RiskDetails;
				  let quoteDetails = data?.Result?.QuoteDetails;
				  this.localPremiumCost = quoteDetails?.OverallPremiumLc;
				  this.insertPayementDetails();
				}
			},
			(err) => {
			  this.product.fnToastMoveHover("Quote Moved to Referral Pending");
			 },
		  );
	}
	insertPayementDetails(){
		let ReqObj = {
			"CreatedBy": this.loginId,
			"EmiYn": 'N',
			"InstallmentMonth": null,
			"InstallmentPeriod": null,
			"InsuranceId": this.loginId,
			"Premium": this.localPremiumCost,
			"QuoteNo": this.quoteNo,
			"Remarks": "None",
			"SubUserType": sessionStorage.getItem('typeValue'),
			"UserType": this.userType
		  }
		  let urlLink = `${this.CommonApiUrl}payment/makepayment`;
		  this.product.onPostMethodSync(urlLink,ReqObj).subscribe(
			(data: any) => {
			  console.log(data);
			  if(data.Result){
				sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
				window.location.reload();
			  }
			},
			(err) => {
			this.product.fnToastMoveHover("Quote Moved to Referral Pending");
			},
		);
	}
	ongetBack(){
		this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
	}
} 
