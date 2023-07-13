import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

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
  CountryList: any[]=[];CountryValue:any;
  StateList: any[]=[];StateValue:any;
  MakeId: any;
  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;
  productId: string;
  constructor(private router:Router,private sharedService:SharedService) {
    this.activeMenu = "City";
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('countryInsurance');
    this.productId =  sessionStorage.getItem('companyProductId');

    /*this.stateList = [
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
    ];*/

  }
  ngOnInit(): void {
    this.cityHeader = [
      { key: 'CityName', display: 'City Name' },
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
    this.getCountryList();
    //this.getStateList();
    /*if(this.CountryValue && this.StateValue!==null)
    {
      this.onAddNew()
    }*/

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
    let entry = {
      "CountryId":this.CountryValue,
      "StateId":this.StateValue,
      "CityId":null

    }
    sessionStorage.setItem('editCityId',JSON.stringify(entry));
    //sessionStorage.removeItem('editCityId');
    console.log('hhhhhh',);
    this.router.navigate(['/Admin/countryMaster/cityList/newCityDetails'])

  }
EditStatus(event){
  console.log("Status Changed",event)
}
  backtoMainGrid(){
    // this.router.navigate(['/countryMaster/']);
    this.router.navigate(['/Admin/countryMaster'])
  }
  getCountryList(){
    let ReqObj = {
   "InsuranceId": this.insuranceId

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.CountryList = obj.concat(data?.Result);
        let docObj = JSON.parse(sessionStorage.getItem('addCityDetails'))

        if(docObj){this.CountryValue = docObj?.Country;
          this.getStateList();
        }
        else{this.CountryValue='TZA'; this.getStateList(); } 
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },
    (err) => { },
  );
  }
  getStateList(){
    let ReqObj = {
      "CountryId":this.CountryValue,
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
    //let urlLink = `${this.CommonApiUrl}`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.StateList = obj.concat(data?.Result);
              
        let docObj = JSON.parse(sessionStorage.getItem('addCityDetails'))
        if(docObj){ this.StateValue = docObj?.State;
          console.log('LLLLLLLLLL',this.StateValue);
          this.getExistingCity();}
        else{ this.StateValue='61300'; this.getExistingCity();}
      }
    },
    (err) => { },
  );
  }
  getExistingCity(){
    let ReqObj = {
   "CountryId":this.CountryValue,
   "StateId":this.StateValue,

   }

    let urlLink = `${this.CommonApiUrl}master/getallcitydetails`;

    /*this.sharedService.onGetMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.cityData = data?.Result;
        }
      },*/
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.cityData = data?.Result;

              if(this.CountryValue!=undefined && this.CountryValue!=null){
                let docObj = {"State":this.StateValue,"Country":this.CountryValue};
                sessionStorage.setItem('addCityDetails',JSON.stringify(docObj));
              }
          }
        },
      (err) => { },
    );

  }
  onEditCity(rowdata){
    let entry = {
      "CountryId":rowdata.CountryId,
      "StateId":rowdata.StateId,
      "CityId":rowdata.CityId

    }
    sessionStorage.setItem('editCityId',JSON.stringify(entry));

    this.router.navigate(['/Admin/countryMaster/cityList/newCityDetails'])
  }
}
