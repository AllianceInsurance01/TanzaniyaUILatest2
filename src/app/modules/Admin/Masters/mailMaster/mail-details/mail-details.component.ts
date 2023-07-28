import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogRef, NbToastrService,NbComponentStatus, NbGlobalPhysicalPosition, } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import {Mail} from './MailModel'

@Component({
  selector: 'app-mail-details',
  templateUrl: './mail-details.component.html',
  styleUrls: ['./mail-details.component.scss']
})
export class MailDetailsComponent implements OnInit {

  @Input() title: any;
  activeMenu:any;stateList:any[]=[];stateValue:any;
  statusValue:any = "YES";regionList:any[]=[];
  regionValue:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  CityId: any;
  MailDetails: any;
  CompanyId:any;
BranchCode: any;
  MailList: any[];
  loginId: any;
  productId: string;
  minDate: Date;
  ref: any;
  insuranceId:any;
  branchList:any;
userDetails:any;
  Sno: any=2;

  constructor(private router:Router,private datePipe:DatePipe,private sharedService: SharedService,
   ) {
    this.activeMenu = "Mail";
    this.minDate = new Date();
    this.productId =  sessionStorage.getItem('companyProductId');
      /*let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if(userDetails){
      this.insuranceId = userDetails?.Result?.LoginBranchDetails[0]?.InsuranceId;
      this.loginId = userDetails?.Result?.LoginId;
  }*/
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      console.log("Ins Id",userDetails);
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      
      // this.insuranceId = userDetails?.Result?.LoginBranchDetails[0].InsuranceId;
      // console.log('UUUUUUUUU',this.insuranceId);

    }


    this.MailDetails = new Mail();

     this.getBranchList();
   }
   ngOnInit(): void {

   }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure'])
  }
  onProceed(){
    this.router.navigate(['/Admin/countryMaster/cityList'])
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
  backtoMainGrid(){
    this.router.navigate(['/Admin/countryMaster/']);
  }


  /*getCountryList(){
    let ReqObj = {
   "InsuranceId":"100002"

    }
    let urlLink = `${this.CommonApiUrl1}master/dropdown/country`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.MailList = obj.concat(data?.Result);
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },
    (err) => { },
  );
  }*/

  /*getStateList(){
    let ReqObj = {
      "CountryId":this.CountryId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
    //let urlLink = `${this.CommonApiUrl}`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.stateList = obj.concat(data?.Result);
        this.getRegionList();
      }
    },
    (err) => { },
  );
  }


  getRegionList(){
    let ReqObj = {
      "CountryId":this.CountryId

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.regionList = obj.concat(data?.Result);
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },
    (err) => { },
  );
  }*/
  getEditMailDetails(){
    let branchCode = this.MailDetails.BranchCode;
    let ReqObj =  {
      "Sno":"2",
     "InsuranceId":this.insuranceId,
     "BranchCode":this.MailDetails.BranchCode
  }
    let urlLink = `${this.ApiUrl1}master/getbyid`;
    console.log(this.Sno,this.insuranceId,this.MailDetails.BranchCode)
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.MailDetails = res.Result;
        this.MailDetails.BranchCode = branchCode;
        if(this.MailDetails){
          if(this.MailDetails?.EffectiveDateStart!=null){

           this.MailDetails.EffectiveDateStart = this.onDateFormatInEdit(this.MailDetails?.EffectiveDateStart)
          }
          if(this.MailDetails?.EffectiveDateEnd!=null){
            this.MailDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.MailDetails?.EffectiveDateEnd)
          }
          //this.getStateList();

        }
      }
      console.log("Final City Class",this.MailDetails);
    },
    (err) => { },
  );
}
getBranchList()
{
  let ReqObj = {
    "InsuranceId": "100002"
  }
  let urlLink = `${this.CommonApiUrl1}master/dropdown/branchmaster`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if(data.Result){
      let obj = [{Code:"99999",CodeDesc:"ALL"}];
      this.branchList = obj.concat(data?.Result);

    if(this.MailDetails?.BranchCode == null){ this.MailDetails.BranchCode = "99999"; this.getEditMailDetails() }
    }
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
        //var NewDate = new Date(new Date(format[2], format[1], format[0]));
        //NewDate.setMonth(NewDate.getMonth() - 1);
        let NewDate = format[2]+'-'+format[1]+'-'+format[0];
        return NewDate;
      }
    }

  }
}
dismiss() {
  this.ref.close();
}


onSaveMail() {
  let ReqObj = {

    "Address": this.MailDetails.Address,
    "CompanyId":this.insuranceId,
    "BranchCode":this.MailDetails.BranchCode,
    "CoreAppCode": this.MailDetails.CoreAppCode,
    "CreatedBy": this.loginId,
    "EffectiveDateStart": this.MailDetails.EffectiveDateStart,
    "RegulatoryCode": this.MailDetails.RegulatoryCode,
    "Remarks": this.MailDetails.Remarks,
    "SNo": this.Sno,
    "SmtpHost": this.MailDetails.SmtpHost,
    "SmtpPort": this.MailDetails.SmtpPort,
    "SmtpPwd": this.MailDetails.SmtpPwd,
    "SmtpUser": this.MailDetails.SmtpUser,
    "Status": this.MailDetails.Status


  }
  let urlLink = `${this.ApiUrl1}master/insertmailmaster`;

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
          //         'Mail Details Inserted/Updated Successfully',
          //         'Mail Details',
          //         config);


        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
            //   for(let entry of res.ErrorMessage){
            //     let type: NbComponentStatus = 'danger';
            //     const config = {
            //       status: type,
            //       destroyByClick: true,
            //       duration: 4000,
            //       hasIcon: true,
            //       position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //       preventDuplicates: false,
            //     };
            //     this.toastrService.show(
            //       entry.Field,
            //       entry.Message,
            //       config);
            //   }
            //   console.log("Error Iterate",data.ErrorMessage)
            //   //this.loginService.errorService(data.ErrorMessage);
             }
        }
      },
      (err) => { },
    );
}

}
