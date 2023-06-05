import { Insurance } from './../../../loginCreation/Company/new-company-details/insuranceModal';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit {
  stateValue:any;
  stateList:any[]=[];brokerYN:any="NO";
  activeMenu:any;regionList:any[]=[];
  regionValue:any;
  MailData:any[]=[];MailHeader:any[]=[];
  insuranceName: string;
  branchList: any;StateValue:any;

  public AppConfig:any = (Mydatas as any).default
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: any;
  branchValue:any;
  productId: string;
  loginId: any;
  constructor(private router:Router,private sharedService:SharedService) {
    this.activeMenu = "City";
    //this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
  }

  ngOnInit(): void {
    this.MailHeader = [
      { key: 'SmtpHost', display: 'Smtp Host' },
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
  this.getBranchList();


  }
  EditStatus(event){
    console.log("Status Changed",event)
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
    sessionStorage.removeItem('editCityId');
    this.router.navigate(['/Admin/countryMaster/cityList/newCityDetails']);


  }
  backtoMainGrid(){
    this.router.navigate(['/Admin/countryMaster/']);
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        if(!this.branchValue){ this.branchValue = "99999"; this.getExistingMail() }
      }
    },
    (err) => { },
  );

  }
  /*getStateList(){
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
      }
    },
    (err) => { },
  );
  }*/
  getExistingMail(){
    let ReqObj = {
      "InsuranceId":"100002",
      "BranchCode":"9999"

   }

    let urlLink = `${this.CommonApiUrl}master/`;

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
              this.MailData = data?.Result;
          }
        },
      (err) => { },
    );

  }
  onEditMail(rowdata){
    let entry = {
      "Sno":rowdata.Sno,
      "InsuranceId":rowdata.insuranceId,
      "BranchCode":this.branchValue
    }
    sessionStorage.setItem('editMailId',JSON.stringify(entry));

    this.router.navigate(['/Admin/mailMaster/mailList/newMailDetails'])
  }
}
