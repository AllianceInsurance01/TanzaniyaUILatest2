import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import { DatePipe } from '@angular/common';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CoverDetailsComponent } from '../cover-details/cover-details.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-travel-quote-details',
  templateUrl: './travel-quote-details.component.html',
  styleUrls: ['./travel-quote-details.component.scss']
})
export class TravelQuoteDetailsComponent implements OnInit {

  @Input('quoteRefNo') quoteRefNo: any;
  @Input('travelDetails') travelDetails: any;
  @Output('getBack') getBack = new EventEmitter();
  @Output('onWishListProceed') onWishListProceed = new EventEmitter();
  @Output('redirectValidations') redirectValidations = new EventEmitter();
  searchList: any[] = []; customerHeader: any[] = []; customerData: any[] = [];
  addSection: boolean = false; customerData2: any[] = []; customerHeader2: any[] = [];
  title: any; clientName: any; dateOfBirth: any; productValue: any;
  emailId: any; mobileNo: any; idNumber: any; productList: any[] = [];
  travelsList: any[] = []; minDate: Date; kidSection: boolean = false;
  adultSection: boolean = false; seniorSection: boolean = false;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; ageList: any[] = [];
  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  countryList: any[] = []; referenceNo: any = null; travelGroupList: any[] = [];
  customerHeader3: any[] = []; noOfDays: any;
  currencyList: any[] = []; planList: any[] = []; exchangeRate: any; productId: any; commissionValue: any = "";
  userDetails: any; currencyCode: any; endDate: any; applicationId: any = null; executiveValue: any = "";
  loginId: any; userType: any; agencyCode: any; branchCode: any; insuranceId: any; customerDetails: any;
  endMinDate: Date; adminSection: boolean = false; issuerSection: boolean; public TravelForm: FormGroup;
  maxDate: Date; travelId: any; travelName: any; premiumList: any; travelStartDate: any; grandSeniorEndAge: any;
  travelEndDate: any; customerDatas: any; subuserType: any; executiveSection: boolean = false;
  kidStartAge: any; kidEndAge: any; brokerbranchCode: any; superSeniorSection: boolean = false;
  adultStartAge: any; adultEndAge: any; seniorStartAge: any; seniorEndAge: any; grandSeniorStartAge: any;
  BelongingCountryId: any; brokerCode: any; brokerLoginId: any; superSeniorStartAge: any;
  executiveList: any[] = []; commissionTypeList: any[] = []; superSeniorEndAge: any; grandSeniorSection: boolean = false;
  PlanList: any[] = []; benefitList: any[] = [];
  questionSection: boolean = false; uwQuestionList: any[] = [];
  requestReferenceNo: string;
  passengerError: boolean = false;
  planTypeList: any[]=[];
  endorsementSection: boolean=false;
  orgPolicyNo: string;
  enableFieldsList: any;
  endorsementId: any;
  endorseEffectiveDate: any;
  endorsePolicyNo: any;
  endorseCategory: any;
  endorsementName: any;
  loginType: any;
  errorSection: boolean;
  customerTitleError: boolean;
  customerNameError: boolean;
  customerMobileCodeError: boolean;
  customerIdNumberError: boolean;
  customerMobileNoError: boolean;
  customerTypeError: boolean;
  customerPolicyTypeError: boolean;
  modifiedCustomer: boolean;
  customerReferenceNo: any;
  endorsementDate: any=null;
  endorsementEffectiveDate: any=null;
  endorsementRemarks: any=null;
  endorsementType: any=null;
  endorsementTypeDesc: any=null;
  endtCategoryDesc: any=null;
  endtCount: any=null;
  endtPrevQuoteNo: any=null;
  endtPrevPolicyNo: any=null;
  endtStatus: any=null;
  isFinanceEndt: any=null;
  orginalPolicyNo: any=null;
  endorsementYn: any='N';

