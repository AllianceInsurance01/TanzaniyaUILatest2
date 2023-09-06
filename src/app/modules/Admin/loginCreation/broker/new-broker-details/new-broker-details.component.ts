import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { BrokerDetails } from './BrokerDetails';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { Toaster } from 'ngx-toast-notifications';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-broker-details',
  templateUrl: './new-broker-details.component.html',
  styleUrls: ['./new-broker-details.component.scss']
})
export class NewBrokerDetailsComponent implements OnInit {

  statusValue: any = "Y";
  cityList: any[] = []; effectiveDate: any;
  typeList: any[] = []; channelList: any[] = [];
  public AppConfig: any = (Mydatas as any).default; insuranceId: any;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl; companyList: any[] = [];
  countryList: any[] = []; countryValue: any; repassword: any = null;
  mobileCodeList: any[] = []; brokerDetails: BrokerDetails; commissionVatYN: any;
  userName: any; contactPersonName: any; subUserType: any=null; password: any = null;
  minDate: Date; designation: any = null; address1: any; address2: any; remarks: any;
  countryCode: any; cityCode: any; userMail: any; mobileCode: any; custConfirmYN: any = "Y";
  userMobile: any; whatsAppCode: any; whatsAppNo: any; pobox: any; checkerYN = "Y";
  coreAppBrokerCode: any; brokerCompanyYn: any = "N"; loginId: any; makerYN: any = "Y";
  companyCode: any; editSection: boolean = false; vatRegNo: any = null;
  agencyCode: any = null; stateCode: any; branchCode: any;
  brokerLoginId: any; subUser: any; bankList: any[] = [];
  oaCode: any = null; bankCode: any = null;creditLimit:any=null;
  executiveId: any = null; stateList: any[] = [];
  editsSection = false;taxExcemptedCode:any=null;
  editValue: boolean = false;taxExcemptedYN:any='N';
  regulatoryCode: any=null;customerCode:any=null;
  customerList: any[]=[];
  showCustomerList: boolean=false;
  constructor(private router: Router, private sharedService: SharedService,
    private datePipe: DatePipe) {
    this.minDate = new Date();
    this.brokerDetails = new BrokerDetails();
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (userDetails) {
      this.loginId = userDetails?.Result?.LoginId;
      this.branchCode = userDetails?.Result?.BranchCode;

      // this.insuranceId = userDetails?.Result.LoginBranchDetails[0].InsuranceId;
    }
    this.subUser = sessionStorage.getItem('typeValue');
    // this.loginInformation = this.brokerDetails?.LoginInformation;
    // this.personalInformation = this.brokerDetails?.PersonalInformation;
    console.log("Entered Broker Detailsssssssssss")
    this.getChannelList();
  }

