import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
//import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { Country } from './countryModal';

@Component({
  selector: 'app-new-country-details',
  templateUrl: './new-country-details.component.html',
  styleUrls: ['./new-country-details.component.scss']
})
export class NewCountryDetailsComponent implements OnInit {

  statusValue:any="YES"; @Input() CountryId:any;
  cityList:any[]=[];brokerYN:any="NO";
  activeMenu:any;loginId :any;CountryData:any;
  minDate:Date;insuranceId:any;productId:any;
  CountryDetails: any ={};
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  ref: any;
  mobileCode:any;
  constructor(private sharedService: SharedService,private datePipe:DatePipe,private router : Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('countryInsurance');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.CountryDetails = new Country();
    this.CountryId = sessionStorage.getItem('CountryData');
  }

  ngOnInit(): void {
    console.log("Country id",this.CountryId);
    if(this.CountryId!=null && this.CountryId!=undefined){
      this.getEditCountryDetails();
    }
    else{
      this.CountryDetails = new Country();
      this.CountryId = null;
      if(this.CountryDetails?.Status==null)  this.CountryDetails.Status = 'N';
    }

  }
  getmoblieCodeList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode":""

    }
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
         this.mobileCode = data?.Result;
        }
        console.log("Final Modal Class",this.CountryDetails);
      },
      (err) => { },
    )
    }
  getEditCountryDetails(){
    let ReqObj = {
      "InsuranceId" : this.insuranceId,
      "CountryId":this.CountryId
    }
    let urlLink = `${this.CommonApiUrl}master/getbycountryid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.CountryDetails = res.Result;
          if(this.CountryDetails){
            if(this.CountryDetails?.EffectiveDateStart!=null){
              this.CountryDetails.EffectiveDateStart = this.onDateFormatInEdit(this.CountryDetails?.EffectiveDateStart)
            }
            if(this.CountryDetails?.EffectiveDateEnd!=null){
              this.CountryDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.CountryDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.CountryDetails);
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
  ongetBack(){
    this.router.navigate(['/Admin/countryMaster'])
  }
  onProceed(){

    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "CountryId":this.CountryId,
      "CountryShortCode": this.CountryDetails.CountryShortCode,
      "EffectiveDateStart": this.CountryDetails.EffectiveDateStart,
      "CreatedBy": this.loginId,
      "CountryName": this.CountryDetails.CountryName,
      "MobileCode": this.CountryDetails.MobileCode,
      "Status": this.CountryDetails.Status,
      "RegulatoryCode": this.CountryDetails.RegulatoryCode,
      "Remarks":this.CountryDetails.Remarks
    }
    let urlLink = `${this.CommonApiUrl}master/insertcountry`;
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
          //         'Section Details Inserted/Updated Successfully',
          //         'Section Details',
          //         config);
                  this.router.navigate(['/Admin/countryMaster'])
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              // for(let entry of res.ErrorMessage){
              //   let type: NbComponentStatus = 'danger';
              //   const config = {
              //     status: type,
              //     destroyByClick: true,
              //     duration: 4000,
              //     hasIcon: true,
              //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //     preventDuplicates: false,
              //   };
              //   this.toastrService.show(
              //     entry.Field,
              //     entry.Message,
              //     config);
              // }
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }
      },
      (err) => { },
    );

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
}
