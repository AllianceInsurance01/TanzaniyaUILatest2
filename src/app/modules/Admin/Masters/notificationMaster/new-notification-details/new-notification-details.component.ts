import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { Notification } from './Notfication.Model';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-new-notification-details',
  templateUrl: './new-notification-details.component.html',
  styleUrls: ['./new-notification-details.component.scss']
})
export class NewNotificationDetailsComponent implements OnInit {
  activeMenu:any;stateList:any[]=[];stateValue:any;
  statusList:any = "YES";regionList:any[]=[];
  regionValue:any;
  CountryValue:any;
  CountryList:any;
  minDate: Date;
  insuranceId: string;
  productId: string;
  loginId: any;
  //CityDetails: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  CityId: any;
  StateId: any;
  CountryId: any;
  BranchCode: any;
  NotificationI: any;
  NotificationDetails:any;

  constructor(private router:Router,private datePipe:DatePipe,private sharedService: SharedService,) {
          this.activeMenu = "City";
             this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.NotificationDetails = new Notification();
    //this.getBranchList();
   }

  ngOnInit(): void {

 if(this.insuranceId!=null && this.insuranceId!=undefined){

    }
    else{
      this.insuranceId = null;
      //this.insuranceId = new Notification();
      if(this.NotificationDetails?.MailRequired==null)  this.NotificationDetails.MailRequired = 'N';
      if(this.NotificationDetails?.SmsRequired==null)  this.NotificationDetails.SmsRequired = 'N';
      if(this.NotificationDetails?.WhatsappRequired==null)  this.NotificationDetails.WhatsappRequired = 'N';
    }


  }
  getEditNotificationDetails(){

    let ReqObj =  {
      "InsuranceId":"10002",
      "BranchCode":this.BranchCode,
     "NotificationApplicable":this.NotificationI

  }
    let urlLink = `${this.CommonApiUrl}master/getbynotification`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.NotificationDetails = res.Result;
        if(this.NotificationDetails){
          if(this.NotificationDetails?.EffectiveDateStart!=null){

           this.NotificationDetails.EffectiveDateStart = this.onDateFormatInEdit(this.NotificationDetails?.EffectiveDateStart)
          }
          if(this.NotificationDetails?.EffectiveDateEnd!=null){
            this.NotificationDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.NotificationDetails?.EffectiveDateEnd)
          }
          //this.getStateList();

        }
      }
      console.log("Final City Class",this.NotificationDetails);
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

onSaveNotification() {
  let ReqObj = {
    "BranchCode":this.BranchCode,
    "InsuranceId":"100002",
    "EffectiveDateStart":this.NotificationDetails.EffectiveDateStart,
    "QueryKey":this.NotificationDetails.QueryKey,
    "MailRequired": this.NotificationDetails.MailRequired,
    "MailSubject":this.NotificationDetails.MailSubject,
    "MailBody": this.NotificationDetails.MailBody,
    "MailRegards": this.NotificationDetails.MailRegards,
    "SmsRequired": this.NotificationDetails.SmsRequired,
    "SmsSubject": this.NotificationDetails.SmsSubject,
    "SmsBodyEn":this.NotificationDetails.SmsBodyEn,
    "SmsRegards":this.NotificationDetails.SmsRegards,
    "WhatsappRequired": this.NotificationDetails.WhatsappRequired,
    "WhatsappSubject":this.NotificationDetails.WhatsappSubject,
    "WhatsappBodyEn":this.NotificationDetails.WhatsappBodyEn,
    "WhatsappRegards":this.NotificationDetails.WhatsappRegards,
    "Remarks":this.NotificationDetails.Remarks,
    "Status":this.NotificationDetails.Status,
    "CreatedBy": this.loginId,
    "CoreAppCode":this.NotificationDetails.CoreAppCode,
    "RegulatoryCode":this.NotificationDetails.RegulatoryCode,
    "NotificationApplicable":this.NotificationDetails.NotificationApplicable,


  }
  let urlLink = `${this.CommonApiUrl}master/insertnotiftemplatemaster`;

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
          //         'Notifications Details Inserted/Updated Successfully',
          //         'Notification Details',
          //         config);
                  this.router.navigate(['/Admin/countryMaster/cityList'])

        }
        // else if(data.ErrorMessage){
        //     if(res.ErrorMessage){
        //       for(let entry of res.ErrorMessage){
        //         let type: NbComponentStatus = 'danger';
        //         const config = {
        //           status: type,
        //           destroyByClick: true,
        //           duration: 4000,
        //           hasIcon: true,
        //           position: NbGlobalPhysicalPosition.TOP_RIGHT,
        //           preventDuplicates: false,
        //         };
        //         this.toastrService.show(
        //           entry.Field,
        //           entry.Message,
        //           config);
        //       }
        //       console.log("Error Iterate",data.ErrorMessage)
        //       //this.loginService.errorService(data.ErrorMessage);
        //     }
        //}
      },
      (err) => { },
    );
}
ongetBack()
{

}
}

