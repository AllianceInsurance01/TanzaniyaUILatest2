import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import {City} from './CityModel';
import { DatePipe } from '@angular/common';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss']
})
export class CityDetailsComponent implements OnInit {

  activeMenu:any;stateList:any[]=[];stateValue:any;
  statusList:any = "YES";regionList:any[]=[];
  regionValue:any;
  CountryValue:any;
  CountryList:any;
  minDate: Date;
  insuranceId: string;
  productId: string;
  loginId: any;
  CityDetails: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  CityId: any;
  StateId: any;
  CountryId: any;

  constructor(private router:Router,private datePipe:DatePipe,private sharedService: SharedService,) {
          this.activeMenu = "City";
             this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.CityDetails = new City();

    this.getCountryList();
   }

  ngOnInit(): void {
    let CityObj = JSON.parse(sessionStorage.getItem('editCityId'));
    this.CityId = CityObj?.CityId;
    this.CountryId = CityObj.CountryId;
    this.StateId = CityObj.StateId;

    if(this.CityId!=null && this.CityId!=undefined){
      this.getEditCityDetails();
    }
    else{
      this.CityDetails = new City();
      this.CityId = CityObj.CityId;
      this.CityDetails.StateId=CityObj.StateId;
      this.CityDetails.CountryId = CityObj.CountryId;
      this.CityDetails.Remarks=null;
      this.CityDetails.RegulatoryCode=null;
      this.CityDetails.CoreAppCode=null;
      this.CityDetails.CityName=null;
      if(this.CityDetails?.Status==null)  this.CityDetails.Status = 'Y';
    }

    //this.getEditCityDetails();
    /*if(this.CityId!=null && this.CityId!=undefined){

    }*/
    /*else{
      this.CityDetails = new City();
      if(this.CityDetails?.Status==null)  this.CityDetails.Status = 'Y';
    }*/
  }
  ongetBack(){
    this.router.navigate(['/Admin/countryMaster/cityList'])
  }
  onProceed(){
    this.router.navigate(['/Admin/countryMaster/cityList'])
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
    this.router.navigate(['/countryMaster/']);
  }


  getCountryList(){
    let ReqObj = {
   "InsuranceId":"100002"

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.CountryList = obj.concat(data?.Result);
        this.getStateList();
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },
    (err) => { },
  );
  }

  getStateList(){
    let ReqObj = {
      "CountryId":this.CountryId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
    //let urlLink = `${this.CommonApiUrl}`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.stateList = obj.concat(data?.Result);
        this.getRegionList();
      }
    },
    (err) => { },
  );
  }


  getRegionList(){
    let ReqObj = {
      "CountryId":this.CountryId

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.regionList = obj.concat(data?.Result);
        //if(!this.CountryValue){ this.CountryValue = "99999"; this.getStateList() }
      }
    },
    (err) => { },
  );
  }
  getEditCityDetails(){

    let ReqObj =  {
      "CityId":this.CityId,
      "StateId":this.StateId,
      "CountryId":this.CountryId

  }
    let urlLink = `${this.CommonApiUrl}master/getbycityid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.CityDetails = res.Result;
        if(this.CityDetails){
          if(this.CityDetails?.EffectiveDateStart!=null){

           this.CityDetails.EffectiveDateStart = this.onDateFormatInEdit(this.CityDetails?.EffectiveDateStart)
          }
          if(this.CityDetails?.EffectiveDateEnd!=null){
            this.CityDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.CityDetails?.EffectiveDateEnd)
          }
          this.getStateList();

        }
      }
      console.log("Final City Class",this.CityDetails);
    },
    (err) => { },
  );
}

onDateFormatInEdit(date) {
  console.log(date);
  if (date) {
    let format = date.split('-');
    if(format.length >1){
      var NewDate = new Date(new Date(format[0], format[1], format[2]));
      NewDate.setMonth(NewDate.getMonth() - 1);
      return NewDate;
    }
    else{
      format = date.split('/');
      if(format.length >1){
        //var NewDate = new Date(new Date(format[2], format[1], format[0]));
        //NewDate.setMonth(NewDate.getMonth() - 1);
        let NewDate = format[2]+'-'+format[1]+'-'+format[0];
        return NewDate;
      }
    }

  }
}


onSaveCity() {
  let ReqObj = {

"CityId":this.CityId,
"CityName":this.CityDetails.CityName,
"StateId":this.CityDetails.StateId,
"CountryId":this.CityDetails.CountryId,
//"RegionId":this.CityDetails.RegionId,
"Status":this.CityDetails.Status,
"EffectiveDateStart":this.CityDetails.EffectiveDateStart,
"CoreAppCode":this.CityDetails.CoreAppCode,
"TiraCode":this.CityDetails.TiraCode,
"Remarks":this.CityDetails.Remarks,
"CreatedBy":this.loginId,
"RegulatoryCode":this.CityDetails.RegulatoryCode,


  }
  let urlLink = `${this.CommonApiUrl}master/insertcity`;

  if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
    ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
  }
  else{
    ReqObj['EffectiveDateStart'] = "";
  }
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){

          this.router.navigate(['/Admin/countryMaster/cityList'])
          /*let type: NbComponentStatus = 'success';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  'City Details Inserted/Updated Successfully',
                  'City Details',
                  config);*/
                 

        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
             /* for(let entry of res.ErrorMessage){
                let type: NbComponentStatus = 'danger';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  entry.Field,
                  entry.Message,
                  config);
              }*/
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }
      },
      (err) => { },
    );
}
}
