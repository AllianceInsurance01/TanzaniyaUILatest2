import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../shared/shared.service';
import { BrokerDetails } from '../../broker/new-broker-details/BrokerDetails';
import * as Mydatas from '../../../../../app-config.json';
import { Toaster } from 'ngx-toast-notifications';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'] 
})
export class UserDetailsComponent implements OnInit {

  statusValue:any="Y";
  productList:any[]=[];
  cityList:any[]=[];effectiveDate:any;
  typeList:any[]=[];channelList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;insuranceId:any;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;companyList:any[]=[];
  countryList: any[]=[];countryValue:any;repassword:any=null;
  mobileCodeList: any[]=[];brokerDetails: BrokerDetails;commissionVatYN:any="N";
  userName:any;contactPersonName:any;subUserType:any;password:any=null;
  minDate: Date;designation:any=null;address1:any;address2:any;remarks:any;
  countryCode:any;CityName:any;userMail:any;mobileCode:any;custConfirmYN:any="Y";
  userMobile:any;whatsAppCode:any;whatsAppNo:any;pobox:any;checkerYN="Y";
  coreAppBrokerCode:any;brokerCompanyYn:any="Y";loginId:any;makerYN:any="Y";
  companyCode: any;editSection:boolean = false;vatRegNo:any=null;
  agencyCode: any=null;cityCode:any;
  userLoginId: any;customerCode:any=null;
  oaCode: any=null;brokerList:any[]=[];
  productIds:any[]=[];
  executiveId: any=null;brokerId:any;
  brokerValue: any;
  stateCode:any;typeValue:any;
  stateList:any[]=[];
  customerList: any[]=[];changePasswordYN:any='N';
  showCustomerList: boolean=false;
  constructor(private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe) {
    this.minDate = new Date();
    this.brokerDetails = new BrokerDetails();
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.typeValue = sessionStorage.getItem('typeValue');
    // this.loginInformation = this.brokerDetails?.LoginInformation;
    // this.personalInformation = this.brokerDetails?.PersonalInformation;
    this.typeList = [
      { "Code":"02","CodeDesc":"B2B" },
      { "Code":"03","CodeDesc":"B2C" },
      { "Code":"01","CodeDesc":"Bank"},
    ];
    this.getChannelList();
    //this.getInsuranceList();
   }

