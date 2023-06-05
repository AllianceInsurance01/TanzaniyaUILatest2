import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';
import { Region } from './regionModal';
import * as Mydatas from '../../../../../../app-config.json';

@Component({
  selector: 'app-new-regiondetails',
  templateUrl: './new-regiondetails.component.html',
  styleUrls: ['./new-regiondetails.component.scss']
})
export class NewRegiondetailsComponent implements OnInit {

  @Input() title: any; @Input() RegionId:any; @Input() CountryId:any;
  public activeMenu:any;statusValue:any="YES";
  public minDate:Date;insuranceId: string;productId: string;
  public loginId :any;CountryValue:any;
  public regionDetails :any ={};countryList:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  constructor(/*protected ref: NbDialogRef<NewRegiondetailsComponent>*/
    private sharedService: SharedService,private datePipe:DatePipe) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.regionDetails = new Region();
    this.getcountryList();

  }


  ngOnInit(): void {
    console.log("RegionId",this.RegionId);
    if(this.RegionId!=null && this.RegionId!=undefined){
      this.getEditregionDetails();
    }
    else{
      this.RegionId = null;
      this.regionDetails = new Region();
      if(this.regionDetails?.Status==null)  this.regionDetails.Status = 'N';
    }
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
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }
    }
  }
  ongetBack(){
    //this.ref.close();
  }
  onProceed(){
    let ReqObj =
    {
      "RegionCode":this.RegionId,
      "RegionShortCode":this.regionDetails.RegionShortCode,
      "CreatedBy":this.loginId,
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
          //         'Section Details Inserted/Updated Successfully',
          //         'Section Details',
          //         config);
          //      this.ref.close();
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              for(let entry of res.ErrorMessage){
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   entry.Field,
                //   entry.Message,
                //   config);
              }
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }
      },
      (err) => { },
    );
  }
}
