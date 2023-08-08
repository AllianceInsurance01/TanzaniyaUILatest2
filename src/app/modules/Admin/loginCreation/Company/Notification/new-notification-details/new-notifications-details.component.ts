import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import * as Mydatas from '../../../../../../app-config.json';
import { Notification } from './Notfication.Model';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-new-notifications-details',
  templateUrl: './new-notifications-details.component.html',
  styleUrls: ['./new-notifications-details.component.scss']
})
export class NewNotificationsDetailsComponent implements OnInit {
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
  NotifTemplateCode: any;
  NotificationDetails:any;
  NotifList: any;

  constructor(private router:Router,private datePipe:DatePipe,private sharedService: SharedService,
   ) {
          this.activeMenu = "City";
             this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.NotificationDetails = new Notification();
    this.getNotifListList();
    let Exclucsion:any = JSON.parse(sessionStorage.getItem('NotifTemplateCode'));
        if(Exclucsion){
          console.log("Sess BankCode Obj",Exclucsion)
          this.NotifTemplateCode = Exclucsion?.NotifTemplateCode;
        }
        else this.NotifTemplateCode = null;

   }

  ngOnInit(): void {

    if(this.NotifTemplateCode!=null && this.NotifTemplateCode!=undefined){
      this.getEditNotificationDetails();
    }
    else{

      this.NotificationDetails = new Notification();
      if(this.NotificationDetails?.Status==null)  this.NotificationDetails.Status = 'N';
      if(this.NotificationDetails?.MailRequired==null)  this.NotificationDetails.MailRequired = 'N';
      if(this.NotificationDetails?.SmsRequired==null)  this.NotificationDetails.SmsRequired = 'N';
      if(this.NotificationDetails?.WhatsappRequired==null)  this.NotificationDetails.WhatsappRequired = 'N';

      this.NotificationDetails.CreatedBy = this.loginId;
    }
  }
  getEditNotificationDetails(){

    let ReqObj =  {
      "NotifTemplateCode":this.NotifTemplateCode,
      "InsuranceId":this.insuranceId,
      "ProductId": this.productId

  }
    let urlLink = `${this.ApiUrl1}master/getnotificationcode`;
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
        "NotifTemplateCode":this.NotifTemplateCode,
        "NotifTemplatename":this.NotificationDetails.NotifTemplatename,
        "ToMessengerno":this.NotificationDetails.ToMessengerno,
        "ToSmsno":this.NotificationDetails.ToSmsno,
        "ToEmail":this.NotificationDetails.ToEmail,
        "InsuranceId": this.insuranceId,
        "ProductId":this.productId,
        "EffectiveDateStart":this.NotificationDetails.EffectiveDateStart,
        "MailRequired": this.NotificationDetails.MailRequired,
        "MailSubject": this.NotificationDetails.MailSubject,
        "MailBody": this.NotificationDetails.MailBody,
        "MailRegards": this.NotificationDetails.MailRegards,
        "SmsRequired": this.NotificationDetails.SmsRequired,
        "SmsSubject": this.NotificationDetails.SmsSubject,
        "SmsBodyEn": this.NotificationDetails.SmsBodyEn,
        "WhatsappRequired": this.NotificationDetails.WhatsappRequired,
        "WhatsappSubject": this.NotificationDetails.WhatsappSubject,
        "WhatsappBodyEn": this.NotificationDetails.WhatsappBodyEn,
        "WhatsappRegards": this.NotificationDetails.WhatsappRegards,
        "Remarks": this.NotificationDetails.Remarks,
        "Status": this.NotificationDetails.Status,
        "CreatedBy": this.loginId,
        "CoreAppCode": this.NotificationDetails.CoreAppCode,
        "RegulatoryCode":this.NotificationDetails.RegulatoryCode,
        "SmsRegards": this.NotificationDetails.SmsRegards
  }
  let urlLink = `${this.ApiUrl1}master/insertnotiftemplate`;

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
                  this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])

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
getNotifListList(){

  let urlLink = `${this.ApiUrl1}master/dropdown/getnotitranscolumns`;
  this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.NotifList = data.Result;
      }

    },
    (err) => { },
  );
}
ongetBack()
{
this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
}
onRedirect(value){
  if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails'])
  if(value=='Section') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/sectionDetails'])
  if(value=='Cover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/coverDetails'])
  if(value=='SubCover') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/subCoverDetails'])
  if(value=='UwQues') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/uwQuestionsList'])
  if(value=='Tax') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/taxDetails'])
  if(value=='Referral') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
  if(value=='Document') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/documentDetails'])
  if(value=='FactorType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/factorTypeList'])
  if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
  if(value=='Prorata') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/prorata'])
  if(value=='Emi') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/emiDetails'])
  if(value=='Payment') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/paymentList'])
  if(value=='Notification') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/notification'])
  if(value=='TinyUrl') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/tinyurlList'])
  if(value=='Premia') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/premiaConfigList'])
  if(value=='Policy') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/policytypeList'])
  if(value=='Industry') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/IndustryList'])
  if(value=='Promo') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/promoCodeMaster'])
  if(value=='EndorsementField') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementfield'])
  if(value=='Endorsement') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/endorsementType'])
  if(value=='Benefit') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/productbenefit']);
  if(value=='PlanType') this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/planTypeBenefits'])
}
}

