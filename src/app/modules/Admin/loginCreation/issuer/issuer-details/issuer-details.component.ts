import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { Toaster } from 'ngx-toast-notifications';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issuer-details',
  templateUrl: './issuer-details.component.html',
  styleUrls: ['./issuer-details.component.scss']
})
export class IssuerDetailsComponent implements OnInit {

  statusValue:any="Y";
  cityList:any[]=[];brokerYN:any="NO";
  typeList:any[]=[];userName:any;contactPersonName:any;
  coreAppCode:any;designation:any;address1:any;address2:any;
  CityName:any;CountryCode:any;userEmail:any;userMobileNo:any;
  userWhatsAppNo:any;issuerLoginId:any;password:any;rePassword:any;
  public AppConfig: any = (Mydatas as any).default;countryList:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  minDate: Date;effectiveDate:any;remarks:any;
  agencyCode: any;productList:any[]=[];branchList:any[]=[];
  issuerType: any;insuranceId:any;productIds:any[]=[];branchIds:any[]=[]; ReferralIds:any[]=[];
  companyList: any[]=[];mobileCode:any;whatsappCode:any;
  mobileCodeList: any[]=[];stateList:any[]=[];stateCode:any;
  loginId: any;editSection:boolean = false;
  userDetails: any;EndList:any[]=[];
  EndrosementType: any;
  constructor(private router:Router,private sharedService:SharedService,
    private datePipe:DatePipe) {
    this.minDate = new Date();
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    let insurance = sessionStorage.getItem('issuerInsuranceId');
    if(insurance){
      this.insuranceId = insurance;
    }
    else this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = userDetails?.Result?.LoginId;
    this.typeList = [
      { "Code":"SuperAdmin","CodeDesc":"SuperAdmin" },
      { "Code":"low","CodeDesc":"Quotation"},
      { "Code":"high","CodeDesc":"Approver" },
      { "Code":"both","CodeDesc":"Quotation & Approver" },

    ];
    this.getInsuranceList('change',null);

    /*this.EndList=[{"Code":'F',"CodeDesc":'Financial'},
    {"Code":'N',"CodeDesc":'Non Financial'},
    {"Code":'B',"CodeDesc":'Both'},
    {"Code":'None',"CodeDesc":'None',  multiple: false},
  ]*/
   }

