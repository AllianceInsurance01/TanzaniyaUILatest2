import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { ProductData } from '../models/product';
import * as Mydatas from '../../../app-config.json';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-customer-details',
  templateUrl: './new-customer-details.component.html',
  styleUrls: ['./new-customer-details.component.css']
})
export class NewCustomerDetailsComponent {

  title = 'Carproject';
  start:boolean=false;
  next:boolean=false;
  third: boolean=false;
  //favoriteSeason: string;
  seasons: string[] = ['HYGVCDF', 'HYGVCDF', 'DFGTRE', 'SHA'];
  minDate:any;
  effectiveValue:any;
  priv:any;
  fourth: boolean=false;
  LocationList:any[]=[];statusList:any[]=[];
  prefered:any="Mail";userDetails:any=null;
  maxDate: Date;maxDobDate: Date;loginId: any;
	agencyCode: any; branchCode: any;
	productId: any; insuranceId: any;
	userType: any; brokerbranchCode: any;
	regionList: any[]=[];
	notificationList:any[]=[];
	taxExcemptedList: any[]=[];
	typeValue: string;titleList:any[]=[];
  productItem: any;
  customerReferenceNo: any=null;
  public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  policyHolderList: any[]=[];
  countryList: any[]=[];
  genderList: any[]=[];
  occupationList: any;
  businessTypeList: any;
  stateList: any;
  policyHolderTypeList: any;
  dob: string;
  mobileCodeList: any[]=[];
	loginType: any;
  constructor(private product: SharedService, private datePipe: DatePipe, private route: ActivatedRoute,
		private router: Router) {
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
		this.loginType = this.userDetails.Result.LoginType;
		this.userType = this.userDetails.Result.UserType;
		this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
		this.typeValue = sessionStorage.getItem('typeValue')
    this.statusList = [
			{ CodeDesc: '-Select-', Code: '' },
			{ CodeDesc: 'Active', Code: 'Y' },
			{ CodeDesc: 'DeActive', Code: 'N' },
			{ CodeDesc: 'Pending', Code: 'P' }
		];
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
			this.productItem = new ProductData()
			this.customerReferenceNo = refNo;
		}
		else {
			this.customerReferenceNo = null;
			this.productItem = new ProductData()
			this.productItem.IdType=1;
			
		}
		this.getTitleList();
		this.getPolicyHolderList();
  }
  public ngOnInit(): void {
		
	}
	omit_special_char(event){   
		var k;  
		k = event.charCode;  //         k = event.keyCode;  (Both can be used)
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
	}
  setPolicyType(value){
    this.productItem.IdType = value;
	if(value==2){
		this.productItem.Gender = '';
	}
	this.getPolicyIdTypeList('change');
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
					this.getPolicyIdTypeList('change');
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
							let defaultRow = []
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
							this.getGenderList();
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
					this.getOccupationList();
				}
			},
			(err) => { },
		);
	}
	getOccupationList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/occupation`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.occupationList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
							this.occupationList = defaultRow.concat(this.occupationList)
							//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[0].props.options = defaultRow.concat(this.occupationList);
							this.getBusinessTypeList();
							//this.getBusinessTypeList();
				}
			},
			(err) => { },
		);
	}
	getBusinessTypeList() {
		let ReqObj = {
			"InsuranceId": this.insuranceId,
			"BranchCode": this.branchCode,
		}
		let urlLink = `${this.CommonApiUrl}dropdown/businesstype`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.businessTypeList = data.Result;
					let defaulObj = [{ 'CodeDesc': '-Select-', 'Code': '' }]
					this.businessTypeList = defaulObj.concat(this.businessTypeList);
					//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[10].props.options = defaulObj.concat(this.businessTypeList);
					
					this.getMobileCodeList()
				}
			},
			(err) => { },
		);
	}
	getStateList(type) {
		let ReqObj = {
			"CountryId": this.productItem.Country,
			"RegionCode": this.productItem.state
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.stateList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
							//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[8].props.options = defaultRow.concat(this.stateList);
							this.stateList = defaultRow.concat(this.stateList)
							if(type=='change'){ this.productItem.CityName = '';}
							// this.getGenderList();
					//this.getCityList();
				}
			},
			(err) => { },
		);
	}
	onTitleChange(){
		let title = this.productItem.Title;
		if(title!='' && title!=null && title!=undefined){
				if(title=='2') this.productItem.IdType = '2';
				else this.productItem.IdType = '1';
				if(title=='1') this.productItem.Gender = 'M';
				else this.productItem.Gender = 'F';
				this.getPolicyIdTypeList(null);
		}
		else{
			this.productItem.IdType = '';
		}
	}
	getRegionList(type){
		let ReqObj = {
			"CountryId": this.productItem.Country
		}
		let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
		this.product.onPostMethodSync(urlLink, ReqObj).subscribe(
			(data: any) => {
				console.log(data);
				if (data.Result) {
					this.regionList = data.Result;
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
							this.regionList = defaultRow.concat(this.regionList);
							if(type=='change'){this.productItem.state = '';this.productItem.CityName=''};
							//this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[7].props.options = defaultRow.concat(this.regionList);

					//this.getCityList();
				}
			},
			(err) => { },
		);
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
					if (type == 'change'){this.dob = "";this.productItem.PolicyHolderTypeid='';this.productItem.IdNumber=null}
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
								this.productItem.Clientstatus = 'Y';
								this.productItem.isTaxExempted = 'N'; 
								this.productItem.PreferredNotification = 'Sms';
								this.productItem.Gender = '';
								this.productItem.PolicyHolderTypeid = '';
								this.productItem.IdType = 1;
								if(this.mobileCodeList.length!=0 && this.mobileCodeList.length>1){
									this.productItem.MobileCode = this.mobileCodeList[1].Code;
								}
								if(this.countryList.length!=0 && this.countryList.length>1){
									this.productItem.Country = this.countryList[1].Code;
										this.getRegionList('change');
								}
								this.productItem.state = '';
								this.productItem.CityName = '';
								this.productItem.Occupation = '';
								this.productItem.BusinessType='';
								this.productItem.Title='';
                				this.getPolicyIdTypeList('change');
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
					if(this.productItem.CityName==null) this.productItem.CityName = '';
					this.productItem.Clientstatus = customerDetails.Clientstatus;
					this.productItem.EmailId = customerDetails.Email1;
					if(customerDetails.Nationality!=null){
						this.productItem.Country = customerDetails.Nationality;
					}
					else if(this.countryList.length!=0 && this.countryList.length>1){
						this.productItem.Country = this.countryList[1].Code;
							
					}
					if(this.productItem.Country==null) this.productItem.Country='';
					this.productItem.PinCode = customerDetails.PinCode;
					this.productItem.Gender = customerDetails.Gender;
					this.productItem.IdNumber = customerDetails.IdNumber;
					if(customerDetails.PolicyHolderType!=null && customerDetails.PolicyHolderType!=''){
						this.productItem.IdType = Number(customerDetails.PolicyHolderType);
					}
					this.getPolicyIdTypeList(null);
					this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
					if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
					this.productItem.MobileNo = customerDetails.MobileNo1;
					this.productItem.MobileCode = customerDetails.MobileCode1;
					this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;

					this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					this.productItem.PreferredNotification = customerDetails.PreferredNotification;
					if(this.productItem.PreferredNotification==null) this.productItem.PreferredNotification='Sms';
					this.productItem.state = customerDetails.StateCode;
					if(this.productItem.state==null){
						this.productItem.state = '';
						
					}
					this.getStateList(null);
					this.getRegionList(null);
					if (customerDetails.DobOrRegDate != null && customerDetails.DobOrRegDate != undefined) {
						if(new Date(this.maxDobDate).setHours(0,0,0,0) >= (new Date(customerDetails.DobOrRegDate)).setHours(0,0,0,0) ){
							var dateParts = customerDetails.DobOrRegDate.split("/");
							this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
						}
					}
					this.productItem.Street = customerDetails.Street;
					this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
					this.productItem.Occupation = customerDetails.Occupation;
					this.productItem.Title = customerDetails.Title;
					this.productItem.vrngst = customerDetails.VrTinNo;
					if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
						if(this.productItem.Address1==null || this.productItem.Address1==''){
							this.productItem.Occupation = '';
							if(this.productItem.Title=='1') this.productItem.Gender = 'M';
							else this.productItem.Gender = 'F';
						}
					}
					console.log("Final Edit Data", this.productItem)
				}
			},
			(err) => { },
		);
	}
  onChange(event) {
		console.log("Event on Change", event);
	}
	public async onSubmit(data) {
		console.log("Total Data", data);
		
		let appointmentDate = "", dobOrRegDate = "", taxExemptedId = null,cityName=null, stateName=null,businessType = null;
		//  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
		// 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
		//  }
		if(data.CityName!=null && data.CityName!='') cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
		if(data.state!=null && data.state!='') stateName = this.regionList.find(ele=>ele.Code==data.state)?.CodeDesc;
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
			this.productItem.MobileCodeDesc = code.label

			//this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
		}
		if(data.vrngst=='' || data.vrngst== undefined || data.vrngst==null){data.vrngst=null};
		if(this.loginType=='B2CFlow') data.Clientstatus = 'Y';
		let type = null;
		
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
			"Type":type,
			"TaxExemptedId": taxExemptedId,
			"TelephoneNo1": data?.TelephoneNo,
			"PinCode": data?.PinCode,
			"TelephoneNo2": null,
			"TelephoneNo3": null,
			"Title": data.Title,
			"VrTinNo": data.vrngst,
			"SaveOrSubmit": 'Submit'
		}
		let quoteNo = sessionStorage.getItem('quoteNo'),refNo = null;
		if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
				// if(ReqObj.PinCode==null || ReqObj.PinCode=='' || ReqObj.PinCode==undefined) ReqObj['PinCode'] = '99999';
				// if(ReqObj.Email1==null || ReqObj.Email1=='' || ReqObj.Email1==undefined) ReqObj['Email1'] = 'info@alliance.co.tz';
				ReqObj['Type'] = 'b2c';
				if(quoteNo!=undefined) ReqObj['QuoteNo'] = quoteNo;
				else ReqObj['QuoteNo'] = null;
				ReqObj['RequestReferenceNo'] = sessionStorage.getItem('quoteReferenceNo')
		}
		let urlLink = `${this.CommonApiUrl}api/savecustomerdetails`;
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
					let quoteNo = sessionStorage.getItem('quoteNo');
					if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2' && quoteNo!=undefined && quoteNo!=null)){
						this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
					}
					else this.router.navigate(['/Home/customer/'])
				}
			},

			(err: any) => { console.log(err); },
		);
	}
	getBack(){
		let quoteNo = sessionStorage.getItem('quoteNo');
		if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2' && quoteNo!=undefined && quoteNo!=null)){
			this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details'])
		}
		else{
			sessionStorage.removeItem('customerReferenceNo');
			this.router.navigate(['/Home/customer/'])
		}
		
	}
}
