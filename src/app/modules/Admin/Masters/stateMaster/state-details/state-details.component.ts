import { Component, OnInit, Input,Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
//import { NbDialogRef, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { State } from './stateModal';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styleUrls: ['./state-details.component.scss']
})
export class StateDetailsComponent implements OnInit {

  @Input() title: any;@Input() StateId:any;@Input() CountryId:any;
  statusValue:any="YES";
  cityList:any[]=[];brokerYN:any="NO";
  activeMenu:any;regionList:any[]=[];regionValue:any;
  stateData:any[]=[];stateHeader:any[]=[];stateDetails:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  insuranceId: string;productId:any;loginId:any;countryList:any[]=[];
  minDate: Date;
  constructor(/*protected ref: NbDialogRef<StateDetailsComponent>*/
    private router:Router,private sharedService: SharedService,private datePipe:DatePipe,public dialogRef: MatDialogRef<StateDetailsComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.activeMenu = 'State';
    this.minDate = new Date();
    this.insuranceId = sessionStorage.getItem('countryInsurance');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.stateDetails = new State();
    this.getCountryList();
  }

  ngOnInit(): void {
    console.log("state id",this.StateId)
    this.StateId = this.data?.StateId;
    if(this.StateId!=null && this.StateId!=undefined){
      this.stateDetails.CountryId = this.data?.CountryId;
      this.getEditStateDetails();
    }
    else{
      this.stateDetails = new State();
      //this.stateDetails.CountryId =
      if(this.stateDetails?.Status==null)  this.stateDetails.Status = 'N';
      this.stateDetails.CreatedBy = this.loginId;
    }
  }
  getEditStateDetails(){
    let ReqObj = {
      "StateId":this.StateId,
    "CountryId": this.stateDetails.CountryId}
      let urlLink = `${this.CommonApiUrl}master/getbystateid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.stateDetails = res.Result;
          if(this.stateDetails){
            if(this.stateDetails?.EffectiveDateStart!=null){
              this.stateDetails.EffectiveDateStart = this.onDateFormatInEdit(this.stateDetails?.EffectiveDateStart)
            }
            if(this.stateDetails?.EffectiveDateEnd!=null){
              this.stateDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.stateDetails?.EffectiveDateEnd)
            }
          }
        }
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
  getCountryList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.countryList = data?.Result;
          this.stateDetails.CountryId = this.data?.CountryId;
          console.log('hhhhhhhhh',this.stateDetails.CountryId)
          this.getRegionList();

      },
      (err) => { },
    );
  }
  getExistStateList(){
    let ReqObj = { "CountryId": this.regionValue}
    let urlLink = `${this.CommonApiUrl}master/getallstatedetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.stateData = data?.Result;
      },
      (err) => { },
    );
  }
  ongetBack(){
    //this.ref.close();
    this.dialogRef.close();
  }


  getRegionList(){
    let ReqObj = {
      "CountryId":this.stateDetails.CountryId 
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
  onProceed(){
    if(this.stateDetails.RegionCode==undefined) this.stateDetails.RegionCode = null;
    let ReqObj = {
      "StateId": this.StateId,
      "StateShortCode": this.stateDetails.StateShortCode,
      "StateName": this.stateDetails.StateName,
      "CountryId": this.stateDetails.CountryId,
      "Status": this.stateDetails.Status,
      "EffectiveDateStart": this.stateDetails.EffectiveDateStart,
      "CreatedBy": this.loginId,
      "RegulatoryCode": this.stateDetails.RegulatoryCode,
      "Remarks": this.stateDetails.Remarks,
      "RegionCode": this.stateDetails.RegionCode,
      "CoreAppCode": this.stateDetails.CoreAppCode
    }
    let urlLink = `${this.CommonApiUrl}master/insertstate`;
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
            this.ongetBack();
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
            //         'State Details Inserted/Updated Successfully',
            //         'State Details',
            //         config);
                 //this.ref.close();
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
  backtoMainGrid(){
    this.router.navigate(['/Admin/countryMaster/']);
  }
}
