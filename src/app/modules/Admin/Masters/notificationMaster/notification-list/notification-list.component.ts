import { Insurance } from '../../../loginCreation/Company/new-company-details/insuranceModal';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  stateValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any;regionList:any[]=[];
  regionValue:any;
  cityData:any[]=[];cityHeader:any[]=[];
  insuranceName: string;
  CountryList: any[]=[];CountryValue:any;
  StateList: any[]=[];StateValue:any;
  MakeId: any;
  BranchCode:any; branchList:any;
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  NotificationData:any[]=[];NotificationHeader:any[]=[];
  constructor(private router:Router,private sharedService:SharedService) {
    this.activeMenu = "City";
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
  }

  ngOnInit(): void {
    this.NotificationHeader = [
      { key: 'SmsUserPass', display: 'SmsUserPass' },
      { key: 'SmsUserName', display: 'SmsUserName' },
      { key: 'SmsPartyUrl', display: 'SmsPartyUrl' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    //this.getCoList();
    this.getNotificationList();

  }
  EditStatus(event){
    console.log("Status Changed",event)
}
  getExistingNotification()
  {
    let ReqObj = {

    }

     let urlLink = `${this.CommonApiUrl1}master/`;


       this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
         (data: any) => {
           console.log(data);
           if(data.Result){
               this.NotificationData = data?.Result;
           }
         },
       (err) => { },
     );
  }
  onEditNotification(rowdata:any)
  {
    let entry = {
      "InsuranceId":"10002",
      "BranchCode":this.BranchCode,
         "NotificationApplicable":"OTP"

    }
    sessionStorage.setItem('editSmsId',JSON.stringify(entry));

    this.router.navigate(['/Admin/smsMaster/newSmsDetails'])
  }

  getNotificationList()
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
      //if(!this.BranchCode){ this.BranchCode = "99999"; this.getExistingSms() }
    }
  },
  (err) => { },
);

}
  onAddNew()
  {
    sessionStorage.removeItem('editNotificationId');
    this.router.navigate(['/Admin/notificationMaster/newNotificationDetails']);

  }

}
