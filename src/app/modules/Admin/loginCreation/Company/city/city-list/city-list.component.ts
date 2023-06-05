import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import { CityDetailsComponent } from '../city-details/city-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  stateValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any;regionList:any[]=[];
  regionValue:any;
  cityData:any[]=[];cityHeader:any[]=[];
  insuranceName: string;
  constructor(private router:Router,public dialogService: MatDialog) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.activeMenu = "City";
    this.stateList = [
      { "Code":"01","CodeDesc":"TamilNadu"},
      { "Code":"02","CodeDesc":"Kerala"},
      { "Code":"03","CodeDesc":"Andhra Pradesh"},
    ];
    this.regionList = [
      {"Code":"01","CodeDesc":"North"},
      {"Code":"02","CodeDesc":"East"},
      {"Code":"03","CodeDesc":"West"},
  ]
    this.cityHeader = [
      { key: 'CityName', display: 'City Name' },
      { key: 'CityId', display: 'City Code' },
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
    this.cityData = [
      {
        "CityId": "100001",
        "CityName": "Trichy",
        "MobileCode":"+91",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "1",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "CityId": "100002",
        "CityName": "Chennai",
        "MobileCode":"+114",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "2",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "CityId": "100003",
        "CityName": "Madurai",
        "MobileCode":"+811",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "3",
        "AmendId": 1,
        "Remarks": "Ok"
       },
    ];
   }

  ngOnInit(): void {
  }
  onAddNew(){
    this.router.navigate(['/Admin/companyList/companyConfigure/cityList/newCityDetails'])
  }
  onEditCity(){
    /*this.dialogService.open(CityDetailsComponent, {
      context: {
        title: 'City Details'
      },
    });*/
    const dialogRef = this.dialogService.open(CityDetailsComponent,{
      data: {
        title: 'City Details'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/companyList/companyConfigure/']);
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  }
}
