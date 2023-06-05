import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';
import { NewRegiondetailsComponent } from '../new-regiondetails/new-regiondetails.component';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';


@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {

  public tableData: any[] = [];
  public columnHeader: any[] = [];public filterValue: any;
  public activeMenu:any='Region';RegionId:any;
  insuranceName: string;insuranceId:any;CountryList:any;CountryValue:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  InsuranceId: any;
  constructor(private router:Router,public dialogService: MatDialog, private sharedService :SharedService) {
    //this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = sessionStorage.getItem('countryInsurance');
   }

  ngOnInit(): void {
    sessionStorage.removeItem('RegionCode');
    this.columnHeader = [
      { key: 'RegionName', display: 'Region Name' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'EffectiveDateStart', display: 'EffectiveDateStart' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];

    this.getBranchList();
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          //let obj = [{Code:"",CodeDesc:""}];
          this.CountryList = data?.Result;
          let docObj = JSON.parse(sessionStorage.getItem('addCountry'))
          if(docObj){ this.CountryValue = docObj?.ItemType;
            console.log('LLLLLLLLLL',this.CountryValue);
            this.getExistingRegion()}
          else{ this.CountryValue='10'; this.getExistingRegion();}

       
          //if(!this.CountryValue){ this.CountryValue = "99999"; this.getExistingRegion() }
        }
      },
      (err) => { },

    );
  }
  EditStatus(event){
    console.log("Status Changed",event)
}
  ongetBack(){
    this.router.navigate(['Admin/countryMaster'])
  }
  onAddSection(){
    let ReqObj = {
      "RegionCode" :null,
      "CountryId": this.CountryValue,
    }
    sessionStorage.setItem('RegionCode', JSON.stringify(ReqObj));
    // this.dialogService.open(NewRegiondetailsComponent, {
    //   context: {
    //     title: 'Region Details'
    //   },
    // });

    const dialogRef = this.dialogService.open(NewRegiondetailsComponent,{
      data: {
        title:'Region Details',
        CountryCode:this.CountryValue
             //imageUrl: data.Result.ImgUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onEditSection(event){
    let ReqObj = {
      "RegionCode" :event.RegionCode,
      "CountryId": this.CountryValue
    }
    sessionStorage.setItem('RegionCode',JSON.stringify(ReqObj));
    /*this.dialogService.open(NewRegiondetailsComponent, {
      context: {
        title: 'Region Details',
        RegionId: event.RegionCode,
        CountryId: this.CountryValue
      },
    });*/
    console.log('hhh',event.RegionCode)
    const dialogRef = this.dialogService.open(NewRegiondetailsComponent,{
      
      data: {
        title: 'Region Details',
        RegionId:event.RegionCode,
        CountryId: this.CountryValue
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
  getExistingRegion(){
    let ReqObj = {
      "CountryId": this.CountryValue
    }
    let urlLink =`${this.CommonApiUrl}master/getallregiondetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.tableData = data?.Result;

            if(this.CountryValue!=undefined && this.CountryValue!=null){
              let docObj = {"ItemType":this.CountryValue};
              sessionStorage.setItem('addCountry',JSON.stringify(docObj));
            }
        }
      },
      (err) => { },
    );

  }
}
