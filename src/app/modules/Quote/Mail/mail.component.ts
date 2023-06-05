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

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
})


export class MailComponent implements OnInit {
  userDetails: any;
  loginId: any;
  agencyCode: any;
  insuranceId: any;
  userType: any;
  productId: any;
  brokerbranchCode: any;
  branchCode: any;
  NotifiList:any[]=[];
  templatevalue;
  TemplateList:any[]=[];
  templist:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  opens: boolean=false;
  mailRequestno: any;
  MailSubject: any;
  MailBody: any;
  MailRegards: any;
  MailHeader:any[]=[];
  ViewList: any;
  closeResult: string;

  constructor(private router:Router,private sharedService: SharedService, private modalService: NgbModal,) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.MailHeader=[
      { key: 'CustomerName', display: 'Customer Name' },
      { key: 'ToMail', display: 'ToMail' },
      { key: 'MailSubject', display: 'MailSubject' },
      { key: 'MailResponse', display: 'Mail Response' },

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

    this.mailRequestno=policyObj.RequestReferenceNo;

    this.onNotifi();

  }
  drop(){
    let ReqObj= {
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "NotifApplicable":"Mail"
    }

      let urlLink = `${this.CommonApiUrl}notification/dropdown/templateslist`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.TemplateList= data.Result;
              console.log('Template',this.TemplateList)
          }
        },
        (err) => { },
      );

  }

  send(){
    let ReqObj= {
      "CreatedBy":this.loginId,
      "InsuranceId":this.insuranceId,
      "NotifTemplateCode": this.templist.NotifTemplateCode,
      "NotificationNo":this.templist.NotificationNo,
      "ProductId":this.productId,
      "RequestReferenceNo": this.mailRequestno,
        "MailSubject":  this.MailSubject,
            "MailBody":   this.MailBody,
            "MailRegards": this.MailRegards
    }

      let urlLink = `${this.CommonApiUrl}notification/sentdirectmail`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){


            this.opens=false;
            this.templatevalue="";
            this.onNotifi();


             console.log('Message Successfull',)

          }
        },
        (err) => { },
      );
  }


  onNotifi(){
    let ReqObj= {
      "CreatedBy":this.loginId ,
      "InsuranceId": this.insuranceId,
      "Limit": "0",
      "Offset": "1000",
      "ProductId":this.productId
    }

      let urlLink = `${this.CommonApiUrl}notification/getallsentmail`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.NotifiList= data?.Result;
              console.log('Notification',this.NotifiList)
          }
        },
        (err) => { },
      );
}



getMailTemplate(){
  let ReqObj= {
    "CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "NotifTemplateCode": this.templatevalue,
    "ProductId": this.productId,
    "RequestReferenceNo":this.mailRequestno
  }

    let urlLink = `${this.CommonApiUrl}notification/getmailtemplate`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.templist= data.Result;

            this.MailSubject=data?.Result?.MailSubject
            this.MailBody=data?.Result?.MailBody;
            this.MailRegards=data?.Result?.MailRegards;
            console.log('templist',this.templist)
        }
      },
      (err) => { },
    );
}


backs(){
  this.opens=false;
}

Mail(){
  this.opens=true;
  this.drop();
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

onviewMail(rowdata,modal){
  console.log('RRRR',rowdata)
  this.open(modal);
  let ReqObj={
     "InsuranceId": this.insuranceId,
     "ProductId": this.productId,
     "NotificationNo": rowdata.NotificationNo
  }
  let urlLink = `${this.CommonApiUrl}notification/viewsentmail`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.ViewList= data?.Result;
          console.log('View',this.ViewList)
      }
    },
    (err) => { },
  );

}
smsBack(){
  this.router.navigate(['/Home/existingQuotes'])
}

}
