import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//import { NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { StateDetailsComponent } from '../state-details/state-details.component';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {


  statusValue:any="YES";regionValue:any;
  cityList:any[]=[];brokerYN:any="NO";
  activeMenu:any;regionList:any[]=[];
  stateData:any[]=[];stateHeader:any[]=[];countryList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  constructor(private dialogService: MatDialog,private router:Router,private sharedService: SharedService) {
    this.activeMenu = "State";
    this.insuranceId = sessionStorage.getItem('countryInsurance');
    this.stateHeader = [
      { key: 'StateName', display: 'State Name' },
      { key: 'StateId', display: 'State Code' },
      { key: 'EntryDate', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];

    this.getCountryList();
  }

  ngOnInit(): void {
  }
  getCountryList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.countryList = data?.Result;
          let docObj=JSON.parse(sessionStorage.getItem('addStateDetails'))
          if(docObj){
            this.regionValue=docObj.Country;
            this.getExistStateList();
          }
         else{
          this.regionValue="TZA";
          this.getExistStateList();
         }
      },
      (err) => { },
    );
  }
  getExistStateList(){
    let ReqObj = { "CountryId": this.regionValue}
    let urlLink = `${this.CommonApiUrl}master/getallstatedetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.stateData = data?.Result;

          if(this.regionValue!=undefined && this.regionValue!=null){
            let docObj = {"Country":this.regionValue};
            sessionStorage.setItem('addStateDetails',JSON.stringify(docObj));
          }
      },
      (err) => { },
    );
  }
  EditStatus(event){
    console.log("Status Changed",event)
}
  onAddNew(){
    /*this.dialogService.open(StateDetailsComponent, {
      context: {
        title: 'State Details',
        StateId: null,
        CountryId: this.regionValue
      },
    });*/
    const dialogRef = this.dialogService.open(StateDetailsComponent,{
      data: {
        title: 'State Details',
        StateId: null,
        CountryId: this.regionValue
      }
    });
  }
  onEditState(rowData){
    /*this.dialogService.open(StateDetailsComponent, {
      context: {
        title: 'State Details',
        StateId: rowData.StateId,
        CountryId: this.regionValue
      },
    });*/
    const dialogRef = this.dialogService.open(StateDetailsComponent,{
      data: {
        title: 'State Details',
        StateId: rowData.StateId,
        CountryId: this.regionValue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

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
}
