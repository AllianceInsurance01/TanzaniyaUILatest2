import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-city-details',
  templateUrl: './add-city-details.component.html',
  styleUrls: ['./add-city-details.component.scss']
})
export class AddCityDetailsComponent implements OnInit {
  stateValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any;regionList:any[]=[];
  regionValue:any;
  cityData:any[]=[];cityHeader:any[]=[];
  insuranceName: string;
  constructor(private router:Router) {
    this.activeMenu = "City";
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
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
      {
        key: 'AmendId',
        display: 'Select',
        config: {
          isChecked: true,
        },
      },
      { key: 'CityName', display: 'City Name' },
      { key: 'CityId', display: 'City Code' },
      { key: 'EntryDate', display: 'Effective Date' },
      { key: 'Status', display: 'Status' },
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
  backtoMainGrid(){
    this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList'])
  }
}
