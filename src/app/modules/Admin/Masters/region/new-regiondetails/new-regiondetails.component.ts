import { DatePipe } from '@angular/common';
import { Component, OnInit, Input,Inject } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { Region } from './regionModal';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-regiondetails',
  templateUrl: './new-regiondetails.component.html',
  styleUrls: ['./new-regiondetails.component.scss']
})
export class NewRegiondetailsComponent implements OnInit {

  @Input() title: any; @Input() RegionId:any; @Input() CountryId:any;
statusValue:any="YES";
  public minDate:Date;insuranceId: string;productId: string;
  public loginId :any;CountryValue:any;
  public regionDetails :any ={};countryList:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  userDetails: any;
  public activeMenu:any='Region';

  constructor(
    // private sharedService: SharedService,private datePipe:DatePipe,public dialogRef: MatDialogRef<NewRegiondetailsComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.minDate = new Date();
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = sessionStorage.getItem('countryInsurance');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.regionDetails = new Region();
    this.getcountryList();
  }


  ngOnInit(): void {
  
    let regionobj=JSON.parse(sessionStorage.getItem('RegionCode'));
    this.CountryId = regionobj?.CountryId;
    this.RegionId = regionobj?.RegionCode;
    console.log("RegionId",this.RegionId);
    console.log('ttttt',this.regionDetails.CountryId);
    if(this.RegionId!=null && this.RegionId!=undefined){
      this.getEditregionDetails();
    }
    else{
      this.RegionId = null;
      this.regionDetails = new Region();
      if(this.regionDetails?.Status==null)  this.regionDetails.Status = 'Y';
    }
  }


  getcountryList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
  let urlLink =`${this.CommonApiUrl}master/dropdown/country`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.countryList = obj.concat(data?.Result);
        this.regionDetails.CountryId = this.CountryId;
      }
    },
    (err) => { },
  );
}
  getEditregionDetails(){
    let ReqObj = {
      "RegionCode":this.RegionId,
      "CountryId":this.CountryId,
      }
      let urlLink = `${this.CommonApiUrl}master/getbyregionid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.regionDetails = res.Result;
        if(this.regionDetails){
          if(this.regionDetails?.EffectiveDateStart!=null){
            this.regionDetails.EffectiveDateStart = this.onDateFormatInEdit(this.regionDetails?.EffectiveDateStart)
          }
          if(this.regionDetails?.EffectiveDateEnd!=null){
            this.regionDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.regionDetails?.EffectiveDateEnd)
          }
        }
        }
        console.log("Final Modal Class",this.regionDetails);
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
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }
  ongetBack(){
    //this.ref.close();
    // this.dialogRef.close();
    this.router.navigate(['/Admin/countryMaster/regionList'])
  }
  onProceed(){
    let ReqObj = {
      "RegionCode":this.RegionId,
      "RegionName": this.regionDetails.RegionName,
      "RegionShortCode":this.regionDetails.RegionShortCode,
      "CreatedBy":this.loginId,
      "CountryId": this.regionDetails.CountryId,
      "Status":this.regionDetails.Status,
      "EffectiveDateStart":this.regionDetails.EffectiveDateStart,
      "RegulatoryCode":this.regionDetails.RegulatoryCode,
      "Remarks":this.regionDetails.Remarks,
      "CoreAppCode":this.regionDetails.CoreAppCode,
      "TiraCode":"1"
  }
  let urlLink = `${this.CommonApiUrl}master/insertregion `;
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
          //         'Region Details Inserted/Updated Successfully',
          //         'Region Details',
          //         config);
          //      this.ref.close();
          this.router.navigate(['/Admin/countryMaster/regionList']);
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
