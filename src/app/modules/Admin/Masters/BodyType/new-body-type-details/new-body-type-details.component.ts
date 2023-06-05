import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
import { BodyType } from './body-type.Model';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-new-bank-details',
  templateUrl: './new-body-type-details.component.html',
  styleUrls: ['./new-body-type-details.component.scss']
})
export class NewBodyTypeDetailsComponent implements OnInit {

  public minDate:Date;BranchCodeList:any; @Input() SectionId:any;
  public activeMenu:any ='BodyType';
  public insuranceName:any;
  public productId:string;
  public loginId:any;
  public insuranceId:any;
  public BodyTypeId:any;
  public BodyTypeDetails:any;BodyId:any;
  public AppConfig:any = (Mydatas as any).default;
  public CommonApiUrl:any = this.AppConfig.CommonApiUrl
  public ApiUrl1:any = this.AppConfig.ApiUrl1

  public branchList:any []=[];branchValue:any;insuranceList:any []=[];
  constructor(private datePipe:DatePipe,private router:Router,private sharedService:SharedService) {
    this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');


    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      console.log("UserDetails",userDetails)
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      this.insuranceId = userDetails?.Result?.LoginBranchDetails[0].InsuranceId;
    }
    let obj = JSON.parse(sessionStorage.getItem('BodyId'))
    if(obj){
      this.BodyTypeId = obj.BodyId;
    }
    
    this.BodyTypeDetails = new BodyType();
   }

  ngOnInit(): void {
    this.getBranchList();

    console.log("BodyType Id",this.BodyTypeId);
    if(this.BodyTypeId!=null && this.BodyTypeId!=undefined){

    }
    else{
      this.BodyTypeId = null;
      this.BodyTypeDetails = new BodyType();
      if(this.BodyTypeDetails?.Status==null)  this.BodyTypeDetails.Status = 'N';
    }

    this.getInsuranceList();
    this.getBranchList();
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BodyId":this.BodyTypeId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        let type:any = JSON.parse(sessionStorage.getItem('BodyId'));
        if(type){
          console.log("bodytype Obj",type)
          this.BodyTypeId = type?.BodyId;
          this.branchValue = type?.BranchCode;
          this.BodyTypeDetails.BranchCode = type?.BranchCode;
          this.BodyTypeDetails.SectionId = type?.SectionId
          if(this.BodyTypeId)  this.getEditBodyTypeDetails();
          else this.BodyTypeId = null;
        }
        else this.BodyTypeId = null;
      }
    },
    (err) => { },
    ) ;
}
getEditBodyTypeDetails(){
  console.log("Company",this.insuranceId)
  let ReqObj =  {
    "BodyId":this.BodyTypeId,
    "InsuranceId":this.insuranceId,
    "BranchCode":this.branchValue,

}
  let urlLink = `${this.CommonApiUrl}master/getmotorbody`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    let res:any = data;
    if(res.Result){
      this.BodyTypeDetails = res.Result;
      if(this.BodyTypeDetails){
        if(this.BodyTypeDetails?.EffectiveDateStart!=null){
          this.BodyTypeDetails.EffectiveDateStart = this.onDateFormatInEdit(this.BodyTypeDetails?.EffectiveDateStart)
        }
        if(this.BodyTypeDetails?.EffectiveDateEnd!=null){
          this.BodyTypeDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.BodyTypeDetails?.EffectiveDateEnd)
        }
      }
    }
    console.log("Final Modal Class",this.BodyTypeDetails);
  },
  (err) => { },
);

}
  ongetBack(){
    this.router.navigate(['/Admin/bodyTypeMaster'])

  }
  onProceed(){

    let ReqObj = {
      "BodyId":this.BodyTypeId,
      "SectionId":this.BodyTypeDetails.SectionId,
      "BodyNameEn":this.BodyTypeDetails.BodyNameEn,
      "EffectiveDateStart":this.BodyTypeDetails.EffectiveDateStart,
      "RegulatoryCode":this.BodyTypeDetails.RegulatoryCode,
      "SeatingCapacity":this.BodyTypeDetails.SeatingCapacity,
      "Tonnage":this.BodyTypeDetails.Tonnage,
      "Cylinders":this.BodyTypeDetails.Cylinders,
      "InsuranceId": this.insuranceId,
      "BranchCode":this.BodyTypeDetails.BranchCode,
      "CreatedBy":this.loginId,
      "Status":this.BodyTypeDetails.Status,
      "Remarks":this.BodyTypeDetails.Remarks,

    }
    let urlLink = `${this.CommonApiUrl}master/savemotorbodytype`;
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
          // this.toaster.open({
          //   text:'Body Type Details Inserted/Updated Successfully',
          //   caption: 'Body Type Details',
          //   type: 'success',
          // });
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
          //         'BodyType Details Inserted/Updated Successfully',
          //         'BodyType Details',
          //         config);
                  this.router.navigate(['/Admin/bodyTypeMaster'])
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              
              for(let entry of res.ErrorMessage){
                // this.toaster.open({
                //   text:entry.Message,
                //   caption: entry.Field,
                //   type: 'success',
                // });
               }
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
          //var NewDate = new Date(new Date(format[2], format[1], format[0]));
          //NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }

  getInsuranceList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":"5",
      "SectionId":'10'
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          let obj = [{Code:"99999",CodeDesc:"ALL"}];
          this.insuranceList = obj.concat(data?.Result);
        }
      },
      (err) => { },
    );
  }

}
