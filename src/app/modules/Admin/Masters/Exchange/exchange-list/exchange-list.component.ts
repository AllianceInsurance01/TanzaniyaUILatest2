import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbToastrService, NbDialogService, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { NewExchangeDetailsComponent } from '../new-exchange-details/new-exchange-details.component';

@Component({
  selector: 'app-bank-list',
  templateUrl: './exchange-list.component.html',
  styleUrls: ['./exchange-list.component.scss']
})
export class ExchangeListComponent implements OnInit {

  tableData:any []=[];
  insuranceName: any;activeMenu="Exchange";
  public columnHeader: any[] = [];countryList:any[]=[];
  public insuranceId:any;ExchangeId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public ExchangeData:any []=[];countryValue:any;
  public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  insuranceList: any[]=[];
  loginId: any;
  constructor(public dialogService: MatDialog,private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      // this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      
      this.ExchangeId = sessionStorage.getItem('ExchangeId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      if(this.insuranceId==undefined){
        if(user.AttachedCompanies){
          if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
        }
      }
     }

  ngOnInit(): void {
    let exchangeObj:any = JSON.parse(sessionStorage.getItem('ExchangeId'));
    if(exchangeObj){
      this.insuranceId = exchangeObj?.InsuranceId
    }
    this.columnHeader = [
      { key: 'ExchangeRate', display: 'Exchange Rate' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },

      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
    this.getCompanyList();

}
getCompanyList(){
  let ReqObj = {
    "BrokerCompanyYn":"",
    "LoginId": this.loginId
  }
  let urlLink = `${this.ApiUrl1}master/dropdown/superadmincompanies`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        let defaultObj = [{"Code":"99999","CodeDesc":"ALL"}]
        this.insuranceList = defaultObj.concat(data.Result);
        if(this.insuranceId){this.getExistingExchange();}
      }

    },
    (err) => { },
  );
}
EditStatus(event){
  let ReqObj = {
    "ExchangeId":event.ExchangeId,
    "Status":event.ChangedStatus,
    "InsuranceId":this.insuranceId,
    "EffectiveDateStart":event.ChangedEffectiveDate
  }
  let urlLink = `${this.CommonApiUrl1}master/exchange/changestatus`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data:any) => {
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
        //         'Status Changed Successfully',
        //         'Status Updated',
        //         config);
              window.location.reload()
      }
    },
    (err) => { },
  );
}
onAddExchange(){
  /*let ReqObj = {
    "ExchangeId": null,
  }*/
  //sessionStorage.setItem('ExchangeId', event.ExchangeId );
  let obj = {"ExchangeId":null,"InsuranceId":this.insuranceId}
  sessionStorage.setItem('ExchangeId', JSON.stringify(obj));
  this.router.navigate(['/Admin/exchangeMaster/newExchangeDetails'])
}
onEdit(event){
  let obj = {"ExchangeId":event.ExchangeId,"InsuranceId":this.insuranceId}
  sessionStorage.setItem('ExchangeId', JSON.stringify(obj));
  this.router.navigate(['/Admin/exchangeMaster/newExchangeDetails'])

}
  getExistingExchange(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl1}master/getallexchangemaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ExchangeData = data?.Result;
        }
      },
      (err) => { },
    );

  }
}
