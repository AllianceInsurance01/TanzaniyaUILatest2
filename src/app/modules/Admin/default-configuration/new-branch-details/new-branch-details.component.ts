import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef,NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition  } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { Branch } from './BrachModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-branch-details',
  templateUrl: './new-branch-details.component.html',
  styleUrls: ['./new-branch-details.component.scss']
})
export class NewBranchDetailsComponent implements OnInit {

  @Input() title: any;@Input() BranchId:any;
  statusValue:any= "YES";cityList:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;minDate:Date;
  insuranceId: string;
  productId: string;stateList:any[]=[];
  BranchDetails:any={};
  countryList: any[]=[];


  constructor(
   private sharedService: SharedService,private datePipe:DatePipe ,private router:Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.BranchId = sessionStorage.getItem('BranchCode');
    this.BranchDetails = new Branch();
    this.getCountryList();
  }

  ngOnInit(): void {
    console.log("Branch id",this.BranchId);
    if(this.BranchId!=null && this.BranchId!=undefined){
      this.getEditBranchDetails();
    }
    else{
      this.BranchDetails = new Branch();
      if(this.BranchDetails?.BranchType==null)  this.BranchDetails.BranchType = 'B';
      if(this.BranchDetails?.Status==null)  this.BranchDetails.Status = 'N';
    }
  }

  dismiss() {
    this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
  }
  getCountryList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
          this.countryList = data?.Result;
      },
      (err) => { },
    );
  }
  onCountryChange(type){
    let ReqObj =  {
      "CountryId": this.BranchDetails.CountryId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.stateList = data?.Result;
        if(type=='change'){
            this.BranchDetails.StateCode = null;
            this.BranchDetails.CityName = null;
        }
        else{
          this.onStateChange('direct');
        }
    },
    (err) => { },
  );
  }
  onStateChange(type){
    let ReqObj =  {
      "CountryId": this.BranchDetails.CountryId,
      "StateId": this.BranchDetails.StateCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/city`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.cityList = data?.Result;
        if(type=='change'){
            this.BranchDetails.CityName = null;
        }
    },
    (err) => { },
  );
  }
  getEditBranchDetails(){
    let ReqObj =  {
      "BranchCode":this.BranchId,
  }
    let urlLink = `${this.CommonApiUrl}master/getbybranchid`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.BranchDetails = res.Result;
        if(this.BranchDetails){
          this.onCountryChange('direct');

          if(this.BranchDetails?.EffectiveDateStart!=null){
            this.BranchDetails.EffectiveDateStart = this.onDateFormatInEdit(this.BranchDetails?.EffectiveDateStart)
          }
          if(this.BranchDetails?.EffectiveDateEnd!=null){
            this.BranchDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.BranchDetails?.EffectiveDateEnd)
          }
        }
      }
      console.log("Final Modal Class",this.BranchDetails);
    },
    (err) => { },
  );
}
onSaveBranch() {
  let ReqObj = {
    "BranchCode": this.BranchId,
    "BranchName": this.BranchDetails.BranchName,
    "CountryId": this.BranchDetails.CountryId,
    "RegionCode": this.BranchDetails.RegionCode,
    "StateCode": this.BranchDetails.StateCode,
    "CityName": this.BranchDetails.CityName,
    "InsuranceId": this.insuranceId,
    "Status": this.BranchDetails.Status,
    "EffectiveDateStart": this.BranchDetails.EffectiveDateStart,
    "CoreAppCode": this.BranchDetails.CoreAppCode,
    "RegulatoryCode": this.BranchDetails.RegulatoryCode,
    "Remarks": this.BranchDetails.Remarks,
    "CreatedBy": this.loginId,
    "TiraCode": this.BranchDetails.TiraCode,
    "Address1": this.BranchDetails.Address1,
    "Address2": this.BranchDetails.Address2,
    "Email": this.BranchDetails.Email,
    "MobileNumber": this.BranchDetails.MobileNumber,
    "BranchType": this.BranchDetails.BranchType

  }
  let urlLink = `${this.CommonApiUrl}master/insertbranch`;
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
          //         'Branch Details Inserted/Updated Successfully',
          //         'Branch Details',
          //         config);
          this.router.navigate(['Admin/companyList/companyConfigure/branchDetails']);
               //this.prodService.getRefreshBranchList();
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

}