  constructor(private router: Router, private updateComponent: UpdateCustomerDetailsComponent,
    private sharedService: SharedService, private datePipe: DatePipe
    , public dialogService: MatDialog, private updateCustomerComponent: UpdateCustomerDetailsComponent) {

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log("UserDetails", this.userDetails);
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    
    if (sessionStorage.getItem('endorsePolicyNo')) {
      this.endorsementSection = true;
      let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if (endorseObj) {
        this.orgPolicyNo = sessionStorage.getItem('endorsePolicyNo')
        this.endorsementId = endorseObj.EndtTypeId;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorseEffectiveDate = endorseObj?.EffectiveDate;
        this.endorsePolicyNo = endorseObj?.PolicyNo;
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        // if(this.endorsementId!=42 && this.endorsementId!=842){
        //     this.enableFieldName = this.enableFieldsList.some(ele=>ele=='InsuranceType');
        // }
      }
    }
    if (this.userType != 'Broker') {
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP') {
        this.adminSection = true;
      }
    }
    else {
      this.subuserType = sessionStorage.getItem('typeValue');
    }
    this.ageDropdown();
    this.createForm();

    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if (quoteRefNo) this.requestReferenceNo = quoteRefNo;
    else {
      let quoteStatus = sessionStorage.getItem('QuoteStatus');
      if (quoteStatus == 'AdminRP' || quoteStatus == 'AdminRA' || quoteStatus == 'AdminRR') {
        if (this.applicationId != '01' && this.applicationId != '1') { this.issuerSection = true; }
        else { this.issuerSection = false; }
      }
      else if (this.userType != 'Broker' && this.userType != 'User') { this.issuerSection = true; }
      else this.issuerSection = false
    }
    //this.getUWDetails();
  }

  ngOnInit(): void {
    this.getUWDetails();
  }
  public createForm() {

    this.TravelForm = new FormGroup({
      PlanTypeId: new FormControl(null, Validators.required),
      SourceCountry: new FormControl(null),
      SectionId: new FormControl(null),
      HavePromoCode: new FormControl('N', Validators.required),
      PromoCode: new FormControl('', Validators.required),
      SportsCoverYn: new FormControl('N', Validators.required),
      TerrorismCoverYn: new FormControl('N', Validators.required),
      CovidCoverYn: new FormControl('N', Validators.required),
      TravelGroupDetails1: new FormControl('0'),
      TravelGroupDetails2: new FormControl('0'),
      TravelGroupDetails3: new FormControl('0'),
      TravelGroupDetails4: new FormControl('0'),
      TravelGroupDetails5: new FormControl('0'),
      travelStartDate: new FormControl(''),
      travelEndDate: new FormControl(''),
      Currency: new FormControl('Y', Validators.required),
      ExchangeRate: new FormControl('', Validators.required),
    });
  }
  setValues(customerDatas) {
    console.log("Travel Details",this.travelDetails)
    if(this.userType=='Issuer') this.updateComponent.brokerLoginId = customerDatas?.LoginId;
    this.travelName = customerDatas.travelName;
    this.BelongingCountryId = customerDatas.CountryId;
    this.executiveValue = customerDatas?.AcExecutiveId;
    this.commissionValue = customerDatas?.CommissionType;
    this.endorsementYn = customerDatas?.EndorsementYn;
    if(this.endorsementSection){
      if(customerDatas.EndorsementDate){
        this.endorsementDate = customerDatas?.EndorsementDate;
        this.endorsementEffectiveDate = customerDatas?.EndorsementEffectiveDate;
        this.endorsementRemarks = customerDatas?.EndorsementRemarks;
        this.endorsementType = customerDatas?.EndorsementType;
        this.endorsementTypeDesc = customerDatas?.EndorsementTypeDesc;
        this.endtCategoryDesc = customerDatas?.EndtCategoryDesc;
        this.endtCount = customerDatas?.EndtCount;
        this.endtPrevQuoteNo = customerDatas?.EndtPrevQuoteNo;
        this.endtStatus = customerDatas?.EndtStatus;
        this.endtPrevPolicyNo = customerDatas?.EndtPrevPolicyNo;
        this.isFinanceEndt = customerDatas?.IsFinanceEndt;
        this.orginalPolicyNo = customerDatas?.OrginalPolicyNo;
      }
    }
    this.TravelForm.controls['PlanTypeId'].setValue(customerDatas.PlanTypeId);
    this.TravelForm.controls['SourceCountry'].setValue(customerDatas.DestinationCountry);
    this.premiunDropdown(customerDatas.SectionId,'direct',);
    this.TravelForm.controls['HavePromoCode'].setValue(customerDatas.HavePromoCode);
    this.TravelForm.controls['PromoCode'].setValue(customerDatas.PromoCode);
    this.TravelForm.controls['SportsCoverYn'].setValue(customerDatas.SportsCoverYn);
    this.TravelForm.controls['TerrorismCoverYn'].setValue(customerDatas.TerrorismCoverYn);
    this.TravelForm.controls['CovidCoverYn'].setValue(customerDatas.CovidCoverYn);
    let passengerDetails = customerDatas.GroupDetails;
    if (passengerDetails.length != 0) {
      for (let passenger of passengerDetails) {
        let entry = this.travelGroupList.filter(ele => ele.GroupId == passenger.GroupId);
        console.log("Entryyyyyyy", entry)
        if (entry) {
          entry[0].GroupMembers = passenger.GroupMembers
        }
      }
    }
    //  this.TravelForm.controls['travelStartDate'].setValue(customerDatas.TravelStartDate);
    //  this.TravelForm.controls['travelEndDate'].setValue(customerDatas.TravelEndDate);
  }
  ageDropdown() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": "4"
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/productgroup`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.ageList = data.Result;
          if (this.ageList.length != 0) {
            let i = 0;
            for (let age of this.ageList) {
              let entry = { "GroupId": age.Code, "GroupMembers": "0", "GroupDesc": age.CodeDesc };
              this.travelGroupList.push(entry)
              i += 1;
              if (i == this.ageList.length) this.getCountryList();
            }
          }
          else {
            this.getCountryList();
          }

        }
      },
      (err) => { },
    );
  }
  planType() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/plantype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.planList = data.Result;

          
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
    let urlLink = `${this.CommonApiUrl}master/dropdown/nationality`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let obj = [{"Code":null,"CodeDesc":"- - Select - -"}]
          this.countryList = obj.concat(data.Result);
          if (this.travelDetails) {
            this.setValues(this.travelDetails);
          }

        }
      },
      (err) => { },
    );
  }
  premiunDropdown(value,type) {
    let loginId = null;
    if(this.userType!='Issuer'){
      loginId=this.loginId;
    }
    else{
      loginId = this.updateComponent.brokerLoginId;
    }
    let ReqObj = {
        "BranchCode": this.branchCode,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      // "CountryId": this.TravelForm.controls['SourceCountry'].value,
      // "LoginId":loginId
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let obj = [{"Code":null,"CodeDesc":"- - Select - -"}]
          this.premiumList = obj.concat(data.Result);
          this.TravelForm.controls['SectionId'].setValue(value);
          if(type=='direct'){this.getPlanTypeList('direct')}
        }
      },
      (err) => { },
    );
  }
  getPlanTypeList(type){
    if(type=='change') this.TravelForm.controls['PlanTypeId'].setValue(null);
    let loginId = null;
    if(this.userType!='Issuer'){
      loginId=this.loginId;
    }
    else{
      loginId = this.updateComponent.brokerLoginId;
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "BranchCode": this.branchCode,
      "SectionId": this.TravelForm.controls['SectionId'].value,
      "LoginId":loginId
    }
    let urlLink = `${this.CommonApiUrl}dropdown/plantype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let obj = [{"Code":null,"CodeDesc":"- - Select - -"}]
          this.planTypeList = obj.concat(data.Result);
          //this.TravelForm.controls['PlanTypeId'].setValue(value);
        }
      },
      (err) => { },
    );
  }
  viewplanBenifits() {
    let ReqObj = {
      "PlanTypeId": this.TravelForm.controls['PlanTypeId'].value,
      //"PolicyTypeId":this.TravelForm.controls[''].value,
      //"PolicyTypeId":this.TravelForm.controls['PlanTypeId'].value,
      "PolicyTypeId": this.TravelForm.controls['SectionId'].value,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId
    }
    let urlLink = `${this.motorApiUrl}api/gettravelpolicytype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          const dialogRef = this.dialogService.open(CoverDetailsComponent, {
            data: {
              titles: 'travel PolicyDetails',
              benefitList: data.Result
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        }
      },

      (err) => { },
    );
  }
  onchangeContents(type, index) {
    if (type == 'sub') {
      this.travelGroupList[index].GroupMembers = String(Number(this.travelGroupList[index].GroupMembers) - 1);
    }
    else {
      this.travelGroupList[index].GroupMembers = String(Number(this.travelGroupList[index].GroupMembers) + 1);
    }
  }
  onProceed() {
    let loginType = this.userDetails.Result.LoginType;
    if(loginType){
      if(loginType=='B2CFlow' || loginType=='B2CFlow2'){
        let i = 0;
        this.customerTitleError = false;this.customerNameError=false;this.customerMobileCodeError = false;this.customerTypeError=false;
        this.customerMobileNoError = false;this.customerIdNumberError = false;this.customerPolicyTypeError = false;
          
          if(this.updateComponent.Title==null || this.updateComponent.Title==undefined || this.updateComponent.Title ==''){this.customerTitleError = true;i+=1;}
          if(this.updateComponent.UserName==null || this.updateComponent.UserName==undefined || this.updateComponent.UserName ==''){this.customerNameError = true;i+=1;}
          if(this.updateComponent.MobileCode==null || this.updateComponent.MobileCode==undefined || this.updateComponent.MobileCode ==''){this.customerMobileCodeError = true;i+=1;}
          if(this.updateComponent.MobileNo==null || this.updateComponent.MobileNo==undefined || this.updateComponent.MobileNo =='') {this.customerMobileNoError = true;i+=1;}
          if(this.updateComponent.IdNumber==null || this.updateComponent.IdNumber==undefined || this.updateComponent.IdNumber =='') {this.customerIdNumberError = true;i+=1;}
          if(this.updateComponent.PolicyHolderTypeid==null || this.updateComponent.PolicyHolderTypeid==undefined || this.updateComponent.PolicyHolderTypeid =='') {this.customerPolicyTypeError = true;i+=1;}
          if(this.updateComponent.CustomerType==null || this.updateComponent.CustomerType==undefined || this.updateComponent.CustomerType =='') {this.customerTypeError = true;i+=1;}
          if(i>0) this.errorSection = true;
          if(i==0){
            let customerObj = {
              "Title":this.updateComponent.Title,
              "ClientName":this.updateComponent.UserName,
              "MobileCode":this.updateComponent.MobileCode,
              "MobileNo":this.updateComponent.MobileNo,
              "MobileCodeDesc": this.updateComponent.MobileCodeDesc,
              "IdNumber":this.updateComponent.IdNumber,
              "IdType": this.updateComponent.CustomerType,
              "PolicyHolderTypeid":this.updateComponent.PolicyHolderTypeid,
              "EmailId":this.updateComponent.EmailId,
            }
            sessionStorage.setItem('b2cCustomerObj',JSON.stringify(customerObj));
            this.modifiedCustomer = this.updateComponent.ModifiedCustomer;
            if(this.modifiedCustomer){
                this.saveCustomerDetails(customerObj,'create');
            }
            else{
              let validDetais = this.checkMandatories();
              if (validDetais) {
                this.onSave();
              }
            } 
          }
      }
      else{
        let validDetais = this.checkMandatories();
        if (validDetais) {
          this.onSave();
        }
      }
    }
    else{
      let validDetais = this.checkMandatories();
      if (validDetais) {
        this.onSave();
      }
    }
  }
  saveCustomerDetails(data,type){
    let appointmentDate = "",street=null, dobOrRegDate = "",vrngst='0', taxExemptedId = null,cityName=null, stateName=null,businessType = '1',
    add1=null,StateCode=null,status='P',IsTaxExempted='N',Gender=null,cityCode=null,countryCode=null,pinCode=null;
    //  if(data.AppointmentDate!= undefined && data.AppointmentDate!=null && data.AppointmentDate!=''){
    // 	appointmentDate = this.datePipe.transform(data.AppointmentDate, "dd/MM/yyyy");
    //  }
    // if(data.CityName!=null && data.CityName!='') cityName = this.stateList.find(ele=>ele.Code==data.CityName)?.CodeDesc;
    // if(data.state!=null && data.state!='') stateName = this.regionList.find(ele=>ele.Code==data.state)?.CodeDesc;
    let refNo = sessionStorage.getItem('customerReferenceNo');
    if(refNo) this.customerReferenceNo = refNo;
    else this.customerReferenceNo = null;
      if(this.customerReferenceNo==null){
        businessType = '1';
        status = 'P';
      }
      else{
        if(this.customerDetails){
          if(this.customerDetails.BusinessType==null){
            businessType = '1';
            vrngst = '0';
          }
          else{
            businessType = this.customerDetails.BusinessType;
            vrngst = this.customerDetails.VrTinNo;
            
          }
          add1 = this.customerDetails.Address1;
          stateName = this.customerDetails.StateName;
          StateCode =  this.customerDetails.StateCode;
          status = this.customerDetails.Status;
          IsTaxExempted = this.customerDetails?.IsTaxExempted;
          Gender = this.customerDetails?.Gender;
          cityName = this.customerDetails.CityName
          cityCode = this.customerDetails.CityCode;
          dobOrRegDate = this.customerDetails.DobOrRegDate;
          countryCode = this.customerDetails.Nationality;
          taxExemptedId = this.customerDetails.TaxExemptedId;
          pinCode = this.customerDetails.PinCode;
          street = this.customerDetails.Street;
        }
        console.log("Customer Details",this.customerDetails)
      }
    let ReqObj = {
      "BrokerBranchCode": this.brokerbranchCode,
      "CustomerReferenceNo": this.customerReferenceNo,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode,
      "ProductId": "5",
      "AppointmentDate": null,
      "Address1": add1,
      "Address2": null,
      "BusinessType": businessType,
      "CityCode": cityCode,
      "CityName": cityName,
      "ClientName": data?.ClientName,
      "Clientstatus": 'P',
      "CreatedBy": this.loginId,
      "DobOrRegDate": dobOrRegDate,
      "Email1": data?.EmailId,
      "Email2": null,
      "Email3": null,
      "Fax": null,
      "Gender": Gender,
      "IdNumber": data?.IdNumber,
      "IdType": data?.IdType,
      "IsTaxExempted": IsTaxExempted,
      "Language": "1",
      "MobileNo1": data.MobileNo,
      "MobileNo2": null,
      "MobileNo3": null,
      "Nationality": countryCode,
      "Occupation": data?.Occupation,
      "Placeofbirth": "Chennai",
      "PolicyHolderType": data.IdType,
      "PolicyHolderTypeid": data?.PolicyHolderTypeid,
      "PreferredNotification": data?.PreferredNotification,
      "RegionCode": "01",
      "MobileCode1": data?.MobileCode,
      "WhatsappCode": data?.MobileCode,
      "MobileCodeDesc1": data?.MobileCodeDesc,
      "WhatsappDesc": data?.MobileCodeDesc,
      "WhatsappNo": data.MobileNo,
      "StateCode": StateCode,
      "StateName": stateName,
      "Status": status,
      "Street": street,
      "TaxExemptedId": taxExemptedId,
      "TelephoneNo1": data?.TelephoneNo,
      "PinCode": pinCode,
      "TelephoneNo2": null,
      "TelephoneNo3": null,
      "Title": data.Title,
      "VrTinNo": vrngst,
      "SaveOrSubmit": 'Submit'
    }
    let urlLink = `${this.CommonApiUrl}api/customer`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
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
          let validDetais = this.checkMandatories();
          if (validDetais) {
            this.onSave();
          }
        }
      },

      (err: any) => { console.log(err); },
    );
  }
  checkMandatories() {

    if (this.issuerSection) {
      if(this.updateComponent.branchValue != '' && this.updateComponent.branchValue != undefined && this.updateComponent.branchValue != null){
          this.redirectValidations.emit('reset'); 
          if(this.updateComponent.sourceTypeDesc != '' && this.updateComponent.sourceTypeDesc != undefined && this.updateComponent.sourceTypeDesc != null){
            this.redirectValidations.emit('reset'); 
            if(this.updateComponent.sourceTypeDesc=='Premia Agent' || this.updateComponent.sourceTypeDesc=='Premia Broker' || this.updateComponent.sourceTypeDesc=='Premia Direct'){
              if(this.updateComponent.CustomerName!='' && this.updateComponent.CustomerName!=undefined && this.updateComponent.CustomerName!=null){
                this.brokerCode = null;
                this.brokerLoginId = null;
                this.updateComponent.brokerCode = null;
                this.updateComponent.brokerBranchCode = null;
                this.updateComponent.brokerLoginId = null;
                this.redirectValidations.emit('reset'); 
                if (this.updateComponent.travelStartDate != '' && this.updateComponent.travelStartDate != undefined && this.updateComponent.travelStartDate != null) {
                  this.redirectValidations.emit('reset');
                  if (this.updateComponent.travelEndDate != '' && this.updateComponent.travelEndDate != undefined && this.updateComponent.travelEndDate != null) {
                    this.redirectValidations.emit('reset');
                    if (this.updateComponent.CurrencyCode != '' && this.updateComponent.CurrencyCode != undefined && this.updateComponent.CurrencyCode != null) {
                      this.redirectValidations.emit('reset');
                      if (this.updateComponent.HavePromoCode != '' && this.updateComponent.HavePromoCode != undefined && this.updateComponent.HavePromoCode != null) {
                        this.redirectValidations.emit('reset');
                        if(this.updateComponent.HavePromoCode!='N'){
                          if (this.updateComponent.PromoCode != '' && this.updateComponent.PromoCode != undefined && this.updateComponent.PromoCode != null) {
                            this.redirectValidations.emit('reset');
                            return true;
                          }
                          else {
                            this.redirectValidations.emit('promoCode');
                          }
                        }
                        else return true;
                      }
                      else {
                        this.redirectValidations.emit('havePromoCode');
                      }
                    }
                    else {
                      this.redirectValidations.emit('currencyCode');
                    }
                  }
                  else {
                    this.redirectValidations.emit('travelEndDate');
                  }
                }
                else {
                  this.redirectValidations.emit('travelStartDate');
                }
              }
              else{
                this.redirectValidations.emit('customerCode');
              }
            }
            else{
              if(this.updateComponent.brokerCode!='' && this.updateComponent.brokerCode!=undefined && this.updateComponent.brokerCode!=null){
                this.redirectValidations.emit('reset'); 
                if(this.updateComponent.brokerBranchCode!='' && this.updateComponent.brokerBranchCode!=undefined && this.updateComponent.brokerBranchCode!=null){
                  this.redirectValidations.emit('reset'); 
                  if (this.updateComponent.travelStartDate != '' && this.updateComponent.travelStartDate != undefined && this.updateComponent.travelStartDate != null) {
                    this.redirectValidations.emit('reset');
                    if (this.updateComponent.travelEndDate != '' && this.updateComponent.travelEndDate != undefined && this.updateComponent.travelEndDate != null) {
                      this.redirectValidations.emit('reset');
                      if (this.updateComponent.CurrencyCode != '' && this.updateComponent.CurrencyCode != undefined && this.updateComponent.CurrencyCode != null) {
                        this.redirectValidations.emit('reset');
                        if (this.updateComponent.HavePromoCode != '' && this.updateComponent.HavePromoCode != undefined && this.updateComponent.HavePromoCode != null) {
                          this.redirectValidations.emit('reset');
                          if(this.updateComponent.HavePromoCode!='N'){
                            if (this.updateComponent.PromoCode != '' && this.updateComponent.PromoCode != undefined && this.updateComponent.PromoCode != null) {
                              this.redirectValidations.emit('reset');
                              return true;
                            }
                            else {
                              this.redirectValidations.emit('promoCode');
                            }
                          }
                          else return true;
                        }
                        else {
                          this.redirectValidations.emit('havePromoCode');
                        }
                      }
                      else {
                        this.redirectValidations.emit('currencyCode');
                      }
                    }
                    else {
                      this.redirectValidations.emit('travelEndDate');
                    }
                  }
                  else {
                    this.redirectValidations.emit('travelStartDate');
                  }
                }
                else this.redirectValidations.emit('brokerCode');
              }
              else{
                this.redirectValidations.emit('brokerCode');
              }
            }
            
            
            // else if(this.Code=='Broker'){
            //   this.brokerCodeError = true;
            // }
            // else if(this.Code=='Agent' || this.Code == 'Direct'){
            //   this.brokerCode=null;
            //   this.branchValue = null;
            //   this.brokerCodeError = false;
            //   return true;
            // }
          }
          else{
            this.redirectValidations.emit('sourceType');
            return false;
          }
          
        }
        else{
          this.redirectValidations.emit('branchValue');
        }
    }
    else {
        if (this.updateComponent.travelStartDate != '' && this.updateComponent.travelStartDate != undefined && this.updateComponent.travelStartDate != null) {
          this.redirectValidations.emit('reset');
          if (this.updateComponent.travelEndDate != '' && this.updateComponent.travelEndDate != undefined && this.updateComponent.travelEndDate != null) {
            this.redirectValidations.emit('reset');
            if (this.updateComponent.CurrencyCode != '' && this.updateComponent.CurrencyCode != undefined && this.updateComponent.CurrencyCode != null) {
              this.redirectValidations.emit('reset');
              if (this.updateComponent.HavePromoCode != '' && this.updateComponent.HavePromoCode != undefined && this.updateComponent.HavePromoCode != null) {
                this.redirectValidations.emit('reset');
                if(this.updateComponent.HavePromoCode=='Y'){
                  if (this.updateComponent.PromoCode != '' && this.updateComponent.PromoCode != undefined && this.updateComponent.PromoCode != null) {
                    this.redirectValidations.emit('reset');
                    return true;
                  }
                  else {
                    this.redirectValidations.emit('promoCode');
                  }
                }
                else{
                  return true;
                }
                
              }
              else {
                this.redirectValidations.emit('havePromoCode');
              }
            }
            else {
              this.redirectValidations.emit('currencyCode');
            }
          }
          else {
            this.redirectValidations.emit('travelEndDate');
          }
        }
        else {
          this.redirectValidations.emit('travelStartDate');
        }

    }
  }
  onSave() {
    let travelList = [];
    let totalPassengers = 0;
    travelList = this.travelGroupList.filter(ele => ele.GroupMembers != '0');
    if (travelList.length != 0) {
      let i = 0;
      this.passengerError = false;
      for (let travel of travelList) {
        totalPassengers = totalPassengers + Number(travel.GroupMembers);
        i += 1;
        if (i == travelList.length) {
          this.onFormSubmit(travelList, totalPassengers);
        }

        /*else{
          this.onFinalProceed();
        }*/
      }
    }
    else {
      this.passengerError = true;
    }
  }
  onFormSubmit(travelList, totalPassengers) {
    let createdBy = "";
    createdBy = this.loginId;
    this.brokerCode = this.agencyCode;
    this.brokerLoginId = createdBy;
    this.subuserType = sessionStorage.getItem('typeValue');
    this.applicationId = "01";
    let appId = "1", loginId = "", brokerbranchCode = "";
    let acExecutiveId = "", commissionType = "",customerName;
    let quoteStatus = sessionStorage.getItem('QuoteStatus');
    if(quoteStatus=='AdminRP' || quoteStatus=='AdminRA' || quoteStatus=='AdminRR'){
        createdBy = this.travelDetails.CreatedBy;
    }
    else{
      createdBy = this.loginId;
      if(this.userType!='Issuer'){
        this.brokerCode = this.agencyCode;
        appId = "1"; loginId=this.loginId;
        brokerbranchCode = this.brokerbranchCode;
        acExecutiveId = this.executiveValue;
        commissionType = this.commissionValue;
      }
      else{
        appId = this.loginId;
        loginId = this.updateComponent.brokerLoginId
        brokerbranchCode = null;
      }
    }
    let currencyCode = null, exchangeRate = null, startDate = null, endDate = null, noOfDays = null;
    if (this.updateComponent.CurrencyCode) {
      currencyCode = this.updateComponent.CurrencyCode
    }
    if (this.updateComponent.exchangeRate) {
      exchangeRate = this.updateComponent.exchangeRate
    }
    if (this.updateComponent.travelStartDate) {
      startDate = this.updateComponent.travelStartDate
    }
    if (this.updateComponent.travelEndDate) {
      endDate = this.updateComponent.travelEndDate
    }
    if (this.updateComponent.noOfDays) {
      noOfDays = this.updateComponent.noOfDays
    }
    let sourceType=null,branchValue=null,bdmCode=null,brokerCode=null,brokerBranchCode=null,customerCode=null;
    if(this.userType!='Broker' && this.userType!='User'){
      sourceType = this.updateComponent.sourceType;
      branchValue = this.updateComponent.branchValue;
      bdmCode = this.updateComponent.brokerCode;
      brokerCode = this.updateComponent.brokerCode;
      brokerbranchCode =  this.updateComponent.brokerBranchCode;
      customerCode = this.updateComponent.CustomerCode;
      customerName = this.updateComponent.CustomerName;
    }
    else{
      customerCode = this.updateComponent.CustomerCode;
      customerName = this.updateComponent.CustomerName;
      sourceType = this.subuserType;
      branchValue = this.branchCode;
      brokerCode = this.brokerCode;
      brokerBranchCode = this.brokerbranchCode
    }
    let ReqObj = {

      "AcExecutiveId": acExecutiveId,
      "ApplicationId": appId,
      "CommissionType": commissionType,
      "BrokerCode": brokerCode,
      "LoginId": loginId,
      "SubUserType": this.subuserType,
      "CustomerReferenceNo": sessionStorage.getItem('customerReferenceNo'),
      "RequestReferenceNo": this.quoteRefNo,
      "BranchCode": branchValue,
      "ProductId": this.productId,
      "UserType": this.userType,
      "BrokerBranchCode": brokerbranchCode,
      "BdmCode": customerCode,
      "CreatedBy": createdBy,
      "CustomerCode": customerCode,
      "CustomerName": customerName,
      "InsuranceId": this.insuranceId,
      "SourceTypeId":sourceType,//this.subuserType,
      "SectionId": this.TravelForm.controls['SectionId'].value,
      "TravelCoverId": this.TravelForm.controls['SectionId'].value,
      "Currency": currencyCode,
      "ExchangeRate": exchangeRate,
      "PlanTypeId": this.TravelForm.controls['PlanTypeId'].value,
      "SourceCountry": "TZA",
      "DestinationCountry": this.TravelForm.controls['SourceCountry'].value,
      "TotalPassengers": totalPassengers,
      "TravelId": "1",
      "HavePromoCode": this.updateComponent.HavePromoCode,
      "PromoCode": this.updateComponent.PromoCode,
      "SportsCoverYn": this.TravelForm.controls['SportsCoverYn'].value,
      "TerrorismCoverYn": this.TravelForm.controls['TerrorismCoverYn'].value,
      "CovidCoverYn": this.TravelForm.controls['CovidCoverYn'].value,
      "TravelCoverDuration": noOfDays,
      "TravelEndDate": this.travelStartDate,
      "TravelStartDate": this.travelEndDate,
      "GroupDetails": travelList,
      "EndorsementYn": this.endorsementYn,
        "EndorsementDate":this.endorsementDate,
        "EndorsementEffectiveDate": this.endorsementEffectiveDate,
        "EndorsementRemarks": this.endorsementRemarks,
        "EndorsementType": this.endorsementType,
        "EndorsementTypeDesc": this.endorsementTypeDesc,
        "EndtCategoryDesc": this.endtCategoryDesc,
        "EndtCount":this.endtCount,
        "EndtPrevPolicyNo":this.endtPrevPolicyNo,
        "EndtPrevQuoteNo": this.endtPrevQuoteNo,
        "EndtStatus": this.endtStatus,
        "IsFinanceEndt": this.isFinanceEndt,
        "OrginalPolicyNo": this.orginalPolicyNo,
    }
    ReqObj['TravelStartDate'] = this.datePipe.transform(startDate, "dd/MM/yyyy");
    ReqObj['TravelEndDate'] = this.datePipe.transform(endDate, "dd/MM/yyyy");
    console.log("Received Obj",ReqObj)
    let urlLink = `${this.motorApiUrl}api/savetraveldetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        if (data.ErrorMessage.length != 0) {
          if (res.ErrorMessage) {
          }
        }
        else {
          let entry = data?.Result;
          entry['TravelStartDate'] = ReqObj?.TravelStartDate;
          entry['TravelEndDate'] = ReqObj?.TravelEndDate;
          entry['TotalPassengers'] = ReqObj?.TotalPassengers;
          entry['SectionId'] = ReqObj?.SectionId;
          entry['Currency'] = ReqObj?.Currency;
          entry['DestinationCountry'] = data?.Result?.DestinationCountryDesc;
          entry['NoofDays'] = ReqObj?.TravelCoverDuration;
          this.requestReferenceNo = data.Result.RequestReferenceNo;
          this.onFinalProceed(entry);



        }
      },
      (err) => { },
    );
  }
  getCoverList(coverListObj) {
    this.currencyCode = coverListObj?.Currency;
    let createdBy = this.loginId
    let groupList = coverListObj?.GroupDetails;
    let vehicleList = [];
    let endDate:any = null,coverModificationYN='N';
    if(coverListObj?.TravelEndDate){
      if(this.endorsementSection){
        coverModificationYN = 'Y';
        endDate = this.endorseEffectiveDate;
      }
      else endDate = coverListObj?.TravelEndDate;
    }
    let effectiveDate=null;
    if(this.endorsementSection){
        effectiveDate = this.endorseEffectiveDate;
    }
    else {
      if(coverListObj.TravelStartDate){
        effectiveDate = coverListObj.TravelStartDate;
      }
    }
    if (groupList.length != 0) {
      let i = 0;
      for (let group of groupList) {
        let ReqObj = {
          "InsuranceId": this.insuranceId,
          "BranchCode": this.branchCode,
          "AgencyCode": this.agencyCode,
          "SectionId": coverListObj?.SectionId,
          "ProductId": this.productId,
          "MSRefNo": coverListObj?.MSRefNo,
          "VehicleId": group.TravelId,
          "CdRefNo": coverListObj?.CdRefNo,
          "VdRefNo": coverListObj?.VdRefNo,
          "CreatedBy": createdBy,
          "productId": this.productId,
          "Passengers": group.GroupMembers,
          "EffectiveDate": effectiveDate,
          "PolicyEndDate": endDate,
          "RequestReferenceNo": coverListObj?.RequestReferenceNo,
          "CoverModification":'N'
        }
        let urlLink = `${this.CommonApiUrl}calculator/calc`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            let entry = data;

            entry['DestinationCountry'] = coverListObj.DestinationCountry;
            entry['TravelStartDate'] = coverListObj.TravelStartDate;
            entry['TravelEndDate'] = coverListObj.TravelEndDate;
            let groupEntry = groupList.filter(ele => ele.GroupId == data?.VehicleId);
            if (groupEntry) {
              entry['Passengers'] = groupEntry[0].GroupMembers;
              entry['TravelId'] = entry.VehicleId;
            }
            vehicleList.push(entry);
            i += 1;
            console.log("iiiiiiiii ", i)
            if (i == groupList.length) {
              console.log("grouppppppppppppppppppp");
              sessionStorage.setItem('quoteReferenceNo', coverListObj.RequestReferenceNo)
              this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
              // this.vehicleDetailsList = vehicleList;
              // console.log("Final Vehicle Details",vehicleList);
              // this.checkSelectedCovers();

            }
          },
          (err) => { },
        );
      }
    }

  }

  customRedirection(){
    this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
  }
  getUWDetails() {
    let ReqObj = {
      "Limit": "0",
      "Offset": "100",
      "ProductId": this.productId,
      "LoginId": this.loginId,
      "InsuranceId": this.insuranceId,
      "BranchCode": this.branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/getactiveuwquestions`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data.Result;
        if (res.length != 0) {
          this.uwQuestionList = res;
          this.getEditUwQuestions();
        }
        else {
          //this.getCurrencyList();
        }
      },
      (err) => { },
    );
  }


  getEditUwQuestions() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      "LoginId": this.loginId,
      "RequestReferenceNo": this.requestReferenceNo,
      "VehicleId": "1"
    }
    let urlLink = `${this.CommonApiUrl}api/getuwquestionsdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let uwList = data?.Result;
        if (uwList.length != 0) {
          let i = 0;
          for (let ques of uwList) {
            let entry = this.uwQuestionList.find(ele => ele.UwQuestionId == ques.UwQuestionId);
            if (entry) { entry.Value = ques.Value };
            i += 1;
            if (i == uwList.length) {
              this.uwQuestionList.forEach(x => {
                x.Value = x.Value ? '' || 'N' : 'N'
              });
              this.questionSection = true; console.log("Final UW List", this.uwQuestionList); /*this.getCurrencyList();*/
            }
          }
        }
        else {
          this.uwQuestionList.forEach(x => {
            x.Value = x.Value ? '' || 'N' : 'N'
          });
          console.log("Final UW List", this.uwQuestionList);
          this.questionSection = true;
          //this.getCurrencyList();
        }
      },
      (err) => { },
    );
  }
  onSaveUWQues(uwList, entry) {
    if (uwList.length != 0) {
      let urlLink = `${this.CommonApiUrl}api/saveuwquestions`;
      this.sharedService.onPostMethodSync(urlLink, uwList).subscribe(
        (data: any) => {
          if (data.Result) {
            this.getCoverList(entry);
            //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }
        },
        (err) => { },
      );
    }
  }

  onFinalProceed(entry) {
    /*let i=0,j=0;
    for(let veh of this.travelDetails){
      let refNo = veh?.MSRefNo;
      if(refNo == undefined){
        i+=1;
      }
      j+=1;
      if(j==this.travelDetails.length){
        console.log("Final I",i)
        if(i==0){
          sessionStorage.setItem('travelDetailsList',JSON.stringify(this.travelDetails));
          if(this.uwQuestionList.length!=0){
            let i = 0;
            let uwList:any[]=[];
            for(let ques of this.uwQuestionList){
              ques['BranchCode'] = this.branchCode;
              let createdBy="";
                let quoteStatus = sessionStorage.getItem('QuoteStatus');
                if(quoteStatus=='AdminRP'){
                    createdBy = this.travelDetails[0].CreatedBy;
                }
                else{
                  createdBy = this.loginId;
                }
              if(ques.QuestionType == '01'){

                ques['CreatedBy'] = createdBy;
                ques['RequestReferenceNo'] = this.requestReferenceNo;
                ques['UpdatedBy'] = this.loginId;
                //ques["VehicleId"] = this.vehicleId
                uwList.push(ques);
              }
              else if(ques.Value!=""){
                ques['CreatedBy'] = createdBy;
                ques['RequestReferenceNo'] = this.requestReferenceNo;
                ques['UpdatedBy'] = this.loginId;
                //ques["VehicleId"] = this.vehicleId
                uwList.push(ques);
              }
              i+=1;
              if(i==this.uwQuestionList.length) this.onSaveUWQues(uwList);
            }
          }
          else{
            this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
          }

        }
        else{
          console.log("Redirecting to Save Data");
          //this.saveExistData();
        }
      }
    }*/

    if (this.uwQuestionList.length != 0) {
      let i = 0;
      let uwList: any[] = [];
      for (let ques of this.uwQuestionList) {
        ques['BranchCode'] = this.branchCode;
        let createdBy = "";
        let quoteStatus = sessionStorage.getItem('QuoteStatus');
        if (quoteStatus == 'AdminRP') {
          createdBy = this.travelDetails[0].CreatedBy;
        }
        else {
          createdBy = this.loginId;
        }
        if (ques.QuestionType == '01') {

          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = "1"
          uwList.push(ques);
        }
        else if (ques.Value != "") {
          ques['CreatedBy'] = createdBy;
          ques['RequestReferenceNo'] = this.requestReferenceNo;
          ques['UpdatedBy'] = this.loginId;
          ques["VehicleId"] = "1"
          uwList.push(ques);
        }
        i += 1;
        if (i == this.uwQuestionList.length) this.onSaveUWQues(uwList, entry);
        //this.getCoverList('direct');
      }
    }
    else {
      this.getCoverList(entry);
      //this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/excess-discount']);
    }

  }

}
