import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {

  stateValue:any;cityValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any;cityList:any;
  currencyData:any[]=[];currencyHeader:any[]=[];
  constructor(private router:Router) {
    this.activeMenu = "Currency";
    this.stateList = [
      { "Code":"01","CodeDesc":"TamilNadu"},
      { "Code":"02","CodeDesc":"Kerala"},
      { "Code":"03","CodeDesc":"Andhra Pradesh"},
    ];
    this.cityList = [
      { "Code":"01","CodeDesc":"Trichy"},
      { "Code":"02","CodeDesc":"Chennai"},
      { "Code":"03","CodeDesc":"Madurai"},
    ];
    this.currencyHeader = [
      { key: 'CurrencyName', display: 'Currency Name' },
      { key: 'CurrencyId', display: 'Currency Code' },
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
    this.currencyData = [
      {
        "CurrencyId": "100001",
        "CurrencyName": "Rupees",
        "MobileCode":"+91",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "1",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "CurrencyId": "100002",
        "CurrencyName": "EURO",
        "MobileCode":"+114",
        "EntryDate": "14/09/2022",
        "Status": "Y",
        "CoreAppCode": "2",
        "AmendId": 1,
        "Remarks": "Ok"
       },
       {
        "CurrencyId": "100003",
        "CurrencyName": "Dollar",
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
  onAddNew(){
    this.router.navigate(['/Admin/countryMaster/currencyList/newCurrencyDetails']);
  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/countryMaster/']);
  }
  EditStatus(event){
    console.log("Status Changed",event)
}
}
