import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.scss']
})
export class SmsListComponent implements OnInit {

  activeMenu:any;
  SmsData:any[]=[];SmsHeader:any[]=[];
  insuranceName: string;
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  BranchCode: any;
  branchList:any;
  insuranceId: string;
  constructor(private router:Router,private sharedService:SharedService) {
    this.activeMenu = "City";
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
  }

  ngOnInit(): void {
    this.SmsHeader = [
      { key: 'SNo', display: 'SNo' },
      { key: 'EffectiveDateStart', display: 'Effective Date Start' },
      { key: 'RegulatoryCode', display: 'Regulatory Code' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.getSmsList();
  }

  onAddNew(){
    sessionStorage.removeItem('editSmsId');
    this.router.navigate(['/Admin/smsMaster/newSmsDetails']);
}

EditStatus(event){
  console.log("Status Changed",event)
}
getSmsList()
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
      //if(!this.BranchCode){ this.BranchCode = "99999"; this.getExistingSms() }
    }
  },
  (err) => { },
);

}
getExistingSms()
  {
    let ReqObj = {

      }

       let urlLink = `${this.CommonApiUrl1}master/`;


         this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
           (data: any) => {
             console.log(data);
             if(data.Result){
                 this.SmsData = data?.Result;
             }
           },
         (err) => { },
       );


  }

  onEdit(rowdata:any)
  {
    let entry = {
      "SNo":rowdata.Sno,
      "InsuranceId":this.insuranceId,
      "BranchCode":this.BranchCode

    }
    sessionStorage.setItem('editSmsId',JSON.stringify(entry));

    this.router.navigate(['/Admin/smsMaster/newSmsDetails'])
  }
}