   Endrosement(value){

    if(this.EndrosementType){
      let entry = this.EndrosementType.some(ele=>ele=='None');
      if(entry){
        this.EndrosementType = ['None']
      }
    }
    console.log(value);

  }
   getInsuranceList(type,value){
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    let ReqObj ={
      "BrokerCompanyYn": "N"
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.companyList = data.Result;
            //this.insuranceId = value;
            this.getCountryList();
        }
      },
      (err) => { },
    );
   }
   getCountryList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.countryList = data.Result;
            this.getMobileCodeList();
        }
      },
      (err) => { },
    );
  }
  getMobileCodeList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.mobileCodeList = data.Result;
          }
        },
        (err) => { },
      );
  }
  ngOnInit(): void {
    let issuerId = sessionStorage.getItem('editIssuerLoginId');
    if(issuerId){
      this.editSection = true;

      this.getEditIssuerDetails(issuerId);
    }
    else{

      this.insuranceId = sessionStorage.getItem('issuerInsuranceId');
      this.onCompanyChange('change',null,null);
      this.editSection = false;
    }

  }
  getEditIssuerDetails(issuerId){
      let ReqObj = {
        "LoginId": issuerId
      }
      let urlLink = `${this.CommonApiUrl}admin/getissuerbyid`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            let loginInformation = data?.Result?.LoginInformation;
            let personalInfo = data?.Result?.PersonalInformation;
            if(loginInformation?.Status==null)  loginInformation.Status = 'N';
              if(loginInformation?.EffectiveDateStart!=null){
                this.effectiveDate = this.onDateFormatInEdit(loginInformation?.EffectiveDateStart)
              }
            this.insuranceId = loginInformation?.InsuranceId;
            this.onCompanyChange('direct',loginInformation?.AttachedBranches,loginInformation?.ProductIds)

            let n=sessionStorage.getItem('ReferralId')
            if(n!="null" || n!=undefined){
            this.ReferralIds.push(n);
            }

            this.userName = personalInfo?.UserName;
            this.userMobileNo = personalInfo?.UserMobile;
            this.userEmail = personalInfo?.UserMail;

            this.agencyCode = loginInformation?.AgencyCode;
            this.issuerLoginId = loginInformation?.LoginId;
            this.statusValue = loginInformation?.Status;
            this.issuerType = loginInformation?.SubUserType;
            this.address1 = personalInfo?.Address1;
            this.address2 = personalInfo?.Address2;
            this.CountryCode = personalInfo?.CountryCode;
            this.stateCode = personalInfo?.StateCode;
            this.onCountryChange('direct');
            this.onStateChange('direct')
            this.CityName = personalInfo?.CityName;
            this.mobileCode = personalInfo?.MobileCode;
            this.whatsappCode = personalInfo?.WhatappCode;
            this.userWhatsAppNo = personalInfo?.WhatsappNo;
            this.remarks = personalInfo?.Remarks;
          }
        },
        (err) => { },
      );
  }
  onDateFormatInEdit(date) {
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }
    }
  }
  onCountryChange(type){
    let ReqObj =  {
      "CountryId": this.CountryCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
    console.log(this.CountryCode);
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.stateList = data?.Result;
        if(type=='change'){
            this.stateCode = null;
            this.CityName = null;
            //this.cityCode = null;
        }
        else{
          this.onStateChange('direct');
        }
    },
    (err) => { },
  );
  }
  onStateChange(type){
      // let ReqObj =  {
      //   "CountryId": this.CountryCode,
      //   "StateId": this.stateCode
      // }
      // let urlLink = `${this.CommonApiUrl}master/dropdown/city`;
      // console.log(this.CountryCode,this.stateCode);
      // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      //   (data: any) => {
      //     this.cityList = data?.Result;
          if(type=='change'){
              this.CityName = null;
              //this.cityCode = null;
          }
    //   },
    //   (err) => { },
    // );
  }
  onCompanyChange(type,branches,products){
    if(this.insuranceId!='' && this.insuranceId!= undefined){
      let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.productList = data.Result;
              if(type=='direct'){
                this.productIds = products;
              }
              this.getBranchList(type,branches);
          }
        },
        (err) => { },
      );
    }
  }
  getBranchList(type,branchValue){
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.branchList = data.Result;
              if(type=='direct'){
                this.branchIds = branchValue;
              }
          }
        },
        (err) => { },
      );
  }
  ongetBack(){
    this.router.navigate(['/Admin/issuerList'])
  }
  onProceed(){
    if(this.editSection){
      this.onSubmit();
    }else{
        if(this.password==null || this.password=="" || this.password==undefined){
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
          //  this.Toaster.open({
          //    text:'Please enter Password',
          //    caption: 'password Details',
          //    type: 'danger',
          //  });
         }  
         else if(this.rePassword==null || this.rePassword=="" || this.rePassword==undefined){
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
          //  this.Toaster.open({
          //    text:'Please enter RePassword',
          //    caption: 'password Details',
          //    type: 'danger',
          //  });
         } 
 
         else if(this.password!=undefined || this.password!=null || this.password!="" ){
           if(this.rePassword!=undefined || this.rePassword!=null || this.rePassword!=""){
             if(this.password!=this.rePassword){
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
              //  this.Toaster.open({
              //    text:'Passwords are MisMatching',
              //    caption: 'password Details',
              //    type: 'danger',
              //  });      
           }
           else{             
             this.onSubmit();    
             console.log('gggggggg',)
            
           }
           }       
          
     }
      /*if(this.password!=this.rePassword){
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
        //   'Password Details',
        //   'Passwords are MisMatching',
        //   config);
      }
      else{
        this.onSubmit();
      }*/
    }

  }
  onSubmit(){
    let referral:any;
    if(this.ReferralIds!=null){
    referral=this.ReferralIds;
    }
    else{
      referral="";
    }
    let ReqObj = {
      "LoginInformation": {
        "LoginId": this.issuerLoginId,
        "UserType": "Issuer",
        "SubUserType": this.issuerType,
        "Createdby": this.loginId,
        "OaCode": this.agencyCode,
        "AgencyCode": this.agencyCode,
        "Password": this.password,
        "Status": this.statusValue,
         "AttachedBranches": this.branchIds,
        "ProductIds": this.productIds,
        "InsuranceId": this.insuranceId,
        "EffectiveDateStart": this.effectiveDate,
        "ReferralIds": referral

      },
      "PersonalInformation": {
        "Address1": this.address1,
        "Address2": this.address2,
        "CityName": this.CityName,
        "StateCode":this.stateCode,
        "CountryCode": this.CountryCode,
        "MobileCode": this.mobileCode,
        "Remarks": this.remarks,
        "UserMail": this.userEmail,
        "UserMobile": this.userMobileNo,
        "UserName": this.userName,
        "WhatappCode": this.whatsappCode,
        "WhatsappNo": this.userWhatsAppNo
      }
    }
    if (ReqObj.LoginInformation.EffectiveDateStart != '' && ReqObj.LoginInformation.EffectiveDateStart != null && ReqObj.LoginInformation.EffectiveDateStart != undefined) {
      ReqObj.LoginInformation['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.LoginInformation.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj.LoginInformation['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl}admin/createissuer`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
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
            //   'Insurance Employee Details Inserted/Updated Successfully',
            //   'Insurance Employee Details',
            //   config);
              let entry = {
                "issuerType":this.issuerType,
                "loginId":this.issuerLoginId,
                "InsuranceId": this.insuranceId,
                "IssuerType":this.issuerType
              }
              sessionStorage.setItem('issuerTypeDetails',JSON.stringify(entry));
              if(this.issuerType=='high' || this.issuerType == 'both'){
                this.router.navigate(['/Admin/issuerList/productReferralConfguration'])
              }
              else this.router.navigate(['/Admin/issuerList/issuerMenuCongifuration'])

          }
          else if(data.ErrorMessage){
            for(let entry of data.ErrorMessage){
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
            console.log("Error Iterate",data.ErrorMessage)
            //this.loginService.errorService(data.ErrorMessage);
          }
        },
        (err) => { },
      );
  }
}
