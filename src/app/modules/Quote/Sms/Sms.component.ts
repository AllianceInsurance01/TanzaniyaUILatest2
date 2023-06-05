import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
//import {NbDialogService } from '@nebular/theme';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;


@Component({
  selector: 'app-Sms',
  templateUrl: './Sms.component.html',
  styleUrls: ['./Sms.component.scss'],
})


export class SmsComponent implements OnInit {


  smsRequestno: any;
  smss:boolean=false;
  SmsTemplateList: any;
  smstemplatevalue:any;
  SmsgetList:any;
  SmsSubject: any;
  SmsBody: any;
  SmsRegards: any;
  ViewList: any;
  SmsViewList: any;
  EntryDate:any;
  userDetails: any;
  loginId: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  productId: any;
  userType: any;
  insuranceId: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  SList: any[]=[];
  closeResult: string;
  SMSHeader:any[]=[];

  constructor(private router:Router,private sharedService: SharedService, private modalService: NgbModal,) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;


    this.SMSHeader=[
      { key: 'CustomerName', display: 'Customer Name' },
      { key: 'MobileNo', display: 'MobileNo' },
      { key: 'SmsType', display: 'Sms Type' },
//{ key: 'ResTime', display: 'ResTime' },
      { key: 'ResMessage', display: 'Res Message' },

//{ key: 'RequestReferenceNo', display: 'RequestReferenceNo' },
      {
        key: 'View',
        display: 'View',
        config: {
          isViews:true,
        },
      },

    ]
   

  }

ngOnInit(): void {

  let policyObj = JSON.parse(sessionStorage.getItem('Details'));

  this.smsRequestno=policyObj.RequestReferenceNo;
  this.smsList();
 

}


back(){
  this.smss=false;
}

smsBack(){
  this.router.navigate(['/Home/existingQuotes'])
}
smsList(){
  let ReqObj= {
    "CreatedBy":this.loginId ,
    "InsuranceId": this.insuranceId,
    "Limit": "0",
    "Offset": "1000",
    "ProductId":this.productId
  }

    let urlLink = `${this.CommonApiUrl}notification/getallsentsms`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.SList= data?.Result;
            console.log('Notification',this.SList)
        }
      },
      (err) => { },
    );
}


SmsDrop(){

  let ReqObj= {
    "InsuranceId": this.insuranceId,
    "ProductId":this.productId,
    "NotifApplicable":"Sms"
  }

    let urlLink = `${this.CommonApiUrl}notification/dropdown/templateslist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.SmsTemplateList= data?.Result;
            console.log('Template',this.SmsTemplateList)
        }
      },
      (err) => { },
    );

}

sms(){
  this.smss=true;
  this.SmsDrop();
}


getSmsTemplate(){
  let ReqObj= {
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "NotifTemplateCode": this.smstemplatevalue,
    "ProductId": this.productId,
    "RequestReferenceNo":this.smsRequestno
  }

    let urlLink = `${this.CommonApiUrl}notification/getsmstemplate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.SmsgetList= data.Result;

            this.SmsSubject=data?.Result?.SmsSubject
            this.SmsBody=data?.Result?.SmsBody;
            this.SmsRegards=data?.Result?.SmsRegards;
            console.log('templist',this.SmsgetList)
        }
      },
      (err) => { },
    );
}


sendSms(){

  let ReqObj= {
    "CreatedBy":this.loginId,
    "InsuranceId":this.insuranceId,
    "NotifTemplateCode": this.SmsgetList.NotifTemplateCode,
    "NotificationNo":this.SmsgetList.NotificationNo,
    "ProductId":this.productId,
    "RequestReferenceNo": this.smsRequestno,
    "SmsSubject":  this.SmsSubject,
          "SmsBody":   this.SmsBody,
          "SmsRegards": this.SmsRegards
  }

    let urlLink = `${this.CommonApiUrl}notification/sentdirectsms`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){


          this.smss=false;
          this.smstemplatevalue="";
          this.smsList();
          $('#mysms').modal('hide');


           console.log('Message Successfull',)
        }
      },
      (err) => { },
    );

}


open(content) {
  this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

onViewsms(rowdata,modal){
  console.log('sms',rowdata)
  this.open(modal);
  let ReqObj={
     "InsuranceId": this.insuranceId,
     "ProductId": this.productId,
     "NotificationNo": rowdata.NotificationNo
  }
  let urlLink = `${this.CommonApiUrl}notification/viewsentsms`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.SmsViewList= data?.Result;
          if(this.SmsViewList.EntryDate){
            this.EntryDate=this.onDateFormatInEdit(this.SmsViewList.EntryDate)
          }
          console.log('View',this.SmsViewList)
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
        var NewDate = new Date(new Date(format[2], format[1], format[0]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
    }

  }
}


}
