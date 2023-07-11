import { Component, OnInit, ViewChild } from '@angular/core'
import { ProductData } from '../models/product'
import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup } from '@angular/forms'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { ToastrService } from 'ngx-toastr'
import { DatePipe } from '@angular/common'
import { SharedService } from 'src/app/shared/shared.service'
import * as Mydatas from '../../../app-config.json';
import { MatStepper } from '@angular/material/stepper'
import Swal from 'sweetalert2'


@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
	public id: string = ''
	public productItem: ProductData = null
	public productProps: string[] = []
	public AppConfig: any = (Mydatas as any).default;
	public ApiUrl1: any = this.AppConfig.ApiUrl1;
	public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
	public motorApiUrl: any = this.AppConfig.MotorApiUrl;
	public form = new FormGroup({})
	public model = {}
	public fields: FormlyFieldConfig[] = [];
	customerReferenceNo: any = null;
	policyHolderTypeList: any;
	mobileCodeList: any;
	dob: string
	policyHolderList: any
	titleList: any
	countryList: any
	genderList: any
	occupationList: any
	businessTypeList: any
	stateList: any
	userDetails: any; loginId: any;
	agencyCode: any; branchCode: any;
	productId: any; insuranceId: any;
	userType: any; brokerbranchCode: any;
	regionList: any[]=[];maxDate:Date;
	notificationList:any[]=[];maxDobDate:Date;
	taxExcemptedList: any[]=[];
	typeValue: string


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
		]

		this.fields = [
			{
				type: 'stepper',
				fieldGroup: [

					{
						props: { label: 'Client Details' },
						fieldGroup: [
							{
								fieldGroupClassName: 'row',
								fieldGroup: [

									{
										className: 'col-1',
										key: 'Title',
										type: 'select',
										
										props: {
											label: 'Title',
											required: true,
											options: [
												{ label: 'Mr', value: '1' },
												{ label: 'Ms', value: '2' },
												{ label: 'Dr', value: '3' },
												{ label: 'Mrs', value: '4' },
											],
										},
										hooks: {
											onInit: (field: FormlyFieldConfig) => {
												field.formControl.valueChanges.subscribe(() => {
													let title = this.productItem.Title;
													if(title!='' && title!=null && title!=undefined){
															if(title=='2') this.productItem.IdType = '2';
															else this.productItem.IdType = '1';
															this.getPolicyIdTypeList(null);
													}
													else{
														this.productItem.IdType = '';
													}
												});
											},
										},
									},
									{
										className: 'col-3',
										type: 'input',
										key: 'ClientName',
										props: {
											label: 'Customer Name',
											required: true,
										},
									},
									{
										className: 'col-4',
										type: 'select',
										key: 'Gender',
										props: {
											label: 'Gender',
											required: true,
											options: [

											],
										},

										expressions: {
											
										},
									},
									
									{
										className: 'col-4',
										type: 'select',
										key: 'IdType',
										props: {
											label: 'Customer Type',
											required: true,
											options: [
											],
										},

										expressions: {
											
										},
										hooks: {
											onInit: (field: FormlyFieldConfig) => {
												field.formControl.valueChanges.subscribe(() => {
													this.getPolicyIdTypeList(null);
												});
											},
										}
									},
								]
							},
							{
								fieldGroupClassName: 'row',
								fieldGroup: [
									{
										className: 'col-md-4 col-lg-4 col-xl-4',
										type: 'select',
										key: 'PolicyHolderTypeid',
										props: {
											label: 'Identity Type',
											required: true,
											options: [

											],
										},

										expressions: {
											'props.disabled': '!model.IdType',
										},
									},
									{
										className: 'col-4',
										type: 'input',
										key: 'IdNumber',
										props: {
											label: 'ID Number',
											required: true,
										},
									},
									{
										className: 'col-4',
										key: 'PreferredNotification',
										type: 'select',
										props: {
											label: 'Prefered Notification',
											required: true,
											options: [
												{ label: '-Select-', value: '' },
												{ label: 'SMS', value: 'Sms' },
												{ label: 'Mail', value: 'Mail' },
												{ label: 'Whatsapp', value: 'Whatsapp' }
											],
										},
									},
									{
										className: 'col-4',
										key: 'dobOrRegDate',
										type: 'input',
										hideExpression: '!(model.IdType == 2)',
										props: {
											label: 'Registration Date(Choose Back Date ) *',
											type: 'date',
											datepickerOptions: {
												max: new Date(),
											},
										}
									},
									/*{
									  key: 'Datepicker',
									  type: 'input',
									  defaultValue: new Date(2018, 11, 24),
									  templateOptions: {
										label: 'Datepicker',
										placeholder: 'Placeholder',
						
										required: true,
										datepickerOptions: {format: 'yyyy.MM.dd'},
						
						
									  },
						
									},*/


									/*{
									  key: 'startDate',
									  type: 'datepicker',
									  templateOptions: {
										label: 'Period Start',
										required: true,
										datepickerOptions: {
										  min: '2019-09-10'
										},
									  },
									  expressionProperties:
										  { 'templateOptions.datepickerOptions.max': 'model.maxDate', },
									},*/
									
									{
										className: 'col-4',
										key: 'dobOrRegDate',
										type: 'input',
										hideExpression: '!(model.IdType == 1)',
										props: {
											label: 'Date of Birth(Choose Back Date ) *',
											type: 'date',
											datepickerOptions: {
												minDate: "2022-09-25",
												//max: new Date(2018, 11, 24),

											},
											expressionProperties:
												{ 'templateOptions.datepickerOptions.max': 'model.maxDate', },

										}
									},
									// {
									//   className: 'col-6',
									//   key: 'AppointmentDate',
									//   type: 'input',
									//   props: {
									// 	label: 'Appointment Date (Choose Future Date)',
									// 	type: 'date',
									//   }
									// },
									{
										className: 'col-2',
										key: 'isTaxExempted',
										type: 'select',
										props: {
											label: 'Tax Excempted',
											required: true,
											options: [
												{ label: '-Select-', value: '' },
												{ label: 'Yes', value: 'Y' },
												{ label: 'No', value: 'N' }
											],
										},
									},
									{
										className: 'col-4',
										key: 'TaxExemptedId',
										type: 'input',
										props: {
											label: 'Tax Excempted Code *',
											options: [

											],
										},
										expressions: {
											"hide": "model.isTaxExempted!='Y'",
										},
									},
									
									{
										className: 'col-2',
										key: 'Clientstatus',
										type: 'select',
										defaultValue: 'P',
										props: {
											label: 'Status',
											required: true,
											options: [
												{ label: '-Select-', value: '' },
												{ label: 'Active', value: 'Y' },
												{ label: 'DeActive', value: 'N' },
												{ label: 'Pending', value: 'P' }
											],
										},
									},
								]
							},
						],

					},
					{
						props: { label: 'Client Type' },
						fieldGroup: [
							{
								fieldGroupClassName: 'row',
								fieldGroup: [
									{
										className: 'col-4',
										type: 'select',
										key: 'Occupation',
										props: {
											label: 'Occupation',
											required: true,
											options: [

											],
										},
										expressions: {
											
										},
									},
									{
										className: 'col-1',
										type: 'select',
										key: 'MobileCode',
										props: {
											label: 'Code',
											required: true,
											options: [
											],
										},
									},
									{
										className: 'col-3',
										type: 'input',
										key: 'MobileNo',
										props: {
											label: 'Mobile No',
											required: true,
										},
									},
									{
										className: 'col-4',
										type: 'input',
										key: 'EmailId',
										props: {
											label: 'EmailId',
											required: true,
										},
									},
									{
										className: 'col-4',
										type: 'input',
										key: 'Address1',
										props: {
											label: 'Address1',
											required: true,
										},
									},
									{
										className: 'col-4',
										type: 'input',
										key: 'Address2',
										props: {
											label: 'Address2',
										},
									},
									{
										className: 'col-4',
										type: 'select',
										key: 'Country',
										props: {
											label: 'Country',
											required: true,
											options: [

											],
										},
										hooks: {
											onInit: (field: FormlyFieldConfig) => {
												field.formControl.valueChanges.subscribe(() => {
													this.getRegionList(null);
												});
											},
										},
										expressions: {
											'props.disabled': '!model.IdType',
										},
									},
									{
										className: 'col-4',
										type: 'select',
										key: 'state',
										props: {
											label: 'Region',
											required: true,
											options: [

											],
										},
										hooks: {
											onInit: (field: FormlyFieldConfig) => {
												field.formControl.valueChanges.subscribe(() => {
													this.getStateList(null);
												});
											},
										},
										expressions: {
											
										},
									},
									{
										className: 'col-4',
										type: 'select',
										key: 'CityName',
										props: {
											label: 'District',
											required: true,
										},
									},
									{
										className: 'col-4',
										type: 'input',
										key: 'vrngst',
										props: {
											label: 'VRN/GST No',
											required: true,
										},
										expressions: {
											'hide': "model.IdType=='1'",
										},
									},
									{
										className: 'col-4',
										type: 'select',
										key: 'BusinessType',
										props: {
											label: 'Business Type',
											required: true,
											options: [

											],
										},
										expressions: {
											'hide': "model.IdType=='1'",
										},
									}
								]
							}
						],
					}
				],
			},
		];
		let refNo = sessionStorage.getItem('customerReferenceNo');
		if (refNo) {
			this.productItem = new ProductData()
			this.customerReferenceNo = refNo;
		}
		else {
			this.customerReferenceNo = null;
			this.productItem = new ProductData()
		}
		this.getTitleList();
	}

	public ngOnInit(): void {
		console.log("Final Fields JSON", JSON.stringify(this.fields))
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
					for (let i = 0; i < this.titleList.length; i++) {
						this.titleList[i].label = this.titleList[i]['CodeDesc'];
						this.titleList[i].value = this.titleList[i]['Code'];
						if (i == this.titleList.length - 1) {
							this.fields[0].fieldGroup[0].fieldGroup[0].fieldGroup[0].props.options = this.titleList;
							this.getPolicyHolderList();
						}
					}
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
							console.log("County Fields", this.fields)
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
							console.log("Mobile code Fields", this.fields)
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
	moveNext(stepper: MatStepper){
		stepper.next();
	}
	movePrevious(stepper: MatStepper){
		stepper.previous();
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
					console.log("County Fields", this.fields)
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
					console.log("Final Dropdown List", this.fields[0].fieldGroup[1].fieldGroup[0].fieldGroup[4].props.options)
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
							console.log("State Fields", this.fields)
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
							console.log("State Fields", this.fields)
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
							console.log("Fields", this.fields[0].fieldGroup[0])
							let defaultRow = [{ 'CodeDesc': '- Select - ', 'Code': '' }]
							this.policyHolderTypeList = defaultRow.concat(this.policyHolderTypeList)
							//this.fields[0].fieldGroup[0].fieldGroup[1].fieldGroup[0].props.options = defaultRow.concat(this.policyHolderTypeList);
							if (type == 'change') this.dob = "";

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
					this.productItem.Country = customerDetails.Nationality;
					this.productItem.PinCode = customerDetails.PinCode;
					this.productItem.Gender = customerDetails.Gender;
					this.productItem.IdNumber = customerDetails.IdNumber;
					this.productItem.IdType = customerDetails.PolicyHolderType;
					this.getPolicyIdTypeList(null);
					this.getRegionList(null);
					this.productItem.isTaxExempted = customerDetails.IsTaxExempted;
					if (this.productItem.isTaxExempted == 'Y') this.productItem.TaxExemptedId = customerDetails.TaxExemptedId;
					this.productItem.MobileNo = customerDetails.MobileNo1;
					this.productItem.MobileCode = customerDetails.MobileCode1;
					this.productItem.MobileCodeDesc = customerDetails.MobileCodeDesc1;

					this.productItem.PolicyHolderTypeid = customerDetails.PolicyHolderTypeid;
					this.productItem.PreferredNotification = customerDetails.PreferredNotification;
					this.productItem.state = customerDetails.StateCode;
					this.getStateList(null);
					if (customerDetails.DobOrRegDate != null && customerDetails.DobOrRegDate != undefined) {
						var dateParts = customerDetails.DobOrRegDate.split("/");
						this.productItem.dobOrRegDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
					}
					this.productItem.Street = customerDetails.Street;
					this.productItem.TelephoneNo = customerDetails.TelephoneNo1;
					this.productItem.Occupation = customerDetails.Occupation;
					this.productItem.Title = customerDetails.Title;
					this.productItem.vrngst = customerDetails.VrTinNo;
					console.log("Final Edit Data", this.productItem, this.fields)
				}
			},
			(err) => { },
		);
	}
	private getProduct() {
		// if (this.id !== 'new') {
		// 	this.product.getProductById(this.id).then((product) => {
		// 		this.productItem = product
		// 	})
		// } else {
		// 	this.productItem = new ProductData()
		// }
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
		console.log('MOVKK', this.mobileCodeList.label)
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
					sessionStorage.removeItem('customerReferenceNo');
					if(sessionStorage.getItem('typeValue')=='B2C'){
						sessionStorage.setItem('customerReferenceNo',data?.Result?.SuccessId)
						this.router.navigate(['./Home/existingQuotes/customerSelection/customerDetails/customer-details']);
					}
					else this.router.navigate(['/Home/customer/'])
				}
			},

			(err: any) => { console.log(err); },
		);
	}
	getBack(){
		sessionStorage.removeItem('customerReferenceNo');
		this.router.navigate(['/Home/customer/'])
	}
}
