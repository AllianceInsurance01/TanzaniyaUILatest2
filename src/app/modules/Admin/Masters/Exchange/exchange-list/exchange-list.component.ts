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
  constructor(public dialogService: MatDialog,private router:Router,private sharedService: SharedService,
    private datePipe:DatePipe,) {
      // this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      // this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
      this.getExistingExchange();
      this.ExchangeId = sessionStorage.getItem('ExchangeId');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      if(this.insuranceId==undefined)this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
     }

  ngOnInit(): void {
    sessionStorage.removeItem('ExchangeId')
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
  sessionStorage.removeItem('ExchangeId')
  this.router.navigate(['/Admin/exchangeMaster/newExchangeDetails'])
}
onEdit(event){
  sessionStorage.setItem('ExchangeId', event.ExchangeId);
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