  ngOnInit(): void {
    // let insuranceId = sessionStorage.getItem('editInsuranceId');
    // if(insuranceId){
    //   this.editSection = true;
    //   this.getEditUserDetails(insuranceId);
    // }
    let userDetails:any = JSON.parse(sessionStorage.getItem('userEditDetails'));
    //let brokerId = sessionStorage.getItem('editBroker');
    if(userDetails){
      if(userDetails.UserId != null){
        this.brokerId = userDetails.BrokerId;
        this.getEditUserDetails(userDetails.UserId);
        this.editSection = true;
      }
      else{
        console.log("Insurance Value",userDetails);
        this.brokerId = userDetails.BrokerId;
        this.subUserType = userDetails.channelId;
        //this.getInsuranceList('change',userDetails.InsuranceId);
        this.getInsuranceList();
        this.editSection = false;
      }
    }


  }
  getChannelList(){
    let ReqObj ={
      "UserType":"Broker"
    }
    let urlLink = `${this.ApiUrl1}dropdown/subusertype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.channelList = data.Result;
            //this.onCompanyChange(type,branches,products)
            //this.getCountryList()



        }
      },
      (err) => { },
    );
  }
  onChangeCompany(){
    if(this.insuranceId!='' && this.insuranceId!= undefined){
      this.brokerValue = null;
      this.getBrokerList();
    }
  }
  /*onCompanyChange(type,branches,products){
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
              this.getBrokerList();
          }
        },
        (err) => { },
      );
    }
  }*/
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
  getBrokerList(){
    let ReqObj = {
      "SubUserType": this.subUserType,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl1}admin/dropdown/brokerids`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
            this.brokerList = data?.Result;
            if(this.brokerValue!=null && this.brokerValue!=undefined && this.brokerValue!=undefined){
                let entry = this.brokerList.find(ele=>ele.BrokerId==this.brokerValue);
                if(entry){
                  this.customerCode = entry?.CustomerCode;
                  this.userName = entry?.CustomerName;
                }
            }
            this.getCountryList();
        }

      },
      (err) => { },
    );
  }
  /*getCountryList(){
    let urlLink = `${this.CommonApiUrl1}master/dropdown/country`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.countryList = data.Result;
            this.getMobileCodeList();
            this.oncity('direct');
        }
      },
      (err) => { },
    );
  }*/
  getCountryList(){
    let ReqObj = {
   "InsuranceId":this.insuranceId

    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/country`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        this.countryList = data.Result;
            this.getMobileCodeList();


        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },
    (err) => { },
  );
  }



  /*getMobileCodeList(){
    let urlLink = `${this.ApiUrl1}dropdown/mobilecodes`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.mobileCodeList = data.Result;
            let userDetails:any = JSON.parse(sessionStorage.getItem('userEditDetails'));
            //let brokerId = sessionStorage.getItem('editBroker');
            if(userDetails){
              if(userDetails.UserId != null){
                this.brokerId = userDetails.BrokerId;
                this.getEditUserDetails(userDetails.UserId);
                this.editSection = true;
              }
              else{
                console.log("Insurance Value",userDetails);
                this.brokerId = userDetails.BrokerId;
                //this.getInsuranceList('change',userDetails.InsuranceId);
                this.getInsuranceList();
                this.editSection = false;
              }
            }
        }
      },
      (err) => { },
    );
  }*/
  getMobileCodeList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl1}dropdown/mobilecodes`;
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
  getInsuranceList(){
    let urlLink = `${this.ApiUrl1}master/dropdown/company`;
    let ReqObj ={
      "BrokerCompanyYn": "N"
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            //this.companyList = data.Result;

              //this.insuranceId = value;
              let obj = [];
        this.companyList = obj.concat(data?.Result);
        let useObj = JSON.parse(sessionStorage.getItem('userEditDetails'));
        if(useObj) { this.brokerValue = useObj?.BrokerId; this.insuranceId = useObj?.InsuranceId;this.subUserType = useObj?.channelId; this.getBrokerList();}
            }
          },
          (err) => { },
        );
  }
  getEditUserDetails(brokerId){
    let ReqObj = {"LoginId": brokerId}
    let urlLink = `${this.CommonApiUrl1}admin/getuserbyid`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            //this.cityList = data.Result;

            let loginInformation = data.Result.LoginInformation;
            let PersonalInformation = data.Result.PersonalInformation;
            if(loginInformation){
              if(loginInformation?.Status==null)  loginInformation.Status = 'N';
              if(loginInformation?.EffectiveDateStart!=null){
                this.effectiveDate = this.onDateFormatInEdit(loginInformation?.EffectiveDateStart)
              }
            }
            this.agencyCode = loginInformation?.AgencyCode;
            //this.loginId = loginInformation?.LoginId;
            this.oaCode = loginInformation?.OaCode;
            this.statusValue = loginInformation?.Status;

            this.subUserType = loginInformation?.SubUserType;
            this.brokerCompanyYn = loginInformation?.BrokerCompanyYn;
            this.insuranceId = loginInformation.InsuranceId;
            //this.getInsuranceList('direct',loginInformation.InsuranceId);
            this.getInsuranceList();
            this.executiveId = PersonalInformation?.AcExecutiveId;
            this.address1 = PersonalInformation?.Address1;
            this.address2 = PersonalInformation?.Address2;
            this.checkerYN = PersonalInformation?.CheckerYn;
            this.countryCode = PersonalInformation?.CountryCode;
            this.stateCode = PersonalInformation?.StateCode;

            this.onCountryChange('direct');
            //this.onStateChange('direct');
            this.cityCode = PersonalInformation?.CityName;
            this.designation = PersonalInformation?.Designation;
            this.customerCode = PersonalInformation?.CustomerCode;
            this.contactPersonName = PersonalInformation?.ContactPersonName;
            this.coreAppBrokerCode = PersonalInformation?.CoreAppBrokerCode;
            this.commissionVatYN = PersonalInformation?.CommissionVatYn
            this.custConfirmYN = PersonalInformation?.CustConfirmYn;
            this.makerYN = PersonalInformation?.MakerYn;
            this.mobileCode = PersonalInformation?.MobileCode;
            this.pobox = PersonalInformation?.Pobox;
            this.remarks = PersonalInformation?.Remarks;
            this.userMail = PersonalInformation?.UserMail;
            this.userMobile = PersonalInformation?.UserMobile;
            this.userName = PersonalInformation?.UserName;
            this.userLoginId = loginInformation.LoginId;
            this.whatsAppCode = PersonalInformation?.WhatsappCode;
            this.whatsAppNo = PersonalInformation?.WhatsappNo;
            this.vatRegNo = PersonalInformation?.VatRegNo;
            //this.onCountryChange('direct',PersonalInformation?.CityCode);

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
  /*onCountryChange(type,value){
    if(this.countryCode!='' && this.countryCode!= undefined){
      let ReqObj = {
        "InsuranceId": this.insuranceId,
        "CountryId":this.countryCode
      }
      let urlLink = `${this.CommonApiUrl1}master/dropdown/companycities`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.cityList = data.Result;
              if(type=='direct'){
                this.cityCode = value;
                console.log("City Value",this.cityCode);
              }
          }
        },
        (err) => { },
      );
    }
  }*/
  onCountryChange(type){
    let ReqObj =  {
      "CountryId": this.countryCode
    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/state`;
    console.log(this.countryCode);
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.stateList = data?.Result;
        if(type=='change'){
            this.stateCode = null;
            this.cityCode = null;
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
    //   "CountryId": this.countryCode,
    //   "StateId": this.stateCode
    // }
    // let urlLink = `${this.CommonApiUrl1}master/dropdown/city`;
    // console.log(this.countryCode,this.stateCode);
    // this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    //   (data: any) => {
    //     this.cityList = data?.Result;
        if(type=='change'){
            this.cityCode = null;
        }
  //   },
  //   (err) => { },
  // );
}
  ongetBack(){
    this.router.navigate(['/Admin/userList'])
  }
  onProceed(){
    if(this.editSection && this.changePasswordYN=='N'){
      this.onSubmit();
    }else{
      console.log('gggggggg',this.password);
        if(this.password == "" || this.password == undefined || this.password == null){
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
          //    caption: 'Password Details',
          //    type: 'danger',
          //  });
         } 
         else if(this.repassword==null || this.repassword=="" || this.repassword==undefined){
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
          //    caption: 'Password Details',
          //    type: 'danger',
          //  });
         } 
 
         else if(this.password!=undefined || this.password!=null || this.password!="" ){
           if(this.repassword!=undefined || this.repassword!=null || this.repassword!=""){
             if(this.password!=this.repassword){
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
              //    caption: 'Password Details',
              //    type: 'danger',
              //  });      
           }
           else{             
             this.onSubmit();    
             console.log('gggggggg',)
            
           }
           }       
          
     }
    }
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerConfigure'])
  }
  onSubmit(){
    let ReqObj ={
      "LoginInformation": {
        "AgencyCode": this.agencyCode,
        "BankCode": null,
        "BrokerCompanyYn": "N",
        "Createdby": this.loginId,
        "EffectiveDateStart": this.effectiveDate,
        "InsuranceId": this.insuranceId,
        "LoginId": this.userLoginId,
        "OaCode": this.brokerValue,
        "Password": this.password,
        "Status": this.statusValue,
        "SubUserType": this.subUserType,
        "UserType": "User"
      },
      "PersonalInformation": {
        "AcExecutiveId": "5",
        "Address1": this.address1,
        "Address2": this.address2,
        "Address3": "None",
        "ApprovedPreparedBy": this.loginId,
        "CheckerYn": this.checkerYN,
        "CityName": this.cityCode,
        "CommissionVatYn": this.commissionVatYN,
        "CompanyName": this.companyCode,
        "ContactPersonName": this.contactPersonName,
        "CoreAppBrokerCode": this.coreAppBrokerCode,
        "CountryCode": this.countryCode,
        "CustConfirmYn": this.custConfirmYN,
        "Designation": this.designation,
        "Fax": "0",
        "StateCode":this.stateCode,
        "MakerYn": this.makerYN,
        "Pobox": this.pobox,
        "Remarks": this.remarks,
        "UserMail": this.userMail,
        "UserMobile": this.userMobile,
        "UserName": this.userName,
        "MobileCode": this.mobileCode,
        "WhatsappCode": this.whatsAppCode,
        "WhatsappNo":this.whatsAppNo,
        "VatRegNo": this.vatRegNo,
        "CustomerCode": this.customerCode
      }
    }
     if (ReqObj.LoginInformation.EffectiveDateStart != '' && ReqObj.LoginInformation.EffectiveDateStart != null && ReqObj.LoginInformation.EffectiveDateStart != undefined) {
      ReqObj.LoginInformation['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.LoginInformation.EffectiveDateStart, "dd/MM/yyyy")
    }
    else{
      ReqObj.LoginInformation['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl1}admin/createuser`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
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
            //   'User Details Inserted/Updated Successfully',
            //   'User Details',
            //   config);
            this.router.navigate(['Admin/userList']);
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
