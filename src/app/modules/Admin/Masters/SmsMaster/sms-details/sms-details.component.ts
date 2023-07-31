import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//import { City, Sms } from './SMSModel';
import { DatePipe } from '@angular/common';
import {Sms} from './SMSModel'
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-sms-details',
  templateUrl: './sms-details.component.html',
  styleUrls: ['./sms-details.component.scss']
})
export class SmsDetailsComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  activeMenu: string;
  minDate: Date;
  insuranceId: string;
  productId: string;
  loginId: any;
  SmsDetails: any;
  Sno:any;
  BranchCode: any;
  branchList:any;
  userDetails:any;
  constructor(private router:Router,private datePipe:DatePipe,private sharedService: SharedService,
    ) {
          this.activeMenu = "City";
             this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      // this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    // const user = this.userDetails?.Result;
    // this.insuranceId = user.LoginBranchDetails[0].InsuranceId;

    }
    this.SmsDetails = new Sms();
    //this.getSmsList();
    this.getBranchList();

   }

  ngOnInit(): void {
    /*let SmsObj = JSON.parse(sessionStorage.getItem('editSmsId'));
    this.Sno = SmsObj?.CityId;
    this.BranchCode = SmsObj.BranchCode;

    if(this.Sno!=null && this.Sno!=undefined){
      this.getEditSmsDetails();
    }
    else{
      this.SmsDetails = new Sms();
      this.Sno = SmsObj.CityId;
      //this.CityDetails.CountryId = CityObj.CountryId;
      if(this.SmsDetails?.Status==null)  this.SmsDetails.Status = 'Y';

  }*/
  if(this.SmsDetails?.Status==null)  this.SmsDetails.Status = 'Y';
  if(this.SmsDetails?.SecureYn==null)  this.SmsDetails.SecureYn = 'Y';

}
  getEditSmsDetails(){
   //this.BranchCode= this.SmsDetails.BranchCode;
    let ReqObj =  {
   "SNo":"1",
   "InsuranceId":this.insuranceId,
    "BranchCode":this.BranchCode

  }
  console.log(this.Sno,)
    let urlLink = `${this.ApiUrl1}api/getbysmsid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.SmsDetails = res.Result;
        if(this.SmsDetails){
          if(this.SmsDetails?.EffectiveDateStart!=null){

           this.SmsDetails.EffectiveDateStart = this.onDateFormatInEdit(this.SmsDetails?.EffectiveDateStart)
          }
          if(this.SmsDetails?.EffectiveDateEnd!=null){
            this.SmsDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.SmsDetails?.EffectiveDateEnd)
          }
          //this.getStateList();

        }
      }
      console.log("Final Sms Class",this.SmsDetails);
    },
    (err) => { },
  );
}
onDateFormatInEdit(date) {
  console.log(date);
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
        var NewDate = new Date(new Date(format[2], format[1], format[0]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
    }

  }
}
dismiss()
{

}
onSaveSms() {
let Sno
  if(this.Sno){
    Sno=this.Sno
  }
  else{
    Sno=null;
  }
  let ReqObj = {
    "SNo":"1",
    "InsuranceId":this.insuranceId,
    "BranchCode":this.BranchCode,
    "SenderId":this.SmsDetails.SenderId,
    "SmsUserPass":this.SmsDetails.SmsUserPass,
    "SmsUserName":this.SmsDetails.SmsUserName,
    "SmsPartyUrl":this.SmsDetails.SmsPartyUrl,
    "SecureYn":this.SmsDetails.SecureYn,
    "EffectiveDateStart":this.SmsDetails.EffectiveDateStart,
    "Remarks":this.SmsDetails.Remarks,
    "CreatedBy":this.loginId,
    "Status":this.SmsDetails.Status,
    "CoreAppCode":this.SmsDetails.CoreAppCode,
    "TiraCode":this.SmsDetails.TiraCode,
    "RegulatoryCode":this.SmsDetails.RegulatoryCode

  }
  let urlLink = `${this.ApiUrl1}api/insertsmsmaster`;

  if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
    ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
  }
  else{
    ReqObj['EffectiveDateStart'] = "";
  }
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
          // let type: NbComponentStatus = 'success';
          //       const config = {
          //         status: type,
          //         destroyByClick: true,
          //         duration: 4000,
          //         hasIcon: true,
          //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //         preventDuplicates: false,
          //       };
          //       this.toastrService.show(
          //         'Sms Details Inserted/Updated Successfully',
          //         'Sms Details',
          //         config);

                  this.Sno=data.Result.SuccessId

                  this.router.navigate(['/Admin/companyList/companyConfigure'])

        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              // for(let entry of res.ErrorMessage){
              //   let type: NbComponentStatus = 'danger';
              //   const config = {
              //     status: type,
              //     destroyByClick: true,
              //     duration: 4000,
              //     hasIcon: true,
              //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //     preventDuplicates: false,
              //   };
              //   this.toastrService.show(
              //     entry.Field,
              //     entry.Message,
              //     config);
              // }
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }
      },
      (err) => { },
    );
}
ongetBack(){
  this.router.navigate(['/Admin/companyList/companyConfigure'])
}
onRedirect(value){
  if(value == 'State'){
    this.router.navigate(['/Admin/countryMaster/stateList']);
  }
  else if(value == 'City'){
    this.router.navigate(['/Admin/countryMaster/cityList']);
  }
  else if(value == 'Country'){
    this.router.navigate(['/Admin/countryMaster/newCountryDetails']);
  }
  else if(value == 'Currency'){
    this.router.navigate(['/Admin/countryMaster/currencyList']);
  }
  else if(value == 'Region'){
    this.router.navigate(['/Admin/countryMaster/regionList']);
  }
}
getBranchList()
{
  let ReqObj = {
    "InsuranceId": this.insuranceId
  }
  let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      let obj = [{Code:"99999",CodeDesc:"ALL"}];
      this.branchList = obj.concat(data?.Result);
    if(this.BranchCode == null){ this.BranchCode = "99999"; this.getEditSmsDetails() }
    }
  },
  (err) => { },
);

}
}

