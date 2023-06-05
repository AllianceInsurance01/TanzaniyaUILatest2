import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../shared/shared.service';
import { Router } from '@angular/router';
import { Referral } from './referralModal';
@Component({
  selector: 'app-new-section-details',
  templateUrl: './new-referral-details.component.html',
  styleUrls: ['./new-referral-details.component.scss']
})
export class NewReferralDetailsComponent implements OnInit {

  @Input() title: any;@Input() ReferalId:any;
  statusValue:any= "YES";cityList:any[]=[];
  ReferalDetails:any={};public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  loginId: any;minDate:Date;
  insuranceId: string;
  productId: string;
  typeList: any;
  constructor(
    private sharedService: SharedService,private datePipe:DatePipe,private router:Router) {
      this.minDate = new Date();
      this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    this.ReferalId = sessionStorage.getItem('ReferalId');
    this.ReferalDetails = new Referral();
  }

  ngOnInit(): void {
    console.log("Referal id",this.ReferalId);
    if(this.ReferalId!=null && this.ReferalId!=undefined){
      this.getEditReferalDetails();
    }
    else{
      this.ReferalDetails = new Referral();
      if(this.ReferalDetails?.Status==null)  this.ReferalDetails.Status = 'N';
    }
  this.getTypeList()
  }

  dismiss() {
   this.router.navigate(['/Admin/companyList/companyConfigure/productDetails/referralDetails'])
  }
  getEditReferalDetails(){
      let ReqObj =  {
        "InsuranceId": this.insuranceId,
        "ProductId": this.productId,
        "ReferalId": this.ReferalId
    }
      let urlLink = `${this.ApiUrl1}master/getbyproductreferalid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
          this.ReferalDetails = res.Result;
          if(this.ReferalDetails){
            if(this.ReferalDetails?.EffectiveDateStart!=null){
              this.ReferalDetails.EffectiveDateStart = this.onDateFormatInEdit(this.ReferalDetails?.EffectiveDateStart)
            }
            if(this.ReferalDetails?.EffectiveDateEnd!=null){
              this.ReferalDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.ReferalDetails?.EffectiveDateEnd)
            }
          }
        }
        console.log("Final Modal Class",this.ReferalDetails);
      },
      (err) => { },
    );
  }
  onSaveSection(){
    let ReqObj = {
      "ProductId": this.productId,
      "ReferalId": this.ReferalDetails.ReferalId,
      "ReferalName": this.ReferalDetails.ReferalName,
      "RegulatoryCode": this.ReferalDetails.RegulatoryCode,
      "Remarks": this.ReferalDetails.Remarks,
      "Status": this.ReferalDetails.Status,
      "CreatedBy": this.loginId,
      "CoreAppCode": this.ReferalDetails.CoreAppCode,
      "InsuranceId": this.insuranceId,
      "ReferalType": this.ReferalDetails.ReferalType,
      "ReferalDesc": this.ReferalDetails.ReferalDesc,
      "EffectiveDateStart": this.ReferalDetails.EffectiveDateStart
    }
    let urlLink = `${this.ApiUrl1}master/updateproductreferal`;
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
            //         'Referal Details Inserted/Updated Successfully',
            //         'Referal Details',
            //         config);

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
  getTypeList(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "BranchCode": "99999"
    }
    let urlLink = `${this.ApiUrl1}dropdown/referraltype`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;
        if(res.Result){
            this.typeList = res.Result;
        }
      },
      (err) => { },
    );
  }
}