  ngOnInit(): void {
    let com = sessionStorage.getItem('editBroker');
     this.insuranceId=sessionStorage.getItem('InsuranceId')
    if (com) {
      this.editsSection = false;
      
    }
    else {
      let channelId =  sessionStorage.getItem('brokerChannelId');
      if(channelId) this.subUserType = channelId;
      this.editsSection = true;
    }
    if (this.commissionVatYN == null) this.commissionVatYN = 'N';

  }
  onGetCustomerList(type,code){
    console.log("Code",code); let branch:any;
//     if(this.branchCode!=null && this.branchCode!=''){
// branch=this.branchCode
//     }
//     else{
//       branch =this.subBranchId
//     }
    if(code!='' && code!=null && code!=undefined){
      let ReqObj = {
        "BranchCode": null,
        "InsuranceId": this.insuranceId,
         "SearchValue": code,
         "SourceType":this.subUserType
      }
      let urlLink = `${this.ApiUrl1}api/search/premiabrokercustomercode`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
              this.customerList = data.Result;
              if(type=='change'){
                this.showCustomerList = true;
                this.userName = null;
              }
              else{
                this.showCustomerList = false;
                let entry = this.customerList.find(ele=>ele.Code==this.customerCode);
                this.userName = entry.Name;
                this.setCustomerValue(this.customerCode,this.userName,'direct')
              }
              
        },
        (err) => { },
      );
    }
    else{
      this.customerList = [];
    }
  }
  setCustomerValue(code,name,type){
    this.showCustomerList = false;
      this.customerCode = code;
      this.userName = name;
  }
  getChannelList() {
    let ReqObj = {
      "UserType": "Broker"
    }
    let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.channelList = data.Result;
          this.getCountryList();


        }
      },
      (err) => { },
    );
  }
  onChangeVatYN() {
    this.vatRegNo = null;
  }
  onCreditChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted() {

    // format number
    if (this.creditLimit) {
      this.creditLimit= this.creditLimit.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }}
  getCountryList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.countryList = data.Result;
          this.getMobileCodeList();
        }
      },
      (err) => { },
    );
  }
  getMobileCodeList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.mobileCodeList = data.Result;
          let brokerId = sessionStorage.getItem('editBroker');
          if (brokerId) {
            this.getEditBrokerDetails(brokerId);
            this.editSection = true;
          }
          else {
            this.getInsuranceList('change', this.insuranceId);
            this.getBankList();
            this.editSection = false;
          }

        }
      },
      (err) => { },
    );
  }
  getBankList() {
    let ReqObj = { "InsuranceId": this.insuranceId, "BranchCode": this.branchCode }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.bankList = data.Result;
        }
      },
      (err) => { },
    );
  }
  getInsuranceList(type, value) {
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    let ReqObj = {
      "BrokerCompanyYn": this.brokerCompanyYn
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.companyList = data.Result;
          this.insuranceId = value;
        }
      },
      (err) => { },
    );
  }
  getEditBrokerDetails(brokerId) {
    let ReqObj = { "LoginId": brokerId }
    let urlLink = `${this.CommonApiUrl}admin/getbrokerbyid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          //this.cityList = data.Result;
          this.editsSection = true;
          let loginInformation = data.Result.LoginInformation;
          let PersonalInformation = data.Result.PersonalInformation;
          if (loginInformation) {
            if (loginInformation?.Status == null) loginInformation.Status = 'N';
            if (loginInformation?.EffectiveDateStart != null) {
              this.effectiveDate = this.onDateFormatInEdit(loginInformation?.EffectiveDateStart)
            }
          }

          this.agencyCode = loginInformation?.AgencyCode;
          //this.loginId = loginInformation?.LoginId;
          this.oaCode = loginInformation?.OaCode;
          this.statusValue = loginInformation?.Status;
          this.subUserType = loginInformation?.SubUserType;
          this.brokerCompanyYn = loginInformation?.BrokerCompanyYn;
          this.getInsuranceList('direct', loginInformation.InsuranceId);
          this.getBankList();
          if (this.subUserType == 'bank') this.bankCode = loginInformation?.BankCode;
          this.executiveId = PersonalInformation?.AcExecutiveId;
          this.address1 = PersonalInformation?.Address1;
          this.address2 = PersonalInformation?.Address2;
          this.checkerYN = PersonalInformation?.CheckerYn;
          this.customerCode = PersonalInformation?.CustomerCode;
          if(PersonalInformation?.TaxExemptedYn!=null){
            this.taxExcemptedYN=PersonalInformation?.TaxExemptedYn;
            if(this.taxExcemptedYN=='Y') this.taxExcemptedCode = PersonalInformation?.TaxExemptedCode;
          }
          if(PersonalInformation?.CreditLimit){this.creditLimit = PersonalInformation?.CreditLimit;
            if(this.creditLimit!=null) this.creditLimit = String(this.creditLimit).split('.')[0];
            this.CommaFormatted();}
          this.designation = PersonalInformation?.Designation;
          this.contactPersonName = PersonalInformation?.ContactPersonName;
          this.coreAppBrokerCode = PersonalInformation?.CoreAppBrokerCode;
          this.regulatoryCode = PersonalInformation?.RegulatoryCode;
          //this.cityCode = PersonalInformation?.CityName;
          this.custConfirmYN = PersonalInformation?.CustConfirmYn;
          this.makerYN = PersonalInformation?.MakerYn;
          this.mobileCode = PersonalInformation?.MobileCode;
          this.pobox = PersonalInformation?.Pobox;
          this.remarks = PersonalInformation?.Remarks;
          this.userMail = PersonalInformation?.UserMail;
          this.userMobile = PersonalInformation?.UserMobile;
          this.userName = PersonalInformation?.UserName;
          this.brokerLoginId = loginInformation.LoginId;
          this.whatsAppCode = PersonalInformation?.WhatsappCode;
          this.whatsAppNo = PersonalInformation?.WhatsappNo;
          this.vatRegNo = PersonalInformation?.VatRegNo;
          this.countryCode = PersonalInformation.CountryCode;
          console.log('ttttttttt', this.countryCode);
          this.cityCode = PersonalInformation?.CityName;
          this.stateCode = PersonalInformation?.StateCode;
          this.onCountryChange('direct');
          this.onStateChange('direct');


          if (this.vatRegNo != null) { this.commissionVatYN = 'Y'; }
        }
      },
      (err) => { },
    );
  }
  onDateFormatInEdit(date) {
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2] + '-' + format[1] + '-' + format[0];
          return NewDate;
        }
      }
    }
  }
  onCountryChange(type) {
    let ReqObj = {
      "CountryId": this.countryCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.stateList = data?.Result;
        if (type == 'change') {
          this.stateCode = null;
          this.cityCode = null;
        }
        else {
          this.onStateChange('direct');
        }
      },
      (err) => { },
    );
  }
  onStateChange(type) {
    let ReqObj = {
      "CountryId": this.countryCode,
      "StateId": this.stateCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/city`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.cityList = data?.Result;
        if (type == 'change') {
          this.cityCode = null;
        }
      },
      (err) => { },
    );
  }
  ongetBack() {
    this.router.navigate(['/Admin/brokersList'])
  }
  onProceed() {

    if (this.editSection) {
      console.log('broker', this.brokerLoginId)
      this.onSubmit();
    }
    else {
      if (this.password == null || this.password == "" || this.password == undefined) {
               Swal.fire({
                  title: '<strong>Password Details</strong>',
                  icon: 'error',
                  html:
                    `Please enter Password`,
                  showCloseButton: true,
                  focusConfirm: false,
                  showCancelButton:false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Error!',
                })
        // this.Toaster.open({
        //   text: 'Please enter Password',
        //   caption: 'password Details',
        //   type: 'danger',
        // });
      }
      else if (this.repassword == null || this.repassword == "" || this.repassword == undefined) {
          Swal.fire({
            title: '<strong>Password Details</strong>',
            icon: 'error',
            html:
              `Please enter Re-Password`,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton:false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Error!',
          })
      }

      else if (this.password != undefined || this.password != null || this.password != "") {
        if (this.repassword != undefined || this.repassword != null || this.repassword != "") {
          if (this.password != this.repassword) {
            Swal.fire({
              title: '<strong>Password Details</strong>',
              icon: 'error',
              html:
                `Passwords are MisMatching`,
              showCloseButton: true,
              focusConfirm: false,
              showCancelButton:false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Error!',
            })
            // this.Toaster.open({
            //   text: 'Passwords are MisMatching',
            //   caption: 'password Details',
            //   type: 'danger',
            // });
          }
          else {
            this.onSubmit();
            console.log('gggggggg', this.brokerLoginId)

          }
        }

      }



    }
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerConfigure'])
  }


  /*pass(){
    if(this.password!=undefined || this.password!=null || this.password!="" ){
      if(this.repassword!=undefined || this.repassword!=null || this.repassword!=""){
        if(this.password!=this.repassword){
          this.Toaster.open({
            text:'Passwords are MisMatching',
            caption: 'password Details',
            type: 'danger',
          });      
      }
      else{             
        this.onSubmit();    
        console.log('gggggggg',this.brokerLoginId)
       
      }
      }
     
    }
  
  }*/
  onSubmit() {

    if (this.commissionVatYN == 'N') this.vatRegNo = null;
    let bankCode = null;
    if (this.subUserType == 'bank' && this.bankCode != null && this.bankCode != undefined) bankCode = this.bankCode
    let creditLimit = null;
    if(this.creditLimit){
      if(this.creditLimit.includes(',')) creditLimit = this.creditLimit.replace(',','');
      else creditLimit = this.creditLimit
    }
    console.log('this', this.brokerCompanyYn)
    if (this.brokerCompanyYn == null || this.brokerCompanyYn == '' || this.brokerCompanyYn == undefined) {
      this.brokerCompanyYn = 'N';

      console.log('bbbbbbbbb', this.brokerCompanyYn)
    }
    if(this.taxExcemptedYN=='N') this.taxExcemptedCode=null;
    let ReqObj = {
      "LoginInformation": {
        "AgencyCode": this.agencyCode,
        "BankCode": bankCode,
        "BrokerCompanyYn": this.brokerCompanyYn,
        "Createdby": this.loginId,
        "EffectiveDateStart": this.effectiveDate,
        "InsuranceId": this.insuranceId,
        "LoginId": this.brokerLoginId,
        "OaCode": this.agencyCode,
        "Password": this.password,
        "Status": this.statusValue,
        "SubUserType": this.subUserType,
        "UserType": "Broker"
      },
      "PersonalInformation": {
        "AcExecutiveId": "5",
        "Address1": this.address1,
        "Address2": this.address2,
        "Address3": "None",
        "ApprovedPreparedBy": this.loginId,
        "CheckerYn": this.checkerYN,
        "CityName": this.cityCode,
        "StateCode": this.stateCode,
        "CommissionVatYn": this.commissionVatYN,
        "CompanyName": this.companyCode,
        "ContactPersonName": this.contactPersonName,
        "CoreAppBrokerCode": this.coreAppBrokerCode,
        "RegulatoryCode": this.regulatoryCode,
        "CountryCode": this.countryCode,
        "CustConfirmYn": this.custConfirmYN,
        "Designation": this.designation,
        "Fax": "0",
        "MakerYn": this.makerYN,
        "CreditLimit": creditLimit,
        "TaxExemptedYn": this.taxExcemptedYN,
        "TaxExemptedCode": this.taxExcemptedCode,
        "Pobox": this.pobox,
        "Remarks": this.remarks,
        "UserMail": this.userMail,
        "UserMobile": this.userMobile,
        "UserName": this.userName,
        "MobileCode": this.mobileCode,
        "WhatsappCode": this.whatsAppCode,
        "WhatsappNo": this.whatsAppNo,
        "VatRegNo": this.vatRegNo,
        "CustomerCode":this.customerCode
      }
    }
    if (ReqObj.LoginInformation.EffectiveDateStart != '' && ReqObj.LoginInformation.EffectiveDateStart != null && ReqObj.LoginInformation.EffectiveDateStart != undefined) {
      ReqObj.LoginInformation['EffectiveDateStart'] = this.datePipe.transform(ReqObj.LoginInformation.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj.LoginInformation['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl}admin/createbroker`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          // let type: NbComponentStatus = 'success';
          // const config = {
          //   status: type,
          //   destroyByClick: true,
          //   duration: 4000,
          //   hasIcon: true,
          //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //   preventDuplicates: false,
          // };
          // this.toastrService.show(
          //   'Broker Details Inserted/Updated Successfully',
          //   'Broker Details',
          //   config);
          sessionStorage.setItem('editBrokerAgencyCode', data.Result.AgencyCode);
          let entry = {
            "loginId": this.brokerLoginId,
            "brokerId": this.agencyCode,
            "insuranceId": this.insuranceId,
            "brokerCompanyYN": this.brokerCompanyYn
          }
          sessionStorage.setItem('brokerConfigureDetails', JSON.stringify(entry));
          this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerBranchList']);
        }
        else if (data.ErrorMessage) {
          for (let entry of data.ErrorMessage) {
            // let type: NbComponentStatus = 'danger';
            // const config = {
            //   status: type,
            //   destroyByClick: true,
            //   duration: 4000,
            //   hasIcon: true,
            //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //   preventDuplicates: false,
            // };
            // this.toastrService.show(
            //   entry.Field,
            //   entry.Message,
            //   config);
          }
          console.log("Error Iterate", data.ErrorMessage)
          //this.loginService.errorService(data.ErrorMessage);
        }
      },
      (err) => { },
    );
  }
}
