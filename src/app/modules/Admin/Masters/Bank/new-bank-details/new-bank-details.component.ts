import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { Bank } from './bankModel';
import { ThisReceiver } from '@angular/compiler';
import { Toaster } from 'ngx-toast-notifications';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-new-bank-details',
  templateUrl: './new-bank-details.component.html',
  styleUrls: ['./new-bank-details.component.scss']
})
export class NewBankDetailsComponent implements OnInit {
  public minDate:Date;BranchCodeList:any;
  BankId:any;
  statusValue:any="YES";
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  loginId: any;public activeMenu:any='Bank';
  insuranceId: string;insuranceName:any;
  productId: string;stateList:any[]=[];
  BranchDetails:any={};
  BankDetails:any={};branchList:any;branchValue:any;userDetails:any;

 constructor(/*private toastrService:NbToastrService*/
    private sharedService: SharedService,private datePipe:DatePipe, private router: Router) {
      this.minDate = new Date();
      this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    this.loginId = this.userDetails?.Result?.LoginId;

    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
      this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    }

    this.BankDetails = new Bank();
  }
  ngOnInit(): void {
    console.log("BankCode",this.BankId);
    if(this.BankId!=null && this.BankId!=undefined){

    }
    else{
      this.BankId = null;
      this.BankDetails = new Bank();
      if(this.BankDetails?.Status==null)  this.BankDetails.Status = 'N';
    }
   this.getBranchList();
  }
  getBranchList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"99999",CodeDesc:"ALL"}];
        this.branchList = obj.concat(data?.Result);
        let Exclucsion:any = JSON.parse(sessionStorage.getItem('BankCode'));
        if(Exclucsion){
          console.log("Sess BankCode Obj",Exclucsion)
          this.BankId = Exclucsion?.BankCode;
          this.BankDetails.BranchCode = Exclucsion?.BranchCode;
          this.branchValue = Exclucsion?.BranchCode;
          if(this.BankId)  this.getEditBankDetails();
          else this.BankId = null;
        }
        else this.BankId = null;
      }
    },
    (err) => { },
  );
}
getEditBankDetails(){
  let ReqObj =  {
    "BankCode": this.BankId,
    "InsuranceId":this.insuranceId,
    "BranchCode":this.branchValue
}
  let urlLink = `${this.CommonApiUrl}master/getbybankid`;
this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    let res:any = data;
    if(res.Result){
      this.BankDetails = res.Result;
      if(this.BankDetails){
        if(this.BankDetails?.EffectiveDateStart!=null){
          this.BankDetails.EffectiveDateStart = this.onDateFormatInEdit(this.BankDetails?.EffectiveDateStart)
        }
        if(this.BankDetails?.EffectiveDateEnd!=null){
          this.BankDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.BankDetails?.EffectiveDateEnd)
        }
      }
    }
    console.log("Final Modal Class",this.BankDetails);
  },
  (err) => { },
);

}
  ongetBack(){
    this.router.navigate(['/Admin/bankMaster'])

  }
  onProceed(){
    //
    let ReqObj = {
      "BankCode":this.BankId,
      "BankShortName":this.BankDetails.BankShortName,
      "BankFullName":this.BankDetails.BankFullName,
      "EffectiveDateStart":this.BankDetails.EffectiveDateStart,
      "Remarks":this.BankDetails.Remarks,
      "CreatedBy":this.loginId,
      "InsuranceId":this.insuranceId,
      "CoreAppCode":this.BankDetails.CoreAppCode,
      "RegulatoryCode":this.BankDetails.RegulatoryCode,
      "Status":this.BankDetails.Status,
      "BranchCode": this.BankDetails.BranchCode
    }
    let urlLink = `${this.CommonApiUrl}master/insertbank`;
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
          // this.Toaster.open({
          //   text:'Bank Details Inserted/Updated Successfully',
          //   caption: 'Bank Details',
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
          //         'Bank Details Inserted/Updated Successfully',
          //         'Bank Details',
          //         config);
                  this.router.navigate(['/Admin/bankMaster'])
        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              for(let entry of res.ErrorMessage){
                // this.toaster.open({
                //   text:entry.Message,
                //   caption: entry.Field,
                //   type: 'danger',
                // });
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
}
