import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { SharedService } from '../../../../../../shared/shared.service';
import { NewRegiondetailsComponent } from '../new-regiondetails/new-regiondetails.component';
import { MatDialog } from '@angular/material/dialog';


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
  constructor(private router:Router, private sharedService :SharedService,public dialogService: MatDialog,) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
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
          let obj = [{Code:"99999",CodeDesc:""}];
          this.CountryList = obj.concat(data?.Result);
          if(!this.CountryValue){ this.CountryValue = "99999"; this.getExistingRegion() }
        }
      },
      (err) => { },

    );
  }
  ongetBack(){
    this.router.navigate(['/Admin/companyList/companyConfigure'])
  }
  EditStatus(event){
    console.log("Status Changed",event)
 }

  onAddSection(){
    let ReqObj = {
      "RegionCode" :null,
      "CountryId": this.CountryValue,
    }
    sessionStorage.setItem('RegionCode', JSON.stringify(ReqObj));
    /*this.dialogService.open(NewRegiondetailsComponent, {
      context: {
        title: 'Region Details'
      },
    });*/
    const dialogRef = this.dialogService.open(NewRegiondetailsComponent,{
      data: {
        title: 'Region Details'
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
    const dialogRef = this.dialogService.open(NewRegiondetailsComponent,{
      data: {
        title: 'Region Details',
        RegionId: event.RegionCode,
        CountryId: this.CountryValue
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
    if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
    if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
    if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);
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
        }
      },
      (err) => { },
    );

  }
}
